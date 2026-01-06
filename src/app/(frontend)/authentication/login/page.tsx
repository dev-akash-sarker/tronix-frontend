"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/service/RTK/store"; 
import { loginSuccess } from "@/service/RTK/features/user/user_slice";

const Loginauthpage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
 const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setMessage("");
    setIsLoading(true);

    const url = "http://localhost:8000/api/v1/user/userlogin";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Dispatch user data to Redux
        dispatch(loginSuccess(data.user)); // make sure your API returns the user object under `user`
        setMessage("Login successful!");
        console.log("User stored in Redux:", data.user);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1 className=" text-xl text-center font-bold font-pop">Sign in</h1>
      <form className=" w-[300px] mx-auto mt-4" onSubmit={handleSubmit}>
        <label htmlFor="email" className=" font-bold">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className=" w-[300px] h-[40px] border border-gray indent-2 mt-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full h-10 bg-hover-social text-white font-medium font-pop rounded disabled:opacity-50"
          disabled={isLoading || !email}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("successful") ? "text-green-600 font-semibold" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
};
export default Loginauthpage;
