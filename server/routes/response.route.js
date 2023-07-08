const express = require('express')
const {
  getResponseController,
  insertResponseController,
  deleteResponseController,
  updateResponseController
} = require('../controllers/response.controller')

const router = express.Router()
router.get('/response', getResponseController)

router.post('/response', insertResponseController)

router.delete('/response/:id', deleteResponseController)

router.patch('/response/:id', updateResponseController)

module.exports = router
