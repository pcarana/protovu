<template>
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
</template>


<script>
import Vue from 'vue'
import axios from "axios"
import i18n from "vue-i18n"


export default {

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
        var server = 'http://localhost:8081/servlet-poc/booking';
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
        // TODO fix an error here
        // TypeError: Cannot read property 'protocol' of undefined isURLSameOrigin
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
  			return nameLength >= 2 && nameLength <= 50 ? true : false;
  		},
  		nameMessage() {
  			var nameLength = this.form.name === null ? 0: this.form.name.length;
  			if (nameLength < 2 || nameLength > 50) {
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
  				return false;
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
  			if (tripType === 'round' && (departure === null || departure.length === 0)) {
  				return false;
  			}
  			if (arrival === null || departure === null || arrival.length === 0 || departure.length === 0) {
  				return null;
  			}
  			var departureDate = new Date(departure);
  			var arrivalDate = new Date(arrival);
  			return arrivalDate >= departureDate;
  		},
  		arrivalDisabled() {
  			return this.form.tripType === 'simple';
  		},
  		familySizeState() {
  			if (this.form.familySize === null) {
  				return null;
  			}
  			return !isNaN(this.form.familySize) && this.form.familySize >= 0 && this.form.familySize <= 31;
  		},
  		disableSubmit() {
  			var nameState = this.nameState;
  			var lastNameState = this.lastNameState === null ? true : this.lastNameState;
  			var familySizeState = this.familySizeState === null ? true : this.familySizeState;
  			var departureState = this.departureState === null ? true : this.departureState;
  			var arrivalState = this.arrivalState === null ? true : this.arrivalState;
  			return !(nameState && lastNameState && familySizeState && departureState && arrivalState);
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


}
</script>
