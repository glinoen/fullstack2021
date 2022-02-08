import React from 'react';
import { Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from '../types';
import HealthRatingBar from '../components/HealthRatingBar';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry}) => {
    switch(entry.type) {
      case "Hospital":
        return <HospitalEntryPage { ...entry }/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcarePage {...entry}/>;
      case "HealthCheck":
        return <HealthCheckPage {... entry}/>;
      default:
        return assertNever(entry);   
    }
  };

  

  const HospitalEntryPage  = ( entry: HospitalEntry ) => {
    return <div >
      <p><i aria-hidden="true" className='home big icon'/> 
      {entry.discharge.date} {entry.discharge.criteria}</p>
    </div>;
  };
  
  const OccupationalHealthcarePage  = ( entry: OccupationalHealthcareEntry ) => {
    return <div>
      <strong> Occupational info </strong>
      <p>employer: {entry.employerName}</p>
      <p>specialist: {entry.specialist}</p>
      { entry.sickLeave
        ?<p>sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
        :''
    }
    </div>;
  };
  
  const HealthCheckPage = ( entry: HealthCheckEntry ) => {
    return <div>
      <p>specialist: {entry.specialist}</p>
      <HealthRatingBar showText={true} rating={entry.healthCheckRating} />
    </div>;
  };
  
  export default EntryDetails;