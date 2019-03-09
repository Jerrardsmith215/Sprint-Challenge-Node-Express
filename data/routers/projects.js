// intialize route
const express = require('express');
const router = express.Router();
const db = require('../helpers/projectModel');

// add middleware
const numberIdCheck = require('../middleware/numberIdCheck');

/* CRUD OPERATIONS */

// Create/post logic
router.post('/', (req, res) => {
    const project = req.body;
    if (project) {
        db
            .insert(project)
            .then(newproject => {
                if (newproject) {
                    res
                        .status(201)
                        .json(newproject);
                } else if (!newproject) {
                    res
                        .status(400)
                        .json({ err: 'Bad request (is client entry blank?)'})
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ err: 'Failed to add project to database...'})
            })
    } else {
        res
            .status(500)
            .json({ err: 'Failed to add project to database (internal error or null/blank input)'})
    }
})

// Read/get logic
router.get('/', (req, res) => {
    db
        .get()
        .then(projects => {
            res
            .status(200)
            .json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve projects from database' });
        });
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (numberIdCheck(id)) {
        db
        .get(id)
        .then(project => {
            if (project) {
                res
                .status(200)
                .json(project);
            } else if (!project) {
                res
                .status(404)
                .json({ err: 'Could not retrieve project with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve projects from database' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not retrieve project from database...'});
    }
    
})

// Update/put logic
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body
    const changes = req.body
    if ((name, description) && description.length < 128) {
        db
        .update(id, changes)
        .then(count => {
            if (count) {
                res
                .status(200)
                .json({ message: `project ${id} successfully updated!`});
            } else if (!count) {
                res
                .status(404)
                .json({ err: 'Could not update project with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not update project...' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not update project...'});
    }
    
})

// Delete/remove logic
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (numberIdCheck(id)) {
        db
        .remove(id)
        .then(count => {
            if (count) {
                res
                .status(200)
                .json({ message: `project ${id} successfully deleted!`});
            } else if (!count) {
                res
                .status(404)
                .json({ err: 'Could not delete project with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not delete project...' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not delete project...'});
    }
    
})

module.exports = router;