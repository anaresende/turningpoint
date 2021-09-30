const express = require('express');
const router = express.Router();
const MoloniApi = require('../api/moloni')

/* GET users listing. */
router.get('/get-customer/:vat', (req, res, next) => {

  const {vat} = req.params
  console.log('aqui', vat)

  MoloniApi.getByVat(vat)
  .then((response)=> {
    console.log(response)
    res.status(200).json(response.data);
  })
});

router.get('/count', (req, res, next) => {
  console.log('entrou')

  MoloniApi.getCountClients()
  .then((response)=> {
    console.log(response)
    res.status(200).json(response.data);
    // res.json(user)
  })
});




module.exports = router;
