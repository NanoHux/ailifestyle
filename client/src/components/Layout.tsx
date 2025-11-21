import React from 'react';
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { CalendarOutline, MessageOutline, ClockCircleOutline, UserOutline } from 'antd-mobile-icons';
import { motion } from 'framer-motion';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const tabs = [
    {
      key: '/',
      title: 'Today',
      icon: <ClockCircleOutline fontSize={24} />,
    },
    {
      key: '/chat',
      title: 'Chat',
      icon: <MessageOutline fontSize={24} />,
    },
    {
      key: '/history',
      title: 'History',
      icon: <CalendarOutline fontSize={24} />,
    },
    {
      key: '/settings',
      title: 'Settings',
      icon: <UserOutline fontSize={24} />,
    },
  ];

  return (
    <div className="layout-container">
      <motion.div
        className="layout-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
      
      <div className="glass-nav layout-tabbar">
        <TabBar activeKey={pathname} onChange={setRouteActive}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};
