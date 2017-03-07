import React from 'react';  
import { Link } from 'react-router';

const Menu = () => {
    return (
        <div className="Menu">
            <h2>M E N U</h2>
            <ul className="menu-group">
                <li className="sub-menu" >Main Activity</li>
                <li className="menu-item">
                    <Link to="/customers" className="link-item" activeClassName="active-link">Customers</Link>
                </li>
                <li className="menu-item">
                    <Link to="/orders" className="link-item" activeClassName="active-link">Orders</Link>
                </li>
                <li className="sub-menu" >Supporting Files</li>
                <li className="menu-item">
                    <Link to="/headings" className="link-item" activeClassName="active-link">Headings</Link>
                </li>
                <li className="menu-item">
                    <Link to="/findinglines" className="link-item" activeClassName="active-link">Finding Lines</Link>
                </li>
                <li className="menu-item">
                    <Link to="/categories" className="link-item" activeClassName="active-link">Categories</Link>
                </li>
                <li className="menu-item">
                    <Link to="/localforeign" className="link-item" activeClassName="active-link">Local/Foreign</Link>
                </li>
                <li className="menu-item">
                    <Link to="/udacs" className="link-item" activeClassName="active-link">Udacs</Link>
                </li>
                <li className="menu-item">
                    <Link to="/primarybooks" className="link-item" activeClassName="active-link">Primary Books</Link>
                </li>
                <li className="menu-item">
                    <Link to="/sourcebooks" className="link-item" activeClassName="active-link">Source Books</Link>
                </li>
                <li className="sub-menu" >Admin</li>
                <li className="menu-item">
                    <Link to="/users" className="link-item" activeClassName="active-link">Users/Reps</Link>
                </li>
                <li className="menu-item">
                    <Link to="/payplans" className="link-item" activeClassName="active-link">Pay Plans</Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;