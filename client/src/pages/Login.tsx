import React, { useState } from 'react';
import { Button, Input, Toast } from 'antd-mobile';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate('/');
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Login failed, please check your credentials.';
      Toast.show({ content: message, icon: 'fail' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card floating login-card"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-gradient login-title"
        >
          AI Lifestyle
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="login-subtitle"
        >
          Your personal AI assistant for daily planning.
        </motion.p>

        <div className="login-form">
          <Input
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="email"
            clearable
            className="custom-input"
          />
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Password"
            type="password"
            clearable
            className="custom-input"
          />
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            color='primary'
            onClick={handleLogin}
            size='large'
            block
            loading={loading}
            className="primary-gradient-btn"
          >
            Enter Universe
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
