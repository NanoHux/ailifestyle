import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, Tag, Button, ErrorBlock, Loading, Segmented, DatePicker, Space } from 'antd-mobile';
import { MessageOutline, ClockCircleOutline } from 'antd-mobile-icons';
import { chatApi, planningApi } from '../api/client';
import type { ChatSession, DayPlan } from '../types';
import { useNavigate } from 'react-router-dom';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'chat' | 'plan'>('chat');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [planFilter, setPlanFilter] = useState<'done' | 'skipped'>('done');

  const selectedDateStr = useMemo(
    () => selectedDate.toLocaleDateString('en-CA'),
    [selectedDate]
  );

  const { data: sessions, isLoading, error, refetch } = useQuery<ChatSession[]>({
    queryKey: ['chatSessions'],
    queryFn: chatApi.getSessions,
  });

  const {
    data: dayPlan,
    isLoading: isPlanLoading,
    error: planError,
    refetch: refetchPlan
  } = useQuery<DayPlan | null>({
    queryKey: ['dayPlanHistory', selectedDateStr],
    queryFn: () => planningApi.getDayPlan(selectedDateStr),
    enabled: tab === 'plan',
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

  const renderEmptyChats = () => (
    <div className="history-empty">
      <p>No chats yet.</p>
      <Button color='primary' onClick={() => navigate('/chat')}>
        Start chatting
      </Button>
    </div>
  );

  const renderPlanContent = () => {
    if (isPlanLoading) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Loading color='primary' />
        </div>
      );
    }

    if (planError) {
      return (
        <div style={{ padding: '20px' }}>
          <ErrorBlock status='default' title='Failed to load day plan' description={String(planError)} />
          <Button block color='primary' style={{ marginTop: '12px' }} onClick={() => { void refetchPlan(); }}>Retry</Button>
        </div>
      );
    }

    if (!dayPlan) {
      return (
        <div className="history-empty">
          <p>No plan for {selectedDateStr}.</p>
          <Button color='primary' onClick={() => navigate('/today')}>
            Go to Today
          </Button>
        </div>
      );
    }

    const filteredBlocks = dayPlan.blocks.filter((b) => b.status === planFilter);

    return (
      <div className="flex-column" style={{ gap: '16px' }}>
        <Card className="glass-card plan-goal-card">
          <div className="history-card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 8 }}>
            <span className="history-card-title">Daily Focus</span>
            <Tag color='primary'>{selectedDateStr}</Tag>
          </div>
          <div style={{ padding: '0 4px' }}>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 4 ,color: '#ffffffff' }}>{dayPlan.dayGoal || 'No goal set'}</div>
            <div style={{ opacity: 0.7, fontStyle: 'italic' ,color: '#ffffffff' }}>{dayPlan.overallAdvice || 'No advice available'}</div>
          </div>
        </Card>

        <div className="plan-section-header">
          <span className="plan-section-title">
            Tasks Overview
          </span>
          <Segmented
            className="custom-segmented"
            options={[
              { label: 'Completed', value: 'done' },
              { label: 'Skipped', value: 'skipped' },
            ]}
            value={planFilter}
            onChange={(v) => setPlanFilter(v as 'done' | 'skipped')}
          />
        </div>

        {filteredBlocks.length === 0 ? (
          <div className="history-empty">
            <p>No {planFilter === 'done' ? 'completed' : 'skipped'} tasks found for this day.</p>
          </div>
        ) : (
          filteredBlocks.map((block) => (
            <Card
              key={block.id}
              className={`glass-card history-card task-card status-${planFilter}`}
            >
              <div className="history-card-header">
                <span className="history-card-title">{block.title}</span>
                <span className="task-time">
                  {new Date(block.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {' - '}
                  {new Date(block.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {block.description && (
                <div className="history-card-preview" style={{ background: 'transparent', padding: '0 0 12px 0', marginBottom: 0 }}>
                  <span>{block.description}</span>
                </div>
              )}
              
              <div className="history-card-footer">
                <Space>
                  <Tag color={planFilter === 'done' ? 'success' : 'warning'}>
                    {planFilter === 'done' ? 'Completed' : 'Skipped'}
                  </Tag>
                  <Tag color='default' fill='outline'>{block.priority} Priority</Tag>
                </Space>
              </div>
            </Card>
          ))
        )}
      </div>
    );
  };

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

      <div className="flex-between" style={{ marginBottom: 24 }}>
        <Segmented
          className="custom-segmented"
          options={[
            { label: 'Chat History', value: 'chat', icon: <MessageOutline /> },
            { label: 'Daily Plans', value: 'plan', icon: <ClockCircleOutline /> },
          ]}
          value={tab}
          onChange={(v) => setTab(v as 'chat' | 'plan')}
        />
        
        {tab === 'plan' && (
          <>
            <Button
              size='small'
              color='primary'
              fill='outline'
              onClick={() => setDatePickerVisible(true)}
              style={{ borderRadius: '12px',color: '#ffffffff' }}
            >
              {selectedDateStr}
            </Button>
            <DatePicker
              visible={datePickerVisible}
              onClose={() => setDatePickerVisible(false)}
              value={selectedDate}
              onConfirm={(val) => setSelectedDate(val)}
            />
          </>
        )}
      </div>

      {tab === 'plan' ? (
        renderPlanContent()
      ) : (
        (!sessions || sessions.length === 0) ? renderEmptyChats() : (
          <div className="flex-column" style={{ gap: '16px' }}>
            {sessions.map((session) => {
              const lastMessage = session.messages && session.messages[0];
              const updatedAt = new Date(session.updatedAt);
              return (
                <motion.div key={session.id} variants={item}>
                  <Card
                    className="glass-card history-card"
                    onClick={() => navigate(`/chat?sessionId=${session.id}`)}
                  >
                    <div className="history-card-header">
                      <span className="history-card-title">
                        {session.title || `Session #${session.id}`}
                      </span>
                      <Tag color='primary' style={{ borderRadius: '6px' }}>
                        {updatedAt.toLocaleDateString()}
                      </Tag>
                    </div>
                    <div className="history-card-preview">
                      <MessageOutline fontSize={18} style={{ minWidth: '18px' }} />
                      <span style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {lastMessage ? lastMessage.content : 'No messages yet'}
                      </span>
                    </div>
                    <div className="history-card-footer">
                      <span className="history-card-date">
                        <ClockCircleOutline style={{ marginRight: 4 }} />
                        {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <Button size='small'  fill='none' style={{ color: '#fdfdfdff' }}>
                        Open ›
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )
      )}
    </motion.div>
  );
};
