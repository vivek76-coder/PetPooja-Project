const Reports = () => {
    const months = [
        { label: 'Aug', h: 55, bg: 'var(--tcm)' }, { label: 'Sep', h: 62, bg: 'var(--tcm)' },
        { label: 'Oct', h: 70, bg: 'var(--tcm)' }, { label: 'Nov', h: 80, bg: 'var(--tcm)' },
        { label: 'Dec', h: 90, bg: 'var(--gd)' }, { label: 'Jan', h: 72, bg: 'var(--tcm)' },
        { label: 'Feb', h: 78, bg: 'var(--tcm)' }, { label: 'Mar', h: 100, bg: 'var(--tc)' },
    ];
    const outlets = [
        { name: 'Koregaon Park', pct: 38, bg: 'var(--tc)' }, { name: 'Baner', pct: 24, bg: 'var(--tc)' },
        { name: 'Viman Nagar', pct: 19, bg: 'var(--tc)' }, { name: 'Kothrud', pct: 11, bg: 'var(--gd)' },
        { name: 'Hadapsar', pct: 8, bg: 'var(--gd)' },
    ];
    const cats = [
        { name: 'Main Course', orders: '3,241', rev: '₹32.4L', avg: '₹998', growth: '↑ 14%', gColor: 'var(--sg)' },
        { name: 'Starters', orders: '2,108', rev: '₹18.6L', avg: '₹882', growth: '↑ 9%', gColor: 'var(--sg)' },
        { name: 'Beverages', orders: '4,881', rev: '₹14.2L', avg: '₹291', growth: '↑ 22%', gColor: 'var(--sg)' },
        { name: 'Breads', orders: '5,412', rev: '₹10.8L', avg: '₹199', growth: '↓ 2%', gColor: 'var(--tc)' },
    ];
    return (
        <>
            <div className="rep-kpi" style={{ marginBottom: 14 }}>
                <div className="kpi"><div className="kl">Monthly Revenue</div><div className="kv">₹84.2L</div><div className="ks"><span className="kc up">↑ 11%</span><span className="kp">vs last month</span></div></div>
                <div className="kpi"><div className="kl">Total Orders</div><div className="kv">9,841</div><div className="ks"><span className="kc up">↑ 7.2%</span></div></div>
                <div className="kpi"><div className="kl">Avg AOV</div><div className="kv">₹441</div></div>
                <div className="kpi"><div className="kl">Food Cost %</div><div className="kv">32%</div><div className="ks"><span className="kc dn">Target: 28%</span></div></div>
                <div className="kpi"><div className="kl">Net Margin</div><div className="kv">18.4%</div><div className="ks"><span className="kc up">↑ 2.1%</span></div></div>
            </div>
            <div className="rep-chart-row">
                <div className="card">
                    <div className="ch"><div><div className="ct">Monthly revenue</div><div className="cs">Last 8 months</div></div></div>
                    <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 8, paddingTop: 10 }}>
                        {months.map(m => (
                            <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                <div className="mb" style={{ background: m.bg, width: '100%', height: `${m.h}%` }}></div>
                                <div className="mb-l">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <div className="ch"><div><div className="ct">Outlet performance</div><div className="cs">Revenue share this month</div></div></div>
                    <div className="outlet-perf">
                        {outlets.map(o => (
                            <div className="op-row" key={o.name}>
                                <div className="op-name" style={{ fontSize: 11 }}>{o.name}</div>
                                <div className="bar-bg"><div className="bar-f" style={{ background: o.bg, width: `${o.pct}%` }}></div></div>
                                <div className="op-val">{o.pct}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--dv)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="ct" style={{ fontSize: 14 }}>Category-wise revenue</div>
                    <div style={{ display: 'flex', gap: 8 }}><button className="btn-o" style={{ fontSize: 11 }}>Download PDF</button><button className="btn" style={{ fontSize: 11 }}>Export Excel</button></div>
                </div>
                <div className="th" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 70px' }}><span>Category</span><span>Orders</span><span>Revenue</span><span>Avg Item Value</span><span>Growth</span></div>
                {cats.map(c => (
                    <div className="tr" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 70px' }} key={c.name}>
                        <div style={{ fontSize: 11, fontWeight: 500 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--mt)' }}>{c.orders}</div>
                        <div style={{ fontSize: 11, fontWeight: 500 }}>{c.rev}</div>
                        <div style={{ fontSize: 11, color: 'var(--mt)' }}>{c.avg}</div>
                        <div style={{ fontSize: 10, color: c.gColor }}>{c.growth}</div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default Reports;
