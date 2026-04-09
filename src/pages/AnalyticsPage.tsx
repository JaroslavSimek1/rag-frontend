import React, { useState, useEffect } from 'react';
import { Loader2, BarChart3, Database, Image, FileText, CheckCircle2, XCircle, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api';

interface Analytics {
    jobs: { total: number; completed: number; failed: number; running: number; captcha: number };
    sources: { total: number; scheduled: number };
    evidences: { total: number; screenshots: number; markdowns: number };
    strategies: Record<string, number>;
    recent_jobs: { id: number; url: string; status: string; strategy: string | null; started_ts: string }[];
}

const StatCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color?: string }> = ({ label, value, icon, color = 'text-accent' }) => (
    <div className="glass-panel p-5 flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-white/5 ${color}`}>{icon}</div>
        <div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-text-secondary uppercase tracking-wider">{label}</div>
        </div>
    </div>
);

const AnalyticsPage: React.FC = () => {
    const [data, setData] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            const res = await api.get('/api/analytics');
            setData(res.data);
        } catch (err) {
            console.error('Failed to load analytics', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    if (!data) {
        return <div className="text-center py-20 text-text-secondary">Failed to load analytics.</div>;
    }

    const statusTheme: Record<string, string> = {
        COMPLETED: 'text-emerald-400',
        FAILED: 'text-red-400',
        RUNNING: 'text-blue-400',
        CAPTCHA_DETECTED: 'text-amber-400',
        PENDING: 'text-gray-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10 max-w-5xl mx-auto"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        <span className="bg-glow-gradient bg-clip-text text-transparent">Analytics</span>
                    </h1>
                    <p className="text-text-secondary mt-1">System overview and ingestion metrics</p>
                </div>
                <button onClick={() => { setLoading(true); load(); }} className="text-text-secondary hover:text-white flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all hover:bg-surface border border-transparent hover:border-border">
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Jobs" value={data.jobs.total} icon={<BarChart3 className="w-5 h-5" />} />
                <StatCard label="Completed" value={data.jobs.completed} icon={<CheckCircle2 className="w-5 h-5" />} color="text-emerald-400" />
                <StatCard label="Failed" value={data.jobs.failed} icon={<XCircle className="w-5 h-5" />} color="text-red-400" />
                <StatCard label="CAPTCHA" value={data.jobs.captcha} icon={<AlertTriangle className="w-5 h-5" />} color="text-amber-400" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Sources" value={data.sources.total} icon={<Database className="w-5 h-5" />} />
                <StatCard label="Scheduled" value={data.sources.scheduled} icon={<Clock className="w-5 h-5" />} color="text-purple-400" />
                <StatCard label="Screenshots" value={data.evidences.screenshots} icon={<Image className="w-5 h-5" />} color="text-purple-400" />
                <StatCard label="Markdown Files" value={data.evidences.markdowns} icon={<FileText className="w-5 h-5" />} />
            </div>

            {/* Strategy Breakdown */}
            {Object.keys(data.strategies).length > 0 && (
                <div className="glass-panel p-6">
                    <h3 className="font-semibold mb-4 text-lg">Strategy Breakdown</h3>
                    <div className="space-y-3">
                        {Object.entries(data.strategies).map(([strategy, count]) => {
                            const pct = data.jobs.total > 0 ? (count / data.jobs.total) * 100 : 0;
                            return (
                                <div key={strategy}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-text-secondary">{strategy}</span>
                                        <span className="text-white font-medium">{count} ({pct.toFixed(0)}%)</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            className="h-full bg-accent rounded-full"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Recent Jobs */}
            <div className="glass-panel p-6">
                <h3 className="font-semibold mb-4 text-lg">Recent Jobs</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-text-secondary text-xs uppercase tracking-wider border-b border-border">
                                <th className="text-left py-3 px-2">ID</th>
                                <th className="text-left py-3 px-2">URL</th>
                                <th className="text-left py-3 px-2">Status</th>
                                <th className="text-left py-3 px-2">Strategy</th>
                                <th className="text-left py-3 px-2">Started</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recent_jobs.map(job => (
                                <tr key={job.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                                    <td className="py-2.5 px-2 font-mono text-xs text-text-secondary">JOB-{job.id.toString().padStart(4, '0')}</td>
                                    <td className="py-2.5 px-2 text-white truncate max-w-[250px]">{job.url}</td>
                                    <td className={`py-2.5 px-2 font-semibold ${statusTheme[job.status] || 'text-gray-400'}`}>{job.status}</td>
                                    <td className="py-2.5 px-2 text-text-secondary">{job.strategy || '—'}</td>
                                    <td className="py-2.5 px-2 text-text-secondary">{new Date(job.started_ts).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default AnalyticsPage;
