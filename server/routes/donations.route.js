const express = require('express')
const {
  getDonationsController,
  insertDonationsController,
  deleteDonationsController,
  updateDonationsController
} = require('../controllers/donations.controller')

const router = express.Router()
router.get('/donations', getDonationsController)

router.post('/donations', insertDonationsController)

router.delete('/donations/:id', deleteDonationsController)

router.patch('/donations/:id', updateDonationsController)

module.exports = router
