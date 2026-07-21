import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Users, GitBranch, Sparkles, Settings, History, 
  Cpu, CheckCircle2, Play, Pause, AlertTriangle, Plus, 
  Trash2, ArrowRight, RefreshCw, Copy, Check, Radio, 
  Terminal, FileText, Database, Layers, CloudLightning, ShieldAlert,
  Lock, Sliders, Bell, Download, Filter, BarChart2, Activity, ShieldCheck,
  Braces, Search
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
  tools: string[];
  memory: {
    short: string;
    long: string;
    conversation: string;
    knowledge: string;
    workspace: string;
    project: string;
  };
  permissions: string[];
  status: string;
  schedule: string;
  trigger: string;
  kb: string[];
  active: boolean;
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay' | 'approval' | 'loop' | 'notification' | 'ai' | 'end';
  label: string;
  config: string;
}

interface OrchestrationLog {
  id: string;
  agent: string;
  avatar: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'working' | 'done';
}

interface AgentAuditLog {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  detail: string;
  status: string;
}

interface AgentOSWorkspaceProps {
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  activeAgentSubTab: 'dashboard' | 'directory' | 'automation' | 'orchestrator' | 'mcp' | 'logs';
  setActiveAgentSubTab: (tab: 'dashboard' | 'directory' | 'automation' | 'orchestrator' | 'mcp' | 'logs') => void;
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  searchAgentQuery: string;
  setSearchAgentQuery: (q: string) => void;
  marketplaceSearchQuery: string;
  setMarketplaceSearchQuery: (q: string) => void;
  installedMarketplaceAgents: string[];
  setInstalledMarketplaceAgents: React.Dispatch<React.SetStateAction<string[]>>;
  installingAgentId: string | null;
  setInstallingAgentId: (id: string | null) => void;
  installProgress: number;
  setInstallProgress: (p: number) => void;
  workflowNodes: WorkflowNode[];
  setWorkflowNodes: React.Dispatch<React.SetStateAction<WorkflowNode[]>>;
  workflowTesting: boolean;
  setWorkflowTesting: (b: boolean) => void;
  activeTestStep: number;
  setActiveTestStep: (n: number) => void;
  customWorkflowName: string;
  setCustomWorkflowName: (s: string) => void;
  orchestratorPrompt: string;
  setOrchestratorPrompt: (s: string) => void;
  isOrchestrating: boolean;
  setIsOrchestrating: (b: boolean) => void;
  orchestrationLogs: OrchestrationLog[];
  setOrchestrationLogs: React.Dispatch<React.SetStateAction<OrchestrationLog[]>>;
  mcpServers: Record<string, boolean>;
  setMcpServers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  mcpConnectors: Record<string, boolean>;
  setMcpConnectors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  agentAuditLogs: AgentAuditLog[];
  setAgentAuditLogs: React.Dispatch<React.SetStateAction<AgentAuditLog[]>>;
  selectedUserRole: string;
  setSelectedUserRole: (role: any) => void;
  handleOrchestrate: () => void;
  handleSelectTemplate: (tpl: string) => void;
}

// Hardcoded initial marketplace pool
const marketplacePool = [
  { id: 'hr', name: 'HR Agent', avatar: '👥', role: 'Human Resource Recruiter', skills: ['Recruitment parsing', 'ATS optimization', 'Interview schedules', 'Employee satisfaction surveys'], tools: ['Calendar API', 'Email Gateway', 'CRM'], kb: ['Documents', 'Forum'] },
  { id: 'legal', name: 'Legal Agent', avatar: '⚖️', role: 'Contract Compliance & Risk Analyst', skills: ['Contract Auditing', 'Non-Disclosure Agreement Drafting', 'Intellectual Property Checks', 'Regulatory Compliance Check'], tools: ['Database Portal', 'Search Engine', 'PDF Parser'], kb: ['Research', 'Documents'] },
  { id: 'procurement', name: 'Procurement Agent', avatar: '📦', role: 'Supply Chain Coordinator', skills: ['Vendor bidding', 'Purchase Orders', 'Inventory Alerts', 'Invoice Audits'], tools: ['Database', 'CRM', 'API'], kb: ['Marketplace', 'Documents'] },
  { id: 'export', name: 'Export Agent', avatar: '🚢', role: 'Global Logistics Handler', skills: ['Customs Clearance Doc prep', 'Shipping Route optimization', 'Harmonized Code lookup', 'Freight Rate calculator'], tools: ['Maps', 'Search', 'API'], kb: ['Government', 'Documents'] },
  { id: 'import', name: 'Import Agent', avatar: '🛃', role: 'Inbound Regulatory Specialist', skills: ['Import tax calculator', 'Compliance Review', 'Dangerous goods declaration review'], tools: ['Search', 'Database', 'Translation'], kb: ['Government', 'Documents'] },
  { id: 'education', name: 'Education Agent', avatar: '🎓', role: 'Curriculum & Courseware Advisor', skills: ['Syllabus generator', 'Student Feedback analyzer', 'Exam paper outline maker'], tools: ['Translation', 'Search', 'Database'], kb: ['Research', 'Documents'] },
  { id: 'healthcare', name: 'Healthcare Agent', avatar: '🏥', role: 'Medical Data Compliance Assistant', skills: ['Patient triage suggestions', 'Symptom matching guidelines finder', 'HIPAA standards verification'], tools: ['Database', 'Search', 'API'], kb: ['Research', 'Documents'] },
  { id: 'construction', name: 'Construction Agent', avatar: '🏗️', role: 'Civil Site Progress Tracker', skills: ['Project safety list audit', 'BoQ compliance checking', 'Vendor quotes analysis'], tools: ['Database', 'Maps', 'Search'], kb: ['Documents', 'Government'] },
  { id: 'agriculture', name: 'Agriculture Agent', avatar: '🌾', role: 'Precision Crop Advisor', skills: ['Soil quality index mapping', 'Weather forecast action planning', 'Yield target forecasting'], tools: ['Maps', 'Database', 'Search'], kb: ['Government', 'Research'] },
  { id: 'tourism', name: 'Tourism Agent', avatar: '🗺️', role: 'Sunda Regional Itinerary Planner', skills: ['Travel itinerary mapping', 'Point-of-Interest popularity index tracking', 'Hotel pricing suggestion reviews'], tools: ['Maps', 'Database', 'Search'], kb: ['Forum', 'Marketplace', 'Government'] }
];

export const AgentOSWorkspace: React.FC<AgentOSWorkspaceProps> = ({
  agents,
  setAgents,
  activeAgentSubTab,
  setActiveAgentSubTab,
  selectedAgentId,
  setSelectedAgentId,
  searchAgentQuery,
  setSearchAgentQuery,
  marketplaceSearchQuery,
  setMarketplaceSearchQuery,
  installedMarketplaceAgents,
  setInstalledMarketplaceAgents,
  installingAgentId,
  setInstallingAgentId,
  installProgress,
  setInstallProgress,
  workflowNodes,
  setWorkflowNodes,
  workflowTesting,
  setWorkflowTesting,
  activeTestStep,
  setActiveTestStep,
  customWorkflowName,
  setCustomWorkflowName,
  orchestratorPrompt,
  setOrchestratorPrompt,
  isOrchestrating,
  setIsOrchestrating,
  orchestrationLogs,
  setOrchestrationLogs,
  mcpServers,
  setMcpServers,
  mcpConnectors,
  setMcpConnectors,
  agentAuditLogs,
  setAgentAuditLogs,
  selectedUserRole,
  setSelectedUserRole,
  handleOrchestrate,
  handleSelectTemplate
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeMemoryTab, setActiveMemoryTab] = useState<'short' | 'long' | 'conversation' | 'knowledge' | 'workspace' | 'project'>('short');
  
  // Custom workspace creation nodes states
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingNodeLabel, setEditingNodeLabel] = useState('');
  const [editingNodeConfig, setEditingNodeConfig] = useState('');

  // ====================================================
  // AI ANALYTICS DASHBOARD - SUPER ADMIN & DEV STATES
  // ====================================================
  const [portalMode, setPortalMode] = useState<'super-admin' | 'developer'>('super-admin');
  const [liveCostLimit, setLiveCostLimit] = useState<number>(500);
  const [liveCostSpent, setLiveCostSpent] = useState<number>(24.12);
  const [isQueuePaused, setIsQueuePaused] = useState<boolean>(false);
  const [concurrencyLimit, setConcurrencyLimit] = useState<number>(4);
  const [queueDelay, setQueueDelay] = useState<number>(1400); // ms between ticks
  const [isChaosMode, setIsChaosMode] = useState<boolean>(false);
  const [autoSimulateTask, setAutoSimulateTask] = useState<boolean>(true);
  const [alertThreshold, setAlertThreshold] = useState<number>(80); // Alert percentage
  const [autoThrottleOnBudget, setAutoThrottleOnBudget] = useState<boolean>(true);
  
  // Customizable Model Pricing Pool (Super Admin Slider Config)
  const [modelPricing, setModelPricing] = useState({
    'gemini-1.5-flash': { input: 0.075, output: 0.30, label: 'Gemini 1.5 Flash' },
    'gemini-1.5-pro': { input: 1.25, output: 5.00, label: 'Gemini 1.5 Pro' },
    'gemini-2.0-flash': { input: 0.15, output: 0.60, label: 'Gemini 2.0 Flash' },
    'gpt-4o': { input: 2.50, output: 10.00, label: 'GPT-4o Enterprise' },
    'claude-3.5-sonnet': { input: 3.00, output: 15.00, label: 'Claude 3.5 Sonnet' }
  });

  // Task Queue state
  const [liveQueue, setLiveQueue] = useState([
    { id: 'task-101', name: 'APBD fiscal audit calculation', agent: 'Financial Agent', model: 'gemini-1.5-pro', tokenEstimate: 14500, state: 'queued' as 'queued' | 'processing' | 'done' | 'failed', latency: 0, timeStamp: '12:35:10' },
    { id: 'task-102', name: 'West Java tourism route scraping', agent: 'Tourism Agent', model: 'gemini-1.5-flash', tokenEstimate: 8200, state: 'queued' as 'queued' | 'processing' | 'done' | 'failed', latency: 0, timeStamp: '12:35:15' },
    { id: 'task-103', name: 'Regulatory compliance review', agent: 'Legal Agent', model: 'claude-3.5-sonnet', tokenEstimate: 21000, state: 'queued' as 'queued' | 'processing' | 'done' | 'failed', latency: 0, timeStamp: '12:35:20' },
    { id: 'task-104', name: 'Press release translation (Sunda)', agent: 'Editorial Agent', model: 'gemini-2.0-flash', tokenEstimate: 3100, state: 'queued' as 'queued' | 'processing' | 'done' | 'failed', latency: 0, timeStamp: '12:35:25' }
  ]);

  // Selected completed task for Developer payload inspection
  const [inspectedTaskId, setInspectedTaskId] = useState<string>('task-099');
  const [inspectedTask, setInspectedTask] = useState<any>({
    id: 'task-099',
    name: 'Standard health check validation',
    agent: 'Security Agent',
    model: 'gemini-1.5-flash',
    tokenEstimate: 1200,
    state: 'done',
    latency: 345,
    timeStamp: '12:30:11',
    inputPayload: {
      headers: { authorization: 'Bearer sb_xx904123', 'content-type': 'application/json' },
      query: 'SELECT md5_hash, permission_group FROM sandboxes WHERE status="active"'
    },
    outputPayload: {
      status: 'success',
      active_sandboxes: 16,
      integrity_check: 'PASS_SHA256',
      quota_remaining_pct: 95.18
    }
  });

  const [activeLogQuery, setActiveLogQuery] = useState<string>('');
  const [activeLogLevel, setActiveLogLevel] = useState<'ALL' | 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'>('ALL');

  // Logs terminal state
  const [terminalLogs, setTerminalLogs] = useState([
    { id: 'log-1', timestamp: '12:30:00', level: 'INFO' as const, agent: 'System', message: 'AI Analytics Engine initialized safely.' },
    { id: 'log-2', timestamp: '12:30:05', level: 'INFO' as const, agent: 'Security Agent', message: 'Verified SHA-256 integrity check. No permission leaks detected.' },
    { id: 'log-3', timestamp: '12:31:12', level: 'DEBUG' as const, agent: 'MCP Server', message: 'CMS server responded with status 200 OK (ping: 15ms)' },
    { id: 'log-4', timestamp: '12:32:00', level: 'INFO' as const, agent: 'Financial Agent', message: 'Synchronized Jabar APBD budget ledger nodes with Postgres DB.' },
    { id: 'log-5', timestamp: '12:33:40', level: 'WARN' as const, agent: 'System', message: 'Token usage is nearing 80% limit threshold config on Claude-3.5 cluster.' }
  ]);

  // Dynamic simulation ticker hook
  useEffect(() => {
    if (isQueuePaused) return;

    const interval = setInterval(() => {
      setLiveQueue(prevQueue => {
        const firstQueuedIdx = prevQueue.findIndex(t => t.state === 'queued');
        
        if (firstQueuedIdx !== -1) {
          // Process first queued task in list
          const updated = [...prevQueue];
          const task = { ...updated[firstQueuedIdx] };
          task.state = 'processing';
          updated[firstQueuedIdx] = task;
          
          // Schedule it to complete after a short simulated work interval
          setTimeout(() => {
            setLiveQueue(currentQ => {
              const idx = currentQ.findIndex(t => t.id === task.id);
              if (idx !== -1) {
                const target = { ...currentQ[idx] };
                const isFailed = isChaosMode && Math.random() > 0.45;
                target.state = isFailed ? 'failed' : 'done';
                target.latency = Math.floor(180 + Math.random() * 410 + (isChaosMode ? 450 : 0));
                
                // Calculate token costs
                const inputTokens = Math.floor(target.tokenEstimate * 0.45);
                const outputTokens = Math.floor(target.tokenEstimate * 0.55);
                const modelRates = modelPricing[target.model as keyof typeof modelPricing] || modelPricing['gemini-1.5-flash'];
                const computedCost = ((inputTokens * modelRates.input) + (outputTokens * modelRates.output)) / 1000000;
                
                // Add to total spending
                setLiveCostSpent(c => {
                  const newCost = c + computedCost;
                  if (autoThrottleOnBudget && newCost >= liveCostLimit) {
                    setIsQueuePaused(true);
                    setTerminalLogs(l => [
                      {
                        id: `log-budget-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                        timestamp: new Date().toLocaleTimeString(),
                        level: 'ERROR' as const,
                        agent: 'Budget Gatekeeper',
                        message: `⚠️ Hard budget limit of $${liveCostLimit.toFixed(2)} EXCEEDED! Queue processing auto-throttled.`
                      },
                      ...l
                    ]);
                  }
                  return newCost;
                });

                // Write terminal log
                setTerminalLogs(l => [
                  {
                    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                    timestamp: new Date().toLocaleTimeString(),
                    level: isFailed ? 'ERROR' : 'INFO' as const,
                    agent: target.agent,
                    message: isFailed 
                      ? `❌ Task [${target.name}] failed inside isolated sandbox kernel! Error: ChaosModeException.`
                      : `✅ Processed [${target.name}] on ${modelRates.label}. Latency: ${target.latency}ms. Cost added: +$${computedCost.toFixed(5)} (${target.tokenEstimate} total tokens)`,
                  },
                  ...l
                ]);

                // Update inspected task payload details
                setInspectedTask({
                  ...target,
                  inputPayload: {
                    headers: { authorization: 'Bearer super_admin_token_jwt', 'x-sandbox-id': 'box_f923' },
                    body: { query: target.name, agent_id: target.agent, bounds: target.tokenEstimate }
                  },
                  outputPayload: isFailed ? {
                    status: 'error',
                    code: 'SANDBOX_RESOURCE_DISRUPTED',
                    details: 'Simulation fault injected by active Developer Chaos Engine.'
                  } : {
                    status: 'success',
                    tokens_processed: target.tokenEstimate,
                    completion_ms: target.latency,
                    integrity_checksum: 'sha256_aa9d3e38712f00ac',
                    response_object: `Output compiled successfully by sandbox instance for ${target.agent}.`
                  }
                });

                const copy = [...currentQ];
                copy[idx] = target;
                return copy;
              }
              return currentQ;
            });
          }, 800);

          return updated;
        } else if (autoSimulateTask && Math.random() > 0.4) {
          // Spawn a random workspace activity to keep metrics ticking
          const randomTaskNames = [
            'Evaluating Jabar inflation reports',
            'Compiling legislative document drafts',
            'Scraping infrastructure building quotes',
            'Evaluating public feedback sentiment on Dago',
            'Translating BMKG seismic warning charts',
            'Auditing multi-agent network credential keys'
          ];
          const randomAgents = ['Editorial Agent', 'Legal Agent', 'Research Agent', 'SEO Agent', 'Monitoring Agent'];
          const randomModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gpt-4o', 'claude-3.5-sonnet'];
          
          const newId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
          const newT = {
            id: newId,
            name: randomTaskNames[Math.floor(Math.random() * randomTaskNames.length)],
            agent: randomAgents[Math.floor(Math.random() * randomAgents.length)],
            model: randomModels[Math.floor(Math.random() * randomModels.length)],
            tokenEstimate: Math.floor(2500 + Math.random() * 21000),
            state: 'queued' as const,
            latency: 0,
            timeStamp: new Date().toLocaleTimeString()
          };

          return [...prevQueue, newT];
        }
        
        return prevQueue;
      });
    }, queueDelay);

    return () => clearInterval(interval);
  }, [isQueuePaused, isChaosMode, autoSimulateTask, queueDelay, modelPricing, liveCostLimit, autoThrottleOnBudget]);

  const currentSelectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const handleCopyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleToggleAgentActive = (id: string) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleUpdateMemory = (agentId: string, type: string, value: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return {
          ...a,
          memory: {
            ...a.memory,
            [type]: value
          }
        };
      }
      return a;
    }));
  };

  const handleInstallAgent = (id: string) => {
    if (installingAgentId !== null) return;
    setInstallingAgentId(id);
    setInstallProgress(0);
  };

  const handleAddWorkflowStep = () => {
    const newId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newStep: WorkflowNode = {
      id: newId,
      type: 'ai',
      label: 'New AI Node',
      config: 'Prompt: Lakukan analisis otomatis'
    };
    // Insert before the "end" node if it exists
    const endIdx = workflowNodes.findIndex(n => n.type === 'end');
    if (endIdx !== -1) {
      const updated = [...workflowNodes];
      updated.splice(endIdx, 0, newStep);
      setWorkflowNodes(updated);
    } else {
      setWorkflowNodes([...workflowNodes, newStep]);
    }
  };

  const handleRemoveWorkflowStep = (id: string) => {
    if (workflowNodes.length <= 2) return; // Keep at least trigger and end
    setWorkflowNodes(prev => prev.filter(n => n.id !== id));
    if (activeTestStep >= workflowNodes.findIndex(n => n.id === id)) {
      setActiveTestStep(prev => Math.max(-1, prev - 1));
    }
  };

  const handleApproveHumanInLoop = () => {
    if (workflowTesting && activeTestStep !== -1) {
      const currentIdx = activeTestStep;
      if (workflowNodes[currentIdx].type === 'approval') {
        // Proceed to next node immediately
        setActiveTestStep(currentIdx + 1);
      }
    }
  };

  // Filtered lists
  const filteredAgentsList = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchAgentQuery.toLowerCase()) || 
                          a.role.toLowerCase().includes(searchAgentQuery.toLowerCase());
    return matchesSearch;
  });

  const availableMarketplacePool = marketplacePool.filter(p => {
    const notInstalled = !agents.some(a => a.id === p.id) && !installedMarketplaceAgents.includes(p.id);
    const matchesSearch = p.name.toLowerCase().includes(marketplaceSearchQuery.toLowerCase()) || 
                          p.role.toLowerCase().includes(marketplaceSearchQuery.toLowerCase());
    return notInstalled && matchesSearch;
  });

  // Simulated chart data for daily volume of multi-agent operations
  const areaChartData = [
    { name: '00:00', Editorial: 24, Research: 15, Monitoring: 42, Security: 80 },
    { name: '04:00', Editorial: 12, Research: 8, Monitoring: 45, Security: 74 },
    { name: '08:00', Editorial: 85, Research: 64, Monitoring: 95, Security: 110 },
    { name: '12:00', Editorial: 140, Research: 120, Monitoring: 154, Security: 165 },
    { name: '16:00', Editorial: 110, Research: 95, Monitoring: 122, Security: 130 },
    { name: '20:00', Editorial: 74, Research: 45, Monitoring: 88, Security: 95 },
  ];

  return (
    <div className="flex flex-col bg-slate-900 border-x border-slate-800 flex-1 min-h-[calc(100vh-120px)] overflow-hidden text-slate-100" id="agent-os-root">
      
      {/* 1. AGENT OS INTERNAL HEADER & TAB BAR */}
      <div className="bg-slate-950 border-b border-slate-800 p-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500/15 p-2 rounded-lg border border-amber-500/30">
            <Cpu className="h-5 w-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-sans tracking-tight text-white flex items-center gap-1.5 uppercase">
              AI Agent Operating System <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded normal-case font-mono font-normal">v4.0 Enterprise</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">Simultaneous Multi-Agent Pipeline Execution & Security Sandbox Gateway</p>
          </div>
        </div>

        {/* User Role Selector Simulation */}
        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 self-start xl:self-auto">
          <span className="text-[9px] font-mono text-slate-400 uppercase">Aktivasi Peran Akses:</span>
          <select 
            value={selectedUserRole}
            onChange={(e) => setSelectedUserRole(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded text-[9px] font-bold font-mono text-[#FFD700] px-2 py-1 focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Clearance Levels</option>
            <option value="Owner">Owner (Superuser Level 5)</option>
            <option value="Super Admin">Super Admin (Clearance Level 4)</option>
            <option value="Admin">Admin (Clearance Level 3)</option>
            <option value="Editor">Editor (Level 2 Access)</option>
            <option value="Business">Business Analyst</option>
            <option value="Research">Research Lead</option>
            <option value="Reporter">Reporter Ground Access</option>
            <option value="Member">Standard Member</option>
            <option value="Guest">Guest Sandbox View</option>
          </select>
        </div>
      </div>

      {/* 2. TAB TOGGLERS */}
      <div className="bg-slate-950/60 border-b border-slate-800 p-2 overflow-x-auto whitespace-nowrap flex items-center gap-1.5 scrollbar-none">
        {[
          { id: 'dashboard', name: 'Dashboard Telemetri', icon: Brain },
          { id: 'directory', name: 'Direktori & Sandbox', icon: Users },
          { id: 'automation', name: 'Automation OS (Workflow)', icon: GitBranch },
          { id: 'orchestrator', name: 'Multi-Agent Orchestrator', icon: Sparkles },
          { id: 'mcp', name: 'MCP Connector Gateway', icon: Settings },
          { id: 'logs', name: 'Audit Trail & Telemetri', icon: History }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeAgentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAgentSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1.5 border uppercase ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/25 to-indigo-500/25 border-amber-500/40 text-yellow-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <IconComponent className={`h-3.5 w-3.5 ${isActive ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN TAB PANELS CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* ==========================================
            TAB: DASHBOARD & COMMAND CENTER 
           ========================================== */}
        {activeAgentSubTab === 'dashboard' && (() => {
          // Derived Live Metrics
          const completedTasks = liveQueue.filter(t => t.state === 'done' || t.state === 'failed');
          const successRate = completedTasks.length > 0
            ? (liveQueue.filter(t => t.state === 'done').length / completedTasks.length) * 100
            : 99.92;
          const avgLatency = completedTasks.filter(t => t.latency > 0).length > 0
            ? completedTasks.filter(t => t.latency > 0).reduce((acc, t) => acc + t.latency, 0) / completedTasks.filter(t => t.latency > 0).length
            : 345;
          const throughput = ((concurrencyLimit * 1.5) * (1000 / queueDelay)).toFixed(1);
          const activeAgentsCount = agents.filter(a => a.active).length;
          
          // Recharts data for model distributions
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

          // Handlers to enqueue tasks
          const handleManualEnqueue = (preset: 'budget' | 'scrape' | 'compliance' | 'translate') => {
            const configMap = {
              budget: { name: 'Audit Regional Budget Ledger', agent: 'Financial Agent', model: 'gemini-1.5-pro', estimate: 18500 },
              scrape: { name: 'Scrape Jabar regional price indeks', agent: 'Research Agent', model: 'gemini-1.5-flash', estimate: 5200 },
              compliance: { name: 'Verify regulatory compliance check', agent: 'Legal Agent', model: 'claude-3.5-sonnet', estimate: 24000 },
              translate: { name: 'Translate governor press release', agent: 'Editorial Agent', model: 'gemini-2.0-flash', estimate: 3400 }
            };

            const selected = configMap[preset];
            const newId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
            const newT = {
              id: newId,
              name: selected.name,
              agent: selected.agent,
              model: selected.model,
              tokenEstimate: selected.estimate,
              state: 'queued' as const,
              latency: 0,
              timeStamp: new Date().toLocaleTimeString()
            };

            setLiveQueue(prev => [...prev, newT]);
            setTerminalLogs(l => [
              {
                id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                timestamp: new Date().toLocaleTimeString(),
                level: 'INFO' as const,
                agent: 'Scheduler',
                message: `📥 Manually enqueued task [${selected.name}] to queue backlog. Allocated cluster: ${selected.model}`
              },
              ...l
            ]);
          };

          return (
            <div className="space-y-4 text-left" id="agent-os-dashboard">
              
              {/* Portal Mode Segments Switcher Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/30">
                    <Activity className="h-5 w-5 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase font-sans">AI Metrics Core Gateway</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Live telemetry analysis, sandbox cost allocations, and performance diagnostics</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 self-start md:self-auto">
                  <button
                    onClick={() => setPortalMode('super-admin')}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5 border ${
                      portalMode === 'super-admin'
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Lock className="h-3 w-3" />
                    <span>Super Admin Portal</span>
                  </button>
                  <button
                    onClick={() => setPortalMode('developer')}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5 border ${
                      portalMode === 'developer'
                        ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Sliders className="h-3 w-3" />
                    <span>Developer Portal</span>
                  </button>
                </div>
              </div>

              {/* 1. DYNAMIC TELEMETRY OVERVIEW BAR */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                
                {/* Active Agents KPI */}
                <div className="bg-slate-950 p-3 rounded-xl border border-blue-500/20 flex flex-col justify-between space-y-2 hover:border-blue-500/40 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Active Agents</span>
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{activeAgentsCount} / {agents.length}</h3>
                    <div className="w-full bg-slate-900 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${(activeAgentsCount / agents.length) * 100}%` }}></div>
                    </div>
                    <p className="text-[8px] font-mono text-slate-500 mt-1">Containers operational</p>
                  </div>
                </div>

                {/* Queue Depth KPI */}
                <div className="bg-slate-950 p-3 rounded-xl border border-yellow-500/20 flex flex-col justify-between space-y-2 hover:border-yellow-500/40 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Queue Depth</span>
                    <Radio className={`h-3.5 w-3.5 text-yellow-400 ${isQueuePaused ? '' : 'animate-ping'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">
                      {liveQueue.filter(t => t.state === 'queued' || t.state === 'processing').length} Tasks
                    </h3>
                    <p className="text-[8px] font-mono text-slate-500 mt-1 flex items-center gap-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${isQueuePaused ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'}`}></span>
                      <span>{isQueuePaused ? 'Backlog Paused' : 'Processing Live'}</span>
                    </p>
                  </div>
                </div>

                {/* API Spending KPI */}
                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/20 flex flex-col justify-between space-y-2 hover:border-emerald-500/40 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Daily Spending</span>
                    <CloudLightning className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">${liveCostSpent.toFixed(2)}</h3>
                    <div className="w-full bg-slate-900 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={`h-1 rounded-full ${liveCostSpent >= liveCostLimit * (alertThreshold / 100) ? 'bg-red-500' : 'bg-emerald-400'}`}
                        style={{ width: `${Math.min(100, (liveCostSpent / liveCostLimit) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-[8px] font-mono text-slate-500 mt-1">Cap limit: ${liveCostLimit.toFixed(0)}</p>
                  </div>
                </div>

                {/* Average Latency KPI */}
                <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/20 flex flex-col justify-between space-y-2 hover:border-purple-500/40 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Avg Latency</span>
                    <Cpu className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{avgLatency.toFixed(0)}ms</h3>
                    <p className="text-[8px] font-mono text-slate-500 mt-1">Cluster connection P90</p>
                  </div>
                </div>

                {/* Queue Throughput KPI */}
                <div className="bg-slate-950 p-3 rounded-xl border border-teal-500/20 flex flex-col justify-between space-y-2 hover:border-teal-500/40 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Throughput</span>
                    <GitBranch className="h-3.5 w-3.5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{throughput} req/s</h3>
                    <p className="text-[8px] font-mono text-slate-500 mt-1">Scaling limits optimized</p>
                  </div>
                </div>

                {/* Success Rate KPI */}
                <div className="bg-slate-950 p-3 rounded-xl border border-rose-500/20 flex flex-col justify-between space-y-2 hover:border-rose-500/40 transition">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Success Rate</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{successRate.toFixed(2)}%</h3>
                    <p className="text-[8px] font-mono mt-1 text-slate-500 flex items-center justify-between">
                      <span>{liveQueue.filter(t => t.state === 'failed').length} errors</span>
                      {isChaosMode && <span className="text-red-400 animate-pulse font-bold text-[7px]">CHAOS ACTIVE</span>}
                    </p>
                  </div>
                </div>

              </div>

              {/* 2. INTERACTIVE SIMULATION CONTROL PANEL */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">Interactive Queue Backlog Simulator</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsQueuePaused(!isQueuePaused)}
                      className={`px-2 py-1 rounded text-[8px] font-mono font-bold border transition flex items-center gap-1 ${
                        isQueuePaused 
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25' 
                          : 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                      }`}
                    >
                      {isQueuePaused ? <Play className="h-2.5 w-2.5" /> : <Pause className="h-2.5 w-2.5" />}
                      <span>{isQueuePaused ? 'Resume Processing' : 'Pause Queue'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setLiveQueue(prev => prev.filter(t => t.state !== 'done' && t.state !== 'failed'));
                        setTerminalLogs(l => [
                          { id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, timestamp: new Date().toLocaleTimeString(), level: 'DEBUG' as const, agent: 'System', message: 'Cleared all finished tasks from diagnostic queue memory.' },
                          ...l
                        ]);
                      }}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white rounded text-[8px] font-mono font-black transition"
                    >
                      Clear Finished
                    </button>
                    <button
                      onClick={() => setIsChaosMode(!isChaosMode)}
                      className={`px-2 py-1 rounded text-[8px] font-mono font-bold border transition flex items-center gap-1 ${
                        isChaosMode 
                          ? 'bg-red-500/25 border-red-500 text-red-300' 
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                      title="Simulates random network dropouts, API request time-outs, and model payload corrupted state"
                    >
                      <AlertTriangle className={`h-2.5 w-2.5 ${isChaosMode ? 'animate-bounce text-red-400' : 'text-slate-500'}`} />
                      <span>{isChaosMode ? 'Disable Chaos Engineering' : 'Enable Chaos Mode'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
                  <div className="space-y-1.5 flex-1 w-full">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block font-black">Trigger Diagnostics Queue Payload</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => handleManualEnqueue('budget')}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-2 py-2 rounded text-[9px] font-mono text-left transition flex flex-col justify-between group hover:border-blue-500/40"
                      >
                        <span className="font-bold text-white group-hover:text-blue-400 truncate">📊 Budget Calculation</span>
                        <span className="text-[7px] text-slate-500 mt-1 block">Financial Agent • Gemini Pro</span>
                      </button>
                      <button
                        onClick={() => handleManualEnqueue('scrape')}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-2 py-2 rounded text-[9px] font-mono text-left transition flex flex-col justify-between group hover:border-emerald-500/40"
                      >
                        <span className="font-bold text-white group-hover:text-emerald-400 truncate">🌐 Web Price Scraping</span>
                        <span className="text-[7px] text-slate-500 mt-1 block">Research Agent • Gemini Flash</span>
                      </button>
                      <button
                        onClick={() => handleManualEnqueue('compliance')}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-2 py-2 rounded text-[9px] font-mono text-left transition flex flex-col justify-between group hover:border-pink-500/40"
                      >
                        <span className="font-bold text-white group-hover:text-pink-400 truncate">⚖️ Policy Compliance</span>
                        <span className="text-[7px] text-slate-500 mt-1 block">Legal Agent • Claude 3.5</span>
                      </button>
                      <button
                        onClick={() => handleManualEnqueue('translate')}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-2 py-2 rounded text-[9px] font-mono text-left transition flex flex-col justify-between group hover:border-amber-500/40"
                      >
                        <span className="font-bold text-white group-hover:text-amber-400 truncate">✍️ Sundanese Translation</span>
                        <span className="text-[7px] text-slate-500 mt-1 block">Editorial Agent • Gemini 2.0</span>
                      </button>
                    </div>
                  </div>

                  {/* Sliders for Simulation Environment Controls */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="space-y-1 w-full sm:w-44">
                      <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                        <span>Simulation Speed</span>
                        <span className="text-yellow-400 font-bold">{(queueDelay / 1000).toFixed(1)}s delay</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="4000"
                        step="100"
                        value={queueDelay}
                        onChange={(e) => setQueueDelay(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                      <span className="text-[7px] text-slate-500 font-mono block">Frequency of processed tasks</span>
                    </div>

                    <div className="space-y-1 w-full sm:w-44">
                      <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                        <span>Simulate Auto-Activity</span>
                        <span className={`${autoSimulateTask ? 'text-emerald-400' : 'text-slate-500'}`}>{autoSimulateTask ? 'ON' : 'OFF'}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          id="auto-simulate"
                          checked={autoSimulateTask}
                          onChange={(e) => setAutoSimulateTask(e.target.checked)}
                          className="w-4 h-4 accent-amber-500 bg-slate-900 rounded border-slate-700 focus:ring-amber-500 focus:ring-offset-slate-950"
                        />
                        <label htmlFor="auto-simulate" className="text-[8px] font-mono text-slate-400 cursor-pointer">
                          Auto-spawn queries on idle state
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. CONDITIONAL MAIN WORKSPACE GRID PORTALS */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                
                {/* PORTAL PERSPECTIVE A: SUPER ADMIN PERSPECTIVE */}
                {portalMode === 'super-admin' && (
                  <>
                    {/* Model Allocations & Budget Alert Threshold Controls */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                          <span className="text-xs font-bold font-mono text-white uppercase flex items-center gap-1.5">
                            <BarChart2 className="h-4 w-4 text-emerald-400" />
                            <span>Cluster Cost Allocations by Model</span>
                          </span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">Dynamic Compute</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          {/* Pie Chart Visual of Cost allocations */}
                          <div className="h-44 w-full flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={costDistributionData}
                                  innerRadius={45}
                                  outerRadius={65}
                                  paddingAngle={3}
                                  dataKey="value"
                                >
                                  {costDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value}`} />
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                              <span className="text-[9px] font-mono text-slate-500 uppercase">Total Spent</span>
                              <span className="text-sm font-black text-white">${liveCostSpent.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Legend and stats */}
                          <div className="space-y-2 font-mono text-[9px]">
                            {costDistributionData.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                  <span className="text-slate-300">{item.name}</span>
                                </div>
                                <span className="font-black text-white">${item.value.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Controls for alerts & budget caps */}
                      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-3 text-left">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-black">Quota & Budget Policy Enforcements</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-mono">
                              <span className="text-slate-400">Daily Hard Budget Cap:</span>
                              <span className="text-white font-bold">${liveCostLimit} USD</span>
                            </div>
                            <input
                              type="range"
                              min="20"
                              max="1500"
                              step="20"
                              value={liveCostLimit}
                              onChange={(e) => setLiveCostLimit(Number(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-800 rounded"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-mono">
                              <span className="text-slate-400">Slack Alert Threshold:</span>
                              <span className="text-white font-bold">{alertThreshold}% spent</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="95"
                              step="5"
                              value={alertThreshold}
                              onChange={(e) => setAlertThreshold(Number(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-800 rounded"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="auto-throttle"
                              checked={autoThrottleOnBudget}
                              onChange={(e) => setAutoThrottleOnBudget(e.target.checked)}
                              className="w-3.5 h-3.5 accent-emerald-500 bg-slate-950 rounded border-slate-700"
                            />
                            <label htmlFor="auto-throttle" className="text-[8px] font-mono text-slate-300 cursor-pointer font-bold">
                              Auto-Throttle API Calls on Cap Overflow
                            </label>
                          </div>
                          <span className="text-[7px] text-slate-500 font-mono uppercase">Guard Active</span>
                        </div>
                      </div>

                      {/* Customizable Pricing Slider configuration */}
                      <div className="border-t border-slate-900 pt-3">
                        <details className="cursor-pointer group">
                          <summary className="text-[9.5px] font-mono font-bold text-slate-400 flex items-center justify-between select-none">
                            <span>🛠️ Configure Custom Model Price Calculation Rates (Super Admin)</span>
                            <span className="text-[8px] text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                          </summary>
                          <div className="pt-2 space-y-2.5 font-mono text-[9px] cursor-default" onClick={e => e.stopPropagation()}>
                            <p className="text-[8px] text-slate-500 leading-relaxed font-sans">
                              Configure simulated input/output charges per 1 Million Tokens to reflect your custom corporate pricing contracts.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-900/40 p-2.5 rounded border border-slate-800">
                              {(Object.keys(modelPricing) as Array<keyof typeof modelPricing>).map((key) => {
                                const m = modelPricing[key];
                                return (
                                  <div key={key} className="space-y-1 bg-slate-950 p-1.5 rounded border border-slate-900">
                                    <span className="text-[8px] font-black text-[#FFD700]">{m.label}</span>
                                    <div className="flex items-center justify-between text-[7.5px] text-slate-400">
                                      <span>Input: ${m.input.toFixed(2)}/1M</span>
                                      <span>Output: ${m.output.toFixed(2)}/1M</span>
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
                                        className="w-1/2 accent-yellow-600 h-1 rounded"
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

                    {/* Active Agent Security Clearances and Resource Limits */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                          <span className="text-xs font-bold font-mono text-white uppercase flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            <span>Security Clearance & Resource Quotas</span>
                          </span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase">Sandboxed Containers</span>
                        </div>

                        <p className="text-[8px] text-slate-400 font-sans leading-normal mb-3">
                          Administrate running parameters for each active agent context. Restricting clearances prevents agents from executing write commands or accessing internal MCP data graph.
                        </p>

                        <div className="overflow-x-auto">
                          <table className="w-full font-mono text-[9px] divide-y divide-slate-850">
                            <thead>
                              <tr className="text-slate-500 text-[8px] uppercase">
                                <th className="pb-1.5 text-left">Agent Container</th>
                                <th className="pb-1.5 text-center">Clearance</th>
                                <th className="pb-1.5 text-center">Ram Allot</th>
                                <th className="pb-1.5 text-right">Run State</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-850/40 text-slate-300">
                              {agents.map((agent) => (
                                <tr key={agent.id} className="hover:bg-slate-900/40">
                                  <td className="py-2 flex items-center gap-1.5">
                                    <span className="text-sm">{agent.avatar}</span>
                                    <div>
                                      <span className="font-bold text-white block">{agent.name}</span>
                                      <span className="text-[7.5px] text-slate-500 block truncate max-w-[120px]">{agent.role}</span>
                                    </div>
                                  </td>
                                  <td className="py-2 text-center">
                                    <select
                                      value={agent.permissions.length > 5 ? 'Level 5 (Super)' : agent.permissions.length > 3 ? 'Level 3 (Admin)' : 'Level 2 (Standard)'}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setAgents(prev => prev.map(a => {
                                          if (a.id === agent.id) {
                                            const newPerms = val === 'Level 5 (Super)' 
                                              ? ['read', 'write', 'execute', 'mcp_access', 'cost_override', 'db_write']
                                              : val === 'Level 3 (Admin)' ? ['read', 'write', 'execute'] : ['read'];
                                            return { ...a, permissions: newPerms };
                                          }
                                          return a;
                                        }));
                                        setTerminalLogs(l => [
                                          { id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, timestamp: new Date().toLocaleTimeString(), level: 'WARN' as const, agent: 'Security Warden', message: `Adjusted [${agent.name}] clearance policy to ${val}.` },
                                          ...l
                                        ]);
                                      }}
                                      className="bg-slate-900 border border-slate-700 rounded text-[7.5px] text-[#FFD700] px-1 py-0.5 focus:outline-none focus:border-emerald-500"
                                    >
                                      <option value="Level 2 (Standard)">Level 2 (Std)</option>
                                      <option value="Level 3 (Admin)">Level 3 (Admin)</option>
                                      <option value="Level 5 (Super)">Level 5 (Super)</option>
                                    </select>
                                  </td>
                                  <td className="py-2 text-center">
                                    <select
                                      defaultValue="256MB"
                                      onChange={() => {
                                        setTerminalLogs(l => [
                                          { id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, timestamp: new Date().toLocaleTimeString(), level: 'INFO' as const, agent: 'System', message: `Reallocated sandbox RAM footprint for [${agent.name}]. Container rebooted.` },
                                          ...l
                                        ]);
                                      }}
                                      className="bg-slate-900 border border-slate-700 rounded text-[7.5px] text-slate-300 px-1 py-0.5 focus:outline-none"
                                    >
                                      <option value="128MB">128MB</option>
                                      <option value="256MB">256MB</option>
                                      <option value="512MB">512MB</option>
                                      <option value="1GB">1024MB</option>
                                    </select>
                                  </td>
                                  <td className="py-2 text-right">
                                    <button
                                      onClick={() => {
                                        setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, active: !a.active } : a));
                                        setTerminalLogs(l => [
                                          { id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, timestamp: new Date().toLocaleTimeString(), level: 'INFO' as const, agent: 'Container Manager', message: `Container [${agent.name}] is now ${!agent.active ? 'ACTIVE' : 'STANDBY'}.` },
                                          ...l
                                        ]);
                                      }}
                                      className={`px-1.5 py-0.5 rounded text-[8px] font-bold border transition ${
                                        agent.active 
                                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20' 
                                          : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-600'
                                      }`}
                                    >
                                      {agent.active ? 'RUNNING' : 'PAUSED'}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[7.5px] text-slate-500">
                        <span>Cleared: 100% compliant with ISO-27001 policies</span>
                        <span className="text-emerald-500">Active Firewall OK</span>
                      </div>
                    </div>
                  </>
                )}

                {/* PORTAL PERSPECTIVE B: DEVELOPER PERSPECTIVE */}
                {portalMode === 'developer' && (
                  <>
                    {/* Latency Distribution and MCP Connected Health stats */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                          <span className="text-xs font-bold font-mono text-white uppercase flex items-center gap-1.5">
                            <BarChart2 className="h-4 w-4 text-blue-400" />
                            <span>Task Latency Percentile Distribution (ms)</span>
                          </span>
                          <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono uppercase">Millisecond Level</span>
                        </div>

                        <div className="h-44 w-full text-slate-400 text-[10px] font-mono">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={latencyDistributionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="name" stroke="#64748b" fontSize={8} />
                              <YAxis stroke="#64748b" fontSize={8} />
                              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: 10 }} />
                              <Bar dataKey="ms" radius={[4, 4, 0, 0]}>
                                {latencyDistributionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* MCP Connection Health diagnostics */}
                      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-2 text-left">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-black">Active MCP Gateway Host Audit</span>
                        
                        <div className="grid grid-cols-2 gap-2 text-[8px] font-mono">
                          {[
                            { name: 'INFOBOS CMS Server', status: mcpServers.cms ? 'ONLINE' : 'OFFLINE', ping: '12ms' },
                            { name: 'News Crawler Feed', status: mcpServers.news ? 'ONLINE' : 'OFFLINE', ping: '24ms' },
                            { name: 'Knowledge Graph DB', status: mcpServers['knowledge-graph'] ? 'ONLINE' : 'OFFLINE', ping: '45ms' },
                            { name: 'Analytics Telemetry', status: mcpServers.analytics ? 'ONLINE' : 'OFFLINE', ping: '8ms' }
                          ].map((item, idx) => (
                            <div key={idx} className="bg-slate-950 p-2 rounded border border-slate-900 flex justify-between items-center">
                              <div>
                                <span className="text-slate-300 block font-bold">{item.name}</span>
                                <span className={item.status === 'ONLINE' ? 'text-emerald-400' : 'text-slate-500'}>{item.status}</span>
                              </div>
                              <span className="text-blue-400">{item.ping}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-900 text-[8px] text-slate-500 font-mono flex justify-between">
                        <span>Legend: Median (P50) | Peak Spike (P99)</span>
                        <span className="text-blue-400 font-bold">100% Router Ports Safe</span>
                      </div>
                    </div>

                    {/* Developer Payload Inspector & Queue Backlog Details */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3.5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                          <span className="text-xs font-bold font-mono text-white uppercase flex items-center gap-1.5">
                            <Braces className="h-4 w-4 text-blue-400" />
                            <span>API Payload Context Inspector</span>
                          </span>
                          <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono uppercase">JSON Debugger</span>
                        </div>

                        <p className="text-[8px] text-slate-400 font-sans leading-normal mb-3">
                          Select any task currently processing or recently executed in the diagnostic simulator queue below to inspect its live raw API query payloads and returned objects.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {/* Live Queue backlog selection list */}
                          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                            <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Diagnosable Queue Tasks</span>
                            {liveQueue.slice(-6).map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setInspectedTaskId(item.id);
                                  setInspectedTask({
                                    ...item,
                                    inputPayload: {
                                      headers: { authorization: 'Bearer session_token_sandbox_auth', 'x-request-id': item.id },
                                      body: { query: item.name, target_agent: item.agent, model_allocation: item.model }
                                    },
                                    outputPayload: item.state === 'failed' ? {
                                      error: 'ExecutionFaultInjected',
                                      code: 'CHAOS_MODE_DISRUPTION',
                                      detail: 'Diagnostic pipeline failed due to Developer Chaos Engineering trigger.'
                                    } : item.state === 'done' ? {
                                      status: 'success',
                                      allocated_tokens: item.tokenEstimate,
                                      latency_ms: item.latency || 312,
                                      checksum: `md5_val_${item.id.slice(-5)}`
                                    } : {
                                      status: item.state,
                                      message: 'Waiting for simulation worker to compile output...'
                                    }
                                  });
                                }}
                                className={`w-full text-left p-2 rounded font-mono text-[8px] border transition flex flex-col space-y-1 ${
                                  inspectedTaskId === item.id
                                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex justify-between items-center text-[7.5px]">
                                  <span className="font-bold text-slate-200 truncate max-w-[90px]">{item.agent}</span>
                                  <span className={`px-1 py-0.1 border rounded uppercase text-[6.5px] font-bold ${
                                    item.state === 'done' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                                    item.state === 'failed' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                                    item.state === 'processing' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10 animate-pulse' :
                                    'border-slate-700 text-slate-500'
                                  }`}>
                                    {item.state}
                                  </span>
                                </div>
                                <div className="text-white truncate font-black">{item.name}</div>
                                <div className="text-slate-500 text-[6.5px] flex justify-between">
                                  <span>{item.model}</span>
                                  <span>{item.timeStamp}</span>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Raw JSON panel */}
                          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-[7px] text-left max-h-56 overflow-y-auto flex flex-col justify-between">
                            <div>
                              <span className="text-[7.5px] font-black text-[#FFD700] block mb-1">TASK ID: {inspectedTask.id}</span>
                              <div className="border-b border-slate-800 pb-1 mb-1.5 text-slate-500">
                                <span>Agent: {inspectedTask.agent} • Model: {inspectedTask.model}</span>
                              </div>
                              <span className="text-blue-400 block font-bold text-[6.5px] uppercase">Input Header Payload</span>
                              <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap leading-tight mt-0.5 mb-2 bg-slate-950 p-1.5 rounded">
                                {JSON.stringify(inspectedTask.inputPayload || {}, null, 2)}
                              </pre>
                              
                              <span className="text-purple-400 block font-bold text-[6.5px] uppercase">Output Context Response</span>
                              <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap leading-tight mt-0.5 bg-slate-950 p-1.5 rounded">
                                {JSON.stringify(inspectedTask.outputPayload || {}, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[7.5px] text-slate-500">
                        <span>Inspect headers safely. No bearer secrets are written to public logs.</span>
                        <span className="text-blue-400">Sandbox ID: box_f923</span>
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* 4. EXPLOITATION TERMINAL STREAM (EXECUTION LOGS) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col h-[340px] space-y-2.5">
                
                {/* Search, Filter, Action controls inside logs section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-900 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-rose-500" />
                    <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">Security Sandbox Isolated Logs Terminal</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* Log level filter selector */}
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-1.5 py-1 rounded text-[8px] font-mono">
                      <Filter className="h-2.5 w-2.5 text-slate-500" />
                      <button 
                        onClick={() => setActiveLogLevel('ALL')} 
                        className={`px-1 py-0.5 rounded text-[7px] font-bold ${activeLogLevel === 'ALL' ? 'bg-rose-500/20 text-rose-400' : 'text-slate-400 hover:text-white'}`}
                      >
                        ALL
                      </button>
                      <button 
                        onClick={() => setActiveLogLevel('INFO')} 
                        className={`px-1 py-0.5 rounded text-[7px] font-bold ${activeLogLevel === 'INFO' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                      >
                        INFO
                      </button>
                      <button 
                        onClick={() => setActiveLogLevel('WARN')} 
                        className={`px-1 py-0.5 rounded text-[7px] font-bold ${activeLogLevel === 'WARN' ? 'bg-yellow-500/20 text-yellow-400' : 'text-slate-400 hover:text-white'}`}
                      >
                        WARN
                      </button>
                      <button 
                        onClick={() => setActiveLogLevel('ERROR')} 
                        className={`px-1 py-0.5 rounded text-[7px] font-bold ${activeLogLevel === 'ERROR' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`}
                      >
                        ERROR
                      </button>
                      <button 
                        onClick={() => setActiveLogLevel('DEBUG')} 
                        className={`px-1 py-0.5 rounded text-[7px] font-bold ${activeLogLevel === 'DEBUG' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white'}`}
                      >
                        DEBUG
                      </button>
                    </div>

                    {/* Full text Search log input */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search logs query..."
                        value={activeLogQuery}
                        onChange={(e) => setActiveLogQuery(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded text-[8px] font-mono text-slate-300 pl-4.5 pr-1.5 py-1 w-32 md:w-44 focus:outline-none focus:border-rose-500/60"
                      />
                      <Search className="h-2.5 w-2.5 text-slate-500 absolute left-1.5 top-1.5" />
                    </div>

                    {/* Actions button */}
                    <button
                      onClick={() => {
                        const randomLogs = [
                          { id: `log-${Date.now()}-1-${Math.random().toString(36).substr(2, 4)}`, timestamp: new Date().toLocaleTimeString(), level: 'WARN' as const, agent: 'Security Warden', message: 'Detecting standard high frequency API polling on news cluster.' },
                          { id: `log-${Date.now()}-2-${Math.random().toString(36).substr(2, 4)}`, timestamp: new Date().toLocaleTimeString(), level: 'DEBUG' as const, agent: 'Postgres DB', message: 'Executed database vacuum query. 0 dead rows pruned.' },
                          { id: `log-${Date.now()}-3-${Math.random().toString(36).substr(2, 4)}`, timestamp: new Date().toLocaleTimeString(), level: 'ERROR' as const, agent: 'System', message: 'API validation warning: Content-Type mismatch on webhook dispatcher.' }
                        ];
                        setTerminalLogs(prev => [...randomLogs, ...prev]);
                      }}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded text-[8px] font-mono hover:border-slate-600 transition"
                    >
                      Inject Mock Logs
                    </button>

                    <button
                      onClick={() => {
                        setTerminalLogs([]);
                      }}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded text-[8px] font-mono hover:border-slate-600 transition"
                    >
                      Clear Terminal
                    </button>

                    <button
                      onClick={() => {
                        const fileContent = terminalLogs.map(l => `[${l.timestamp}] [${l.level}] [${l.agent}] - ${l.message}`).join('\n');
                        navigator.clipboard.writeText(fileContent);
                        alert('Execution logs copied to clipboard successfully as TXT standard dump!');
                      }}
                      className="px-2 py-1 bg-rose-500/15 border border-rose-500/40 text-rose-300 hover:bg-rose-500/25 rounded text-[8px] font-mono flex items-center gap-1 transition"
                    >
                      <Download className="h-2.5 w-2.5" />
                      <span>Export Logs</span>
                    </button>
                  </div>
                </div>

                {/* Console list output */}
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2.5 font-mono text-[8px] leading-relaxed overflow-y-auto space-y-1 pr-1.5">
                  {filteredLogs.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                      No logs found matching query: "{activeLogQuery}" or filters.
                    </div>
                  ) : (
                    filteredLogs.map((log) => {
                      const levelColors = {
                        INFO: 'text-emerald-400 font-bold',
                        WARN: 'text-yellow-400 font-bold bg-yellow-400/5 px-1 rounded',
                        ERROR: 'text-red-400 font-bold bg-red-400/5 px-1 rounded border border-red-500/10 animate-pulse',
                        DEBUG: 'text-blue-400'
                      };
                      return (
                        <div key={log.id} className="hover:bg-slate-950/40 py-0.5 rounded flex items-start gap-1.5 transition">
                          <span className="text-slate-500 text-[7.5px] select-none">[{log.timestamp}]</span>
                          <span className={levelColors[log.level as keyof typeof levelColors] || 'text-slate-300'}>
                            [{log.level}]
                          </span>
                          <span className="text-[#FFD700] font-bold">[{log.agent}]:</span>
                          <span className="text-slate-200">{log.message}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="pt-2 border-t border-slate-900 text-[8.5px] text-slate-500 font-mono flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                  <span>SHA-256 Kernel sandbox encryption is active. Logs are buffered locally inside the preview container.</span>
                  <span className="text-emerald-500 font-bold">● System Core Firewall: SECURE ISO_MODE_5</span>
                </div>
              </div>

            </div>
          );
        })()}

        {/* ==========================================
            TAB: AGENT DIRECTORY & SANDBOX
           ========================================== */}
        {activeAgentSubTab === 'directory' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" id="agent-os-directory">
            
            {/* Left Column: List of Installed Agents */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col h-[580px]">
                
                {/* Search Installed */}
                <div className="mb-3 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-black">Installed Agents ({filteredAgentsList.length})</span>
                  <input
                    type="text"
                    placeholder="Cari agen berlisensi..."
                    value={searchAgentQuery}
                    onChange={(e) => setSearchAgentQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                {/* List Container */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {filteredAgentsList.length === 0 ? (
                    <div className="text-center p-8 text-slate-500 text-xs font-mono">Agen tidak ditemukan</div>
                  ) : (
                    filteredAgentsList.map((a) => {
                      const isSelected = selectedAgentId === a.id;
                      
                      // Check user role permission access simulation
                      let hasAccess = true;
                      let roleNote = '';
                      if (selectedUserRole === 'Guest') {
                        // Guest cannot see revenue, financial, or advertising agents
                        if (['financial', 'revenue', 'advertising', 'security'].includes(a.id)) {
                          hasAccess = false;
                          roleNote = 'LOCK: Guest Limit';
                        }
                      } else if (selectedUserRole === 'Member') {
                        if (['security', 'revenue'].includes(a.id)) {
                          hasAccess = false;
                          roleNote = 'LOCK: Member Limit';
                        }
                      } else if (selectedUserRole === 'Reporter') {
                        if (['financial', 'revenue'].includes(a.id)) {
                          hasAccess = false;
                          roleNote = 'LOCK: Editorial Only';
                        }
                      }

                      return (
                        <div
                          key={a.id}
                          onClick={() => hasAccess && setSelectedAgentId(a.id)}
                          className={`p-2 rounded-lg border text-left cursor-pointer transition relative group ${
                            !hasAccess 
                              ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                              : isSelected
                                ? 'bg-[#FFD700]/10 border-[#FFD700]/50 text-white'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{a.avatar}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-white block truncate">{a.name}</span>
                                {roleNote && (
                                  <span className="text-[7px] bg-rose-950 text-rose-400 border border-rose-900 px-1 py-0.2 rounded font-mono font-bold">{roleNote}</span>
                                )}
                              </div>
                              <span className="text-[8px] text-slate-400 font-mono block truncate uppercase">{a.role}</span>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center justify-between border-t border-slate-800/60 pt-1.5 text-[8px] font-mono">
                            <span className={`flex items-center gap-1 ${a.active ? 'text-teal-400' : 'text-slate-500'}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${a.active ? 'bg-teal-400 animate-ping' : 'bg-slate-500'}`}></span>
                              {a.active ? 'RUNNING' : 'OFFLINE'}
                            </span>
                            <span className="text-slate-500">Trigger: {a.trigger}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Appended Agent Marketplace Anchor */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-center">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Instalasi Agen Premium</span>
                  <a href="#marketplace-anchor" className="text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1">
                    <span>Lihat Marketplace Agen</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Active Agent Details (Sandbox Environment Configuration) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col min-h-[580px]">
                
                {/* Agent Header Details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl bg-slate-900 p-2 rounded-lg border border-slate-800 shadow">{currentSelectedAgent.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white">{currentSelectedAgent.name}</h3>
                        <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded font-bold border ${currentSelectedAgent.active ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' : 'bg-slate-500/10 text-slate-400 border-slate-500/30'}`}>
                          {currentSelectedAgent.active ? 'SANDBOX ACTIVE' : 'SANDBOX ISOLATED'}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{currentSelectedAgent.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="text-[10px] font-mono text-slate-400">Status Container:</span>
                    <button
                      onClick={() => handleToggleAgentActive(currentSelectedAgent.id)}
                      className={`px-3 py-1.5 rounded text-[10px] font-bold font-mono transition flex items-center gap-1.5 border uppercase ${
                        currentSelectedAgent.active
                          ? 'bg-rose-950 text-rose-400 border-rose-900/60 hover:bg-rose-900'
                          : 'bg-teal-950 text-teal-400 border-teal-900/60 hover:bg-teal-900'
                      }`}
                    >
                      {currentSelectedAgent.active ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      <span>{currentSelectedAgent.active ? 'Isolate Container' : 'Activate Container'}</span>
                    </button>
                  </div>
                </div>

                {/* Grid of details: Core Properties & Memories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  
                  {/* Column 1: Core Configuration (Interactive) */}
                  <div className="space-y-4">
                    
                    {/* Skills (Readonly for core list) */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-black block tracking-wider">Functional AI Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {currentSelectedAgent.skills.map((s, idx) => (
                          <span key={idx} className="text-[9px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Trigger & Schedules Configuration (Interactive) */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-3">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-black block tracking-wider">Schedule & Telemetry Triggers</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[8px] font-mono text-slate-400 uppercase">Schedule Method:</label>
                          <select 
                            value={currentSelectedAgent.schedule}
                            onChange={(e) => {
                              const updated = [...agents];
                              const idx = updated.findIndex(a => a.id === currentSelectedAgent.id);
                              if (idx !== -1) updated[idx].schedule = e.target.value;
                              setAgents(updated);
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded text-[9px] font-mono text-white p-1"
                          >
                            <option value="Real-time">Real-time Stream</option>
                            <option value="Hourly">Hourly Check</option>
                            <option value="Daily">Daily Summary Check</option>
                            <option value="Weekly">Weekly Summary Check</option>
                            <option value="Monthly">Monthly Accounting Cycle</option>
                            <option value="Cron">Cron Custom Pipeline</option>
                            <option value="Manual">Manual Event Execution</option>
                            <option value="Webhook">External Webhook Call</option>
                            <option value="Event Driven">Event Driven Broker</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[8px] font-mono text-slate-400 uppercase">Trigger Event:</label>
                          <select 
                            value={currentSelectedAgent.trigger}
                            onChange={(e) => {
                              const updated = [...agents];
                              const idx = updated.findIndex(a => a.id === currentSelectedAgent.id);
                              if (idx !== -1) updated[idx].trigger = e.target.value;
                              setAgents(updated);
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded text-[9px] font-mono text-white p-1"
                          >
                            <option value="Artikel Baru Dipublish">Artikel Baru Dipublish</option>
                            <option value="Manual">Manual Triggered Only</option>
                            <option value="Setiap jam">Setiap Jam (Cron hourly)</option>
                            <option value="Sentiment Alert Threshold">Sentiment Alert Threshold</option>
                            <option value="Crisis Flagged">Crisis Flagged Event</option>
                            <option value="Billing Threshold Breached">Billing Threshold Breached</option>
                            <option value="New Member Signup">New Member Signup</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Authorized Permissions and Tools Gate (Checklist) */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-3">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-black block tracking-wider">Security Access & Tools Authorized</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono text-slate-500 uppercase block">Authorized Tools:</span>
                          <div className="space-y-1 font-mono text-[9px]">
                            {['CMS API', 'SEO Analyzer', 'Google Translate', 'Grammar Checker', 'Search Engine', 'Database Portal', 'PDF Parser', 'Maps API'].map((tool, idx) => {
                              const isAuthed = currentSelectedAgent.tools.includes(tool);
                              return (
                                <label key={idx} className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    checked={isAuthed}
                                    onChange={() => {
                                      const updated = [...agents];
                                      const aIdx = updated.findIndex(a => a.id === currentSelectedAgent.id);
                                      if (aIdx !== -1) {
                                        const tools = currentSelectedAgent.tools;
                                        updated[aIdx].tools = tools.includes(tool) 
                                          ? tools.filter(t => t !== tool) 
                                          : [...tools, tool];
                                      }
                                      setAgents(updated);
                                    }}
                                    className="rounded bg-slate-950 border-slate-700 focus:ring-0 text-amber-500"
                                  />
                                  <span className={isAuthed ? 'text-white font-bold' : 'text-slate-500'}>{tool}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[8px] font-mono text-slate-500 uppercase block">Privilege Flags:</span>
                          <div className="space-y-1 font-mono text-[9px]">
                            {['CMS_WRITE', 'CMS_PUBLISH', 'TRANSLATE_SERVICE', 'RESEARCH_VIEW', 'COMPLIANCE_CHECK', 'SECURITY_AUDIT', 'DB_READ', 'REVENUE_ADMIN'].map((p, idx) => {
                              const isGranted = currentSelectedAgent.permissions.includes(p);
                              return (
                                <label key={idx} className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    checked={isGranted}
                                    onChange={() => {
                                      const updated = [...agents];
                                      const aIdx = updated.findIndex(a => a.id === currentSelectedAgent.id);
                                      if (aIdx !== -1) {
                                        const permissions = currentSelectedAgent.permissions;
                                        updated[aIdx].permissions = permissions.includes(p) 
                                          ? permissions.filter(perm => perm !== p) 
                                          : [...permissions, p];
                                      }
                                      setAgents(updated);
                                    }}
                                    className="rounded bg-slate-950 border-slate-700 focus:ring-0 text-indigo-500"
                                  />
                                  <span className={isGranted ? 'text-indigo-300 font-bold' : 'text-slate-500'}>{p}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Column 2: Memory Engines & API Endpoints (Interactive) */}
                  <div className="space-y-4">
                    
                    {/* Memory Controller Panel */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex flex-col h-[280px]">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-black block tracking-wider mb-2">Cognitive Memory Engines</span>
                      
                      {/* Sub-tabs for Memory Selectors */}
                      <div className="flex flex-wrap gap-1 mb-2 bg-slate-950 p-1 rounded border border-slate-800">
                        {(['short', 'long', 'conversation', 'knowledge', 'workspace', 'project'] as const).map((mtype) => (
                          <button
                            key={mtype}
                            onClick={() => setActiveMemoryTab(mtype)}
                            className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition ${
                              activeMemoryTab === mtype
                                ? 'bg-amber-500 text-slate-950'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {mtype}
                          </button>
                        ))}
                      </div>

                      {/* Interactive TextArea Memory Editor */}
                      <div className="flex-1 flex flex-col space-y-2">
                        <textarea
                          value={currentSelectedAgent.memory[activeMemoryTab] || ''}
                          onChange={(e) => handleUpdateMemory(currentSelectedAgent.id, activeMemoryTab, e.target.value)}
                          className="w-full flex-1 bg-slate-950 border border-slate-800 rounded p-2 text-[10px] text-slate-200 focus:outline-none focus:border-teal-500 font-mono resize-none"
                          placeholder={`Isi naskah cognitive database bagi ${activeMemoryTab} memory...`}
                        />
                        <div className="text-[8px] text-slate-500 font-mono flex justify-between items-center">
                          <span>Konteks memori otomatis dipertahankan oleh AI Sandbox.</span>
                          <span className="text-emerald-400 font-bold">● Live Sync</span>
                        </div>
                      </div>
                    </div>

                    {/* API Endpoints & Code Snippets Generation */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider">Isolated Container API Integration</span>
                        <Terminal className="h-3.5 w-3.5 text-slate-400" />
                      </div>

                      <div className="bg-slate-950 rounded p-2 text-[8px] font-mono text-slate-300 relative space-y-1 border border-slate-850">
                        <div className="absolute top-2 right-2 flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyCode(`curl -X POST "https://api.infobos.com/v1/agents/${currentSelectedAgent.id}/run" \\\n  -H "Authorization: Bearer INTEL_OS_${currentSelectedAgent.id.toUpperCase()}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"prompt": "Sync Jabar breaking"}'`, 'curl')}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white p-1 rounded border border-slate-800"
                            title="Salin cURL"
                          >
                            {copiedText === 'curl' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                        <span className="text-[#FFD700] uppercase font-bold block mb-1">Generated Endpoint Snippet:</span>
                        <code className="block whitespace-pre-wrap leading-normal">
                          {`# POST Endpoint Run Request\n`}
                          {`curl -X POST "https://api.infobos.com/v1/agents/${currentSelectedAgent.id}/run" \\\n`}
                          {`  -H "Authorization: Bearer INTEL_OS_${currentSelectedAgent.id.toUpperCase()}" \\\n`}
                          {`  -H "Content-Type: application/json" \\\n`}
                          {`  -d '{"prompt": "Integrasikan data Jabar Jurnal"}'`}
                        </code>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Sub-section: Agent Marketplace Selector Anchor */}
            <div className="lg:col-span-12 pt-4 border-t border-slate-800" id="marketplace-anchor">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xs font-black text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-amber-500 animate-pulse" />
                      <span>Premium Uninstalled Agent Marketplace</span>
                    </h3>
                    <p className="text-[9px] text-slate-400 font-mono">Extend enterprise features dynamically by installing secure isolated container modules</p>
                  </div>

                  <input
                    type="text"
                    placeholder="Cari agen marketplace..."
                    value={marketplaceSearchQuery}
                    onChange={(e) => setMarketplaceSearchQuery(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono w-full md:w-64"
                  />
                </div>

                {/* Progress bar container for active installation */}
                {installingAgentId !== null && (
                  <div className="bg-slate-900 border border-amber-500/20 p-3 rounded-lg flex flex-col space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="text-amber-400 font-bold animate-pulse">⚙️ INSTALLING CONTAINER FOR: {marketplacePool.find(p => p.id === installingAgentId)?.name.toUpperCase()}</span>
                      <span>{installProgress}% COMPLETED</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full transition-all duration-300" style={{ width: `${installProgress}%` }}></div>
                    </div>
                    <p className="text-[8px] font-mono text-slate-500 text-right">Provisioning isolated Linux kernel sandbox & generating standard MCP interface logs...</p>
                  </div>
                )}

                {/* Marketplace pool grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                  {availableMarketplacePool.map((p) => (
                    <div key={p.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg p-3 flex flex-col justify-between space-y-3 transition">
                      <div className="space-y-2 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{p.avatar}</span>
                          <div>
                            <span className="font-bold text-xs text-white block truncate">{p.name}</span>
                            <span className="text-[8px] text-slate-400 font-mono block uppercase truncate">{p.role}</span>
                          </div>
                        </div>

                        <div className="text-[8px] font-mono text-slate-400 leading-relaxed border-t border-slate-800/60 pt-1.5">
                          <strong>Skills:</strong> {p.skills.slice(0, 2).join(', ')}...
                        </div>
                        <div className="text-[8px] font-mono text-slate-500">
                          <strong>KB Connections:</strong> {p.kb.join(', ')}
                        </div>
                      </div>

                      <button
                        onClick={() => handleInstallAgent(p.id)}
                        disabled={installingAgentId !== null}
                        className={`w-full py-1.5 rounded text-[9px] font-bold font-mono border transition ${
                          installingAgentId !== null
                            ? 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-500 hover:border-amber-400'
                        }`}
                      >
                        {installingAgentId !== null ? 'Queue Locked' : 'Install dynamically'}
                      </button>
                    </div>
                  ))}
                  {availableMarketplacePool.length === 0 && (
                    <div className="col-span-full text-center py-6 text-slate-500 text-xs font-mono">Semua agen marketplace telah terpasang ke direktori sandbox!</div>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            TAB: AUTOMATION WORKFLOW BUILDER 
           ========================================== */}
        {activeAgentSubTab === 'automation' && (
          <div className="space-y-4" id="agent-os-automation">
            
            {/* Template Selector Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-white font-mono uppercase">
                  <GitBranch className="h-4 w-4 text-amber-500" />
                  <span>Pipeline Naming & Templates Loader</span>
                </div>
                <input
                  type="text"
                  value={customWorkflowName}
                  onChange={(e) => setCustomWorkflowName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono w-full md:w-96"
                />
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="text-[9px] font-mono text-slate-400 uppercase">Pre-built Blueprints:</span>
                <div className="flex gap-1.5">
                  <button onClick={() => handleSelectTemplate('news')} className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-bold font-mono px-2 py-1 rounded border border-slate-800">Breaking News Feed</button>
                  <button onClick={() => handleSelectTemplate('seo')} className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-bold font-mono px-2 py-1 rounded border border-slate-800">SEO Keyword Audit</button>
                  <button onClick={() => handleSelectTemplate('billing')} className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-bold font-mono px-2 py-1 rounded border border-slate-800">Billing Overdue Reminder</button>
                </div>
              </div>
            </div>

            {/* Core Interactive Workflow Board Canvas */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
              
              {/* Visual pipeline canvas editor column */}
              <div className="xl:col-span-3 bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col min-h-[480px]">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <h3 className="text-xs font-black text-white font-mono uppercase tracking-wider">Visual Pipeline Blueprint Nodes</h3>
                    <p className="text-[9px] text-slate-400 font-mono">Order of actions representing trigger check logic to human-in-the-loop audit gates</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddWorkflowStep}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-[9px] font-bold font-mono text-white flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3 text-amber-500" />
                      <span>Add Step</span>
                    </button>

                    <button
                      onClick={() => {
                        setWorkflowTesting(prev => !prev);
                        setActiveTestStep(-1);
                      }}
                      className={`px-3 py-1 rounded text-[9px] font-bold font-mono transition flex items-center gap-1.5 border uppercase ${
                        workflowTesting
                          ? 'bg-rose-950 text-rose-400 border-rose-900/60 hover:bg-rose-900'
                          : 'bg-amber-500 text-slate-950 border-amber-500 hover:bg-amber-400 hover:border-amber-400'
                      }`}
                    >
                      {workflowTesting ? <Pause className="h-3 w-3 animate-pulse" /> : <Play className="h-3 w-3" />}
                      <span>{workflowTesting ? 'Stop Debug' : 'Debug Simulation'}</span>
                    </button>
                  </div>
                </div>

                {/* Workflow debugger simulated Human in the loop Pause message block */}
                {workflowTesting && activeTestStep !== -1 && workflowNodes[activeTestStep]?.type === 'approval' && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-amber-500/10 border border-amber-500/40 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldAlert className="h-5 w-5 text-amber-400 animate-bounce" />
                      <div>
                        <span className="text-[10px] font-black font-mono text-amber-400 block uppercase">⚠️ HUMAN-IN-THE-LOOP CONTROL GATE TRIGGERED</span>
                        <p className="text-[9px] text-slate-300 font-mono">The pipeline is paused in sandbox. Awaiting manual manager review verification check before firing external endpoints.</p>
                      </div>
                    </div>

                    <button
                      onClick={handleApproveHumanInLoop}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-[9px] px-3 py-1.5 rounded shadow border border-amber-400/30 uppercase self-start md:self-auto"
                    >
                      Approve & Resume Pipeline
                    </button>
                  </motion.div>
                )}

                {/* Vertical interactive list representing workflow nodes */}
                <div className="flex flex-col items-center space-y-3 py-2 flex-1 justify-center max-w-xl mx-auto w-full">
                  {workflowNodes.map((node, index) => {
                    const isStepActive = workflowTesting && activeTestStep === index;
                    const isTrigger = node.type === 'trigger';
                    const isEnd = node.type === 'end';
                    const isApproval = node.type === 'approval';
                    const isAI = node.type === 'ai';

                    return (
                      <React.Fragment key={node.id}>
                        {/* Connecting arrow block except first trigger */}
                        {index > 0 && (
                          <div className="h-3.5 flex flex-col justify-between items-center opacity-70">
                            <span className="h-3 w-0.5 bg-slate-700"></span>
                            <span className="text-[8px] text-slate-500">↓</span>
                          </div>
                        )}

                        <div 
                          className={`w-full p-2.5 rounded-lg border text-left transition flex items-center justify-between relative group ${
                            isStepActive 
                              ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.02]'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded font-bold font-mono text-[9px] border ${
                              isTrigger 
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                : isEnd 
                                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                  : isApproval
                                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 font-black animate-pulse'
                                    : isAI
                                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 font-semibold'
                                      : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                              {node.type.toUpperCase()}
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-white block truncate">{node.label}</span>
                              <span className="text-[8px] text-slate-500 font-mono block truncate">{node.config}</span>
                            </div>
                          </div>

                          {/* Quick interactive parameters change modal triggers */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingNodeId(node.id);
                                setEditingNodeLabel(node.label);
                                setEditingNodeConfig(node.config);
                              }}
                              className="text-slate-500 hover:text-white text-[8px] font-mono hover:underline opacity-0 group-hover:opacity-100 transition"
                            >
                              Edit parameters
                            </button>

                            {!isTrigger && !isEnd && (
                              <button
                                onClick={() => handleRemoveWorkflowStep(node.id)}
                                className="text-slate-500 hover:text-rose-400 p-0.5 opacity-0 group-hover:opacity-100 transition rounded"
                                title="Delete node"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>

                          {/* Debug Highlight Pointer */}
                          {isStepActive && (
                            <div className="absolute -left-2 top-3 w-1.5 h-3.5 bg-amber-500 rounded animate-ping"></div>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

              </div>

              {/* Step Editor Parameter Configuration Pane Column */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col h-full space-y-3">
                <span className="text-xs font-black text-white font-mono uppercase tracking-wider border-b border-slate-800 pb-2">Step Configuration</span>
                
                {editingNodeId ? (
                  <div className="space-y-3 text-left">
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-400 uppercase block">Step Label Name:</label>
                      <input
                        type="text"
                        value={editingNodeLabel}
                        onChange={(e) => setEditingNodeLabel(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-400 uppercase block">JSON Schema Parameters / Details:</label>
                      <textarea
                        value={editingNodeConfig}
                        onChange={(e) => setEditingNodeConfig(e.target.value)}
                        className="w-full h-32 bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono resize-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setWorkflowNodes(prev => prev.map(n => n.id === editingNodeId ? { ...n, label: editingNodeLabel, config: editingNodeConfig } : n));
                          setEditingNodeId(null);
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-[9px] px-3 py-1.5 rounded transition flex-1"
                      >
                        Save Parameter
                      </button>
                      <button
                        onClick={() => setEditingNodeId(null)}
                        className="bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 text-[9px] px-3 py-1.5 rounded transition font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 text-slate-500 text-xs font-mono py-20 leading-relaxed border border-dashed border-slate-800 rounded">
                    Klik "Edit parameters" pada langkah mana saja di sebelah kiri untuk menyesuaikan parameter pipeline
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            TAB: MULTI-AGENT ORCHESTRATOR
           ========================================== */}
        {activeAgentSubTab === 'orchestrator' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4" id="agent-os-orchestrator">
            
            {/* Left Prompt Column */}
            <div className="xl:col-span-1 bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col h-[520px]">
              <span className="text-xs font-black text-white font-mono uppercase tracking-wider border-b border-slate-800 pb-2 mb-3">Orchestrate Multi-Agent Flow</span>
              
              <div className="flex-1 flex flex-col space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-[8px] font-mono text-slate-400 uppercase block">Intelligent Network Instruction:</label>
                  <textarea
                    value={orchestratorPrompt}
                    onChange={(e) => setOrchestratorPrompt(e.target.value)}
                    className="w-full h-40 bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono resize-none leading-relaxed"
                    placeholder="Masukkan instruksi kolaborasi multi-agen..."
                  />
                </div>

                {/* Example prompt list buttons */}
                <div className="space-y-1.5">
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">Example Scenarios:</span>
                  {[
                    { label: 'Breaking News Distribution (Dago)', text: 'Minta Research Agent cari info startup Bandung, kumpulkan ke SEO Agent untuk buat metatags, lalu buat berita via Editorial Agent dan posting di Social Media Agent.' },
                    { label: 'APBD Fiscal Tax Compliance', text: 'Minta Research Agent evaluasi PMK Sri Mulyani, serahkan ke Legal Agent untuk audit regulasi Jawa Barat, kumpulkan ke Financial Agent untuk sinkronisasi anggaran, lalu buat siaran pers via Editorial.' }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOrchestratorPrompt(preset.text)}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-left p-2 rounded text-[8px] text-slate-300 font-mono border border-slate-800 transition block leading-normal hover:border-slate-750"
                    >
                      <strong>{preset.label}:</strong> "{preset.text.slice(0, 60)}..."
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleOrchestrate}
                  disabled={isOrchestrating}
                  className={`w-full py-2.5 rounded text-xs font-black font-mono border transition uppercase flex items-center justify-center gap-1.5 ${
                    isOrchestrating
                      ? 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-500 hover:border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  }`}
                >
                  {isOrchestrating ? <RefreshCw className="h-4 w-4 animate-spin text-slate-600" /> : <Sparkles className="h-4 w-4" />}
                  <span>{isOrchestrating ? 'Executing Orchestration Flow...' : 'Execute AI Orchestration'}</span>
                </button>
              </div>
            </div>

            {/* Right Simulation Flowchart Visual Graph Column */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col h-[520px]">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="text-xs font-black text-white font-mono uppercase tracking-wider">Multi-Agent Communication Sandbox</h3>
                  <p className="text-[9px] text-slate-400 font-mono">Simultaneous context sharing protocol for modular enterprise systems</p>
                </div>

                {isOrchestrating && (
                  <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono uppercase animate-pulse">Computing Token Nodes...</span>
                )}
              </div>

              {/* Visualization Canvas Grid Layout mapping active communication loops */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                
                {/* Visual Communication Logs Section */}
                <div className="md:col-span-2 overflow-y-auto space-y-2 pr-1 border border-slate-850 bg-slate-900/40 p-3 rounded-lg font-mono text-[9px] text-left">
                  {orchestrationLogs.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 leading-normal flex flex-col items-center justify-center h-full">
                      <Terminal className="h-8 w-8 text-slate-700 mb-2" />
                      <span>Masukan Prompt instruksi di sebelah kiri, lalu klik "Execute AI Orchestration" untuk melihat visualisasi pertukaran konteks multi-agen.</span>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {orchestrationLogs.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-2 rounded border transition flex flex-col space-y-1 text-left ${
                            log.status === 'working'
                              ? 'bg-amber-500/10 border-amber-500/40 shadow'
                              : log.status === 'done'
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                                : 'bg-slate-900 border-slate-850 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[8px]">
                            <span className="font-bold text-white flex items-center gap-1">
                              <span className="text-sm">{log.avatar}</span>
                              <span className="text-amber-400">{log.agent}</span>
                            </span>
                            <span className="text-slate-500">{log.timestamp}</span>
                          </div>
                          <p className="text-slate-200 text-[9px] leading-relaxed font-sans">{log.message}</p>
                          <div className="flex items-center justify-between text-[8px] border-t border-slate-800/60 pt-1 text-slate-500">
                            <span>Status: {log.status.toUpperCase()}</span>
                            <span>Token Consumption Safe</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* Vertical mini visual map of active nodes */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-center space-y-4">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block text-center mb-1">Active Network Topology</span>
                  
                  {[
                    { id: '1', label: 'Research Agent', avatar: '🔬' },
                    { id: '2', label: 'SEO Agent', avatar: '🔍' },
                    { id: '3', label: 'Editorial Agent', avatar: '✍️' },
                    { id: '4', label: 'Social Media Agent', avatar: '📱' },
                    { id: '5', label: 'Analytics Agent', avatar: '📈' }
                  ].map((node, index) => {
                    const activeLog = orchestrationLogs.find(l => l.id === node.id);
                    const isNodeActive = activeLog?.status === 'working';
                    const isNodeDone = activeLog?.status === 'done';

                    return (
                      <div 
                        key={node.id} 
                        className={`p-1.5 rounded-lg border text-center transition flex items-center gap-2 font-mono text-[9px] ${
                          isNodeActive 
                            ? 'bg-amber-500/25 border-amber-500 text-yellow-300 shadow-[0_0_10px_rgba(245,158,11,0.2)] font-black'
                            : isNodeDone
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-900 border-slate-850 text-slate-500'
                        }`}
                      >
                        <span className="text-base">{node.avatar}</span>
                        <div className="text-left flex-1 truncate">
                          <span className="block truncate">{node.label}</span>
                          <span className="text-[7px] text-slate-400 uppercase">
                            {isNodeActive ? 'RUNNING' : isNodeDone ? 'DONE' : 'STANDBY'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            TAB: MODEL CONTEXT PROTOCOL (MCP) GATEWAY
           ========================================== */}
        {activeAgentSubTab === 'mcp' && (
          <div className="space-y-4" id="agent-os-mcp">
            
            {/* Standardized protocol summary header */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-left">
              <span className="text-xs font-black text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Database className="h-4 w-4 text-[#FFD700]" />
                <span>Standardized Model Context Protocol (MCP) Integration Specification</span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono mt-1 leading-relaxed">
                Model Context Protocol (MCP) adalah standar arsitektur terpadu bagi berbagi data berkeamanan tinggi antara kontainer AI Agent terisolasi dengan basis data internal (Internal Knowledge Bases) dan API pihak ketiga eksternal. Semua kunci autentikasi terenkripsi dalam sandbox.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              
              {/* Internal MCP servers controller list */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col h-[420px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-xs font-black text-white font-mono uppercase">Internal Local MCP Servers ({Object.keys(mcpServers).length})</span>
                  <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">Local Host Safe</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {[
                    { key: 'cms', label: 'INFOBOS CMS Local Server', path: 'localhost:8000/api/v1/mcp/cms', desc: 'Allows Editorial Agents to write, edit and delete articles inside Jurnal INFOBOS.' },
                    { key: 'news', label: 'News Crawler Feed Engine', path: 'localhost:8000/api/v1/mcp/news', desc: 'Provides active scrapers and polling feeds with real-time news caches.' },
                    { key: 'knowledge-graph', label: 'Knowledge Graph Semantic database', path: 'localhost:8120/api/v1/mcp/kg', desc: 'Allows Research and AI Agents to query entities, links and demographic nodes.' },
                    { key: 'geo-os', label: 'GeoOS demographic mapping gateway', path: 'localhost:8032/api/v1/mcp/geo', desc: 'Provides regional coordinates, land boundaries and climate/weather caches.' },
                    { key: 'revenue-os', label: 'RevenueOS transaction tracker', path: 'localhost:8044/api/v1/mcp/revenue', desc: 'Integrates secure billing, subscription checks, and e-com catalog tables.' },
                    { key: 'monitoring', label: 'Crisis & Brand Monitoring watchdog', path: 'localhost:8250/api/v1/mcp/brand', desc: 'Active scanning of public comments, Twitter APIs and sentiment indices.' },
                    { key: 'analytics', label: 'Analytics Telemetry aggregator', path: 'localhost:8060/api/v1/mcp/stat', desc: 'Tracks CPU load, token efficiency and latency indexes across clusters.' }
                  ].map((server) => {
                    const isConnected = mcpServers[server.key];
                    return (
                      <div key={server.key} className="bg-slate-900 border border-slate-800 p-2.5 rounded flex items-center justify-between gap-4 text-left">
                        <div className="flex-1 min-w-0 font-mono text-[9px]">
                          <span className="font-bold text-white block">{server.label}</span>
                          <span className="text-slate-500 block text-[8px] truncate">{server.path}</span>
                          <p className="text-slate-400 text-[8px] mt-1 leading-normal font-sans">{server.desc}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-mono font-black ${isConnected ? 'text-teal-400' : 'text-slate-500'}`}>
                            {isConnected ? 'CONNECTED' : 'STANDBY'}
                          </span>
                          <button
                            onClick={() => {
                              setMcpServers(prev => ({ ...prev, [server.key]: !prev[server.key] }));
                            }}
                            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none border ${
                              isConnected ? 'bg-teal-500/20 border-teal-500/50' : 'bg-slate-950 border-slate-800'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full transition-transform duration-200 ${
                              isConnected ? 'bg-teal-400 translate-x-6' : 'bg-slate-600 translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* External secure connectors & OAuth paths */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col h-[420px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-xs font-black text-white font-mono uppercase">External Connectors & OAuth Scopes ({Object.keys(mcpConnectors).length})</span>
                  <span className="text-[8px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">OAuth 2.0 Encrypted</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {[
                    { key: 'google-workspace', label: 'Google Workspace Connector', scope: 'https://www.googleapis.com/auth/calendar.readonly', desc: 'Allows HR Agents to read/write calendars and Docs files.' },
                    { key: 'slack', label: 'Slack Webhook Gateway', scope: 'channels:write, chat:write:bot', desc: 'Enables automatic pipeline posting of summaries to workspace channels.' },
                    { key: 'github', label: 'GitHub Repositories integration', scope: 'repo:read, workflow:write', desc: 'Read documentation markdown and trigger actions upon commit hooks.' },
                    { key: 'weather-api', label: 'BMKG / OpenWeather official API', scope: 'global_coordinates_mapping', desc: 'Provides hourly precision geo weather, storm indices and geophysics.' },
                    { key: 'gov-opendata', label: 'Government Open Data Portal', scope: 'apbd_regional_data_read', desc: 'Provides official regional budget datasets and tax code indexes.' },
                    { key: 'payment-gateway', label: 'Stripe Billing webhooks sync', scope: 'billing_read_write_events', desc: 'Securely sync unpaid invoice thresholds with the Billing Pipeline.' }
                  ].map((connector) => {
                    const isConnected = mcpConnectors[connector.key];
                    return (
                      <div key={connector.key} className="bg-slate-900 border border-slate-800 p-2.5 rounded flex items-center justify-between gap-4 text-left">
                        <div className="flex-1 min-w-0 font-mono text-[9px]">
                          <span className="font-bold text-white block">{connector.label}</span>
                          <span className="text-indigo-400 block text-[7px] truncate font-bold">{connector.scope}</span>
                          <p className="text-slate-400 text-[8px] mt-1 leading-normal font-sans">{connector.desc}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-mono font-black ${isConnected ? 'text-indigo-400' : 'text-slate-500'}`}>
                            {isConnected ? 'AUTHORIZED' : 'LOCKED'}
                          </span>
                          <button
                            onClick={() => {
                              setMcpConnectors(prev => ({ ...prev, [connector.key]: !prev[connector.key] }));
                            }}
                            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none border ${
                              isConnected ? 'bg-indigo-500/20 border-indigo-500/50' : 'bg-slate-950 border-slate-800'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full transition-transform duration-200 ${
                              isConnected ? 'bg-indigo-400 translate-x-6' : 'bg-slate-600 translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            TAB: LOGS & Telemetry Sandbox 
           ========================================== */}
        {activeAgentSubTab === 'logs' && (
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col h-[520px]" id="agent-os-logs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-black text-white font-mono uppercase flex items-center gap-1.5">
                <History className="h-4 w-4 text-rose-500" />
                <span>Isolated Security Sandbox Execution logs (Audit Trail)</span>
              </span>
              <span className="text-[8px] bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded font-mono uppercase font-black">Strict Enforcement Mode</span>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left font-mono text-[9px] min-w-[700px] divide-y divide-slate-850">
                <thead className="bg-slate-900 text-slate-400 uppercase">
                  <tr>
                    <th className="p-2 border-b border-slate-800">Timestamp</th>
                    <th className="p-2 border-b border-slate-800">Agent Container</th>
                    <th className="p-2 border-b border-slate-800">Isolation Command Action</th>
                    <th className="p-2 border-b border-slate-800">Script Verification Hash details</th>
                    <th className="p-2 border-b border-slate-800 text-right">Protection status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/60 text-slate-300">
                  {agentAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/40">
                      <td className="p-2 text-slate-500 text-[8px]">{log.timestamp}</td>
                      <td className="p-2 font-bold text-[#FFD700]">{log.agent}</td>
                      <td className="p-2 font-bold uppercase">{log.action}</td>
                      <td className="p-2 text-slate-400 leading-normal">{log.detail}</td>
                      <td className="p-2 text-right">
                        <span className={`text-[8px] px-1.5 py-0.2 rounded font-black border uppercase ${
                          log.status === 'success'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : log.status === 'warning'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        }`}>
                          {log.status === 'success' ? 'SANDBOX_OK' : log.status === 'warning' ? 'SANDBOX_WARN' : 'SANDBOX_INFO'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-900 text-[8px] text-slate-500 font-mono flex flex-col md:flex-row md:items-center justify-between gap-2">
              <span>Semua panggilan API terdaftar dan diaudit secara real-time berdasarkan SHA-256 hash sandbox.</span>
              <span className="text-emerald-400 font-bold">● Firewall: 100% Secure Kernel Isolation</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
