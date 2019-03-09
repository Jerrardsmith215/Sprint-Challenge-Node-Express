// intialize route
const express = require('express');
const router = express.Router();
const db = require('../helpers/actionModel');

/* CRUD OPERATIONS */

// Create/post logic
router.post('/', (req, res) => {
    const action = req.body;
    if (action) {
        db
            .insert(action)
            .then(newAction => {
                if (newAction) {
                    res
                        .status(201)
                        .json(newAction);
                } else if (!newAction) {
                    res
                        .status(400)
                        .json({ err: 'Bad request (is client entry blank?)'})
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ err: 'Failed to add action to database...'})
            })
    } else {
        res
            .status(500)
            .json({ err: 'Failed to add action to database (internal error or null/blank input)'})
    }
})

// Read/get logic

// Update/put logic

// Delete/remove logic

module.exports = router;