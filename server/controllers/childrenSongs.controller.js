const {
  getChildrenSongsService,
  insertChildrenSongsService,
  deleteChildrenSongsService,
  updateChildrenSongsService
} = require('../services/childrenSongs.service')

const getChildrenSongsController = async (req, res) => {
  const result = await getChildrenSongsService(req.query)
  res.status(result.statusCode).json(result)
}

const insertChildrenSongsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  const result = await insertChildrenSongsService(req.body)
  res.status(result.statusCode).json(result)
}

const deleteChildrenSongsController = async (req, res) => {
  console.log('req', req.params)
  const result = await deleteChildrenSongsService(req.params.id)
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

const updateChildrenSongsController = async (req, res) => {
  console.log('req.body>>>>', req.body)
  console.log('req.params.id>>>>', req.params.id)
  const id = req.params.id
  const update = req.body
  const result = await updateChildrenSongsService({ id, update })
  console.log('result', result)
  res.status(result.statusCode).json(result)
}

module.exports = {
  getChildrenSongsController,
  insertChildrenSongsController,
  deleteChildrenSongsController,
  updateChildrenSongsController
}
