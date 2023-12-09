import { useState } from 'react';
import {Routes, Route} from "react-router-dom";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/react';
import Login from './login';
import Register from './Register';
import Profile from './Profile';
import ThemeToggler from './ThemeToggler';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ThemeToggler />
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
        </Routes>
      </ColorModeProvider>

    </ThemeProvider>
  )
}

export default App
