const { EventsModel } = require('../db')
const { generateHash } = require('../utils')
const { Op } = require('sequelize')


const insertEvents = async payload => {
  try {
    const title = await EventsModel.findOne({
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
    const events = await EventsModel.create(payload)
    return {
      error: false,
      message: 'Event Created Successfully',
      statusCode: 201,
      data: events
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

const getEvents = async payload => {
  try {
    console.log('params', payload)
    const { sortBy, order, limit, cursor } = payload
    const query =
      cursor === '0'
        ? { [Op.gt]: parseInt(cursor) }
        : { [Op.lt]: parseInt(cursor) }
    const result = await EventsModel.findAll({
      limit: parseInt(limit),
      order: [[sortBy, order]],
      where: {
        id: query
      },
      raw: true
    })
    console.log('data', result)
    const isEmpty = result.length === 0
    console.log('Event', result)
    return {
      error: isEmpty ? true : false,
      message: isEmpty ? 'No Events' : 'Events',
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

const deleteEvents = async payload => {
  try {
    console.log('model params', payload)
    // Find the record to delete
    const record = await EventsModel.findByPk(payload)

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

const updateEvents = async ({id, update}) => {
  try {
    console.log('model params', id, update)
    const updatedRecord = await EventsModel.update(update, {
      where: { id },
      returning: true
    })
    const updatedData = await EventsModel.findOne({ where: { id } })
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
      message: 'Event Updated Successfully',
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
  insertEvents,
  getEvents,
  deleteEvents,
  updateEvents
}
