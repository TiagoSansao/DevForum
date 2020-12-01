import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/mainPage.css';
import { Link, useHistory } from 'react-router-dom';
import { getTimeAgo } from '../utils/getTimeAgo';

const MainPage = () => {
  const history = useHistory();
  const [topics, setTopics] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    api.get(`topics`).then((res) => {
      setTopics(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <main className='fullscreen'>
      <Header />
      <section style={{ display: 'block' }}>
        <section className='topics'>
          <section className='topDiv'>
            <h2>Recent topics</h2>
            <form className='filter'>
              <label for='category'>Filter by category</label> <br />
              <select
                id='category'
                onChange={(e) =>
                  history.push(`/search?category=${e.currentTarget.value}`)
                }
              >
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
                  {topic.category}
                  <time dateTime={topic.date}>{getTimeAgo(topic.date)}</time>
                </span>
              </div>
            );
          })}
        </section>
      </section>
      <Link to={'/create'} className='newTopic'>
        <p>Create a topic</p>
      </Link>
      <Footer />
    </main>
  );
};

export default MainPage;
