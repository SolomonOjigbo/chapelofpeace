const { insertPartner, getPartner, deletePartner, updatePartner } = require('../model/partner.model')

const getPartnerService = async (payload) => {
  try {
  const result = await getPartner(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertPartnerService = async payload => {
  const result = await insertPartner(payload)
  return result
}

const deletePartnerService = async payload => {
  try {
    console.log('delete partner service', payload)
    const result = await deletePartner(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updatePartnerService = async payload => {
  try {
    console.log('update partner service', payload)       
    const result = await updatePartner(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getPartnerService,
  insertPartnerService,
  deletePartnerService,
  updatePartnerService
}
