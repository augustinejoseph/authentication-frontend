import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Form.css";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../routes/Router";

const schema = yup.object().shape({
  email: yup
    .string()
    // .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be atleast 8 characters"),
  mobile: yup
    .string()
    // .required("Mobile number is required")
    // .matches(/^[6-9][0-9]{10}/, "Invalid phone number")
    // .max(10, "Phone number should be 10 digits")
    // .min(10, "Atleast 10 digits is required"),
});

const LoginForm = () => {
  const [isMobileLogin, setMobileLogin] = useState<boolean>(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    // setaData(data);
    console.log("data>>>>>>>>>>", data);
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login/`, data);
      console.log(response);
      if (response.data.status === 400 || response.data.status === 404) {
        toast.error(response?.data?.error || "Error: Bad Request");
      } else if (response.data?.status === 201) {
        toast.success(response?.data?.message || "User created successfully");
      }
      if(response?.data?.status === 200){
        localStorage.clear()
        localStorage.setItem('token', response?.data?.token)
        localStorage.setItem('refresh', response?.data?.refresh)
        localStorage.setItem('user_info', response?.data?.user_info)
        toast.success(response?.data?.message || "Login Successful")
        navigate(HOME_PAGE)
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred while logging in");
    }
  };

  const handleLoginMethod = () => {
    setMobileLogin(!isMobileLogin);
  };
  return (
    <>
      <h2>Login</h2>
      <button className="py-2 br-10" onClick={() => handleLoginMethod()}>
        Login with {isMobileLogin ? "Mobile" : "Email"}
      </button>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {isMobileLogin ? (
          <>
            <label htmlFor="email">Email</label>
            <input
              className="login-input"
              type="text"
              placeholder="Email"
              {...register("email", { pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
             {errors.mobile && (
              <span className="error-message">{errors.mobile.message}</span>
            )}
          </>
        ) : (
          <>
            <label htmlFor="mobileNumber">Mobile number</label>

            <input
              className="login-input"
              type="nu"
              placeholder="Mobile number"
              {...register("mobile", {
                required: false,
                max: 10,
                min: 10,
                maxLength: 10,
              })}
            />
            {errors.mobile && (
              <span className="error-message">{errors.mobile.message}</span>
            )}
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </>
        )}
        <label htmlFor="password">Password</label>

        <input
          className="login-input mb-5"
          type="password"
          placeholder="Password"
          {...register("password", { required: true, max: 15, min: 8 })}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
        <button className="py-2 br-10 rounded-10" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
export default LoginForm;
