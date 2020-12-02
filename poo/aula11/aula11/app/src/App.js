import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Section from './components/Section';
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState('Home Incial');

  useEffect(()=>{

    console.log(page);

  },[page]);

  return (
    <div className="App">
        <Header />
        <Nav onSetPage = {setPage} />
        <Section onPage = {page} />
        <Footer />
    </div>
  );
}

export default App;
