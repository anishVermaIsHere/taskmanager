
export function initDashboard(tasks){

  const result=tasks.map((t)=>t.name);
  const labels=result;
  
  const data=[19, 30, 20, 22, 12, 42];
  const bgColor=['#5bb78a','#56ade7','#9B59B6','#DE3163','#FFBF00','#34495E']
  
    const lineData = {
      labels: labels,
      datasets: [{
        label: 'Task Data',
        backgroundColor: bgColor,
        borderColor: '#d3d7d9',
        data: data,
      }]
    };
    
    const doughnutData = {
      labels: labels,
      datasets: [{
        label: 'Task Data',
        backgroundColor: bgColor,
        data: data,
      }]
    };
  
   const lineChart= {
      type: 'line',
      data: lineData,
      options: {}
    };
  
   const doughnutChart= {
      type: 'doughnut',
      data: doughnutData,
      options: {}
    };
  
    const line = new Chart(
      document.querySelector('#datavis1'),
      lineChart,
    );
  
    const doughnut = new Chart(
      document.querySelector('#datavis2'),
      doughnutChart,
    );
  
  }