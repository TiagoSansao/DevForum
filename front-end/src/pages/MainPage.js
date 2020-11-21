import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/mainPage.css';
import { Link } from 'react-router-dom';
import { getTimeAgo } from '../utils/getTimeAgo';

const MainPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get(`topics`).then((res) => {
      setTopics(res.data);
    });
  }, []);

  return (
    <main className='mainPage'>
      <Header />
      <section className='topics'>
        <h2>Recent topics</h2>
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
      <Link to={'/create'} className='newTopic'>
        <span>New Topic</span>
      </Link>
      <Footer />
    </main>
  );
};

export default MainPage;
