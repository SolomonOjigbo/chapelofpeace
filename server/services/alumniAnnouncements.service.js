const {
  insertAlumniAnnouncements,
  getAlumniAnnouncements,
  deleteAlumniAnnouncements,
  updateAlumniAnnouncements
} = require('../model/alumniAnnouncements.model')

const getAlumniAnnouncementsService = async payload => {
  try {
    const result = await getAlumniAnnouncements(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const insertAlumniAnnouncementsService = async payload => {
  const result = await insertAlumniAnnouncements(payload)
  return result
}

const deleteAlumniAnnouncementsService = async payload => {
  try {
    console.log('delete announcement service', payload)
    const result = await deleteAlumniAnnouncements(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

const updateAlumniAnnouncementsService = async payload => {
  try {
    console.log('update announcement service', payload)       
    const result = await updateAlumniAnnouncements(payload)
    return result
  } catch {
    return { data: [], error: true, statusCode: 500, message: 'Error' }
  }
}

module.exports = {
  getAlumniAnnouncementsService,
  insertAlumniAnnouncementsService,
  deleteAlumniAnnouncementsService,
  updateAlumniAnnouncementsService
}
