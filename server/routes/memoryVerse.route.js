const express = require('express')
const {
  getMemoryVerseController,
  insertMemoryVerseController,
  deleteMemoryVerseController,
  updateMemoryVerseController
} = require('../controllers/memoryVerse.controller')

const router = express.Router()
router.get('/memory-verse', getMemoryVerseController)

router.post('/memory-verse', insertMemoryVerseController)

router.delete('/memory-verse/:id', deleteMemoryVerseController)

router.patch('/memory-verse/:id', updateMemoryVerseController)

module.exports = router
