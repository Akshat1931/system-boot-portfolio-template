import React, { useState, useEffect, useRef } from 'react';
import { Activity, Cpu, HardDrive, Wifi, Folder, File, Terminal, Code, Briefcase, Mail, Github, Linkedin, Globe, ChevronRight, X } from 'lucide-react';
import { BootScreen } from './components/BootScreen';
import { FileContent } from './components/FileContent';

// Helpers to hydrate OS memory from localStorage once on first render
const getInitialLastModule = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem('qp_os_state');
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data?.lastModule ?? null;
  } catch {
    return null;
  }
};

const getInitialCommandHistory = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem('qp_os_state');
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data?.commandHistory) ? data.commandHistory : [];
  } catch {
    return [];
  }
};

export default function CyberpunkPortfolio() {
  const [time, setTime] = useState(new Date());
  const [cpuData, setCpuData] = useState([45, 52, 48, 55, 50, 58, 52, 49, 53, 51]);
  const [progress, setProgress] = useState(0);
  const [activeFile, setActiveFile] = useState(null);

  // Boot / system state
  const [isBooting, setIsBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [bootLogs, setBootLogs] = useState([]);

  // Visual mode
  const [isOverdrive, setIsOverdrive] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  // OS memory
  const [lastModule, setLastModule] = useState(getInitialLastModule);

  // Audio / SFX
  const [sfxEnabled] = useState(true);
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      // resume on a user gesture (click / key)
      audioCtxRef.current.resume();
    }
  };

  const playBeep = ({ frequency = 440, duration = 0.08, type = 'sine', volume = 0.04 } = {}) => {
    if (!sfxEnabled) return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.stop(now + duration + 0.02);
  };

  // In‑HUD terminal state
  const [terminalLines, setTerminalLines] = useState([
    { type: 'system', text: 'Quantum kernel standing by...' },
    { type: 'info', text: 'Type "help" for available commands or click a Module on the right.' }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState(getInitialCommandHistory);
  const historyIndexRef = useRef(-1);
  const [skillsGraphMode, setSkillsGraphMode] = useState(false);

  const folders = [
    { name: 'About Module', icon: <File size={18} />, type: 'about', hotkey: 'F1', description: 'Identity, mission & profile snapshot' },
    { name: 'Projects Module', icon: <Folder size={18} />, type: 'projects', hotkey: 'F2', description: 'Highlighted builds & experiments' },
    { name: 'Skills Module', icon: <Code size={18} />, type: 'skills', hotkey: 'F3', description: 'Tech stack & capabilities' },
    { name: 'Experience Module', icon: <Briefcase size={18} />, type: 'experience', hotkey: 'F4', description: 'Timeline of work & impact' },
    { name: 'Contact Module', icon: <Mail size={18} />, type: 'contact', hotkey: 'F5', description: 'Signal channels & links' }
  ];

  const projects = [
    { 
      name: 'Neural Network Visualizer', 
      tech: 'React, Three.js, TensorFlow',
      desc: 'Real-time 3D visualization of neural network training',
      status: 'Production'
    },
    { 
      name: 'Blockchain Explorer', 
      tech: 'Next.js, Web3, Ethers.js',
      desc: 'Decentralized application for blockchain analytics',
      status: 'Active'
    },
    { 
      name: 'AI Code Assistant', 
      tech: 'Python, FastAPI, GPT-4',
      desc: 'Intelligent code completion and review system',
      status: 'Beta'
    },
    { 
      name: 'Quantum Simulator', 
      tech: 'Rust, WebAssembly, React',
      desc: 'Web-based quantum computing simulator',
      status: 'Development'
    }
  ];

  const skills = {
    'Languages': ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go'],
    'Frontend': ['React', 'Next.js', 'Vue', 'Three.js', 'Tailwind'],
    'Backend': ['Node.js', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
    'AI/ML': ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face']
  };

  // Live system clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake CPU / network activity
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 40]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Endless progress sweep for "SYSTEM OPTIMIZATION"
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Cinematic boot sequence
  useEffect(() => {
    const script = [
      '[BOOT] Initializing quantum portfolio kernel...',
      '[OK] Video driver: NEON-MATRIX v4.2',
      '[OK] Input devices: KEYBOARD / MOUSE / GAMEPAD',
      '[OK] Network interface: DEV-NODE-01',
      '[MOUNT] Loading personal modules: about, projects, skills, experience, contact',
      '[SCAN] Calibrating UI sensors & typography engine',
      '[OK] AI co‑processor online',
      '[DONE] Secure channel established',
      'SYSTEM ONLINE — PRESS ANY KEY OR CLICK  TO ENTER HUD'
    ];

    // Drive step by step log printing
    if (isBooting) {
      const interval = setInterval(() => {
        setBootStep(prev => {
          const next = prev + 1;
          setBootLogs(current => {
            if (next <= script.length) {
              // subtle boot beep for each line
              playBeep({
                frequency: 420 + prev * 8,
                duration: 0.05,
                type: 'square',
                volume: 0.025,
              });
              return [...current, script[prev]];
            }
            return current;
          });

          if (next >= script.length) {
            clearInterval(interval);
          }

          return next;
        });
      }, 320);

      // Auto‑continue into HUD a moment after the last line, with a startup chord
      const timeout = setTimeout(() => {
        setIsBooting(false);
        playBeep({ frequency: 640, duration: 0.12, type: 'triangle', volume: 0.05 });
        setTimeout(() => {
          playBeep({ frequency: 960, duration: 0.16, type: 'square', volume: 0.06 });
        }, 110);
      }, script.length * 350 + 1500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isBooting]);

  // Announce recovered session (based on already hydrated initial state)
  useEffect(() => {
    if (!lastModule && !commandHistory.length) return;
    setTerminalLines(prev => [
      ...prev,
      { type: 'system', text: 'Recovered previous session state.' },
      lastModule
        ? { type: 'info', text: `Last session focus: ${String(lastModule).toUpperCase()}` }
        : null,
    ].filter(Boolean));
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist session to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const payload = {
      lastModule,
      commandHistory,
    };
    try {
      window.localStorage.setItem('qp_os_state', JSON.stringify(payload));
    } catch {
      // ignore quota errors
    }
  }, [lastModule, commandHistory]);

  const formatTime = (date) => {
    return date.toTimeString().split(' ')[0];
  };

  const handleFileClick = (folder) => {
    const heavy = folder.type === 'projects' || folder.type === 'experience';
    const openNow = () => {
      setActiveFile(folder);
      setLastModule(folder.type);
    };

    if (heavy) {
      const steps = [
        'Allocating memory...',
        'Compiling interface...',
        'Optimizing graph...',
      ];
      let delay = 0;
      steps.forEach((text, index) => {
        setTimeout(() => {
          setTerminalLines(prev => [...prev, { type: 'system', text }]);
          playBeep({ frequency: 380 + index * 60, duration: 0.06, type: 'square', volume: 0.035 });
        }, delay);
        delay += 180;
      });

      setTimeout(() => {
        setTerminalLines(prev => [...prev,
          { type: 'command', text: `> open ${folder.name.toLowerCase()}` },
          { type: 'success', text: `Opening ${folder.name}...` },
        ]);
        if (folder.type === 'experience') {
          setTerminalLines(prev => [...prev,
            { type: 'info', text: 'Resolving dependencies… skills ▸ projects ▸ experience' },
          ]);
        }
        openNow();
        playBeep({ frequency: 720, duration: 0.12, type: 'triangle', volume: 0.05 });
      }, delay + 220);
    } else {
      setActiveFile(folder);
      setLastModule(folder.type);
      setTerminalLines(prev => [...prev, 
        { type: 'command', text: `> open ${folder.name.toLowerCase()}` },
        { type: 'success', text: `Opening ${folder.name}...` }
      ]);
      playBeep({ frequency: 680, duration: 0.08, type: 'triangle', volume: 0.045 });
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (!commandHistory.length) return;
      e.preventDefault();
      const prevIndex = historyIndexRef.current;
      if (e.key === 'ArrowUp') {
        const next = prevIndex < commandHistory.length - 1 ? prevIndex + 1 : commandHistory.length - 1;
        historyIndexRef.current = next;
        setCurrentCommand(commandHistory[commandHistory.length - 1 - next]);
      } else {
        const next = prevIndex > 0 ? prevIndex - 1 : -1;
        historyIndexRef.current = next;
        setCurrentCommand(next === -1 ? '' : commandHistory[commandHistory.length - 1 - next]);
      }
      return;
    }

    if (e.key === 'Enter' && currentCommand.trim()) {
      const cmd = currentCommand.toLowerCase().trim();
      const focus = activeFile?.type || 'root';
      let response = { type: 'error', text: 'Command not found' };
      
      // Context-aware commands
      if (focus === 'projects') {
        if (cmd === 'ls') {
          response = {
            type: 'info',
            text: projects.map((p, idx) => `${idx + 1}. ${p.name} [${p.status}]`).join('  |  ')
          };
        } else if (cmd.startsWith('open ')) {
          const match = cmd.match(/^open\s+(\d+)/);
          const index = match ? parseInt(match[1], 10) - 1 : -1;
          if (index >= 0 && index < projects.length) {
            response = { type: 'success', text: `Focusing project: ${projects[index].name}` };
          } else {
            response = { type: 'error', text: 'Unknown project index' };
          }
        }
      } else if (focus === 'skills') {
        if (cmd === 'analyze') {
          response = {
            type: 'info',
            text: 'Profile analysis: strongest areas → Frontend UI, Backend APIs, AI integrations.'
          };
        } else if (cmd === 'graph') {
          setSkillsGraphMode(true);
          setTimeout(() => setSkillsGraphMode(false), 1200);
          response = {
            type: 'success',
            text: 'Activating skills graph overlay…'
          };
        }
      }

      if (response.type !== 'error' && !cmd.startsWith('help')) {
        // handled by context, fall through to logging
      } else if (cmd === 'help') {
        // Jump back to home view so the console is visible when asking for help
        if (activeFile) {
          setActiveFile(null);
        }
        response = { 
          type: 'info', 
          text: 'Available: help, home, clear, about, projects, skills, experience, contact, whoami, modules, scan, credits, session, recruiter --summary, recruiter --off' 
        };
      } else if (cmd === 'clear') {
        setTerminalLines([]);
        setCurrentCommand('');
        return;
      } else if (cmd === 'whoami') {
        response = { type: 'success', text: 'Full Stack Developer | AI Enthusiast | Problem Solver' };
      } else if (cmd === 'modules') {
        response = { 
          type: 'info', 
          text: 'Modules: about/, projects/, skills/, experience/, contact/' 
        };
      } else if (cmd === 'scan') {
        response = {
          type: 'info',
          text: 'Running full system scan... all modules responsive, latency stable, visual core at 120 FPS.'
        };
      } else if (cmd === 'credits') {
        response = {
          type: 'info',
          text: 'Interface crafted by you. Powered by React, Tailwind, and a custom QUANTUM_PORTFOLIO_OS shell.'
        };
      } else if (cmd === 'session') {
        const recent = commandHistory.slice(-6).reverse();
        response = {
          type: 'info',
          text: recent.length
            ? `Session: ${recent.join(' ▪ ')}`
            : 'Session is empty. Start exploring modules and typing commands.'
        };
      } else if (cmd === 'recruiter --summary') {
        setRecruiterMode(true);
        response = {
          type: 'success',
          text: 'Optimized view for fast evaluation. Highlighting key projects and core stack.'
        };
      } else if (cmd === 'recruiter --off') {
        setRecruiterMode(false);
        response = {
          type: 'success',
          text: 'Recruiter mode disabled. Restoring full interface.'
        };
      } else if (cmd === 'home' || cmd === 'root') {
        setActiveFile(null);
        response = { type: 'success', text: 'Returning to system home view...' };
      } else if (cmd === 'about' || cmd === 'projects' || cmd === 'skills' || cmd === 'experience' || cmd === 'contact') {
        const folder = folders.find(f => f.type === cmd);
        if (folder) {
          setActiveFile(folder);
          response = { type: 'success', text: `Opening ${cmd}...` };
        }
      }

      setCommandHistory(prev => [...prev, cmd]);
      historyIndexRef.current = -1;

      setTerminalLines(prev => [...prev, 
        { type: 'command', text: `> ${currentCommand}` },
        response
      ]);

      // Audio feedback by response type
      if (response.type === 'success') {
        playBeep({ frequency: 720, duration: 0.09, type: 'triangle', volume: 0.04 });
      } else if (response.type === 'error') {
        playBeep({ frequency: 220, duration: 0.12, type: 'sawtooth', volume: 0.045 });
      } else {
        playBeep({ frequency: 520, duration: 0.07, type: 'sine', volume: 0.035 });
      }
      setCurrentCommand('');
    }
  };

  const renderFileContent = () => {
    if (!activeFile) return null;

    switch(activeFile.type) {
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">ABOUT.md</h2>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-6 text-sm">
              <div className="space-y-3">
              <p className="leading-relaxed">
                Full Stack Developer with a passion for creating innovative solutions at the intersection 
                of technology and design. Specialized in building scalable web applications, AI integrations, 
                and immersive user experiences.
              </p>
              <p className="leading-relaxed">
                With 5+ years of experience in software development, I've worked on projects ranging from 
                enterprise applications to cutting-edge AI systems. I believe in writing clean, maintainable 
                code and staying at the forefront of technology.
              </p>
              <div className="pt-4 border-t border-cyan-800">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div><span className="text-cyan-600">Location:</span> San Francisco, CA</div>
                  <div><span className="text-cyan-600">Experience:</span> 5+ Years</div>
                  <div><span className="text-cyan-600">Education:</span> BS Computer Science</div>
                  <div><span className="text-cyan-600">Status:</span> Available for Work</div>
                </div>
              </div>
              </div>
              <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-500">PROFILE STATS</span>
                  <span className="text-cyan-700">v2.4.1</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Frontend / UI</span>
                    <span className="text-cyan-300">92%</span>
                  </div>
                  <div className="h-1 bg-cyan-950">
                    <div className="h-full w-[92%] bg-gradient-to-r from-cyan-400 to-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backend / Systems</span>
                    <span className="text-cyan-300">88%</span>
                  </div>
                  <div className="h-1 bg-cyan-950">
                    <div className="h-full w-[88%] bg-gradient-to-r from-cyan-400 to-purple-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI / ML</span>
                    <span className="text-cyan-300">80%</span>
                  </div>
                  <div className="h-1 bg-cyan-950">
                    <div className="h-full w-[80%] bg-gradient-to-r from-cyan-400 to-emerald-400" />
                  </div>
                </div>
                <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
                  Last updated: live · based on recent projects and learning.
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">PROJECTS/</h2>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
              <div className="space-y-3">
              {projects.map((project, i) => (
                <div key={i} className="border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-cyan-300 font-semibold">{project.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === 'Production' ? 'bg-green-900 text-green-300' :
                      project.status === 'Active' ? 'bg-blue-900 text-blue-300' :
                      project.status === 'Beta' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-purple-900 text-purple-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-cyan-600 mb-2">{project.tech}</p>
                  <p className="text-sm text-cyan-400 opacity-80">{project.desc}</p>
                </div>
              ))}
              </div>
              <div className={`border border-cyan-800 bg-black/40 p-4 text-xs space-y-3 ${skillsGraphMode ? 'ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-500">MODULE METRICS</span>
                  <span className="text-cyan-700">real‑time</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Production</span>
                    <span className="text-green-300">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active</span>
                    <span className="text-blue-300">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beta</span>
                    <span className="text-yellow-300">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In dev</span>
                    <span className="text-purple-300">1</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
                  Hover any project card to highlight its status in the system.
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">SKILLS.json</h2>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
              <div className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="border border-cyan-800 p-4">
                  <h3 className="text-cyan-300 font-semibold mb-3 text-sm">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span key={i} className="bg-cyan-950 bg-opacity-50 border border-cyan-700 px-3 py-1 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              </div>
              <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-500">STACK OVERVIEW</span>
                  <span className="text-cyan-700">profile: T‑shaped</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span>Frontend depth</span>
                      <span className="text-cyan-300">high</span>
                    </div>
                    <div className="h-1 bg-cyan-950">
                      <div className="h-full w-[90%] bg-gradient-to-r from-cyan-400 to-blue-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Backend depth</span>
                      <span className="text-cyan-300">high</span>
                    </div>
                    <div className="h-1 bg-cyan-950">
                      <div className="h-full w-[85%] bg-gradient-to-r from-cyan-400 to-purple-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>DevOps / Cloud</span>
                      <span className="text-cyan-300">medium</span>
                    </div>
                    <div className="h-1 bg-cyan-950">
                      <div className="h-full w-[70%] bg-gradient-to-r from-cyan-400 to-emerald-400" />
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
                  Calibrated from tools I use most often in real projects.
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">EXPERIENCE.log</h2>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
              <div className="space-y-4">
              <div className="border-l-2 border-cyan-600 pl-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-cyan-300 font-semibold">Senior Full Stack Developer</h3>
                  <span className="text-xs text-cyan-600">2022 - Present</span>
                </div>
                <p className="text-sm text-cyan-500 mb-2">TechCorp Inc.</p>
                <ul className="text-xs space-y-1 text-cyan-400 opacity-80 list-disc list-inside">
                  <li>Led development of AI-powered analytics platform</li>
                  <li>Architected microservices infrastructure serving 1M+ users</li>
                  <li>Mentored team of 5 junior developers</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-cyan-600 pl-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-cyan-300 font-semibold">Full Stack Developer</h3>
                  <span className="text-xs text-cyan-600">2020 - 2022</span>
                </div>
                <p className="text-sm text-cyan-500 mb-2">StartupXYZ</p>
                <ul className="text-xs space-y-1 text-cyan-400 opacity-80 list-disc list-inside">
                  <li>Built real-time collaboration features</li>
                  <li>Optimized application performance by 60%</li>
                  <li>Implemented CI/CD pipeline</li>
                </ul>
              </div>

              <div className="border-l-2 border-cyan-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-cyan-300 font-semibold">Junior Developer</h3>
                  <span className="text-xs text-cyan-600">2019 - 2020</span>
                </div>
                <p className="text-sm text-cyan-500 mb-2">Digital Agency</p>
                <ul className="text-xs space-y-1 text-cyan-400 opacity-80 list-disc list-inside">
                  <li>Developed responsive web applications</li>
                  <li>Collaborated with design team on UI/UX</li>
                  <li>Maintained legacy codebases</li>
                </ul>
              </div>
              </div>
              <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-500">CAREER SUMMARY</span>
                  <span className="text-cyan-700">timeline</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Years shipping</span>
                    <span className="text-cyan-300">5+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Teams led</span>
                    <span className="text-cyan-300">1–2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Systems touched</span>
                    <span className="text-cyan-300">enterprise · startups</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-cyan-900 text-[10px] text-cyan-500">
                  Designed to show impact at a glance while the detailed log scrolls on the left.
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">CONTACT.ini</h2>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
              <div className="space-y-3">
              <a href="mailto:your.email@example.com" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Mail size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-xs text-cyan-600">your.email@example.com</div>
                </div>
              </a>
              
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Github size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">GitHub</div>
                  <div className="text-xs text-cyan-600">github.com/yourusername</div>
                </div>
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Linkedin size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">LinkedIn</div>
                  <div className="text-xs text-cyan-600">linkedin.com/in/yourprofile</div>
                </div>
              </a>
              
              <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-cyan-800 p-4 hover:bg-cyan-950 hover:bg-opacity-30 transition">
                <Globe size={20} className="text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold">Website</div>
                  <div className="text-xs text-cyan-600">yourwebsite.com</div>
                </div>
              </a>
              </div>
              <div className="border border-cyan-800 bg-black/40 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-500">PREFERRED SIGNAL</span>
                  <span className="text-cyan-700">low latency</span>
                </div>
                <p className="text-cyan-400">
                  Email is usually best for deep conversations, while GitHub and LinkedIn are great for quick context.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Avg. response</span>
                    <span className="text-cyan-300">&lt; 24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time zones</span>
                    <span className="text-cyan-300">flexible / remote‑friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Simple keyboard shortcut: ESC closes module, F1‑F5 open modules
  useEffect(() => {
    const handler = (e) => {
      initAudio();
      if (e.key === 'Escape') {
        setActiveFile(null);
      }
      // Function key module shortcuts
      const map = {
        F1: 'about',
        F2: 'projects',
        F3: 'skills',
        F4: 'experience',
        F5: 'contact',
      };
      if (map[e.key]) {
        const folder = folders.find(f => f.type === map[e.key]);
        if (folder) {
          setActiveFile(folder);
        }
      }
      if (isBooting && (e.key.length === 1 || e.key === 'Enter' || e.key === ' ')) {
        // Allow user to fast‑forward boot screen
        setIsBooting(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isBooting]);

  // Fix mobile viewport units (set --vh) to handle address bar changes on mobile
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  // Dedicated boot screen view
  if (isBooting) {
    return (
      <BootScreen
        time={time}
        bootLogs={bootLogs}
        bootStep={bootStep}
        formatTime={formatTime}
        onInitAudio={initAudio}
      />
    );
  }

  return (
    <div
      className="relative min-h-screen bg-black text-cyan-400 font-mono overflow-hidden"
      onClick={initAudio}
    >
      {/* Global HUD background */}
      <div className="hud-bg" />
      <div className="hud-scan" />
      {isOverdrive && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.18),_transparent_60%)] mix-blend-screen opacity-80" />
      )}

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 min-h-screen">
        {/* Left Panel */}
        <div className="md:col-span-3 col-span-1 space-y-4 overflow-y-auto animate-float-soft">
          {/* Clock & Status */}
          <div className="border border-cyan-800 p-4 bg-black bg-opacity-50">
            <div className="text-5xl font-bold tracking-wider mb-4">
              {formatTime(time)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-cyan-600">
              <div>STATUS: ONLINE</div>
              <div>MODE: {recruiterMode ? 'RECRUITER' : 'PORTFOLIO'}</div>
              <div>BUILD: v2.4.1</div>
              <div>UPTIME: 99.9%</div>
            </div>
          </div>

          {/* System Monitor */}
          <div className="border border-cyan-800 p-4 bg-black bg-opacity-50">
            <div className="text-sm mb-3 flex items-center gap-2">
              <Activity size={16} />
              SYSTEM MONITOR
            </div>
            <div className="space-y-2">
              {cpuData.slice(-4).map((val, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="text-xs w-12">Core {i+1}</div>
                  <div className="flex-1 h-1 bg-cyan-950 relative overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                  <div className="text-xs w-8 text-right">{val}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border border-cyan-800 p-4 bg-black bg-opacity-50">
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div>
                <div className="text-cyan-600">PROJECTS</div>
                <div className="text-2xl font-bold text-cyan-400">24+</div>
              </div>
              <div>
                <div className="text-cyan-600">COMMITS</div>
                <div className="text-2xl font-bold text-cyan-400">5.2K</div>
              </div>
              <div>
                <div className="text-cyan-600">EXPERIENCE</div>
                <div className="text-2xl font-bold text-cyan-400">5Y+</div>
              </div>
              <div>
                <div className="text-cyan-600">SKILLS</div>
                <div className="text-2xl font-bold text-cyan-400">30+</div>
              </div>
            </div>
          </div>

          {/* Network Activity (hidden in recruiter mode to reduce noise) */}
          {!recruiterMode && (
            <div className="border border-cyan-800 p-4 bg-black bg-opacity-50">
              <div className="text-xs mb-3 flex items-center gap-2">
                <Wifi size={14} />
                NETWORK ACTIVITY
              </div>
              <div className="h-24 relative">
                <svg className="w-full h-full" viewBox="0 0 200 100">
                  <polyline
                    points={cpuData.map((val, i) => `${i * 20},${100 - val}`).join(' ')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-cyan-400"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Center Terminal */}
        <div className="md:col-span-6 col-span-1 flex flex-col gap-4 relative">
          {/* HUD overlay grid */}
          <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_60%)]" />
          </div>
          {/* Terminal Output */}
          <div className="border border-cyan-800 bg-black bg-opacity-70 backdrop-blur-sm p-4 flex-1 overflow-y-auto relative z-10">
            {activeFile ? (
              <div className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-cyan-800">
                  <div className="flex items-center gap-2">
                    {activeFile.icon}
                    <span className="text-sm font-semibold">{activeFile.name}</span>
                  </div>
                  <button onClick={() => setActiveFile(null)} className="hover:text-red-400 transition">
                    <X size={16} />
                  </button>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(var(--vh, 1vh) * 100 - 300px)' }}>
                  {renderFileContent()}
                </div>
              </div>
            ) : (
              <div className="h-full grid grid-rows-[auto,1fr] gap-4">
                {/* System intro + quick commands */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-cyan-500">QUANTUM_PORTFOLIO_OS v2.4.1</div>
                    <div className="text-xs text-cyan-600 mt-1 max-w-xl">
                      Experimental interface for exploring my work. Use <span className="text-cyan-300">F1–F5</span>, type commands, or click a Module.
                    </div>
                  </div>
                  <div className="hidden md:flex gap-2 text-[10px] text-cyan-500">
                    <span className="border border-cyan-700 px-2 py-[2px] rounded bg-black/40">home · Return</span>
                    <span className="border border-cyan-700 px-2 py-[2px] rounded bg-black/40">ESC · Clear Focus</span>
                    <span className="border border-cyan-700 px-2 py-[2px] rounded bg-black/40">F1–F5 · Modules</span>
                  </div>
                </div>

                {/* Topology map + terminal side by side */}
            <div className="grid lg:grid-cols-2 gap-4 h-full">
                  {/* Topology / constellation map */}
                  <div className="border border-cyan-900 bg-black/50 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.25),_transparent_60%)]" />
                    <div className="relative h-full p-4 flex flex-col">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-cyan-500">SYSTEM TOPOLOGY</span>
                        <span className="text-cyan-700">nodes: 5 · links: 7</span>
                      </div>
                      <svg className="flex-1 w-full" viewBox="0 0 260 140">
                        {/* links */}
                        <g stroke="rgba(34,211,238,0.5)" strokeWidth="0.6">
                          <line x1="40" y1="90" x2="110" y2="40" />
                          <line x1="110" y1="40" x2="190" y2="60" />
                          <line x1="110" y1="40" x2="150" y2="110" />
                          <line x1="40" y1="90" x2="90" y2="120" />
                          <line x1="90" y1="120" x2="190" y2="60" />
                          <line x1="190" y1="60" x2="220" y2="105" />
                          <line x1="150" y1="110" x2="220" y2="105" />
                      {/* dependency highlight when Experience is focused */}
                      {activeFile?.type === 'experience' && (
                        <>
                          <line x1="150" y1="110" x2="90" y2="120" stroke="rgba(244,114,182,0.9)" strokeWidth="1.4" />
                          <line x1="150" y1="110" x2="190" y2="60" stroke="rgba(56,189,248,0.9)" strokeWidth="1.4" />
                        </>
                      )}
                        </g>
                        {/* nodes */}
                        <g>
                          {[{x:110,y:40,label:'core'},
                            {x:40,y:90,label:'about'},
                            {x:90,y:120,label:'projects'},
                            {x:190,y:60,label:'skills'},
                            {x:150,y:110,label:'experience'},
                            {x:220,y:105,label:'contact'}].map((n, idx) => (
                            <g key={idx}>
                              <circle cx={n.x} cy={n.y} r={idx === 0 ? 4 : 3} fill="#22d3ee" className="animate-ping" />
                              <circle cx={n.x} cy={n.y} r={idx === 0 ? 2 : 1.5} fill="#0f172a" stroke="#22d3ee" strokeWidth="0.8" />
                              <text x={n.x + 6} y={n.y - 4} fontSize="8" fill="#67e8f9">
                                {n.label}
                              </text>
                            </g>
                          ))}
                        </g>
                      </svg>
                      <div className="mt-2 grid grid-cols-3 gap-3 text-[10px] text-cyan-500">
                        <div>
                          <div className="text-cyan-600">Signal</div>
                          <div className="text-cyan-200">Stable</div>
                        </div>
                        <div>
                          <div className="text-cyan-600">Routing</div>
                          <div className="text-cyan-200">Auto</div>
                        </div>
                        <div>
                          <div className="text-cyan-600">Theme</div>
                          <div className="text-cyan-200">Game‑HUD</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live terminal block */}
                  <div className="border border-cyan-900 bg-black/60 flex flex-col min-h-0">
                    <div className="px-4 pt-3 pb-1 text-xs text-cyan-500 flex items-center justify-between border-b border-cyan-900/70">
                      <span>ACTIVE CONSOLE</span>
                      <span className="text-cyan-700">user: root@portfolio</span>
                    </div>
                    <div className="flex-1 p-4 space-y-1 overflow-y-auto text-xs font-mono" style={{ maxHeight: 'calc(var(--vh, 1vh) * 100 - 260px)' }}>
                      {terminalLines.map((line, i) => (
                        <div key={i} className={`${
                          line.type === 'command' ? 'text-emerald-300' :
                          line.type === 'success' ? 'text-emerald-400' :
                          line.type === 'error' ? 'text-rose-400' :
                          'text-slate-400'
                        }`}>
                          {line.type === 'command' && <ChevronRight size={12} className="inline mr-1" />}
                          {line.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Command Input */}
          <div className="border border-cyan-800 bg-black bg-opacity-50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Terminal size={16} />
              <span className="text-green-400">root</span>
              <span className="text-cyan-600">@</span>
              <span className="text-blue-400">portfolio</span>
              <span className="text-cyan-600">~$</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-cyan-400"
                placeholder="Type 'help' for commands... (↑↓ history, session, scan, credits)"
                autoFocus
              />
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-3 col-span-1 space-y-4 overflow-y-auto animate-float-soft">
          {/* Modules HUD */}
          <div className="border border-cyan-800 p-4 bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm flex items-center gap-2">
                <Folder size={16} />
                <span>MODULES HUD</span>
              </div>
              <div className="text-[10px] text-cyan-600 uppercase tracking-wide">
                Press F1–F5
              </div>
            </div>
            <div className="space-y-2">
              {folders.map((folder, i) => {
                const isActive = activeFile?.type === folder.type;
                const isLast = !activeFile && lastModule === folder.type;
                const isRecruiterHighlight = recruiterMode && (folder.type === 'projects' || folder.type === 'skills');

                return (
                  <div
                    key={i}
                    onClick={() => handleFileClick(folder)}
                    className={`group flex items-start gap-3 p-3 border cursor-pointer transition ${
                      isActive
                        ? 'bg-cyan-900/40 border-cyan-500 shadow-[0_0_18px_rgba(34,211,238,0.4)]'
                        : isLast
                          ? 'border-cyan-400 bg-cyan-950/30'
                          : 'border-cyan-800 hover:bg-cyan-950/40 hover:border-cyan-500/60'
                    } ${isRecruiterHighlight ? 'ring-1 ring-cyan-300' : ''}`}
                  >
                    <div className="mt-1 text-cyan-400">{folder.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-cyan-100">{folder.name}</span>
                        <span className="text-[10px] text-cyan-500 border border-cyan-700 px-1 py-[1px] rounded">
                          {folder.hotkey}
                        </span>
                      </div>
                      <div className="text-[11px] text-cyan-600 mt-1">
                        {folder.description}
                        {isRecruiterHighlight && (
                          <span className="ml-2 text-[10px] text-cyan-400 uppercase tracking-wide">
                            PRIORITY
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orbital Status / mini‑map */}
          <div className={`border border-cyan-800 p-4 bg-black bg-opacity-60 ${recruiterMode ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span>ORBITAL PRESENCE</span>
              </div>
              <span className="text-cyan-600">LIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 animate-float-soft">
                <div className="absolute inset-0 rounded-full border border-cyan-800" />
                <div className="absolute inset-2 rounded-full border border-cyan-700/70" />
                <div className="absolute inset-4 rounded-full border border-cyan-500/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                </div>
                <div className="absolute inset-0 animate-slow-spin">
                  <div className="absolute -top-1 left-1 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <div className="absolute bottom-0 right-2 w-1 h-1 bg-cyan-500 rounded-full" />
                </div>
              </div>
              <div className="flex-1 space-y-1 text-[11px] text-cyan-600">
                <div className="flex justify-between">
                  <span>GitHub</span>
                  <span className="text-cyan-300">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>LinkedIn</span>
                  <span className="text-cyan-300">SYNCED</span>
                </div>
                <div className="flex justify-between">
                  <span>Portfolio build</span>
                  <span className="text-cyan-300">v2.4.1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity & Optimization */}
          <div className="border border-cyan-800 p-4 bg-black bg-opacity-60 space-y-3">
            <div>
              <div className="text-xs mb-1">RECENT ACTIVITY LOG</div>
              <div className="space-y-1 text-[11px] text-cyan-600">
                <div className="flex justify-between">
                  <span>commit: ui/hud-upgrade</span>
                  <span>2m ago</span>
                </div>
                <div className="flex justify-between">
                  <span>deploy: production</span>
                  <span>12m ago</span>
                </div>
                <div className="flex justify-between">
                  <span>tests: all green</span>
                  <span>28m ago</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs mb-1">SYSTEM OPTIMIZATION</div>
              <div className="h-2 bg-cyan-950 relative overflow-hidden rounded">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-1 text-[11px] text-cyan-600">
                <span>Performance sweep</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-cyan-800/80">
        <div className="px-6 py-2 border-b border-cyan-900/70 overflow-hidden text-[11px] text-cyan-500 bg-black/80">
          <div className="hud-marquee-track">
            <span className="mr-10">★ 24+ projects shipped</span>
            <span className="mr-10">★ 5Y+ experience in full‑stack & systems</span>
            <span className="mr-10">★ 5.2K+ commits across personal + client repos</span>
            <span className="mr-10">★ Always exploring: AI · 3D · high‑end UI</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOverdrive ? 'bg-pink-400 animate-ping' : 'bg-green-400 animate-pulse'}`}></div>
              <span>{isOverdrive ? 'OVERDRIVE MODE' : 'SYSTEM ONLINE'}</span>
            </div>
            <div>LATENCY: 12ms</div>
            <div>MEMORY: 4.2GB / 16GB</div>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => {
                const next = !isOverdrive;
                setIsOverdrive(next);
                if (next) {
                  playBeep({ frequency: 980, duration: 0.18, type: 'sawtooth', volume: 0.06 });
                } else {
                  playBeep({ frequency: 420, duration: 0.12, type: 'triangle', volume: 0.045 });
                }
              }}
              className={`px-3 py-1 border rounded transition ${
                isOverdrive
                  ? 'border-pink-400 text-pink-300 bg-pink-900/30 shadow-[0_0_18px_rgba(244,114,182,0.6)]'
                  : 'border-cyan-700 text-cyan-400 bg-black/40 hover:border-cyan-400'
              }`}
            >
              {isOverdrive ? 'DISENGAGE OVERDRIVE' : 'ENGAGE OVERDRIVE'}
            </button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">
              <Linkedin size={18} />
            </a>
            <a href="mailto:your.email@example.com" className="hover:text-cyan-300 transition">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}