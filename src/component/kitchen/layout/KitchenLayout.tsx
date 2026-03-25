import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Layout = () => {

    const [theme, setTheme] = useState('light');

    // Theme apply
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Theme switch function
    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    return (
        <div className="">

            {/* --- MAIN CONTENT AREA --- */}
            <div className="main">
                {/* Header (Top bar) */}
                <div className="topbar">
                    <div>
                        <div className="tp-title text-lg">PetPooja</div>
                        <div className="tp-sub">Kitchen</div>
                    </div>

                    <div className="tp-r">
                        {/* Theme Toggle Button */}
                        <div className="nbt" onClick={handleToggleTheme} title="Toggle Theme">
                            <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'} style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                        </div>
                    </div>
                </div>

                {/* pages render (Home, POS etc.) */}
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
