import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const pageConfig: any = {
    '/': { title: 'Manager Dashboard', sub: 'Today\'s operations overview' },
    '/live-orders': { title: 'Live Orders', sub: 'Real-time order tracking' },
    '/table-overview': { title: 'Table Overview', sub: 'Floor plan & table status' },
    '/staff-attendance': { title: 'Staff Attendance', sub: 'Today\'s attendance & shifts' },
    '/daily-sales': { title: 'Daily Sales Report', sub: 'Revenue & order summary' },
    '/complaints': { title: 'Customer Complaints', sub: 'Track & resolve feedback' },
    '/discount-approval': { title: 'Discount Approvals', sub: 'Pending discount requests' },
    '/inventory-alerts': { title: 'Inventory Alerts', sub: 'Low stock & reorder alerts' },
};

const navSections = [
    {
        title: 'Overview',
        items: [
            { to: '/manager', label: 'Dashboard', icon: 'ri-dashboard-line' },
            { to: '/manager/live-orders', label: 'Live Orders', icon: 'ri-shopping-cart-line', badge: '12' },
        ],
    },
    {
        title: 'Operations',
        items: [
            { to: '/manager/table-overview', label: 'Table Overview', icon: 'ri-layout-grid-line' },
            { to: '/manager/staff-attendance', label: 'Staff Attendance', icon: 'ri-group-line' },
            { to: '/manager/daily-sales', label: 'Daily Sales', icon: 'ri-line-chart-line' },
        ],
    },
    {
        title: 'Actions',
        items: [
            { to: '/manager/complaints', label: 'Complaints', icon: 'ri-feedback-line', badge: '3' },
            { to: '/manager/discount-approval', label: 'Discount Approval', icon: 'ri-percent-line', badge: '5' },
            { to: '/manager/inventory-alerts', label: 'Inventory Alerts', icon: 'ri-alarm-warning-line', badge: '7' },
        ],
    },
];

const ManagerLayout = () => {
    const location = useLocation();
    const path = location.pathname.replace('/manager', '') || '/';
    const config = pageConfig[path] || pageConfig['/'];

    const [theme, setTheme] = useState('light');
    const [sidebarWidth, setSidebarWidth] = useState(240);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

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
                        <div className="sb-sub">Manager</div>
                    </div>
                </div>

                <div className="sb-outlet">
                    <div className="sb-ol">Current outlet</div>
                    <div className="sb-on">Koregaon Park <span>▾</span></div>
                </div>

                <div className="sb-nav">
                    {navSections.map((section: any) => (
                        <div className="sb-sec" key={section.title}>
                            <div className="sb-sl">{section.title}</div>
                            {section.items.map((item: any) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/manager'}
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

                {/* Profile */}
                <div className="flex align-center justify-around py-4! px-3! border-t border-slate-700">
                    <div className="sb-av">SK</div>
                    <div>
                        <div className="sb-un">Suresh Kumar</div>
                        <div className="sb-ur">Floor Manager</div>
                    </div>
                    <button className='border border-gray-500 p-1! rounded! text-gray-500 shadow-md hover:bg-[#293240] hover:shadow-2xl'>LOGOUT</button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="main" style={{ marginLeft: sidebarWidth, transition: '0.4s' }}>
                <div className="topbar">
                    <div>
                        <div className="tp-title">{config.title}</div>
                        <div className="tp-sub">{config.sub}</div>
                    </div>
                    <div className="tp-r">
                        <div className="nbt" onClick={handleToggleTheme} title="Toggle Theme">
                            <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'} style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                        </div>
                        <div className="nbt">
                            <i className="ri-notification-3-line" style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                            <div className="ndot"></div>
                        </div>
                        <button className='nbt rounded-md!' style={{ fontSize: 14, color: 'var(--mt)' }} onClick={() => setSidebarWidth(sidebarWidth === 240 ? 0 : 240)}>
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

export default ManagerLayout;
