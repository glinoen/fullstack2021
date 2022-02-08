import React from 'react';
import { CoursePart } from '../types'
import Part from './Part';



const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course) =>
      <Part coursePart={course} key={course.name}/> 
      )}
    </div>
  );
};

export default Content;