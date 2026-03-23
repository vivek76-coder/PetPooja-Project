const POS = () => {
    const foodIcon = (
        <svg viewBox="0 0 24 24">
            <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2H1z" />
        </svg>
    );

    const menuItems = [
        { name: 'Dal Makhani', price: '₹280', veg: true },
        { name: 'Butter Chicken', price: '₹320', veg: false },
        { name: 'Paneer Tikka', price: '₹260', veg: true },
        { name: 'Garlic Naan', price: '₹60', veg: true },
        { name: 'Mango Lassi', price: '₹120', veg: true },
        { name: 'Chicken Biryani', price: '₹380', veg: false },
    ];

    return (
        <div className="pos-layout">
            <div>
                <div className="menu-cats">
                    {['All Items', 'Starters', 'Main Course', 'Breads', 'Biryani', 'Beverages', 'Desserts'].map((cat, i) => (
                        <div className={`mcat ${i === 0 ? 'act' : ''}`} key={cat}>{cat}</div>
                    ))}
                </div>
                <div className="menu-grid">
                    {menuItems.map((item) => (
                        <div className="mi" key={item.name}>
                            <div className="mi-img">{foodIcon}</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                                <div className="mi-name">{item.name}</div>
                                {item.veg ? (
                                    <div className="mi-veg"><div className="mi-veg-dot"></div></div>
                                ) : (
                                    <div style={{ width: 10, height: 10, border: '1px solid #E24B4A', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#E24B4A' }}></div>
                                    </div>
                                )}
                            </div>
                            <div className="mi-price">{item.price}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="order-panel">
                <div className="op-head">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="op-table">Table 4 — Dine In</div>
                        <span className="pill p-new">New</span>
                    </div>
                    <div className="op-info">Koregaon Park · Waiter: Suresh · 4 covers</div>
                </div>
                <div className="op-items">
                    {[
                        { name: 'Dal Makhani', qty: 2, price: '₹560' },
                        { name: 'Butter Chicken', qty: 1, price: '₹320' },
                        { name: 'Garlic Naan', qty: 4, price: '₹240' },
                        { name: 'Mango Lassi', qty: 2, price: '₹240' },
                    ].map((item) => (
                        <div className="op-item" key={item.name}>
                            <div className="op-iname">{item.name}</div>
                            <div className="op-qty">
                                <div className="qty-btn">−</div>
                                <div className="qty-n">{item.qty}</div>
                                <div className="qty-btn">+</div>
                            </div>
                            <div className="op-price">{item.price}</div>
                        </div>
                    ))}
                    <div style={{ padding: '8px 16px', borderTop: '1px dashed var(--dv)', cursor: 'pointer' }}>
                        <div style={{ fontSize: 11, color: 'var(--tc)', fontWeight: 500 }}>+ Add item</div>
                    </div>
                </div>
                <div className="op-total">
                    <div className="tot-row"><span>Subtotal</span><span>₹1,360</span></div>
                    <div className="tot-row"><span>CGST 2.5%</span><span>₹34</span></div>
                    <div className="tot-row"><span>SGST 2.5%</span><span>₹34</span></div>
                    <div className="tot-row"><span>Discount</span><span style={{ color: 'var(--sg)' }}>−₹68</span></div>
                    <div className="tot-grand">
                        <span className="tot-gl">Grand Total</span>
                        <span className="tot-gv">₹1,360</span>
                    </div>
                    <div className="pay-btns">
                        <button className="btn-o" style={{ fontSize: 11 }}>KOT Print</button>
                        <button className="btn" style={{ fontSize: 11 }}>Proceed to Pay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POS;
