<script>
    import Chart from './Chart.svelte'
    export let data = {labels:[], numbers:[], title:''}
    const title = data.title
    const labels = data.labels
    const numbers = data.numbers
    const OPACITY = 0.7

    const chartData = {
        labels,
        datasets: [{
            label: title,
            data: numbers,
            backgroundColor: [
            `rgba(255, 99, 132, ${OPACITY})`,
            `rgba(255, 159, 64, ${OPACITY})`,
            `rgba(255, 205, 86, ${OPACITY})`,
            `rgba(75, 192, 192, ${OPACITY})`,
            `rgba(54, 162, 235, ${OPACITY})`,
            `rgba(153, 102, 255, ${OPACITY})`,
            `rgba(201, 203, 207, ${OPACITY})`
            ],
            borderWidth: 0
        }]
    }
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y',
            scales: {
            y: {
                beginAtZero: true
            }
            }
        },
    }
</script>

<h3>{title}</h3>
<Chart {config}/>