const Menu = () => {
    return (
        <>
            <div className="menu-head">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
                    <div className="search-bar" style={{ flex: 'none' }}>
                        <svg width="13" height="13" fill="var(--mt)" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        <input placeholder="Search menu items..." style={{ color: 'var(--ink)' }} />
                    </div>
                    {['All', 'Veg', 'Non-Veg', 'Active', 'Inactive'].map((f, i) => (
                        <div className={`mcat ${i === 0 ? 'act' : ''}`} key={f}>{f}</div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-o" style={{ fontSize: 11 }}>Import</button>
                    <button className="btn" style={{ fontSize: 11 }}>+ Add Item</button>
                </div>
            </div>

            {/* Starters Section */}
            <div style={{ marginBottom: 12 }}>
                <div className="menu-cat-head">
                    <span className="mch-name">Starters</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="mch-count">6 items</span>
                        <span style={{ fontSize: 10, color: 'var(--tc)', cursor: 'pointer', fontWeight: 500 }}>+ Add item</span>
                    </div>
                </div>
                {[
                    { name: 'Paneer Tikka', type: 'Veg · Starter', price: '₹260', trend: '↑ 4% this week', trendColor: 'var(--sg)', active: true },
                    { name: 'Veg Spring Rolls', type: 'Veg · Starter', price: '₹180', trend: '— Stable', trendColor: 'var(--mt)', active: true },
                    { name: 'Chicken 65', type: 'Non-Veg · Starter', price: '₹300', trend: 'Unavailable', trendColor: 'var(--mt)', active: false },
                ].map((item) => (
                    <div className="menu-item-row" key={item.name}>
                        <div className={`mi-toggle ${item.active ? '' : 'off'}`}><div className="mi-toggle-dot"></div></div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 500, color: item.active ? 'var(--ink)' : 'var(--mt)' }}>{item.name}</div>
                            <div style={{ fontSize: 10, color: 'var(--mt)' }}>{item.type}</div>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: item.active ? 'var(--ink)' : 'var(--mt)' }}>{item.price}</div>
                        <div style={{ fontSize: 11, color: item.trendColor }}>{item.trend}</div>
                        <div><span className={`pill ${item.active ? 'p-ready' : 'p-closed'}`}>{item.active ? 'Active' : 'Inactive'}</span></div>
                        <div style={{ fontSize: 11, color: 'var(--tc)', cursor: 'pointer' }}>Edit</div>
                    </div>
                ))}
            </div>

            {/* Main Course Section */}
            <div>
                <div className="menu-cat-head">
                    <span className="mch-name">Main Course</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="mch-count">12 items</span>
                        <span style={{ fontSize: 10, color: 'var(--tc)', cursor: 'pointer', fontWeight: 500 }}>+ Add item</span>
                    </div>
                </div>
                {[
                    { name: 'Dal Makhani', type: 'Veg · Main', price: '₹280', trend: '↑ 18% this week', trendColor: 'var(--sg)' },
                    { name: 'Butter Chicken', type: 'Non-Veg · Main', price: '₹320', trend: '↑ 11% this week', trendColor: 'var(--sg)' },
                    { name: 'Palak Paneer', type: 'Veg · Main', price: '₹260', trend: '↓ 3% this week', trendColor: 'var(--tc)' },
                ].map((item) => (
                    <div className="menu-item-row" key={item.name}>
                        <div className="mi-toggle"><div className="mi-toggle-dot"></div></div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{item.name}</div>
                            <div style={{ fontSize: 10, color: 'var(--mt)' }}>{item.type}</div>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{item.price}</div>
                        <div style={{ fontSize: 11, color: item.trendColor }}>{item.trend}</div>
                        <div><span className="pill p-ready">Active</span></div>
                        <div style={{ fontSize: 11, color: 'var(--tc)', cursor: 'pointer' }}>Edit</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Menu;
