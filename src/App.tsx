import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import TaskAdded from "./pages/TaskAdded";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tasks/:nav" element={<Tasks />} />
        <Route path="/profile" element={null} />
        <Route path="/task-added" element={<TaskAdded />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
