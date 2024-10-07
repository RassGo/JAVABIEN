import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, createUser, deleteUser } from '../services/userService';
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getAllUsers();
        setUsers(usersList);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    if (name && email) {
      try {
        const newUser = await createUser({ name, email });
        setUsers([...users, newUser]);
        setName('');
        setEmail('');
      } catch (err) {
        console.error('Failed to create user:', err);
      }
    }
  };

  const deleteUserById = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error(`Failed to delete user with ID ${id}:`, err);
    }
  };

  const editUser = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <form className="user-form" onSubmit={addUser}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Display list of users */}
      <div className="user-list">
        <h2>Current Users</h2>
        {users.length === 0 ? (
          <p>No users available</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span>{user.name} - {user.email}</span>
                <button onClick={() => deleteUserById(user.id)}>Delete</button>
                <button onClick={() => editUser(user.id)}>Edit</button>  {/* Edit button */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
