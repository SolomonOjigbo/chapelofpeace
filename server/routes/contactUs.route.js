const express = require('express')
const {
  getContactUsController,
  insertContactUsController, deleteContactUsController, updateContactUsController
} = require('../controllers/contactUs.controller')

const router = express.Router()
router.get('/contact-us', getContactUsController)

router.post('/contact-us', insertContactUsController)

router.delete('/contact-us/:id', deleteContactUsController)

router.patch('/contact-us/:id', updateContactUsController)

module.exports = router
