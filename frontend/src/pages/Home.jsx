import React from "react";
import video from "../assets/video.webm";
import Button from "@mui/material/Button";
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import {jwtDecode} from "jwt-decode"; 

import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();

  function handleNavigation() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);
        if (decode) {
          nav("/dashboard");
        }
      } catch (err) {
        console.log("Invalid token", err);
        nav("/signup");
      }
    } else {
      nav("/signup");
    }
  }

  return (
    <div>
      <div className="bg-[#1976d2] items-center inset-0 flex justify-between  bg-opacity-30 backdrop-blur-lg border border-opacity-20 sticky z-50 top-0 p-5">
        <div className="text-[#1976d2] font-bold font-poppins uppercase text-xl">WalletPay</div>
        <div>
          <Button variant="contained" onClick={handleNavigation}>
            LOGIN
          </Button>
        </div>
      </div>

      <div className="relative h-screen md:h-[95vh] w-full object-cover mb-10 rounded-b-3xl">
        <video
          src={video}
          autoPlay
          muted
          loop
          className="h-full w-full object-cover rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 rounded-b-3xl"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center font-vietnam px-2">
          <h1 className="text-3xl sm:text-4xl text-white font-poppins">
            WalletPro: Your All-in-One <br />{" "}
            <div className="text-[#1976d2] font-bold">
              Digital Wallet Solution
            </div>
          </h1>
          <br />
          <p className="text-white font-poppins max-w-sm">
            Manage your finances, make payments, and track transactions with ease.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Lightning Fast", description: "Process payments in seconds, not minutes." },
              { title: "Bank-Level Security", description: "Your transactions are protected by state-of-the-art encryption." },
              { title: "24/7 Support", description: "Our dedicated team is always here to help you." }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <CheckCircle className="w-12 h-12 text-[#1976d2] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>




      <section className="bg-gray-100 py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {[
              { step: 1, title: "Sign Up", description: "Create your account in minutes" },
              { step: 2, title: "Connect", description: "Link your bank account securely" },
              { step: 3, title: "Transact", description: "Start sending and receiving payments" }
            ].map((item, index) => (
              <div key={index} className="flex items-center mb-8 md:mb-0 group">
                <div className="bg-[#1976d2] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4 group-hover:bg-[#1565c0] transition duration-300">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-[#1976d2] transition duration-300">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <ArrowRight className="hidden md:block w-8 h-8 text-[#1976d2] mx-4 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-50">
          <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute left-1/2 bottom-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#1976d2] to-[#1565c0] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Ready to Transform Your Payment Experience?
            </h2>
            <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers and revolutionize your payment process today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-[#1976d2] px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105 shadow-lg flex items-center">
                Get Started Now
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#1976d2] transition duration-300 transform hover:scale-105">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -top-1/4 right-1/3 w-1/3 h-1/3 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      <div className="text-center py-2 font-poppins">
        Copyrigh Walletpay All right reservced <br /> Developed by Farhan ❤︎
      </div>
    </div>
  );
};

export default Home;
