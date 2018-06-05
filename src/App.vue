<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  outline: none;
}
input {
  font-size: 14px;
}
div {
  font-size: 14px;
}
a {
  text-decoration: none;
  cursor: pointer;
}
li {
  list-style: none;
}
html {
  height: 100%;
  font-size: 100px;
}
body {
  height: 100%;
}
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* min-height: 1000px; */
}
</style>
