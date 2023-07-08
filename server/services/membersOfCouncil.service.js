const { insertMembersOfCouncil, getMembersOfCouncil, deleteMembersOfCouncil, updateMembersOfCouncil } = require('../model/membersOfCouncil.model')

const getMembersOfCouncilService = async (payload) => {
  try {
  const result = await getMembersOfCouncil(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertMembersOfCouncilService = async payload => {
  const result = await insertMembersOfCouncil(payload)
  return result
}

const deleteMembersOfCouncilService = async payload => {
  try {
    console.log('delete members of council service', payload)
    const result = await deleteMembersOfCouncil(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateMembersOfCouncilService = async payload => {
  try {
    console.log('update member of council service', payload)
    const result = await updateMembersOfCouncil(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getMembersOfCouncilService,
  insertMembersOfCouncilService,
  deleteMembersOfCouncilService,
  updateMembersOfCouncilService
}
