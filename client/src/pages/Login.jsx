import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    // ✅ Save token and user info
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    alert('Login successful!');
    console.log(res.data);

    // ✅ Redirect to dashboard
    window.location.href = '/dashboard';

  } catch (err) {
    alert('Login failed');
    console.error(err.response?.data?.message || err.message);
  }
};


  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default Login;
