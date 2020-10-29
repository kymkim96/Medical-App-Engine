require("dotenv").config();
const axios = require("axios");
const parser = require("xml-js");
const { Drug } = require("../models");
const _ = require("lodash");
const parseDrug = require("../util/parseDrug");

exports.hospital = async (request, response) => {
  const { default_subject, longitude, latitude } = request.body;

  const url =
    `http://apis.data.go.kr/B551182/hospInfoService/getHospBasisList?serviceKey=${process.env.PUBLIC_DATA_CLIENT_ID}&` +
    `numOfRows=50&dgsbjtCd=${default_subject}&xPos=${longitude}&yPos=${latitude}&radius=1000`;
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
    console.log(error);
  }
};

exports.pharmacy = async (request, response) => {
  const { longitude, latitude } = request.body;

  const url =
    `http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire?serviceKey=${process.env.PUBLIC_DATA_CLIENT_ID}&` +
    `WGS84_LON=${longitude}&WGS84_LAT=${latitude}&numOfRows=10&pageNo=1`;
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
    console.log(error);
  }
};

exports.pharmacy_detail = async (request, response) => {
  const { hpid } = request.body;

  try {
    const url =
      `http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyBassInfoInqire?serviceKey=${process.env.PUBLIC_DATA_CLIENT_ID}&` +
      `HPID=${hpid}`;
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
    console.log(error);
  }
};

exports.drugs_data = async (req, res) => {
  try {
    const data = await axios.get(
      `http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService` +
        `/getMdcinPrductItem?type=JSON&ServiceKey=${process.env.PUBLIC_DATA_CLIENT_ID}&numOfRows=100&pageNo=1`
    );
    const newData = parser.xml2json(data.data, {
      compact: true,
      spaces: 4,
    });

    const result = JSON.parse(newData);
    let count = 1;

    for (let index of result.response.body.items.item) {
      // console.log(index)
      // index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0]._attributes.title
      // index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0].PARAGRAPH._cdata
      const { title, cdata } = parseDrug(index);
      console.log(count++);
      await Drug.create({
        name: index.ITEM_NAME._text,
        description: `<p>${title}</p><p>${cdata}</p>`,
        ingredients: index.MAIN_ITEM_INGR._text,
      });
    }

    res.send(newData);
  } catch (e) {
    console.error(e);
  }
};
