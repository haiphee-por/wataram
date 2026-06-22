import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Send, BookOpen, AlertCircle, Bookmark, Globe } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export const AIChatAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'model',
      content: 'Sawatdee khab (สวัสดีครับ). I am **Phra Sila**, your SiamSanctuary AI Advisor trained on Sacred Thai Heritage, monastic architectures, and temple custom rules. Please ask me any questions about dress codes, historical periods (Lanna, Ayutthaya, Rattanakosin), or lore of Wat Arun.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggestions
  const promptPills = [
    { label: 'Dress Code rules', query: 'What is the appropriate dress code and etiquette when visiting Thai temples?' },
    { label: 'Lanna architecture', query: 'What makes northern Lanna style temple design distinct?' },
    { label: 'Wat Phra Kaew lore', query: 'Why does the Emerald Buddha change its outfits?' },
    { label: 'Sunset spires of Dawn', query: 'Tell me about the porcelain encrusting of Wat Arun.' }
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (customQuery?: string) => {
    const query = customQuery || input;
    if (!query.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: `m-${Date.now()}`,
          role: 'model',
          content: data.reply
        }]);
      } else {
        throw new Error("HTTP error");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: `m-err-${Date.now()}`,
        role: 'model',
        content: `Sawatdee khab, I had trouble reaching my knowledge cloud. Let me share that you should try to visit Chiang Mai's historic **Wat Chiang Man**—featuring beautiful Elephant Chedi. What else would you like to know?`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-xl overflow-hidden flex flex-col h-[550px] relative">
      {/* Advisor Header */}
      <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low/35 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary animate-pulse">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-primary block">
              Siam AI Advisor
            </span>
            <h3 className="font-display font-semibold text-base text-on-surface">
              Consult Phra Sila (พระศิลา)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-700 rounded-full font-semibold">
          <Globe size={11} className="animate-spin" style={{ animationDuration: '6s' }} />
          <span>Active Wisdom Line</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fdfaf7] ghost-pattern"
      >
        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-primary text-white rounded-tr-xs shadow-xs'
                  : 'bg-white text-on-surface border border-outline-variant/30 rounded-tl-xs shadow-xs prose'
              }`}
            >
              {/* Rendering simple paragraphs with formatting support */}
              {m.content.split('\n\n').map((para, i) => {
                // simple custom support for bullet lines and bold markdown
                const isBullet = para.startsWith('•') || para.startsWith('- ');
                return (
                  <p key={i} className={`${i > 0 ? 'mt-2' : ''} ${isBullet ? 'pl-2' : ''}`}>
                    {para.split('**').map((tok, j) => {
                      if (j % 2 === 1) {
                        return <strong key={j} className="font-semibold text-secondary-container">{tok}</strong>;
                      }
                      return tok;
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-outline-variant/30 rounded-2xl p-4 text-xs text-on-surface-variant flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="font-mono text-[10px] text-on-surface-variant italic pl-1">Phra Sila is formulating wisdom...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Pills */}
      <div className="p-3 border-t border-outline-variant/20 bg-surface-container-low/20 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none">
        {promptPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(pill.query)}
            className="inline-flex items-center gap-1 text-[10px] font-medium bg-white border border-outline-variant/25 hover:border-primary-container px-3 py-1.5 rounded-full hover:bg-primary/5 transition-all text-on-surface-variant hover:text-primary cursor-pointer shrink-0"
          >
            <BookOpen size={10} />
            {pill.label}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="p-4 border-t border-outline-variant/30 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything about sacred rules, design elements, temple classes..."
            className="flex-1 px-4 py-3 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary bg-surface-container-lowest text-on-surface"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            className="p-3 bg-primary text-white rounded-xl hover:bg-primary/95 transition-all shadow-sm flex items-center justify-center cursor-pointer disabled:opacity-40 shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-[10px] text-on-surface-variant/80 mt-1.5 text-center flex items-center justify-center gap-1">
          <AlertCircle size={10} className="text-secondary" />
          <span>Please wear protective shoulder/knee layers upon real visitation. Keep offerings tidy.</span>
        </p>
      </div>
    </div>
  );
};
