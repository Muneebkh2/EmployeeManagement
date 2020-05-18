import express from 'express'
import DB from '../../config/db' // import db connection
import Admin from '../model/Admin' // import model

const router = express.Router()

// test end point
router.get('/test', (req, res) => { // Express way
    DB.query(Admin(), (err, rows) => {
        if (err) {
            throw err
        }
        // console.log(rows);
        res.send(rows)
    })
})

// module.exports = router
export default router