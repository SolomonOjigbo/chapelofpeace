const {
  getBibleStoriesService,
  insertBibleStoriesService,
  deleteBibleStoriesService,
  updateBibleStoriesService
} = require('../services/bibleStories.service')

const getBibleStoriesController = async (req, res) => {
  const result = await getBibleStoriesService(req.query)
  console.log('bible story controller result', result)
  res.status(result.statusCode).json(result)
}

const insertBibleStoriesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertBibleStoriesService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteBibleStoriesController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteBibleStoriesService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateBibleStoriesController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateBibleStoriesService({id, update})
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getBibleStoriesController,
  insertBibleStoriesController,
  deleteBibleStoriesController,
  updateBibleStoriesController
}
