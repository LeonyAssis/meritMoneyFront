import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const checkPassword = (repeatPassword) => {
    if (repeatPassword !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordMismatch) {
      try {
        await AuthService.signup(email, name, password).then(
          (response) => {
            // check for token and user already exists with 200
            //   console.log("Sign up successfully", response);
            navigate("/home");
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h3 className="mt-5">Cadastro</h3>
        <div className="form-row">
          <div className="col-auto">
            <label>Email</label>
            <input type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Digite o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}              
              required
            />
          </div>
          <div className="col-auto">
            <label>Nome</label>
            <input type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Digite o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minlength="8"
              required
            />
          </div>
          <div className="col-auto">
            <label>Senha</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="col-auto">
            <label>Repita a senha</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Senha"              
              onChange={(e) => checkPassword(e.target.value)}
              required
            />
          </div>
          {passwordMismatch && (<span className="err">Senhas não conferem</span>)}
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </div>
      </form>
     
    </div>
  );
};

export default Signup;
