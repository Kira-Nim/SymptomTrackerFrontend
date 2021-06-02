

let moment = require('moment');
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';



document.addEventListener("DOMContentLoaded",function(){

  const today = moment();
  window.fromDate = today.clone().startOf('isoWeek');
  window.toDate = today.clone().endOf('isoWeek');


  getDataForChartComponent();

});



function getDataForChartComponent(){


  let url = new URL('http://localhost:8080/symptomVisualization');
  let params = { requestDateFrom: window.fromDate.format('YYYY-MM-DD'),
                  requestDateTo: window.toDate.format('YYYY-MM-DD') };

  url.search = new URLSearchParams(params).toString();

  const fetchOptions = {
    method: 'get',
    credentials: 'include',
  };


  fetch(url, fetchOptions)
    .then(response => { return response.json() }) // get response body aka Json.
    .then(responseBody => {
      window.symptomVisualizationVTOArray = responseBody;

      let chartDataArray =[];

      // Make chartDataSet for each symptomVisualizationVTO for the option-obj which is a parameter for Chart.
      for(let symptomVisualizationVTO of symptomVisualizationVTOArray){

        if(symptomVisualizationVTO.symptom.VisibleOnStatistics === true){}



        let registrations = symptomVisualizationVTO.symptomRegistrationVTOArray;
        let coordinatesArray = registrations.map(e => {return{x: e.dateTime, y: e.intensity}});

        let chartDataSet = {
          label: symptomVisualizationVTO.symptom.name,
          backgroundColor: symptomVisualizationVTO.symptom.color,
          borderColor: symptomVisualizationVTO.symptom.color,
          borderWidth: 2,
          data: coordinatesArray
        };

        // Make new attribute on symptomVisualizationVTO called chartDataSet, containing data for graph visialization
        symptomVisualizationVTO.chartDataSet = chartDataSet;
        chartDataArray.push(chartDataSet);
      }

      insertDataIntoChartComponent(chartDataArray);
    });
}


function insertDataIntoChartComponent(chartDataArray){

  // canvas is a special dom element.
  // In this element special rules apply (so to speak)
  // In canvas html and css does now work.
  // In canvas you can use JS do "draw" whatever you want. You can design what should be shown on the screen pixl by pixl
  // without the normal constraints caused by other html elements.
  let canvas = document.getElementById('chart');

  // Make Array
  let dateArray = [];

  // TempDate is set to the first date shown on x-axis (DateFrom) incl. time noon.
  // As long as temp date is before toDate add 1 to tempDate.
  for (let tempDate = window.fromDate.clone().hour(12) ; tempDate.isBefore(window.toDate); tempDate.add(1, 'days')) {

    dateArray.push(tempDate.toISOString());

  }

  // Chart is a JS class (not a dom-element) imported with chart.js library.
  let chart = new Chart(canvas, {

    // This is a type of chart from chart.js makes available. chart.js offers a catalogue of different charts to implement, each is a type of chart.
    type: 'line',

    // Data is a JS object made available through chart.js library.
    // This object is used to hold our data, which is to be shown in the chart of chosen type.
    data: {

      // Labels (labels on the x-axis) are at 12, the middle, of each of the days we want to show
      labels: dateArray,
      datasets: chartDataArray
    },

    // This attribute holds the info that tells us how the different datasets is to be used.

    options: {

      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day' // One gridline per day
          },
          ticks: {
            source: 'labels' // Put ticks specifically on the labels, so we get a label in the middle of each day
          },
          grid: {
            offset: true // Put vertical grid lines directly between date names, not directly above them
          },
          min: fromDate.toISOString(), // Midnight, right at the very beginning of the week
          max: toDate.toISOString(), // Midnight, right at the very end of the week (exactly 7 days later)
        },
        y: {
          min: 0, // Intensity
          max: 7, // Intensity
          display: false
          // If we need multiple y scales (one for symptoms (intensity 0-7) and one for activity (24 hours))
          // then there's a guide here: https://stackoverflow.com/a/38094165/126183 (with y instead of yAxes)
        }
      },

      plugins: {
        legend: {
          display: false // Don't show "Hovedpine" at the top of chart (only on hover if wanted)
        },
        tooltip: {
          enabled: true // Don't show tooltips
        }
      },

      animation: false // Disable all animations - both the hover tooltip and adding/removing datasets
    }

  });

  console.log('line 161');
}

















/*






  //att1
  // This is a type of chart that chart.
  // js makes available. chart.js offers a catalogue of different charts to implement, each is a type of chart.
  type: 'bar',

  //att2
  // Data is a JS object made available through chart.js library.
  // This object is used to hold our data, which is to be shown in the chart of type 'bar'.
  // each element in datasets array is one option in the symptom-navigation-component - each of the 3 colors, each symptom and activities.
  // How the chart of type 'bar should look and whar parts of the datasets goes where is part of the data configuration behind the scenes.
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      barPercentage: 1.0,
      categoryPercentage: 1.0


    }]
  },

  //att3
  // This attribute holds the info that tells us how the different datasets is to be used.
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
    });
*/
