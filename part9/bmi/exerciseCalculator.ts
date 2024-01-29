interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

const parseArgumentsExercise = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments.');

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Target value must be a number.');
  }

  let dailyExerciseHours: number[] = [];
  let i = 3;
  while (args[i]) {
    const value = Number(args[i]);
    if (isNaN(value)) {
      throw new Error('Daily exercise hours must be a number.');
    }
    dailyExerciseHours = [...dailyExerciseHours, value];
    i++;
  }

  return {
    target,
    dailyExerciseHours,
  };
};

const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((d) => d > 0).length;
  const totalHours = dailyExerciseHours.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;

  const success = average >= target;
  const rating = average < target ? 1 : average <= 1.5 * target ? 2 : 3;
  const ratingDescription = rating === 3 ? 'great' : rating == 2 ? 'good' : 'bad';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyExerciseHours } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
