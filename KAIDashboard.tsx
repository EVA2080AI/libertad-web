// KAI Dashboard - Autonomous AI Control Center
import { useState, useEffect } from 'react';
import { Brain, Zap, Activity, TrendingUp, Cpu, Settings, Play, Pause, RefreshCw, GitBranch } from 'lucide-react';

// Types
interface KAIState {
  level: number;
  cycles: number;
  totalEarned: number;
  active: boolean;
  autonomous: boolean;
}

interface Agent {
  id: string;
  name: string;
  icon: string;
  role: string;
  status: 'working' | 'idle' | 'learning';
  tasks: number;
  efficiency: number;
}

// Initial state
const initialKAI: KAIState = {
  level: 1,
  cycles: 0,
  totalEarned: 0,
  active: true,
  autonomous: false
};

const initialAgents: Agent[] = [
  { id: '1', name: 'KAI Director', icon: '🤖', role: 'Gestión y decisiones', status: 'working', tasks: 24, efficiency: 95 },
  { id: '2', name: 'KAI Trader', icon: '📈', role: 'Trading Binance', status: 'idle', tasks: 0, efficiency: 88 },
  { id: '3', name: 'KAI Airdrop', icon: '🎯', role: 'Cazar airdrops', status: 'working', tasks: 12, efficiency: 92 },
  { id: '4', name: 'KAI Fullstack', icon: '💻', role: 'Desarrollo fullstack', status: 'working', tasks: 8, efficiency: 90 },
  { id: '5', name: 'KAI UX/UI', icon: '🎨', role: 'Diseño interfaces', status: 'idle', tasks: 3, efficiency: 85 },
  { id: '6', name: 'KAI Affiliate', icon: '🔗', role: 'Marketing y referidos', status: 'working', tasks: 15, efficiency: 87 },
];

export default function KAIDashboard() {
  const [kai, setKai] = useState<KAIState>(initialKAI);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [logs, setLogs] = useState<string[]>([]);
  const [autoProgramEnabled, setAutoProgramEnabled] = useState(false);

  // KAI Life Loop
  useEffect(() => {
    if (!kai.autonomous) return;

    const interval = setInterval(() => {
      // Increment cycles
      setKai(prev => ({
        ...prev,
        cycles: prev.cycles + 1,
        level: Math.min(prev.cycles / 5 + 1, 10)
      }));

      // Update agents
      setAgents(prev => prev.map(agent => ({
        ...agent,
        tasks: agent.status === 'working' ? agent.tasks + Math.floor(Math.random() * 3) : agent.tasks,
        efficiency: Math.min(100, agent.efficiency + Math.random() * 0.5)
      })));

      // Generate random income
      if (Math.random() > 0.7) {
        const income = Math.random() * 0.5;
        setKai(prev => ({ ...prev, totalEarned: prev.totalEarned + income }));
        addLog(`💰 Income: +$${income.toFixed(2)}`);
      }

      addLog(`🔄 Cycle ${kai.cycles + 1} completed`);
    }, 3000);

    return () => clearInterval(interval);
  }, [kai.autonomous, kai.cycles]);

  // Auto-Programming Loop
  useEffect(() => {
    if (!autoProgramEnabled) return;

    const interval = setInterval(() => {
      const improvements = [
        'Optimizing trade algorithm',
        'Improving agent efficiency',
        'Updating security protocols',
        'Learning new patterns',
        'Optimizing database queries',
        'Improving response time'
      ];
      const improvement = improvements[Math.floor(Math.random() * improvements.length)];
      addLog(`⚡ Auto-Program: ${improvement}`);
      
      setKai(prev => ({
        ...prev,
        level: Math.min(prev.level + 0.05, 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoProgramEnabled]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const toggleAutonomous = () => {
    setKai(prev => ({ ...prev, autonomous: !prev.autonomous }));
    addLog(prev => prev.autonomous ? '⚠️ Autonomy DISABLED' : '✅ Autonomy ENABLED');
  };

  const spawnAgent = () => {
    const names = ['Bot', 'Helper', 'Worker', 'Assistant'];
    const name = names[Math.floor(Math.random() * names.length)] + (agents.length + 1);
    const newAgent: Agent = {
      id: String(agents.length + 1),
      name: `KAI ${name}`,
      icon: ['🤖', '🦾', '🔧', '⚙️'][Math.floor(Math.random() * 4)],
      role: 'Autonomous Worker',
      status: 'working',
      tasks: 0,
      efficiency: 75
    };
    setAgents(prev => [...prev, newAgent]);
    addLog(`🌱 New agent spawned: ${newAgent.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">KAI Control Center</h1>
            <p className="text-slate-400">Autonomous AI Agent Management</p>
          </div>
        </div>
        
        <button
          onClick={toggleAutonomous}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
            kai.autonomous 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-emerald-500 hover:bg-emerald-600'
          } text-white`}
        >
          {kai.autonomous ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {kai.autonomous ? 'STOP AUTONOMY' : 'START AUTONOMY'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<Cpu className="w-6 h-6" />}
          label="Level"
          value={kai.level.toFixed(1)}
          color="emerald"
        />
        <StatCard 
          icon={<RefreshCw className="w-6 h-6" />}
          label="Cycles"
          value={kai.cycles}
          color="cyan"
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          label="Earned"
          value={`$${kai.totalEarned.toFixed(2)}`}
          color="amber"
        />
        <StatCard 
          icon={<Activity className="w-6 h-6" />}
          label="Agents"
          value={agents.length}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Agents Panel */}
        <div className="col-span-2 bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-400" />
              KAI Agents
            </h2>
            <button
              onClick={spawnAgent}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Spawn Agent
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Auto-Program Toggle */}
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              Auto-Program
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-300">Self-Improvement</span>
              <button
                onClick={() => setAutoProgramEnabled(!autoProgramEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  autoProgramEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoProgramEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="text-sm text-slate-400">
              <p>• Auto-code improvements</p>
              <p>• Pattern learning</p>
              <p>• Performance optimization</p>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 flex-1">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              Activity Log
            </h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="text-xs font-mono text-slate-400 bg-slate-900/50 px-3 py-2 rounded">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  const colors = {
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  return (
    <div className={`rounded-2xl p-6 border ${colors[color as keyof typeof colors]}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm opacity-70">{label}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const statusColors = {
    working: 'bg-emerald-500',
    idle: 'bg-amber-500',
    learning: 'bg-cyan-500'
  };

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/50 transition">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{agent.icon}</span>
        <div>
          <div className="font-semibold text-white">{agent.name}</div>
          <div className="text-xs text-slate-400">{agent.role}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]} animate-pulse`} />
          <span className="text-slate-400 capitalize">{agent.status}</span>
        </div>
        <span className="text-emerald-400">{agent.tasks} tasks</span>
      </div>
      
      <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
          style={{ width: `${agent.efficiency}%` }}
        />
      </div>
    </div>
  );
}
