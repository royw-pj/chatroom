import React from 'react';
import GlobalContainer from './components/layout/global-container';
import AppBar from './components/layout/app-bar';
import Registration from './registration';
import About from './about';
import ContentContainer from './components/layout/content-container';
import Footer from './components/layout/footer';
import Chatroom from './chatroom';
import { Routes, Route } from "react-router-dom";


window.onbeforeunload = function(e) {
  e.preventDefault();
  console.log('test');
};

function App() {
  return (
    <GlobalContainer>
      <AppBar />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </ContentContainer>
    </GlobalContainer>
  );
}

export default App;

