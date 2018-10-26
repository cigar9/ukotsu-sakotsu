<template>
  <header class="l-header">
    <nav class="p-navigation">
      <ul class="p-navigation__body">
        <li class="p-navigation__item">
          <nuxt-link to="/">Blog</nuxt-link>
        </li>
        <li class="p-navigation__item">
          <nuxt-link to="/about/">About</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.l-header {
  background: #fff;
  height: 40px;
}

.p-navigation {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    align-self: stretch;
  }

  &__item {
    display: flex;
    align-self: stretch;

    & ~ & {
      margin-left: 3rem;
    }

    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid transparent;

      &.nuxt-link-exact-active {
        border-bottom-color: $color-theme;
      }
    }
  }
}
</style>
