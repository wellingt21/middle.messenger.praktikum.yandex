import express from 'express'

const app = express()
const PORT = 8888

app.use(express.static('./dist/'))

app.listen(PORT, () => console.log("check my shit on port 8888 boilerplate shit is good"))
