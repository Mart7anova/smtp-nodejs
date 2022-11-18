const express = require('express')
const cors = require('cors');
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const login = process.env.EMAIL | 'email'
const password = process.env.PASS | 'password'
const port = process.env.PORT | 3010

const transporter = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
        user: login,
        pass: password
    }
})

app.get('/', (req, res) => {
    res.send('Hello, to send a message, you need to send a post request to https://gmail-nodejs.vercel.app/sendMessage')
})

app.post('/sendMessage', async (req, res) => {
    const {name, email, message} = req.body
    await transporter.sendMail({
        from: "email",
        to: "mart7anova7@gmail.com",
        subject: "Сообщение из портфолио",
        html: `<div><h1>Сообщение от ${name}. </h1>
                    <h2>Email: ${email}</h2>
                    <p style="font-size: 20px">Message:<br/><br/> ${message}</p>
                </div>`
    })
    res.send(res.body)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
