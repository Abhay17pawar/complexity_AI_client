import React, { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'human', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://complexity-ai-client-zlvs.vercel.app/api/generate', { message: input });
      const assistantMessage = { 
        role: 'assistant', 
        content: response.data.response 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: "Error generating response. Please try again." 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F0F0F]">
      <div className="flex-grow overflow-auto px-4 py-2 pb-20">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-start space-x-4 text-gray-300">
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center">
                  {message.role === 'human' ? (
                    <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-300" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#5436DA] flex items-center justify-center">
                      {/* Assistant Icon */}
                      <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 11L11 13.5L15.5 9M7.8 4.8L7.2 3M4.8 7.8L3 7.2M7.2 21L7.8 19.2M19.2 16.2L21 16.8M16.2 4.8L16.8 3M3 16.8L4.8 16.2M21 7.2L19.2 7.8M12 2.25C9.37665 2.25 7.25 4.37665 7.25 7C7.25 9.62335 9.37665 11.75 12 11.75C14.6234 11.75 16.75 9.62335 16.75 7C16.75 4.37665 14.6234 2.25 12 2.25ZM12 21.75C14.6234 21.75 16.75 19.6234 16.75 17C16.75 14.3766 14.6234 12.25 12 12.25C9.37665 12.25 7.25 14.3766 7.25 17C7.25 19.6234 9.37665 21.75 12 21.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-sm mb-2 text-gray-400">
                    {message.role === 'human' ? 'Human' : 'Assistant'}
                  </p>
                  <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-8">
              <div className="flex items-start space-x-4 text-gray-300">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#5436DA] flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 11L11 13.5L15.5 9M7.8 4.8L7.2 3M4.8 7.8L3 7.2M7.2 21L7.8 19.2M19.2 16.2L21 16.8M16.2 4.8L16.8 3M3 16.8L4.8 16.2M21 7.2L19.2 7.8M12 2.25C9.37665 2.25 7.25 4.37665 7.25 7C7.25 9.62335 9.37665 11.75 12 11.75C14.6234 11.75 16.75 9.62335 16.75 7C16.75 4.37665 14.6234 2.25 12 2.25ZM12 21.75C14.6234 21.75 16.75 19.6234 16.75 17C16.75 14.3766 14.6234 12.25 12 12.25C9.37665 12.25 7.25 14.3766 7.25 17C7.25 19.6234 9.37665 21.75 12 21.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4 bg-[#0F0F0F]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="flex-grow">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Message Complexity..."
                className="w-full resize-none overflow-hidden bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5436DA] focus:border-transparent placeholder-gray-500"
                style={{ maxHeight: '100px' }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 bg-[#5436DA] text-white rounded-lg px-4 py-2 hover:bg-[#4326CA] disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
      <footer className="border-t border-gray-800 p-4 text-center text-gray-500">
        Made by Abhay ❤️
      </footer>
    </div>
  );
};

export default Home;
