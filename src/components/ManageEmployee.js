import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageEmployee = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState(null);

  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data);
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Handle form submission here
  };
   const deleteEmployee = (recordId) => {
    axios.delete(`http://localhost:3000/posts/${recordId}`)
    .then(response=>{
      alert('record delete successfully');
      //table table items 
      setPosts(posts.filter((post) => post.id !== recordId));      
    })
    .catch(error=>{
      alert("error")
    })
  }

  return (
    <>
      <div className="container">
        <div className="table-responsive">
          <h2 className="my-4">Manage Employees</h2>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.name}</td>
                  <td>{post.email}</td>
                  <td>{post.address}</td>
                  <td>{post.phone}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#editEmployeeModal"
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteEmployee(post.id)}>Delete</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">
              Showing <b>5</b> out of <b>25</b> entries
            </div>
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Modal HTML */}
      <div className="modal fade" id="editEmployeeModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Edit Employee</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* Edit form fields go here */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default ManageEmployee;
