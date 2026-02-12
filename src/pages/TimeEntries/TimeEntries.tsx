import { useEffect, useState } from 'react';
import {
  Layout,
  Typography,
  Table,
  Spin,
  Empty,
  Button,
  FloatButton,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatDate } from '../../helpers/formatDate';
import { TimeEntry } from '../../types/Entry';
import { getTimeEntries } from '../../api/clients';
import TimeEntryFormModal from './TimeEntrieFormModal';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PAGE_SIZE = 10;

const TimeEntries = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);

  const fetchEntries = async (currentPage: number) => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * PAGE_SIZE;
      const response = await getTimeEntries({
        limit: PAGE_SIZE,
        offset,
      });

      setEntries(response);
      setTotal(response.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries(page);
  }, [page]);

  const columns: ColumnsType<TimeEntry> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      width: 100,
    },
    {
      title: 'Task ID',
      dataIndex: 'taskId',
      key: 'taskId',
      ellipsis: true,
      width: 100,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (value: string) => value || '—',
      ellipsis: true,
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      sorter: true,
      render: (date: string) => formatDate(date, true),
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end',
      sorter: true,
      render: (date: string) => formatDate(date, true),
    },
    {
      title: 'Duration',
      key: 'duration',
      width: 120,
      render: (_, record) => {
        const start = new Date(record.start).getTime();
        const end = new Date(record.end).getTime();
        const diffMinutes = Math.floor((end - start) / 60000);

        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        if (isNaN(diffMinutes)) return '—';

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Button
          type='link'
          onClick={() => {
            setEditingEntry(record);
            setModalVisible(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];
  if (loading || entries === null) {
    return (
      <Layout
        style={{ minHeight: '100vh', padding: 24, background: '#f0f2f5' }}
      >
        <Spin size='large' />
      </Layout>
    );
  }
  return (
    <Layout style={{ minHeight: '100vh', padding: 24, background: '#f0f2f5' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Time Entries
      </Title>
      <TimeEntryFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialValues={editingEntry || undefined}
        onSuccess={() => {
          fetchEntries(page);
        }}
      />
      {loading ? (
        <Spin size='large' />
      ) : !entries.length ? (
        <Empty description='No time entries found' />
      ) : (
        <Table
          rowKey='id'
          columns={columns}
          dataSource={entries}
          pagination={{
            position: ['bottomCenter'],
            current: page,
            pageSize: PAGE_SIZE,
            total,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
          }}
        />
      )}
      <FloatButton
        tooltip='Add Time Entry'
        shape='circle'
        type='primary'
        style={{ insetInlineEnd: 14, width: 48, height: 48 }}
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingEntry(null);
          setModalVisible(true);
        }}
      />
    </Layout>
  );
};

export default TimeEntries;
