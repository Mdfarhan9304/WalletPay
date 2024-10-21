import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError]= useState(" ")
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login successfull!")
      navigate("/dashboard");
    } catch (error) {
        setError("Invalid username or password")
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="max-w-3xl gap-3 flex flex-col bg-white px-5 sm:px-10 py-9 rounded-lg">
        <h1 className="font-poppins text-3xl font-semibold text-center">Signin Page</h1>
        <p className="max-w-[300px] text-center font-poppins">Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter your name"
            className="p-1 w-80 border border-black rounded-sm"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input
            type="password"
            placeholder="Enter password"
            className="p-1 w-80 border border-black rounded-sm mt-2"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <input type="submit" className="bg-blue-600 inline p-1 text-white cursor-pointer rounded text-center mt-3" />
        </form>

        <Link to="/signup">
          <p className="text-center">Don't have an account?</p>
        </Link>
      </div>
    </div>
  );
};

export default Signin;

