const { Op } = require('sequelize')
const { MembershipModel } = require('../db')
const { generateHash } = require('../utils')

const insertMemberships = async payload => {
  try {
    const membership = await MembershipModel.create(payload)
    return {
      error: false,
      message: 'Membership Submitted Successfully',
      statusCode: 201,
      data: membership
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

const getMemberships = async (payload) => {
  try {
    console.log('params', payload)
    const { sortBy, order, limit, cursor } = payload
    const query =
      cursor === '0'
        ? { [Op.gt]: parseInt(cursor) }
        : { [Op.lt]: parseInt(cursor) }
    const result = await MembershipModel.findAll({
      limit: parseInt(limit),
      order: [[sortBy, order]],
      where: {
        id: query
      },
      raw: true
    })
    console.log('All Memberships', result)
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
        message: 'Memberships',
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

const deleteMemberships = async payload => {
  try {
    console.log('model params', payload)
    // Find the record to delete
    const record = await MembershipModel.findByPk(payload)

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

const updateMemberships = async ({ id, update }) => {
  try {
    console.log('model params', id, update)
    const updatedRecord = await MembershipModel.update(update, {
      where: { id },
      returning: true
    })
    const updatedData = await MembershipModel.findOne({ where: { id } })
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
      message: 'Membership Data Updated Successfully',
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

module.exports = { insertMemberships, getMemberships, deleteMemberships, updateMemberships }
