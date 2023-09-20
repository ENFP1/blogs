const edit = document.querySelectorAll('#edit')
const bdelete = document.querySelectorAll('#delete')

edit.forEach(blog=> {
    blog.addEventListener('click', e=>{
        e.preventDefault()
        console.log(e.currentTarget.dataset.id)
        const id = e.currentTarget.dataset.id
        fetch('http://localhost:5000/edit/' + id)
        // window.location.href = `/edit/${id}`
    })
})

bdelete.forEach(blog=> {
    blog.addEventListener('click', d=>{
        d.preventDefault()
        e.currentTarget.parentElement.parentElement.remove()
        console.log(d.currentTarget.dataset.id)
        const id = d.currentTarget.dataset.id;
        fetch(`/delete/${id}`, {
        method: 'DELETE'
       })

    })
})
