var chartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
var chartData = [40, 39, 20, 40, 39, 80];
var chartBackgrounds = ['red','yellow','blue','green','purple','black'];

Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted () {
    this.renderChart({
      labels: chartLabels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: chartData
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
});

Vue.component('pie-chart', {
	  extends: VueChartJs.Pie,
	  mounted () {
	    this.renderChart({
	      labels: chartLabels,
	      datasets: [
	        {
	          label: 'Data One',
	          backgroundColor: chartBackgrounds,
	          data: chartData
	        }
	      ],
	    }, {responsive: true, maintainAspectRatio: false})
	  }
	});

Vue.component('bar-chart', {
	  extends: VueChartJs.Bar,
	  mounted () {
	    this.renderChart({
	      labels: chartLabels,
	      datasets: [
	        {
	          label: 'Test Dataset',
	          backgroundColor: chartBackgrounds,
	          data: chartData,
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
	  }
	});

var data = {
		chart: ''
};

var methods = {
		showGraph(type) {
			this.chart = type;
		}
};
