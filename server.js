// server.js
const bodyParser = require("body-parser")
const crypto = require("crypto")
require('dotenv').config
const express = require("express")
const path = require("path")
const Pusher = require("pusher")


const app = express()

// initialize Pusher with appId, key, and secret
// const pusher = new Pusher({
//     appId: process.env.VUE_APP_ID,
//     key: process.env.VUE_APP_KEY,
//     secret: process.env.VUE_APP_SECRET,
//     cluster: process.env.VUE_APP_CLUSTER,
//     useTLS: true
// })

const pusher = new Pusher({
    appId: "976766",
    key: "04d1b15146121c04bc9d",
    secret: "a8fc8c25320ec7b126a2",
    cluster: "us3",
    useTLS: true
})

// apply middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// fix cors issues
app.use((req, res, next) => {
    // website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*")
    // request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH, POST, PUT, DELETE")
    // request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
    // set to tru if you need the website to include cookies in the request sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true)
    // pass to next layer
    next()
})

// index API route for the Express app
app.get("/", (req, res) => {
    res.send("Welcome to Vue Jeopardy!")
})

// API route used by Pusher as way of authenticating users
app.post("/pusher/auth", (req, res) => {
    let socketId = req.body.socket_id
    let channel = req.body.channel_name
    // generate a random string and use as presence channel user_id
    let presenceData = {
        user_id: crypto.randomBytes(16).toString("hex")
    }
    console.log(socketId, channel, presenceData)
    console.log(typeof(socketId), typeof(channel), typeof(presenceData))
    let auth = pusher.authenticate(socketId, channel, presenceData)
    console.log(auth)
    res.send(auth)
})

// set port to be used by Node.js
app.set("port", (5000))

app.listen(app.get("port"), () => {
    console.log("Node app is running on port", app.get("port"))
})