const express = require('express')
const {
  getSliderController,
  insertSliderController,
  deleteSliderController,
  updateSliderController
} = require('../controllers/slider.controller')

const router = express.Router()
router.get('/slider', getSliderController)

router.post('/slider', insertSliderController)

router.delete('/slider/:id', deleteSliderController)

router.patch('/slider/:id', updateSliderController)

module.exports = router
