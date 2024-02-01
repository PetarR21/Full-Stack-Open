import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.json(patientsService.getPublicPatients());
});

export default router;
