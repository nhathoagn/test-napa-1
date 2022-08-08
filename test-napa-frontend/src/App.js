import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import PageDetail from "./components/Detail";
import FormComment from "./components/Comment";
import Notfound from "./components/Notfound";
import {ApiProvider} from "@reduxjs/toolkit/dist/query/react";
import AppButton from "./components/Posts";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
              <Route path="/post" element={<AppButton/>}/>
            <Route path="/page/:id" element={<PageDetail/>}/>
            <Route path="/comment" element={<FormComment/>}/>
            <Route path="/search" element={<Notfound />}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
