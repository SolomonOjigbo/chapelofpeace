const {
    getLiveStreamingService,
    insertLiveStreamingService,
    deleteLiveStreamingService,
    updateLiveStreamingService
} = require('../services/liveStreaming.service')

const getLiveStreamingController = async (req, res) => {
    const result = await getLiveStreamingService(req.query)
    console.log("result", result)
    res.status(result.statusCode).json(result)
}

const insertLiveStreamingController = async (req, res) => {
    console.log('req.body>>>>', req.body)
    const result = await insertLiveStreamingService(req.body)
    res.status(result.statusCode).json(result)
}

const deleteLiveStreamingController = async (req, res) => {
    console.log('req', req.params)
    const result = await deleteLiveStreamingService(req.params.id)
    console.log('result', result)
    res.status(result.statusCode).json(result)
}

const updateLiveStreamingController = async (req, res) => {
    console.log('req.body>>>>', req.body)
    console.log('req.params.id>>>>', req.params.id)
    const id = req.params.id
    const update = req.body
    const result = await updateLiveStreamingService({ id, update })
    console.log('result', result)
    res.status(result.statusCode).json(result)
}

module.exports = {
    getLiveStreamingController,
    insertLiveStreamingController,
    deleteLiveStreamingController,
    updateLiveStreamingController
}
