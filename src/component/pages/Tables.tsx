const Tables = () => {
    const tables = [
        { num: 'T1', pax: '2/4 pax', status: 'Occupied', cls: 'occ' },
        { num: 'T2', pax: '4/4 pax', status: 'Occupied', cls: 'occ' },
        { num: 'T3', pax: '0/4 pax', status: 'Available', cls: 'avail' },
        { num: 'T4', pax: '4 pax · 8:30P', status: 'Reserved', cls: 'rsv' },
        { num: 'T5', pax: '6/6 pax', status: 'Occupied', cls: 'occ' },
        { num: 'T6', pax: 'Cleaning', status: 'Cleaning', cls: 'clean' },
        { num: 'T7', pax: '0/2 pax', status: 'Available', cls: 'avail' },
        { num: 'T8', pax: '2/6 pax', status: 'Occupied', cls: 'occ' },
        { num: 'T9', pax: '3/4 pax', status: 'Occupied', cls: 'occ' },
        { num: 'T10', pax: '0/8 pax', status: 'Available', cls: 'avail' },
        { num: 'T11', pax: '8 pax · 9:00P', status: 'Reserved', cls: 'rsv' },
        { num: 'T12', pax: '5/6 pax', status: 'Occupied', cls: 'occ' },
    ];

    const reservations = [
        { name: 'Sharma Family', time: '8:30 PM · Table 4 · 4 covers', status: 'Confirmed' },
        { name: 'Patel & Guests', time: '9:00 PM · Table 11 · 8 covers', status: 'Confirmed' },
        { name: 'Mehta Birthday', time: '9:30 PM · Private Room · 12 covers', status: 'Pending confirm' },
        { name: 'Jain Anniversary', time: '10:00 PM · Table 7 · 2 covers', status: 'Confirmed' },
    ];

    return (
        <>
            <div className="grid4" style={{ marginBottom: 14 }}>
                <div className="kpi"><div className="kl">Total Tables</div><div className="kv">48</div></div>
                <div className="kpi"><div className="kl">Occupied</div><div className="kv" style={{ color: 'var(--tc)' }}>31</div><div className="ks"><span className="kc" style={{ background: 'var(--tcm)', color: 'var(--esm)' }}>64.6%</span></div></div>
                <div className="kpi"><div className="kl">Available</div><div className="kv" style={{ color: 'var(--sg)' }}>12</div></div>
                <div className="kpi"><div className="kl">Reserved</div><div className="kv" style={{ color: '#FBBF24' }}>5</div><div className="ks"><span style={{ fontSize: 10, color: 'var(--mt)' }}>Next: 8:30 PM</span></div></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 13 }}>
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Koregaon Park — Floor 1</div><div className="cs">Live table status</div></div>
                        <div style={{ display: 'flex', gap: 8 }}><button className="btn-o" style={{ fontSize: 10, padding: '5px 10px' }}>Add table</button></div>
                    </div>
                    <div className="floor-grid">
                        {tables.map((t) => (
                            <div className={`table-box ${t.cls}`} key={t.num}>
                                <div className="tb-num">{t.num}</div>
                                <div className="tb-pax">{t.pax}</div>
                                <div className="tb-status">{t.status}</div>
                            </div>
                        ))}
                    </div>
                    <div className="legend-strip">
                        <div className="leg-i"><div className="leg-sq" style={{ background: 'var(--tcm)', border: '1.5px solid var(--tc)' }}></div>Occupied</div>
                        <div className="leg-i"><div className="leg-sq" style={{ background: 'var(--ww)', border: '1px solid var(--dv)' }}></div>Available</div>
                        <div className="leg-i"><div className="leg-sq" style={{ background: 'rgba(245,158,11,0.12)', border: '1.5px solid #F59E0B' }}></div>Reserved</div>
                        <div className="leg-i"><div className="leg-sq" style={{ background: 'rgba(52,211,153,0.1)', border: '1.5px solid #34D399' }}></div>Cleaning</div>
                    </div>
                </div>

                <div className="card">
                    <div className="ch"><div className="ct">Reservations today</div></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {reservations.map((r) => (
                            <div style={{ background: 'var(--cr)', borderRadius: 9, padding: '10px 12px' }} key={r.name}>
                                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{r.name}</div>
                                <div style={{ fontSize: 10, color: 'var(--mt)' }}>{r.time}</div>
                                <div style={{ marginTop: 5 }}>
                                    <span className={`pill ${r.status === 'Pending confirm' ? 'p-new' : 'p-prep'}`}>{r.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 12 }}><button className="btn" style={{ width: '100%', fontSize: 11 }}>+ New Reservation</button></div>
                </div>
            </div>
        </>
    );
};

export default Tables;
