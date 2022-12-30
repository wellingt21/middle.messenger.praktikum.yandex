import express from 'express'

const app = express()
const PORT = 8888

app.use(express.static('./dist/'))

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
