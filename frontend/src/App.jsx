import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./contexts/theme-context";

import Layout from "./routes/layout";
import DashboardPage from "./routes/dashboard/page";
import EmployeeDetails from "./pages/EmployeeDetails";
import Employees from "./pages/Employees";
import Department from "./pages/Departments";
import Ministry from "./pages/Ministries";
import EmployeeDetail from "./pages/EmployeeInfo";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "employees",
                    element: <Employees />,
                },
                {
                    path: "employee-details",
                    element: <EmployeeDetails />,
                },
                {
                    path: "departments",
                    element: <Department />,
                },
                {
                    path: "ministries",
                    element: <Ministry />,
                },
                {
                    path: "employee-details/:id",
                    element: <EmployeeDetail />,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
