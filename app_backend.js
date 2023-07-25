//npm i express    express.js framework
//npm i cors
//npm i bcryptjs   for password security
//npm i express-validator      for validation of user input

//import express
const express = require("express")
//import model user where user data is stored in mongodb
const collection = require("./models/User")
//import model bookmarked where users bookmakered data is stored in mongodb
const collection1 = require("./models/Bookmarked")
//import model history where users history data is stored in mongodb
const collection2 = require("./models/History")
//import cors
const cors = require("cors")
//import bcrpyt
const bcrypt = require('bcryptjs')
//import express validator
const { body, validationResult } = require('express-validator')


//creating a express backend
const app = express()

//VERY IMPORTANT
//middleware for req.body use
// to transfer data from frontend to backend
app.use(express.json())


app.use(express.urlencoded({ extended: true }))

//cors used for security
app.use(cors())



//ROUTER 1
app.get("/", cors(), (req, res) => {

})

//ROUTER 2: login    to match email and password
app.post("/login", [
    //validate wheather email is email
    body('email').isEmail(),
    //validate wheater passowrd is of minimum 7 alphanumeric
    body('password').isLength({ min: 7 })
], async (req, res) => {


    //response in case of validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    //destructering request body data
    const { email, password } = req.body
    try {
        //wait till response of user presence comes from db
        const check = await collection.findOne({ email: email })
        //if data present
        if (check) {
            //check bcrypt password matching
            const salt = await bcrypt.genSaltSync(10);
            const setPassword = await bcrypt.hash(password, salt);
            //compare
            if (bcrypt.compare(password, setPassword)) {
                //response in json format that user exist and send email
                res.json({ 'user': 'exist', 'email': email })
            }
            else {
                //wrong password
                res.json("Wrong Password");
            }
        }
        else {
            //no data of user.... used need to signup
            res.json("Need to be added")
        }

    } catch (error) {
        //handeling error
        console.log(error)
        res.json('error')
    }
})


//ROUTER 3: signup and enter its data

app.post("/signup", [
    //validation
    body('email').isEmail(),
    body('password').isLength({ min: 7 })
], async (req, res) => {

    //validation error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    //desructure from signup body
    const { email, password } = req.body

    // making a bcrypt password
    const salt = await bcrypt.genSaltSync(10);
    const setPassword = await bcrypt.hash(password, salt);
    //data as object
    const data = {
        "email": email,
        "password": setPassword,
    }
    try {
        //wait till response of user presence comes from db
        const check = await collection.findOne({ "email": email })
        if (check) {
            //if present
            res.json("exist")
        }
        else {
            //if user is new... insert the data
            await collection.insertMany(data)
            res.json({ 'user': 'exist', 'email': email })
        }

    } catch (error) {
        //error checking
        console.log(error)
    }
})


//ROUTER 4: On Save for after check button... insert or delete data from db .... in NewsItems.js
app.post('/bookmarked', async (req, res) => {
    //desructuring
    const { email, url, title, description, author, time, checked, imageurl } = req.body
    //if button is unchecked to checked
    if (checked === false) {
        //find
        const present = await collection1.findOne({ 'url': url })
        //if not in db... add it
        if (!present) {
            await collection1.insertMany({ "email": email, 'url': url, 'title': title, 'description': description, 'author': author, 'time': time, 'imageurl': imageurl })
        }
        // else do not thing

    }
    // if button is checked to unchecked .. delete the data
    else {
        await collection1.deleteMany({ 'email': email, 'url': url })
    }
})


//ROUTER 5: HISTORY    on tapping any news... in NewsItems.js
app.post('/history', async (req, res) => {
    //destructure
    const { email, url, title, description, author, time, imageurl } = req.body
    //if already opened before... than db contains the data
    const present = await collection2.findOne({ "email": email, 'url': url })
    if (present) {
        //than update the date...means last opened on time..... as update many was automaticlly adding a new dataset... we deleted than inserted again
        await collection2.deleteOne({ "email": email, 'url': url })
        await collection2.insertMany({ "email": email, 'url': url, 'title': title, 'description': description, 'author': author, 'time': time, 'imageurl': imageurl })
    }
    //tapped for 1st time
    else {
        await collection2.insertMany({ "email": email, 'url': url, 'title': title, 'description': description, 'author': author, 'time': time, 'imageurl': imageurl })
    }

})

//ROUTER 6: To get History data from NAVBAR
app.post('/historyfetch', async (req, res) => {
    //destrucuring
    const { email } = req.body
    //return the recent opened news.....sorted reverse based on time
    const data = await collection2.find({ "email": email }).sort({ savedon: -1 })
    res.json(data)
})
app.post('/bookmarkedfetch', async (req, res) => {
    const { email } = req.body
    //return the recent opened news.....sorted reverse based on time
    const data = await collection1.find({ "email": email }).sort({ savedon: -1 })
    res.json(data)
})



//port used 8000 for backend
app.listen(8000, () => {
    console.log("Port Connected")
})