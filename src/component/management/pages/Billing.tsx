const Billing = () => {
    const bills = [
        { id: 'B-2841', guest: 'Mehra, T4', outlet: 'Koregaon Pk', amount: '₹1,360', method: 'UPI', status: 'Paid', statusClass: 'p-paid' },
        { id: 'B-2840', guest: 'Table 12', outlet: 'Koregaon Pk', amount: '₹2,180', method: 'Card', status: 'Pending', statusClass: 'p-due' },
        { id: 'B-2839', guest: 'Zomato #Z8821', outlet: 'Baner', amount: '₹860', method: 'Online', status: 'Paid', statusClass: 'p-paid' },
        { id: 'B-2838', guest: 'Table 2', outlet: 'Kothrud', amount: '₹920', method: 'Cash', status: 'Paid', statusClass: 'p-paid' },
        { id: 'B-2837', guest: 'Swiggy #SW441', outlet: 'Viman Nagar', amount: '₹540', method: 'Online', status: 'Pending', statusClass: 'p-due' },
    ];

    return (
        <div className="bill-layout">
            <div>
                <div className="grid4" style={{ marginBottom: 14 }}>
                    <div className="kpi"><div className="kl">Today's Collection</div><div className="kv">₹4.89L</div></div>
                    <div className="kpi"><div className="kl">Cash</div><div className="kv">₹1.24L</div></div>
                    <div className="kpi"><div className="kl">UPI / Card</div><div className="kv">₹3.21L</div></div>
                    <div className="kpi"><div className="kl">Pending Bills</div><div className="kv" style={{ color: 'var(--tc)' }}>7</div></div>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--dv)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="ct" style={{ fontSize: 14 }}>Recent bills</div>
                        <button className="btn" style={{ fontSize: 11 }}>New Bill</button>
                    </div>
                    <div className="th bill-list" style={{ display: 'grid' }}><span>Bill #</span><span>Guest</span><span>Outlet</span><span>Amount</span><span>Method</span><span>Status</span></div>
                    {bills.map((b) => (
                        <div className="tr bill-list" style={{ display: 'grid' }} key={b.id}>
                            <div className="tc-txt">{b.id}</div>
                            <div style={{ fontSize: 11 }}>{b.guest}</div>
                            <div style={{ fontSize: 10, color: 'var(--mt)' }}>{b.outlet}</div>
                            <div style={{ fontSize: 11, fontWeight: 500 }}>{b.amount}</div>
                            <div style={{ fontSize: 10, color: 'var(--mt)' }}>{b.method}</div>
                            <div><span className={`pill ${b.statusClass}`}>{b.status}</span></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="receipt">
                <div className="receipt-logo">
                    <div className="receipt-brand">Petpooja</div>
                    <div className="receipt-outlet">Koregaon Park, Pune</div>
                    <div style={{ fontSize: 10, color: 'var(--mt)', marginTop: 2 }}>GSTIN: 27AABCP1234Q1Z5</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--mt)', padding: '8px 0', borderTop: '1px solid var(--dv)' }}>
                    <span>Bill #B-2841</span><span>22 Mar 2026, 7:48 PM</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--mt)', marginBottom: 2 }}>Table 4 · 4 Covers · Waiter: Suresh</div>
                <div className="receipt-items">
                    <div className="ri"><span>Dal Makhani × 2</span><span>₹560</span></div>
                    <div className="ri"><span>Butter Chicken × 1</span><span>₹320</span></div>
                    <div className="ri"><span>Garlic Naan × 4</span><span>₹240</span></div>
                    <div className="ri"><span>Mango Lassi × 2</span><span>₹240</span></div>
                </div>
                <div className="receipt-tots">
                    <div className="rt"><span>Subtotal</span><span>₹1,360</span></div>
                    <div className="rt"><span>CGST 2.5%</span><span>₹34</span></div>
                    <div className="rt"><span>SGST 2.5%</span><span>₹34</span></div>
                    <div className="rt"><span>10% Loyalty Disc.</span><span style={{ color: 'var(--sg)' }}>−₹68</span></div>
                </div>
                <div className="receipt-grand"><span className="rg-l">Total Payable</span><span className="rg-v">₹1,360</span></div>
                <div className="pay-method">
                    <div className="pm">Cash</div>
                    <div className="pm act">UPI</div>
                    <div className="pm">Card</div>
                </div>
                <button className="btn" style={{ width: '100%', marginTop: 10, fontSize: 12 }}>Print & Settle Bill</button>
                <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: 'var(--mt)' }}>Thank you for dining with us</div>
            </div>
        </div>
    );
};

export default Billing;
