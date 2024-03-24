import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HOME_PAGE, LOGIN, SIGN_UP } from "./routes/Router";
import { useEffect } from "react";
import Home from "./components/HomePage/Home";
import SignUpForm from "./components/SIgnUp/SignUpForm";

function App() {
  useEffect(( ) => {
    const token = localStorage.getItem('token') || {}
  },[])
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path={HOME_PAGE} element={<Home />} />
          <Route path={LOGIN} element={<LoginForm />} />
          <Route path={SIGN_UP} element={<SignUpForm/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
