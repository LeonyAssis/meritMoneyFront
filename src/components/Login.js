import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("")
 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        () => {
          setError("Email ou senha incorreta!");         
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="align-items-center">
      <form onSubmit={handleLogin}>
        <h3 className="mt-5">Login</h3>
        <div className="form-row">
          <div className="col-auto">
            <label>Email</label>
            <input type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Digite o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted mb-3">Nós não iremos compartilhar seu e-mail com ninguém</small>
          </div>
          <div className="col-auto">
            <label>Password</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {error && <span className='err'>{error}</span>}
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Entrar</button>
        </div>  
      </form>
    </div>
  );
};

export default Login;
