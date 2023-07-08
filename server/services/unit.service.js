const {
  insertUnit,
  getUnit,
  deleteUnit,
  updateUnit
} = require('../model/unit.model')

const getUnitService = async payload => {
  try {
    const result = await getUnit(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertUnitService = async payload => {
  const result = await insertUnit(payload)
  return result
}

const deleteUnitService = async payload => {
  try {
    console.log('delete unit service', payload)
    const result = await deleteUnit(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateUnitService = async payload => {
  try {
    console.log('update unit service', payload)
    const result = await updateUnit(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getUnitService,
  insertUnitService,
  deleteUnitService,
  updateUnitService
}
