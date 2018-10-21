<template>
  <article class="card">
    <nuxt-link v-bind:to="{ name: 'blog-slug', params: { slug: slug }}" class="wrapper">
      <h1 class="card_title">{{ title }}</h1>
      <p class="card_date">{{ (new Date(publishedAt)).toLocaleDateString() }}</p>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: ['title', 'slug', 'publishedAt']
}
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    height: auto;
    box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);
    border: 0.5px solid rgb(57, 72, 85);
  }

  .wrapper {
    text-decoration: none;
    display: block;
    height: 100%;
  }

  .card_title {
    font-size: 1.2rem;
    margin: 0;
  }

  .card_date {
    font-size: 0.7rem;
    color: rgb(57, 72, 85);
    text-align: right;
  }
</style>
