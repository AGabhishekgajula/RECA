const mongoose = require('mongoose');
const express = require("express");
const app=express();
const path=require("path");
const User=require("./models/user.js");
const port=8080;

main().then(()=>{
    console.log("connections successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/reca');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get('/reca', (req, res) => {
  const filePath = path.join(__dirname, 'welcome.html');
  res.sendFile(filePath);
});
app.get("/reca/signup",(req,res)=>{
  const filePath = path.join(__dirname, 'signup.html');
  res.sendFile(filePath);
});
app.get('/reca/signin', (req, res) => {
  const filePath = path.join(__dirname, 'signin.html');
  res.sendFile(filePath);
});
app.post("/reca/signupsend",(req,res)=>{
  let {username,rollno,password}=req.body;
  let newuser=new User({
    username:`${username}`,
    rollno:`${rollno}`,
    password:`${password}`,
  });
  newuser.save()
  .then((result)=>{
    alert("signup successful!");
  })
  .catch((err)=>{
    res.send(err);
  });
  

});
app.post("/reca/signinreq",async (req,res)=>{
     let {rollno,password}=req.body;
      await User.findOne({rollno:rollno})
     .then((data)=>{
           res.send("welcome!");
     })
     .catch((err)=>{
      res.send(err);
     });
});
app.listen(port,()=>{
     console.log("i am listiening");
});
