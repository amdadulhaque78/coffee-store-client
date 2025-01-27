import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {

  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  // useEffect (()=>{
  //   fetch('/')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  // },[])

  // useEffect(()=>{
  //   axios.get('/')
  //   .then(data=>{
  //     console.log(data.data);
  //   })
  // },[])

  const handleDelete = id => {
    // make sure user is confirm to delete
    fetch(`http://localhost:5000/user/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if(data.deletedCount > 0){
            console.log('deleted successfully');
            // remove the user from ui
            const remainingUsers = users.filter(user => user._id !== id);
            setUsers(remainingUsers);
        }
    })
  }

  return (
    <div>
      <h2>users: {loadedUsers.length} </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Id</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Last Logged In</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map(user => <tr key={user._id}>
                    <th>1</th>
                    <td> {user.email} </td>
                    <td> {user.createdAt} </td>
                    <td> {user.lastLoggedAt} </td>
                    <td>
                        <button onClick={() => handleDelete(user._id)} className="btn">Delete</button>
                    </td>
                  </tr>)
            }
            
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
