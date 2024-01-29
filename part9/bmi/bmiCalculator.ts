type BMIResult = 'Normal (healthy weight)' | 'Overweight' | 'Obese';

interface BMIValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments.');
  if (args.length > 4) throw new Error('Too many arguments.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers.');
  }
};

const calculateBmi = (height: number, weight: number): BMIResult => {
  const bmi = weight / (height * height);

  if (isNaN(bmi)) {
    throw new Error('Bad arguments.');
  }

  if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
