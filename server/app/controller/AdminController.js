import express from 'express'
import DB from '../../config/db' // import db connection
import Admin from '../model/Admin' // import model

const router = express.Router()

// test end point
router.get('/test', (req, res) => { // Express way
    DB.query(Admin.getDATA(), (err, rows) => {
        if (err) {
            throw err
        }
        res.send(rows)
    })
})

// delete data
// router.delete('/delete', (req, res) => {
//     DB.query(Admin.deleteDATA(), (err) => {
//         if (err) {
//             throw err
//         }
//         res.send("Deleted Successfully !")
//     })
// })

// module.exports = router
export default router