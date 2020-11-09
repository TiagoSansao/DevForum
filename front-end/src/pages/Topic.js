import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import '../styles/pages/topic.css';
import { useParams } from 'react-router-dom';
import defaultUserImage from '../assets/default-user-image.png';
import { getTimeAgo } from '../utils/getTimeAgo';

const Topic = () => {
  const params = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    api.get(`/topics/${params.topicId}`).then((response) => {
      setTopic(response.data);
      console.log(response);
    });
  }, [params.topicId]);

  if (!topic) {
    return (
      <main>
        <Header />
        <div className='loading'>
          <h3>Loading...</h3>
          <h4>Plase wait, sorry for the inconvenience!</h4>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <article className='singleTopic'>
        <header>
          <h2>{topic.title}</h2>
          <div>
            <h3>{topic.category}</h3>
            <time>{getTimeAgo(topic.date)}</time>
          </div>
        </header>
        <main>{topic.content}</main>
        <aside>
          <cite>{topic.author}</cite>
          <img src={defaultUserImage} alt='' />
          <div>
            <span>informações</span> <br />
            <span>daoras</span>
          </div>
        </aside>
      </article>
    </main>
  );
};

export default Topic;
