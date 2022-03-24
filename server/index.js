const express = require("express")
const cors = require('cors')
const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv').config();

const UserModel = require("./models/Users");
const BookModel = require("./Models/Books");

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.SERVER)

app.get("/login", (req,res) => {
    console.log(req.body);
    UserModel.findOne({'username': req.query.username}, (err, result) => {
        if(err){
            res.json(err);
        }else{

            if(result){

                if(req.query.password === result.password){
                    res.json("Usuario Correcto")
                }else{
                    res.json(null)
                }                
            }else{
                res.json(null)
            }
        }
    });
})

app.post("/createUser", async (req,res) => {
    const user = req.body
    const newUser = new UserModel(user);
    try {
        await newUser.save();
        res.json("usuario creado con exito")
    } catch (error) {
        res.json("ya existe un usuario con ese username/email")
    }
    
})

app.get("/getBooks", (req,res) => {
    console.log(req.query);
    BookModel.find({username: req.query.username}, (err, result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result)
            console.log(result);
            }
        }
    )
})

app.post("/addBook", async (req,res) => {
    const user = req.body
    const newBook = new BookModel(user);
    try {
        await newBook.save();
        res.json("Libro añadido")
    } catch (error) {
        res.json("error")
    }  
})

app.listen(3001, () => {
    console.log("SERVER RUNS!");
});
