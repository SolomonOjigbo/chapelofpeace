const {
  getPrayerMeetingBulletinService,
  insertPrayerMeetingBulletinService,
  deletePrayerMeetingBulletinService,
  updatePrayerMeetingBulletinService
} = require('../services/prayerMeetingBulletin.service')

const getPrayerMeetingBulletinController = async (req, res) => {
  const result = await getPrayerMeetingBulletinService(req.query)
  res.status(result.statusCode).json(result)
}

const insertPrayerMeetingBulletinController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertPrayerMeetingBulletinService(req.body)
  res.status(result.statusCode).json(result)
}

const deletePrayerMeetingBulletinController = async (req, res) => {
  console.log('req', req.params)
  const result = await deletePrayerMeetingBulletinService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updatePrayerMeetingBulletinController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updatePrayerMeetingBulletinService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getPrayerMeetingBulletinController,
  insertPrayerMeetingBulletinController,
  deletePrayerMeetingBulletinController,
  updatePrayerMeetingBulletinController
}
