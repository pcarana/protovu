Vue.component('top-menu', {
  template: `
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="index.html">VUE Proto</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item v-for="item in navItems"
                    :href="item.href"
                    :key="item.id"
                    :active=checkSelected(item)>
          {{ item.content }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  `,
  data() {
    return {
      navItems: [
        {href: "alta.html", id: "alta", content: "Alta"},
        {href: "consulta.html", id: "consulta", content: "Consulta"},
        {href: "peticion.html", id: "peticion", content: "Petición API"},
        {href: "estadisticas.html", id: "estadisticas", content: "Estadísticas"}
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
});

var app_data = {};
if ( typeof(data) !== "undefined" && data !== null ) {
	app_data = data;
}
var app_methods = {};
if ( typeof(methods) !== "undefined" && methods !== null ) {
	app_methods = methods;
}
var app_computed = {};
if ( typeof(computed) !== "undefined" && computed !== null ) {
	app_computed = computed;
}


new Vue({
  el: '#app',
  data : app_data,
  methods: app_methods,
  computed: app_computed
  /*,
  template: '<App/>',
  components: { App }
  */
});
