const {
  insertChildrenStories,
  getChildrenStories,
  deleteChildrenStories,
  updateChildrenStories
} = require('../model/childrenStories.model')

const getChildrenStoryService = async payload => {
  try {
    const result = await getChildrenStories(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertChildrenStoryService = async payload => {
  const result = await insertChildrenStories(payload)
  return result
}

const deleteChildrenStoryService = async payload => {
  try {
    console.log('delete children story service', payload)
    const result = await deleteChildrenStories(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateChildrenStoryService = async payload => {
  try {
    console.log('update children story service', payload)       
    const result = await updateChildrenStories(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getChildrenStoryService,
  insertChildrenStoryService,
  deleteChildrenStoryService,
  updateChildrenStoryService
}
