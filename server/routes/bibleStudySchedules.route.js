const express = require('express')
const {
  getBibleStudySchedulesController,
  insertBibleStudySchedulesController,
  deleteBibleStudySchedulesController,
  updateBibleStudySchedulesController
} = require('../controllers/bibleStudySchedules.controller')

const router = express.Router()
router.get('/bible-study-schedules', getBibleStudySchedulesController)

router.post('/bible-study-schedules', insertBibleStudySchedulesController)

router.delete('/bible-study-schedules/:id', deleteBibleStudySchedulesController)

router.patch('/bible-study-schedules/:id', updateBibleStudySchedulesController)

module.exports = router
