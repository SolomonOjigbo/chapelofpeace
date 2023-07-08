const { insertChildrenSongs, getChildrenSongs, deleteChildrenSongs, updateChildrenSongs } = require('../model/childrenSongs.model')

const getChildrenSongsService = async (payload) => {
  try {
  const result = await getChildrenSongs(payload)
    return result;
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertChildrenSongsService = async payload => {
  const result = await insertChildrenSongs(payload)
  return result
}

const deleteChildrenSongsService = async payload => {
  try {
    console.log('delete children songs service', payload)
    const result = await deleteChildrenSongs(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateChildrenSongsService = async payload => {
  try {
    console.log('update announcement service', payload)
    const result = await updateChildrenSongs(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getChildrenSongsService,
  insertChildrenSongsService,
  deleteChildrenSongsService,
  updateChildrenSongsService
}
