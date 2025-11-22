import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, ErrorBlock, Loading } from 'antd-mobile';
import { planningApi } from '../api/client';
import { useAuthStore } from '../store/authStore';
import { TimeBlockCard } from '../components/TimeBlockCard';
import type { DayPlan } from '../types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const TodayPage: React.FC = () => {
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();
  
  const todayStr = new Date().toISOString().split('T')[0];

  const { data: dayPlan, isLoading, error, refetch } = useQuery({
    queryKey: ['dayPlan', todayStr],
    queryFn: () => planningApi.getDayPlan(todayStr),
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
        <Loading color='primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <ErrorBlock status='default' title='Failed to load plan' description={String(error)} />
        <Button block onClick={() => { refetch(); }} color='primary' style={{ marginTop: '10px' }}>Retry</Button>
      </div>
    );
  }

  if (!dayPlan) {
     return (
         <div className="today-empty-state">
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
             >
               <h2 className="text-secondary">No plan for today yet</h2>
               <p className="text-muted" style={{ marginBottom: '30px' }}>Chat with AI to generate your schedule.</p>
               <Button
                color='primary'
                onClick={() => navigate('/chat')}
                size='large'
                className="primary-gradient-btn"
               >
                   Go to Chat
               </Button>
             </motion.div>
         </div>
     )
  }

  const typedDayPlan = dayPlan as DayPlan;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="page-header"
      >
        <h1 className="text-gradient page-title">Today</h1>
        <div className="page-subtitle">{todayStr}</div>
      </motion.div>

      {typedDayPlan.dayGoal && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card daily-goal-card"
        >
          <strong className="daily-goal-label">Daily Goal</strong>
          <span style={{ fontSize: '1.1rem',color: '#ffffffff' }}>{typedDayPlan.dayGoal}</span>
        </motion.div>
      )}

      {typedDayPlan.overallAdvice && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="daily-advice"
        >
          "{typedDayPlan.overallAdvice}"
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {typedDayPlan.blocks?.map(block => (
          <motion.div key={block.id} variants={item}>
            <TimeBlockCard block={block} onUpdate={refetch} />
          </motion.div>
        ))}
        {(!typedDayPlan.blocks || typedDayPlan.blocks.length === 0) && (
            <p className="text-muted">No time blocks scheduled.</p>
        )}
      </motion.div>
      
      <motion.div
        className="fab-container"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
           <Button
            color='primary'
            shape='rounded'
            onClick={() => navigate('/chat')}
            className="fab-button"
           >
               +
           </Button>
      </motion.div>
    </div>
  );
};
