import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';



import { useStateValue, setPatient } from "../state";
import { Entry, Patient } from '../types';
import { getPatient } from '../services/patientService';
import EntryDetails from "./EntryDetails";
import { AddEntryForm, HospitalEntryFormValues } from "./AddEntryForm";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ , setPatientId] = React.useState('');
  const [{ patient, diagnosisCodes }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();

  if(!patient || id !== patient.id) {
    void getPatient(id).then(  (patient: Patient ) => {
      dispatch(setPatient(patient));
      setPatientId(patient.id);
    });
  }

  if (!patient) {
    return <p>patient not found</p>;
  }

  const submitNewEntry = async (values: HospitalEntryFormValues) => {
    try {
      const { data: patientNew } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(setPatient(patientNew));
      setPatientId(patientNew.id);
      setError(undefined);
      console.log('aaaa');
      
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };
  const iconClass: string = patient.gender === 'female' ? 'venus big icon'
  : patient.gender === 'male' ? 'mars big icon'
  :'transgender alternate big icon';
  
  return (
    <div>
      <p>
        <strong>{ patient.name } </strong>
        <i aria-hidden="true" className={ iconClass }/>  
      </p>
      <p>
        ssn: {patient.ssn}
      </p>
      <p>
        occupation: {patient.occupation}
      </p>
      {patient.entries ? 
      <h2>entries</h2> : null}
      {Object.values(patient.entries).map((entry: Entry) => (
        <div key={entry.id} style={{ backgroundColor: 'rgba(255, 0, 0, 0.08)',border: '4mm ridge rgba(170, 50, 220, .6)' ,padding: '10px', margin: '10px' }}>
          <p>
            <b>{entry.date}</b>
            <i aria-hidden="true" className='medkit big icon'/> 
          </p> 
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes && entry.diagnosisCodes.length>0
              ?Object.values(entry.diagnosisCodes.map((code) =>  
            <li key={code}>{code} {diagnosisCodes[code]?diagnosisCodes[code].name:'unknown code'}</li>
              ))  
              :<></>
            }  
          </ul>
          <EntryDetails entry={entry}></EntryDetails>
        </div>
      ))}
      <AddEntryForm
        onSubmit={submitNewEntry}
        error={error}
      />
      
    </div>
  );
};

export default PatientPage;