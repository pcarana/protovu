<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/home">VUE Proto</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item v-for="item in navItems"
          :to="checkSelected(item) ? '#' : item.to"
          :key="item.id"
          :active=checkSelected(item)>
          {{ $t(item.label) }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right v-for="item in langItems"
          href="#"
          @click="switchLang(item.id)"
          :key="item.id"
          :active="isActiveLang(item.id)">
          {{item.lang}}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>


<script>

export default {
  data() {
    return {
      navItems: [
        {to: "/register", id: "register", label: "modules.register"},
        {to: "/search", id: "search", label: "modules.search"},
        {to: "/stats", id: "stats", label: "modules.stats"}
      ],
      langItems: [
        {href: "#", id: "en", lang: "EN"},
        {href: "#", id: "es", lang: "ES"}
      ]
    }
  },
  props: {
    selected: { }
  },
  methods: {
    checkSelected: function(item) {
      return this.selected == item.id;
    }
  }
}
</script>


<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
