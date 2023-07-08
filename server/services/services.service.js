const { insertServices, getServices, deleteServices, updateServices } = require('../model/services.model')

const getServicesService = async (payload) => {
  try {
  const result = await getServices(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertServicesService = async payload => {
  const result = await insertServices(payload)
  return result
}

const deleteServicesService = async payload => {
  try {
    console.log('delete services service', payload)
    const result = await deleteServices(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateServicesService = async payload => {
  try {
    console.log('update services service', payload)
    const result = await updateServices(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getServicesService,
  insertServicesService,
  deleteServicesService,
  updateServicesService
}
