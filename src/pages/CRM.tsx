const CRM = () => {
    const customers = [
        { init: 'AS', bg: 'var(--tcm)', color: 'var(--esm)', name: 'Anita Sharma', email: 'anita@gmail.com', visits: '48', spent: '₹42,800', tier: 'Gold', tBg: 'var(--gdl)', tColor: 'var(--gd)' },
        { init: 'RJ', bg: 'rgba(52, 211, 153, 0.1)', color: '#34D399', name: 'Rohit Jain', email: 'rohit@outlook.com', visits: '36', spent: '₹31,200', tier: 'Gold', tBg: 'var(--gdl)', tColor: 'var(--gd)' },
        { init: 'MP', bg: 'rgba(129, 140, 248, 0.1)', color: '#A5B4FC', name: 'Meera Patel', email: 'meera@gmail.com', visits: '29', spent: '₹24,100', tier: 'Silver', tBg: 'var(--sf)', tColor: 'var(--esl)' },
        { init: 'VK', bg: 'var(--tcm)', color: 'var(--esm)', name: 'Vijay Kumar', email: 'vijay@yahoo.com', visits: '22', spent: '₹18,600', tier: 'Silver', tBg: 'var(--sf)', tColor: 'var(--esl)' },
    ];
    const tiers = [
        { name: 'Gold Members', desc: '₹25K+ lifetime spend', count: '841', color: 'var(--gd)', border: 'var(--gd)', pct: 20 },
        { name: 'Silver Members', desc: '₹10K–₹25K lifetime', count: '1,842', color: 'var(--esl)', border: 'var(--esl)', pct: 44 },
        { name: 'Bronze Members', desc: 'Under ₹10K spend', count: '1,527', color: 'var(--tc)', border: 'var(--tcl)', pct: 36 },
    ];
    return (
        <>
            <div className="grid4" style={{ marginBottom: 14 }}>
                <div className="kpi"><div className="kl">Total Customers</div><div className="kv">12,841</div></div>
                <div className="kpi"><div className="kl">Repeat Customers</div><div className="kv">68%</div><div className="ks"><span className="kc up">↑ 4%</span></div></div>
                <div className="kpi"><div className="kl">Loyalty Members</div><div className="kv">4,210</div></div>
                <div className="kpi"><div className="kl">Avg Lifetime Value</div><div className="kv">₹8,240</div></div>
            </div>
            <div className="grid2" style={{ marginBottom: 13 }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--dv)' }}><div className="ct" style={{ fontSize: 14 }}>Top customers</div></div>
                    <div className="th" style={{ display: 'grid', gridTemplateColumns: '1fr 70px 80px 70px' }}><span>Customer</span><span>Visits</span><span>Spent</span><span>Tier</span></div>
                    {customers.map(c => (
                        <div className="tr" style={{ display: 'grid', gridTemplateColumns: '1fr 70px 80px 70px' }} key={c.init}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, color: c.color }}>{c.init}</div>
                                <div><div style={{ fontSize: 11, fontWeight: 500 }}>{c.name}</div><div style={{ fontSize: 9, color: 'var(--mt)' }}>{c.email}</div></div>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--mt)' }}>{c.visits}</div>
                            <div style={{ fontSize: 11, fontWeight: 500 }}>{c.spent}</div>
                            <div><span className="pill" style={{ background: c.tBg, color: c.tColor }}>{c.tier}</span></div>
                        </div>
                    ))}
                </div>
                <div className="card">
                    <div className="ch"><div className="ct">Loyalty tiers</div></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {tiers.map(t => (
                            <div key={t.name} style={{ background: 'var(--cr)', borderRadius: 10, padding: '12px 14px', borderLeft: `3px solid ${t.border}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div><div style={{ fontSize: 12, fontWeight: 500, color: 'var(--esm)' }}>{t.name}</div><div style={{ fontSize: 10, color: 'var(--mt)' }}>{t.desc}</div></div>
                                    <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 20, fontWeight: 600, color: t.color }}>{t.count}</div>
                                </div>
                                <div className="bar-bg" style={{ marginTop: 8 }}><div className="bar-f" style={{ background: t.border, width: `${t.pct}%` }}></div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default CRM;
