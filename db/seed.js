const Shelters = require('../models/shelters.js')
const data = require('./data.json')


Shelters.deleteMany({})
    .then(() => {
        Shelters.collection.insert(shelterData)
            .then((shelters) => {
                console.log(shelters)
                process.exit()
            })
    })
    .catch((err) => {
        console.log(err)
    })