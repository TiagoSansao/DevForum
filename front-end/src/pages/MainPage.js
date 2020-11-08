import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import '../styles/pages/mainPage.css';

const MainPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get(`topics`).then((res) => {
      setTopics(res.data);
    });
  }, []);

  console.log(topics);

  return (
    <main>
      <Header />
      <section className='topics'>
        <h2>Recent topics</h2>
        {topics.map((topic) => {
          return (
            <div key={topic._id} className='topic'>
              <h3>{topic.title}</h3>
              <span>
                <cite>{topic.author}</cite>
                <time>{topic.date}</time>
              </span>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default MainPage;
