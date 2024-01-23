let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    name : {type : String, required : true},
    age : {type : Number},
})

// création du modèle
const User = mongoose.model('User', UserSchema)

// export du model
module.exports = User;