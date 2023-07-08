const { Op } = require('sequelize')
const { PrayerMeetingBulletinModel } = require('../db')
const { generateHash } = require('../utils')

const insertPrayerMeetingBulletin = async payload => {
  try {
    const prayerMeetingBulletin = await PrayerMeetingBulletinModel.create(payload)
    return {
      error: false,
      message: 'Prayer Meeting Bulletin Data Submitted Successfully',
      statusCode: 201,
      data: prayerMeetingBulletin
    }
  } catch (error) {
    return {
      error: true,
      message: 'Sorry an error occurred, please try again later',
      statusCode: 500,
      data: null
    }
  }
}

const getPrayerMeetingBulletin = async (payload) => {
  try {
   console.log('params', payload)
    const { sortBy, order, limit, cursor } = payload
    const query =
      cursor === '0'
        ? { [Op.gt]: parseInt(cursor) }
        : { [Op.lt]: parseInt(cursor) }
    const result = await PrayerMeetingBulletinModel.findAll({
      limit: parseInt(limit),
      order: [[sortBy, order]],
      where: {
        id: query
      },
      raw: true
    })
    console.log('All Prayer Meeting Bulletin', result)
    const isEmpty = result.length === 0
    if (isEmpty) { 
      return {
        error: true,
        message: 'No more record found',
        statusCode: 404,
        data: null
      }
    } else {
      return {
        error: false,
        message: 'Prayer Meeting Bulletin',
        data: result,
        statusCode: 201
      }
    }
  } catch (error) {
    return {
      error: true,
      message: 'Sorry an error occurred, please try again later',
      statusCode: 500,
      data: null
    }
  }
}

const deletePrayerMeetingBulletin = async payload => {
  try {
    console.log('model params', payload)
    // Find the record to delete
    const record = await PrayerMeetingBulletinModel.findByPk(payload)

    // Check if the record exists
    if (!record) {
      return {
        error: true,
        message: 'Record not found',
        data: null,
        statusCode: 404
      }
    }

    // Delete the record
    await record.destroy()

    return {
      error: false,
      message: 'Record deleted successfully',
      data: null,
      statusCode: 200
    }
  } catch (error) {
    console.log(error.message)
    return {
      error: true,
      message: 'Sorry, an error occurred',
      data: null,
      statusCode: 500
    }
  }
}

const updatePrayerMeetingBulletin = async ({ id, update }) => {
  try {
    console.log('model params', id, update)
    const updatedRecord = await PrayerMeetingBulletinModel.update(update, {
      where: { id },
      returning: true
    })
    const updatedData = await PrayerMeetingBulletinModel.findOne({ where: { id } })
    console.log('record updated>>>>', updatedData)
    if (updatedData === null) {
      return {
        error: true,
        message: 'Sorry, record does not exist',
        data: null,
        statusCode: 500
      }
    }
    return {
      error: false,
      message: 'Prayer Meeting Bulletin Updated Successfully',
      statusCode: 201,
      data: updatedData
    }
  } catch (error) {
    console.log(error.message)
    return {
      error: true,
      message: 'Sorry, an error occurred',
      data: null,
      statusCode: 500
    }
  }
}

module.exports = { insertPrayerMeetingBulletin, getPrayerMeetingBulletin, deletePrayerMeetingBulletin, updatePrayerMeetingBulletin }
