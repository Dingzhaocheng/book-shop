<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">

$primary: #36a894;

* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #94ddd9;
  width: 100%;
}

.btn {
  display: block;
  width: 100%;

  &.primary {
    background-color: #29aea5;
    color: #fff;
  }
}

.section {
  .head {
    margin-bottom: 10px;
    text-align: center;

    h2 {
      display: inline-block;
      margin: 0 auto;
      font-size: 15px;
      line-height: 26px;
      padding: 0 15px;
      background-color: $primary;
      color: #fff;
      border-radius: 4px;
    }
  }
}

button {
  text-align: center;
  border: 0;
  appearance: none;

  &:focus {
    outline: none;
  }
}

.mint-swipe-indicator {
  opacity: 1;
  background: #eaeeee !important;

  &.is-active {
    background: #fa9d39 !important;
  }
}

.border-bottom, .border-top {
  position: relative;

  &:after {
    position: absolute;
    left: 0;
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    border-bottom: 1px dashed #417673;
    transform: scaleY(.5);
  }
}

.border-bottom {
  &:after {
    bottom: 0;
  }
}

.border-top {
  &:after {
    top: 0;
  }
}
</style>
