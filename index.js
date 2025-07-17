const express=require("express");
const app=express();
const path=require("path");
var methodOverride = require('method-override');      //since method in form is only for post and get request only, so to use patch or put or delete request we use this

app.use(methodOverride('_method'));

const { v4: uuidv4 } = require('uuid');   //for giving random id to posts

app.use(express.urlencoded({ extended: true}));   //whatever data is sent to server will be understood by express

app.set("view engine","ejs");                   //way to require ejs
app.set("views",path.join(__dirname,"views"));   //way to require views folder

app.use(express.static(path.join(__dirname,"public")));  //way to require public folder

const port=8080;

app.listen(port,()=>{
    console.log("Server Started");
})

let posts=[{
    id : uuidv4(),
    username:"express_user",
    content:
    "A REST API, or Representational State Transfer API, is a set of rules and guidelines that define how applications can interact with each other over the internet, using standard HTTP methods like GET, POST, PUT, and DELETE."
},
{
    id : uuidv4(),
    username:"rest_user123",
    content:"CRUD operations (Create, Read, Update, Delete) are fundamental actions in data management, and they are implemented in REST APIs using specific HTTP methods. A REST API uses these methods to interact with resources, allowing clients to manipulate data on the server."
}
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let newpost = {
        id : uuidv4(),
        username : req.body.username,
        content : req.body.content
    };
    posts.push(newpost);
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newContent = req.body.content;
    post.content=newContent;
    // console.log(post);
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})