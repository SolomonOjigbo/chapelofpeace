const { insertSlider, getSlider, deleteSlider, updateSlider } = require('../model/slider.model')

const getSliderService = async (payload) => {
  try {
  const result = await getSlider(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertSliderService = async payload => {
  const result = await insertSlider(payload)
  return result
}

const deleteSliderService = async payload => {
  try {
    console.log('delete slider service', payload)
    const result = await deleteSlider(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateSliderService = async payload => {
  try {
    console.log('update slider service', payload)
    const result = await updateSlider(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getSliderService,
  insertSliderService,
  deleteSliderService,
  updateSliderService
}
