const validateEvent = (req, res, next) => {
    const { title, description, startTime, endTime } = req.body;
    if (!title || !description || !startTime || !endTime) {
        const errorMessage = 'Missing required fields';
        console.error(errorMessage); // Log to console
        return res.status(400).send({ error: errorMessage });
    }
    next();
};

module.exports = validateEvent;


