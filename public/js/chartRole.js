function createMultiLineChart(timestamp, roleData) {
    const ctx = document.getElementById('myChart').getContext('2d');
    // Array Role name
    const roleNames = Object.keys(roleData[0]);

    // Role colors
    const roleColors = [
        'rgba(255, 0, 54, 1)',
        'rgba(0, 140, 235, 1)',
        'rgba(255, 181, 0, 1)',
        'rgba(0, 192, 192, 1)',
        'rgba(85, 10, 255, 1)',
        'rgba(255, 127, 0, 1)',
        'rgba(61, 48, 162, 1)',
        'rgba(0, 169, 255, 1)',
        'rgba(0, 0, 0, 1)',
    ];

    
    
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamp, 
            datasets: roleNames.map((roleName, index) => ({
                label: roleName,
                data: roleData.map((entry) => entry[roleName]),
                borderColor: roleColors[index % roleColors.length], 
                borderWidth: 1,
                fill: false,
            })),
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            
        },
    });
}


function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function fetchDataandCreateChart() {
    fetch('/home/api/chart-data')
        .then((response) => response.json())
        .then((data) => {
            const timestamp = data.map((entry) => formatDate(entry.timestamp));
            const roleData = data.map((entry) => entry.roleData);
            createMultiLineChart(timestamp, roleData);
        });
}

fetchDataandCreateChart();