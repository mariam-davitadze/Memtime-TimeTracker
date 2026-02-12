import { createBrowserRouter, Navigate } from 'react-router-dom';
import Clients from '../pages/Clients';
import ErrorPage from '../pages/Error';
import ClientsLayout from '../layouts/MainLayout';
import TimeEntries from '../pages/TimeEntries';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientsLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Navigate to="/clients" replace /> },
      { path: 'clients', element: <Clients /> },
      {
        path: 'time-entries',
        element: <TimeEntries />,
      },
    ],
  },
]);

export default router;
