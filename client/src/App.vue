<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,600&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

body {
  margin: 0;
  /* height: 100vh;  */
  background-size: 200% 200%;
  background-image: linear-gradient(45deg, #04641b 0%, #a5fbc3 100%);
  animation: gradient 20s ease infinite;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* max-height: 100vh; */
  /* overflow: hidden; */
}
input::placeholder {
  color: white;
}
</style>
