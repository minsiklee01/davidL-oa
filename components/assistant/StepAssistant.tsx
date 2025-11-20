import { Step } from '@/lib/types';
import { useState } from 'react';

interface Props {
  step: Step | null;
}

interface ChatMessage {
  id: number;
  from: 'user' | 'assistant';
  text: string;
}

export default function StepAssistant({ step }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: 'assistant',
      text:
        'Hi! I’m your step assistant. Ask me how to complete this step or what to say in an email.',
    },
  ]);
  const [input, setInput] = useState('');

  if (!step) {
    return <div>Select a step to see assistant guidance.</div>;
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      from: 'user',
      text: input.trim(),
    };

    const autoReply: ChatMessage = {
      id: Date.now() + 1,
      from: 'assistant',
      text:
        'Here is a suggested next action for this step.',
    };

    setMessages(prev => [...prev, userMsg, autoReply]);
    setInput('');
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary p-3">
        <h2 className="font-semibold text-amber-50">Step Assistant</h2>
        <p className="text-sm text-amber-50 mt-1">
          Currently viewing: <span className="font-medium">{step.title}</span>
        </p>
      </header>

      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="flex-1 p-3 overflow-auto">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`mb-2 text-sm ${
                msg.from === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block px-2 py-1 rounded p-1 ${
                  msg.from === 'user' ? 'bg-emerald-200' : 'bg-gray-300'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2 p-3 bg-gray-100">
          <input
            className="flex-1 rounded px-2 py-1 text-sm bg-gray-300"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask the assistant about this step..."
          />
          <button className="text-sm px-3 py-1 border rounded">
            Send
          </button>
        </form>
      </div>

    </div>
  );
}