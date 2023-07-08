const { insertResponse, getResponse, deleteResponse, updateResponse } = require('../model/response.model')

const getResponseService = async (payload) => {
  try {
  const result = await getResponse(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertResponseService = async payload => {
  const result = await insertResponse(payload)
  return result
}

const deleteResponseService = async payload => {
  try {
    console.log('delete response service', payload)
    const result = await deleteResponse(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateResponseService = async payload => {
  try {
    console.log('update response service', payload)
    const result = await updateResponse(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getResponseService,
  insertResponseService,
  deleteResponseService, 
  updateResponseService
}
