import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import '../styles/pages/topic.css';
import { Link, useParams } from 'react-router-dom';
import defaultUserImage from '../assets/default-user-image.png';
import { getTimeAgo } from '../utils/getTimeAgo';

const Topic = () => {
  const params = useParams();
  const [topic, setTopic] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  function apiCall() {
    api.get(`/topics/${params.topicId}`).then((response) => {
      setTopic(response.data);
      console.log(response.data.replies);
    });
  }

  useEffect(() => {
    apiCall();
  }, [params.topicId]);

  async function handleReplySybmit(e) {
    e.preventDefault();
    const data = {
      topic: topic._id,
      content: replyContent,
    };
    await api.post('/reply', data);
    await apiCall();
    setReplyContent('');
  }

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
            <time dateTime={topic.date}>{getTimeAgo(topic.date)}</time>
          </div>
        </header>
        <main>{topic.content}</main>
        <aside>
          <Link to={`/user/${topic.author.username}`} className='authorName'>
            {topic.author.username}
          </Link>
          <img src={defaultUserImage} alt='' />
          <div className='personInfo'>
            <span>
              Register: {new Date(topic.author.registerDate).getMonth()}/
              {new Date(topic.author.registerDate).getDay()}/
              {new Date(topic.author.registerDate).getFullYear()}
            </span>{' '}
            <br />
          </div>
        </aside>
      </article>
      {topic.replies.map((reply) => {
        return (
          <article key={reply._id} className='singleTopic'>
            <header>
              <div>
                <time>{getTimeAgo(reply.date)}</time>
              </div>
            </header>
            <main>{reply.content}</main>
            <aside>
              <Link
                to={`/user/${reply.author.username}`}
                className='authorName'
              >
                {reply.author.username}
              </Link>
              <img src={defaultUserImage} alt='' />
              <div className='personInfo'>
                <span>
                  Register: {new Date(reply.author.registerDate).getMonth()}/
                  {new Date(reply.author.registerDate).getDay()}/
                  {new Date(reply.author.registerDate).getFullYear()}
                </span>{' '}
                <br />
              </div>
            </aside>
          </article>
        );
      })}
      <form method='post' className='replyForm' onSubmit={handleReplySybmit}>
        <h2>Your reply</h2>
        <textarea
          maxLength={2048}
          value={replyContent}
          onChange={(e) => {
            setReplyContent(e.target.value);
          }}
          placeholder="Type your reply to this post here, don't be shy :D"
        />
        <input type='submit' />
      </form>
    </main>
  );
};

export default Topic;
