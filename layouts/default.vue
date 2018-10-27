<template>
  <div>
    <my-header/>
    <main class="l-main">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import myHeader from '~/components/Header.vue'

export default {
  components: {
    myHeader
  }
}
</script>

<style lang="scss" scoped>
.l-main {
  width: 80%;
  margin: 0 auto;
  display: block;
  padding: 3rem 0;
}
</style>
