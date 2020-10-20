require('dotenv').config();
const axios = require('axios');

exports.hospital = async (request, response) => {
    const { default_subject, longitude, latitude } = request.body;

    const url =
        `http://apis.data.go.kr/B551182/hospInfoService/getHospBasisList?serviceKey=${process.env.PUBLIC_DATA_CLIENT_ID}&` +
        `numOfRows=50&dgsbjtCd=${default_subject}&xPos=${longitude}&yPos=${latitude}&radius=1000`
    try {
        const {
            data: {
                response: {
                    body: {
                        items: {item},
                    },
                },
            },
        } = await axios.get(url)

        response.json(item);
    } catch (error) {
        console.log(error)
    }
}

exports.pharmacy = async (request, response) => {
    const { longitude, latitude } = request.body;

    const url =
        `http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire?serviceKey=${process.env.PUBLIC_DATA_CLIENT_ID}&` +
        `WGS84_LON=${longitude}&WGS84_LAT=${latitude}&numOfRows=10&pageNo=1`
    try {
        const {
            data: {
                response: {
                    body: {
                        items: { item },
                    },
                },
            },
        } = await axios.get(url);

        response.json(item);
    } catch (error) {
        console.log(error)
    }
}
