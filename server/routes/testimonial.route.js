const express = require('express')
const {
  getTestimonialController,
  insertTestimonialController,
  deleteTestimonialController,
  updateTestimonialController
} = require('../controllers/testimonial.controller')

const router = express.Router()
router.get('/testimonial', getTestimonialController)

router.post('/testimonial', insertTestimonialController)

router.delete('/testimonial/:id', deleteTestimonialController)

router.patch('/testimonial/:id', updateTestimonialController)

module.exports = router
