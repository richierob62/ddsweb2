import React from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Main from './Main'
import styled, { ThemeProvider } from 'styled-components'

const theme = {}

const MasterPageLayout = styled.div`
  display: grid;
  max-width: 1200px;
  border: 1px solid #d9ceca;
  box-shadow: 10px 0px 44px rgba(118, 129, 141, 0.33);  
  margin: auto;  
  grid-template-columns: 150px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: 'header header' 'menu main';
`

const HeaderPlacement = styled.div`grid-area: header;`
const MenuPlacement = styled.div`grid-area: menu;`
const MainPlacement = styled.div`grid-area: main;`

const App = props => {
  return (
    <ThemeProvider theme={theme}>
      <MasterPageLayout>
        <HeaderPlacement>
          <Header />
        </HeaderPlacement>
        <MenuPlacement>
          <Menu />
        </MenuPlacement>
        <MainPlacement>
          <Main {...props} />
        </MainPlacement>
      </MasterPageLayout>
    </ThemeProvider>
  )
}

export default App
