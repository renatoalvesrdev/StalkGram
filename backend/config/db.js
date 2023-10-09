const mongoose = require("mongoose")
const dbUser =  process.env.DB_User;
const dbPassWord = process.env.DB_Pass

const conn = async () => {
    try {
        
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassWord}@cluster0.8jobhum.mongodb.net/?retryWrites=true&w=majority`)

        console.log("Conectou ao banco!")

        return dbConn
    } catch (error) {
       console.log(error) 
    }
}

conn()

module.exports = conn