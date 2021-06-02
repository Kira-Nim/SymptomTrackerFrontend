let moment = require('moment');
// let Chart = require('chart.js');
import Chart from 'chart.js/auto';


document.addEventListener("DOMContentLoaded",function(){

  const today = moment();
  window.fromDate = today.startOf('week');
  window.toDate = today.endOf('week');





});





function getDataForChartComponent(){


}



let params = { requestDate: window.date.format('YYYY-MM-DD') }
url.search = new URLSearchParams(params).toString();

















/*

// canvas is a special dom element.
// In this element special rules apply (so to speak)
// In canvas html and css does now work.
// In canvas you can use JS do "draw" whatever you want. You can disign what should be shown on the screen pixl by pixl
// without the normal constraints caused by other html elements.
let canvas = document.getElementById('myChart');

// Chart is a JS class (not a dom-element) imported with chart.js library.
let myChart = new Chart(canvas, {


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
