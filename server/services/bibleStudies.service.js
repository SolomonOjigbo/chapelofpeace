const { insertBibleStudies, getBibleStudies, deleteBibleStudies, updateBibleStudies } = require('../model/bibleStudies.model')

const getBibleStudiesService = async (payload) => {
  try {
  const result = await getBibleStudies(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertBibleStudiesService = async payload => {
  const result = await insertBibleStudies(payload)
  return result
}

const deleteBibleStudiesService = async payload => {
  try {
    console.log('delete announcement service', payload)
    const result = await deleteBibleStudies(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateBibleStudiesService = async payload => {
  try {
    console.log('update announcement service', payload)
    const result = await updateBibleStudies(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getBibleStudiesService,
  insertBibleStudiesService,
  deleteBibleStudiesService,
  updateBibleStudiesService
}
