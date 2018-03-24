<template>
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
</template>


<script>

// import Chartjs from "chartjs"
import VueChartJs from "vue-chartjs"

export default {
  components : {
    'line-chart': {
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
    },
    'pie-chart': {
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
    },
    'bar-chart': {
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
    }
  },
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
}
</script>
