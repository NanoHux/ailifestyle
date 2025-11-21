import React, { useEffect } from 'react';
import { Form, Input, Button, Toast, Selector } from 'antd-mobile';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, logout } = useAuthStore();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        displayName: user.displayName,
        timezone: user.timezone,
        pacePreference: user.pacePreference ? [user.pacePreference] : [],
        stylePreference: user.stylePreference ? [user.stylePreference] : [],
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    try {
      await updateProfile({
        ...values,
        pacePreference: values.pacePreference[0],
        stylePreference: values.stylePreference[0],
      });
      Toast.show({
        content: 'Profile updated',
        icon: 'success',
      });
    } catch (error) {
      Toast.show({
        content: 'Failed to update profile',
        icon: 'fail',
      });
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="page-container"
    >
      <h1 className="text-gradient page-title" style={{ marginBottom: '30px' }}>
        Settings
      </h1>
      
      <div className="glass-card form-card">
        <Form
          form={form}
          onFinish={onFinish}
          className="custom-form"
          footer={
            <div className="flex-column" style={{ gap: '15px', marginTop: '20px' }}>
              <Button
                block
                type='submit'
                color='primary'
                size='large'
                className="primary-gradient-btn"
              >
                Save Changes
              </Button>
              <Button
                block
                onClick={handleLogout}
                size='large'
                className="logout-btn"
              >
                Logout
              </Button>
            </div>
          }
        >
          <Form.Item name='displayName' label='Display Name'>
            <Input placeholder='Your Name' style={{ '--color': '#fff' }} />
          </Form.Item>
          
          <Form.Item name='timezone' label='Timezone'>
            <Input placeholder='Asia/Shanghai' style={{ '--color': '#fff' }} />
          </Form.Item>

          <Form.Item name='pacePreference' label='Preferred Pace'>
            <Selector
              className="custom-selector"
              options={[
                { label: 'Relaxed', value: 'relaxed' },
                { label: 'Medium', value: 'medium' },
                { label: 'Tight', value: 'tight' },
              ]}
            />
          </Form.Item>

          <Form.Item name='stylePreference' label='AI Style'>
            <Selector
              className="custom-selector"
              options={[
                { label: 'Calm', value: 'calm' },
                { label: 'Coach', value: 'coach' },
                { label: 'Warm', value: 'warm' },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </motion.div>
  );
};