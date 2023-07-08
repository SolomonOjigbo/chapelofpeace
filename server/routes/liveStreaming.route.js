const express = require('express')
const {
    getLiveStreamingController,
    insertLiveStreamingController,
    deleteLiveStreamingController,
    updateLiveStreamingController
} = require('../controllers/liveStreaming.controller')

const router = express.Router()
router.get('/live-streaming', getLiveStreamingController)

router.post('/live-streaming', insertLiveStreamingController)

router.delete('/live-streaming/:id', deleteLiveStreamingController)

router.patch('/live-streaming/:id', updateLiveStreamingController)

module.exports = router



