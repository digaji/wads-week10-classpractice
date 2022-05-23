import React from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "./common/SideBar";
import Home from "./Home";
import Post from "./Post";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={
        <div>
          <SideBar />
          <Home />
        </div>
      }/>
      {/* Post Route */}
      <Route path="/post" element={
        <div>
          <SideBar />
          <Post />
        </div>
      }/>
    </Routes>
  );
}
