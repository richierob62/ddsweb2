import './App.css'
import React from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Page from './components/Page'
import styled, { ThemeProvider } from 'styled-components'

const theme = { foo: 'bar' }

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <MainSection>
          <Menu />
          <Page {...props} />
        </MainSection>
      </div>
    </ThemeProvider>
  )
}

const MainSection = styled.div`
    display: flex;
    width: 100%
`

const Wrapper = styled(App) `
    display: flex;
    flex-direction: column;
`

export default Wrapper
