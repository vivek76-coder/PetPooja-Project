const Dashboard = () => {
    return (
        <>
            {/* Outlet strip */}
            <div className="outlet-strip">
                <div className="oc sel">
                    <div className="oc-dot"></div>
                    <div className="oc-n">Koregaon Park</div>
                    <div className="oc-r">₹1.84L</div>
                    <div className="oc-c up">↑ 12.4%</div>
                </div>
                <div className="oc">
                    <div className="oc-dot"></div>
                    <div className="oc-n">Baner</div>
                    <div className="oc-r">₹1.22L</div>
                    <div className="oc-c up">↑ 8.1%</div>
                </div>
                <div className="oc">
                    <div className="oc-dot"></div>
                    <div className="oc-n">Viman Nagar</div>
                    <div className="oc-r">₹98.4K</div>
                    <div className="oc-c dn">↓ 2.3%</div>
                </div>
                <div className="oc">
                    <div className="oc-dot"></div>
                    <div className="oc-n">Kothrud</div>
                    <div className="oc-r">₹76.2K</div>
                    <div className="oc-c up">↑ 5.7%</div>
                </div>
                <div className="oc">
                    <div className="oc-dot" style={{ background: 'var(--tcl)' }}></div>
                    <div className="oc-n">Hadapsar</div>
                    <div className="oc-r">₹61.8K</div>
                    <div className="oc-c dn">↓ 1.1%</div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid4" style={{ marginBottom: 14 }}>
                <div className="kpi">
                    <div className="kl">Total Revenue</div>
                    <div className="kv">₹5.42L</div>
                    <div className="ks"><span className="kc up">↑ 9.2%</span><span className="kp">vs yesterday</span></div>
                </div>
                <div className="kpi">
                    <div className="kl">Covers Today</div>
                    <div className="kv">1,248</div>
                    <div className="ks"><span className="kc up">↑ 14.5%</span><span className="kp">vs yesterday</span></div>
                </div>
                <div className="kpi">
                    <div className="kl">Avg Order Value</div>
                    <div className="kv">₹434</div>
                    <div className="ks"><span className="kc dn">↓ 3.1%</span><span className="kp">vs yesterday</span></div>
                </div>
                <div className="kpi">
                    <div className="kl">Active Orders</div>
                    <div className="kv">47</div>
                    <div className="ks">
                        <span className="kc up" style={{ background: 'var(--tcm)', color: 'var(--esm)' }}>Live</span>
                        <span className="kp">across outlets</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: 13, marginBottom: 13 }}>
                {/* Revenue Trend */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Revenue trend</div><div className="cs">Today by hour</div></div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--mt)' }}>
                                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--tc)' }}></div>Revenue
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--mt)' }}>
                                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gdl)' }}></div>Orders
                            </div>
                        </div>
                    </div>
                    <div className="bars">
                        {[
                            { label: '9A', r: 30, o: 20 }, { label: '10A', r: 50, o: 35 },
                            { label: '11A', r: 75, o: 55 }, { label: '12P', r: 90, o: 72 },
                            { label: '1P', r: 100, o: 80 }, { label: '2P', r: 82, o: 60 },
                            { label: '3P', r: 55, o: 40 }, { label: '6P', r: 88, o: 68 },
                            { label: '7P', r: 95, o: 78 }, { label: '8P', r: 65, o: 48 },
                        ].map((d, i) => (
                            <div className="bg" key={i}>
                                <div className="bw">
                                    <div className="b" style={{ background: 'var(--tc)', height: `${d.r}%`, opacity: i === 9 ? 0.4 : 1 }}></div>
                                    <div className="b" style={{ background: 'var(--gdl)', height: `${d.o}%`, opacity: i === 9 ? 0.4 : 1 }}></div>
                                </div>
                                <div className="bl">{d.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Type Split */}
                <div className="card">
                    <div className="ch"><div><div className="ct">Order type split</div><div className="cs">By channel</div></div></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <svg width="110" height="110" viewBox="0 0 110 110">
                            <circle cx="55" cy="55" r="42" fill="none" stroke="var(--dv)" strokeWidth="16" />
                            <circle cx="55" cy="55" r="42" fill="none" stroke="var(--tc)" strokeWidth="16" strokeDasharray="158 106" strokeDashoffset="0" transform="rotate(-90 55 55)" />
                            <circle cx="55" cy="55" r="42" fill="none" stroke="var(--gd)" strokeWidth="16" strokeDasharray="74 190" strokeDashoffset="-158" transform="rotate(-90 55 55)" />
                            <circle cx="55" cy="55" r="42" fill="none" stroke="var(--sg)" strokeWidth="16" strokeDasharray="32 232" strokeDashoffset="-232" transform="rotate(-90 55 55)" />
                            <text x="55" y="50" textAnchor="middle" fill="var(--ink)" fontFamily="Outfit,sans-serif" fontSize="17" fontWeight="600">60%</text>
                            <text x="55" y="63" textAnchor="middle" fill="var(--mt)" fontFamily="Outfit,sans-serif" fontSize="9">Dine-in</text>
                        </svg>
                    </div>
                    <div className="donut-leg">
                        <div className="dl-row"><div className="dl-dot" style={{ background: 'var(--tc)' }}></div><div className="dl-lb">Dine-in</div><div className="bar-bg"><div className="bar-f" style={{ background: 'var(--tc)', width: '60%' }}></div></div><div className="dl-pct">60%</div></div>
                        <div className="dl-row"><div className="dl-dot" style={{ background: 'var(--gd)' }}></div><div className="dl-lb">Delivery</div><div className="bar-bg"><div className="bar-f" style={{ background: 'var(--gd)', width: '28%' }}></div></div><div className="dl-pct">28%</div></div>
                        <div className="dl-row"><div className="dl-dot" style={{ background: 'var(--sg)' }}></div><div className="dl-lb">Takeaway</div><div className="bar-bg"><div className="bar-f" style={{ background: 'var(--sg)', width: '12%' }}></div></div><div className="dl-pct">12%</div></div>
                    </div>
                </div>

                {/* Alerts */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Alerts</div><div className="cs">Needs attention</div></div>
                        <span style={{ fontSize: 10, color: 'var(--tc)', cursor: 'pointer' }}>View all</span>
                    </div>
                    <div className="alert-i" style={{ borderLeft: '3px solid var(--tc)' }}><div className="alert-t">Low stock — Paneer</div><div className="alert-s">Viman Nagar · 1.2kg left</div></div>
                    <div className="alert-i" style={{ borderLeft: '3px solid var(--gd)' }}><div className="alert-t">Table 8 waiting 22 min</div><div className="alert-s">Koregaon Park · Order placed</div></div>
                    <div className="alert-i" style={{ borderLeft: '3px solid #818CF8' }}><div className="alert-t">Zomato order delayed</div><div className="alert-s">Baner · Rider 8 min away</div></div>
                    <div className="alert-i" style={{ borderLeft: '3px solid var(--sg)' }}><div className="alert-t">Hadapsar hit target</div><div className="alert-s">₹61.8K · 102% of goal</div></div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid2">
                {/* Live Orders */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--dv)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div><div className="ct" style={{ fontSize: 14 }}>Live orders</div><div className="cs">Across all outlets</div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--tcm)', padding: '3px 9px', borderRadius: 20 }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--tc)' }}></div>
                            <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--tc)' }}>47 active</span>
                        </div>
                    </div>
                    <div className="th" style={{ gridTemplateColumns: '40px 1fr 80px 60px' }}><span>#</span><span>Guest & Outlet</span><span>Status</span><span>Amount</span></div>
                    {[
                        { id: '#847', guest: 'Mehra, Table 4', outlet: 'Koregaon Park', status: 'Ready', statusClass: 'p-ready', amount: '₹1,240' },
                        { id: '#846', guest: 'Zomato #Z8821', outlet: 'Baner', status: 'Preparing', statusClass: 'p-prep', amount: '₹860' },
                        { id: '#845', guest: 'Sharma, Table 12', outlet: 'Koregaon Park', status: 'New', statusClass: 'p-new', amount: '₹2,180' },
                        { id: '#844', guest: 'Swiggy #SW4421', outlet: 'Viman Nagar', status: 'Preparing', statusClass: 'p-prep', amount: '₹540' },
                    ].map((o) => (
                        <div className="tr" style={{ gridTemplateColumns: '40px 1fr 80px 60px' }} key={o.id}>
                            <div className="tc-txt">{o.id}</div>
                            <div><div style={{ fontSize: 11, fontWeight: 500 }}>{o.guest}</div><div style={{ fontSize: 9, color: 'var(--mt)' }}>{o.outlet}</div></div>
                            <div><span className={`pill ${o.statusClass}`}>{o.status}</span></div>
                            <div style={{ fontSize: 11, fontWeight: 500 }}>{o.amount}</div>
                        </div>
                    ))}
                </div>

                {/* Top Dishes */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--dv)' }}><div className="ct" style={{ fontSize: 14 }}>Top dishes today</div><div className="cs">By revenue across chain</div></div>
                    <div className="th" style={{ gridTemplateColumns: '28px 1fr 50px 60px 50px' }}><span>#</span><span>Item</span><span>Orders</span><span>Revenue</span><span>Trend</span></div>
                    {[
                        { rank: 1, name: 'Dal Makhani', cat: 'Main course', orders: '184', rev: '₹48.2K', trend: '↑ 18%', tColor: 'var(--sg)', gold: true },
                        { rank: 2, name: 'Butter Chicken', cat: 'Main course', orders: '162', rev: '₹43.7K', trend: '↑ 11%', tColor: 'var(--sg)', gold: true },
                        { rank: 3, name: 'Garlic Naan', cat: 'Breads', orders: '298', rev: '₹29.8K', trend: '↑ 6%', tColor: 'var(--sg)', gold: false },
                        { rank: 4, name: 'Paneer Tikka', cat: 'Starters', orders: '121', rev: '₹26.6K', trend: '↓ 4%', tColor: 'var(--tc)', gold: false },
                        { rank: 5, name: 'Mango Lassi', cat: 'Beverages', orders: '209', rev: '₹20.9K', trend: '↑ 22%', tColor: 'var(--sg)', gold: false },
                    ].map((d) => (
                        <div className="tr" style={{ gridTemplateColumns: '28px 1fr 50px 60px 50px' }} key={d.rank}>
                            <div className={`badge ${d.gold ? 'gd' : ''}`}>{d.rank}</div>
                            <div><div style={{ fontSize: 11, fontWeight: 500 }}>{d.name}</div><div style={{ fontSize: 9, color: 'var(--mt)' }}>{d.cat}</div></div>
                            <div style={{ fontSize: 11, color: 'var(--mt)' }}>{d.orders}</div>
                            <div style={{ fontSize: 11, fontWeight: 500 }}>{d.rev}</div>
                            <div style={{ fontSize: 10, color: d.tColor }}>{d.trend}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
