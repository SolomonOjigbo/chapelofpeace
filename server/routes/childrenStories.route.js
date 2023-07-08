const express = require('express')
const {
  getChildrenStoryController,
  insertChildrenStoryController,
  deleteChildrenStoryController,
  updateChildrenStoryController
} = require('../controllers/childrenstories.controller')

const router = express.Router()
router.get('/children-stories', getChildrenStoryController)

router.post('/children-stories', insertChildrenStoryController)

router.delete('/children-stories/:id', deleteChildrenStoryController)

router.patch('/children-stories/:id', updateChildrenStoryController)

module.exports = router         



