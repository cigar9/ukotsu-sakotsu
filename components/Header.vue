<template>
  <header class="l-header">
    <the-navigation/>
  </header>
</template>

<script>
import TheNavigation from '~/components/TheNavigation'

export default {
  name: 'Header',
  components: {
    TheNavigation
  }
}
</script>

<style lang="scss" scoped>
.l-header {
  background: #fff;
  height: 40px;
}
</style>
