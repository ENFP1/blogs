const express = require('express')
const {Add_Blog, Get_Blog, Delete_Blog, Get_Blogs} = require('../Api/blogApi')
const axios = require('axios')

exports.createBlog = (req,res) => {
    const {title,description,author} = req.body
    const newBlog = {
        title: title,
        description: description,
        author: author,
        image: req.file.filename
    }
    console.log(newBlog)
    console.log({newBlog})
    // axios.post('http://localhost:3100/blogs', {newBlog})
    Add_blog(newBlog)
    return res.redirect('/allblogs')
    // res.redirect('/allblogs')
// }
}


exports.GetBlogs = async (req, res) => {
    try {
        const fetchBlog = await Get_Blogs();
        const blogs = fetchBlog.data;

        res.render('allBlogs', { blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// exports.GetBlogs = (req,res) => {
//     const fetchBlog = await Get_Blog()
//     const blogs = await fetchBlog.data
//     console.log(blogs)
//     res.render('allBlogs', blogs)
//     // res.end()
//     const { id } = req.params;

//     // Call the Read_Blog function to get the blog by ID
//     const blog = Get_Blog(id);

//     // Check if the blog was found
//     if (blog) {
//         res.json(blog); // Send the blog as a JSON response
//     } else {
//         res.status(404).json({ message: 'Blog not found' }); // Send a 404 status if the blog was not found
//     }
// }


exports.deleteBlog = async (req, res)=> {
    const id = req.params.id;
    console.log(id)
    axios.delete('http://localhost:5000/blogs/' + id)
    .then(()=>{
        res.status(204).send('delete worked')
    .catch(()=>{
        return res.status(500).send('server problem')
    })
    })
}

// exports.updateBlog = async(req, res) => {
//     const id = req.params.id
//     const api = await axios.get('http://localhost:8500/blogs/', id)
//     const blog = await api.data

//     const updateBlog = {
//         title: req.body.title,
//         description: req.body.description,
//         author: req.body.author,
//         image: req.file?req.file.filename:blog.image
//     }
//     axios.patch('http://localhost:5000/blogs/' +id, updateBlog)
//     .then(()=>{
//         res.redirect('/allblogs')
//     })
// }

exports.editBlog = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        // Assuming Get_Blog is an asynchronous function
        const { response } = await Get_Blog(id);
        const blog = response.data

        if (!blog) {
            // Handle the case where no blog is found for the given ID
            return res.status(404).send("Blog not found");
        }

        console.log('worked', blog);
        res.render('edit', { blog }); // Pass blog as an object
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
