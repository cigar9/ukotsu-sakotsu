<template>
  <div>
    <!--<div class="categories">-->
    <!--<p>タグ一覧</p>-->
    <!--<ul class="categories__body">-->
    <!--<li v-for="tag in tags">-->
    <!--<nuxt-link v-bind:to="{ name: 'tag-slug', params: { slug: tag }}">{{tag}}</nuxt-link>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
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

// Contentfulのデータからタグを取り出し、
// 重複を削除した配列を返す機能
const getTags = (entries) => {
  const arr = []
  entries.forEach(function(entry) {
    if (entry.fields.tags) {
      entry.fields.tags.forEach((hoge) => {
        arr.push(hoge)
      })
    }
  })
  const b = arr.filter(function(x, i, self) {
    return self.indexOf(x) === i
  })
  return b
}

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
  components: {
    Card
  },
  async asyncData({ env, params }) {
    return await client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishedAt'
    }).then(entries => {
      return {
        posts: entries.items,
        tags: getTags(entries.items)
      }
    })
      .catch(console.error)
  }
}
</script>

<style lang="scss" scoped>
.index {
  margin-top: 20px;
}

.categories {
  background: #f5f5f5;
  padding: 10px 20px;

  &__body {
    display: flex;

    > * ~ * {
      margin-left: 3em;
    }
  }
}
</style>
