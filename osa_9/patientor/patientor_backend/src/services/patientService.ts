//import patientData from '../../data/patients.json';
import patientData from '../../data/patients';
import * as uuid from 'uuid';


import { NoSsnPatientEntry, NewPatientEntry, Patient, Entry, NewEntry } from '../types';
import toNewEntry from '../utils';

// const patients: Array<Patient> = patientData.map(obj => {
//   const object = toNewPatientEntry(obj) as Patient;
//   object.id = obj.id;
//   return object;
// });

const patients: Array<Patient> = patientData; 
const getEntries = (): Array<NoSsnPatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    }));
};

const getPatient = (id:string): Patient | undefined => {
  const patientFound = patients.find(x => x.id === id);
  return patientFound;
};

const addPatient = ( newPatient: NewPatientEntry ): Patient => {
  const id: string = uuid.v4();
  const newPatientEntry: Patient = {
    id: id,
    ...newPatient,
    entries: []
  };

  patients.push(newPatientEntry);
  console.log(patients);
  return newPatientEntry;
};

const addEntry = ( entry: NewEntry, patientId: string ): Patient | undefined => {
  const newEntry: Entry = toNewEntry.toNewEntry(entry);
  const patient = patients.find(x => x.id === patientId);
  if (patient) {
    patient.entries.push(newEntry);
    return patient;
  } else {
    return undefined;
  }
  
};

export default {
  getEntries,
  addPatient,
  getPatient,
  addEntry
};
