import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: fullName, // send it as "name" to the server
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Registration successful!');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Registration failed');
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border mb-3"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded w-full">
        Register
      </button>
    </form>
  );
};

export default Register;
