// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import { routerConstant } from './utils/constants.js';
import Dashboard from './Pages/dashboard/index.jsx';
import SignIn from './Pages/SignIn/index.jsx';
import SignUp from './Pages/SignUp/index.jsx';
import ErrorPage from './Pages/ErrorPage/index.jsx';
import NationalVsInternational from './Pages/NationalVsInternational/index.jsx';
import MaxRevenueCategory from './Pages/MaxRevenueCategory/index.jsx';
import QuarterlyTransactions from './Pages/QuarterResult/index.jsx';
import MonthlyTransactions from './Pages/MonthlyTransactions/index.jsx';
import ProtectedRoute from './auth/protectedRoute.jsx';
import ContactList from './Pages/ContactList/index.jsx';
import AdminRoute from './auth/AdminRoute.jsx';

const router = createBrowserRouter([
  {
    path: routerConstant.dashboard,
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: routerConstant.maxRevenue, element: <MaxRevenueCategory /> },
      { path: routerConstant.secondQuarter, element: <QuarterlyTransactions /> },
      { path: routerConstant.volume, element: <NationalVsInternational /> },
      { path: routerConstant.lastQuarter, element: <MonthlyTransactions /> },
    ],
  },
  {
    path: routerConstant.contactList,
    element: <AdminRoute />,
    errorElement: <ErrorPage />,
    children: [
      {path:'',element:<ContactList />},
    ]
  },
  {
    path: routerConstant.login,
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: routerConstant.register,
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
