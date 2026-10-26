import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ShieldCheck } from '@phosphor-icons/react';
import { ACCESS_LOGS, AI_SYNTHESIS, DEMO_PATIENTS } from '../../data/mockData';
import { QrPass } from '../app/QrPass';

gsap.registerPlugin(ScrollTrigger);

const BEATS = [
  { title: 'Le patient montre son code.', text: "Sur son téléphone ou sur papier. Il n'y a rien d'autre à retenir." },
  { title: 'Le médecin le scanne.', text: 'Il confirme être en consultation. Le patient reçoit la demande.' },
  { title: "Le dossier s'ouvre.", text: 'Allergies, traitements, derniers examens, au même endroit.' },
  { title: "Le patient voit l'accès.", text: 'Qui, quand, quel document. Il peut le retirer à tout moment.' },
];

const SCROLL_DISTANCE = 2400;

/**
 * Signature moment: the QR handoff. One pinned stage, scrubbed by scroll.
 * Below 768px, or under reduced motion, nothing is pinned and every state is shown at rest.
 */
export function Handoff() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const patient = DEMO_PATIENTS[0];
  const log = ACCESS_LOGS[0];
  const { criticalAlerts, activeTreatments, recentExams } = AI_SYNTHESIS;

  useEffect(() => {
    const root = section.current;
    const stageEl = stage.current;
    if (!root || !stageEl) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const qr = q('[data-qr]')[0];
      const beam = q('[data-beam]')[0];
      const read = q('[data-read]')[0];
      const chart = q('[data-chart]')[0];
      const chartRows = q('[data-chart-row]');
      const logRow = q('[data-log]')[0];
      const captions = q('[data-beat]');
      const centerOffset = () => stageEl.clientWidth / 2 - (qr.offsetLeft + qr.offsetWidth / 2);

      gsap.set(captions.slice(1), { opacity: 0.3 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: `+=${SCROLL_DISTANCE}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1 - the code is shown, centered (the offset is applied up front by the fromTo in step 3).
      // 2 - the doctor's scanner sweeps over it.
      tl.to(captions[0], { opacity: 0.3, duration: 0.3 }, 1)
        .to(captions[1], { opacity: 1, duration: 0.3 }, 1)
        .fromTo(beam, { top: '0%', autoAlpha: 1 }, { top: '100%', duration: 1, ease: 'none' }, 1)
        .to(beam, { autoAlpha: 0, duration: 0.15 }, 2)
        .from(read, { autoAlpha: 0, scale: 0.8, duration: 0.3, ease: 'back.out(2)' }, 2);
      // 3 - the code makes room, the record unfolds.
      tl.to(captions[1], { opacity: 0.3, duration: 0.3 }, 2.6)
        .to(captions[2], { opacity: 1, duration: 0.3 }, 2.6)
        .fromTo(qr, { x: centerOffset }, { x: 0, duration: 1 }, 2.6)
        .from(chart, { clipPath: 'inset(0% 100% 0% 0% round 20px)', duration: 1 }, 2.9)
        .from(chartRows, { y: 14, autoAlpha: 0, stagger: 0.12, duration: 0.5 }, 3.4);
      // 4 - the patient sees the access.
      tl.to(captions[2], { opacity: 0.3, duration: 0.3 }, 4.5)
        .to(captions[3], { opacity: 1, duration: 0.3 }, 4.5)
        .from(logRow, { y: 28, autoAlpha: 0, duration: 0.6 }, 4.5)
        .to({}, { duration: 0.8 }, 5.1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="parcours" ref={section} aria-labelledby="parcours-titre" className="bg-sunk py-16 md:flex md:min-h-dvh md:items-center md:py-0">
      <div className="shell grid w-full gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center md:gap-14">
        <div>
          <h2 id="parcours-titre" className="text-h1">
            Le parcours, en quatre gestes.
          </h2>
          <ol className="mt-10 flex flex-col">
            {BEATS.map((b, i) => (
              <li key={b.title} data-beat className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-ink/15 py-4">
                <span className="font-mono text-small text-ink-3 tnum">{i + 1}</span>
                <span>
                  <span className="block text-lg font-semibold leading-snug">{b.title}</span>
                  <span className="text-ink-2">{b.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div
          ref={stage}
          className="relative flex flex-col items-center gap-8 md:block md:h-[min(35rem,72dvh)] md:overflow-hidden md:rounded-surface md:bg-paper md:shadow-[0_0_0_1px_rgb(43_26_19/0.1)]"
        >
          <div data-qr className="relative md:absolute md:left-[4%] md:top-1/2 md:-translate-y-1/2">
            <QrPass value={patient.qrCode} name={`${patient.firstName} ${patient.lastName}`} size={148} showCode={false} className="max-w-full" />
            <span
              data-beam
              aria-hidden="true"
              className="pointer-events-none invisible absolute inset-x-3 top-0 h-0.5 bg-pulse opacity-0 shadow-[0_0_18px_3px_rgb(44_95_135/0.6)]"
            />
            <span
              data-read
              className="absolute -right-3 -top-3 inline-flex items-center gap-1.5 rounded-full bg-pulse px-3 py-1.5 text-label font-semibold text-surface"
            >
              <Check size={16} weight="bold" aria-hidden="true" /> Code lu
            </span>
          </div>

          <div data-chart className="panel w-full p-6 md:absolute md:right-[4%] md:top-[7%] md:w-[50%]">
            <p data-chart-row className="font-display text-2xl leading-tight">
              {patient.firstName} {patient.lastName}, {patient.age} ans
            </p>
            <dl className="mt-5 flex flex-col gap-4">
              <div data-chart-row>
                <dt className="text-small text-ink-3">Allergies</dt>
                <dd className="font-semibold text-alert">{criticalAlerts.map((a) => `${a.name} (${a.severity})`).join(', ')}</dd>
              </div>
              <div data-chart-row>
                <dt className="text-small text-ink-3">Traitements en cours</dt>
                <dd className="font-semibold">{activeTreatments.map((t) => t.name.split(' ')[0]).join(', ')}</dd>
              </div>
              <div data-chart-row>
                <dt className="text-small text-ink-3">Dernier examen</dt>
                <dd className="font-semibold">
                  {recentExams[0].name}, {recentExams[0].date}
                </dd>
              </div>
            </dl>
          </div>

          <p data-log className="panel flex w-full items-start gap-3 p-4 text-small md:absolute md:bottom-5 md:right-[4%] md:w-[50%]">
            <ShieldCheck size={26} weight="fill" className="mt-0.5 shrink-0 text-pulse-deep" aria-hidden="true" />
            <span>
              <span className="block font-semibold">Journal du patient</span>
              <span className="text-ink-2">
                {log.doctorName}, {log.doctorSpecialty.toLowerCase()}, a ouvert « {log.documentAccessed} » à {log.time}.
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
