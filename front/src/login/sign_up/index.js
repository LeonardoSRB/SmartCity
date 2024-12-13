import React, { useState } from 'react';
import axios from 'axios';
import "./sign_up.css";
const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create_user/', 
        {
          username: usuario,
          email: email,
          password: senha
        }
      );

      // Aqui você pode lidar com a resposta, como salvar um token
      console.log('Login bem-sucedido:', response.data);
      setMensagem('Login bem-sucedido!');

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMensagem('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="user"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            placeholder='Insira um nome de usuario'
            />
            {console.log("Usuario", usuario)}
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Insira o seu email'
          />
        </div>
        <div>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder='Insira uma senha'
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default Register;
