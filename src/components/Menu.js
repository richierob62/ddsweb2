import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components'
import '../styles/rr_link.css'

const StyledMenu = styled.div`

    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    align-self: flex-start;

    > h2 {
        margin-bottom: 5px;
        font-size: 1.6rem;
        color: rgba(0, 0, 0, 0.41);
        margin-top: 2rem;
        font-weight: lighter;
    }

    div {

        h5 {
            font-weight: normal;
            padding: 14px 0 5px 0;
            color: #9c27b0; 
            margin-top: 20px;
            font-size: 1rem;        
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;        

            li a {

                &:hover {
                    background-color: rgb(216, 133, 231);
                    color: #FFFFFF;
                    box-shadow: 0 16px 26px -10px rgba(156, 39, 176, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2);
                    text-decoration: none;
                }

            }
        }
    }
`

const StyledLink = styled(Link)`
    text-decoration: none !important;
    color: #525252;
    font-size: .8rem;
    line-height: 1.2rem;
    margin-left: .5rem;
    transition: margin-left 300ms;
    padding: 5px;
`

const Menu = () => <StyledMenu>
    <h2>M E N U</h2>
    <div>
        <h5>Main Activity</h5>
        <ul>
            <li>
                <StyledLink to="/customers" activeClassName="active-link">Customers</StyledLink>
            </li>
            <li>
                <StyledLink to="/orders" activeClassName="active-link">Orders</StyledLink>
            </li>
            <li>
                <StyledLink to="/order_lines" activeClassName="active-link">Order Lines</StyledLink>
            </li>

        </ul>
        <h5>Supporting Files</h5>
        <ul>
            <li>
                <StyledLink to="/ad_types" activeClassName="active-link">AdTypes</StyledLink>
            </li>
            <li>
                <StyledLink to="/categories" activeClassName="active-link">Categories</StyledLink>
            </li>
            <li>
                <StyledLink to="/compensation_plans" activeClassName="active-link">Compensation Plans</StyledLink>
            </li>
            <li>
                <StyledLink to="/fields" activeClassName="active-link">Data Fields (Ads)</StyledLink>
            </li>
            <li>
                <StyledLink to="/findinglines" activeClassName="active-link">Finding Lines</StyledLink>
            </li>
            <li>
                <StyledLink to="/headings" activeClassName="active-link">Headings</StyledLink>
            </li>
            <li>
                <StyledLink to="/localforeign" activeClassName="active-link">Local/Foreign</StyledLink>
            </li>
            <li>
                <StyledLink to="/order_statuses" activeClassName="active-link">Order Statuses</StyledLink>
            </li>
            <li>
                <StyledLink to="/page_types" activeClassName="active-link">Page Types</StyledLink>
            </li>
            <li>
                <StyledLink to="/payplans" activeClassName="active-link">Pay Plans</StyledLink>
            </li>
            <li>
                <StyledLink to="/permissions" activeClassName="active-link">Permissions</StyledLink>
            </li>
            <li>
                <StyledLink to="/primary_books" activeClassName="active-link">Primary Books</StyledLink>
            </li>
            <li>
                <StyledLink to="/sales_reps" activeClassName="active-link">Sales Reps</StyledLink>
            </li>
            <li>
                <StyledLink to="/source_books" activeClassName="active-link">Source Books</StyledLink>
            </li>
            <li>
                <StyledLink to="/udacs" activeClassName="active-link">Udacs</StyledLink>
            </li>
        </ul>
    </div>
</StyledMenu>

export default Menu;