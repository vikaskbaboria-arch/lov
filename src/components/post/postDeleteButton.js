import React from 'react'

const PostDeleteButton = ({ id }) => {
    const Delete = async() => {
        const res = await fetch(`/api/post/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        console.log(data);
        if(res.ok) {
            alert('Post deleted successfully');
        } else {
            alert('Failed to delete post');
        }
    }
  return (
    <div>
        <button onClick={() => Delete()} className='btn btn-danger'>Delete</button>
    </div>
  )
}

export default PostDeleteButton