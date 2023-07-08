const express = require('express')
const {
  getMeditationsController,
  insertMeditationsController,
  deleteMeditationsController,
  updateMeditationsController
} = require('../controllers/meditations.controller')

const router = express.Router()
router.get('/meditations', getMeditationsController)

router.post('/meditations', insertMeditationsController)

router.delete('/meditations/:id', deleteMeditationsController)

router.patch('/meditations/:id', updateMeditationsController)

module.exports = router
