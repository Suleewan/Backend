//import...
const express = require('express')
const router = express.Router()


// import controllers
const { getReportIssues, register,login,AllProgress, submitReport, Listng, ListL, AllSucceed ,logout,} = require('../controllers/aauth')


router.post('/register',register)
router.post('/login',login)
router.get('/Listng',Listng)
router.get('/ListL',ListL)
router.post('/submitReport',submitReport)
router.get('/AllSucceed',AllSucceed)
router.get('/AllProgress',AllProgress)
router.get('/getReportIssues/:report_id',getReportIssues)
router.post('/logout',logout)





module.exports = router