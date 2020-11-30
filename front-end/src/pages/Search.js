import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { getTimeAgo } from '../utils/getTimeAgo.js';
import { Link, useHistory } from 'react-router-dom';
import '../styles/pages/search.css';

const Search = () => {
  const [topics, setTopics] = useState([]);
  const history = useHistory();

  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const category = urlParams.get('category');

  useEffect(() => {
    api.post('search', { title, category }).then((response) => {
      if (response.status === 250)
        return window.alert('No topics were found, try again :p');
      setTopics(response.data);
    });
  }, [title, category]);

  console.log(history.location);
  console.log(topics);

  function handleCategory(e) {
    if (title)
      return history.push(`?title=${title}&category=${e.currentTarget.value}`);
    return history.push(`?category=${e.currentTarget.value}`);
  }

  return (
    <main className='fullscreen'>
      <Header />
      <section className='topics'>
        <section className='topDiv'>
          <h2>Search results</h2>
          <form className='filter'>
            <label for='category'>Filter by category</label> <br />
            <select id='category' onChange={handleCategory}>
              <option value='all'>Choose an option</option>
              <option value='C++/C/C#'>C++/C/C#</option>
              <option value='HTML/CSS'>HTML/CSS</option>
              <option value='Java'>Java</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='Python'>Python</option>
              <option value='PHP'>PHP</option>
              <option value='Ruby'>Ruby</option>
            </select>
          </form>
        </section>
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
