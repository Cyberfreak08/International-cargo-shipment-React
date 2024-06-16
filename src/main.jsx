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
import ErrorPage from './Pages/ErrorPage/index.jsx';
import NationalVsInternational from './Pages/NationalVsInternational/index.jsx';
import MaxRevenueCategory from './Pages/MaxRevenueCategory/index.jsx';
import QuarterlyTransactions from './Pages/QuarterResult/index.jsx';
import MonthlyTransactions from './Pages/MonthlyTransactions/index.jsx';
const router = createBrowserRouter([
  {
    path: routerConstant.dashboard,
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: routerConstant.login,
    element: <SignIn />
  },
  {
    path: routerConstant.register,
    element: <SignUp />
  },{
    path:routerConstant.maxRevenue,
    element:<MaxRevenueCategory />
  },
  {
    path:routerConstant.secondQuarter,
    element:<QuarterlyTransactions />
  },
  {
    path:routerConstant.volume,
    element:<NationalVsInternational />
  },
  {
    path:routerConstant.lastQuarter,
    element:<MonthlyTransactions />
  },
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
