import React from 'react'
import { Navigate, Route, Routes } from 'react-router';   //npm i react-router installing this to define routes for different pages

// importing all pages using routes
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";

import PageLoader from "./components/PageLoader.jsx";
//toast from react-hot-toast dependency
//define toast in import
import { Toaster } from "react-hot-toast";


//tanstack query for query control - connecting frontend to backend by sending requests or fetching of data from backend
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';

const App = () => {
  //axios
  //react query or tanstack query
 const {isLoading , authUser} = useAuthUser();

 //for different themes in website
const { theme } = useThemeStore();

 const isAuthenticated = Boolean(authUser);
 const isOnboarded = authUser?.isOnboarded;
 
 if(isLoading) return <PageLoader />
  

  return (
    <div className=" h-screen " data-theme={theme} >
      
      <Routes>

      <Route path="/" element={ isAuthenticated && isOnboarded ? 
      <Layout showSidebar={true} >
      <HomePage /> 
      </Layout>
      : <Navigate to={
        !isAuthenticated ? "/login" : "/onboarding"}/> } />

      <Route path="/signup" element={ !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded? "/" : "/onboarding"}/> } />
      
      <Route path="/login" element={ !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded? "/" : "/onboarding"}/>} />
      <Route path="/onboarding" element={  isAuthenticated ? (
              !isOnboarded ? (
                <OnBoardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )} />
      <Route path="/notifications" element={ isAuthenticated && isOnboarded ? 
      <Layout showSidebar={true} >
      <NotificationPage /> 
      </Layout>
      : <Navigate to={
        !isAuthenticated ? "/login" : "/onboarding"}/>} />

      <Route path="/chat/:id" 
      element={ isAuthenticated && isOnboarded ? 
      <Layout showSidebar={false} >
      <ChatPage /> 
      </Layout>
      : <Navigate to={
        !isAuthenticated ? "/login" : "/onboarding"}/> } />

      <Route path="/call/:id" element={ isAuthenticated && isOnboarded ?
         <CallPage /> : <Navigate to={
          !isAuthenticated ? "/login" : "/onboarding"}/> } />

       </Routes>

       <Toaster />

    </div>
  )
}

export default App
