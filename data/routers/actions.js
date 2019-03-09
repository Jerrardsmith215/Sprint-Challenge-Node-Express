// intialize route
const express = require('express');
const router = express.Router();
const db = require('../helpers/actionModel');

// add middleware
const numberIdCheck = require('../middleware/numberIdCheck');

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
router.get('/', (req, res) => {
    db
        .get()
        .then(actions => {
            res
            .status(200)
            .json(actions);
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve actions from database' });
        });
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (numberIdCheck(id)) {
        db
        .get(id)
        .then(action => {
            if (action) {
                res
                .status(200)
                .json(action);
            } else if (!action) {
                res
                .status(404)
                .json({ err: 'Could not retrieve action with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve actions from database' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not retrieve action from database...'});
    }
    
})

// Update/put logic
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    if (numberIdCheck(id)) {
        db
        .update(id, changes)
        .then(count => {
            if (count) {
                res
                .status(200)
                .json({ message: `action ${id} successfully updated!`});
            } else if (!count) {
                res
                .status(404)
                .json({ err: 'Could not update action with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not update action...' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not update action...'});
    }
    
})

// Delete/remove logic

module.exports = router;