const express = require("express")
const router = express.Router()
const Sock = require('../models/sock')

router.get('/socks/', (req, res) => {
    Sock.find({})
        .then(socks => {
            res.render("../views/socks/index.hbs", {socks})
        })
        .catch(err => console.log(err))
})
router.post('/socks/', (req, res) => {
    console.log(req.body)
    Sock.create(req.body)
        .then(() => {
            res.redirect('/socks')
        })
        .catch(err => {
            console.log(err);
            res.send("BUGGED OUT");
    })
})


//show
router.get('/socks/:id', (req, res) => {
    const id = req.params.id
    Sock.findById(id)
        .then(sock => {
            res.render('../views/socks/show.hbs', {sock})
        })
        .catch(err => {console.log(err)})
})

router.put('/socks/:id', (req, res) => {
    console.log(req.body)
    const id = req.body.id
    Sock.findByIdAndUpdate(
        {_id: id},
        {
            sockColors: req.body.payload.sockColors,
            stripeColors: req.body.payload.stripeColors,
            gridRows: req.body.payload.gridRows,
            gridCols: req.body.payload.gridCols,
        },
        {new: true}
    )
    .then(sock => {
        console.log(sock)
        res.send("success");
    })
    .catch(err => {console.log(err)});
})

router.delete('/socks/:id', (req, res) => {
    console.log("nerd")
    Sock.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send("solid")
        })
        .catch(err => {console.log(err)})
})

module.exports = router;