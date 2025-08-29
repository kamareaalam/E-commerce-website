const express = require('express')
const { createusers, getcreateuser , updateCreateuser, DeleteCreateuser} = require('../controllers/createusercontroller')

const router = express.Router()

// get all createsruser
router.get('/createuser/list', createusers)

//Get a single createuser
router.post('/createuser', getcreateuser)

// update a createuser
router.put('/createuser/update/:id', updateCreateuser)

// delete a createuser
router.delete('/createuser/delete/:id', DeleteCreateuser)

module.exports = router