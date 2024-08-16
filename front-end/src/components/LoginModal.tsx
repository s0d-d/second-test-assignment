import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import "./LoginModal.css";

interface LoginModalProps {
  isVisible: Boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  async function handleLogin(): Promise<void> {
    console.log(username, password);
    await axios.post(`/api/login/`, {
      username,
      password,
    });

    window.location.reload();
  }

  async function handleSignUp(): Promise<void> {
    await axios.post(`/api/signup`, {
      username,
      password,
    });

    onClose();
  }

  function onUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function toggleMode(): void {
    setIsLogin(!isLogin); // Toggle between login and sign-up modes
  }

  return (
    <Modal
      title={isLogin ? "Log-In" : "Sign-Up"}
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={isLogin ? handleLogin : handleSignUp}
    >
      <div className="login-form-container">
        <input placeholder="Username: admin" onChange={onUsernameChange} />
        <input
          placeholder="Password: 123"
          type="password"
          onChange={onPasswordChange}
        />
        <button onClick={toggleMode}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
