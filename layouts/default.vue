<template>
  <div class="l-wrapper">
    <the-header
      class="l-header"
      :class="{'is-hide': hideHeader}"/>
    <main class="l-main">
      <nuxt/>
    </main>
    <the-footer class="l-footer"/>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'


export default {
  components: {
    TheHeader,
    TheFooter
  },
  data() {
    return {
      hideHeader: false
    }
  },
  mounted() {
    let previous = window.scrollY
    window.addEventListener('scroll', () => {
      window.scrollY > previous ? this.hideHeader = true : this.hideHeader = false
      previous = window.scrollY
    })
  }
}
</script>

<style lang="scss" scoped>
$header-height: 40px;

.l-wrapper {
  display: grid;
  grid-template: 'header' auto 'main' 1fr 'footer' auto / 100%;
  min-height: 100vh;
}

.l-header {
  background: #fff;
  grid-area: header;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  @include transition(top);

  &.is-hide {
    top: -#{$header-height};
  }
}

.l-main {
  width: 80%;
  max-width: 800px;
  margin: $header-height auto 0;
  display: block;
  padding: 3rem 0;
  grid-area: main;
}

.l-footer {
  grid-area: footer;
}
</style>
