import { useState } from "react";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/SIgnUp/SignUpForm";

function App() {
  const [toggleForms, setToggleForms] = useState<boolean>(false);
  const handleFormToggle = () => {
    setToggleForms(!toggleForms);
  };
  return (
    <>
      {toggleForms ? <LoginForm /> : <SignUpForm />}
      <button onClick={() => handleFormToggle()} className="">
        {toggleForms ? "SignUp" : "Login"}
      </button>
    </>
  );
}

export default App;
