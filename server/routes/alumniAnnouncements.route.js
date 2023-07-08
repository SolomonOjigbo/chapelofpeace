const express = require('express')
const {
  getAlumniAnnouncementsController,
  insertAlumniAnnouncementsController,
  deleteAlumniAnnouncementsController,
  updateAlumniAnnouncementsController
} = require('../controllers/alumniAnnouncements.controller')

const router = express.Router()

router.get('/alumni-announcements', getAlumniAnnouncementsController)

router.post('/alumni-announcements', insertAlumniAnnouncementsController)

router.delete('/alumni-announcements/:id', deleteAlumniAnnouncementsController)

router.patch('/alumni-announcements/:id', updateAlumniAnnouncementsController)

module.exports = router         



