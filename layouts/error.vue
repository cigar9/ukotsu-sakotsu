<template>
  <div v-if="error.statusCode === 404">
    <div class="p-404">
      <h1 class="c-heading">404 Not Found</h1>
      <p>お探しのページは存在しないか、URLが変更されたかもしれません。</p>
      <p>The page you're looking for can't be found.</p>
      <p class="p-404__btn">
        <nuxt-link to="/">記事一覧へ</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: ['error']
}
</script>

<style lang="scss" scoped>
.p-404 {
  text-align: center;

  &__btn {
    margin-top: 2rem;
  }
}
</style>
