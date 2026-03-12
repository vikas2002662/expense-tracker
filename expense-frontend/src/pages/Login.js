import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-8px); }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%;   }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%;   }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1;   }
  }

  .auth-bg {
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
    background: #0a0a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .auth-bg::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,106,247,0.12) 0%, transparent 70%);
    top: -200px; left: -200px;
    animation: glowPulse 4s ease-in-out infinite;
  }
  .auth-bg::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(247,106,138,0.09) 0%, transparent 70%);
    bottom: -100px; right: -100px;
    animation: glowPulse 5s 1s ease-in-out infinite;
  }

  .auth-card {
    background: #111118;
    border: 1px solid #2a2a38;
    border-radius: 24px;
    padding: 48px 44px;
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.55s ease both;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
  }
  .auth-card::before {
    content: '';
    position: absolute;
    top: 0; left: 20%; right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #7c6af7, #f76a8a, transparent);
  }

  .auth-logo {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #7c6af7, #f76a8a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 6px;
    animation: float 4s ease-in-out infinite;
    letter-spacing: -1px;
  }

  .auth-subtitle {
    text-align: center;
    color: #6b6b82;
    font-size: 0.8rem;
    margin-bottom: 36px;
    letter-spacing: 0.04em;
  }

  .auth-label {
    display: block;
    font-size: 0.72rem;
    color: #6b6b82;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  .auth-field {
    margin-bottom: 20px;
  }

  .auth-input {
    font-family: 'DM Mono', monospace;
    width: 100%;
    background: #18181f;
    color: #e8e8f0;
    border: 1px solid #2a2a38;
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    -webkit-appearance: none;
  }
  .auth-input::placeholder { color: #3a3a52; }
  .auth-input:focus {
    border-color: #7c6af7;
    box-shadow: 0 0 0 3px rgba(124,106,247,0.18);
    background: #1e1e2e;
  }

  .auth-btn {
    font-family: 'DM Mono', monospace;
    width: 100%;
    background: linear-gradient(135deg, #7c6af7, #5b4de0);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }
  .auth-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transition: left 0.4s ease;
  }
  .auth-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(124,106,247,0.4);
  }
  .auth-btn:hover::after { left: 100%; }
  .auth-btn:active { transform: translateY(0); }

  .auth-footer {
    text-align: center;
    margin-top: 28px;
    font-size: 0.8rem;
    color: #6b6b82;
  }
  .auth-footer a {
    color: #7c6af7;
    text-decoration: none;
    border-bottom: 1px solid rgba(124,106,247,0.3);
    padding-bottom: 1px;
    transition: color 0.2s, border-color 0.2s;
  }
  .auth-footer a:hover {
    color: #a89af7;
    border-color: #a89af7;
  }
`;

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/auth/login", user);

    localStorage.setItem("token", res.data);
    navigate("/dashboard");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-bg">
        <div className="auth-card">
          <div className="auth-logo">₹ Tracker</div>
          <div className="auth-subtitle">sign in to your account</div>

          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              className="auth-input"
              placeholder="enter username"
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button className="auth-btn" onClick={handleLogin}>Login</button>

          <p className="auth-footer">
            New user? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;