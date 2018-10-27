<template>
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

</template>

<script>
export default {
  name: "TheNavigation"
}
</script>

<style lang="scss" scoped>
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
