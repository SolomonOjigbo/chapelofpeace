const {
    insertEvents,
    getEvents,
    deleteEvents,
    updateEvents
} = require('../model/events.model')

const getEventsService = async payload => {
    try {
        const result = await getEvents(payload)
        return result
    } catch (error) {
        console.log("service error", error)
        return { data: [], error: true, statusCode: 500, message: 'Error' }
    }
}

const insertEventsService = async payload => {
    const result = await insertEvents(payload)
    return result
}

const deleteEventsService = async payload => {
    try {
        console.log('delete events service', payload)
        const result = await deleteEvents(payload)
        return result
    } catch {
        return { data: [], error: true, statusCode: 500, message: 'Error' }
    }
}

const updateEventsService = async payload => {
    try {
        console.log('update events service', payload)
        const result = await updateEvents(payload)
        return result
    } catch {
        return { data: [], error: true, statusCode: 500, message: 'Error' }
    }
}

module.exports = {
    getEventsService,
    insertEventsService,
    deleteEventsService,
    updateEventsService
}
