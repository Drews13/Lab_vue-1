<template>
  <div class = "footer-component__icons">
    <ul class = "footer-component__icons-list">
      <li 
      class = "footer-component__icons-list-items"
      v-for="item in items"
      :key="item.reference">
        <a class = "footer-component__icons-link" :href="item.reference">
          <img :src="item.image" @error="defaultImage"/>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class FooterComponentIcons extends Vue {
  items = [
    {
      reference: 'https://www.valvesoftware.com/ru/',
      image: '/images/footerIcons/steam.png'
    },
    {
      reference: 'https://www.rockstargames.com/',
      image: '/images/footerIcons/rockstar-games.png'
    },
    {
      reference: 'https://www.blizzard.com/ru-ru/',
      image: '/images/footerIcons/battle-net.png'
    },
    {
      reference: 'https://www.ea.com/sports',
      image: '/images/footerIcons/ea-sports.png'
    }
  ]

  defaultImage(e) {
    e.target.src = '/images/notFound/notFound2.png'
  }
}
</script>

<style lang='scss' scoped>
  .footer-component {
    &__icons {
      margin: 40px 0;
    }
  
    &__icons-list {
      margin: 0;
      padding: 0;
    }

    &__icons-list-items {
      display: inline-block;
      list-style-type: none;
      width: 40px;
      margin: 0 10px;
    }

    &__icons-link {
      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }
  }
</style>
