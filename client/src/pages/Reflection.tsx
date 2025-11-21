import React, { useState } from 'react';
import { Form, TextArea, Rate, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { reflectionApi } from '../api/client';
import { motion } from 'framer-motion';

export const ReflectionPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    const date = new Date().toISOString().split('T')[0];
    
    try {
      const result = await reflectionApi.submitReflection(date, values.rating, values.notes);
      setSummary(result.summary);
      Toast.show({
        content: 'Reflection submitted successfully!',
        icon: 'success',
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'Failed to submit reflection',
        icon: 'fail',
      });
    } finally {
      setLoading(false);
    }
  };

  if (summary) {
    return (
      <div className="reflection-summary">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-gradient page-title" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
            Reflection Complete
          </h1>
          
          <div className="glass-card reflection-summary-card">
            <h3 className="reflection-summary-title">Daily Summary</h3>
            <p className="reflection-summary-text">{summary}</p>
          </div>

          <Button
            block
            color='primary'
            onClick={() => navigate('/')}
            size='large'
            className="submit-btn"
          >
            View Tomorrow's Plan
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="page-container"
    >
      <h1 className="text-gradient page-title" style={{ marginBottom: '10px' }}>
        Daily Reflection
      </h1>
      <p className="text-secondary" style={{ marginBottom: '30px' }}>Take a moment to reflect on your day.</p>
      
      <div className="glass-card form-card">
        <Form
          form={form}
          onFinish={onFinish}
          className="custom-form"
          footer={
            <Button
              block
              type='submit'
              color='primary'
              loading={loading}
              size='large'
              className="submit-btn"
            >
              Submit & Generate Tomorrow's Plan
            </Button>
          }
        >
          <Form.Item name='rating' label='How was your day?' rules={[{ required: true }]}>
            <Rate allowHalf style={{ '--active-color': '#ffc107' }} />
          </Form.Item>
          
          <Form.Item name='notes' label='Notes / Learnings' rules={[{ required: true }]}>
            <TextArea
              placeholder="What went well? What could be better?"
              rows={4}
              style={{ '--color': '#fff' }}
            />
          </Form.Item>
        </Form>
      </div>
    </motion.div>
  );
};