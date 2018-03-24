<template>
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
</template>


<script>
import Vue from 'vue'
import axios from "axios"
import i18n from "vue-i18n"
export default {

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
      var server = 'http://localhost:8081/servlet-poc/booking';
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

}
</script>
