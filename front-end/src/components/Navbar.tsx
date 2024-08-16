import React, { useState } from "react";
import LoginModal from "./LoginModal";
import "./Navbar.css";
import { useAuth } from "../AuthProvider";
import useLogout from "../hooks/useLogout";

const Navbar: React.FC = () => {
  const [isModalVisible, showModal] = useState<Boolean>(false);

  const { user, authStatus } = useAuth();
  const logout = useLogout();

  return (
    <>
      <nav className="navbar">
        <h3>Discussion Forum</h3>
        {user ? (
          <button className="primary-button" onClick={logout}>
            Log out
          </button>
        ) : (
          <button className="primary-button" onClick={() => showModal(true)}>
            Log in
          </button>
        )}
      </nav>
      <LoginModal isVisible={isModalVisible} onClose={() => showModal(false)} />
    </>
  );
};

export default Navbar;
