import { useState } from 'react';

const PaymentCollection = () => {
    const [selectedMethod, setSelectedMethod] = useState('cash');
    const [splitMode, setSplitMode] = useState(false);

    const currentBill = {
        id: '#ORD-901',
        table: 'Table 7',
        waiter: 'Karan Joshi',
        items: [
            { name: 'Butter Chicken', qty: 2, price: 640 },
            { name: 'Garlic Naan', qty: 4, price: 240 },
            { name: 'Mango Lassi', qty: 2, price: 240 },
        ],
        subtotal: 1120,
        cgst: 28,
        sgst: 28,
        discount: 0,
        grandTotal: 1176,
    };

    const paymentMethods = [
        { key: 'cash', label: 'Cash', icon: 'ri-money-rupee-circle-line', color: '#10B981' },
        { key: 'upi', label: 'UPI', icon: 'ri-qr-code-line', color: '#818CF8' },
        { key: 'card', label: 'Card', icon: 'ri-bank-card-line', color: '#F59E0B' },
        { key: 'wallet', label: 'Wallet', icon: 'ri-wallet-3-line', color: '#38BDF8' },
    ];

    const quickAmounts = [500, 1000, 1200, 1500, 2000];

    return (
        <div className="mgr-page">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>
                {/* Left: Bill Details */}
                <div>
                    {/* Bill Header */}
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, color: 'var(--tc)' }}>{currentBill.id}</span>
                                    <span className="tag">{currentBill.table}</span>
                                    <span className="pill p-ready" style={{ fontSize: 9 }}>SERVED</span>
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--mt)' }}>Waiter: {currentBill.waiter} · Dine-in · 3 items</div>
                            </div>
                            <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: 'var(--ink)' }}>₹{currentBill.grandTotal.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div className="ch"><div><div className="ct">Order Items</div></div></div>
                        <div className="th" style={{ display: 'grid', gridTemplateColumns: '40px 1fr 60px 80px' }}>
                            <span>Qty</span><span>Item</span><span>Rate</span><span>Amount</span>
                        </div>
                        {currentBill.items.map((item, idx) => (
                            <div className="tr" key={idx} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 60px 80px' }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tc)' }}>{item.qty}×</span>
                                <span style={{ fontSize: 12, fontWeight: 500 }}>{item.name}</span>
                                <span style={{ fontSize: 11, color: 'var(--mt)' }}>₹{item.price / item.qty}</span>
                                <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit' }}>₹{item.price}</span>
                            </div>
                        ))}
                        <div style={{ borderTop: '1px dashed var(--dv)', marginTop: 8, paddingTop: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--mt)', marginBottom: 4 }}><span>Subtotal</span><span>₹{currentBill.subtotal.toLocaleString()}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--mt)', marginBottom: 4 }}><span>CGST 2.5%</span><span>₹{currentBill.cgst}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--mt)', marginBottom: 4 }}><span>SGST 2.5%</span><span>₹{currentBill.sgst}</span></div>
                            {currentBill.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--sg)', marginBottom: 4 }}><span>Discount</span><span>-₹{currentBill.discount}</span></div>}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, fontFamily: 'Outfit', color: 'var(--tc)', borderTop: '1px solid var(--dv)', paddingTop: 8, marginTop: 4 }}><span>Grand Total</span><span>₹{currentBill.grandTotal.toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>

                {/* Right: Payment Panel */}
                <div>
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div className="ch"><div><div className="ct">Payment Method</div></div></div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                            {paymentMethods.map(m => (
                                <div key={m.key} onClick={() => setSelectedMethod(m.key)} style={{ padding: '14px 12px', borderRadius: 10, border: `2px solid ${selectedMethod === m.key ? m.color : 'var(--dv)'}`, background: selectedMethod === m.key ? `${m.color}12` : 'var(--ww)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                                    <i className={m.icon} style={{ fontSize: 22, color: m.color, display: 'block', marginBottom: 4 }}></i>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: selectedMethod === m.key ? m.color : 'var(--ink)' }}>{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div className="ch"><div><div className="ct">Amount</div></div></div>
                        <div style={{ textAlign: 'center', marginBottom: 12 }}>
                            <div style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 700, color: 'var(--tc)' }}>₹{currentBill.grandTotal.toLocaleString()}</div>
                            <div style={{ fontSize: 10, color: 'var(--mt)', marginTop: 2 }}>Amount to collect</div>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
                            {quickAmounts.map(a => (
                                <button key={a} className="btn-o" style={{ fontSize: 11, padding: '5px 12px' }}>₹{a.toLocaleString()}</button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                            <button className="btn-o" style={{ flex: 1, fontSize: 11 }} onClick={() => setSplitMode(!splitMode)}>
                                <i className="ri-split-cells-horizontal" style={{ marginRight: 4 }}></i>Split Bill
                            </button>
                            <button className="btn-o" style={{ flex: 1, fontSize: 11 }}>
                                <i className="ri-percent-line" style={{ marginRight: 4 }}></i>Request Discount
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button className="btn" style={{ width: '100%', padding: '14px', fontSize: 15, fontWeight: 600, borderRadius: 12, marginBottom: 8, background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                        <i className="ri-checkbox-circle-line" style={{ marginRight: 6 }}></i>
                        Collect ₹{currentBill.grandTotal.toLocaleString()}
                    </button>
                    <button className="btn-o" style={{ width: '100%', padding: '10px', fontSize: 12 }}>
                        <i className="ri-printer-line" style={{ marginRight: 4 }}></i>Print Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCollection;
