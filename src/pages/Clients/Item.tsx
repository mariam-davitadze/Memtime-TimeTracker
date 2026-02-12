import { Collapse, Flex, Typography } from 'antd';
import { formatDate } from '../../helpers/formatDate';
import { useEffect, useMemo, useState } from 'react';
import { getClientProjects, getProjectTasks } from '../../api/clients';
import { Project, Task } from '../../types/Client';
const { Title, Text } = Typography;

export const ClientHeader = ({
  description,
  name,
  createdAt,
  updatedAt,
}: {
  description?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}) => {
  return (
    <Flex justify='space-between' align='center'>
      <Flex>
        <Title level={4} style={{ margin: 0, width: 300 }} ellipsis>
          {name}
        </Title>

        <Text type='secondary' ellipsis>
          {description}
        </Text>
      </Flex>

      <Flex vertical gap='1em'>
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
  }, []);
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
  }, []);
  const items = useMemo(() => {
    if (!projects.length) return [];
    return projects.map((project) => ({
      key: `client-${clientId}-project-${project.id}`,
      label: (
        <ClientHeader
          name={project.name}
          createdAt={project.createdAt}
          updatedAt={project.updatedAt}
        />
      ),
      children: <Tasks projectId={project.id} />,
    }));
  }, [projects]);

  return <Collapse items={items} bordered={false} />;
};
