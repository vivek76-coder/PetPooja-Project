import { menuItems } from "../../data/menuData";

const Menu = () => {
    // Group items by category
    const categories = Array.from(new Set(menuItems.map(item => item.category)));

    return (
        <>
            {/* menu header */}
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

            {/* menu categories */}
            {categories.map((cat) => {
                const items = menuItems.filter(item => item.category === cat);
                return (
                    <div key={cat} style={{ marginBottom: 20 }}>
                        <div className="menu-cat-head">
                            {/* menu category name */}
                            <span className="mch-name">{cat}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                {/* menu category count */}
                                <span className="mch-count">{items.length} items</span>
                                {/* add item button */}
                                <span style={{ fontSize: 10, color: 'var(--tc)', cursor: 'pointer', fontWeight: 500 }}>+ Add item</span>
                            </div>
                        </div>

                        {/* menu items */}
                        {items.map((item) => (
                            <div className="menu-item-row" key={item.name}>
                                {/* menu item toggle */}
                                <div className={`mi-toggle ${item.active ? '' : 'off'}`}><div className="mi-toggle-dot"></div></div>
                                <div>
                                    {/* menu item name */}
                                    <div style={{ fontSize: 12, fontWeight: 500, color: item.active ? 'var(--ink)' : 'var(--mt)' }}>{item.name}</div>
                                    {/* menu item type */}
                                    <div style={{ fontSize: 10, color: 'var(--mt)' }}>{item.veg ? 'Veg' : 'Non-Veg'} · {cat}</div>
                                </div>
                                {/* menu item price */}
                                <div style={{ fontSize: 12, fontWeight: 500, color: item.active ? 'var(--ink)' : 'var(--mt)' }}>{item.price}</div>
                                {/* menu item trend */}
                                <div style={{ fontSize: 11, color: item.trendColor || 'var(--mt)' }}>{item.trend || '— Stable'}</div>
                                {/* menu item status */}
                                <div><span className={`pill ${item.active ? 'p-ready' : 'p-closed'}`}>{item.active ? 'Active' : 'Inactive'}</span></div>
                                {/* menu item edit */}
                                <div style={{ fontSize: 11, color: 'var(--tc)', cursor: 'pointer' }}>Edit</div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
};

export default Menu;
