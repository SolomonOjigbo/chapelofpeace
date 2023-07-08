const express = require('express')
const {
  getMembersOfCouncilController,
  insertMembersOfCouncilController,
  deleteMembersOfCouncilController,
  updateMembersOfCouncilController
} = require('../controllers/membersOfCouncil.controller')

const router = express.Router()
router.get('/members-of-council', getMembersOfCouncilController)

router.post('/members-of-council', insertMembersOfCouncilController)

router.delete('/members-of-council/:id', deleteMembersOfCouncilController)

router.patch('/members-of-council/:id', updateMembersOfCouncilController)

module.exports = router
