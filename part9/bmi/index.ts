import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  console.log(Number(height));
  console.log(Number(weight));
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateBmi(Number(height), Number(weight));

  return res.json({
    height: Number(height),
    weight: Number(weight),
    result,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log(daily_exercises);
  console.log(target);
  if (!target || !daily_exercises) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  const targetNumber = Number(target);
  if (isNaN(targetNumber)) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const array: number[] = [];
  const stringArray = daily_exercises as string[];
  for (let i = 0; i < stringArray.length; i++) {
    const numberValue: number = Number(stringArray[i]);
    if (isNaN(numberValue)) {
      return res.status(400).json({
        error: 'malformatted parameters',
      });
    }
    array[i] = numberValue;
  }

  return res.json(calculateExercises(array, targetNumber));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log('Server running on PORT', PORT);
});
