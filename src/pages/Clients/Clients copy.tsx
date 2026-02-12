import { useEffect, useMemo, useState } from 'react';
import { Client } from '../../types/Client';
import {
  Badge,
  Button,
  Card,
  Layout,
  Space,
  Typography,
  Row,
  Col,
  Segmented,
  Collapse,
} from 'antd';
import { getClients } from '../../api/clients';
import { formatDate } from '../../helpers/formatDate';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const statusColor = (status: string) =>
  status === 'completed'
    ? '#95d5b2'
    : status === 'in-progress'
      ? '#ffd580'
      : '#d9d9d9';

const Clients = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [filter, setFilter] = useState<string | null>('all');
  const navigate = useNavigate();

  useEffect(() => {
    getClients().then((data) => setClients(data));
  }, []);

  const filteredClients =
    clients?.filter((c) => filter === 'all' || c.status === filter) || [];

  const items = useMemo(() => {
    if (!clients) return [];
    return clients.map((client) => ({
      key: client.id,
      label: (
        <Space direction='vertical' size={4}>
          <Title level={4} style={{ margin: 0 }}>
            {client.name}
          </Title>
          <Text type='secondary'>{client.description}</Text>

          <Space direction='vertical' size={4}>
            <Text>
              <b>Created:</b> {formatDate(client.createdAt)}
            </Text>
            <Text>
              <b>Updated:</b> {formatDate(client.updatedAt)}
            </Text>
          </Space>

          {/* <Button
            type='primary'
            style={{
              marginTop: 'auto',
              alignSelf: 'flex-start',
              backgroundColor: '#4dabf7',
              borderColor: '#4dabf7',
            }}
            onClick={() => navigate(`/clients/${client.id}/projects`)}
          >
            See Projects
          </Button> */}
        </Space>
        // <Badge.Ribbon text={client.status} color={statusColor(client.status)}>
        //   <Card
        //     hoverable
        //     style={{ height: '100%', borderRadius: 12 }}
        //     bodyStyle={{
        //       display: 'flex',
        //       flexDirection: 'column',
        //       gap: 12,
        //     }}
        //   >
        //     <Title level={4} style={{ margin: 0 }}>
        //       {client.name}
        //     </Title>
        //     <Text type='secondary'>{client.description}</Text>

        //     <Space direction='vertical' size={4}>
        //       <Text>
        //         <b>Created:</b> {formatDate(client.createdAt)}
        //       </Text>
        //       <Text>
        //         <b>Updated:</b> {formatDate(client.updatedAt)}
        //       </Text>
        //     </Space>

        //     <Button
        //       type='primary'
        //       style={{
        //         marginTop: 'auto',
        //         alignSelf: 'flex-start',
        //         backgroundColor: '#4dabf7',
        //         borderColor: '#4dabf7',
        //       }}
        //       onClick={() => navigate(`/clients/${client.id}/projects`)}
        //     >
        //       See Projects
        //     </Button>
        //   </Card>
        // </Badge.Ribbon>
      ),
    }));
  }, [clients]);

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

      {/* <Row gutter={[24, 24]} justify='center'> */}
        <Collapse
          items={items}
          defaultActiveKey={['1']}
          onChange={(activeKeys) => {
            console.log('Collapse changed', activeKeys);
          }}
        />

        {/* {filteredClients.map((client) => (
          
          <Col xs={24} sm={12} md={8} lg={6} key={client.id}>
            <Badge.Ribbon
              text={client.status}
              color={statusColor(client.status)}
            >
              <Card
                hoverable
                style={{ height: "100%", borderRadius: 12 }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  {client.name}
                </Title>
                <Text type="secondary">{client.description}</Text>

                <Space direction="vertical" size={4}>
                  <Text>
                    <b>Created:</b> {formatDate(client.createdAt)}
                  </Text>
                  <Text>
                    <b>Updated:</b> {formatDate(client.updatedAt)}
                  </Text>
                </Space>

                <Button
                  type="primary"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-start",
                    backgroundColor: "#4dabf7",
                    borderColor: "#4dabf7",
                  }}
                  onClick={() => navigate(`/clients/${client.id}/projects`)}
                >
                  See Projects
                </Button>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))} */}
      {/* </Row> */}
    </Layout>
  );
};

export default Clients;
