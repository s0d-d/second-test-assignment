import axios from "axios";
import { useAuth } from "../AuthProvider";
import API_ENDPOINTS from "../config/apiUrls";

const useLogout = () => {
  const { setUser, setAuthStatus } = useAuth(); // Assume you expose these via the context

  const logout = async () => {
    try {
      await axios.post(API_ENDPOINTS.LOGOUT, {}, { withCredentials: true });
      setUser(null); // Clear the user from the context
      setAuthStatus("unauthenticated"); // Update the authentication status
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return logout;
};

export default useLogout;
