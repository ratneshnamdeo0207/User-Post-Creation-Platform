const express = require("express");
const path = require("path");
var uniqid = require('uniqid'); 
const app = express();
const port = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));



let posts = [{
    name: "tony",
    post: "Hello i am iron man",
    id: uniqid(),

}
];

app.listen(port, () => {
    console.log(`We are on at ${port}`);
})

app.get("/posts", (req, res) => {

    res.render("home.ejs", { posts });

})

app.get("/", (req, res) => {
    console.log(path.join(__dirname, "/views"));
    res.send("We are on");
});
app.get("/post", (req, res) => {
    res.render("newpage.ejs");
})
app.post("/posts", (req, res) => {
    let { name, post } = req.body;
     
    let newpost = {
        name: name,
        post: post,
        id :uniqid()
    }
    console.log(newpost);
    // console.log(name, post);
    posts.push(newpost);
    res.redirect("/posts");
})
app.get("/post/:id", (req, res)=>{
    let {id} = req.params;
    posts.find(post=> post.id === id);
    // console.log(post);
    res.render("post.ejs", {post});

})
app.get("/editpost/:id", (req, res)=>{
    let {id} = req.params;
    posts.find(post=> post.id === id);
    // console.log(post);
    res.render("editpost.ejs", {post});
})
app.patch("/editpost/:id", (req, res)=>{
    let { name, post:postcontent } = req.body;
    let {id} = req.params;
    posts.find(post=> post.id === id);;
    
    post.name = name;
    post.post = postcontent;
    console.log(post);
    res.redirect("/posts");

})

app.get("/remove/:id",(req, res)=>{
    let {id} = req.params;
    let i = posts.findIndex(post => post.id === id);
    console.log(i);
    posts.splice(i, 1);
     res.redirect("/posts");
})

