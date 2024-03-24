import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../Login/Form.css";
import httpClient from "../../constants/httpClient";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be atleast 8 characters"),
  phone_number: yup
    .string()
    .required("Mobile number is required")
    .max(10, "Mobile number should be 10 digits")
    .min(10, "10 digits is required"),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/`, data);

      if (response.data.status === 400 || response.data.status === 404) {
        toast.error(response?.data?.error || "Error: Bad Request");
      } else if (response.data?.status === 201) {
        toast.success(response?.data?.message || "User created successfully");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred while creating the user");
    }
  };

  return (
    <>
      <h2>SignUp</h2>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          className="login-input"
          type="text"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
        <label htmlFor="mobileNumber">Mobile number</label>

        <input
          className="login-input"
          type="nu"
          placeholder="Mobile number"
          {...register("phone_number", {
            required: true,
            max: 10,
            min: 10,
            maxLength: 10,
          })}
        />
        {errors.phone_number && (
          <span className="error-message">{errors.phone_number.message}</span>
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
export default SignUpForm;
