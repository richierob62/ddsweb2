import React from 'react';

const Page = (props) => {
    
    return (
        <div className="Page">
            {props.children}
        </div>
    );
}

export default Page;