import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
// import NavBar from './Components/navBar';
import { Dashboard } from './Pages/dashboard/index.jsx';
import { routerConstant } from './utils/constants.js';
import SignIn from './Pages/SignIn/index.jsx';
import SignUp from './Pages/SignUp/index.jsx';
const router = createBrowserRouter([
  {
    path: routerConstant.dashboard,
    element: <Dashboard />,
  },
  {
    path: routerConstant.login,
    element: <SignIn />
  },
  {
    path: routerConstant.register,
    element: <SignUp />
  }
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: rootLoader,
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
