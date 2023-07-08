const {
  insertBibleStudySchedules,
  getBibleStudySchedules,
  deleteBibleStudySchedules,
  updateBibleStudySchedules
} = require('../model/bibleStudySchedules.model')

const getBibleStudySchedulesService = async payload => {
  try {
    const result = await getBibleStudySchedules(payload)
    return result
  } catch(error) {
    console.log(error)
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertBibleStudySchedulesService = async payload => {
  const result = await insertBibleStudySchedules(payload)
  return result
}

const deleteBibleStudySchedulesService = async payload => {
  try {
    console.log('delete bible study schedule service', payload)
    const result = await deleteBibleStudySchedules(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateBibleStudySchedulesService = async payload => {
  try {
    console.log('update bible study schedule service', payload)
    const result = await updateBibleStudySchedules(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getBibleStudySchedulesService,
  insertBibleStudySchedulesService,
  deleteBibleStudySchedulesService,
  updateBibleStudySchedulesService
}
