import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Section from './components/Section';
import Footer from './components/Footer';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  const [page, setPage] = useState('Home Incial');

  useEffect(()=>{

    console.log(page);

  },[page]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Nav />
        <Section />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
