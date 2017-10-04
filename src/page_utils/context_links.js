import React from 'react'
// import styled from 'styled-components'

const ContextLinks = ({ page }) => {
  return <div>{page}</div>

  // //filter_on: 'account_num', select_on: undefined

  // const StyledLink = styled(Link)`
  //     font-size: .7rem;
  //     margin: 2px 2px;
  // `

  // const { dispatch, act } = p

  // const handleClick = () => {
  //     if (link.filter_on !== undefined) {
  //         const func = act['filter_' + link.link + '_on_' + link.filter_on]
  //         const payload = p.current.toJS()[link.filter_on]
  //         dispatch(func(payload))
  //     }
  //     if (link.select_on !== undefined) {
  //         const func = act['select_id_in_' + link.link]
  //         const payload = p.current.toJS()[link.select_on]
  //         dispatch(func(payload))
  //     }
  // }

  // return <StyledLink
  //     onClick={handleClick}
  //     key={link.label}
  //     to={link.link}
  // >
  //     {link.label}
  // </StyledLink>
}

export default ContextLinks
