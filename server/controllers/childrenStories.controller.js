const {
  getChildrenStoryService,
  insertChildrenStoryService,
  deleteChildrenStoryService,
  updateChildrenStoryService
} = require('../services/childrenStories.service')

const getChildrenStoryController = async (req, res) => {
  const result = await getChildrenStoryService(req.query)
  console.log("result", result)
  res.status(result.statusCode).json(result)
}

const insertChildrenStoryController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertChildrenStoryService(req.body)
  res.status(result.statusCode).json(result) 
}

const deleteChildrenStoryController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteChildrenStoryService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateChildrenStoryController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateChildrenStoryService({id, update})
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getChildrenStoryController,
  insertChildrenStoryController,
  deleteChildrenStoryController,
  updateChildrenStoryController
}
