const { insertMemberships, getMemberships, deleteMemberships, updateMemberships } = require('../model/memberships.model')

const getMembershipsService = async (payload) => {
  try {
  const result = await getMemberships(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertMembershipsService = async payload => {
  const result = await insertMemberships(payload)
  return result
}

const deleteMembershipsService = async payload => {
  try {
    console.log('delete announcement service', payload)
    const result = await deleteMemberships(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateMembershipsService = async payload => {
  try {
    console.log('update membership service', payload)
    const result = await updateMemberships(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getMembershipsService,
  insertMembershipsService,
  deleteMembershipsService,
  updateMembershipsService
}
