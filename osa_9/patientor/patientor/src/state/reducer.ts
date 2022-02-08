import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";
type SET_PATIENT = 'SET_PATIENT';
type SET_PATIENT_LIST = 'SET_PATIENT_LIST';
type SET_DIAGNOSIS_CODES = 'SET_DIAGNOSIS_CODES';
type ADD_ENTRY = 'ADD_ENTRY';

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
    }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
    }
  | {
    type: SET_PATIENT;
    payload: Patient;
    }
  | {
    type: "SET_DIAGNOSIS_CODES";
    payload: Diagnosis[];
    }
  | {
    type: ADD_ENTRY;
    payload: Entry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      state.patient = action.payload;
      state.patientId = action.payload.id;
      return state;
    case "SET_DIAGNOSIS_CODES":
      return {
        ...state,
        diagnosisCodes: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosisCodes
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]) => {
  const thistype: SET_PATIENT_LIST = "SET_PATIENT_LIST"; 
  return {
    type: thistype,
    payload: patientListFromApi
  };
};

export const setPatient = (patient: Patient) => {
  const thistype: SET_PATIENT = "SET_PATIENT";
  return {
    type: thistype,
    payload: patient 
  };
};

export const setDiagnosisCodes = (diagnosisCodes: Diagnosis[]) => {
  const thistype: SET_DIAGNOSIS_CODES = "SET_DIAGNOSIS_CODES";
  return {
    type: thistype,
    payload: diagnosisCodes
  };
};