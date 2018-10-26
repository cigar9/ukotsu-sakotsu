<template>
  <div>
    <h1>tag: {{ tag }}</h1>
    <section class="index">
      <card v-for="post in posts"
        v-bind:key="post.fields.slug"
        :title="post.fields.title"
        :slug="post.fields.slug"
        :publishedAt="post.fields.publishedAt"
        :description="post.fields.description"
        :tags="post.fields.tags"/>
    </section>
  </div>
</template>

<script>
import Card from '~/components/Card'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  head() {
    return {
      title: 'ukotsu-sakotsu',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'ukotsuとsakotsuのブログ'
        }
      ]
    }
  },
  props: [
    'uma'
  ],
  components: {
    Card
  },
  async asyncData({ env, params }) {
    return await client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishedAt',
      'fields.tags': params.slug
    }).then(entries => {
      return {
        posts: entries.items,
        tag: params.slug
      }
    })
      .catch(console.error)
  }
}
</script>

<style lang="scss" scoped>
.index {
  > * ~ * {
    margin-top: 20px;
  }
}
</style>
