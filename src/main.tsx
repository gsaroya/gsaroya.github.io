import React from "react";
import ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import OSBSOD from "./components/Error/BSOD";
import OSHome from "./components/Home/Home";
import OSLanding from "./components/Landing/Landing";
import OSLoginPortal from "./components/Login/Login";
import "./main.scss";
import "./responsive.scss";

// Routes for Login screen, Home screen, BSOD screen
const router = createHashRouter([
  {
    path: "/",
    element: <OSLanding />,
    errorElement: <OSBSOD />,
  },
  {
    path: "/Login",
    element: <OSLoginPortal />,
    errorElement: <OSBSOD />,
  },
  {
    path: "/Home",
    element: <OSHome />,
    errorElement: <OSBSOD />,
  },
  {
    path: "/Crash",
    element: <OSBSOD errorMsg={"Nice work, you crashed me"} errorCode={"0xDEADBEEF"} />,
  },
  {
    path: "/*",
    element: <OSBSOD errorMsg={"404 not found"} errorCode={"404_NOT_FOUND_XD"} />,
  },
]);

// Set responsive design breakpoints based on viewport calculation
const setDimensions = () => {
  let vh = window.innerHeight * 0.01;
  let wh = window.innerHeight;
  let ww = window.innerWidth;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  let scaleW = 1;
  if (ww > 600) {
    scaleW = 1;
  } else if (ww > 300) {
    scaleW = 2;
  } else {
    scaleW = 3;
  }

  let scaleH = 1;
  if (wh > 600) {
    scaleH = 1;
  } else if (wh > 300) {
    scaleH = 2;
  } else {
    scaleH = 3;
  }

  const iterator = document.documentElement.classList.entries();
  let remove = [];
  for (const [_, value] of iterator) {
    if (value.startsWith("screen-")) {
      remove.push(value);
    }
  }
  remove.forEach(value => document.documentElement.classList.remove(value));
  document.documentElement.classList.add(`screen-width-${scaleW}`);
  document.documentElement.classList.add(`screen-height-${scaleH}`);
};

setDimensions();
window.addEventListener("resize", setDimensions);
window.addEventListener("orientationchange", setDimensions);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
