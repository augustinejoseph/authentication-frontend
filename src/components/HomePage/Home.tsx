import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN, SIGN_UP } from "../../routes/Router";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

const Home = () => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setToken(token);
  }, [token]);

  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh");

      const response = await axios.post(`${BASE_URL}/api/user/logout/`, {
        refresh_token: refresh_token,
      });

      if (response.data.status === 400 || response.data.status === 500) {
        toast.error(response.data.error);
        localStorage.clear();
        setToken("");
      }
      if (response.data.status === 200 || response.data.status === 201) {
        toast.success(response.data.message);
        localStorage.clear();
        navigate(LOGIN);
        return;
      }
      toast.success(response?.data?.message || "Logout successful");
    } catch (error) {
      toast.error("Failed to logout");
      localStorage.clear();
      navigate(LOGIN);
      return;
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div>Home..........</div>
        {!token ? (
          <div>
            <button onClick={() => navigate(LOGIN)}>Login</button>
            <button onClick={() => navigate(SIGN_UP)}>SignUp</button>
          </div>
        ) : (
          <button onClick={() => handleLogout()}>Logout</button>
        )}
      </div>
    </>
  );
};

export default Home;
