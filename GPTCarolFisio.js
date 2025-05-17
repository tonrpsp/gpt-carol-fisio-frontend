import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GPTCarolFisio = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim() === '') return;
        const newMessage = { role: 'user', content: input };
        setMessages([...messages, newMessage]);

        try {
            const response = await fetch('https://gpt-carol-fisio-api-production.up.railway.app/api/gpt-carol-fisio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            const botMessage = { role: 'assistant', content: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Erro ao se comunicar com o GPT:', error);
        }

        setInput('');
    };

    return (
        <div className='flex flex-col items-start p-4 w-full max-w-md'>
            <Card className='w-full mb-4'>
                <CardContent>
                    <h1 className='text-xl font-bold'>GPT Carol Fisio</h1>
                </CardContent>
            </Card>
            <div className='overflow-auto h-64 w-full border rounded p-2 mb-4'>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-blue-600' : 'text-gray-800'}`}>{msg.content}</div>
                ))}
            </div>
            <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='border p-2 rounded w-full mb-2'
                placeholder='Digite sua mensagem...'
            />
            <Button onClick={handleSend}>Enviar</Button>
        </div>
    );
};

export default GPTCarolFisio;
