<template>
    <div class="side-menu">
        <div class="side-menu-content" v-for="(category, index) in getCategoryArray" :key="index">
            <div class="side-menu-text text-center text-white py-3">{{ category }}</div>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      merchantsValue: ''
    }
  },
  computed: {
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    },
    getCategoryArray () {
      return this.$store.getters['storesData/categories']
    }
  },
  methods: {
    getCategories () {
      this.$store.dispatch('storesData/getCategories')
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>

<style lang="scss" scoped>
.side-menu{
    background-color:#016A72;
    width: 23.6%;
    height: 62.5vh;
    .side-menu-text{
        font-size: 64px;
    }
}
</style>
