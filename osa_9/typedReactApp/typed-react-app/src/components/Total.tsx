import React from 'react';

type CoursePart = {
    name: string;
    exerciseCount: number;
}

type TotalProps = {
  courseParts: Array<CoursePart>;
};

const Total = ({ courseParts }: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;