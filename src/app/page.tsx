'use client';

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      let fullMessage = '';
      while (true) {
        const { value, done } = await reader?.read() || {};
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (let line of lines) {
          line = line.trim();
          if (line.startsWith('data: ')) {
            const msg = line.replace('data: ', '');
            if (msg !== '[DONE]' && msg) {
              fullMessage += msg;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return [
                    ...prev.slice(0, -1),
                    { role: 'assistant', content: fullMessage },
                  ];
                } else {
                  return [...prev, { role: 'assistant', content: fullMessage }];
                }
              });
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Failed to fetch response.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4">🧠 Chat Assistant</h1>

      <div className="border rounded h-[300px] overflow-auto p-4 mb-4 space-y-2 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.role === 'user' ? 'bg-blue-100 text-left' : 'bg-green-100 text-left'
            }`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="italic text-gray-400">Assistant is typing...</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded text-white px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
