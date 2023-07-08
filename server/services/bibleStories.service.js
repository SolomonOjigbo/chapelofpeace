const { insertBibleStories, getBibleStories, deleteBibleStories, updateBibleStories } = require('../model/bibleStories.model')

const getBibleStoriesService = async (payload) => {
  try {
    const result = await getBibleStories(payload)
    console.log('Bible story service', result)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertBibleStoriesService = async payload => {
  const result = await insertBibleStories(payload)
  return result
}

const deleteBibleStoriesService = async payload => {
  try {
    console.log('delete bible story service', payload)
    const result = await deleteBibleStories(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateBibleStoriesService = async payload => {
  try {
    console.log('update bible story service', payload)
    const result = await updateBibleStories(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getBibleStoriesService,
  insertBibleStoriesService,
  deleteBibleStoriesService,
  updateBibleStoriesService
}
