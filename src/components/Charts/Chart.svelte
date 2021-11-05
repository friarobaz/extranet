
<script>
    import Chart from 'chart.js/auto'
	import { onMount } from 'svelte';
	export let config = {}
	let ctx, chartCanvas
	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		var chart = new Chart(ctx, config)
	})
</script>

<canvas bind:this={chartCanvas}></canvas>
