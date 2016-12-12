import React from 'react';
import CustomerList from './CustomerList';
import Details from './Details';
import ContextMenu from './ContextMenu';

const Customers = () => {
    return (
        <div className="Customers">
            <h1 className="page-title">Customers</h1>
            <div className="Page-vertical">
                <CustomerList />
                <div className="Page-lower">
                    <Details />
                    <ContextMenu />
                </div>
            </div>            
        </div>
    );
}

export default Customers;