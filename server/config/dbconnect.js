const mongoose = require('mongoose')

const connect = async() =>{
    try {
        const conn = await mongoose.connect('mongodb+srv://sivapalaparthi003:nkZIwESvu7upQLoq@cluster0.9q4lfqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("connected to mongo")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect