const { insertPrayerMeetingBulletin, getPrayerMeetingBulletin, deletePrayerMeetingBulletin, updatePrayerMeetingBulletin } = require('../model/prayerMeetingBulletin.model')

const getPrayerMeetingBulletinService = async (payload) => {
  try {
  const result = await getPrayerMeetingBulletin(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertPrayerMeetingBulletinService = async payload => {
  const result = await insertPrayerMeetingBulletin(payload)
  return result
}

const deletePrayerMeetingBulletinService = async payload => {
  try {
    console.log('delete prayer meeting bulletin service', payload)
    const result = await deletePrayerMeetingBulletin(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updatePrayerMeetingBulletinService = async payload => {
  try {
    console.log('update prayer meeting bulletin service', payload)       
    const result = await updatePrayerMeetingBulletin(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getPrayerMeetingBulletinService,
  insertPrayerMeetingBulletinService,
  deletePrayerMeetingBulletinService,
  updatePrayerMeetingBulletinService
}

