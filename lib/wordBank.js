const wordbank = require('./wordBank.json')

const getAll = () => {
    const words = []
    for (const category of Object.values(wordbank)) {
        for (const word of category) {
            words.push(word)
        }
    }
    return words
}
const getCategory = category => {
    const words = category === 'any'
        ? getAll()
        : [...wordbank[category]]
        
    return words
}
const getCategories = () => {
    return Object.keys(wordbank)
}

module.exports = {getAll, getCategory, getCategories}