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
        const data = await axios.get(`http://apis.data.go.kr/B551182/diseasesInfoService/getDissNameCodeList?sickType=1&medTp=2&diseasesType=SICK_NM&searchText=${searchText}&ServiceKey=${serviceKey}`);
        console.log(data.data);
        res.send(data.data);
    } catch(e) {
        console.error(e);
        return;
    }
});

router.post('/symptoms', SymptomController.register);
router.get('/symptoms', SymptomController.list);
router.get('/symptoms/:id', SymptomController.read);
router.patch('/symptoms/:id', SymptomController.update);
router.delete('/symptoms/:id', SymptomController.delete);

router.post('/diseases', DiseaseController.register);
router.get('/diseases', DiseaseController.list);
router.get('/diseases/:id', DiseaseController.read);
router.patch('/diseases/:id', DiseaseController.update);
router.delete('/diseases/:id', DiseaseController.delete);

router.post('/drugs', DrugController.register);
router.get('/drugs/:id', DrugController.read);
router.patch('/drugs/:id', DrugController.update);
router.delete('/drugs/:id', DrugController.delete);

router.post('/parts', PartController.register);
router.get('/parts/:id', PartController.read);
router.get('/parts', PartController.list);
router.patch('/parts/:id', PartController.update);
router.delete('/parts/:id', PartController.delete);

router.post('/subjects', SubjectController.register);
router.get('/subjects/:id', SubjectController.read);
router.patch('/subjects/:id', SubjectController.update);
router.delete('/subjects/:id', SubjectController.delete);

module.exports = router;