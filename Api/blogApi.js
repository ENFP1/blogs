const axios = require('axios');
const api = axios.create({
    baseURL: 'http://localhost:3000/blogs',
    Headers: {
        'Content-Type': 'application/json'
    }
})

exports.Add_Blog = blog => api.post('/', blog)

exports.Delete_Blog = id => api.delete(`/${id}`)

exports.Get_Blogs = () => api.get(`/`);

exports.Get_Blog = id => api.get(`/${id}`);

exports.Update_Blog = (id, updatedBlog) => api.patch(`/${id}`, updatedBlog);

