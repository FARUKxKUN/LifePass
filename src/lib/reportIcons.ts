import { Certificate, Flask, Pill, Scan, Stethoscope } from '@phosphor-icons/react';
import type { ReportType } from '../types';

/** Replaces the emoji `typeIcon` fields of the original data. */
export const REPORT_ICONS: Record<ReportType, typeof Scan> = {
  Radiologie: Scan,
  Analyses: Flask,
  Consultation: Stethoscope,
  Ordonnance: Pill,
  Certificat: Certificate,
};
