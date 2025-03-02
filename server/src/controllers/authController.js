const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Register new user
exports.register = async (req, res) => {
  console.log(req.body)

  const {username, email, password} = req.body

  try {
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({message: 'Email already in use'})
    }

    const newUser = new User({username, email, password})

    await newUser.save()
    res.status(201).json({message: 'User registered successfully'})
  } catch (error) {
    console.log(error)

    res.status(500).json({message: error.message})
  }
}

// Login user
exports.login = async (req, res) => {
  console.log(req)

  const {email, password} = req.body

  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid credentials'})
    }

    const token = jwt.sign({id: user._id}, 'your_jwt_secret_key', {
      expiresIn: '9y',
    })

    res.status(200).json({message: 'Login successful', token})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.send_mail = (req, res) => {
  const {email} = req.body

  console.log(email)

  // Tạo passcode ngẫu nhiên
  const passcode = Math.floor(1000 + Math.random() * 9000)

  const mailOptions = {
    from: 'eventhub@example.com',
    to: email,
    subject: 'Your 4-digit passcode',
    text: `Your passcode is: ${passcode}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email')
    }

    // add 5 minutes to return data

    const expirationTime = Date.now() + 5 * 60 * 1000;

    const returnData = {
        message: "Email sent successfully",
        passcode: passcode,
        expiredAt: expirationTime
    }

    res.status(200).json(returnData)
  })
}
