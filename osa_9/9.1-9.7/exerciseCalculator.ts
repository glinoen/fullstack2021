export interface Values {
  targetArgument: number;
  exerciseHours: Array<number>;
}
export const parseArgumentsExercises = (args: Array<string>):Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) throw new Error('Provided values were not numbers!');
  const argumentsHours: Array<number> = [];
  for (let i = 3; i<args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      argumentsHours.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  return {
    targetArgument: Number(args[2]),
    exerciseHours: argumentsHours
  };

};

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
  let rating, ratingDescription;
  const average = exerciseHours.reduce((a,b) => a + b, 0) / exerciseHours.length;
  if (average >= target + 0.5 ) {
    rating = 3;
    ratingDescription = "very good";
  }else if (average >= target ) {
    rating = 2;
    ratingDescription = "good";
  } else {
    rating = 1;
    ratingDescription = "didnt reach target";
  }
  return {
      periodLength: exerciseHours.length,
      trainingDays: exerciseHours.filter(value => value > 0).length,
      success: average >= target,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: average
    };
    
};


try {
  const { targetArgument, exerciseHours } = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(exerciseHours, targetArgument));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}