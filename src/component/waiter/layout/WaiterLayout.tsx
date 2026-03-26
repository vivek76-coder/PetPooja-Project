import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const pageConfig: any = {
    '/': { title: 'Waiter Dashboard', sub: 'Your tables & orders overview' },
    '/my-tables': { title: 'My Tables', sub: 'Tables assigned to you' },
    '/take-order': { title: 'Take Order', sub: 'Place a new order for a table' },
    '/order-status': { title: 'Order Status', sub: 'Track your orders in kitchen' },
    '/table-requests': { title: 'Table Requests', sub: 'Customer service requests' },
    '/manual-order': { title: 'Manual Order', sub: 'Create order by typing items manually' },
};

const navSections = [
    {
        title: 'Overview',
        items: [
            { to: '/waiter', label: 'Dashboard', icon: 'ri-dashboard-line' },
        ],
    },
    {
        title: 'Tables & Orders',
        items: [
            { to: '/waiter/my-tables', label: 'My Tables', icon: 'ri-layout-grid-line', badge: '6' },
            { to: '/waiter/take-order', label: 'Take Order', icon: 'ri-add-circle-line' },
            { to: '/waiter/manual-order', label: 'Manual Order', icon: 'ri-edit-line' },
            { to: '/waiter/order-status', label: 'Order Status', icon: 'ri-loader-4-line', badge: '4' },
        ],
    },
    {
        title: 'Service',
        items: [
            { to: '/waiter/table-requests', label: 'Table Requests', icon: 'ri-hand-coin-line', badge: '3' },
        ],
    },
];

const WaiterLayout = () => {
    const location = useLocation();
    const path = location.pathname.replace('/waiter', '') || '/';
    const config = pageConfig[path] || pageConfig['/'];

    const [theme, setTheme] = useState('light');
    const [sidebarWidth, setSidebarWidth] = useState(0);
    const [renderBackbtn, setRenderBackbtn] = useState<boolean>(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="">
            {/* SIDEBAR */}
            <div className="sb fixed top-0 left-0 overflow-x-hidden h-screen" style={{ width: sidebarWidth, transition: '0.4s' }}>
                <div className="sb-brand">
                    <div className="sb-icon">
                        <svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" /></svg>
                    </div>
                    <div>
                        <div className="sb-name">Petpooja</div>
                        <div className="sb-sub">Waiter</div>
                    </div>
                </div>

                <div className="sb-outlet">
                    <div className="sb-ol">Current outlet</div>
                    <div className="sb-on">Koregaon Park</div>
                </div>

                <div className="sb-nav">
                    {navSections.map((section: any) => (
                        <div className="sb-sec" key={section.title}>
                            <div className="sb-sl">{section.title}</div>
                            {section.items.map((item: any) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/waiter'}
                                    className={({ isActive }) => `nav-i ${isActive ? 'act' : ''}`}
                                >
                                    <i className={item.icon} style={{ fontSize: 15 }}></i>
                                    <span>{item.label}</span>
                                    {item.badge && <span className="nav-bd">{item.badge}</span>}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex align-center justify-around py-4! px-3! border-t border-slate-700">
                    <div className="sb-av">KJ</div>
                    <div>
                        <div className="sb-un">Karan Joshi</div>
                        <div className="sb-ur">Waiter</div>
                    </div>
                    <button className='border border-gray-500 p-1! rounded! text-gray-500 shadow-md hover:bg-[#293240] hover:shadow-2xl'>LOGOUT</button>
                </div>
            </div>

            {/* MAIN */}
            <div className="main" style={{ marginLeft: sidebarWidth, transition: '0.4s' }}>
                <div className="topbar">
                    <div className='flex align-center gap-3' >
                        <button className='nbt w-12! h-12!' style={{
                            display: renderBackbtn ? 'block' : 'none',
                            transition: '0.5s'
                        }} onClick={() => {
                            setSidebarWidth(0);
                            setRenderBackbtn(false);
                        }}>
                            <i className="ri-arrow-left-line"></i>
                        </button>
                        <div>
                            <div className="tp-title">{config.title}</div>
                            <div className="tp-sub">{config.sub}</div>
                        </div>
                    </div>
                    <div className="tp-r">
                        <div className="nbt" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Toggle Theme">
                            <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'} style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                        </div>
                        <div className="nbt">
                            <i className="ri-notification-3-line" style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                            <div className="ndot"></div>
                        </div>
                        <button className='nbt rounded-md!' style={{ fontSize: 14, color: 'var(--mt)' }} onClick={() => { setSidebarWidth(sidebarWidth === 230 ? 0 : 230); setRenderBackbtn(!renderBackbtn); }}>
                            <i className="ri-menu-line"></i>
                        </button>
                    </div>
                </div>
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default WaiterLayout;
