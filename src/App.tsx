import React, {Suspense} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import "./styles/index.scss"
import {AboutPageAsync} from "./pages/AboutPage/AboutPage.async";
import {MainPageAsync} from "./pages/MainPage/MainPage.async";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";

const App = () => {
  const {theme, toggleTheme} = useTheme()

  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>Toggle</button>
      <Link to="/main">Main</Link>
      <Link to="/about">About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/main" element={<MainPageAsync/>}/>
          <Route path="/about" element={<AboutPageAsync/>}/>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;