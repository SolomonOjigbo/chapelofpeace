const {
  getTestimonialService,
  insertTestimonialService,
  deleteTestimonialService,
  updateTestimonialService
} = require('../services/testimonial.service')

const getTestimonialController = async (req, res) => {
  const result = await getTestimonialService(req.query)
  res.status(result.statusCode).json(result)
}

const insertTestimonialController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertTestimonialService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteTestimonialController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteTestimonialService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateTestimonialController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateTestimonialService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getTestimonialController,
  insertTestimonialController,
  deleteTestimonialController,
  updateTestimonialController
}
