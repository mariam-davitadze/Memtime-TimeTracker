import { api } from ".";

export const getClients = async () => {
  const response = await api.get('/clients');
  return response.data;
}

export const getClientProjects = async (clientId: string) => {
  const response = await api.get(`/clients/${clientId}/projects`);
  return response.data;
}

export const getProjectTasks = async (projectId: string) => {
  const response = await api.get(`/projects/${projectId}/tasks`);
  return response.data;
}
export interface GetTimeEntriesParams {
  limit: number;
  offset: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const getTimeEntries = async (
  params: GetTimeEntriesParams
) => {
  const response = await api.get('/time-entries', { params });
  console.log('fetched time entries', response.data);
  return response.data;
};

export const createTimeEntry = async (data: {
  taskId: number;
  comment: string;
  start: string;
  end: string;
}) => {
  const response = await api.post('/time-entries', data);
  return response.data;
};

export const updateTimeEntry = async (
  id: number,
  data: {
    taskId: number;
    comment: string;
    start: string;
    end: string;
  }
) => {
  const response = await api.put(`/time-entries/${id}`, data);
  return response.data;
};
