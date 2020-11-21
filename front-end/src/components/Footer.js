import React from 'react';
import '../styles/components/footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
      <p>Tiago Schulz Sansão &copy; 2020 - {new Date().getFullYear()}</p>
      <p>
        <a
          rel='noreferrer'
          target='_blank'
          href='https://github.com/TiagoSansao'
        >
          GitHub
        </a>{' '}
        &nbsp; &nbsp; &nbsp; &nbsp;
        <a
          target='_blank'
          rel='noreferrer'
          href='https://www.linkedin.com/in/tiago-schulz-sans%C3%A3o-9283351b7/'
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
