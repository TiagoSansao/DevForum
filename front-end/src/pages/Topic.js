import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import '../styles/pages/topic.css';
import { useParams } from 'react-router-dom';

const Topic = () => {
  const params = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    api.get(`/topics/${params.topicId}`).then((response) => {
      setTopic(response);
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
    </main>
  );
};

export default Topic;
