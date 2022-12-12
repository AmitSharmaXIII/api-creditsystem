var express = require('express');
const { body, validationResult, check } = require('express-validator');
var router = express.Router();
const { credit } = require('../utils/db.js');
const { luhnAlgoCheck } = require('../utils/util.js');

/* POST creditcards */
router.post('/',
  check('name').isLength({ min: 1 }).withMessage('name field must be at least 1 chars long'),
  check('cardNumber').exists().withMessage('card number is mandatory').isInt().withMessage('must be numeric').isLength({ max: 19 }).withMessage('must within 19 chars'),
  check('limit').optional().isInt().withMessage('must be numeric'),
  async function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let body = req.body;
    body.limit = body.limit ? Number(body.limit) : 0;

    const cccheck = await luhnAlgoCheck(body.cardNumber);
    if (!cccheck) {
      res.status(400).send({ "message": "Invalid card number" });
    } else {
      var resultObj = credit.insert(body);
      res.status(201).send({
        id: resultObj.$loki,
        name: resultObj.name,
        cardNumber: resultObj.cardNumber,
        limit: resultObj.limit

      });
    }
  });


/* GET specific creditcard detail. */

router.get('/:id', (req, res) => {
  const id = req.params.id;
  var results = credit.where(function (obj) {
    return (obj.$loki == id);
  });
  if (results.length != 0) {
    results = results.map(({ $loki, name, cardNumber, limit, ...rest }) => { return ({ id: $loki, name: name, cardNumber: cardNumber, limit: limit }) });
    res.status(200).send(results)
  } else {
    res.status(404).send({ message: `No data exists with id : ${id}` })
  }
});


/* GET creditcards listing. */
router.get('/', function (req, res, next) {
  var results = credit.where(function (obj) {
    return (obj.name != null);
  });
  if (results.length > 0) {
    results = results.map(({ $loki, name, cardNumber, limit }) => { return ({ id: $loki, name: name, cardNumber: cardNumber, limit: limit }) });
  }
  res.status(200).send({ "total": results.length, Items: results });
});

module.exports = router;
