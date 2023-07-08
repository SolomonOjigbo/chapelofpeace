const express = require('express')
const {
  getEventsController,
  insertEventsController,
  deleteEventsController,
  updateEventsController
} = require('../controllers/events.controller')

const router = express.Router()
router.get('/events', getEventsController)

router.post('/events', insertEventsController)

router.delete('/events/:id', deleteEventsController)

router.patch('/events/:id', updateEventsController)

module.exports = router         



