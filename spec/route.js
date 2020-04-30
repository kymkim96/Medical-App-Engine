const express = require('express');
const route = express.Router({ prefix: 'v1'});
const axios = require('axios');
const spec = require('../swaggerUI')
const DiseaseController = require('./controllers/DiseaseController');
const SymptomController = require('./controllers/SyptomController');

route.get('/', (req, res) => {
    res.json({ message: 'Home' });
});

const serviceKey = process.env.SERVICE_KEY;
const searchText = encodeURIComponent('병적 골절을');

route.get('/api', async (req, res) => {
    try {
        const data = await axios.get(`http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList?sickType=1&medTp=2&diseaseType=SICK_NM&searchText=${searchText}&ServiceKey=${serviceKey}`);
        console.log(data.data);
        res.send(data.data);
    } catch(e) {
        console.error(e);
        return;
    }
});
route.get('/spec', );

route.get('/symptom', SymptomController.list);
route.post('/symptom', SymptomController.create);

route.get('/disease', DiseaseController.disease);
route.post('/disease', DiseaseController.register);
route.post('/disease/symptom', DiseaseController.symptomRef);

module.exports = route;