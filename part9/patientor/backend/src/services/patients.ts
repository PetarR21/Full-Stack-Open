import { PublicPatient, NewPatient, Patient } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid() as string,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPublicPatients, addPatient };
