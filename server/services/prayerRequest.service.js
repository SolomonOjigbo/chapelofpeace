const { insertPrayerRequest, getPrayerRequest, deletePrayerRequest, updatePrayerRequest } = require('../model/prayerRequest.model')

const getPrayerRequestService = async (payload) => {
  try {
  const result = await getPrayerRequest(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertPrayerRequestService = async payload => {
  const result = await insertPrayerRequest(payload)
  return result
}
const deletePrayerRequestService = async payload => {
  try {
    console.log('delete prayer request service', payload)
    const result = await deletePrayerRequest(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updatePrayerRequestService = async payload => {
  try {
    console.log('update prayer request service', payload)
    const result = await updatePrayerRequest(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getPrayerRequestService,
  insertPrayerRequestService,
  deletePrayerRequestService,
  updatePrayerRequestService
}
 