import React from 'react';
import { Card, Button, Tag, Toast } from 'antd-mobile';
import type { PlanBlock } from '../types';
import { trackingApi } from '../api/client';
import { CheckCircleOutline, CloseCircleOutline, ClockCircleOutline } from 'antd-mobile-icons';
import { motion } from 'framer-motion';

interface TimeBlockCardProps {
  block: PlanBlock;
  onUpdate: () => void;
}

export const TimeBlockCard: React.FC<TimeBlockCardProps> = ({ block, onUpdate }) => {
  const handleStatusUpdate = async (status: string) => {
    try {
      await trackingApi.updateBlockStatus(block.id, status);
      Toast.show({
        content: `Task marked as ${status}`,
        icon: 'success',
      });
      onUpdate();
    } catch (error) {
      Toast.show({
        content: 'Failed to update task',
        icon: 'fail',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return '#00b578';
      case 'in_progress': return '#6C5DD3';
      case 'skipped': return '#ff8f00';
      case 'overdue': return '#ff3141';
      default: return 'rgba(255,255,255,0.2)';
    }
  };

  const isDone = block.status === 'done';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
        <Card
        className={`glass-card time-block-card ${isDone ? 'done' : ''}`}
        style={{
            borderLeftColor: getStatusColor(block.status)
        }}
        >
        <div className="time-block-header">
            <h3 className={`time-block-title ${isDone ? 'done' : ''}`}>
                {block.title}
            </h3>
            <Tag
                className="time-block-tag"
                style={{
                    backgroundColor: getStatusColor(block.status)
                }}
            >
                {block.status.replace('_', ' ')}
            </Tag>
        </div>

        <div className="time-block-time">
            <ClockCircleOutline style={{ marginRight: '6px' }} />
            {block.startTime.substring(11, 16)} - {block.endTime.substring(11, 16)}
        </div>
        
        {block.description && (
            <div className="time-block-description">{block.description}</div>
        )}

        {block.notes && (
            <div className="time-block-notes">Note: {block.notes}</div>
        )}

        <div className="time-block-actions">
            {block.status !== 'done' && (
            <Button
                size='mini'
                onClick={() => handleStatusUpdate('done')}
                className="action-btn action-btn-done"
            >
                <CheckCircleOutline style={{ marginRight: '4px' }} /> Done
            </Button>
            )}
            
            {block.status !== 'skipped' && block.status !== 'done' && (
            <Button
                size='mini'
                onClick={() => handleStatusUpdate('skipped')}
                className="action-btn action-btn-skip"
            >
                <CloseCircleOutline style={{ marginRight: '4px' }} /> Skip
            </Button>
            )}

            {/* Postpone Logic can be more complex, simple version for now */}
            {block.status !== 'done' && (
                <Button
                size='mini'
                onClick={() => { Toast.show('Postpone feature coming soon'); }}
                className="action-btn action-btn-postpone"
            >
                Postpone
            </Button>
            )}
        </div>
        </Card>
    </motion.div>
  );
};