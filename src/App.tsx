import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./components/user-page";
// import PomadoroPage from "./components/pomadoro-page";
import SignIn from "./components/auth/signIn";
import SighUp from "./components/auth/sighUp";
import MainPage from "./components/main-page"

function App() {
  return (
    <BrowserRouter>
    <Routes>
        {/* TODO: auth*/}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SighUp />} />
        {/* <Route path="/user" element={<Index />} /> */}
        <Route path="/" element={<MainPage />} />
    </Routes>
</BrowserRouter>
  );
}

export default App;
