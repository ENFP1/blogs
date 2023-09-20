const express = require('express')
const app = express()
const PORT = 5000
const axios = require('axios')
const cors = require('cors')
const users = require('./Models/database.json')
const jwt = require('jsonwebtoken')
const secret = 'mern2023'
const cookies = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const {createBlog, GetBlogs, deleteBlog, editBlog} = require('./Controllers/blog.js')
const { Update_Blog } = require('./Api/blogApi')

app.use(cookies())
app.use(express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'Public'))); 
app.use(cors())

app.get('/login',(req,res)=>{
    res.render('login')
})

//Configuration for Multer
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
  });
  
  const upload = multer({ storage: storage })




const logger =(req,res,next)=>{
    const token = req.cookies.token_auth
    if(!token){
        return res.redirect('/register')
    }
    const decoded = jwt.verify(token,secret)
    const {email,image } = decoded
    req.email = email
    req.image = image
    next()
}

// app.post('/login',(req,res)=>{
//     const {email,password} = req.body
//     const user = users.users.find(u=>u.email==email)
//     if(!user){
//         return res.send('user not found')
//     }
//     if(!(user.password == password)){
//         return res.send('password incorrect')
//     }
//     const token = jwt.sign({email:email,image:user.image},secret)
//    res.cookie('token_auth',token)
//    res.redirect('/dashboard')
    
    

// })

app.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = users.users.find(u => u.email == Email);
        if (!user) {
            return res.send('User not found');
        }
        if (!(user.password == Password)) {
            return res.send('Password incorrect');
        }
        const token = jwt.sign({ email: Email }, secret);
        res.cookie('token_auth', token);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/register',(req,res)=>{
    res.render('register')
})

// app.get(
//     '/register',(req,res)=>{
//     const change = " <script>const signUpButton = document.getElementById('signUp') const container = document.getElementById('container') container.classList.add('right-panel-active')</script>"
//     res.render('register', {change})
// }
// )


app.post('/register',(req,res)=>{
    axios.post('http://localhost:3100/users',req.body)
    console.log(req.body)
    res.redirect('/login')
})

app.get('/dashboard',logger,(req,res)=>{
    res.render('dashboard',{email:req.email})
})

// add blog

app.get('/addblog', (req,res) => {
    res.render('addBlog')
})

app.post('/createblog', upload.single("image"), createBlog)

app.get('/allblogs', GetBlogs)

// app.use((req,res,next) => res.render('404'))

app.post('/delete/:id',  (req, res)=> {
    const id = req.params.id;
    console.log(id)
    console.log('deleteblog')
    res.redirect('/dashboard')
})

app.get('/edit/:id', editBlog)

app.post('/update/:id', Update_Blog)

app.listen(PORT,()=>{
    console.log('port 5000')
})
















// const express = require('express')
// const app = express()
// const PORT = process.env.PORT || 5000
// // const axios = require('axios')
// const {createBlog, GetBlogs, deleteBlog} = require('./Controllers/blog')
// const multer = require('multer')


// app.use(express.json())
// app.use(express.urlencoded({ extended:true}))//to search 

// app.set('view engine', 'ejs') 

// // add blog

// app.get('/addblog', (req,res) => {
//     res.render('addBlog')
// })

// app.post('/createblog', createBlog)
// // app.post('/createblog', (req,res) => {
// //     console.log(req.body)
// //     // res.status(200).send('data success')
// //     const {title,description,author} = req.body
// //     const newBlog = {
// //         title: title,
// //         description: description,
// //         author: author
// //     }
// //     // console.log({newBlog})
// //     axios.post('http://localhost:8500/blogs', newBlog)
// //     res.end()
// //     // res.status(200).send('success')
// // })


// app.get('/test', (req,res)=> {
//     res.send('worked')
// })

// app.post('/allblogs', GetBlogs)

// // app.use((req,res,next) => res.render('404'))

// //add edit route

// app.listen(PORT, () => {
//     console.log('running on ' + PORT)
// })