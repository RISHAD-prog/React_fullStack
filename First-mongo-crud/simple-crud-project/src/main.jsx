import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import USER from './components/USERS/user';
import Update from './components/Update/Update';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "users",
    element: <USER></USER>,
    loader: () => fetch('http://localhost:5000/users')
  },
  {
    path: "update/:id",
    element: <Update></Update>,
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
