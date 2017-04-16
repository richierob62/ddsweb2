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
                <li className="menu-item">
                    <Link to="/order_lines" className="link-item" activeClassName="active-link">Order Lines</Link>
                </li>
                <li className="sub-menu" >Supporting Files</li>
                <li className="menu-item">
                    <Link to="/ad_types" className="link-item" activeClassName="active-link">AdTypes</Link>
                </li>
                <li className="menu-item">
                    <Link to="/categories" className="link-item" activeClassName="active-link">Categories</Link>
                </li>
                <li className="menu-item">
                    <Link to="/compensation_plans" className="link-item" activeClassName="active-link">Compensation Plans</Link>
                </li>
                <li className="menu-item">
                    <Link to="/fields" className="link-item" activeClassName="active-link">Data Fields (Ads)</Link>
                </li>
                <li className="menu-item">
                    <Link to="/findinglines" className="link-item" activeClassName="active-link">Finding Lines</Link>
                </li>
                <li className="menu-item">
                    <Link to="/headings" className="link-item" activeClassName="active-link">Headings</Link>
                </li>
                <li className="menu-item">
                    <Link to="/localforeign" className="link-item" activeClassName="active-link">Local/Foreign</Link>
                </li>
                <li className="menu-item">
                    <Link to="/order_statuses" className="link-item" activeClassName="active-link">Order Statuses</Link>
                </li>
                <li className="menu-item">
                    <Link to="/page_types" className="link-item" activeClassName="active-link">Page Types</Link>
                </li>
                <li className="menu-item">
                    <Link to="/payplans" className="link-item" activeClassName="active-link">Pay Plans</Link>
                </li>
                <li className="menu-item">
                    <Link to="/permissions" className="link-item" activeClassName="active-link">Permissions</Link>
                </li>
                <li className="menu-item">
                    <Link to="/primarybooks" className="link-item" activeClassName="active-link">Primary Books</Link>
                </li>
                <li className="menu-item">
                    <Link to="/sales_reps" className="link-item" activeClassName="active-link">Sales Reps</Link>
                </li>
                <li className="menu-item">
                    <Link to="/sourcebooks" className="link-item" activeClassName="active-link">Source Books</Link>
                </li>
                <li className="menu-item">
                    <Link to="/udacs" className="link-item" activeClassName="active-link">Udacs</Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;