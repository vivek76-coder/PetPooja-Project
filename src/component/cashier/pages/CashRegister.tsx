const CashRegister = () => {
    const openingBalance = 5000;
    const cashIn = 32600;
    const cashOut = 2400;
    const expectedBalance = openingBalance + cashIn - cashOut;

    const transactions = [
        { id: 'TXN-201', type: 'IN', desc: 'BIL-094 · Table 12 Cash Payment', amount: '₹1,240', time: '12:45 PM', balance: '₹35,200' },
        { id: 'TXN-200', type: 'OUT', desc: 'Change given — Table 12', amount: '-₹760', time: '12:44 PM', balance: '₹33,960' },
        { id: 'TXN-199', type: 'IN', desc: 'BIL-091 · Table 7 Cash Payment', amount: '₹1,560', time: '12:22 PM', balance: '₹34,720' },
        { id: 'TXN-198', type: 'IN', desc: 'BIL-090 · Table 3 Cash Payment', amount: '₹920', time: '12:08 PM', balance: '₹33,160' },
        { id: 'TXN-197', type: 'OUT', desc: 'Petty cash — Kitchen supplies', amount: '-₹800', time: '11:55 AM', balance: '₹32,240' },
        { id: 'TXN-196', type: 'IN', desc: 'BIL-088 · Takeaway Cash Payment', amount: '₹460', time: '11:40 AM', balance: '₹33,040' },
        { id: 'TXN-195', type: 'OUT', desc: 'Change given — Takeaway', amount: '-₹40', time: '11:39 AM', balance: '₹32,580' },
        { id: 'TXN-194', type: 'IN', desc: 'BIL-085 · Table 2 Cash Payment', amount: '₹2,100', time: '11:15 AM', balance: '₹32,620' },
        { id: 'TXN-193', type: 'OUT', desc: 'Change given — Table 2', amount: '-₹400', time: '11:14 AM', balance: '₹30,520' },
        { id: 'TXN-192', type: 'IN', desc: 'Opening Balance', amount: '₹5,000', time: '10:00 AM', balance: '₹5,000' },
    ];

    const denominations = [
        { note: '₹2000', count: 8, total: '₹16,000' },
        { note: '₹500', count: 22, total: '₹11,000' },
        { note: '₹200', count: 12, total: '₹2,400' },
        { note: '₹100', count: 38, total: '₹3,800' },
        { note: '₹50', count: 14, total: '₹700' },
        { note: '₹20', count: 15, total: '₹300' },
        { note: '₹10', count: 20, total: '₹200' },
        { note: 'Coins', count: 0, total: '₹0' },
    ];

    return (
        <div className="mgr-page">
            {/* Summary */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#818CF8' }}><i className="ri-safe-2-line"></i></div>
                    <div><div className="kl">Opening Balance</div><div className="kv" style={{ fontSize: 22 }}>₹{openingBalance.toLocaleString()}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-add-circle-line"></i></div>
                    <div><div className="kl">Cash In</div><div className="kv" style={{ fontSize: 22, color: '#34D399' }}>₹{cashIn.toLocaleString()}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,113,133,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FB7185' }}><i className="ri-indeterminate-circle-line"></i></div>
                    <div><div className="kl">Cash Out</div><div className="kv" style={{ fontSize: 22, color: '#FB7185' }}>₹{cashOut.toLocaleString()}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12, borderLeft: '4px solid #10B981' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#10B981' }}><i className="ri-wallet-3-line"></i></div>
                    <div><div className="kl">Expected Balance</div><div className="kv" style={{ fontSize: 22 }}>₹{expectedBalance.toLocaleString()}</div></div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
                {/* Transaction Log */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Transaction Log</div><div className="cs">All cash movements today</div></div>
                    </div>
                    <div className="th" style={{ display: 'grid', gridTemplateColumns: '70px 40px 1fr 90px 70px 90px' }}>
                        <span>ID</span><span>Type</span><span>Description</span><span>Amount</span><span>Time</span><span>Balance</span>
                    </div>
                    {transactions.map(t => (
                        <div className="tr" key={t.id} style={{ display: 'grid', gridTemplateColumns: '70px 40px 1fr 90px 70px 90px', borderLeft: `3px solid ${t.type === 'IN' ? '#34D399' : '#FB7185'}` }}>
                            <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--mt)' }}>{t.id}</span>
                            <span className="pill" style={{ fontSize: 8, textAlign: 'center', background: t.type === 'IN' ? 'rgba(52,211,153,0.12)' : 'rgba(251,113,133,0.12)', color: t.type === 'IN' ? '#34D399' : '#FB7185' }}>{t.type}</span>
                            <span style={{ fontSize: 11 }}>{t.desc}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit', color: t.type === 'IN' ? '#34D399' : '#FB7185' }}>{t.amount}</span>
                            <span style={{ fontSize: 10, color: 'var(--mt)' }}>{t.time}</span>
                            <span style={{ fontSize: 11, fontWeight: 500, fontFamily: 'Outfit' }}>{t.balance}</span>
                        </div>
                    ))}
                </div>

                {/* Denomination Panel */}
                <div>
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div className="ch"><div><div className="ct">💵 Denomination Count</div><div className="cs">Cash in drawer</div></div></div>
                        {denominations.map(d => (
                            <div key={d.note} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--cr)' }}>
                                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Outfit', color: 'var(--ink)', minWidth: 50 }}>{d.note}</span>
                                <span style={{ fontSize: 11, color: 'var(--mt)' }}>× {d.count}</span>
                                <span style={{ fontSize: 12, fontWeight: 500, fontFamily: 'Outfit' }}>{d.total}</span>
                            </div>
                        ))}
                    </div>

                    <button className="btn" style={{ width: '100%', padding: '12px', fontSize: 13, borderRadius: 10, marginBottom: 8, background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                        <i className="ri-calculator-line" style={{ marginRight: 6 }}></i>Close Register
                    </button>
                    <button className="btn-o" style={{ width: '100%', padding: '10px', fontSize: 12 }}>
                        <i className="ri-add-line" style={{ marginRight: 4 }}></i>Add Cash In/Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CashRegister;
