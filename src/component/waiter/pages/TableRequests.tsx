import { useState } from 'react';

interface ServiceRequest {
    id: string;
    table: string;
    tableNum: number;
    guests: number;
    request: string;
    category: 'water' | 'menu' | 'bill' | 'assistance' | 'complaint' | 'cleanup';
    priority: 'high' | 'medium' | 'low';
    time: string;
    elapsedMin: number;
    status: 'pending' | 'acknowledged' | 'resolved';
    notes?: string;
}

const requestsData: ServiceRequest[] = [
    { id: 'REQ-041', table: 'Table 11', tableNum: 11, guests: 4, request: 'Guests want the bill immediately — in a hurry', category: 'bill', priority: 'high', time: '1:02 PM', elapsedMin: 2, status: 'pending' },
    { id: 'REQ-040', table: 'Table 3', tableNum: 3, guests: 3, request: 'Complaint about cold soup, wants replacement', category: 'complaint', priority: 'high', time: '12:58 PM', elapsedMin: 6, status: 'pending' },
    { id: 'REQ-039', table: 'Table 7', tableNum: 7, guests: 5, request: 'Need extra chairs — 2 more guests arriving', category: 'assistance', priority: 'medium', time: '12:55 PM', elapsedMin: 9, status: 'pending' },
    { id: 'REQ-038', table: 'Table 5', tableNum: 5, guests: 2, request: 'Water refill for the table', category: 'water', priority: 'low', time: '12:52 PM', elapsedMin: 12, status: 'acknowledged', notes: 'On the way' },
    { id: 'REQ-037', table: 'Table 12', tableNum: 12, guests: 2, request: 'Want to see the dessert menu', category: 'menu', priority: 'low', time: '12:48 PM', elapsedMin: 16, status: 'acknowledged', notes: 'Menu handed' },
    { id: 'REQ-036', table: 'Table 7', tableNum: 7, guests: 5, request: 'Spilled drink — needs table cleanup', category: 'cleanup', priority: 'medium', time: '12:40 PM', elapsedMin: 24, status: 'resolved' },
    { id: 'REQ-035', table: 'Table 11', tableNum: 11, guests: 4, request: 'Extra napkins needed', category: 'assistance', priority: 'low', time: '12:32 PM', elapsedMin: 32, status: 'resolved' },
    { id: 'REQ-034', table: 'Table 3', tableNum: 3, guests: 3, request: 'Need condiments — ketchup & green chutney', category: 'assistance', priority: 'low', time: '12:25 PM', elapsedMin: 39, status: 'resolved' },
];

const categoryMeta: Record<string, { icon: string; label: string; color: string }> = {
    water: { icon: 'ri-drop-line', label: 'Water', color: '#38BDF8' },
    menu: { icon: 'ri-book-open-line', label: 'Menu', color: '#818CF8' },
    bill: { icon: 'ri-bill-line', label: 'Bill', color: '#FB923C' },
    assistance: { icon: 'ri-hand-heart-line', label: 'Assist', color: '#A78BFA' },
    complaint: { icon: 'ri-alarm-warning-line', label: 'Complaint', color: '#FB7185' },
    cleanup: { icon: 'ri-brush-line', label: 'Cleanup', color: '#2DD4BF' },
};

const priorityMeta: Record<string, { color: string; bg: string }> = {
    high: { color: '#FB7185', bg: 'rgba(251,113,133,0.12)' },
    medium: { color: '#FBBF24', bg: 'rgba(251,191,36,0.12)' },
    low: { color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
};

const statusMeta: Record<string, { color: string; bg: string; icon: string }> = {
    pending: { color: '#FB7185', bg: 'rgba(251,113,133,0.10)', icon: 'ri-time-line' },
    acknowledged: { color: '#FBBF24', bg: 'rgba(251,191,36,0.10)', icon: 'ri-eye-line' },
    resolved: { color: '#34D399', bg: 'rgba(52,211,153,0.10)', icon: 'ri-check-double-line' },
};

const TableRequests = () => {
    const [filter, setFilter] = useState<'all' | 'pending' | 'acknowledged' | 'resolved'>('all');
    const [catFilter, setCatFilter] = useState<string>('all');

    const filtered = requestsData
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => catFilter === 'all' || r.category === catFilter);

    const pendingCount = requestsData.filter(r => r.status === 'pending').length;
    const ackCount = requestsData.filter(r => r.status === 'acknowledged').length;
    const resolvedCount = requestsData.filter(r => r.status === 'resolved').length;
    const highPriorityCount = requestsData.filter(r => r.priority === 'high' && r.status === 'pending').length;

    const stats = [
        { label: 'Pending', value: pendingCount, icon: 'ri-time-line', color: '#FB7185', bg: 'rgba(251,113,133,0.12)', info: 'Need your attention' },
        { label: 'Acknowledged', value: ackCount, icon: 'ri-eye-line', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', info: 'Being handled' },
        { label: 'Resolved', value: resolvedCount, icon: 'ri-check-double-line', color: '#34D399', bg: 'rgba(52,211,153,0.12)', info: 'Completed today' },
        { label: 'Urgent', value: highPriorityCount, icon: 'ri-alarm-warning-line', color: '#F97316', bg: 'rgba(249,115,22,0.12)', info: 'High priority pending' },
    ];

    const categories = [
        { key: 'all', label: 'All', icon: 'ri-apps-line' },
        { key: 'water', label: 'Water', icon: 'ri-drop-line' },
        { key: 'menu', label: 'Menu', icon: 'ri-book-open-line' },
        { key: 'bill', label: 'Bill', icon: 'ri-bill-line' },
        { key: 'assistance', label: 'Assist', icon: 'ri-hand-heart-line' },
        { key: 'complaint', label: 'Complaint', icon: 'ri-alarm-warning-line' },
        { key: 'cleanup', label: 'Cleanup', icon: 'ri-brush-line' },
    ];

    return (
        <div className="mgr-page">
            {/* Stats Row */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                {stats.map(s => (
                    <div className="kpi" key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 46, height: 46, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: s.color, flexShrink: 0 }}>
                            <i className={s.icon}></i>
                        </div>
                        <div>
                            <div className="kl">{s.label}</div>
                            <div className="kv" style={{ fontSize: 22 }}>{s.value}</div>
                            <div style={{ fontSize: 10, color: 'var(--mt)', marginTop: 2 }}>{s.info}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid3" style={{ marginBottom: 16, gridTemplateColumns: '1fr 320px' }}>
                {/* Left — Requests List */}
                <div>
                    {/* Status Filters */}
                    <div className="ko-filters" style={{ marginBottom: 12, display: 'flex', gap: 6 }}>
                        {(['all', 'pending', 'acknowledged', 'resolved'] as const).map(f => (
                            <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`}
                                style={{
                                    padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: '1px solid var(--dv)',
                                    background: filter === f ? 'var(--esp)' : 'var(--ww)', color: filter === f ? 'white' : 'var(--mt)', transition: 'all 0.15s'
                                }}
                                onClick={() => setFilter(f)}>
                                {f === 'all' ? 'All Requests' : f.charAt(0).toUpperCase() + f.slice(1)}
                                {f === 'pending' && pendingCount > 0 && <span style={{ marginLeft: 5, background: '#FB7185', color: '#fff', fontSize: 9, padding: '1px 6px', borderRadius: 10 }}>{pendingCount}</span>}
                            </button>
                        ))}
                    </div>

                    {/* Category Filters */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                        {categories.map(c => (
                            <button key={c.key}
                                style={{
                                    padding: '5px 12px', borderRadius: 20, fontSize: 10, fontWeight: 500, cursor: 'pointer',
                                    border: catFilter === c.key ? '1px solid var(--tc)' : '1px solid var(--dv)',
                                    background: catFilter === c.key ? 'var(--tcm)' : 'transparent', color: catFilter === c.key ? 'var(--tc)' : 'var(--mt)',
                                    display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s'
                                }}
                                onClick={() => setCatFilter(c.key)}>
                                <i className={c.icon} style={{ fontSize: 11 }}></i>
                                {c.label}
                            </button>
                        ))}
                    </div>

                    {/* Request Cards */}
                    <div style={{ display: 'grid', gap: 10 }}>
                        {filtered.length === 0 && (
                            <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                                <i className="ri-inbox-line" style={{ fontSize: 36, color: 'var(--dv)', marginBottom: 8, display: 'block' }}></i>
                                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--mt)' }}>No requests match your filters</div>
                            </div>
                        )}
                        {filtered.map(req => {
                            const cat = categoryMeta[req.category];
                            const pri = priorityMeta[req.priority];
                            const sts = statusMeta[req.status];
                            return (
                                <div className="card" key={req.id} style={{
                                    borderLeft: `4px solid ${req.status === 'pending' ? pri.color : sts.color}`,
                                    opacity: req.status === 'resolved' ? 0.65 : 1,
                                    transition: 'all 0.2s'
                                }}>
                                    {/* Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 34, height: 34, borderRadius: 9, background: `${cat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                                                <i className={cat.icon} style={{ color: cat.color }}></i>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <span style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 700, color: 'var(--tc)' }}>{req.id}</span>
                                                    <span className="tag">{req.table}</span>
                                                    <span style={{ fontSize: 9, color: 'var(--mt)' }}>{req.guests} guests</span>
                                                </div>
                                                <div style={{ fontSize: 10, color: 'var(--mt)', marginTop: 2 }}>
                                                    {req.time} · {req.elapsedMin < 5 ? 'just now' : `${req.elapsedMin} min ago`}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {/* Priority Badge */}
                                            <span className="pill" style={{ fontSize: 8, background: pri.bg, color: pri.color, textTransform: 'uppercase', fontWeight: 600 }}>
                                                {req.priority}
                                            </span>
                                            {/* Status Badge */}
                                            <span className="pill" style={{ fontSize: 8, background: sts.bg, color: sts.color, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <i className={sts.icon} style={{ fontSize: 10 }}></i>
                                                {req.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Request Body */}
                                    <div style={{ padding: '8px 12px', background: 'var(--cr)', borderRadius: 9, marginBottom: 8 }}>
                                        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{req.request}</div>
                                    </div>

                                    {/* Notes if any */}
                                    {req.notes && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                            <i className="ri-chat-1-line" style={{ fontSize: 11, color: 'var(--mt)' }}></i>
                                            <span style={{ fontSize: 10, fontStyle: 'italic', color: 'var(--mt)' }}>Note: {req.notes}</span>
                                        </div>
                                    )}

                                    {/* Urgent Timer Warning */}
                                    {req.status === 'pending' && req.elapsedMin > 5 && (
                                        <div style={{ padding: '5px 10px', background: 'rgba(251,113,133,0.06)', borderRadius: 7, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <i className="ri-alarm-warning-line" style={{ fontSize: 12, color: '#FB7185' }}></i>
                                            <span style={{ fontSize: 10, color: '#FB7185', fontWeight: 500 }}>
                                                Waiting for {req.elapsedMin} min — please attend soon
                                            </span>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    {req.status !== 'resolved' && (
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                                            {req.status === 'pending' && (
                                                <>
                                                    <button className="btn-o" style={{ fontSize: 11, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <i className="ri-eye-line" style={{ fontSize: 12 }}></i>Acknowledge
                                                    </button>
                                                    {req.priority === 'high' && (
                                                        <button style={{
                                                            fontSize: 11, padding: '6px 14px', borderRadius: 9, border: '1px solid #FB7185', color: '#FB7185',
                                                            background: 'rgba(251,113,133,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                                                            fontFamily: "'DM Sans', sans-serif", fontWeight: 500
                                                        }}>
                                                            <i className="ri-arrow-up-circle-line" style={{ fontSize: 12 }}></i>Escalate
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            <button className="btn" style={{ fontSize: 11, padding: '6px 14px', background: '#34D399', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <i className="ri-check-line" style={{ fontSize: 12 }}></i>Resolve
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right — Summary Panel */}
                <div>
                    {/* Active Tables Quick View */}
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div className="ch">
                            <div><div className="ct">📍 Table Activity</div><div className="cs">Requests per table</div></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                            {[
                                { num: 3, pending: 1, total: 2 },
                                { num: 5, pending: 0, total: 1 },
                                { num: 7, pending: 1, total: 2 },
                                { num: 11, pending: 1, total: 2 },
                                { num: 12, pending: 0, total: 1 },
                            ].map(t => (
                                <div key={t.num} style={{
                                    padding: '10px 12px', borderRadius: 10, background: t.pending > 0 ? 'rgba(251,113,133,0.06)' : 'var(--cr)',
                                    border: t.pending > 0 ? '1px solid rgba(251,113,133,0.2)' : '1px solid var(--dv)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>T{t.num}</div>
                                        <div style={{ fontSize: 9, color: 'var(--mt)' }}>{t.total} requests</div>
                                    </div>
                                    {t.pending > 0 && (
                                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#FB7185', color: '#fff', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {t.pending}
                                        </span>
                                    )}
                                    {t.pending === 0 && (
                                        <i className="ri-check-double-line" style={{ fontSize: 14, color: '#34D399' }}></i>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Request Types Breakdown */}
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div className="ch">
                            <div><div className="ct">📊 By Category</div><div className="cs">Today's breakdown</div></div>
                        </div>
                        <div style={{ display: 'grid', gap: 6 }}>
                            {Object.entries(categoryMeta).map(([key, meta]) => {
                                const count = requestsData.filter(r => r.category === key).length;
                                const pct = Math.round((count / requestsData.length) * 100);
                                return (
                                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <i className={meta.icon} style={{ fontSize: 13, color: meta.color, width: 18 }}></i>
                                        <span style={{ fontSize: 11, color: 'var(--ink)', flex: 1 }}>{meta.label}</span>
                                        <div style={{ width: 80, height: 5, background: 'var(--dv)', borderRadius: 3, overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${pct}%`, background: meta.color, borderRadius: 3, transition: 'width 0.4s' }}></div>
                                        </div>
                                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--mt)', minWidth: 20, textAlign: 'right' }}>{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Activity Log */}
                    <div className="card">
                        <div className="ch">
                            <div><div className="ct">🕐 Recent Activity</div><div className="cs">Latest updates</div></div>
                        </div>
                        <div style={{ display: 'grid', gap: 4 }}>
                            {[
                                { action: 'Resolved', detail: 'REQ-036 — Table 7 cleanup done', time: '12:46 PM', color: '#34D399' },
                                { action: 'Resolved', detail: 'REQ-035 — Table 11 napkins delivered', time: '12:38 PM', color: '#34D399' },
                                { action: 'Acknowledged', detail: 'REQ-038 — Table 5 water request', time: '12:53 PM', color: '#FBBF24' },
                                { action: 'Acknowledged', detail: 'REQ-037 — Table 12 dessert menu', time: '12:49 PM', color: '#FBBF24' },
                                { action: 'New Request', detail: 'REQ-041 — Table 11 wants bill', time: '1:02 PM', color: '#FB7185' },
                            ].map((a, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: i < 4 ? '1px solid var(--dv)' : 'none' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color, marginTop: 5, flexShrink: 0 }}></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>{a.action}</div>
                                        <div style={{ fontSize: 10, color: 'var(--mt)' }}>{a.detail}</div>
                                    </div>
                                    <span style={{ fontSize: 9, color: 'var(--mt)', whiteSpace: 'nowrap' }}>{a.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableRequests;
