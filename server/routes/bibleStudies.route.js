const express = require('express')
const {
  getBibleStudiesController,
  insertBibleStudiesController,
  deleteBibleStudiesController,
  updateBibleStudiesController
} = require('../controllers/bibleStudies.controller')

const router = express.Router()
router.get('/bible-studies', getBibleStudiesController)

router.post('/bible-studies', insertBibleStudiesController)

router.delete('/bible-studies/:id', deleteBibleStudiesController)

router.patch('/bible-studies/:id', updateBibleStudiesController)

module.exports = router
