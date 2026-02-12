import { Collapse, Flex, Tag, Typography } from 'antd';
import { formatDate } from '../../helpers/formatDate';
import { useEffect, useMemo, useState } from 'react';
import { getClientProjects, getProjectTasks } from '../../api/clients';
import { Task } from '../../types/Task';
import { Project } from '../../types/Project';

const { Title, Text } = Typography;

const statusColors: Record<string, string> = {
  completed: 'green',
  'in-progress': 'blue',
  pending: 'orange',
  active: 'cyan',
};

export const ClientHeader = ({
  description,
  name,
  createdAt,
  updatedAt,
  status,
}: {
  description?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}) => {
  return (
    <Flex justify='space-between' align='center'>
      <Flex>
        <Title level={5} style={{ margin: 0, width: 250 }} ellipsis>
          {name}
        </Title>
        {description && (
          <Text type='secondary' ellipsis style={{ marginLeft: 8 }}>
            {description}
          </Text>
        )}
      </Flex>

      <Flex vertical gap='1em' align='end'>
        {status && (
          <Tag color={statusColors[status] || 'default'}>{status}</Tag>
        )}
        <Text>
          <b>Created:</b> {formatDate(createdAt)}
        </Text>
        <Text>
          <b>Updated:</b> {formatDate(updatedAt)}
        </Text>
      </Flex>
    </Flex>
  );
};
const Tasks = ({ projectId }: { projectId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    getProjectTasks(projectId).then((data) => {
      setTasks(data);
    });
  }, [projectId]);
  return (
    <ul>
      {tasks.map((task) => (
        <li key={`project-${projectId}-task-${task.id}`}>{task.name}</li>
      ))}
    </ul>
  );
};
export const ClientContent = ({ clientId }: { clientId: string }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    console.log('fetching content for client', clientId);
    getClientProjects(clientId).then((data) => {
      setProjects(data);
    });
  }, [clientId]);
  const items = useMemo(() => {
    if (!projects.length) return [];
    return projects.map((project) => ({
      key: `client-${clientId}-project-${project.id}`,
      label: (
        <ClientHeader
          name={project.name}
          createdAt={project.createdAt}
          updatedAt={project.updatedAt}
          status={project.status}
        />
      ),
      children: <Tasks projectId={project.id} />,
    }));
  }, [projects, clientId]);

  return <Collapse items={items} bordered={false} />;
};
