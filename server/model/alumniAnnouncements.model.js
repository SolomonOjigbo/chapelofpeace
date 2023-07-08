const { AlumniAnnouncementModel } = require('../db')
const { generateHash } = require('../utils')
const { Op } = require('sequelize')

const getTotalAlumniAnnouncements = async payload => {
  try {
    console.log('params', payload)
    const result = await AlumniAnnouncementModel.count()
    console.log('total', result)
    return {
      error: false,
      message: 'Success',
      data: { totalAlumniAnnouncementCount: result },
      statusCode: 201
    }
  } catch (error) {
    console.log(error.message)
    return {
      error: true,
      message: 'Sorry an error occured',
      data: null,
      statusCode: 500
    }
  }
}

const insertAlumniAnnouncements = async payload => {
  try {
    const title = await AlumniAnnouncementModel.findOne({
      where: { title: payload.title }
    })
    if (title) {
      return {
        error: true,
        message: 'Title already exists',
        statusCode: 406,
        data: null
      }
    }
    const alumniAnnouncement = await AlumniAnnouncementModel.create(payload)
    return {
      error: false,
      message: 'Alumni Announcement Created Successfully',
      statusCode: 201,
      data: alumniAnnouncement
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

const getAlumniAnnouncements = async payload => {
  try {
    console.log('params', payload)
    const { sortBy, order, limit, cursor } = payload
    const query =
      cursor === '0'
        ? { [Op.gt]: parseInt(cursor) }
        : { [Op.lt]: parseInt(cursor) }
    const result = await AlumniAnnouncementModel.findAll({
      limit: parseInt(limit),
      order: [[sortBy, order]],
      where: {
        id: query
      },
      raw: true
    })
    console.log('data', result)
    const isEmpty = result.length === 0
    console.log('Alumni Announcement', result)
    return {
      error: isEmpty ? true : false,
      message: isEmpty ? 'No Announcements' : 'Alumni Announcements',
      data: result,
      statusCode: isEmpty ? 404 : 201
    }
  } catch (error) {
    console.log(error.message)
    return {
      error: true,
      message: 'Sorry an error occured',
      data: null,
      statusCode: 500
    }
  }
}

const deleteAlumniAnnouncements = async payload => {
  try {
    console.log('model params', payload)
    // Find the record to delete
    const record = await AlumniAnnouncementModel.findByPk(payload)

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

const updateAlumniAnnouncements = async ({id, update}) => {
  try {
    console.log('model params', id, update)
    const updatedRecord = await AlumniAnnouncementModel.update(update, {
      where: { id },
      returning: true
    })
    const updatedData = await AlumniAnnouncementModel.findOne({ where: { id } })
    console.log('record updated>>>>', updatedData)
    if(updatedData === null) {
      return {
      error: true,
      message: 'Sorry, record does not exist',
      data: null,
      statusCode: 500
      }
    } 
    return {
      error: false,
      message: 'Alumni Announcement Updated Successfully',
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


module.exports = {
  insertAlumniAnnouncements,
  getAlumniAnnouncements,
  getTotalAlumniAnnouncements,
  deleteAlumniAnnouncements,
  updateAlumniAnnouncements
}
