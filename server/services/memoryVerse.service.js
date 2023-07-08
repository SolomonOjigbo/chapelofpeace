const { insertMemoryVerse, getMemoryVerse, deleteMemoryVerse, updateMemoryVerse } = require('../model/memoryVerse.model')

const getMemoryVerseService = async (payload) => {
  try {
  const result = await getMemoryVerse(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertMemoryVerseService = async payload => {
  const result = await insertMemoryVerse(payload)
  return result
}

const deleteMemoryVerseService = async payload => {
  try {
    console.log('delete memory verse service', payload)
    const result = await deleteMemoryVerse(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateMemoryVerseService = async payload => {
  try {
    console.log('update memory verse service', payload)
    const result = await updateMemoryVerse(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getMemoryVerseService,
  insertMemoryVerseService,
  deleteMemoryVerseService,
  updateMemoryVerseService
}
