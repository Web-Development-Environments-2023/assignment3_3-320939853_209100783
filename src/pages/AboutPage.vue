<template>
  <div id="aboutpage">
    <b-container id="container">
      <h1>Recipe API FullStack Project</h1>
      <p class="description">Authors: Mark Tseytlin, Eitan Goldstein</p>
      <p class="contact">Contact: Tseytlin@post.bgu.ac.il, Eitag@post.bgu.ac.il</p>
      <p class="description">This is a single-page app built with Vue.js and Node.js</p>
      <p class="description">Here you can create recipes, manage favorites, and personalize your experience.</p>
      <p class="description">Have Fun!</p>
      
      <div class="links">
        <h3>Links For Our Previous Assignments:</h3>
        <div>
          <h4>Chicken Invaders Game</h4>
          <a href="https://web-development-environments-2023.github.io/assignment2-209100783_320939853/" target="_blank">Play Chicken Invaders</a>
        </div>
        <div>
          <h4>First HTML Websites</h4>
          <ul id="contactusUl">
            <li class="menuli2">
              <a id="contactli1" href="https://web-development-environments-2023.github.io/209100783/" target="_blank">First Website - Eitan</a>
            </li>
            <li class="menuli2" >
              <a id="contactli2" href="https://web-development-environments-2023.github.io/320939853/" target="_blank">Second Website - Mark</a>
            </li>
          </ul>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
}
</script>

<style>
#aboutpage {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; Optionally, this will center the content vertically on the page */
}

#container {
  text-align: center;
}

/* Additional styles */
h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  margin-bottom: 10px;
}

.contact {
  font-size: 18px;
  font-style: italic;
  margin-bottom: 20px;
}

.links {
  margin-top: 40px;
}

.links h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.links div {
  margin-bottom: 20px;
}

.links h4 {
  font-size: 20px;
  margin-bottom: 10px;
}

.links a {
  font-size: 16px;
  color: blue;
}

.links a:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
  padding-left: 0;
}
</style>