import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Button type="primary" onClick={() => navigate('/clients')}>
        Go to Clients
      </Button>
    </div>
  );
};

export default ErrorPage;
