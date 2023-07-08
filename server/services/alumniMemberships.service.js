const {
  insertAlumniMemberships,
  getAlumniMemberships,
  deleteAlumniMemberships,
  updateAlumniMemberships
} = require('../model/alumniMemberships.model')

const getAlumniMembershipsService = async (payload) => {
  try {
    const result = await getAlumniMemberships(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertAlumniMembershipsService = async payload => {
  const result = await insertAlumniMemberships(payload)
  return result
}

const deleteAlumniMembershipsService = async payload => {
  try {
    console.log('delete membership service', payload)
    const result = await deleteAlumniMemberships(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateAlumniMembershipsService = async payload => {
  try {
    console.log('update membership service', payload)
    const result = await updateAlumniMemberships(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getAlumniMembershipsService,
  insertAlumniMembershipsService,
  deleteAlumniMembershipsService,
  updateAlumniMembershipsService
}
