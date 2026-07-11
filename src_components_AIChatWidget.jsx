import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const aiResponses = {
  greeting: "Hello! I'm OEI AI Assistant 🌍 How can I help you with your logistics needs today?",
  tracking: "I can help you track your shipment! Please provide your tracking number (starts with OEI), or visit our Tracking page for real-time updates.",
  quote: "For an instant shipping quote, I recommend using our Quote Calculator. You can specify origin, destination, weight, and service type for accurate pricing.",
  services: "We offer comprehensive logistics solutions:\n\n✈️ **International Courier** – Express worldwide delivery\n🚢 **Sea Freight** – Cost-effective ocean shipping\n✈️ **Air Freight** – Fast air cargo transport\n📋 **Customs Clearance** – Expert customs handling\n🏭 **Warehouse** – Secure storage & fulfillment\n\nWhich service interests you?",
  pricing: "Our pricing varies by service type, weight, destination, and urgency. Use our **Instant Quote** tool for exact rates, or contact our sales team for custom enterprise solutions.",
  delivery: "Delivery times vary by service:\n\n• **Express Courier**: 1-3 business days\n• **Standard Air**: 3-7 business days\n• **Economy Sea**: 15-30 days\n\nWould you like a specific estimate?",
  default: "That's a great question! For detailed assistance, I'd recommend contacting our support team at info@okayexpressinternational.com or calling 1-800-OEI-SHIP. Is there anything else I can help with?",
};

function getAIResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return aiResponses.greeting;
  if (msg.includes('track') || msg.includes('where is') || msg.includes('status')) return aiResponses.tracking;
  if (msg.includes('quote') || msg.includes('price') || msg.includes('cost') || msg.includes('rate')) return aiResponses.quote;
  if (msg.includes('service') || msg.includes('offer') || msg.includes('what do')) return aiResponses.services;
  if (msg.includes('deliver') || msg.includes('how long') || msg.includes('when')) return aiResponses.delivery;
  return aiResponses.default;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: aiResponses.greeting, time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input, time: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const aiMessage = { role: 'ai', content: getAIResponse(input), time: new Date() };
    setIsTyping(false);
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-linear-to-br from-gold to-gold-dark rounded-full shadow-2xl shadow-gold/30 flex items-center justify-center hover:shadow-gold/50 transition-shadow"
      >
        <MessageCircle size={28} className="text-navy" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? 'w-72' : 'w-96'
            }`}
          >
            {/* Outer container (card wrapper) */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="w-full bg-linear-to-r from-navy to-navy-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                    <Bot size={22} className="text-gold" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-white text-sm truncate">OEI AI Assistant</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-xs text-green-200">Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                    type="button"
                  >
                    {isMinimized ? <Maximize2 size={16} className="text-white/80" /> : <Minimize2 size={16} className="text-white/80" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close chat"
                    type="button"
                  >
                    <X size={16} className="text-white/80" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                            msg.role === 'ai'
                              ? 'bg-linear-to-br from-navy to-navy-light'
                              : 'bg-linear-to-br from-gold to-gold-dark'
                          }`}
                        >
                          {msg.role === 'ai' ? (
                            <Bot size={16} className="text-gold" />
                          ) : (
                            <User size={16} className="text-navy" />
                          )}
                        </div>

                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                            msg.role === 'ai'
                              ? 'bg-white border border-gray-100 text-navy text-sm shadow-sm'
                              : 'bg-navy text-white text-sm'
                          }`}
                        >
                          <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                          <span className="text-xs opacity-50 mt-1 block">
                            {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-navy to-navy-light flex items-center justify-center">
                          <Bot size={16} className="text-gold" />
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                          <div className="flex gap-1.5">
                            <span
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0ms' }}
                            />
                            <span
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '150ms' }}
                            />
                            <span
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '300ms' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto">
                    {['Track Package', 'Get Quote', 'Services', 'Pricing'].map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => setInput(action)}
                        className="whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-xl bg-navy/95 text-white hover:bg-navy transition-colors shadow-sm"
                      >
                        {action}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-100">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                      }}
                      className="flex gap-2"
                    >
                      <div className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 shadow-sm px-3 py-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="Ask me anything about shipping..."
                          className="flex-1 bg-transparent outline-none text-sm text-navy placeholder:text-gray-400"
                        />
                        <button
                          type="submit"
                          className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center hover:opacity-95 transition-opacity"
                          aria-label="Send message"
                        >
                          <Send size={18} className="text-gold" />
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
