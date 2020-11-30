import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { getTimeAgo } from '../utils/getTimeAgo.js';
import { Link } from 'react-router-dom';
import '../styles/pages/search.css';

const Search = () => {
  const [topics, setTopics] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const category = urlParams.get('category');

  useEffect(() => {
    api
      .post('search', { title, category })
      .then((response) => setTopics(response.data));
  }, [title, category]);

  console.log(topics);

  return (
    <main className='fullscreen'>
      <Header />
      <section className='topics'>
        <h2>Search results</h2>
        {topics.map((topic) => {
          return (
            <div key={topic._id} className='topic'>
              <Link className='topicTitle' to={`/topics/${topic._id}`}>
                <h3>{topic.title}</h3>
              </Link>
              <span className='topicInfo'>
                <Link
                  className='authorName'
                  to={`user/${topic.author.username}`}
                >
                  {topic.author.username}
                </Link>
                <time dateTime={topic.date}>{getTimeAgo(topic.date)}</time>
              </span>
            </div>
          );
        })}
      </section>
      <Footer />
    </main>
  );
};

export default Search;
