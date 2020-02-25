const express = require('express')
const translateWord = require('../src/translate/translate')
const cors = require('cors')
require('./db/mongoose')

const Word = require('./models/words')
const app = express()
const port =  3000

app.use(cors())

app.use(express.json())

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.get('/generate/word', async (req, res) => {
    try {
        const randomWord = await Word.randomWord(req.query.difficulty * 1)
        const translatedWord = await translateWord(randomWord)
        res.send({ randomWord, translatedWord })
    } catch(e) {
        res.status(404).send()
    }
})
