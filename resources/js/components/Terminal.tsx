import { Terminal as TerminalIcon, X, Minimize2, Maximize2, ShieldAlert } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { ABOUT_DATA, EXPERIENCE_DATA, PROJECTS_DATA } from '@/data';
import type { LogMessage } from '@/types/portfolio';

interface TerminalProps {
  onClose: () => void;
  onContactTrigger: () => void;
}

export default function Terminal({ onClose, onContactTrigger }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogMessage[]>([
    {
      text: 'SYSTEM BOOT: Successful. Welcome to Alex\'s Systems Core.',
      type: 'info',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      text: 'Type "help" to view a list of available terminal instructions.',
      type: 'success',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (!trimmed) {
return;
}

    const newLogs: LogMessage[] = [
      ...history,
      {
        text: `> ${cmd}`,
        type: 'input',
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    switch (trimmed) {
      case 'help':
        newLogs.push({
          text: `Available Core Instructions:
  - help      : Show this diagnostic map
  - about     : Fetch Alex's systems biography & core info
  - exp       : Dump professional engineering trajectory
  - stack     : Enumerate technical frameworks and compiler targets
  - projects  : List high-performance custom services
  - sysconfig : Output raw content of sys_config.yml
  - contact   : Open secure transmission port for contacting Alex
  - hack      : Toggle high-density systems visualizer
  - clear     : Flush active terminal output stream`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'about':
        newLogs.push({
          text: `ALEX_DEV STATUS: ACTIVE
----------------------------------------
${ABOUT_DATA.paragraphs.join('\n\n')}

Core Competencies:
${ABOUT_DATA.competencies.map(c => ` * ${c}`).join('\n')}`,
          type: 'success',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'exp': {
        const expText = EXPERIENCE_DATA.map(item => (
          `[ ${item.role} ]
  Company : ${item.company}
  Period  : ${item.period}
  Bullets :
${item.bullets.map(b => `    * ${b}`).join('\n')}
  Stack   : [ ${item.technologies.join(' ][ ')} ]`
        )).join('\n\n----------------------------------------\n\n');

        newLogs.push({
          text: `ENGINEERING HISTORIC TRAJECTORY:
----------------------------------------
${expText}`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;
      }

      case 'stack':
        newLogs.push({
          text: `COMPILER TARGETS & CORE TECHNOLOGY STACK:
----------------------------------------
Core Stack:
  - React (v18 Concurrent Mode)
  - TypeScript (Strict Mode)
  - Next.js (SSR / Server Actions)
  - Tailwind CSS (JIT Engine)

Backend Ecosystem:
  - Node.js (Runtime)
  - Python (Scipy / Django)
  - PostgreSQL (Relational Indexing)
  - Redis (Memory Caching Layer)

Infrastructure & Tools:
  - Docker, AWS, Vercel, Kubernetes, Git, Vite`,
          type: 'success',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'projects': {
        const projText = PROJECTS_DATA.map(p => (
          `[ ${p.title} ]
  Status : ${p.status.toUpperCase()}
  About  : ${p.description}
  Stack  : ${p.tags.join(' | ')}
  Detail : ${p.details || 'N/A'}`
        )).join('\n\n----------------------------------------\n\n');

        newLogs.push({
          text: `DUMPING ACTIVE REPOSITORIES:
----------------------------------------
${projText}`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;
      }

      case 'sysconfig':
        newLogs.push({
          text: `--- sys_config.yml ---
location: "${ABOUT_DATA.sysConfig.location}"
timezone: "${ABOUT_DATA.sysConfig.timezone}"
status: "${ABOUT_DATA.sysConfig.status}"
languages:
  - "[ ${ABOUT_DATA.sysConfig.languages.join(' ]"\n  - "[ ')} ]"
frameworks:
  - "[ ${ABOUT_DATA.sysConfig.frameworks.join(' ]"\n  - "[ ')} ]"`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'contact':
        newLogs.push({
          text: 'INITIALIZING SECURE PORT TRANSMISSION OVERLAY...',
          type: 'success',
          timestamp: new Date().toLocaleTimeString()
        });
        setTimeout(() => {
          onContactTrigger();
        }, 800);
        break;

      case 'hack':
        setIsMatrixMode(!isMatrixMode);
        newLogs.push({
          text: isMatrixMode ? 'DE-ACTIVATING DENSITY VISUALIZER.' : 'DENSITY VISUALIZER ENGAGED. SECURE CORRIDORS ESTABLISHED.',
          type: isMatrixMode ? 'info' : 'error',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');

        return;

      default:
        newLogs.push({
          text: `Command not recognized: "${trimmed}". Type "help" to see available commands.`,
          type: 'error',
          timestamp: new Date().toLocaleTimeString()
        });
    }

    setHistory(newLogs);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className={`fixed z-50 bg-[#09090B] border-2 border-white/30 flex flex-col font-mono text-sm leading-relaxed transition-all duration-300 ${
        isFullscreen 
          ? 'inset-0 m-0' 
          : 'bottom-4 right-4 left-4 md:left-auto md:w-[680px] h-[450px]'
      }`}
      id="terminal-console"
    >
      {/* Header bar */}
      <div className="bg-[#18181B] border-b border-white/20 px-4 py-2.5 flex justify-between items-center select-none shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-white animate-pulse" />
          <span className="text-white font-bold text-xs tracking-wider uppercase">core_systems_terminal.sh</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)} 
            className="text-gray-400 hover:text-white transition-colors"
            title={isFullscreen ? 'Minimize' : 'Maximize'}
            id="terminal-maximize-btn"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
            title="Close Terminal"
            id="terminal-close-btn"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Terminal log logs */}
      <div 
        className={`flex-grow p-4 overflow-y-auto font-mono select-text selection:bg-white selection:text-black ${
          isMatrixMode ? 'bg-[#051105] text-[#33ff33]' : 'bg-[#09090B] text-gray-300'
        }`}
        id="terminal-output-container"
      >
        <div className="space-y-3">
          {history.map((log, idx) => (
            <div 
              key={idx} 
              className={`whitespace-pre-wrap ${
                log.type === 'error' 
                  ? 'text-red-400' 
                  : log.type === 'success' 
                  ? 'text-green-400 font-semibold' 
                  : log.type === 'input' 
                  ? 'text-white font-bold' 
                  : 'text-gray-300'
              }`}
            >
              {log.text}
            </div>
          ))}
          {isMatrixMode && (
            <div className="text-[#33ff33] opacity-65 text-xs animate-pulse font-mono py-2 bg-black/40 border border-green-900/40 px-3">
              <div className="flex items-center gap-2 font-bold mb-1">
                <ShieldAlert className="h-4 w-4 animate-bounce text-red-500" />
                <span>DYNAMIC FEED VISUALIZER [ONLINE]</span>
              </div>
              <p>&gt; MEMORY POOL ADDR: 0x7FFF56D89</p>
              <p>&gt; TCP SOCKET: LISTEN 3000 -&gt; 0.0.0.0</p>
              <p>&gt; SYSTEM METRICS: CPU 12% | RAM 4.2GB/16.0GB</p>
              <p>&gt; MONITORS: STACK TRACE COMPLETE [EXIT 0]</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-[#121214] border-t border-white/10 px-4 py-3 flex items-center gap-2 shrink-0">
        <span className="text-white font-bold selection:bg-transparent select-none">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type instruction (e.g. 'help', 'about', 'projects')..."
          className="flex-grow bg-transparent text-white outline-none font-mono text-sm border-none p-0 focus:ring-0 focus:outline-none placeholder-gray-600"
          id="terminal-input-field"
        />
        <span className="text-xs text-gray-600 font-mono tracking-widest hidden sm:inline select-none">[ENTER TO RUN]</span>
      </div>
    </div>
  );
}
