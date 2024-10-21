import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
       toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="max-w-3xl gap-3 flex flex-col bg-white px-5 sm:px-10 py-9 rounded-lg">
        <h1 className="font-poppins text-3xl font-semibold text-center">Signup Page</h1>
        
        <p className="max-w-[300px] text-center font-poppins">Enter your information to create your account</p>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center'>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-1 w-80 rounded-sm border border-black"
            {...register("username", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input
            type="text"
            placeholder="First Name"
            className="p-1 w-80 rounded-sm border border-black"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

          <input
            type="text"
            placeholder="Last Name"
            className="p-1 w-80 rounded-sm border border-black"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

          <input
            type="password"
            placeholder="Enter password"
            className="p-1 w-80 rounded-sm border border-black"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          />
          {errors.password && <p className="text-red-500 text-left">{errors.password.message}</p>}
          <input type="submit" className='bg-blue-600 inline p-1 text-white cursor-pointer rounded text-center mt-3' />

         
        </form>

        <Link to="/signin">
          <p className="text-center">Already have an account?</p>
        </Link>
      </div>
   
    </div>
  );
};

export default Signup;
