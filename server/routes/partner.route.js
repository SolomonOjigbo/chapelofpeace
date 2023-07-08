const express = require('express')
const {
  getPartnerController,
  insertPartnerController,
  deletePartnerController,
  updatePartnerController
} = require('../controllers/partner.controller')

const router = express.Router()
router.get('/partner', getPartnerController)

router.post('/partner', insertPartnerController)

router.delete('/partner/:id', deletePartnerController)

router.patch('/partner/:id', updatePartnerController)

module.exports = router
