const express = require('express');
const path = require('path');
const app = express();
const hbs  = require('hbs');
const port = process.env.PORT || 3000;



require("./db/conn");
const Register = require("./models/registers");


const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)
// app.set("views", path.join(__dirname,"../views"));

app.get('/', (req,res)=>{
    res.render("index")
});


app.get("/register", (req, res) => {
    res.render("register");
})


app.get("/login", (req, res) => {
    res.render("login");
})

app.get('/success', (req,res)=>{
    res.render("success")
});

app.get('/error', (req,res)=>{
    res.render("error")
});

// create a new user in database
app.post("/register", async (req, res) => {
    try {
        
        const registerEmployee = new Register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const registered = await registerEmployee.save();
        res.status(201).render("login");

    } catch (error) {
        res.status(400).send(error);
    }
})


// Check Login
app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const useremail = await Register.findOne({username:username});
        
        if(useremail.password == password){
            res.status(201).render("success");
        }else{
            res.render("error");
        }

    } catch (error) {
        res.status(400).send("Invalid Credentials")
    }
})

app.listen(port,()=>{
    console.log(`$erver is running at ${port}`);
})