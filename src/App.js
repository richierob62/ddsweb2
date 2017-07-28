import React from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Main from './Main'
import styled, { ThemeProvider } from 'styled-components'

const theme = { foo: 'bar' }

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <MainSection>
          <Menu />
          <Main {...props} />
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
