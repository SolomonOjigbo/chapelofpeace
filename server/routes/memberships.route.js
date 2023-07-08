const express = require('express')
const {
  getMembershipsController,
  insertMembershipsController,
  deleteMembershipsController,
  updateMembershipsController
} = require('../controllers/memberships.controller')

const router = express.Router()
router.get('/memberships', getMembershipsController)

router.post('/memberships', insertMembershipsController)

router.delete('/memberships/:id', deleteMembershipsController)

router.patch('/memberships/:id', updateMembershipsController)

module.exports = router
