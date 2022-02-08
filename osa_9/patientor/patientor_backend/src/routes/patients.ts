import express from 'express';
import patientService from '../services/patientService';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientService.addPatient(req.body);
    res.send(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
  try {
    const addedEntryPatient = patientService.addEntry(req.body, req.params.id);
    console.log(addedEntryPatient);
    res.send(addedEntryPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;