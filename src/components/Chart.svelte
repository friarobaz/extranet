
<script>
    import Chart from 'chart.js/auto'
	import { onMount } from 'svelte';
    export let women = 0
    export let men = 0
	const chartDef = {
    type: 'doughnut',
    data: {
  labels: [
    'Femmes',
    'Hommes',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [women, men],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
    ],
    hoverOffset: 30
  }]
},
    
}
	let ctx;
	let chartCanvas;

	onMount(async (promise) => {
		  ctx = chartCanvas.getContext('2d');
          
			var chart = new Chart(ctx, chartDef)

	});

</script>
<div>
    <canvas bind:this={chartCanvas} id="myChart"></canvas>
</div>
<br>
<br>
<br>


<style>
    div{
        width:400px;
    }
</style>