<header>
  <h1 align="center"> DevForum </h1>
  <p align="center"> 
    <strong> A forum especially made for developers</strong> 
  </p>
  <p align="center"> 
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#preview">Preview</a> •
    <a href="#instalacao">Getting started</a> •
    <a href="#tecnologias">Technologies</a> 
  </p>
  <hr/>
</header>
<main>

  <div id="about">
    <h3 align="center">💁 About</h3>
    <p>The purpose of this forum is to help developers in general, independent of the developer's seniority. Using this amazing web application you can interact with others developers creating topics or replying to them, so whenever you have a doubt, need help or want to help someone, you can go directly to DevForum! </p>
  </div>

  <hr/>

  <div id="features">
    <h3 align="center">⭐ Features</h3>
    <ul>
      <li>Settings page to easily change password, photo and description</li>
      <li>Responsive design, using: grid, flexbox and media queries</li>
      <li>Filter topics by category, page and title at the same time</li>
      <li>Information is given to front-end by a RESTful API</li>
      <li>Search mechanism to easily find topics</li>
      <li>Users' profiles with their information</li>
      <li>Validation at all back-end endpoints</li>
      <li>Customizable photo and description</li>
      <li>Hashed passwords using Bcrypt</li>
      <li>Write topics and reply to them</li>
      <li>Pagination to organize topics</li>
      <li>JWT Authentication</li>
      <li>NoSQL database</li>
    </ul>
  </div>

  <hr/>

  <div align="center" id="preview">
    <h3 align="center">👀 Preview</h3>
    <img width='390px' src="./front-end/src/assets/preview02.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
    <img width='390px' src="./front-end/src/assets/preview01.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
    <img width='390px' src="./front-end/src/assets/preview03.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
    <img width='390px' src="./front-end/src/assets/preview04.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
  </div>

  <hr/>

  <div id="instalacao">
    <h3 align="center">💻 Getting started</h3>
    <p> :warning: It's necessary to have <a href="https://nodejs.org/en/" target="_blank">Node.JS</a> or <a href="https://classic.yarnpkg.com/en/" target="_blank">Yarn</a> installed to be able to proceed from here; </p>
<ul><li>Instructions</li></ul>

```markdown
# Clone the repository

$ git clone https://github.com/TiagoSansao/DevForum

# Go to the front-end directory

$ cd front-end/

# Install all dependencies

$ yarn install

# Start the front-end

$ yarn start

# Go back to main directory

$ cd ..

# Go to back-end directory

$ cd back-end/

# Install all dependencies

$ yarn install

# Start the back-end

$ yarn run dev
```

  <p>In the back-end directory, create an file named ".env", write it following this structure, remember that you will have to create your own MongoDB database in order to put your connect credentials.</p>

```markdown
PORT=3500
MONGOOSE_URI=mongodb+srv://{name}:{password}@cluster0.adurt.mongodb.net/devforum?retryWrites=true&w=majority
JWT_TOKEN={write something random here}
```

  </div>

  <hr/>

  <div id="tecnologias">
    <h3 align="center">🚀 Technologies</h3>
    <ul>
      <li>Front-end</li>
        <ul>
          <li><a href="https://reactjs.org/">React</a></li>
          <li><a href='https://reactrouter.com/web/guides/quick-start'>React-router-dom</a></li>
          <li><a href='https://github.com/axios/axios'>Axios</a></li>
        </ul>
      <li>Back-end</li>
      <ul>
        <li><a href='https://nodejs.org/en/'>Node.js</a></li>
        <li><a href='https://expressjs.com/'>Express</a></li>
        <li><a href='https://www.npmjs.com/package/bcrypt'>Bcrypt.js</a></li>
        <li><a href='https://www.npmjs.com/package/cors'>Cors</a></li>
        <li><a href='https://www.npmjs.com/package/dotenv'>Dotenv</a></li>
        <li><a href='https://www.npmjs.com/package/jsonwebtoken'>JsonWebToken</a></li>
        <li><a href='https://www.npmjs.com/package/multer'>Multer</a></li>
        <li><a href='https://mongoosejs.com/'>Mongoose</a></li>
      </ul>
    </ul>
  </div>

  <hr/>

  <p align="center"> 🔥 Developed by Tiago Schulz Sansão  👋  <a href="https://www.linkedin.com/in/tiago-schulz-sans%C3%A3o-9283351b7/">Check my LinkedIn</p>

</main>
