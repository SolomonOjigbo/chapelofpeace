const express = require('express')
const {
  getChildrenSongsController,
  insertChildrenSongsController,
  deleteChildrenSongsController,
  updateChildrenSongsController
} = require('../controllers/childrenSongs.controller')

const router = express.Router()
router.get('/children-songs', getChildrenSongsController)

router.post('/children-songs', insertChildrenSongsController)

router.delete('/children-songs/:id', deleteChildrenSongsController)

router.patch('/children-songs/:id', updateChildrenSongsController)

module.exports = router
