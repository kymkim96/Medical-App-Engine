const express = require('express');
const router = express.Router();
const axios = require('axios');
const DiseaseController = require('./controllers/DiseaseController');
const SymptomController = require('./controllers/SyptomController');

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

router.get('/symptom', SymptomController.list);
router.post('/symptom', SymptomController.create);

router.post('/disease', DiseaseController.register);
router.get('/disease', DiseaseController.list);
router.get('/disease/:id', DiseaseController.read);
router.patch('/disease/:id', DiseaseController.update);
router.delete('/disease/:id', DiseaseController.delete);

module.exports = router;