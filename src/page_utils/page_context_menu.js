import React from 'react'
// import createLink from '../component_utils/context_menu_link'
// import contextMenuButtons from '../component_utils/context_menu_buttons'
// import styled from 'styled-components'

// const StyledContextMenu = styled.div`
//         width: 15%;
//         margin-top: 50px;
//         padding-left: 20px;
//         color: rgb(162; 156; 156);
//         font-weight: 100;
//         font-size: 0.9rem;
//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//         align-items: center;

//         p {
//             margin-bottom: 0;
//             padding-bottom: 0;            
//         }
// `


// const buildPageContextMenu = p => {
//     if (!p.current) return null
//     const links = p.data.get('context_menu').toJS()
//         .map(link => createLink(p, link))
//     return (
//         <StyledContextMenu>
//             <p>Related Items</p>
//             {links}
//             {contextMenuButtons(p)}
//         </StyledContextMenu>
//     )
// }

const buildPageContextMenu = ({page}) => <p>Menu for {page}</p>
export default buildPageContextMenu
