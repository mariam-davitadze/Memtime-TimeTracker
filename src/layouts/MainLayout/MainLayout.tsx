import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

const ClientsLayout = () => {
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <Menu
          theme='dark'
          defaultSelectedKeys={['clients']}
          items={[
            { key: 'clients', label: 'Clients' },
            { key: 'time-entries', label: 'Time Entries' },
          ]}
          style={{ flex: 1, minWidth: 0, padding: '1em 0' }}
          onSelect={(info) => navigate(`/${info.key}`)}
        />
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default ClientsLayout;
