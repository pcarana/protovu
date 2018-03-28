const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    }
  },
  es: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    }
  }
}

const i18n = new VueI18n({
	locale: localStorage.getItem('lang') !== null && localStorage.getItem('lang') !== '' ?
					localStorage.getItem('lang') : 'es',
  dateTimeFormats
});

Vue.component('top-menu', {
  template: `
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
  `,
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
});

Vue.mixin({
  methods: {
    switchLang(newLang) {
      console.log('At switch lang ' + i18n.messages[newLang]);
      loadLang(newLang, (err, message) => {
        console.log('At Callback ' + err + '-' + message);
        if (err) {
          console.error(err);
          return;
        }
        i18n.setLocaleMessage(newLang, message);
        localStorage.setItem('lang', newLang);
        i18n.locale = newLang;
      });
    },
    isActiveLang(langId) {
      return i18n.locale === langId;
    },
    getActiveLang() {
      return i18n.locale;
    }
  }
});

const t_home = {
  template: `
  <div class="container">
    <h1>HOME</h1>
    <p>
      <router-link to="/register">Go Register</router-link>
      <router-link to="/search">Go Search</router-link>
      <router-link to="/stats">Go Stats</router-link>
    </p>
  </div>
  `
};

const t_register = {
  template: `
  <div>
    <h1>{{ $t("modules.register") }}</h1>
    <div class="container">
        <b-form @submit="onSubmit" novalidate class="needs-validation">
            <!-- Nombre -->
            <b-form-group id="nameGroup" :label="$t('register.name.label')" label-for="nameInput">
                <b-form-input id="nameInput" type="text" v-model.trim="form.name" :state="nameState" required :placeholder="$t('register.name.hint')">
                </b-form-input>
                <b-form-invalid-feedback>
                    {{ $t(nameMessage, { min:2, max: 50}) }}
                </b-form-invalid-feedback>
            </b-form-group>
            <!-- Apellidos -->
            <b-form-group id="lastNameGroup" :label="$t('register.lastName.label')" label-for="lastNameInput">
                <b-form-input id="lastNameInput" type="text" v-model.trim="form.lastName" :state="lastNameState" :placeholder="$t('register.lastName.hint')">
                </b-form-input>
                <b-form-invalid-feedback>
                    {{ $t(lastNameMessage, { min:2, max: 50}) }}
                </b-form-invalid-feedback>
            </b-form-group>
            <!-- Tipo de viaje -->
            <b-form-group id="tripTypeGroup" :label="$t('register.tripType.label')" label-for="tripTypeInput">
                <b-form-radio-group id="tripTypeInput" v-model="form.tripType" name="tripTypeName">
                    <b-form-radio v-for="item in tripTypes" :key="item.value" :id="item.value" :value="item.value">
                        {{ $t(item.label) }}
                    </b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group id="dateGroup" :label="$t('register.travelDate.label')">
                <!-- Fecha salida -->
                <b-form-group label="Calendar">
                  <b-form-radio-group id="calendarType"
                    buttons
                    v-model="calendarType"
                    :options="calendarOpts"
                    name="calendarType" />
                </b-form-group>
                <b-form-group id="departureGroupTest" :label="$t('register.travelDate.departure')" label-for="departureInputTest"
                              v-if="calendarType === 'vue-datetime'">
                    <!-- test another -->
                    <input id="departureInputTest" type="date" required v-model="form.departure"
                          :data-date-format="$t('date.format')"
                          :date-format="$t('date.format')"
                          :lang="getActiveLang()">
                    </input>
                    <b-form-invalid-feedback>
                        {{ $t("register.errors.travelDate.departure") }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="departureGroup" :label="$t('register.travelDate.departure')" label-for="departureInput"
                              v-if="calendarType === 'bootstrap'">
                    <b-form-input id="departureInput" type="date" required :state="departureState" v-model="form.departure">
                    </b-form-input>
                    <b-form-invalid-feedback>
                        {{ $t("register.errors.travelDate.departure") }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <!-- Fecha regreso -->
                <b-form-group id="arrivalGroup" :label="$t('register.travelDate.arrival')" label-for="arrivalInput">
                    <b-form-input id="arrivalInput" type="date" v-model="form.arrival" :state="arrivalState" :disabled="arrivalDisabled">
                    </b-form-input>
                    <b-form-invalid-feedback>
                        {{ $t("register.errors.travelDate.arrival") }}
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form-group>
            <!-- Número pasajeros -->
            <b-form-group id="familySizeGroup" :label="$t('register.familySize.label')" label-for="familySizeInput">
                <b-form-input id="familySizeInput" type="number" v-model="form.familySize" :state="familySizeState" min="0" max="31" :placeholder="$t('register.familySize.hint')">
                </b-form-input>
                <b-form-invalid-feedback>
                    {{ $t("register.errors.familySize.range", {min: "0", max: "31"}) }}
                </b-form-invalid-feedback>
            </b-form-group>
            <!-- Tipo de pasajero -->
            <b-form-group id="passengerTypeGroup" :label="$t('register.passengerType.label')" label-for="passengerTypeInput">
                <b-form-select id="passengerTypeInput" required state="form.passengerType != null" v-model="form.passengerType">
                    <option v-for="item in passengerTypes" :key="item.value" :value="item.value">
                        {{ $t(item.label) }}
                    </option>
                </b-form-select>
            </b-form-group>
            <!-- Servicios adicionales -->
            <b-form-group id="servicesGroup" :label="$t('register.services.label')" label-for="servicesInput">
                <b-form-checkbox-group id="servicesInput" v-model="form.services" v-for="item in serviceTypes" :key="item.value">
                    <b-form-checkbox :value="item.value">{{ $t(item.label) }}</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            <b-button type="button" variant="secondary" @click="quickFill">{{ $t("register.button.fill") }}</b-button>
            <b-button type="button" variant="danger" @click="clearForm">{{ $t("register.button.clear") }}</b-button>
            <b-button type="submit" variant="primary" :disabled="disableSubmit">{{ $t("register.button.submit") }}</b-button>
        </b-form>

        <b-modal ref="myModalRef" hide-footer :title="$t('register.modal.title')" no-close-on-backdrop no-close-on-esc>
            <div class="d-block text-center">
                <b-progress height="2rem">
                    <b-progress-bar :value="100" :animated="bar.animated" :label="$t(bar.label)" :variant="bar.animated ? 'info' : bar.error ? 'danger' : 'success'">
                    </b-progress-bar>
                </b-progress>
                <p>{{ modalText }}</p>
                <p v-html="errorMessage"></p>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">{{ $t("register.modal.close") }}</b-btn>
        </b-modal>
    </div>
  </div>
  `,
  data() {
    return {
      form: {
        name: null,
        lastName: null,
        familySize: null,
        tripType: 'simple',
        departure: null,
        arrival: null,
        passengerType: null,
        services: [],
      },
      bar: {
        animated: true,
        label: 'register.bar.loading',
        error: false
      },
      passengerTypes: [
        { label: 'register.passengerType.hint', value: null },
        { label: 'catalogs.passengerType.baby', value: 'baby' },
        { label: 'catalogs.passengerType.kid', value: 'kid' },
        { label: 'catalogs.passengerType.adult', value: 'adult' }
      ],
      serviceTypes: [
        { label: 'catalogs.serviceType.pet', value: 'pet' },
        { label: 'catalogs.serviceType.extra', value: 'extra' },
        { label: 'catalogs.serviceType.protection', value: 'protection' },
        { label: 'catalogs.serviceType.stroller', value: 'stroller' }
      ],
      tripTypes: [
        { label: 'catalogs.tripType.simple', value: 'simple' },
        { label: 'catalogs.tripType.round', value: 'round' },
      ],
      calendarOpts: [
        { text: 'Bootstrap', value: 'bootstrap' },
        { text: 'Vue-datetime', value: 'vue-datetime' }
      ],
      modalText: null,
      errorMessage: null,
      eventHub: null,
      calendarType: 'bootstrap'
    }
  },
  methods: {
    showSpinner() {
      this.bar.animated = true;
      this.bar.error = false;
      this.bar.label = 'register.bar.loading';
    },
    hideSpinner(hasError) {
      this.bar.animated = false;
      this.bar.error = hasError;
      this.bar.label = hasError ? 'register.bar.error' : 'register.bar.ok';
    },
    quickFill() {
      var form = this.form;
      form.name = 'John';
      form.lastName = 'Snow';
      form.familySize = 2;
      form.tripType = 'round';
      form.departure = '2018-11-01';
      form.arrival = '2018-12-01';
      form.passengerType = 'adult';
      form.services = ['pet', 'protection'];
    },
    onSubmit(evt) {
      evt.preventDefault();
      const vm = this;
      vm.apiobject = '';
      vm.errorMessage = '';
      vm.showModal();
      var axiosInst = vm.createAxios();
      var server = 'http://localhost:8080/servlet-poc/booking';
      axiosInst.post(server, vm.form)
        .then(function (response) {
          console.log(response);
          vm.modalText = vm.form.name + " " + vm.form.lastName + " booked";
        })
        .catch(function (error) {
          console.log(error);
          var resp = error.response;
          if (resp.status == 400) {
            vm.errorMessage = resp.data.error;
            var keys = Object.entries(resp.data);
            for (i = 0; i < keys.length; i++) {
              vm.errorMessage += "<br />" + keys[i][0] + " = " + keys[i][1];
            }
          } else {
            vm.errorMessage = "Error " + resp.status + ", try again";
          }
        });
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
      if (!this.bar.error) {
        this.clearForm();
      }
      this.modalText = '';
    },
    clearForm() {
      var form = this.form;
      form.name = null;
      form.lastName = null;
      form.familySize = null;
      form.tripType = 'simple';
      form.departure = null;
      form.arrival = null;
      form.passengerType = null;
      form.services = [];
    },
    createAxios() {
      const myaxios = axios.create();
      myaxios.defaults.headers.common['Accept-Language'] = i18n.locale;
      myaxios.interceptors.request.use(
        conf => {
          this.eventHub.$emit('before-request');
          return conf;
        },
        error => {
          this.eventHub.$emit('request-error');
          return Promise.reject(error);
        }
      );
      myaxios.interceptors.response.use(
        response => {
          this.eventHub.$emit('after-response');
          return response;
        },
        error => {
          this.eventHub.$emit('response-error');
          return Promise.reject(error);
        }
      );
      return myaxios;
    }
  },
  computed: {
	  nameState() {
      var nameLength = this.form.name === null ? 0: this.form.name.length;
      if (this.form.name === null || nameLength === 0) {
				return null;
			}
			return nameLength >= 2 && nameLength <= 50 ? true : false;
		},
		nameMessage() {
			var nameLength = this.form.name === null ? 0: this.form.name.length;
			if (nameLength > 0 && (nameLength < 2 || nameLength > 50)) {
				return nameLength < 2 ? 'register.errors.name.minLength' : 'register.errors.name.maxLength';
			}
			return '';
		},
		lastNameState() {
			var lastNameLength = this.form.lastName === null ? 0: this.form.lastName.length;
			if (this.form.lastName === null || lastNameLength === 0) {
				return null;
			}
			return lastNameLength >= 2 && lastNameLength <= 50 ? true : false;
		},
		lastNameMessage() {
			var lastNameLength = this.form.lastName === null ? 0: this.form.lastName.length;
			if (lastNameLength > 0 && (lastNameLength < 2 || lastNameLength > 50)) {
				return lastNameLength < 2 ? 'register.errors.name.minLength' : 'register.errors.name.maxLength';
			}
			return '';
		},
		departureState() {
			var departure = this.form.departure;
			if (departure === null || departure.length === 0) {
				return null;
			}
			var now = new Date();
			now.setHours(0);
			now.setMinutes(0);
			now.setSeconds(0);
			now.setMilliseconds(0);
			var departureDate = new Date(departure + "T00:00:00" + now.toString().match(/([-\+][0-9]+)\s/)[1]);
			return departureDate >= now;
		},
		arrivalState() {
			var arrival = this.form.arrival;
			var departure = this.form.departure;
      var tripType = this.form.tripType;
      if (tripType === 'simple') {
        return null;
      }
			if (departure === null || departure.length === 0) {
				return null;
			}
			if (arrival === null || arrival.length === 0) {
				return null;
			}
			var departureDate = new Date(departure);
			var arrivalDate = new Date(arrival);
			return arrivalDate >= departureDate;
		},
		arrivalDisabled() {
      var simpleTrip = this.form.tripType === 'simple';
      if (simpleTrip) {
        this.form.arrival = null;
      }
			return simpleTrip;
		},
		familySizeState() {
			if (this.form.familySize === null) {
				return null;
			}
			return !isNaN(this.form.familySize) && this.form.familySize >= 0 && this.form.familySize <= 31;
		},
		disableSubmit() {
			var nameState = this.nameState === null ? false : this.nameState;
			var lastNameState = this.lastNameState === null ? true : this.lastNameState;
			var familySizeState = this.familySizeState === null ? true : this.familySizeState;
			var departureState = this.departureState === null ? false : this.departureState;
      var arrivalState = this.arrivalState === null ? (this.form.tripType === 'simple' ? true : false) : this.arrivalState;
      var passengerTypeState = this.form.passengerType !== null;
			return !(nameState && lastNameState && familySizeState && departureState && arrivalState && passengerTypeState);
    }
  },
  created: function () {
    this.eventHub = new Vue();
    this.eventHub.$on('before-request', this.showSpinner);
    this.eventHub.$on('request-error', this.hideSpinner.bind(this, true));
    this.eventHub.$on('after-response', this.hideSpinner.bind(this, false));
    this.eventHub.$on('response-error', this.hideSpinner.bind(this, true));
  },
  beforeDestroy: function () {
    this.eventHub.$off('before-request', this.showSpinner);
    this.eventHub.$off('request-error', this.hideSpinner.bind(this, false));
    this.eventHub.$off('after-response', this.hideSpinner.bind(this, false));
    this.eventHub.$off('response-error', this.hideSpinner.bind(this, false));
  }
};

const t_search = {
  template: `
  <div>
    <h1>{{ $t("modules.search") }}</h1>
    <div class="container">
      <b-container fluid>
        <b-row>
          <b-col md="10" class="my-1">
            <b-form-group horizontal label="Filtrar" class="mb-0">
              <b-input-group>
                <b-input-group-prepend>
                  <b-form-select id="searchFilter"
                                :options="searchFilterOpts"
                                v-model="searchFilter">
                  </b-form-select>
                </b-input-group-prepend>
                <b-form-input v-model="filterItem" placeholder="Buscar..."></b-form-input>
                <b-input-group-append>
                  <b-btn :disabled="!customFilter" @click="filterItem = ''" variant="outline-primary">Limpiar</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table striped hover show-empty
                  :items="tableItems"
              :fields="tableFields"
              :per-page="perPage"
              :total-rows="totalRows"
              :current-page="tableCurrentPage"
              :filter="customFilter"
              @filtered="onFiltered"
              :empty-filtered-text="$t('errors.noDataFound')">
          <template slot="HEAD_name" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="HEAD_lastName" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="HEAD_familySize" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="HEAD_flightType" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="HEAD_departure" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="HEAD_arrival" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="HEAD_passengerType" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="HEAD_services" slot-scope="data">
            {{ $t(data.label) }}
          </template>
          <template slot="flightType" slot-scope="data">
            {{ $t(data.value) }}
          </template>
          <template slot="departure" slot-scope="data">
            {{ $d(data.value, 'short') }}
          </template>
          <template slot="arrival" slot-scope="data">
            {{ $d(data.value, 'short') }}
          </template>
          <template slot="passengerType" slot-scope="data">
            {{ $t('catalogs.passengerType.' + data.value) }}
          </template>
          <template slot="services" slot-scope="data">
            <span v-for="item in data.value">
              {{ $t(item) }}<br />
            </span>
          </template>
        </b-table>
        <b-pagination size="md" :total-rows="totalRows" :per-page="perPage" v-model="tableCurrentPage" align="center"></b-pagination>
      </b-container>
    </div>
  </div>
  `,
  data() {
    return {
      tableItems: [],
      tableFields: [
        {
          key: 'name',
          label: 'register.name.label',
          sortable: true
        },
        {
          key: 'lastName',
          label: 'register.lastName.label',
          sortable: true
        },
        {
          key: 'familySize',
          label: 'register.familySize.label',
          sortable: false
        },
        {
          key: 'flightType',
          label: 'register.tripType.label',
          sortable: false,
          formatter: (value) => {
            return 'catalogs.tripType.' + value;
          }
        },
        {
          key: 'departure',
          label: 'register.travelDate.departure',
          sortable: false,
          formatter: 'formatDate'
        },
        {
          key: 'arrival',
          label: 'register.travelDate.arrival',
          sortable: false,
          formatter: 'formatDate'
        },
        {
          key: 'passengerType',
          label: 'register.passengerType.label',
          sortable: false
        },
        {
          key: 'services',
          label: 'register.services.label',
          sortable: false,
          formatter: 'formatServices'
        }
      ],
      tableCurrentPage : 1,
      totalRows: 0,
      perPage: 4,
      searchFilterOpts: [
        { text: 'Todos', value: null },
          { text: 'Nombre', value: 'name' },
          { text: 'Apellido', value: 'lastName' },
          { text: 'Tipo de vuelo', value: 'flightType' }
      ],
      searchFilter: null,
      filterItem: null
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.tableCurrentPage = 1;
    },
    customFilter(item) {
      var searchFilterOpt = this.searchFilter === null ? '' : this.searchFilter.trim();
      var filterItemTxt = this.filterItem === null ? '' : this.filterItem.trim();
      try {
        var regexp = new RegExp(filterItemTxt, 'i');
      } catch (e) {
        // Wait until the regexp is valid
        return true;
      }
      switch (searchFilterOpt) {
        case 'name':
          return item.name.match(regexp);
        case 'lastName':
          return item.lastName.match(regexp);
        case 'flightType':
          return item.flightType.toString().match(regexp);
        default:
          return item.name.match(regexp) || item.lastName.match(regexp) || item.flightType.toString().match(regexp);
      }
    },
    createAxios() {
      const myaxios = axios.create();
      return myaxios;
    },
    formatDate(value) {
      var now = new Date();
      return new Date(value + "T00:00:00" + now.toString().match(/([-\+][0-9]+)\s/)[1]);
    },
    formatServices(value) {
      const prefix = 'catalogs.serviceType.';
      var labeled = [];
      if (value !== null) {
        labeled.push(prefix + value[0]);
        for (var i = 1; i < value.length; i++) {
          labeled.push(prefix + value[i]);
        }
      }
      return labeled;
    }
  },
  created: function () {
    var inst = this;
    var axiosInst = inst.createAxios();
    var server = 'http://localhost:8080/servlet-poc/booking';
    axiosInst.get(server)
      .then(function (response) {
        console.log(response);
        var books = response.data.Books;
        if (books != null) {
          inst.tableItems = books;
        }
      }).catch(function (error) {
        console.log(error);
      });
  }
};

Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted() {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: this.chartData
        }
      ]
    }, { responsive: true, maintainAspectRatio: false })
  },
  props: {
    chartLabels: null,
    chartData: null
  }
});

Vue.component('pie-chart', {
  extends: VueChartJs.Pie,
  mounted() {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: this.chartBackgrounds,
          data: this.chartData
        }
      ],
    }, { responsive: true, maintainAspectRatio: false })
  },
  props: {
    chartLabels: null,
    chartData: null,
    chartBackgrounds: null
  }
});

Vue.component('bar-chart', {
  extends: VueChartJs.Bar,
  mounted() {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Test Dataset',
          backgroundColor: this.chartBackgrounds,
          data: this.chartData,
        }
      ],
    },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales:
          {
            yAxes: [{
              ticks: {
                min: 0
              }
            }],
          }
      })
  },
  props: {
    chartLabels: null,
    chartData: null,
    chartBackgrounds: null
  }
});

const t_stats = {
  template: `
  <div>
    <h1>{{ $t("modules.stats") }}</h1>
    <div class="container">
      <b-form>
        <b-button v-on:click="showGraph('line')" variant="primary">{{$t("stats.line")}}</b-button>
        <b-button v-on:click="showGraph('pie')" variant="primary">{{$t("stats.pie")}}</b-button>
        <b-button v-on:click="showGraph('bar')" variant="primary">{{$t("stats.bar")}}</b-button>
      </b-form>
      <line-chart v-if="chart === 'line'"
                  :chartLabels="chartLabels"
                  :chartData="chartData">
      </line-chart>
      <pie-chart v-if="chart === 'pie'"
                :chartLabels="chartLabels"
                :chartData="chartData"
                :chartBackgrounds="chartBackgrounds">
      </pie-chart>
      <bar-chart v-if="chart === 'bar'"
                :chartLabels="chartLabels"
                :chartData="chartData"
                :chartBackgrounds="chartBackgrounds">
      </bar-chart>
    </div>
    <br />
    <p>{{$t("stats.thanks")}} <a href="http://vue-chartjs.org/" target="_blank">http://vue-chartjs.org/</a></p>
  </div>
  `,
  data() {
    return {
      chart: '',
      chartLabels: ['January', 'February', 'March', 'April', 'May', 'June'],
      chartData: [40, 39, 20, 40, 39, 80],
      chartBackgrounds: ['red','yellow','blue','green','purple','black']
    }
  },
  methods: {
    showGraph(type) {
			this.chart = type;
		}
  }
};

const t_main = {
  template: `
    <div>
      <top-menu></top-menu>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  `
};

const routes = [
  { path: '/home', component: t_home },
  { path: '/register', component: t_register },
  { path: '/search', component: t_search },
  { path: '/stats', component: t_stats }
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

// Mounted until the default lang is loaded (goto loadLang call)
var app = new Vue({
  i18n,
  router,
  template: t_main.template
});

function loadLang(lang, cb) {
  if (typeof(i18n.messages[lang]) !== "undefined") {
    i18n.locale = lang;
    localStorage.setItem('lang', lang);
    return;
  }
  var axiosInstance = axios.create();
  console.log('Inst create');
  var server = 'http://localhost:8080/servlet-poc/bundle';
  axiosInstance.defaults.headers.common['Accept-Language'] = lang;
  return axiosInstance.get(server)
  .then(function(response) {
    console.log(response.data);
    return Promise.resolve(response.data[lang]);
  }).catch(function (error) {
    console.log(error);
    return Promise.reject(new Error(error));
  }).then(function(message) {
    console.log('Callback OK');
    cb(null, message);
  }).catch(function(error) {
    console.log('Callback ERROR');
    cb(error);
  });
}

loadLang(i18n.locale, (err, message) => {
  console.log('At Callback ' + err + '-' + message);
  if (err) {
    console.error(err);
    return;
  }
  i18n.setLocaleMessage(i18n.locale, message);
  localStorage.setItem('lang', i18n.locale);
  app.$mount('#app');
});