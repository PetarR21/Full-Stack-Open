import express from 'express';
import patientsService from '../services/patients';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.json(patientsService.getPublicPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let message = 'Something went wrong.';
    if (error instanceof Error) {
      message += ' Error: ' + error.message;
    }

    res.status(400).send(message);
  }
});
export default router;
