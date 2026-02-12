import { useEffect, useMemo, useState } from 'react';
import { Client } from '../../types/Client';
import { Layout, Typography, Segmented, Collapse, Spin, Empty } from 'antd';
import { getClients } from '../../api/clients';
import { ClientContent, ClientHeader } from './Item';

const { Title } = Typography;

const Clients = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [filter, setFilter] = useState<string | null>('all');

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
    });
  }, []);

  const items = useMemo(() => {
    if (!clients || !clients.length) return [];
    return (
      clients
        .filter((c) => filter === 'all' || c.status === filter)
        .map((client) => ({
          key: client.id,
          label: (
            <ClientHeader
              name={client.name}
              description={client.description}
              createdAt={client.createdAt}
              updatedAt={client.updatedAt}
              status={client.status}
            />
          ),
          children: <ClientContent clientId={client.id} />,
        })) || []
    );
  }, [clients, filter]);

  return (
    <Layout style={{ minHeight: '100vh', padding: 24, background: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
        Clients
      </Title>

      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}
      >
        <Segmented
          options={[
            { label: 'All', value: 'all' },
            { label: 'Completed', value: 'completed' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Pending', value: 'pending' },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {clients === null ? (
        <Spin size='large' />
      ) : !clients.length ? (
        <Empty description='No clients found' />
      ) : (
        <Collapse
          items={items}
          bordered={false}
          expandIconPlacement='end'
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          onChange={(activeKeys) => {
            console.log('Collapse changed', activeKeys);
          }}
        />
      )}
    </Layout>
  );
};

export default Clients;
