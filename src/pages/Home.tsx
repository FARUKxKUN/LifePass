import { Faq } from '../components/landing/Faq';
import { Handoff } from '../components/landing/Handoff';
import { Hero } from '../components/landing/Hero';
import { Navbar } from '../components/landing/Navbar';
import { Problem } from '../components/landing/Problem';
import { Protection } from '../components/landing/Protection';
import { Sides } from '../components/landing/Sides';
import { Team } from '../components/landing/Team';

export default function Home() {
  return (
    <>
      <a href="#contenu" className="skip-link">
        Passer au contenu
      </a>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Problem />
        <Handoff />
        <Sides />
        <Protection />
        <Faq />
        <Team />
      </main>
    </>
  );
}
