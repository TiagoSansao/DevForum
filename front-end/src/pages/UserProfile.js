import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import '../styles/pages/userProfile.css';
import img from '../assets/default-user-image.png';
import { getTimeAgo } from '../utils/getTimeAgo';

const UserProfile = () => {
  const { user } = useParams();
  const [userData, setUserData] = useState({});
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get(`/user/${user}`).then((response) => {
      setUserData(response.data);
      api.get(`/topics/from/${response.data._id}`).then((res) => {
        setTopics(res.data);
      });
    });
  }, [user]);

  console.log(topics);

  return (
    <main className='fullscreen'>
      <Header />
      <section id='userProfile'>
        <div className='dataContainer'>
          <img className='profileImage' src={img} alt=''></img>
          <div className='userContainer'>
            <h2>{userData.username}</h2>
            <hr /> <br />
            <time dateTime={userData.birthday}>
              Birthday: {new Date(userData.birthday).toLocaleDateString()}
            </time>{' '}
            <br />
            <time dateTime={userData.registerDate}>
              Register date:{' '}
              {new Date(userData.registerDate).toLocaleDateString()}
            </time>
          </div>
        </div>
        <section className='topicsProfile'>
          <h2>
            Recent topics from {userData.username}
            {topics.length === 0 && (
              <p
                style={{ color: '#ff2a6d', textAlign: 'center', fontSize: 15 }}
              >
                {userData.username} has not created any topic yet.
              </p>
            )}
          </h2>
          {topics.length !== 0 &&
            topics.map((topic) => {
              return (
                <div key={topic._id} className='topicProfile'>
                  <Link className='topicTitle' to={`/topics/${topic._id}`}>
                    <h3>{topic.title}</h3>
                  </Link>
                  <span className='topicProfileInfo'>
                    <Link
                      className='authorName'
                      to={`/user/${userData.username}`}
                    >
                      {userData.username}
                    </Link>
                    <time dateTime={topic.date}>{getTimeAgo(topic.date)}</time>
                  </span>
                </div>
              );
            })}
        </section>
      </section>
      <Footer />
    </main>
  );
};

export default UserProfile;
