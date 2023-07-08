const express = require('express')
const {
  getPrayerMeetingBulletinController,
  insertPrayerMeetingBulletinController,
  deletePrayerMeetingBulletinController,
  updatePrayerMeetingBulletinController
} = require('../controllers/prayerMeetingBulletin.controller')

const router = express.Router()
router.get('/prayer-meeting-bulletin', getPrayerMeetingBulletinController)

router.post('/prayer-meeting-bulletin', insertPrayerMeetingBulletinController)

router.delete('/prayer-meeting-bulletin/:id', deletePrayerMeetingBulletinController)

router.patch('/prayer-meeting-bulletin/:id', updatePrayerMeetingBulletinController)

module.exports = router
