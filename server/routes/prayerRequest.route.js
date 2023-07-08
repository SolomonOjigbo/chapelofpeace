const express = require('express')
const {
  getPrayerRequestController,
  insertPrayerRequestController,
  deletePrayerRequestController,
  updatePrayerRequestController
} = require('../controllers/prayerRequest.controller')

const router = express.Router()
router.get('/prayer-request', getPrayerRequestController)

router.post('/prayer-request', insertPrayerRequestController)

router.delete('/prayer-request/:id', deletePrayerRequestController)

router.patch('/prayer-request/:id', updatePrayerRequestController)

module.exports = router
