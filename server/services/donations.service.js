const { insertDonations, getDonations, deleteDonations, updateDonations } = require('../model/donations.model')

const getDonationsService = async (payload) => {
  try {
  const result = await getDonations(payload)
    return result;
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertDonationsService = async payload => {
  const result = await insertDonations(payload)
  return result
}

const deleteDonationsService = async payload => {
  try {
    console.log('delete donations service', payload)
    const result = await deleteDonations(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateDonationsService = async payload => {
  try {
    console.log('update announcement service', payload)
    const result = await updateDonations(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getDonationsService,
  insertDonationsService,
  deleteDonationsService,
  updateDonationsService
}
