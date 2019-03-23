const express = require('express')
const app = express()
const userRouter = require('./routers/user')

require('./db/mongoose')

const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})