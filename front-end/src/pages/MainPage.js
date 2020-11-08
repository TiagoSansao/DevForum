import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import '../styles/pages/mainPage.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get(`topics`).then((res) => {
      setTopics(res.data);
    });
  }, []);

  function getTimeAgo(date) {
    const difference = Date.now() - Date.parse(date);
    const timeAgo = Math.floor(difference / 1000);
    if (timeAgo <= 60) {
      return `${timeAgo} seconds ago`;
    } else if (timeAgo > 60 && timeAgo <= 60 * 60) {
      return `${Math.floor(timeAgo / 60)} minutes ago`;
    } else if (timeAgo > 60 * 60 && timeAgo <= 60 * 60 * 24) {
      return `${Math.floor(timeAgo / (60 * 60))} hours ago`;
    } else {
      return `${Math.floor(timeAgo / (60 * 60 * 24))} days ago`;
    }
  }

  console.log(topics);

  return (
    <main>
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
                <cite>{topic.author}</cite>
                <time dateTime={topic.date}>{getTimeAgo(topic.date)}</time>
              </span>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default MainPage;
