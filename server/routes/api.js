var express = require('express');
var router = express.Router();
var Chat = require("../models/chat")
/* GET home page. */

router.post('/message', function (req, res, next) {
    let created_date = Date.now()
    var { id, sender, message } = req.body;
    Chat.create({ id, sender, message, created_date }, (err, data) => {
        res.status(201).json({
            success: true,
            message: "message have been added",
            data: data
        })
    })

});

router.get('/message/', function (req, res, next) {
    Chat.find(
        {}).exec(function (err, data) {
            res.status(200).json({
                data
            })
        })
})
router.put('/message/:id', function (req, res, next) {
    var { id } = req.params
    Chat.find({ id }, (err, data) => {
        Chat.findByIdAndupdate(data[0]._id, (err, data) => {
            res.status(201).json({
                success: true,
                message: "message have been deleted",
                data: data
            })
        })
    })


})

router.delete('/message/:id', function (req, res, next) {
    var { id } = req.params
    Chat.find({ id }, (err, data) => {
        Chat.findByIdAndDelete(data[0]._id, (err, data) => {
            res.status(201).json({
                success: true,
                message: "message have been deleted",
                data: data
            })
        })
    })


})

module.exports = router;