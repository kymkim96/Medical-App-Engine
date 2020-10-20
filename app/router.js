const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');
const DiseaseController = require('./controllers/DiseaseController');
const SymptomController = require('./controllers/SymptomController');
const DrugController = require('./controllers/DrugController');
const PartController = require('./controllers/PartController');
const SubjectController = require('./controllers/SubjectController');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const ExternController = require('./controllers/ExternController');

const withAdmin = passport.authenticate('jwt', { session: false });

router.get('/', (req, res) => {
    res.json({ message: 'Home' });
});

const serviceKey = process.env.SERVICE_KEY;
const searchText = encodeURIComponent('병적 골절을');

router.get('/api-diseases', async (req, res) => {
    try {
        // const data = await axios.get(`http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList?` +
        //     `serviceKey=${serviceKey}&pageNo=1&numOfRows=99`);
        // console.log(data.data);
        // res.send(data.data);

        // let count = 1;
        // while(1) {
        //     const data = await axios.get(`http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList?` +
        //         `serviceKey=${serviceKey}&pageNo=${count}&numOfRows=99`);
        //     count++
        //     console.log(data.data.response.body.items.item);
        //     if (count === 99999) {
        //         break;
        //     }
        // }
    } catch(e) {
        console.error(e);
        return;
    }
});

router.post('/users', AuthController.register);
router.post('/sign-in', AuthController.signIn);
router.get('/profile', withAdmin, UserController.profile);
router.get('/users', withAdmin, UserController.list);
router.get('/users/:id', withAdmin, UserController.read);
router.patch('/users/:id', withAdmin, UserController.update);
router.delete('/users/:id', withAdmin, UserController.delete);

router.post('/symptoms', withAdmin, SymptomController.register);
router.get('/symptoms', SymptomController.list);
router.get('/symptoms/:id', SymptomController.read);
router.patch('/symptoms/:id', withAdmin, SymptomController.update);
router.delete('/symptoms/:id', withAdmin, SymptomController.delete);

router.post('/diseases', withAdmin, DiseaseController.register);
router.get('/diseases', DiseaseController.list);
router.get('/diseases/:id', DiseaseController.read);
router.patch('/diseases/:id', withAdmin, DiseaseController.update);
router.delete('/diseases/:id', withAdmin, DiseaseController.delete);

router.post('/drugs', withAdmin, DrugController.register);
router.get('/drugs', DrugController.list);
router.get('/drugs/:id', DrugController.read);
router.patch('/drugs/:id', withAdmin, DrugController.update);
router.delete('/drugs/:id', withAdmin, DrugController.delete);

router.post('/parts', withAdmin, PartController.register);
router.get('/parts/:id', PartController.read);
router.get('/parts', PartController.list);
router.patch('/parts/:id', withAdmin, PartController.update);
router.delete('/parts/:id', withAdmin, PartController.delete);

router.post('/subjects', withAdmin, SubjectController.register);
router.get('/subjects', SubjectController.list);
router.get('/subjects/:id', SubjectController.read);
router.patch('/subjects/:id', withAdmin, SubjectController.update);
router.delete('/subjects/:id', withAdmin, SubjectController.delete);

router.post('/hospitals', ExternController.hospital);
router.post('/pharmacies', ExternController.pharmacy);

module.exports = router;