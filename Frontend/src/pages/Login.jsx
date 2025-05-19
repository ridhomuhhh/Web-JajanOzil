import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Email atau password salah!');
    }
  };

  // Add Poppins and Inter fonts import
  React.useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap';
    document.head.appendChild(link1);
    
    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://fonts.googleapis.com/css2?family=Inter&display=swap';
    document.head.appendChild(link2);
    
    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
    };
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3 py-4" style={{ backgroundColor: '#f6e9b2' }}>
      <div className="card shadow w-100 mx-auto" style={{ maxWidth: '400px', borderRadius: '16px', padding: '30px' }}>
        <div className="text-center mb-4">
          <h2 className="mb-2" style={{ color: '#9e2a2b', fontSize: '40px', fontFamily: 'Poppins, sans-serif', fontWeight: 'Bold' }}>
            DompetOzil.
          </h2>
          <p className="m-0" style={{ color: '#9e2a2b', fontFamily: 'Inter, sans-serif', fontWeight: 'Regular' }}>
            Kelola Keuangan Lebih Mudah!
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input 
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '12px', borderRadius: '4px' }}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px', borderRadius: '4px' }}
              required
            />
          </div>
          <div className="text-center mt-2">
            <button 
              type="submit" 
              className="btn w-100" 
              style={{ 
                backgroundColor: '#9e2a2b', 
                color: 'white', 
                padding: '8px', 
                borderRadius: '4px',
                fontWeight: 'normal',
                fontSize: '14px'
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;