export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other" 
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}


export type HOSPITAL = "Hospital"; 
export type OCCUPATINAL_HEALTHCARE = "OccupationalHealthcare";
export type HEALTH_CHECK = "HealthCheck";

export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface Discharge {
  date: string;
  criteria: string;
}


export interface HospitalEntry extends BaseEntry{
  type: HOSPITAL;
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
  type: OCCUPATINAL_HEALTHCARE;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface Patient {
id: string;
name: string;
ssn: string;
occupation: string;
gender: Gender;
dateOfBirth: string;
entries: Entry[];
}
