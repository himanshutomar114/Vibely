import React from 'react'
import { useState } from 'react'
import { Link } from "react-router";



import useSignUp from "../hooks/useSignUp";


const SignUpPage = () => {
  
  const[singupData,setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  //const queryClient = useQueryClient();

  //A mutation is typically used for POST, PUT, PATCH, DELETE requests — anything that causes a change in the backend.
  
  //const { mutate:signupMutation , isPending, error } = useMutation({
   // mutationFn: signup,
    //onSuccess: () =>queryClient.invalidateQueries({queryKey: ["authUser"]}),
  //});

  const { isPending, error, signupMutation } = useSignUp();
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(singupData);
  }


  return (

    <div
      className=" h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4 sm:p-6 md:p-8"  data-theme="forest" >
      {/* This is an parent div*/}
     <div className="border border-primary/25 bg-white flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden"> 
     {/* SIGNUP FORM - LEFT SIDE */}
    
    <div className=" w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
     {/* Vibely Logo */}
     <div className="mb-4 flex items-center justify-start gap-2">
     <img src="/vibelylogo.png" alt="Vibely logo" className=" w-10 h-full" />
     <span className=" text-3xl font-bold text-green-500 font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
      Vibely
      </span>
     </div>
     
    
    {/* ERROR MESSAGE IF ANY */}
    {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

     { /* SIGNUP FORM */ }
    <div className=" w-full">
     <form onSubmit={handleSignup}>
      <div className="space-y-4">
        <div>
          <h2 className='text-xl font-semibold'>Create an Account</h2>
          <p className=' text-sm opacity-70'>
            Join Vibely and stay connected like never before
          </p>
        </div>
        
        <div className=' space-y-3'>
          <div className=' form-control w-full'>
            <label className='label'>
              <span className=' label-text'>Full Name</span>
            </label>
            <input type='text'
             placeholder='Himanshu Tomar' 
             className=' input input-bordered w-full'
             value ={singupData.fullName}
             onChange={(e) => setSignupData({...singupData , fullName: e.target.value})}
             required />
          </div>
        </div>

        <div className=' space-y-3'>
          <div className=' form-control w-full'>
            <label className='label'>
              <span className=' label-text'>Email</span>
            </label>
            <input type='email'
             placeholder='himanshu@gmail.com' 
             className=' input input-bordered w-full'
             value ={singupData.email}
             onChange={(e) => setSignupData({...singupData , email: e.target.value})}
             required />
          </div>
        </div>

        <div className=' space-y-3'>
          <div className=' form-control w-full'>
            <label className='label'>
              <span className=' label-text'>Password</span>
            </label>
            <input type='password'
             placeholder='********' 
             className=' input input-bordered w-full'
             value ={singupData.password}
             onChange={(e) => setSignupData({...singupData , password: e.target.value})}
             required />
             
          </div>
          <p className='text-xs opacity-70 mt-1'>
              Password must be at least 8 characters long
             </p>
        </div>

        <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-green-500 hover:underline">terms of service</span> and{" "}
                        <span className="text-green-500 hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>

                  <button className="btn btn-primary bg-green-500 w-full hover:bg-green-600" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-400 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>     


      </div>

     </form>
    </div>
    </div>

   {/* SIGNUP FORM - RIGHT SIDE */}
   <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 bg-gray-600 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/signupimage.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>


     </div>
      
      
    </div>
  )
}

export default SignUpPage
