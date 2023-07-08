const express = require('express')
const {
  getUnitController,
  insertUnitController,
  deleteUnitController,
  updateUnitController
} = require('../controllers/unit.controller')

const router = express.Router()
router.get('/unit', getUnitController)

router.post('/unit', insertUnitController)

router.delete('/unit/:id', deleteUnitController)

router.patch('/unit/:id', updateUnitController)

module.exports = router
