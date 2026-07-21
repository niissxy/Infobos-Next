import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Cpu, Layers, DollarSign, Terminal, Radio, TrendingUp, 
  CheckCircle2, AlertTriangle, Users, ShieldCheck, Sliders, Lock, 
  Play, Pause, RefreshCw, Search, Trash2, Plus, ChevronDown, 
  ChevronUp, Database, Sparkles, BarChart2, Settings, ShieldAlert,
  Server, HardDrive, Filter, Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces for our state elements
interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'RUNNING' | 'STANDBY' | 'REBOOTING';
  cpu: number;
  ram: number;
  model: string;
  clearance: 'Level 2 (Standard)' | 'Level 3 (Admin)' | 'Level 5 (Super)';
  active: boolean;
}

interface Task {
  id: string;
  name: string;
  agent: string;
  model: string;
  tokenEstimate: number;
  state: 'queued' | 'processing' | 'done' | 'failed';
  latency: number;
  timeStamp: string;
}

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';
  agent: string;
  message: string;
}

interface AIAnalyticsDashboardProps {
  defaultRole?: 'super_admin' | 'developer';
  isEmbedded?: boolean;
}

export default function AIAnalyticsDashboard({ defaultRole = 'super_admin', isEmbedded = false }: AIAnalyticsDashboardProps) {
  // Current Perspective Mode: super_admin or developer
  const [perspective, setPerspective] = useState<'super_admin' | 'developer'>(defaultRole);
  
  // Real-time states
  const [systemUptime, setSystemUptime] = useState<number>(142024); // in seconds
  const [isLiveTelemetry, setIsLiveTelemetry] = useState<boolean>(true);
  
  // 1. ACTIVE AGENTS STATE
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'ag-1', name: 'Editorial Agent', avatar: '✍️', role: 'Sundanese Translation & Prose Compilation', status: 'RUNNING', cpu: 12, ram: 256, model: 'gemini-2.0-flash', clearance: 'Level 2 (Standard)', active: true },
    { id: 'ag-2', name: 'Research Agent', avatar: '🌐', role: 'Web Ingestion & Price Indexing', status: 'RUNNING', cpu: 4, ram: 256, model: 'gemini-1.5-flash', clearance: 'Level 2 (Standard)', active: true },
    { id: 'ag-3', name: 'Legal Agent', avatar: '⚖️', role: 'Compliance Verification & Risk Analyzer', status: 'STANDBY', cpu: 0, ram: 512, model: 'claude-3.5-sonnet', clearance: 'Level 3 (Admin)', active: true },
    { id: 'ag-4', name: 'Financial Agent', avatar: '📊', role: 'Budget Ledger Ledger Audits', status: 'RUNNING', cpu: 28, ram: 512, model: 'gemini-1.5-pro', clearance: 'Level 5 (Super)', active: true },
    { id: 'ag-5', name: 'Security Warden', avatar: '🛡️', role: 'MD5 Hashing & IP Firewalls', status: 'RUNNING', cpu: 2, ram: 128, model: 'gpt-4o', clearance: 'Level 5 (Super)', active: true },
    { id: 'ag-6', name: 'SEO Core Optimizer', avatar: '🔍', role: 'Sitemap Scans & Meta Injections', status: 'STANDBY', cpu: 0, ram: 256, model: 'gemini-1.5-flash', clearance: 'Level 2 (Standard)', active: false }
  ]);

  // 2. TASK QUEUE PERFORMANCE STATE
  const [liveQueue, setLiveQueue] = useState<Task[]>([
    { id: 'task-1', name: 'Analyze regional Jabar sitemap index density', agent: 'SEO Core Optimizer', model: 'gemini-1.5-flash', tokenEstimate: 4200, state: 'done', latency: 450, timeStamp: '07:15:12' },
    { id: 'task-2', name: 'Parse governor press release into Sundanese prose', agent: 'Editorial Agent', model: 'gemini-2.0-flash', tokenEstimate: 3100, state: 'done', latency: 320, timeStamp: '07:16:45' },
    { id: 'task-3', name: 'Audit corporate ledger balance match sheets', agent: 'Financial Agent', model: 'gemini-1.5-pro', tokenEstimate: 18500, state: 'processing', latency: 0, timeStamp: '07:22:01' },
    { id: 'task-4', name: 'Scrape agricultural market index lists', agent: 'Research Agent', model: 'gemini-1.5-flash', tokenEstimate: 5200, state: 'queued', latency: 0, timeStamp: '07:22:15' },
    { id: 'task-5', name: 'Run security firewall access validation', agent: 'Security Warden', model: 'gpt-4o', tokenEstimate: 1400, state: 'queued', latency: 0, timeStamp: '07:22:30' }
  ]);

  const [isQueuePaused, setIsQueuePaused] = useState<boolean>(false);
  const [isChaosMode, setIsChaosMode] = useState<boolean>(false);
  const [queueDelay, setQueueDelay] = useState<number>(2000); // milliseconds
  const [autoSimulateTask, setAutoSimulateTask] = useState<boolean>(true);

  // Chart data for throughput history
  const [throughputHistory, setThroughputHistory] = useState([
    { name: '07:15', active: 4, success: 18, errors: 0, latency: 340 },
    { name: '07:16', active: 5, success: 22, errors: 1, latency: 320 },
    { name: '07:17', active: 3, success: 25, errors: 0, latency: 450 },
    { name: '07:18', active: 6, success: 20, errors: 2, latency: 390 },
    { name: '07:19', active: 4, success: 29, errors: 0, latency: 310 },
    { name: '07:20', active: 7, success: 32, errors: 1, latency: 355 },
    { name: '07:21', active: 5, success: 35, errors: 0, latency: 332 },
    { name: '07:22', active: 4, success: 38, errors: isChaosMode ? 4 : 1, latency: isChaosMode ? 620 : 345 }
  ]);

  // 3. EXECUTION LOGS STATE
  const [terminalLogs, setTerminalLogs] = useState<Log[]>([
    { id: 'log-1', timestamp: '07:21:50', level: 'INFO', agent: 'Scheduler', message: '📥 Dispatcher successfully loaded new queue pipeline' },
    { id: 'log-2', timestamp: '07:21:55', level: 'DEBUG', agent: 'Security Warden', message: '🔑 Verified JWT claim verification tokens for corporate proxy api requests' },
    { id: 'log-3', timestamp: '07:22:01', level: 'INFO', agent: 'Financial Agent', message: '⚡ Started executing ledger audits on task QT-2026-1049' },
    { id: 'log-4', timestamp: '07:22:06', level: 'DEBUG', agent: 'Financial Agent', message: '📂 Loaded 15 ledger CSV sheets from object bucket' },
    { id: 'log-5', timestamp: '07:22:15', level: 'INFO', agent: 'Scheduler', message: '📥 Enqueued task [Scrape agricultural market index lists] into buffer line' },
    { id: 'log-6', timestamp: '07:22:30', level: 'INFO', agent: 'Scheduler', message: '📥 Enqueued task [Run security firewall access validation] into buffer line' }
  ]);

  const [activeLogLevel, setActiveLogLevel] = useState<'ALL' | 'INFO' | 'DEBUG' | 'WARN' | 'ERROR'>('ALL');
  const [activeLogQuery, setActiveLogQuery] = useState<string>('');
  const [isLoggingPaused, setIsLoggingPaused] = useState<boolean>(false);

  // 4. AI COST USAGE STATE
  const [liveCostSpent, setLiveCostSpent] = useState<number>(34.82);
  const [liveCostLimit, setLiveCostLimit] = useState<number>(250.00);
  const [alertThreshold, setAlertThreshold] = useState<number>(80); // 80%
  const [autoThrottleOnBudget, setAutoThrottleOnBudget] = useState<boolean>(true);

  // Custom Pricing models (configurable per 1 Million Tokens)
  const [modelPricing, setModelPricing] = useState({
    'gemini-1.5-pro': { label: 'Gemini 1.5 Pro', input: 1.25, output: 5.00 },
    'gemini-1.5-flash': { label: 'Gemini 1.5 Flash', input: 0.15, output: 0.60 },
    'gemini-2.0-flash': { label: 'Gemini 2.0 Flash', input: 0.25, output: 1.00 },
    'gpt-4o': { label: 'GPT-4o Enterprise', input: 5.00, output: 15.00 },
    'claude-3.5-sonnet': { label: 'Claude 3.5 Sonnet', input: 3.00, output: 15.00 }
  });

  const [showPricingDetails, setShowPricingDetails] = useState<boolean>(false);

  // Terminal scroll reference
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Trigger terminal scroll to bottom on new logs
  useEffect(() => {
    if (terminalEndRef.current && !isLoggingPaused) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, isLoggingPaused]);

  // Real-time telemetry tick simulations
  useEffect(() => {
    if (!isLiveTelemetry) return;

    const interval = setInterval(() => {
      // 1. Update Uptime
      setSystemUptime(prev => prev + 1);

      // 2. Real-time Agent activity simulation
      setAgents(prev => prev.map(a => {
        if (!a.active) return { ...a, cpu: 0, status: 'STANDBY' as const };
        
        // Randomly tweak CPU usage of active agents
        const change = Math.floor(Math.random() * 15) - 7;
        const newCpu = Math.max(2, Math.min(98, a.cpu + change));
        
        // Random status reboot check (rare)
        let newStatus = a.status;
        if (Math.random() < 0.02) {
          newStatus = 'REBOOTING' as const;
          setTimeout(() => {
            setAgents(p => p.map(ag => ag.id === a.id ? { ...ag, status: 'RUNNING' as const } : ag));
            addSimLog(a.name, `🌀 Container hot-rebooted successfully. Restored state channels.`, 'INFO');
          }, 3000);
        }

        return {
          ...a,
          cpu: newStatus === 'REBOOTING' ? 0 : newCpu,
          status: newStatus
        };
      }));

      // 3. Simulated Queue Processing Worker
      if (!isQueuePaused) {
        setLiveQueue(prev => {
          // Check if there is an active processing task
          const processingIndex = prev.findIndex(t => t.state === 'processing');
          
          if (processingIndex !== -1) {
            // Finish the active processing task
            const updated = [...prev];
            const finishedTask = updated[processingIndex];
            
            // Determine success or fail state based on Chaos Mode
            const isFailed = isChaosMode ? Math.random() < 0.40 : Math.random() < 0.03;
            const latency = isChaosMode 
              ? Math.floor(Math.random() * 1800) + 400 
              : Math.floor(Math.random() * 350) + 120;

            finishedTask.state = isFailed ? 'failed' : 'done';
            finishedTask.latency = latency;

            // Increment spent cost
            const pModel = finishedTask.model as keyof typeof modelPricing;
            const price = modelPricing[pModel] || { input: 1.0, output: 3.0 };
            const inputTokens = finishedTask.tokenEstimate;
            const outputTokens = finishedTask.tokenEstimate * (Math.random() * 0.8 + 0.4);
            const calculatedCost = ((inputTokens * price.input) + (outputTokens * price.output)) / 1000000;

            setLiveCostSpent(c => {
              const nextCost = c + calculatedCost;
              // Budget cap enforcement
              if (autoThrottleOnBudget && nextCost >= liveCostLimit) {
                setIsQueuePaused(true);
                addSimLog('Budget Sentinel', `🛑 HARD BUDGET LIMIT EXCEEDED ($${liveCostLimit.toFixed(2)}). Live Task Processing throttled automatically.`, 'ERROR');
              }
              return nextCost;
            });

            // Log the completion
            addSimLog(
              finishedTask.agent, 
              isFailed 
                ? `❌ Task [${finishedTask.name}] failed due to model payload alignment failure (Latency: ${latency}ms)` 
                : `✅ Successfully completed task [${finishedTask.name}] (Tokens: ${finishedTask.tokenEstimate}, Latency: ${latency}ms, Cost: $${calculatedCost.toFixed(5)})`,
              isFailed ? 'ERROR' : 'INFO'
            );

            // Trigger random log warning
            if (isFailed && isChaosMode) {
              addSimLog('Security Warden', `⚠️ Memory overflow detected on container sandbox heap trace limit. Dumping cores...`, 'WARN');
            }

            return updated;
          } else {
            // Find first queued task to process
            const nextIndex = prev.findIndex(t => t.state === 'queued');
            if (nextIndex !== -1) {
              const updated = [...prev];
              updated[nextIndex].state = 'processing';
              
              addSimLog(
                updated[nextIndex].agent, 
                `⚡ Initiating active compilation of task [${updated[nextIndex].name}] on cluster: [${updated[nextIndex].model}]`, 
                'INFO'
              );

              return updated;
            }
          }
          return prev;
        });
      }

      // 4. Auto Spawn idle tasks to simulate activity
      if (autoSimulateTask && Math.random() < 0.25) {
        const presets = [
          { name: 'Rewrite regional governor PR report', agent: 'Editorial Agent', model: 'gemini-2.0-flash', estimate: 3400 },
          { name: 'Scan West Java consumer price indexing trends', agent: 'Research Agent', model: 'gemini-1.5-flash', estimate: 4800 },
          { name: 'Verify land registry compliance validation rules', agent: 'Legal Agent', model: 'claude-3.5-sonnet', estimate: 24000 },
          { name: 'Hash inbound telemetry log file MD5 streams', agent: 'Security Warden', model: 'gpt-4o', estimate: 1200 }
        ];

        const selected = presets[Math.floor(Math.random() * presets.length)];
        
        // Ensure the corresponding agent is active before queuing
        const agentActive = agents.find(a => a.name === selected.agent)?.active;
        if (agentActive) {
          const newTask: Task = {
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: selected.name,
            agent: selected.agent,
            model: selected.model,
            tokenEstimate: selected.estimate,
            state: 'queued',
            latency: 0,
            timeStamp: new Date().toLocaleTimeString().split(' ')[0]
          };

          setLiveQueue(prev => {
            // Keep queue manageable (max 15 tasks shown in queue state)
            const cleanQueue = prev.length > 12 ? prev.slice(-10) : prev;
            return [...cleanQueue, newTask];
          });

          addSimLog('Scheduler', `📥 Automatically enqueued inbound pipeline payload: [${selected.name}]`, 'INFO');
        }
      }

      // 5. Update chart throughput dynamically
      setThroughputHistory(prev => {
        const nextHist = [...prev.slice(1)];
        const lastHist = prev[prev.length - 1];
        const timeNow = new Date().toLocaleTimeString().split(' ')[0].substring(0, 5);
        
        const completedCount = liveQueue.filter(t => t.state === 'done').length;
        const failedCount = liveQueue.filter(t => t.state === 'failed').length;
        const activeCount = agents.filter(a => a.active && a.status === 'RUNNING').length;
        const avgLat = liveQueue.filter(t => t.latency > 0).reduce((acc, t) => acc + t.latency, 0) / (liveQueue.filter(t => t.latency > 0).length || 1);

        nextHist.push({
          name: timeNow,
          active: activeCount,
          success: completedCount + Math.floor(Math.random() * 4),
          errors: failedCount + (isChaosMode ? Math.floor(Math.random() * 3) : 0),
          latency: Math.floor(avgLat) || 330
        });
        return nextHist;
      });

    }, queueDelay);

    return () => clearInterval(interval);
  }, [isLiveTelemetry, isQueuePaused, isChaosMode, queueDelay, autoSimulateTask, liveQueue, agents, autoThrottleOnBudget, liveCostLimit]);

  // Helper helper to push to simulated logs
  const addSimLog = (agent: string, message: string, level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR') => {
    if (isLoggingPaused) return;
    const timeNow = new Date().toLocaleTimeString().split(' ')[0];
    const newLog: Log = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeNow,
      level,
      agent,
      message
    };
    setTerminalLogs(prev => {
      // Limit memory list size
      const truncated = prev.length > 50 ? prev.slice(-30) : prev;
      return [...truncated, newLog];
    });
  };

  // Enqueue a manual custom task
  const handleManualEnqueue = (preset: 'budget' | 'scrape' | 'compliance' | 'translate') => {
    const configMap = {
      budget: { name: 'Audit Regional Budget Ledger', agent: 'Financial Agent', model: 'gemini-1.5-pro', estimate: 18500 },
      scrape: { name: 'Scrape Jabar regional price indeks', agent: 'Research Agent', model: 'gemini-1.5-flash', estimate: 5200 },
      compliance: { name: 'Verify regulatory compliance check', agent: 'Legal Agent', model: 'claude-3.5-sonnet', estimate: 24000 },
      translate: { name: 'Translate governor press release', agent: 'Editorial Agent', model: 'gemini-2.0-flash', estimate: 3400 }
    };

    const selected = configMap[preset];
    
    // Check if agent active
    const agentObj = agents.find(a => a.name === selected.agent);
    if (agentObj && !agentObj.active) {
      addSimLog('System', `❌ Cannot enqueue task. Agent Container [${selected.agent}] is offline.`, 'ERROR');
      return;
    }

    const newId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newT: Task = {
      id: newId,
      name: selected.name,
      agent: selected.agent,
      model: selected.model,
      tokenEstimate: selected.estimate,
      state: 'queued',
      latency: 0,
      timeStamp: new Date().toLocaleTimeString().split(' ')[0]
    };

    setLiveQueue(prev => [...prev, newT]);
    addSimLog('Scheduler', `📥 Manually enqueued user triggered diagnostic task: [${selected.name}]`, 'INFO');
  };

  // Calculations for KPI Cards
  const activeAgentsCount = agents.filter(a => a.active).length;
  const completedTasks = liveQueue.filter(t => t.state === 'done' || t.state === 'failed');
  const successRate = completedTasks.length > 0
    ? (liveQueue.filter(t => t.state === 'done').length / completedTasks.length) * 100
    : 99.92;
  const avgLatency = completedTasks.filter(t => t.latency > 0).length > 0
    ? completedTasks.filter(t => t.latency > 0).reduce((acc, t) => acc + t.latency, 0) / completedTasks.filter(t => t.latency > 0).length
    : 345;
  const queueDepth = liveQueue.filter(t => t.state === 'queued' || t.state === 'processing').length;
  const systemThroughput = ((activeAgentsCount * 1.6) * (1000 / queueDelay)).toFixed(1);

  // Recharts data for model cost allocations (calculated based on current costs)
  const costDistributionData = [
    { name: 'Gemini 1.5 Pro', value: Number((liveCostSpent * 0.45).toFixed(2)), color: '#3b82f6' },
    { name: 'Gemini 1.5 Flash', value: Number((liveCostSpent * 0.20).toFixed(2)), color: '#10b981' },
    { name: 'Gemini 2.0 Flash', value: Number((liveCostSpent * 0.15).toFixed(2)), color: '#f59e0b' },
    { name: 'GPT-4o Enterprise', value: Number((liveCostSpent * 0.12).toFixed(2)), color: '#8b5cf6' },
    { name: 'Claude 3.5 Sonnet', value: Number((liveCostSpent * 0.08).toFixed(2)), color: '#ec4899' }
  ];

  // Recharts data for latency peaks
  const latencyDistributionData = [
    { name: 'P50 Median', ms: Math.floor(avgLatency * 0.75), fill: '#10b981' },
    { name: 'P90 Standard', ms: Math.floor(avgLatency * 1.1), fill: '#3b82f6' },
    { name: 'P95 Limit', ms: Math.floor(avgLatency * 1.45), fill: '#f59e0b' },
    { name: 'P99 Peak Spike', ms: isChaosMode ? Math.floor(avgLatency * 3.2) : Math.floor(avgLatency * 2.1), fill: '#ef4444' }
  ];

  // Filtered Logs
  const filteredLogs = terminalLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(activeLogQuery.toLowerCase()) || 
                          log.agent.toLowerCase().includes(activeLogQuery.toLowerCase());
    const matchesLevel = activeLogLevel === 'ALL' || log.level === activeLogLevel;
    return matchesSearch && matchesLevel;
  });

  // Toggle individual agent activity status
  const handleToggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const nextActive = !a.active;
        addSimLog(
          'Container Manager', 
          `Container [${a.name}] is now ${nextActive ? 'ONLINE' : 'STANDBY (Paused)'}`, 
          nextActive ? 'INFO' : 'WARN'
        );
        return { ...a, active: nextActive, status: nextActive ? 'RUNNING' : 'STANDBY' as const };
      }
      return a;
    }));
  };

  // Adjust clearance limits
  const handleClearanceChange = (id: string, clearance: typeof agents[0]['clearance']) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        addSimLog('Security Warden', `👮 Clearance policy level adjusted for [${a.name}] to ${clearance}`, 'WARN');
        return { ...a, clearance };
      }
      return a;
    }));
  };

  // Convert system uptime seconds to readable string
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}j ${mins}m ${secs}d`;
  };

  return (
    <div className={`space-y-5 text-left ${isEmbedded ? '' : 'p-4 bg-slate-950 border border-slate-900 rounded-3xl'}`} id="ai-analytics-dashboard">
      
      {/* 1. COMPONENT HEADER AND ROLE SELECTOR SWITCHER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
            <Activity className="h-5 w-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-white tracking-wider uppercase font-sans">AI Cluster Telemetry Control</h2>
              <span className={`h-2 w-2 rounded-full ${isLiveTelemetry ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} title={isLiveTelemetry ? "Telemetry Active" : "Telemetry Paused"}></span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Uptime: {formatUptime(systemUptime)} • Multi-agent load balancers active</p>
          </div>
        </div>

        {/* ACCESS SWITCHER DESIGNED FOR SUPER ADMIN AND DEVELOPER ACCESSIBILITY */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/85">
          <button
            onClick={() => setPerspective('super_admin')}
            className={`px-3 py-1.5 rounded text-[9px] font-mono font-bold uppercase transition-all duration-200 flex items-center gap-1.5 border ${
              perspective === 'super_admin'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300 shadow-sm font-black'
                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <Lock className="h-2.5 w-2.5" />
            <span>Super Admin Gate</span>
          </button>
          <button
            onClick={() => setPerspective('developer')}
            className={`px-3 py-1.5 rounded text-[9px] font-mono font-bold uppercase transition-all duration-200 flex items-center gap-1.5 border ${
              perspective === 'developer'
                ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-300 shadow-sm font-black'
                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <Sliders className="h-2.5 w-2.5" />
            <span>Developer Space</span>
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME DYNAMIC TELEMETRY KPI OVERVIEW BAR */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Active Containers Node Count */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Active Agents</span>
            <Users className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">{activeAgentsCount} / {agents.length}</h3>
            <div className="w-full bg-slate-950 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${(activeAgentsCount / agents.length) * 100}%` }}></div>
            </div>
            <p className="text-[8px] font-mono text-slate-500 mt-1">Containers operational</p>
          </div>
        </div>

        {/* Active Backlog queue depth */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Queue Depth</span>
            <Radio className={`h-3.5 w-3.5 text-yellow-400 ${isQueuePaused ? '' : 'animate-ping'}`} />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">{queueDepth} Active Tasks</h3>
            <p className="text-[8px] font-mono mt-1 text-slate-500 flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${isQueuePaused ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'}`}></span>
              <span>{isQueuePaused ? 'Processing Paused' : 'Processing Live'}</span>
            </p>
          </div>
        </div>

        {/* AI Cost daily limit tracker */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Spent Budget</span>
            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">${liveCostSpent.toFixed(2)}</h3>
            <div className="w-full bg-slate-950 h-1 rounded-full mt-1.5 overflow-hidden">
              <div 
                className={`h-1 rounded-full ${liveCostSpent >= liveCostLimit * (alertThreshold / 100) ? 'bg-red-500' : 'bg-emerald-400'}`}
                style={{ width: `${Math.min(100, (liveCostSpent / liveCostLimit) * 100)}%` }}
              ></div>
            </div>
            <p className="text-[8px] font-mono text-slate-500 mt-1">Daily limit: ${liveCostLimit.toFixed(0)}</p>
          </div>
        </div>

        {/* Average Latency tracker */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Avg Latency</span>
            <Cpu className="h-3.5 w-3.5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">{avgLatency.toFixed(0)}ms</h3>
            <p className="text-[8px] font-mono text-slate-500 mt-1 flex items-center justify-between">
              <span>Cluster P90</span>
              {isChaosMode && <span className="text-red-400 font-bold animate-pulse text-[7px]">CHAOS</span>}
            </p>
          </div>
        </div>

        {/* Simulated API throughput */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Throughput</span>
            <TrendingUp className="h-3.5 w-3.5 text-teal-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">{systemThroughput} req/s</h3>
            <p className="text-[8px] font-mono text-slate-500 mt-1">Hulu loadbalancers auto-scaling</p>
          </div>
        </div>

        {/* Global Cluster execution success rate */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Success Rate</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">{successRate.toFixed(2)}%</h3>
            <p className="text-[8px] font-mono text-slate-500 mt-1 flex justify-between">
              <span>{liveQueue.filter(t => t.state === 'failed').length} errors caught</span>
              <span className="text-emerald-400">Stable</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. SIMULATOR PANEL: ACTIVE QUEUE INTERACTIVE CONTROLLER */}
      <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Interactive Queue Backlog Simulator</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsQueuePaused(!isQueuePaused)}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold border transition flex items-center gap-1.5 ${
                isQueuePaused 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              {isQueuePaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              <span>{isQueuePaused ? 'Resume Processing' : 'Pause Queue'}</span>
            </button>
            <button
              onClick={() => {
                setLiveQueue(prev => prev.filter(t => t.state !== 'done' && t.state !== 'failed'));
                addSimLog('Scheduler', '🧹 Cleared finished task archives from active telemetry buffer memory', 'DEBUG');
              }}
              className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg text-[9px] font-mono font-bold transition flex items-center gap-1.5"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear History</span>
            </button>
            <button
              onClick={() => {
                setIsChaosMode(!isChaosMode);
                addSimLog('System Resilience', `⚡ Chaos Engineering Mode toggled: ${!isChaosMode ? 'ACTIVE (Simulating latency, timeouts, packet drops)' : 'INACTIVE (Standard flow)'}`, !isChaosMode ? 'WARN' : 'INFO');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold border transition flex items-center gap-1.5 ${
                isChaosMode 
                  ? 'bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
              title="Simulates random API failures, latency overhead, and model payload degradation"
            >
              <AlertTriangle className={`h-3 w-3 ${isChaosMode ? 'animate-bounce text-red-400' : 'text-slate-500'}`} />
              <span>{isChaosMode ? 'Chaos Mode ON' : 'Chaos Mode'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
          <div className="space-y-2 flex-1 w-full text-left">
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Inject Custom Core Diagnostic Payloads</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleManualEnqueue('budget')}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-blue-500/40 text-slate-300 px-3 py-2.5 rounded-xl text-[10px] font-mono text-left transition flex flex-col justify-between group"
              >
                <span className="font-bold text-white group-hover:text-blue-400 truncate">📊 Audit Budget Ledger</span>
                <span className="text-[7.5px] text-slate-500 mt-1 block font-mono">Financial Agent • Gemini Pro</span>
              </button>
              <button
                onClick={() => handleManualEnqueue('scrape')}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-emerald-500/40 text-slate-300 px-3 py-2.5 rounded-xl text-[10px] font-mono text-left transition flex flex-col justify-between group"
              >
                <span className="font-bold text-white group-hover:text-emerald-400 truncate">🌐 Web Price Scraping</span>
                <span className="text-[7.5px] text-slate-500 mt-1 block font-mono">Research Agent • Gemini Flash</span>
              </button>
              <button
                onClick={() => handleManualEnqueue('compliance')}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-pink-500/40 text-slate-300 px-3 py-2.5 rounded-xl text-[10px] font-mono text-left transition flex flex-col justify-between group"
              >
                <span className="font-bold text-white group-hover:text-pink-400 truncate">⚖️ Policy Compliance</span>
                <span className="text-[7.5px] text-slate-500 mt-1 block font-mono">Legal Agent • Claude 3.5</span>
              </button>
              <button
                onClick={() => handleManualEnqueue('translate')}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-amber-500/40 text-slate-300 px-3 py-2.5 rounded-xl text-[10px] font-mono text-left transition flex flex-col justify-between group"
              >
                <span className="font-bold text-white group-hover:text-amber-400 truncate">✍️ Sundanese Translation</span>
                <span className="text-[7.5px] text-slate-500 mt-1 block font-mono">Editorial Agent • Gemini 2.0</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="space-y-1.5 w-full sm:w-44 text-left">
              <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase font-bold">
                <span>Simulation Speed</span>
                <span className="text-amber-400 font-bold">{(queueDelay / 1000).toFixed(1)}s delay</span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={queueDelay}
                onChange={(e) => setQueueDelay(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-950 border border-slate-800 rounded-lg appearance-none"
              />
              <span className="text-[7px] text-slate-500 font-mono block">Frequency of processed tasks</span>
            </div>

            <div className="space-y-2 w-full sm:w-44 text-left flex flex-col justify-end">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="auto-simulate"
                  checked={autoSimulateTask}
                  onChange={(e) => {
                    setAutoSimulateTask(e.target.checked);
                    addSimLog('Scheduler', `Auto-activity simulation turned ${e.target.checked ? 'ON' : 'OFF'}`, 'DEBUG');
                  }}
                  className="w-4 h-4 accent-amber-500 bg-slate-950 rounded border-slate-800 text-amber-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="auto-simulate" className="text-[9px] font-mono text-slate-300 cursor-pointer font-bold select-none">
                  Simulate Auto-Activity
                </label>
              </div>
              <span className="text-[7px] text-slate-500 font-mono block">Auto-spawn diagnostic queries during idle state</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN LAYOUTS - CONDITIONAL PORTAL ADAPTABILITY */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        
        {/* =========================================================
            PERSPECTIVE A: SUPER ADMIN PERSPECTIVE (COST, BUDGETS, QUOTAS, CLEARANCES)
           ========================================================= */}
        {perspective === 'super_admin' ? (
          <>
            {/* Model Cost allocations & Pricing configuration */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[11px] font-mono font-bold text-white uppercase flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-emerald-400" />
                    <span>Cluster Cost Allocations by Model</span>
                  </span>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase font-black">Super Admin</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Recharts Pie Chart of Cost distribution */}
                  <div className="h-44 w-full flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costDistributionData}
                          innerRadius={48}
                          outerRadius={68}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {costDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: 10, fontFamily: 'monospace' }}
                          formatter={(value) => [`$${value}`, 'Allocated Cost']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Total Spent</span>
                      <span className="text-base font-black text-white">${liveCostSpent.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Legend and stats details */}
                  <div className="space-y-2 font-mono text-[9px] text-left">
                    {costDistributionData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-950/40 p-1.5 rounded border border-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                          <span className="text-slate-300 font-bold truncate max-w-[100px]">{item.name}</span>
                        </div>
                        <span className="font-bold text-white">${item.value.toFixed(2)} ({((item.value / (liveCostSpent || 1)) * 100).toFixed(0)}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hard caps & Warn Alert sliders */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider block font-black">Quota & Budget Policy Enforcements</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between text-[8px] font-mono font-bold">
                      <span className="text-slate-400">Daily Budget Limit:</span>
                      <span className="text-white">${liveCostLimit} USD</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={liveCostLimit}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLiveCostLimit(val);
                        addSimLog('Budget Sentinel', `⚠️ Adjusted daily budget hard-cap limit to $${val} USD`, 'WARN');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-900 border border-slate-800 rounded"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between text-[8px] font-mono font-bold">
                      <span className="text-slate-400">Warning Alert Threshold:</span>
                      <span className="text-white">{alertThreshold}% spent</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      step="5"
                      value={alertThreshold}
                      onChange={(e) => setAlertThreshold(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-900 border border-slate-800 rounded"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 pt-2 text-[8px] font-mono">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="auto-throttle"
                      checked={autoThrottleOnBudget}
                      onChange={(e) => setAutoThrottleOnBudget(e.target.checked)}
                      className="w-3.5 h-3.5 accent-emerald-500 bg-slate-900 border-slate-800 rounded text-emerald-500"
                    />
                    <label htmlFor="auto-throttle" className="text-slate-300 font-bold cursor-pointer">
                      Auto-Throttle API Calls on Cap Overflow
                    </label>
                  </div>
                  <span className="text-emerald-400 font-bold">Guard Active</span>
                </div>
              </div>

              {/* Customizable Pricing configurations */}
              <div className="border-t border-slate-800 pt-3">
                <details className="cursor-pointer group select-none">
                  <summary className="text-[10px] font-mono font-bold text-slate-400 flex items-center justify-between hover:text-white transition">
                    <span className="flex items-center gap-1.5">
                      <Settings className="h-3.5 w-3.5 text-slate-500 group-open:rotate-45 transition" />
                      <span>🛠️ Configure Custom Model Price Billing Rates</span>
                    </span>
                    <span className="text-[8px] text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="pt-2.5 space-y-2.5 font-mono text-[9px] cursor-default" onClick={e => e.stopPropagation()}>
                    <p className="text-[8px] text-slate-500 leading-relaxed">
                      Override simulated pricing rates per 1 Million Tokens to simulate contract pricing models.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-900">
                      {(Object.keys(modelPricing) as Array<keyof typeof modelPricing>).map((key) => {
                        const m = modelPricing[key];
                        return (
                          <div key={key} className="space-y-1 bg-slate-900/40 p-2 rounded border border-slate-850">
                            <span className="text-[8px] font-bold text-amber-400">{m.label}</span>
                            <div className="flex items-center justify-between text-[7.5px] text-slate-400">
                              <span>In: ${m.input.toFixed(2)}/1M</span>
                              <span>Out: ${m.output.toFixed(2)}/1M</span>
                            </div>
                            <div className="flex gap-2">
                              <input 
                                type="range" 
                                min="0.05" 
                                max="5.00" 
                                step="0.05"
                                value={m.input} 
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setModelPricing(prev => ({ ...prev, [key]: { ...prev[key], input: val } }));
                                }}
                                className="w-1/2 accent-amber-500 h-1 rounded"
                              />
                              <input 
                                type="range" 
                                min="0.10" 
                                max="20.00" 
                                step="0.10"
                                value={m.output} 
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setModelPricing(prev => ({ ...prev, [key]: { ...prev[key], output: val } }));
                                }}
                                className="w-1/2 accent-amber-600 h-1 rounded"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Security clearances & container allocation tables */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[11px] font-mono font-bold text-white uppercase flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Security Clearance & Sandbox Quotas</span>
                  </span>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase font-black">Active Guard</span>
                </div>

                <p className="text-[10px] text-slate-400 leading-normal mb-3">
                  Restrict security access variables for active agent nodes to secure system memory boundaries and restrict database read/write accesses.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-[9px] divide-y divide-slate-800">
                    <thead>
                      <tr className="text-slate-500 text-[8px] uppercase text-left">
                        <th className="pb-2">Agent Container</th>
                        <th className="pb-2 text-center">Clearance Access</th>
                        <th className="pb-2 text-center">Quota Footprint</th>
                        <th className="pb-2 text-right">Run state</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      {agents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-slate-950/20">
                          <td className="py-2.5 flex items-center gap-1.5">
                            <span className="text-base shrink-0">{agent.avatar}</span>
                            <div className="truncate max-w-[100px] sm:max-w-[140px]">
                              <span className="font-bold text-white block truncate">{agent.name}</span>
                              <span className="text-[7.5px] text-slate-500 block truncate font-mono">{agent.model}</span>
                            </div>
                          </td>
                          <td className="py-2.5 text-center">
                            <select
                              value={agent.clearance}
                              onChange={(e) => handleClearanceChange(agent.id, e.target.value as any)}
                              className="bg-slate-950 border border-slate-800 rounded text-[7.5px] text-amber-400 px-1 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
                            >
                              <option value="Level 2 (Standard)">Level 2 (Std)</option>
                              <option value="Level 3 (Admin)">Level 3 (Admin)</option>
                              <option value="Level 5 (Super)">Level 5 (Super)</option>
                            </select>
                          </td>
                          <td className="py-2.5 text-center">
                            <select
                              defaultValue={`${agent.ram}MB`}
                              onChange={() => {
                                addSimLog(agent.name, `Reallocated container sandbox memory footprint. Rebooting container instance...`, 'INFO');
                              }}
                              className="bg-slate-950 border border-slate-800 rounded text-[7.5px] text-slate-300 px-1 py-0.5 focus:outline-none cursor-pointer"
                            >
                              <option value="128MB">128MB</option>
                              <option value="256MB">256MB</option>
                              <option value="512MB">512MB</option>
                              <option value="1GB">1024MB</option>
                            </select>
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleToggleAgent(agent.id)}
                              className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold border transition ${
                                agent.active 
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                              }`}
                            >
                              {agent.active ? 'RUNNING' : 'STANDBY'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[7.5px] text-slate-500 font-mono">
                <span>Core network verified under ISO-27001 constraints</span>
                <span className="text-emerald-500 flex items-center gap-1 font-bold">
                  <ShieldCheck className="h-3 w-3" /> Sandbox Shield Active
                </span>
              </div>
            </div>
          </>
        ) : (
          // =========================================================
          // PERSPECTIVE B: DEVELOPER PERSPECTIVE (LATENCY, LIVE MONITOR, TELEMETRY GRAPHS)
          // =========================================================
          <>
            {/* Latency peak charts and distribution */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[11px] font-mono font-bold text-white uppercase flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-blue-400" />
                    <span>Latency Peak Distribution (Percentiles)</span>
                  </span>
                  <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono uppercase font-black">Cluster Diagnostics</span>
                </div>

                <div className="h-48 w-full text-slate-400 text-[10px] font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={latencyDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={8} />
                      <YAxis stroke="#64748b" fontSize={8} label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', fill: '#64748b', style: { textAnchor: 'middle', fontSize: 8 } }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: 10, fontFamily: 'monospace' }}
                        formatter={(value) => [`${value} ms`, 'Response delay']}
                      />
                      <Bar dataKey="ms" radius={[4, 4, 0, 0]}>
                        {latencyDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[8px] space-y-1 text-left">
                <span className="text-slate-400 uppercase font-bold block mb-1">Compute Environment Flags</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-500">
                  <div className="flex justify-between"><span>NODE_ENV:</span><span className="text-blue-400">production</span></div>
                  <div className="flex justify-between"><span>API_ENDPOINT:</span><span className="text-blue-400">/api/v1/cluster</span></div>
                  <div className="flex justify-between"><span>CLUSTER_SCALE:</span><span className="text-emerald-400">DYNAMIC (1-16)</span></div>
                  <div className="flex justify-between"><span>FAILSAFE_ACTIVE:</span><span className={isChaosMode ? 'text-red-400 font-bold' : 'text-emerald-400'}>{isChaosMode ? 'STANDBY_BYPASSED' : 'ACTIVE_SECURE'}</span></div>
                </div>
              </div>
            </div>

            {/* Throughput load tracker Line Chart */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-[11px] font-mono font-bold text-white uppercase flex items-center gap-2">
                    <Radio className="h-4 w-4 text-blue-400" />
                    <span>Real-Time Processing Performance History</span>
                  </span>
                  <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono uppercase font-black">Throughput history</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={throughputHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={8} />
                      <YAxis stroke="#64748b" fontSize={8} />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: 10, fontFamily: 'monospace' }} />
                      <Area type="monotone" name="Success runs" dataKey="success" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccess)" />
                      <Area type="monotone" name="Latency (ms)" dataKey="latency" stroke="#8884d8" fillOpacity={1} fill="url(#colorLatency)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[7.5px] text-slate-500 font-mono">
                <span>Legend: Emerald = Completed Tasks | Violet = Connection Latency</span>
                <span className="text-emerald-400 font-bold">100% Load Balanced</span>
              </div>
            </div>
          </>
        )}

      </div>

      {/* 5. INTERACTIVE SCHEDULER: LIVE QUEUE PIPELINE WORKSPACE */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 text-left">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-amber-500" />
            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Active Sandbox Processing Pipeline</span>
          </div>
          <span className="text-[8px] bg-slate-950 text-amber-400 border border-slate-800 px-2.5 py-1 rounded font-mono uppercase font-bold">
            {liveQueue.filter(t => t.state === 'queued' || t.state === 'processing').length} Queue backlog
          </span>
        </div>

        {/* Real-time active items flow list */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-1">
          {liveQueue.slice(-8).reverse().map((task) => {
            const stateColors = {
              queued: 'bg-slate-950 text-slate-400 border-slate-800/80',
              processing: 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse',
              done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
              failed: 'bg-red-500/10 text-red-400 border-red-500/30'
            };

            const isCurrent = task.state === 'processing';

            return (
              <div 
                key={task.id} 
                className={`p-3 rounded-xl border flex flex-col justify-between space-y-2.5 transition duration-300 hover:border-slate-700 ${stateColors[task.state]}`}
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[8.5px] font-mono font-extrabold uppercase truncate max-w-[120px] text-slate-300">{task.agent}</span>
                    <span className={`text-[7px] px-1.5 py-0.5 rounded font-black border uppercase shrink-0 font-mono ${
                      task.state === 'processing' ? 'bg-amber-500/20 border-amber-500 animate-pulse text-amber-400' :
                      task.state === 'done' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' :
                      task.state === 'failed' ? 'bg-red-500/20 border-red-500 text-red-300' :
                      'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      {task.state}
                    </span>
                  </div>
                  <h4 className="text-[10px] font-bold text-white leading-normal line-clamp-2 h-7">{task.name}</h4>
                </div>

                <div className="pt-2 border-t border-slate-850 flex justify-between items-center text-[7.5px] font-mono text-slate-500">
                  <div className="flex items-center gap-1">
                    <Database className="h-2.5 w-2.5" />
                    <span>~{task.tokenEstimate.toLocaleString()} tokens</span>
                  </div>
                  <span>
                    {task.state === 'done' && `⏱️ ${task.latency}ms`}
                    {task.state === 'failed' && `⚠️ FAILED`}
                    {task.state === 'queued' && `⏱️ Waiting`}
                    {task.state === 'processing' && `⚡ Compiling`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. LOGS SYSTEM: REAL-TIME CONSOLE SIMULATOR WITH SEARCH/FILTERS */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-2.5 mb-3">
          <div className="flex items-center gap-1.5">
            <Terminal className="h-4 w-4 text-amber-500" />
            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Live System Execution Logs</span>
          </div>
          
          {/* Filters and search options */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500" />
              <input
                type="text"
                placeholder="Filter logs (agent, text)..."
                value={activeLogQuery}
                onChange={(e) => setActiveLogQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 pl-8 pr-3 py-1 rounded-lg text-[9px] font-mono focus:outline-none focus:border-slate-700 w-36 sm:w-44 placeholder:text-slate-600"
              />
            </div>

            <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5">
              {(['ALL', 'INFO', 'WARN', 'ERROR'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setActiveLogLevel(level)}
                  className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold transition ${
                    activeLogLevel === level 
                      ? 'bg-slate-850 text-white font-extrabold' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsLoggingPaused(!isLoggingPaused)}
              className={`px-2 py-1 rounded text-[8px] font-mono font-bold border transition ${
                isLoggingPaused 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-white'
              }`}
            >
              {isLoggingPaused ? 'Resume Logging' : 'Pause Stream'}
            </button>
            <button
              onClick={() => setTerminalLogs([])}
              className="px-2 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 rounded text-[8px] font-mono transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Live Terminal Window */}
        <div className="bg-black/95 p-4 rounded-xl border border-slate-900 font-mono text-[9px] text-slate-300 space-y-1.5 h-44 overflow-y-auto shadow-inner leading-relaxed">
          {filteredLogs.map((log) => {
            const levelColors = {
              INFO: 'text-blue-400',
              DEBUG: 'text-slate-500',
              WARN: 'text-yellow-500 font-bold',
              ERROR: 'text-red-400 font-black animate-pulse'
            };

            return (
              <div key={log.id} className="flex items-start gap-2 hover:bg-white/5 px-2 py-0.5 rounded transition">
                <span className="text-slate-600 select-none shrink-0 font-light font-sans">[{log.timestamp}]</span>
                <span className={`shrink-0 font-bold uppercase ${levelColors[log.level]}`}>[{log.level}]</span>
                <span className="text-amber-400 shrink-0 font-extrabold font-sans">[{log.agent}]</span>
                <span className="text-slate-300 break-all select-all font-mono">{log.message}</span>
              </div>
            );
          })}
          {filteredLogs.length === 0 && (
            <div className="text-slate-500 italic text-center py-10 select-none">
              No matching log records compiled inside active trace memory buffers.
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>
      </div>

    </div>
  );
}
