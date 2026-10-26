export type Role = 'patient' | 'doctor';

export interface Patient {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  gender: string;
  bloodType: string;
  weight: number;
  height: number;
  qrCode: string;
  role: 'patient';
}

export interface Doctor {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  specialty: string;
  rppsNumber: string;
  establishment: string;
  role: 'doctor';
  patientsConsulted: number;
  reportsCreated: number;
}

export type Account = Patient | Doctor;

/** Fields collected by the signup form. Mock only, nothing is sent anywhere. */
export interface SignupInput {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bloodType?: string;
  specialty?: string;
  rppsNumber?: string;
}

export type ReportType = 'Radiologie' | 'Analyses' | 'Consultation' | 'Ordonnance' | 'Certificat';

export interface MedicalReport {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  establishment: string;
  type: ReportType;
  title: string;
  date: string;
  content: string;
  conclusion: string;
}

export interface Allergy {
  name: string;
  severity: 'mortelle' | 'modérée';
}

export interface Treatment {
  name: string;
  dosage: string;
  since: string;
  purpose: string;
}

export interface Pathology {
  name: string;
  status: string;
}

export interface Antecedent {
  name: string;
  date: string;
  detail: string;
}

export interface Exam {
  name: string;
  date: string;
  result: string;
  status: 'normal' | 'improving';
}

export interface Recommendation {
  text: string;
  when: string;
  type: 'info' | 'warning';
}

export interface AccessLog {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  documentAccessed: string;
  duration: string;
  daysAgo: number;
}

export type AccessLevel = 'total' | 'cardio' | 'limited' | 'targeted';

export interface AuthorizedProfessional {
  name: string;
  role: string;
  level: AccessLevel;
  levelLabel: string;
  expires: string;
  note: string;
}

export interface AccessRequest {
  id: string;
  doctorName: string;
  specialty: string;
  establishment: string;
  reason: string;
  duration: string;
  requestedAt: string;
  requestedAccess: string[];
}

export type ActivityType = 'access' | 'report' | 'lab';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  desc: string;
  daysAgo: number;
}

export type NotificationType = 'access' | 'report' | 'warning' | 'system';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  unread: boolean;
}

export interface Synthesis {
  patientId: string;
  generatedAt: string;
  basedOnReportsCount: number;
  profile: { age: number; bloodType: string; weight: number; height: number; bmi: number };
  criticalAlerts: Allergy[];
  activeTreatments: Treatment[];
  pathologies: Pathology[];
  antecedents: Antecedent[];
  recentExams: Exam[];
  trends: { label: string; status: string }[];
  recommendations: Recommendation[];
  doctorRecommendations: {
    attentionPoints: string[];
    questionsToAsk: string[];
    examsToConsider: string[];
  };
}
