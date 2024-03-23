import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../Login/Form.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be atleast 8 characters"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[6-9][0-9]{10}/, "Invalid phone number")
    .max(10, "Phone number should be 10 digits")
    .min(10, "Atleast 10 digits is required"),
});

const SignUpForm = () => {
  const [adata, setaData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    // console.log('data............',data);
    setaData(data);
  };
  console.log("erors.............", errors);
  console.log("data............", adata);

  return (
    <>
      <h2>SignUp Form</h2>
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
          {...register("mobileNumber", {
            required: true,
            max: 10,
            min: 10,
            maxLength: 10,
          })}
        />
        {errors.mobileNumber && (
          <span className="error-message">{errors.mobileNumber.message}</span>
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
      <p>{adata}</p>
    </>
  );
};
export default SignUpForm;
