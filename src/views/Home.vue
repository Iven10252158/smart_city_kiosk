<template>
  <div class="home">
    <div class="bg-cover backgroundImage">
      <div class="video-part">
        <div v-show="showImage" class="media bg-cover" :style="{backgroundImage:'url(' +image+ ')'}"></div>
        <div v-show="!showImage" class="media">
          <iframe class="liveVideo" ref="liveVideo"
              :src="video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>

    <div class="btn-group d-flex">
      <button class="kaohsiung border-0 flex-1 text-white" @click="goTo_Kaohsiung('kaohsiung')" :class="{ 'click-active' :isKaohsiung}">高雄展區</button>
      <button class="omo border-0 flex-1 text-white" @click="goTo_OMO('OMO')" :class="{ 'click-active' :isOMO}">OMO展區</button>
      <button class="taipei border-0 flex-1 text-white" @click="goTo_Taipei('taipei')" :class="{ 'click-active' :isTaipei}">台北展區</button>
    </div>

  </div>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import { connectSocket } from '../webSocket/webSocket'
export default {
  data () {
    return {
      isKaohsiung: false,
      isOMO: false,
      isTaipei: false,
      showImage: false
    }
  },
  watch: {
    image () {
      this.showImage = true
    },
    video () {
      this.showImage = false
    }
  },
  computed: {
    image () {
      return this.$store.getters.image
    },
    video () {
      return this.$store.getters.video
    }
  },
  methods: {
    goTo_Kaohsiung (item) {
      this.isKaohsiung = true
      this.isTaipei = false
      this.isOMO = false
      this.$router.push({ path: `/content/${item}` })
    },
    goTo_OMO (item) {
      this.isKaohsiung = false
      this.isTaipei = false
      this.isOMO = true
      this.$router.push({ path: `/content/${item}` })
    },
    goTo_Taipei (item) {
      this.isKaohsiung = false
      this.isOMO = false
      this.isTaipei = true
      this.$router.push({ path: `/content/${item}` })
    },
    getPageID () {
      this.$http.get('http://20.106.156.149:8080/template/c5898923-dee3-459f-9a36-0ef06c268903')
        .then(res => {
          console.log(res)
          connectSocket(res.data.uuid)
          this.goTo_OMO('OMO')
        })
    }
  },
  mounted () {
    this.getPageID()
  }
}
</script>

<style lang="scss" scoped>
.home{
  position: relative;
}
.bg-cover{
  background-size: cover;
  background-position: center center;
}

.backgroundImage{
  background-image: url('~@/assets/images/Mask_Group.png');
  height: 33.59vh;
    .video-part{
    position: absolute;
    top: 14%;
    left: 11.5%;
    height: 891px;
    width: 1671px;
    @media(max-width:1080px){
      height: 445.5px;
      width: 835.5px;
    }
    .media{
      display: block;
      height: 100%;
      width: 100%;
    }
  }
}

.btn-group{
  position: relative;
  height: 3.91vh;
    button {
      font-size: 72px;
      background: linear-gradient(180deg, #69DCEC 0%, #019FA9 51.56%, #69DCEC 100%);
      @media(max-width:1080px) {
          font-size: 48px;
      }
    }
  .click-active{
    background: linear-gradient(180deg, #6332A2 0%, #3E0D61 51.56%, #6332A2 100%);
  }
}

.flex-1{
  flex: 1;
}
</style>
