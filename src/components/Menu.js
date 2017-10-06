import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
// import '../styles/styles.scss'

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
      color: rgba(0, 0, 0, 0.41);
      text-transform: uppercase;
      margin-top: 20px;
      font-size: 1rem;
      margin-bottom: 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin: 0;
        display: block;
        width: 100%;

        a {
          display: block;
          margin-right: 0.5rem;
          margin-bottom: -2px;
          padding: 3px 5px;

          &:hover {
            background-color: #bdc3c7;
            color: #141c25 !important;
            text-decoration: none;
            font-weight: bold;
          }
        }
      }
    }
  }
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none !important;
  color: #525252;
  font-size: 0.8rem;
  line-height: 1.2rem;
  margin-left: 0.1rem;
  padding: 5px;
  transition: margin-left 200ms ease-out;
`

const Menu = () => (
  <StyledMenu>
    <h2>M E N U</h2>
    <div>
      <h5>Main Activity</h5>
      <ul>
        <li>
          <StyledNavLink to="/customers" activeClassName="active-navlink ">
            Customers
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/orders" activeClassName="active-navlink ">
            Orders
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/order_lines" activeClassName="active-navlink ">
            Order Lines
          </StyledNavLink>
        </li>
      </ul>
      <h5>Other Files</h5>
      <ul>
        <li>
          <StyledNavLink to="/ad_types" activeClassName="active-navlink ">
            AdTypes
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/categories" activeClassName="active-navlink ">
            Categories
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            to="/compensation_plans"
            activeClassName="active-navlink "
          >
            Comp Plans
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/fields" activeClassName="active-navlink ">
            Data Fields (Ads)
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/finding_lines" activeClassName="active-navlink ">
            Finding Lines
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/headings" activeClassName="active-navlink ">
            Headings
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/local_foreigns" activeClassName="active-navlink ">
            Local/Foreign
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/order_statuses" activeClassName="active-navlink ">
            Order Statuses
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/page_types" activeClassName="active-navlink ">
            Page Types
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/pay_plans" activeClassName="active-navlink ">
            Pay Plans
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/permissions" activeClassName="active-navlink ">
            Permissions
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/primary_books" activeClassName="active-navlink ">
            Primary Books
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/sales_reps" activeClassName="active-navlink ">
            Sales Reps
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/source_books" activeClassName="active-navlink ">
            Source Books
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/udacs" activeClassName="active-navlink ">
            Udacs
          </StyledNavLink>
        </li>
      </ul>
    </div>
  </StyledMenu>
)

export default Menu
