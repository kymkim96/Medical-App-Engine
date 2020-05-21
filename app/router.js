const express = require('express');
const router = express.Router();
const axios = require('axios');
const DiseaseController = require('./controllers/DiseaseController');
const SymptomController = require('./controllers/SyptomController');
const DrugController = require('./controllers/DrugController');
const PartController = require('./controllers/PartController');
const SubjectController = require('./controllers/SubjectController');

router.get('/', (req, res) => {
    res.json({ message: 'Home' });
});

const serviceKey = process.env.SERVICE_KEY;
const searchText = encodeURIComponent('병적 골절을');

router.get('/api', async (req, res) => {
    try {
        const data = await axios.get(`http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList?sickType=1&medTp=2&diseaseType=SICK_NM&searchText=${searchText}&ServiceKey=${serviceKey}`);
        console.log(data.data);
        res.send(data.data);
    } catch(e) {
        console.error(e);
        return;
    }
});

router.post('/symptom', SymptomController.register);
router.get('/symptom', SymptomController.list);
router.get('/symptom/:id', SymptomController.read);
router.patch('/symptom/:id', SymptomController.update);
router.delete('/symptom/:id', SymptomController.delete);

router.post('/disease', DiseaseController.register);
router.get('/disease', DiseaseController.list);
router.get('/disease/:id', DiseaseController.read);
router.patch('/disease/:id', DiseaseController.update);
router.delete('/disease/:id', DiseaseController.delete);

router.post('/drug', DrugController.register);
router.get('/drug/:id', DrugController.read);
router.patch('/drug/:id', DrugController.update);
router.delete('/drug/:id', DrugController.delete);

router.post('/part', PartController.register);
router.get('/part/:id', PartController.read);
router.get('/part/:id', PartController.list);
router.patch('/part/:id', PartController.update);
router.delete('/part/:id', PartController.delete);

router.post('/subject', SubjectController.register);
router.get('/subject/:id', SubjectController.read);
router.patch('/subject/:id', SubjectController.update);
router.delete('/subject/:id', SubjectController.delete);

module.exports = router;