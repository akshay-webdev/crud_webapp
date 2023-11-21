import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageEmployee = () => {
  const [posts, setPosts] = useState([]);
  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [editedItem, setEditedItem] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axios.post('http://localhost:3000/posts', newEmp);
      setPosts([...posts, response.data]);
      setNewEmp({ name: '', email: '', address: '', phone: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/data/${editedItem.id}`, editedItem);
      console.log('Data updated:', editedItem);
      setEditedItem({ id: '', name: '', email: '', address: '', phone: '' });
      fetchData(); // Refetch the data to display the updated version
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteEmployee = async (recordId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${recordId}`);
      alert('Are you sure you want to delete this record?');
      const updatedPosts = posts.filter((post) => post.id !== recordId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="table-responsive">
          <div className='d-flex align-items-center justify-content-between'>
            <h4 className="my-4">Manage Employees</h4>
            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#addModal">
              Add Employee
            </button>
          </div>
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
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteEmployee(post.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal HTML */}
      {/* Update Modal HTML */}
      {/* ... (your modal components) */}
    


      {/* Edit Modal HTML */}
      <div className="modal fade" id="addModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Add Employee</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Enter Name</label>
                  <input type='text' className="form-control" value={newEmp.name} // Bind to newEmp.name
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })} // Update the name property
                  />
                </div>
                <div className="mb-3">.
                  <label className="form-label">Enter Email</label>
                  <input type="email" className="form-control" value={newEmp.email} onChange={(e) => setNewEmp({...newEmp, email:e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter Address</label>
                  <input type="password" className="form-control" value={newEmp.address} onChange={(e) => setNewEmp({...newEmp,address:e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter Mobile No</label>
                  <input type="number" className="form-control" value={newEmp.phone} onChange={(e) => setNewEmp({...newEmp,phone:e.target.value})} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary" onClick={addItem}>
                Add Employee
              </button>
            </div>

          </div>
        </div>
      </div>
       {/* Update Modal HTML */}
       <div className="modal fade" id="updateModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Employee</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Enter Name</label>
                  <input type='text' className="form-control" value={editedItem.name} // Bind to newEmp.name
                    onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} // Update the name property
                  />
                </div>
                <div className="mb-3">.
                  <label className="form-label">Enter Email</label>
                  <input type="email" className="form-control" value={editedItem.email} onChange={(e) => setEditedItem({...editedItem, email:e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter Address</label>
                  <input type="password" className="form-control" value={editedItem.address} onChange={(e) => setEditedItem({...editedItem,address:e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter Mobile No</label>
                  <input type="number" className="form-control" value={editedItem.phone} onChange={(e) => setEditedItem({...editedItem,phone:e.target.value})} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary"  onClick={handleUpdate()}>
                Add Employee
              </button>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default ManageEmployee;
