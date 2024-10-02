const express = require('express');
const Event = require('../models/Event');
const router = express.Router();


router.post('/', async (req, res) =>{
    const event = new Event(req.body)
     try {
        const saveEvent = await event.save()
        res.status(201).send(saveEvent)
     } catch (error) {
        console.error(error.message);
        res.status(400).send({ error: 'Failed to create event' });
     }
})

module.exports = router
