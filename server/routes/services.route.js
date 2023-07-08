const express = require('express')
const {
  getServicesController,
  insertServicesController,
  deleteServicesController,
  updateServicesController
} = require('../controllers/services.controller')

const router = express.Router()
router.get('/services', getServicesController)

router.post('/services', insertServicesController)

router.delete('/services/:id', deleteServicesController)

router.patch('/services/:id', updateServicesController)

module.exports = router
