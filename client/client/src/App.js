import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {useContext} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './login/login'
import Register from './register/register'
import Chat from "./chat/chat";
import Layout, { Auth } from "./layout/layout";
import Context_theme, { contextTheme }  from "./context/context";
import Socket_provider from "./context/Socket";
import Search from "./search/search";
import Profile from './Profile/Profile'
import loader from "./Loader/profile";
import Form from "./form/Form";
import ProfileLoader from "./Loader/profile";
const App = () => {
  const router = createBrowserRouter([
   {
    path: "/",
    element:<Layout/>,
    children:[
    {
      path: "/login",
      element:<Login/>,
    },
    {
      path:"/register",
      element:<Register/>
    }
]
},{
  path: "/auth",
  element:<Auth/>,
  children:[
    {
      path:'/auth/chat',
      element:<Chat/>
    },
    {
      path:'/auth/profile',
      loader:ProfileLoader,
      element:<Profile/>
    },
    {
      path:"/auth/search",
      element:<Search/>
    },
    {
      path:'/auth/form',
      element:<Form/>
    }
  ]
}
]);

  return (
    <Context_theme>
      <Socket_provider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
      </Socket_provider>
    </Context_theme>
  );
};

export default App;
