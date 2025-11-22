import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input, Button, Loading, Toast } from 'antd-mobile';
import { SendOutline } from 'antd-mobile-icons';
import { useQueryClient } from '@tanstack/react-query';
import { chatApi } from '../api/client';
import type { Message, ChatSession } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

export const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isNewDaySessionRef = useRef(false);
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const preferredSessionId = useMemo(() => {
        const param = searchParams.get('sessionId');
        const parsed = param ? parseInt(param, 10) : NaN;
        return Number.isNaN(parsed) ? null : parsed;
    }, [searchParams]);

    // Initialize session
    useEffect(() => {
        const initSession = async () => {
            try {
                const sessions: ChatSession[] = await chatApi.getSessions();
                
                // If user specified a session via URL, always load that one
                if (preferredSessionId) {
                    const target = sessions?.find((s) => s.id === preferredSessionId);
                    if (target) {
                        setSessionId(target.id);
                        return;
                    }
                }

                // Logic for default view (no URL param)
                if (sessions && sessions.length > 0) {
                    // Find the most recent session
                    // Assuming sessions might not be sorted, let's sort them descending by updatedAt
                    const sortedSessions = [...sessions].sort((a, b) =>
                        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                    );
                    
                    const latestSession = sortedSessions[0];
                    const lastUpdateDate = new Date(latestSession.updatedAt);
                    const today = new Date();
                    
                    const isSameDay = lastUpdateDate.getFullYear() === today.getFullYear() &&
                                    lastUpdateDate.getMonth() === today.getMonth() &&
                                    lastUpdateDate.getDate() === today.getDate();

                    if (isSameDay) {
                        // It's today's session, resume it
                        setSessionId(latestSession.id);
                    } else {
                        // It's an old session, start a fresh one for today
                        const newSession = await chatApi.createSession();
                        setSessionId(newSession.id);
                        
                        // Add greeting message for the new day
                        setMessages([{
                            id: Date.now(),
                            role: 'assistant',
                            content: '新的一天开始了，今天有什么要做的吗？',
                            hasPlanUpdate: false,
                            createdAt: new Date().toISOString()
                        }]);
                        // Return early to prevent loading messages effect from overriding this
                        return;
                    }
                } else {
                    // No sessions at all, create first one
                    const newSession = await chatApi.createSession();
                    setSessionId(newSession.id);
                }
            } catch (error) {
                console.error('Failed to init session', error);
                Toast.show({ content: 'Failed to load chat sessions', icon: 'fail' });
            }
        };
        initSession();
    }, [preferredSessionId]);

    // Load messages when session ID changes
    useEffect(() => {
        if (sessionId) {
            if (isNewDaySessionRef.current) {
                // Reset flag so subsequent updates (e.g. sending message) work normally if needed,
                // though usually this effect only runs on ID change.
                // We just skip fetching because we already set the greeting manually.
                isNewDaySessionRef.current = false;
                return;
            }

            const loadMessages = async () => {
                try {
                    const msgs = await chatApi.getMessages(sessionId);
                    setMessages(msgs);
                } catch (error) {
                    console.error('Failed to load messages', error);
                }
            };
            loadMessages();
        }
    }, [sessionId]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || !sessionId) return;

        const content = inputValue;
        setInputValue('');
        
        // Optimistic update
        const tempMsg: Message = {
            id: Date.now(),
            role: 'user',
            content,
            hasPlanUpdate: false,
            createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, tempMsg]);
        setLoading(true);

        try {
            const response = await chatApi.sendMessage(sessionId, content);
            // Response contains { message: Message, hasPlanUpdate: boolean }
            setMessages(prev => [...prev, response.message]);
            
            if (response.hasPlanUpdate) {
                Toast.show({
                    content: 'Plan updated!',
                    icon: 'success',
                });
                // Invalidate Today's plan query to refresh data
                queryClient.invalidateQueries({ queryKey: ['dayPlan'] });
            }
            queryClient.invalidateQueries({ queryKey: ['chatSessions'] });
        } catch (error) {
            console.error('Failed to send message', error);
            Toast.show({
                content: 'Failed to send message',
                icon: 'fail',
            });
        } finally {
            setLoading(false);
        }
    };

    // 底部导航栏的高度约为 50px，输入框需要位于导航栏上方
    const bottomOffset = 50;

    return (
        // 增加底部内边距，防止内容被固定的输入框遮挡
        <div className="chat-page-container" style={{ paddingBottom: `${bottomOffset + 80}px` }}>
            <div className="chat-header">
                <h1 className="text-gradient page-title">Chat</h1>
            </div>
            
            <div className="chat-messages-area">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="message-row"
                            style={{
                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <div className={`message-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ padding: '10px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}
                    >
                        <Loading color='primary' /> Thinking...
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div
                className="glass-nav chat-input-container"
                style={{
                    bottom: `${bottomOffset}px`,
                }}
            >
                <Input
                    placeholder='Type a message...'
                    value={inputValue}
                    onChange={val => setInputValue(val)}
                    onEnterPress={handleSend}
                    className="chat-input"
                />
                <Button
                    color='primary'
                    onClick={handleSend}
                    disabled={loading || !inputValue.trim()}
                    shape='rounded'
                    className="chat-send-btn"
                >
                    <SendOutline fontSize={20} />
                </Button>
            </div>
        </div>
    );
};
