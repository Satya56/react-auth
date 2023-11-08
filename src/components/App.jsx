import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {Switch, Route} from "react-router-dom";
import './App.css';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/react';
import Login from './login';
import Register from './Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Switch>
          <Route exact path='/' Component={Login}/>
          <Route exact path='/register' Component={Register}/>
          <Route exact path='/profile' Component={Register}/>
        </Switch>
      </ColorModeProvider>

    </ThemeProvider>
  )
}

export default App
