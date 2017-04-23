import { Link } from 'react-router';
import React from 'react'

const createLink = (p, link) => {

    //filter_on: 'account_num', select_on: undefined 

    const { dispatch, act } = p

    const handleClick = () => {
        if (link.filter_on !== undefined) {
            const func = act['filter_' + link.link + '_on_' + link.filter_on]
            const payload = p.current.toJS()[link.filter_on]
            dispatch(func(payload))
        }
        if (link.select_on !== undefined) {
            const func = act['select_id_in_' + link.link]
            const payload = p.current.toJS()[link.select_on]
            dispatch(func(payload))
        }
    }
    const linkStyle = {
        fontSize: '.7rem',
        margin: '2px 2px'
    }
    return <Link
        onClick={handleClick}
        key={link.label}
        to={link.link}
        style={linkStyle}
    >
        {link.label}

    </Link>
}

export default createLink
