<script>
    import Chart from './Chart.svelte'
    export let data = {labels:[], numbers:[], title:''}
    const title = data.title
    const labels = data.labels
    const numbers = data.numbers

    const chartData = {
            labels,
            datasets: [{
                label: title,
                data: numbers,
                backgroundColor: [
                'rgb(154, 162, 235)',
                'rgb(54, 162, 35)',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                ],
                hoverOffset: 0,
                offest: 0,
            }]
        }
    const config = { type: 'doughnut', data:chartData }
</script>

<h3>{title}</h3>
<Chart {config}/>