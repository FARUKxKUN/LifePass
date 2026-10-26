// Mock data for the LifePass prototype. Every person, value and date below is fictional.
import type {
  AccessLog,
  AccessRequest,
  Activity,
  Allergy,
  AppNotification,
  Antecedent,
  AuthorizedProfessional,
  Doctor,
  MedicalReport,
  Pathology,
  Patient,
  Synthesis,
  Treatment,
} from '../types';

export const DEMO_PATIENTS: Patient[] = [
  {
    id: 'pat-001',
    email: 'jean@email.com',
    password: 'demo1234',
    firstName: 'Jean',
    lastName: 'Dupont',
    birthDate: '1981-03-15',
    age: 45,
    gender: 'Masculin',
    bloodType: 'A+',
    weight: 78,
    height: 175,
    qrCode: 'LP-2026-JD-7849',
    role: 'patient',
  },
  {
    id: 'pat-002',
    email: 'marie@email.com',
    password: 'demo1234',
    firstName: 'Marie',
    lastName: 'Leroux',
    birthDate: '1994-07-22',
    age: 32,
    gender: 'Féminin',
    bloodType: 'O-',
    weight: 62,
    height: 165,
    qrCode: 'LP-2026-ML-3291',
    role: 'patient',
  },
];

export const DEMO_DOCTORS: Doctor[] = [
  {
    id: 'doc-001',
    email: 'dr.martin@email.com',
    password: 'demo1234',
    firstName: 'Sophie',
    lastName: 'Martin',
    specialty: 'Cardiologue',
    rppsNumber: '10003456789',
    establishment: 'Hôpital de la Timone, Marseille',
    role: 'doctor',
    patientsConsulted: 45,
    reportsCreated: 12,
  },
  {
    id: 'doc-002',
    email: 'dr.dubois@email.com',
    password: 'demo1234',
    firstName: 'Jacques',
    lastName: 'Dubois',
    specialty: 'Médecin Généraliste',
    rppsNumber: '10007891234',
    establishment: 'Cabinet Médical du Parc, Marseille',
    role: 'doctor',
    patientsConsulted: 128,
    reportsCreated: 34,
  },
];

export const ALLERGIES: Allergy[] = [
  { name: 'Pénicilline', severity: 'mortelle' },
  { name: 'Iode', severity: 'modérée' },
];

export const TREATMENTS: Treatment[] = [
  { name: 'Aspirine 100mg', dosage: '1x/jour', since: '2023', purpose: 'Cardiaque' },
  { name: 'Statines 20mg', dosage: '1x/soir', since: '2023', purpose: 'Cholestérol' },
  { name: 'Métoprolol 50mg', dosage: '2x/jour', since: '2024', purpose: 'Hypertension' },
];

export const PATHOLOGIES: Pathology[] = [
  { name: 'Hypertension artérielle', status: 'contrôlée' },
  { name: 'Hypercholestérolémie', status: 'en traitement' },
];

export const ANTECEDENTS: Antecedent[] = [
  { name: 'Infarctus du myocarde', date: 'Mars 2023', detail: 'Angioplastie + stent posé' },
  { name: 'Appendicectomie', date: '1998', detail: '' },
];

export const MEDICAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-001',
    patientId: 'pat-001',
    doctorId: 'doc-001',
    doctorName: 'Dr. S. Martin',
    doctorSpecialty: 'Cardiologue',
    establishment: 'Hôp. Timone',
    type: 'Radiologie',
    title: 'Échographie cardiaque',
    date: '2026-01-12',
    content:
      "Examen réalisé en mode transthoracique. Ventricule gauche de taille normale. Fraction d'éjection : 55% (normale). Pas d'anomalie de la contractilité segmentaire. Valves cardiaques : aspect normal.",
    conclusion: 'Examen normal. Bonne récupération post-infarctus. Poursuite du traitement en cours.',
  },
  {
    id: 'rep-002',
    patientId: 'pat-001',
    doctorId: 'doc-002',
    doctorName: 'Labo BioMed',
    doctorSpecialty: 'Analyses',
    establishment: 'Marseille',
    type: 'Analyses',
    title: 'Bilan lipidique complet',
    date: '2026-01-05',
    content:
      'Cholestérol total : 1.95 g/L (normal < 2.0). LDL : 1.10 g/L (cible < 1.0). HDL : 0.55 g/L (normal). Triglycérides : 1.45 g/L (normal < 1.5).',
    conclusion: 'Amélioration significative du bilan lipidique sous traitement. LDL proche de la cible.',
  },
  {
    id: 'rep-003',
    patientId: 'pat-001',
    doctorId: 'doc-001',
    doctorName: 'Dr. S. Martin',
    doctorSpecialty: 'Cardiologue',
    establishment: 'Hôp. Timone',
    type: 'Consultation',
    title: 'Suivi cardio post-infarctus',
    date: '2025-12-20',
    content: 'Patient en bon état général. Pas de douleur thoracique. Tension 13/8. FC 72 bpm. Traitement bien toléré.',
    conclusion: 'Évolution favorable. Poursuite du traitement. Prochaine écho dans 3 mois.',
  },
  {
    id: 'rep-004',
    patientId: 'pat-001',
    doctorId: 'doc-002',
    doctorName: 'Dr. J. Dubois',
    doctorSpecialty: 'Médecin gén.',
    establishment: 'Cabinet du Parc',
    type: 'Ordonnance',
    title: 'Renouvellement traitement',
    date: '2025-12-15',
    content: 'Renouvellement pour 3 mois : Aspirine 100mg, Statines 20mg, Métoprolol 50mg.',
    conclusion: 'Traitement renouvelé. Prochain bilan sanguin dans 3 mois.',
  },
  {
    id: 'rep-005',
    patientId: 'pat-001',
    doctorId: 'doc-002',
    doctorName: 'Centre Imagerie',
    doctorSpecialty: 'Radiologie',
    establishment: 'Marseille',
    type: 'Radiologie',
    title: 'Radio thorax',
    date: '2025-11-10',
    content:
      'Radiographie thoracique de face et de profil. Parenchyme pulmonaire homogène. Silhouette cardiaque de taille normale.',
    conclusion: "Examen normal. Pas d'anomalie décelée.",
  },
  {
    id: 'rep-006',
    patientId: 'pat-001',
    doctorId: 'doc-002',
    doctorName: 'Dr. J. Dubois',
    doctorSpecialty: 'Médecin gén.',
    establishment: 'Cabinet du Parc',
    type: 'Certificat',
    title: 'Aptitude sport',
    date: '2025-10-25',
    content:
      'Examen clinique normal. Apte à la pratique sportive en compétition avec surveillance cardiologique régulière.',
    conclusion: 'Certificat délivré pour la saison 2025-2026.',
  },
];

export const AI_SYNTHESIS: Synthesis = {
  patientId: 'pat-001',
  generatedAt: 'Il y a 5 minutes',
  basedOnReportsCount: 12,
  profile: { age: 45, bloodType: 'A+', weight: 78, height: 175, bmi: 25.4 },
  criticalAlerts: ALLERGIES,
  activeTreatments: TREATMENTS,
  pathologies: PATHOLOGIES,
  antecedents: ANTECEDENTS,
  recentExams: [
    { name: 'Échographie cardiaque', date: '12/01/2026', result: 'RAS', status: 'normal' },
    { name: 'Bilan lipidique', date: '05/01/2026', result: 'Amélioration', status: 'improving' },
    { name: 'ECG', date: '20/12/2025', result: 'Normal', status: 'normal' },
  ],
  trends: [
    { label: 'Pression artérielle', status: 'Stable' },
    { label: 'Cholestérol', status: 'En baisse' },
    { label: 'Poids', status: 'Stable' },
  ],
  recommendations: [
    { text: 'Prochain bilan sanguin recommandé', when: 'Dans 2 mois', type: 'info' },
    { text: 'Consultation cardiologie annuelle', when: 'Dans 3 mois', type: 'info' },
    { text: 'Attention : Interaction possible Aspirine / AINS', when: '', type: 'warning' },
  ],
  doctorRecommendations: {
    attentionPoints: [
      "Vérifier l'observance du traitement Métoprolol",
      'Patient post-infarctus (3 ans) : surveillance continue',
      'Dernière écho cardiaque normale (12/01/2026)',
      'Cholestérol en baisse : traitement efficace',
    ],
    questionsToAsk: [
      'Douleurs thoraciques récentes ?',
      "Essoufflement à l'effort ?",
      'Observance du régime alimentaire ?',
    ],
    examsToConsider: ['Prochain bilan lipidique : Dans 2 mois', 'ECG de contrôle : Si symptômes'],
  },
};

export const ACCESS_LOGS: AccessLog[] = [
  {
    id: 'log-001',
    doctorName: 'Dr. Sophie Martin',
    doctorSpecialty: 'Cardiologue',
    date: '2026-02-12',
    time: '14h37',
    documentAccessed: 'Échographie cardiaque 12/01/2026',
    duration: '3 minutes',
    daysAgo: 2,
  },
  {
    id: 'log-002',
    doctorName: 'Pharmacie du Centre',
    doctorSpecialty: 'Pharmacie',
    date: '2026-02-10',
    time: '10h15',
    documentAccessed: 'Ordonnance actuelle',
    duration: '1 minute',
    daysAgo: 4,
  },
  {
    id: 'log-003',
    doctorName: 'Dr. Jacques Dubois',
    doctorSpecialty: 'Médecin généraliste',
    date: '2026-02-05',
    time: '16h20',
    documentAccessed: 'Dossier complet',
    duration: '8 minutes',
    daysAgo: 9,
  },
];

export const AUTHORIZED_PROFESSIONALS: AuthorizedProfessional[] = [
  { name: 'Dr. J. Dubois', role: 'Médecin gén.', level: 'total', levelLabel: 'Total', expires: 'Permanent', note: 'Méd. trait.' },
  { name: 'Dr. S. Martin', role: 'Cardiologue', level: 'cardio', levelLabel: 'Cardio', expires: '2026-12-31', note: '' },
  { name: 'Pharmacie du Centre', role: 'Pharmacie', level: 'limited', levelLabel: 'Limité', expires: 'Permanent', note: 'Ordo seul.' },
  { name: 'Labo BioMed', role: 'Laboratoire', level: 'targeted', levelLabel: 'Ciblé', expires: '2026-06-30', note: 'Résult.' },
  { name: 'Centre Imagerie', role: 'Radiologie', level: 'targeted', levelLabel: 'Ciblé', expires: '2026-03-31', note: 'Radio.' },
];

export const PENDING_REQUESTS: AccessRequest[] = [
  {
    id: 'req-001',
    doctorName: 'Dr. Pierre Lefebvre',
    specialty: 'Pneumologue',
    establishment: 'Clinique des Oliviers, Nice',
    reason: 'Consultation pour toux persistante',
    duration: '7 jours',
    requestedAt: 'Il y a 3 heures',
    requestedAccess: ['Infos vitales (allergies, groupe sanguin)', 'Radiologies thoraciques'],
  },
  {
    id: 'req-002',
    doctorName: 'Laboratoire CityLab',
    specialty: 'Analyses médicales',
    establishment: 'Toulouse',
    reason: 'Bilan sanguin prescrit par Dr. Dubois',
    duration: '24 heures',
    requestedAt: 'Il y a 1 jour',
    requestedAccess: ["Résultats d'analyses précédentes"],
  },
];

export const ACTIVITY_FEED: Activity[] = [
  { id: 'act-001', type: 'access', title: 'Dr. Sophie Martin (Cardiologue)', desc: 'A consulté votre dossier médical', daysAgo: 2 },
  { id: 'act-002', type: 'report', title: 'Nouveau rapport ajouté', desc: 'Échographie cardiaque - Dr. Martin', daysAgo: 5 },
  { id: 'act-003', type: 'lab', title: 'Laboratoire BioMed', desc: "Résultats d'analyses sanguines", daysAgo: 7 },
];

export const REPORT_TYPES = [
  { id: 'consultation', label: 'Consultation Médicale' },
  { id: 'ordonnance', label: 'Ordonnance' },
  { id: 'examens', label: "Résultats d'Examens" },
  { id: 'certificat', label: 'Certificat Médical' },
  { id: 'hospitalier', label: 'Compte-Rendu Hospitalier' },
  { id: 'bilan', label: 'Bilan de Santé' },
];

export const NOTIFICATIONS_PATIENT: AppNotification[] = [
  { id: 'not-001', title: 'Accès au dossier', message: 'Le Dr. Sophie Martin a consulté votre échographie cardiaque.', time: 'Il y a 2h', type: 'access', unread: true },
  { id: 'not-002', title: 'Nouveau rapport', message: 'Un nouveau compte-rendu a été ajouté par le Labo BioMed.', time: 'Il y a 5h', type: 'report', unread: true },
  { id: 'not-003', title: 'Rappel de santé', message: 'Attention : Interaction possible Aspirine / AINS.', time: 'Janv 12', type: 'warning', unread: false },
];

export const NOTIFICATIONS_DOCTOR: AppNotification[] = [
  { id: 'ndoc-001', title: 'Consentement accordé', message: "Jean Dupont a autorisé l'accès à son dossier complet.", time: 'Il y a 10 min', type: 'access', unread: true },
  { id: 'ndoc-002', title: 'Nouveau patient', message: 'Un nouveau dossier a été partagé par Marie Leroux.', time: 'Hier', type: 'system', unread: false },
];

// Values that were hard-coded inside the original screens, moved here so they read as mock data.
export const QR_STATS = {
  totalScans: 24,
  validated: 5,
  lastScan: { name: 'Dr. Sophie Martin', when: 'Il y a 2 jours', time: '14:37' },
};

export const DOCTOR_ACTIVITY = [
  { name: 'Jean Dupont', action: 'Consultation Cardiologie', time: 'Il y a 2h' },
  { name: 'Marie Leroux', action: 'Dossier mis à jour', time: 'Il y a 5h' },
  { name: 'Pierre Simon', action: 'Accès QR validé', time: 'Hier, 16:40' },
];

export const DOCTOR_REQUESTS = [
  { name: 'Lucie Bernard', status: 'En attente', desc: 'Demande QR envoyée' },
  { name: 'Marc Vasseur', status: 'Approuvé', desc: 'Accès patient actif' },
];

export const PATIENT_CONTACT = {
  phone: '+33 6 12 34 56 78',
  address: '15 rue de la République, 13001 Marseille',
};
