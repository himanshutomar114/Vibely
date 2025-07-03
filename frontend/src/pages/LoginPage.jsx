import React, { useState } from 'react'
import useLogin from "../hooks/useLogin";
import { Link } from "react-router";

const LoginPage = () => {
  
  const [loginData,setLoginData] = useState({
    email: "",
    password: "",
  });
  


// This is how we did it at first, without using our custom hook

//const queryCLient = useQueryClient();
  //const{mutate: loginMutation, isPending , error} = useMutation({
    //mutationFn: login,
    //onSuccess : () =>queryCLient.invalidateQueries({queryKey : ["authUser"]}),
  //});


    // This is how we did it using our custom hook - optimized version
  const { isPending, error, loginMutation } = useLogin();


  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div
    className="h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4 sm:p-6 md:p-8"
    data-theme="forest"
  >
    <div className="border border-primary/25 bg-white flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-xl shadow-lg overflow-hidden">
  
      {/* LOGIN FORM SECTION */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
        {/* Vibely Logo */}
        <div className="mb-4 flex items-center justify-start gap-2">
          <img src="/vibelylogo.png" alt="Vibely logo" className="w-10 h-full" />
          <span className="text-3xl font-bold text-green-500 font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Vibely
          </span>
        </div>
  
        {/* Error Message */}
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error.response?.data?.message || "Login failed"}</span>
          </div>
        )}
  
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-sm opacity-70">Sign in to continue your journey with Vibely</p>
          </div>
  
          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>
  
          {/* Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>
  
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary bg-green-500 hover:bg-green-600 w-full" disabled={isPending}>
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
  
          {/* Redirect to Signup */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green-400 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
  
      {/* RIGHT IMAGE SECTION */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-gray-600 items-center justify-center">
        <div className="max-w-md p-8 text-white">
          <div className="relative aspect-square max-w-sm mx-auto">
            <img src="/signupimage.png" alt="Login illustration" className="w-full h-full rounded-lg" />
          </div>
          <div className="text-center space-y-3 mt-8">
            <h2 className="text-xl font-semibold">Welcome to the Vibely family</h2>
            <p className="opacity-80">Connect, chat, and grow your network globally 🌍</p>
          </div>
        </div>
      </div>
  
    </div>
  </div>
  
  )
}

export default LoginPage
