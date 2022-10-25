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
  return (
    <div className='container'>
      <h2>There are {posts.length} poost in database. </h2>
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
                <button className='btn btn-outline-info btn-sm'>Update</button>
              </td>
              <td>
                <button className='btn btn-outline-danger btn-sm'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
