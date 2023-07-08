const { insertContactUs, getContactUs, deleteContactUs, updateContactUs } = require('../model/contactUs.model')

const getContactUsService = async (payload) => {
  try {
  const result = await getContactUs(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertContactUsService = async payload => {
  const result = await insertContactUs(payload)
  return result
}

const deleteContactUsService = async payload => {
  try {
    console.log('delete contact us service', payload)
    const result = await deleteContactUs(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateContactUsService = async payload => {
  try {
    console.log('update contact us service', payload)
    const result = await updateContactUs(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getContactUsService,
  insertContactUsService,
  deleteContactUsService,
  updateContactUsService
}
