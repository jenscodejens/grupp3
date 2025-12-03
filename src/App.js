import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import RecipeDetail from "./pages/RecipeDetail";
import Swagger from "./pages/Swagger";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Grupp3</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Hem</Link>
{/*             <Link className="nav-link" to="/kategorier">Kategorier</Link> */}
            <Link className="nav-link" to="/swagger">API Docs</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
{/*         <Route path="/kategorier" element={<Categories />} /> */}
        <Route path="/recept/:id" element={<RecipeDetail />} />
        <Route path="/swagger" element={<Swagger />} />
      </Routes>
    </Router>
  );
}

export default App;