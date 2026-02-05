import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext();

export function BrowserRouter({ children }) {
    const [path, setPath] = useState(window.location.pathname || '/');

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (to) => {
        window.history.pushState({}, '', to);
        setPath(to);
    };

    return (
        <RouterContext.Provider value={{ path, navigate }}>
            {children}
        </RouterContext.Provider>
    );
}

export function Routes({ children }) {
    const { path } = useContext(RouterContext);
    let matchedChild = null;

    React.Children.forEach(children, child => {
        if (!matchedChild && (child.props.path === path || child.props.path === '*')) {
            matchedChild = child;
        }
    });

    return matchedChild ? matchedChild.props.element : null;
}

export function Route() {
    return null; // Logic is in Routes
}

export function Link({ to, children, ...props }) {
    const { navigate } = useContext(RouterContext);

    const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
    };

    return <a href={to} onClick={handleClick} {...props}>{children}</a>;
}

export function NavLink({ to, children, className, style, ...props }) {
    const { path, navigate } = useContext(RouterContext);
    const isActive = path === to;

    const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
    };

    const finalClassName = typeof className === 'function' ? className({ isActive }) : `${className} ${isActive ? 'active' : ''}`;
    const finalStyle = typeof style === 'function' ? style({ isActive }) : style;
    const finalChildren = typeof children === 'function' ? children({ isActive }) : children;

    return (
        <a href={to} onClick={handleClick} className={finalClassName} style={finalStyle} {...props}>
            {finalChildren}
        </a>
    );
}

export function useLocation() {
    const { path } = useContext(RouterContext);
    return { pathname: path };
}

export function Navigate({ to, replace }) {
    const { navigate } = useContext(RouterContext);
    useEffect(() => {
        navigate(to);
    }, [to, navigate]);
    return null;
}
