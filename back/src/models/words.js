const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        trim: true,
        required: true
    },
    difficulty: {
        type: Number,
        trim: true,
        required: true
    }
})

wordSchema.statics.randomWord = async (difficulty) => {
    try {
        const findedWord = await Word.aggregate([
            {
                $match: {
                    difficulty: difficulty
                 }
            },
            {
                $sample: { 
                     size: 1 
                }
            }
        ])
        const { word } = findedWord[0] 
        return word
    } catch (e) {
        return {error:'Aggregation problem'}
    }
}   

const Word = mongoose.model('Word', wordSchema)


module.exports = Word