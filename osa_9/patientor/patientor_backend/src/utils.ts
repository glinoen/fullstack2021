import { NewPatientEntry, Gender, NewEntry, HealthCheckEntry, HospitalEntry, Entry, OccupationalHealthcareEntry } from "./types";
import * as uuid from 'uuid';

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn|| !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation|| !isString(occupation)) {
      throw new Error('Incorrect or missing ssn');
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries:[]
  };
  
  return newEntry;
};

const toNewEntry = ( entry: NewEntry ): Entry => {
  const id: string = uuid.v4();
  switch(entry.type) {
    case "Hospital":
      const hospital: HospitalEntry = {
        ...(entry as HospitalEntry),
        id: id
      };
      return hospital;
    case "OccupationalHealthcare":
      const occupational: OccupationalHealthcareEntry = {
        ...(entry as OccupationalHealthcareEntry),
        id: id
      };
      return occupational;
    case "HealthCheck":
      const healthCheck: HealthCheckEntry = {
        ...(entry as HealthCheckEntry),
        id: id
      };
      return healthCheck;
    default: throw new Error('unknown type');
  }
};

export default {
  toNewPatientEntry,
  toNewEntry
};