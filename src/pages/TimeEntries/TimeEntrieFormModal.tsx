import { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Space,
  Flex,
} from 'antd';
import dayjs from 'dayjs';
import { createTimeEntry, updateTimeEntry } from '../../api/clients';

interface TimeEntryFormModalProps {
  visible: boolean;
  onClose: () => void;
  initialValues?: {
    id: string;
    taskId: string;
    comment: string;
    start: string;
    end: string;
  };
  onSuccess?: () => void;
}

const TimeEntryFormModal = ({
  visible,
  onClose,
  initialValues,
  onSuccess,
}: TimeEntryFormModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEditMode = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        taskId: initialValues.taskId,
        comment: initialValues.comment,
        start: dayjs(initialValues.start),
        end: dayjs(initialValues.end),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form, visible]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        taskId: +values.taskId,
        comment: values.comment,
        start: values.start.toISOString(),
        end: values.end.toISOString(),
      };

      if (isEditMode && initialValues) {
        await updateTimeEntry(+initialValues.id, payload);
        message.success('Time entry updated successfully');
      } else {
        const response = await createTimeEntry(payload);
        message.success(`Created successfully (ID: ${response.id})`);
        form.resetFields();
      }

      onSuccess?.();
      onClose();
    } catch (error: any) {
      if (error.response?.status === 404) {
        message.error('Time entry not found (404)');
      } else if (error.response?.status === 400) {
        message.error('Invalid data submitted (400)');
      } else {
        message.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title={
        isEditMode
          ? `Update Time Entry for task with id: ${initialValues?.taskId || '—'}`
          : 'Create Time Entry'
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        {!isEditMode && (
          <Form.Item
            label='Task ID'
            name='taskId'
            rules={[{ required: true, message: 'Task ID is required' }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label='Comment'
          name='comment'
          rules={[{ required: true, message: 'Comment is required' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Flex gap='2em'>
          <Form.Item
            label='Start'
            name='start'
            rules={[{ required: true, message: 'Start time is required' }]}
            extra={
              <Button
                type='link'
                onClick={() => form.setFieldsValue({ start: dayjs() })}
                size='small'
              >
                Now
              </Button>
            }
          >
            <DatePicker
              showTime
              style={{ width: '100%' }}
              disabledDate={(current) => current && current > dayjs()}
            />
          </Form.Item>

          <Form.Item
            label='End'
            name='end'
            rules={[{ required: true, message: 'End time is required' }]}
            extra={
              <Button
                type='link'
                onClick={() => form.setFieldsValue({ end: dayjs() })}
                size='small'
              >
                Now
              </Button>
            }
          >
            <DatePicker
              showTime
              style={{ width: '100%' }}
              disabledDate={(current) => {
                const startValue = form.getFieldValue('start');
                return (
                  !startValue ||
                  current < dayjs(startValue) ||
                  current > dayjs()
                );
              }}
            />
          </Form.Item>
        </Flex>

        <Space>
          <Button type='primary' htmlType='submit' loading={loading}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
          {isEditMode && (
            <Button
              onClick={() => {
                form.setFieldsValue({
                  taskId: initialValues?.taskId,
                  comment: initialValues?.comment,
                  start: initialValues?.start
                    ? dayjs(initialValues.start)
                    : null,
                  end: initialValues?.end ? dayjs(initialValues.end) : null,
                });
              }}
            >
              Reset
            </Button>
          )}
        </Space>
      </Form>
    </Modal>
  );
};

export default TimeEntryFormModal;
