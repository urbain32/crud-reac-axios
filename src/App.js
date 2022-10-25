import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {
  const [posts, setPosts] = useState([]);
  const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';
  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPost();
  }, []);
  // add Post
  const addPost = async () => {
    const post = { title: 'New Post', body: 'new' };
    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
  };
  // Updating a Post
  const handleUpdate = async (post) => {
    post.title = 'Updated title';
    await axios.put(apiEndPoint + '/' + post.id);
    const postClone = [...posts];
    const index = postClone.indexOf(post);
    postClone[index] = { ...post };
    setPosts(postClone);
  };
  // Delete Post
  const handleDelete = async (post) => {
    await axios.delete(apiEndPoint + '/' + post.id + post);
   
    setPosts(posts.filter(p=>p.id !== post.id));
  };
  return (
    <div className='container'>
      <h2>There are {posts.length} poost in database. </h2>
      <button onClick={addPost} className=' btn btn-primary btn-sm'>
        Add Post
      </button>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <button
                  onClick={() => handleUpdate(post)}
                  className='btn btn-outline-info btn-sm'
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(post)}
                  className='btn btn-outline-danger btn-sm'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
