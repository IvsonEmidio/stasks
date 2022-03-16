import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./pages/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Tasks />} />
        <Route path="/profile" element={null} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
