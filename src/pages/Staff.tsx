const Staff = () => {
    const staff = [
        { init: 'SK', name: 'Suresh Kumar', role: 'Head Waiter · KP', bg: 'var(--tc)', present: true, att: '98%', rating: '4.8' },
        { init: 'RP', name: 'Ravi Patil', role: 'Chef · Baner', bg: 'var(--gd)', present: true, att: '94%', rating: '4.6' },
        { init: 'PM', name: 'Priya Mehta', role: 'Cashier · Kothrud', bg: 'var(--sg)', present: false, att: '88%', rating: '4.4' },
        { init: 'AJ', name: 'Arjun Joshi', role: 'Manager · VN', bg: 'var(--esm)', present: true, att: '100%', rating: '4.9' },
    ];
    const schedRows = [
        { name: 'Suresh K.', cells: ['', '', 'off', '', '', '', 'half'] },
        { name: 'Ravi P.', cells: ['', 'half', '', '', 'off', '', ''] },
        { name: 'Priya M.', cells: ['off', '', '', 'off', '', 'half', ''] },
        { name: 'Arjun J.', cells: ['', '', '', 'half', '', '', 'off'] },
    ];
    return (
        <>
            <div className="grid4" style={{ marginBottom: 14 }}>
                <div className="kpi"><div className="kl">Total Staff</div><div className="kv">84</div></div>
                <div className="kpi"><div className="kl">Present Today</div><div className="kv" style={{ color: 'var(--sg)' }}>76</div><div className="ks"><span className="kc up">90.5%</span></div></div>
                <div className="kpi"><div className="kl">Absent</div><div className="kv" style={{ color: 'var(--tc)' }}>8</div></div>
                <div className="kpi"><div className="kl">On Leave</div><div className="kv">4</div></div>
            </div>
            <div className="staff-grid" style={{ marginBottom: 14 }}>
                {staff.map(s => (
                    <div className="staff-card" key={s.init}>
                        <div className="staff-av" style={{ background: s.bg }}>{s.init}</div>
                        <div className="staff-name">{s.name}</div>
                        <div className="staff-role">{s.role}</div>
                        <span className={`pill ${s.present ? 'p-ready' : 'p-due'}`} style={{ margin: '0 auto 8px' }}>{s.present ? 'Present' : 'Absent'}</span>
                        <div className="staff-stats">
                            <div style={{ textAlign: 'center' }}><div className="ss-val">{s.att}</div><div className="ss-lb">Attendance</div></div>
                            <div style={{ textAlign: 'center' }}><div className="ss-val">{s.rating}</div><div className="ss-lb">Rating</div></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="card">
                <div className="ch"><div className="ct">Weekly shift schedule</div><div style={{ display: 'flex', gap: 8 }}><button className="btn-o" style={{ fontSize: 10, padding: '5px 10px' }}>Export</button><button className="btn" style={{ fontSize: 10, padding: '5px 10px' }}>Edit shifts</button></div></div>
                <div className="sched-grid">
                    <div className="sg-head"></div>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div className="sg-head" key={d}>{d}</div>)}
                    {schedRows.map(r => (<>
                        <div className="sg-name" style={{ fontSize: 10 }} key={r.name}>{r.name}</div>
                        {r.cells.map((c, i) => <div className={`sg-cell ${c}`} key={i}></div>)}
                    </>))}
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
                    <div className="leg-i"><div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--tcm)', border: '1.5px solid var(--tc)' }}></div>Full shift</div>
                    <div className="leg-i"><div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--gdl)' }}></div>Half shift</div>
                    <div className="leg-i"><div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--cr)', border: '1px solid var(--dv)' }}></div>Off</div>
                </div>
            </div>
        </>
    );
};
export default Staff;
