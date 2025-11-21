import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, Tag, Button, ErrorBlock, Loading } from 'antd-mobile';
import { MessageOutline, ClockCircleOutline } from 'antd-mobile-icons';
import { chatApi } from '../api/client';
import type { ChatSession } from '../types';
import { useNavigate } from 'react-router-dom';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: sessions, isLoading, error, refetch } = useQuery<ChatSession[]>({
    queryKey: ['chatSessions'],
    queryFn: chatApi.getSessions,
  });

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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const renderEmpty = () => (
    <div className="history-empty">
      <p>No chats yet.</p>
      <Button color='primary' onClick={() => navigate('/chat')}>
        Start chatting
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Loading color='primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <ErrorBlock status='default' title='Failed to load history' description={String(error)} />
        <Button block color='primary' style={{ marginTop: '12px' }} onClick={() => { void refetch(); }}>Retry</Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="page-container"
    >
      <motion.h1
        variants={item}
        className="text-gradient page-title page-header"
      >
        History
      </motion.h1>

      {!sessions || sessions.length === 0 ? renderEmpty() : (
        <div className="flex-column" style={{ gap: '15px' }}>
          {sessions.map((session) => {
            const lastMessage = session.messages && session.messages[0];
            const updatedAt = new Date(session.updatedAt);
            return (
              <motion.div key={session.id} variants={item}>
                <Card
                  className="glass-card history-card"
                >
                  <div className="history-card-header">
                    <span className="history-card-title">
                      {session.title || `Session #${session.id}`}
                    </span>
                    <Tag color='primary'>
                      <ClockCircleOutline style={{ marginRight: 4 }} />
                      {updatedAt.toLocaleDateString()}
                    </Tag>
                  </div>
                  <div className="history-card-preview">
                    <MessageOutline />
                    <span>{lastMessage ? `${lastMessage.content.slice(0, 80)}${lastMessage.content.length > 80 ? '...' : ''}` : 'No messages yet'}</span>
                  </div>
                  <div className="history-card-footer">
                    <span className="history-card-date">
                      Last update: {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Button size='small' color='primary' onClick={() => navigate(`/chat?sessionId=${session.id}`)}>
                      Open
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
