let chart;

function fetchData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            updateDashboard(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updateDashboard(data) {
    const dataType = document.getElementById('dataType').value;
    updateChart(data[dataType], dataType);
    updateTable(data[dataType], dataType);
}

function updateChart(data, dataType) {
    const ctx = document.getElementById('chart');
    
    if (chart) {
        chart.destroy();
    }
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: dataType.charAt(0).toUpperCase() + dataType.slice(1),
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateTable(data, dataType) {
    const table = document.getElementById('dataTable');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let tableHTML = `
        <tr>
            <th>Month</th>
            <th>${dataType.charAt(0).toUpperCase() + dataType.slice(1)}</th>
        </tr>
    `;
    
    for (let i = 0; i < data.length; i++) {
        tableHTML += `
            <tr>
                <td>${months[i]}</td>
                <td>${data[i]}</td>
            </tr>
        `;
    }
    
    table.innerHTML = tableHTML;
}

function handleResize() {
    if (chart) {
        chart.resize();
    }
}

function handleMouseMove(e) {
    if (!isResizing) return;
    
    chartContainer.style.width = (e.clientX - chartContainer.offsetLeft) + 'px';
    chartContainer.style.height = (e.clientY - chartContainer.offsetTop) + 'px';
    handleResize();
}

document.addEventListener('DOMContentLoaded', () => {
    const dataTypeSelect = document.getElementById('dataType');
    const chartContainer = document.getElementById('chartContainer');
    const resizer = document.querySelector('.resizer');

    let isResizing = false;

    dataTypeSelect.addEventListener('change', fetchData);
    window.addEventListener('resize', handleResize);

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });

    fetchData();
});