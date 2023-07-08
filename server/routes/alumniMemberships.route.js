const express = require('express')
const {
  getAlumniMembershipsController,
  insertAlumniMembershipsController,
  deleteAlumniMembershipsController,
  updateAlumniMembershipsController
} = require('../controllers/alumniMemberships.controller')

const router = express.Router()
router.get('/alumni-memberships', getAlumniMembershipsController)

router.post('/alumni-memberships', insertAlumniMembershipsController)

router.delete('/alumni-memberships/:id', deleteAlumniMembershipsController)

router.patch('/alumni-memberships/:id', updateAlumniMembershipsController)

module.exports = router
