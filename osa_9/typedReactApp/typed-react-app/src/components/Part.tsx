import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  let specificCourseInfo = '';
  switch (coursePart.type) {
    case "normal":
      specificCourseInfo = ' ' + coursePart.description;
      break;
    case "groupProject":
      specificCourseInfo = ' ' + coursePart.groupProjectCount;
      break;
    case "submission":
      specificCourseInfo = ' ' + coursePart.description + ' ' + coursePart.exerciseSubmissionLink;
      break;
    case "special":
      specificCourseInfo = ' ' + coursePart.description + ' ' + coursePart.requirements;
      break;
    default:
      assertNever(coursePart);
      break;
  }

  return (
    <div>
      <b> 
        {coursePart.name}  {coursePart.exerciseCount}  
      </b>
      <p>{specificCourseInfo}</p>
    </div>
  )
};

export default Part;