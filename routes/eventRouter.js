const express = require('express')
const {createEvent, getEvents, updateEvent, softDeleteEvent} = require('../controller/event')
const {verifyToken} = require('../middleware/authMiddleware')
const {isAdmin} = require('../middleware/roleMiddleware')

const router = express.Router()

router.post('/', createEvent);
router.get('/', verifyToken, getEvents);
router.put('/:eventId', verifyToken, updateEvent);
router.delete('/:eventId', verifyToken, isAdmin, softDeleteEvent);
module.exports = router