<template>
  <article class="p-card">
    <nuxt-link v-bind:to="{ name: 'blog-slug', params: { slug: slug }}" class="p-card__link">
      <h1 class="p-card__ttl">{{ title }}</h1>
      <div class="p-card__meta">
        <p class="p-card__date">{{ (new Date(publishedAt)).toLocaleDateString() }}</p>
        <p class="p-card__author">Written by {{ author }}</p>
        <ul class="p-card__tags" v-if="tags">
          <li v-for="tag in tags" class="p-card__tag">{{ tag }}</li>
        </ul>
      </div>
      <p class="p-card__description">{{ description }}</p>
    </nuxt-link>
  </article>
</template>

<script>

export default {
  props: ['title', 'slug', 'publishedAt', 'description', 'tags', 'author']
}
</script>

<style lang="scss" scoped>
.p-card {
  &__ttl {
    @include font-size(2);
    font-weight: bold;
    font-family: "Sawarabi Mincho", serif;
    letter-spacing: 0.1em;
  }

  &__link {
    color: $font-color;
    text-decoration: none;
    display: block;
    height: 100%;
    padding: 2rem 0;
    @include transition(background);

    &:hover {
      background: #fff;
    }
  }

  &__meta {
    display: flex;
    align-items: center;

    > * ~ * {
      margin-left: 1rem;

      &::before {
        content: '/';
        margin-right: 1rem;
      }
    }
  }

  &__date {
    color: $font-color-light;
  }

  &__author {
    color: $font-color-light;
  }

  &__tags {
    display: flex;
    align-items: center;

    > * ~ * {
      margin-left: 0.5rem;
    }
  }

  &__tag {
    color: $font-color-light;
    border: 1px solid #ccc;
    border-radius: 2px;
    @include font-size(1.2);
    padding: 0.2em 0.5em;
  }

  & ~ & {
    border-top: 1px dashed #ccc;
  }
}
</style>
