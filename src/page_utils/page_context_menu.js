import React from 'react'
import ContextLinks from '../page_utils/context_links'
import CrudButtons from '../page_utils/crud_buttons'
import styled from 'styled-components'

const StyledContextMenu = styled.div`
  margin-top: 10px;
  padding-left: 10px;
  color: rgb(162; 156; 156);
  font-weight: 100;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  p {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const LinksLabel = styled.h6`
  font-weight: normal;
  padding: 14px 0 5px 0;
  color: rgba(0, 0, 0, 0.41);
  text-transform: uppercase;
  margin-top: 20px;
  font-size: 1rem;
  margin-bottom: 0;
`

const PageContextMenu = props => (
  <StyledContextMenu>
    <CrudButtons {...props} />
    <LinksLabel>LINKS</LinksLabel>
    <ContextLinks {...props} />
  </StyledContextMenu>
)

export default PageContextMenu
