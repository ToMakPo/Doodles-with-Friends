const wordbank = require('./wordBank.json')

const getAll = () => {
    const list = []
    for (const values of Object.values(wordbank)) {
        list.concat(values)
    }
    return list
}
const getCategory = category => {
    return category === 'any'
        ? getAll()
        : [...wordbank[category]]
}
const getCategories = () => {
    return Object.keys(wordbank)
}

module.exports = {getAll, getCategory, getCategories}