// document.addEventListener('DOMContentLoaded', () => {
//     // Hide chart container and ensure the message is visible
//     const chartContainer = document.querySelector('.chart-container');
//     const messageDiv = document.querySelector('.message');
//     const loadingDiv = document.getElementById('loading'); // Loading GIF container

//     chartContainer.style.display = 'none'; // Hide the chart initially
//     loadingDiv.style.display = 'none'; // Ensure the loading indicator is hidden
//     messageDiv.style.display = 'block'; // Ensure the message is visible
// });

// // Initialize Chart.js after DOM is ready
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: [], // X-axis labels will be populated dynamically
//         datasets: [
//             {
//                 label: 'Prediction Values',
//                 data: [], // Data for the chart
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//             },
//         ],
//     },
//     options: {
//         responsive: true,
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     },
// });

// // Form submission handling
// document.getElementById('searchForm').addEventListener('submit', async function (e) {
//     e.preventDefault(); // Prevent form from reloading the page

//     const streetAddress = document.getElementById('street-address').value;
//     const city = document.getElementById('city').value;
//     const county = document.getElementById('county').value;
//     const state = document.getElementById('state').value;

//     const resultDiv = document.getElementById('result'); // Div for displaying results
//     const loadingDiv = document.getElementById('loading'); // Loading GIF container
//     const chartContainer = document.querySelector('.chart-container'); // Chart container
//     const messageDiv = document.querySelector('.message'); // Message div

//     // Show loading GIF and hide chart initially
//     loadingDiv.style.display = 'block';
//     chartContainer.style.display = 'none';
//     resultDiv.style.display = 'none';
//     messageDiv.style.display = 'none'; // Hide message when loading

//     try {
//         // Simulate an API call using setTimeout to mock loading delay
//         await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay

//         // Simulate a fake prediction value
//         const fakePrediction = Math.random() * 100;

//         // Hide loading GIF and show result and chart
//         loadingDiv.style.display = 'none';
//         resultDiv.style.display = 'block';
//         chartContainer.style.display = 'block';
//         messageDiv.style.display = 'none'; // Hide message when chart is shown

//         // Display the prediction result
//         resultDiv.textContent = `Prediction: ${fakePrediction.toFixed(2)}`;

//         // Update the chart dynamically
//         myChart.data.labels.push(`${streetAddress}, ${city}, ${county}, ${state}`);
//         myChart.data.datasets[0].data.push(fakePrediction);
//         myChart.update();
//     } catch (error) {
//         // Hide loading GIF and show error message
//         loadingDiv.style.display = 'none';
//         resultDiv.style.display = 'block';
//         messageDiv.style.display = 'block'; // Show message in case of error
//         resultDiv.textContent = `Error: ${error.message}`;
//     }
// });



document.addEventListener('DOMContentLoaded', () => {
    // Hide chart container and ensure the message is visible
    const chartContainer = document.querySelector('.chart-container');
    const messageDiv = document.querySelector('.message');
    const loadingDiv = document.getElementById('loading'); // Loading GIF container

    chartContainer.style.display = 'none'; // Hide the chart initially
    loadingDiv.style.display = 'none'; // Ensure the loading indicator is hidden
    messageDiv.style.display = 'block'; // Ensure the message is visible
});

// Initialize Chart.js after DOM is ready
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // X-axis labels will be populated dynamically
        datasets: [
            {
                label: 'Prediction Values',
                data: [], // Data for the chart
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Form submission handling
document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const streetAddress = document.getElementById('street-address').value;
    const city = document.getElementById('city').value;
    const county = document.getElementById('county').value;
    const state = document.getElementById('state').value;

    const resultDiv = document.getElementById('result'); // Div for displaying results
    const loadingDiv = document.getElementById('loading'); // Loading GIF container
    const chartContainer = document.querySelector('.chart-container'); // Chart container
    const messageDiv = document.querySelector('.message'); // Message div
    const searchForm = document.getElementById('searchForm'); // Search form
    const riskLevelDiv = document.getElementById('riskLevel'); // Div for risk level text

    // Show loading GIF and hide chart initially
    loadingDiv.style.display = 'block';
    chartContainer.style.display = 'none';
    resultDiv.style.display = 'none';
    messageDiv.style.display = 'block'; // Show message when loading
    searchForm.style.display = 'block'; // Keep search form visible until chart appears
    riskLevelDiv.style.display = 'none'; // Hide risk level initially

    // Add animation to the message text
    messageDiv.classList.add('fade-out-up');

    try {
        // Simulate an API call using setTimeout to mock loading delay
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay

        // Simulate a fake prediction value and risk level
        const fakePrediction = Math.random() * 100;
        const riskLevels = ['Very high', 'Relatively high', 'Relatively low', 'Very low'];
        const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];

        // Hide loading GIF and show result and chart
        loadingDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        chartContainer.style.display = 'block';
        searchForm.style.display = 'none'; // Hide search form when chart appears
        riskLevelDiv.style.display = 'block'; // Show risk level text

        // Display the prediction result and risk level
        resultDiv.textContent = `Prediction: ${fakePrediction.toFixed(2)}`;
        riskLevelDiv.textContent = `Risk Level: ${riskLevel}`;

        // Update the chart dynamically
        myChart.data.labels.push(`${streetAddress}, ${city}, ${county}, ${state}`);
        myChart.data.datasets[0].data.push(fakePrediction);
        myChart.update();
    } catch (error) {
        // Hide loading GIF and show error message
        loadingDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        resultDiv.textContent = `Error: ${error.message}`;
    }
});

// Function to update the risk level and apply the appropriate class
function setRiskLevel(riskLevel) {
    const riskLevelElement = document.getElementById('riskLevel');
    
    // Clear any existing classes
    riskLevelElement.classList.remove('risk-very-high', 'risk-relatively-high', 'risk-relatively-low', 'risk-very-low');

    // Set the new text and class based on the risk level
    riskLevelElement.textContent = riskLevel;

    if (riskLevel === 'Very high') {
        riskLevelElement.classList.add('risk-very-high');
    } else if (riskLevel === 'Relatively high') {
        riskLevelElement.classList.add('risk-relatively-high');
    } else if (riskLevel === 'Relatively low') {
        riskLevelElement.classList.add('risk-relatively-low');
    } else if (riskLevel === 'Very low') {
        riskLevelElement.classList.add('risk-very-low');
    }
}

// Example usage
setRiskLevel('Very high'); // This would set the risk level text and apply the red color


// Reset to search bars when logo is clicked
document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.querySelector('.chart-container');
    const messageDiv = document.querySelector('.message');
    const loadingDiv = document.getElementById('loading');
    const searchForm = document.getElementById('searchForm');
    const resultDiv = document.getElementById('result');
    const riskLevelDiv = document.getElementById('riskLevel');

    chartContainer.style.display = 'none';
    loadingDiv.style.display = 'none';
    messageDiv.style.display = 'block';

    // Reset functionality for logo and FutureNest text
    const resetElements = [
        document.getElementById('resetLink'), // Logo
        document.getElementById('resetText') // FutureNest text
    ];
    resetElements.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();

            // Reset page to initial state
            chartContainer.style.display = 'none';
            resultDiv.style.display = 'none';
            riskLevelDiv.style.display = 'none';
            loadingDiv.style.display = 'none';
            messageDiv.style.display = 'block'; // Bring back the message
            searchForm.style.display = 'block';
            searchForm.reset(); // Clear form inputs

            // Reset the message animation (optional)
            messageDiv.classList.remove('fade-out-up'); // Remove the animation class if needed
        });
    });
});
