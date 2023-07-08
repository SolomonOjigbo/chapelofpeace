const {
    insertLiveStreaming,
    getLiveStreaming,
    deleteLiveStreaming,
    updateLiveStreaming
} = require('../model/liveStreaming.model')

const getLiveStreamingService = async payload => {
    try {
        const result = await getLiveStreaming(payload)
        return result
    } catch {
        return { data: [], error: true, statusCode: 500, message: 'Error' }
    }
}

const insertLiveStreamingService = async payload => {
    const result = await insertLiveStreaming(payload)
    return result
}

const deleteLiveStreamingService = async payload => {
    try {
        console.log('delete live streaming service', payload)
        const result = await deleteLiveStreaming(payload)
        return result
    } catch {
        return { data: [], error: true, statusCode: 500, message: 'Error' }
    }
}

const updateLiveStreamingService = async payload => {
    try {
        console.log('update live streaming service', payload)
        const result = await updateLiveStreaming(payload)
        return result
    } catch {
        return { data: [], error: true, statusCode: 500, message: 'Error' }
    }
}

module.exports = {
    getLiveStreamingService,
    insertLiveStreamingService,
    deleteLiveStreamingService,
    updateLiveStreamingService
}
