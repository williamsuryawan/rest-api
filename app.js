require('dotenv').config()
const express = require('express')
const app = express ()
const userRouter = require('./routes/users')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})