<template>
  <div class="header">
    <div class="container header__container">
      <div class="header__inner">
        <div class="header__logo">
          <v-icon name="house"></v-icon>
          <v-icon name="logo"></v-icon>
        </div>
        <v-hamburger v-model="panelOpen" />
      </div>
    </div>
    <v-panel v-model="panelOpen">
      <v-button v-modal.main-modal variant="primary">
        Open Modal
      </v-button>
      <v-input
        label="Name"
        placeholder="Type your name"
        name="name"
      ></v-input>
      Lorem <br>ipsum <br>dolor <br>sit <br>amet, <br>consectetur <br>adipisicing <br>elit. <br>Aperiam, <br>eveniet!
    </v-panel>
  </div>
</template>

<script>
import txt from '../assets/example.txt'
console.log('txt', txt)

export default {
  name: 'Header',
  data () {
    return {
      panelOpen: false
    }
  }
}
</script>

<style lang="scss">
.header {
  &__container {}
  &__inner {
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
