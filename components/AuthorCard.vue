<template>
  <section class="p-author-card">
    <div class="p-author-card__header">
      <div class="p-author-card__avatar">
        <img :src="avatar" alt="">
      </div>
      <h2 class="p-author-card__name">{{name}}</h2>
    </div>
    <vue-markdown>{{bio}}</vue-markdown>
  </section>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'AuthorCard',
  props: ['name', 'avatar', 'bio'],
  components: {
    VueMarkdown
  }
}
</script>

<style lang="scss" scoped>
.p-author-card {
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    > * ~ * {
      margin-left: 2rem;
    }
  }

  &__avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;

    @include mq-sm {
      width: 80px;
      height: 80px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }

  &__name {
    @include font-size(1.6);
    font-weight: bold;
    letter-spacing: 0.1em;
  }
}
</style>
