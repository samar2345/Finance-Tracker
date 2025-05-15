
//   import { AuthLayout, Login } from './components/index.js'

 

  //   import { Routes,Route } from 'react-router-dom'

// function App() {
//   const [count, setCount] = useState(0)
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Dashboard/>} />
//         <Route path="/expenses" element={<Expenses/>} />
//         <Route path="/user" element={<User/>} />
//         <Route path="notifications/" element={<Notifications/>} />
//         <Route path="budgets/" element={<Budgets/>} />
//         {/* <Route path="/" element={</>} /> */}
//         {/* <Route path="/" element={</>} /> */}
//       </Routes>
//     </>
//   )
// }

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budgets from './pages/Budgets';
import Notifications from './pages/Notifications';
import User from './pages/User.jsx';
import { AuthLayout } from './components/index.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/expenses",
        element: (
            <AuthLayout authentication={false}>
                <Expenses />
            </AuthLayout>
        ),
    },
    {
        path: "/budgets",
        element: (
            <AuthLayout authentication={false}>
                <Budgets />
            </AuthLayout>
        ),
    },
    {
        path: "/notifications",
        element: (
            <AuthLayout authentication>
                <Notifications />
            </AuthLayout>
        ),
    },
    {
        path: "/users",
        element: (
            <AuthLayout authentication>
                <User />
            </AuthLayout>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

