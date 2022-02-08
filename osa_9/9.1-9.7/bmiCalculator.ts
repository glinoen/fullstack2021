export interface MultiplyValues {
  value1: number;
  value2: number;
}


export const parseArguments = (args: Array<string>):MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmiScore = (weight / height / height) * 10000;
  if (bmiScore < 18.5) {
    return "Underweight";
  }

  if (bmiScore > 24.9) {
    return "Overweight";
  }

  return "Normal (healthy weight)";
};


try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}