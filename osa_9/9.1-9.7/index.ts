import express from 'express';
import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (__req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!isNaN(weight) && !isNaN(height)) {
      res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
      });
  } else {
    res.status(400).send({
      message: "malformatted parameters"
   });
  }
});

app.post('/exercises', (req,res) => {
  const daily_exercises:Array<string> = req.body.daily_exercises;
  const target = Number(req.body.target);
  if(daily_exercises.length > 0 && target) {
    if(daily_exercises.every(x => !isNaN(Number(x))) && !isNaN(target)) {
      const numberArray = daily_exercises.map((i) => Number(i));
      res.send(calculateExercises(numberArray, target));
    } else {
      res.status(400).send({
        message: "malformed parameters"
     });
    }
  } else {
    res.status(400).send({
      message: "parameters missing"
   });
  }


});
// app.post('/exercises', (req, res) => {
//   const { targetArgument, exerciseHours } = exCal.parseArgumentsExercises(req.daily_exercises.unshift(req.target));
//   exCal.calculateExercises(exerciseHours, targetArgument);
//   res.send('Hello Full Stack!');
// });


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


