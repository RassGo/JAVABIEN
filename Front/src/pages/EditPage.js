import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/userService';

function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Fetch the user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id);  // Fetch user by ID
        setName(user.name);
        setEmail(user.email);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user data');
      }
    };

    fetchUser();
  }, [id]);

  // Handle form submission to update the user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, { name, email });  // Update user details on the server
      navigate('/');  // Redirect back to the main page
    } catch (err) {
      console.error('Failed to update user:', err);
      setError('Failed to update user');
    }
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserPage;
