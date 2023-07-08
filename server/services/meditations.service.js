const { insertMeditations, getMeditations, deleteMeditations, updateMeditations } = require('../model/meditations.model')

const getMeditationsService = async (payload) => {
  try {
  const result = await getMeditations(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertMeditationsService = async payload => {
  const result = await insertMeditations(payload)
  return result
}

const deleteMeditationsService = async payload => {
  try {
    console.log('delete meditation service', payload)
    const result = await deleteMeditations(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateMeditationsService = async payload => {
  try {
    console.log('update meditation service', payload)
    const result = await updateMeditations(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getMeditationsService,
  insertMeditationsService,
  deleteMeditationsService,
  updateMeditationsService
}
