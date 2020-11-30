import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const Search = () => {
  const [topics, setTopics] = useState();

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const category = urlParams.get('category');
  console.log(topics);

  useEffect(() => {
    api
      .post('search', { title, category })
      .then((response) => setTopics(response.data));
  }, [title, category]);

  return (
    <main className='fullscreen'>
      <Header />

      <Footer />
    </main>
  );
};

export default Search;
