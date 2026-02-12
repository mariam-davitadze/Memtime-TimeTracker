import { createBrowserRouter } from 'react-router-dom';
import Clients from '../pages/Clients';
import ErrorPage from '../pages/Error';
import ClientsLayout from '../layouts/ClientsLayout';

const router = createBrowserRouter([
  {
    path: '/clients',
    element: <ClientsLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Clients /> }],
  },
]);

export default router;
