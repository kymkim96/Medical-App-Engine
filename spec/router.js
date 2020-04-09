const express = require('express');
const router = express.Router();
const axios = require('axios');

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

module.exports = router;