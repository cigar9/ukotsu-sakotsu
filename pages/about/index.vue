<template>
  <div>
    <h1 class="c-heading">About Ukotsu-Sakotsu</h1>
    <p>当サイトは Ukotsu と Sakotsu の二人が送るブログサイトです。</p>
    <p>当サイトで掲載している文章・画像等の著作物を無断転載することはお控えください。</p>
    <div class="p-authors">
      <author-card
        v-for="(post, index) in orderedPosts"
        :key="index"
        :name="post.fields.name"
        :avatar="post.fields.avatar.fields.file.url"
        :bio="post.fields.bio"/>
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import AuthorCard from '~/components/AuthorCard'
import _ from 'lodash'

const client = createClient()

export default {
  name: 'index',
  components: {
    AuthorCard
  },
  async asyncData({ env, params }) {
    return await client.getEntries({
      'content_type': 'author'
    }).then(entries => {
      return {
        posts: entries.items
      }
    })
      .catch(console.error)
  },
  computed: {
    orderedPosts() {
      return _.orderBy(this.posts, 'fields.name', 'desc')
    }
  }
}
</script>

<style lang="scss" scoped>
.p-authors {
  margin-top: 4rem;

  > * ~ * {
    margin-top: 4rem;
  }
}
</style>
