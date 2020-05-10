require("dotenv").config();
const _ = require("lodash");
const axios = require("axios");
const { Diseases, Symptoms } = require("../models");

/**
 * @swagger
 * /upload:
 *   post:
 *     tags:
 *     - Upload
 *     summary: 동영상 업로드
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *             - file
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '409':
 *         $ref: '#/components/responses/409'
 */

// 질병 상세정보 입력 - 질병 테이블 입력
exports.register = async (req, res, next) => {
  const { code } = req.body;
  try {
    const exDisease = await Diseases.findOne({ where: { code } });

    if (exDisease) {
      res.status(400).json({
        message: "이미 존재하는 코드입니다.",
      });
      return;
    }

    const disease = await Diseases.create({
      ...req.body,
    });
    /* 질병 증상 관계 설정 부분
    const symptoms = await Symptoms.findAll({
        where: {
            id: [1, 2, 3, 5],
        },
    });
    disease.addSymptoms(symptoms);
    */

    res.json(disease);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.disease = async (req, res, next) => {
  const { disease_id } = req.query;

  try {
    if (disease_id) {
      // 질병 상세정보 출력
      const disease = await Diseases.findOne({
          where: {
              id: disease_id
          },
          include: {
              model: Symptoms
          }
      });

      if (!disease) {
        res.status(400).send({ message: "해당 질병이 존재하지 않습니다." });
        return;
      }

      res.send(disease);
    } else {
        // 질병 전체 출력
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.symptomRef = async ( req, res, next ) => {
    const { symptom_id_list } = req.body;
    try {
        // 질병 목록 출력
        const diseases = await Diseases.findAll({
            include: {
                model: Symptoms,
            },
        });
        let symptoms = [], disease_list = [], disease_symptom_list = [];
        for (let disease of diseases) {
            symptoms = await disease.getSymptoms({
                where: {
                    id: symptom_id_list,
                },
            });
            console.log(symptoms);
            if(symptoms && symptoms.length === symptom_id_list.length) {
                disease_list.push(disease);
            }
            /*_.foreach(symptoms, (symptom) => {
              disease_symptom_list.push(symptom.id);
            });
            let counter;
            for (let symptom_input_id of symptom_id_list) {
                if(disease_symptom_list.include(symptom_input_id)) {
                    counter++;
                    if(counter === symptom_id_list.length) break;
                }
            }
            if(counter === symptom_id_list.length) {
                disease_list.push(disease);
            }*/
        }
        res.send(disease_list);
    } catch(error) {
        console.error(error);
        next(error);
    }
};
