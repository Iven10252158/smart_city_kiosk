<template>
    <div class="bottom">
      <div class="sideMenu" v-if="$route.params.disctrit !== 'OMO'">
        <SideMenu />
      </div>
      <div class="pagination-bar bg-info container">
        <div class="pagination-num d-flex justify-content-between">
          <div class="text-warning mb-0">
            <h4 class="mb-0">
              <i class="fas fa-chevron-left"></i>
            </h4>
          </div>
          <!-- <h4 class="text-white mb-0" v-for="page in paginations.total_page" :key="page.offset"
          @click="getAllShops(page)">
            {{ page }}
          </h4> -->
          <div class="text-warning mb-0">
            <h4 class="mb-0">
              <i class="fas fa-chevron-right"></i>
            </h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4  d-flex justify-content-center" v-for="store in filterMerchants" :key="store.uuid">
          <a class="store-btn text-center w-100 my-2 py-4 px-4 rounded-0 border-0 text-decoration-none">{{ store.name }}</a>
        </div>
      </div>
    </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
export default {
  components: {
    SideMenu
  },
  data () {
    return {
      stores: [],
      typeBtn: ''
    }
  },
  computed: {
    filterMerchants () {
      return this.stores.filter((item) => {
        if (item.type.match(this.typeBtn) && item.region.match(this.getMerchantValue)) {
          return item.type !== ''
        }
      })
    },
    getMerchantValue () {
      return this.$store.getters['storesData/merchantValue']
    },
    TypeBtn () {
      // console.log(this.$store.getters['storesData/TypeBtn'])
      return this.$store.getters['storesData/TypeBtn']
    },
    types () {
      console.log('types', this.$store.getters['storesData/types'])
      return this.$store.getters['storesData/types']
    }
  },
  methods: {
    getAllShops () {
      this.$store.dispatch('storesData/getAllShops').then(res => {
        console.log(res)
        this.stores = res
      })
    }
  },
  mounted () {
    this.getAllShops()
  }
}
</script>

<style lang="scss" scoped>
.bottom{
  height: 62.5vh;
  background-color: #003539;

  .store-btn{
    background-color: #016A72;
    color: #D6FBFF;
    font-size: 56px;
  }
}
</style>
