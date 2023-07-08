const { insertTestimonial, getTestimonial, deleteTestimonial, updateTestimonial } = require('../model/testimonial.model')

const getTestimonialService = async (payload) => {
  try {
  const result = await getTestimonial(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertTestimonialService = async payload => {
  const result = await insertTestimonial(payload)
  return result
}

const deleteTestimonialService = async payload => {
  try {
    console.log('delete testimonial service', payload)
    const result = await deleteTestimonial(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateTestimonialService = async payload => {
  try {
    console.log('update announcement service', payload)
    const result = await updateTestimonial(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getTestimonialService,
  insertTestimonialService,
  deleteTestimonialService,
  updateTestimonialService
}
