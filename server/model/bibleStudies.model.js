const { Op } = require('sequelize')
const { BibleStudyModel } = require('../db')
const { generateHash } = require('../utils')

const insertBibleStudies = async payload => {
  try {
    const title = await BibleStudyModel.findOne({
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
    const bibleStudy = await BibleStudyModel.create(payload)
    return {
      error: false,
      message: 'Bible Study Created Successfully',
      statusCode: 201,
      data: bibleStudy
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

const getBibleStudies = async (payload) => {
  try {
    console.log('params', payload)
    const { sortBy, order, limit, cursor } = payload
    const query =
      cursor === '0'
        ? { [Op.gt]: parseInt(cursor) }
        : { [Op.lt]: parseInt(cursor) }
    const result = await BibleStudyModel.findAll({
      limit: parseInt(limit),
      order: [[sortBy, order]],
      where: {
        id: query
      },
      raw: true
    })
    console.log('All Bible Study', result)
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
        message: 'Bible Study',
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

const deleteBibleStudies = async payload => {
  try {
    console.log('model params', payload)
    // Find the record to delete
    const record = await BibleStudyModel.findByPk(payload)

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

const updateBibleStudies = async ({ id, update }) => {
  try {
    console.log('model params', id, update)
    const updatedRecord = await BibleStudyModel.update(update, {
      where: { id },
      returning: true
    })
    const updatedData = await BibleStudyModel.findOne({ where: { id } })
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

module.exports = { insertBibleStudies, getBibleStudies, deleteBibleStudies, updateBibleStudies }
