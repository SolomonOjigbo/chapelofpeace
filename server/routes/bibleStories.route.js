const express = require('express')
const {
  getBibleStoriesController,
  insertBibleStoriesController,
  deleteBibleStoriesController,
  updateBibleStoriesController
} = require('../controllers/bibleStories.controller')

const router = express.Router()
router.get('/bible-stories', getBibleStoriesController)

router.post('/bible-stories', insertBibleStoriesController)

router.delete('/bible-stories/:id', deleteBibleStoriesController)

router.patch('/bible-stories/:id', updateBibleStoriesController)

module.exports = router
