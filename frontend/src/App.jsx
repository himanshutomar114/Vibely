import React from 'react'
import { Navigate, Route, Routes } from 'react-router';   //npm i react-router installing this to define routes for different pages

// importing all pages using routes
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OnBoardingPage from "./pages/NotificationPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";

//toast from react-hot-toast dependency
//define toast in import
import toast, { Toaster } from 'react-hot-toast';

//tanstack query for query control - connecting frontend to backend by sending requests or fetching of data from backend
import { useQuery } from '@tanstack/react-query';

//axios - perform HTTP requests like GET , POST , PUT, DELETE 
import { axiosInstance } from './lib/axios.js';

const App = () => {
  //axios
  //react query or tanstack query
  const {data:authData, isLoading, error} = useQuery({
    queryKey: ["authUser"], 

    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,    // auth check
  });
 const authUser = authData?.user


  

  return (
    <div className=" h-screen " >
      
      <Routes>

      <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login"/> } />
      <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/"/> } />
      <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/"/>} />
      <Route path="/onboarding" element={ authUser ? <OnBoardingPage /> : <Navigate to="/login"/>} />
      <Route path="/notifications" element={ authUser ? < NotificationPage /> : <Navigate to="/login"/>} />
      <Route path="/chat" element={ authUser ? <ChatPage /> : <Navigate to="/login"/> } />
      <Route path="/call" element={ authUser ? <CallPage /> : <Navigate to="/login"/> } />

       </Routes>

       <Toaster />

    </div>
  )
}

export default App
