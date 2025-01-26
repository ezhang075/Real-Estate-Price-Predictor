// first attempt
// document.getElementById("searchForm").addEventListener("submit", async function (e) {
//     e.preventDefault(); // Prevent form from reloading the page
  
//     const searchInput = document.getElementById("search-bar").value; // Get the input value
//     const resultDiv = document.getElementById("result"); // Div for displaying results
  
//     try {
//       // Send a POST request to the API
//       const response = await fetch("https://futurenest.vercel.app/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // Specify JSON content type
//         },
//         body: JSON.stringify({ address: searchInput }), // Send address as JSON
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const data = await response.json(); // Parse the JSON response
//       resultDiv.textContent = `Prediction: ${data.prediction}`; // Display prediction result
//     } catch (error) {
//       resultDiv.textContent = `Error: ${error.message}`; // Display error messages
//     }
//   });
  
// fetch("https://futurenest.vercel.app/predict", {
// method: "OPTIONS",
// })
// .then((response) => console.log(response))
// .catch((error) => console.error(error));


// document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent form submission

//     // Show the loading gif
//     document.getElementById('loading').style.display = 'block';

//     // Simulate a delay for demonstration purposes (e.g., making an API request)
//     setTimeout(function() {
//         // Hide the loading gif after the "search" is done
//         document.getElementById('loading').style.display = 'none';

//         // Here, you can handle the results, e.g., display them in the result container.
//         document.getElementById('result').innerText = 'Search complete!';
//     }, 3000);  // 3-second delay for demo purposes
// });



// second attempt
// // Initialize Chart.js
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: [], // X-axis labels will be populated dynamically
//     datasets: [
//       {
//         label: 'Prediction Values',
//         data: [], // Data for the chart
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });

// // Ensure the chart is hidden on page load
// document.addEventListener('DOMContentLoaded', () => {
//   const chartContainer = document.querySelector('.chart-container');
//   chartContainer.style.display = 'none'; // Hide the chart initially
// });

// // Form submission handling
// document.getElementById('searchForm').addEventListener('submit', async function (e) {
//   e.preventDefault(); // Prevent form from reloading the page

//   const searchInput = document.getElementById('search-bar').value; // Get user input
//   const resultDiv = document.getElementById('result'); // Div for displaying results
//   const loadingDiv = document.getElementById('loading'); // Loading GIF container
//   const chartContainer = document.querySelector('.chart-container'); // Chart container

//   // Show loading GIF and hide chart and result initially
//   loadingDiv.style.display = 'block';
//   chartContainer.style.display = 'none';
//   resultDiv.style.display = 'none';

//   try {
//     // Simulate an API call (remove this block once API is ready)
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay
//     const fakeData = { prediction: Math.random() * 100 }; // Fake prediction data

//     // Hide loading GIF and show result and chart
//     loadingDiv.style.display = 'none';
//     resultDiv.style.display = 'block';
//     chartContainer.style.display = 'block';

//     // Display the prediction result
//     resultDiv.textContent = `Prediction: ${fakeData.prediction.toFixed(2)}`;

//     // Update the chart dynamically
//     myChart.data.labels.push(searchInput); // Add search input as the label
//     myChart.data.datasets[0].data.push(fakeData.prediction); // Add prediction value to the dataset
//     myChart.update();
//   } catch (error) {
//     // Hide loading GIF and show error message
//     loadingDiv.style.display = 'none';
//     resultDiv.style.display = 'block';
//     resultDiv.textContent = `Error: ${error.message}`;
//   }
// });

// // OPTIONS request for testing (remove if unnecessary)
// fetch('https://futurenest.vercel.app/predict', {
//   method: 'OPTIONS',
// })
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));


// attempt 3 - working
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
  
    const searchInput = document.getElementById('search-bar').value; // Get user input
    const resultDiv = document.getElementById('result'); // Div for displaying results
    const loadingDiv = document.getElementById('loading'); // Loading GIF container
    const chartContainer = document.querySelector('.chart-container'); // Chart container
    const messageDiv = document.querySelector('.message'); // Message div
  
    // Show loading GIF and hide chart initially
    loadingDiv.style.display = 'block';
    chartContainer.style.display = 'none';
    resultDiv.style.display = 'none';
    messageDiv.style.display = 'none'; // Hide message when loading
  
    try {
      // Simulate an API call (remove this block once API is ready)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay
      const fakeData = { prediction: Math.random() * 100 }; // Fake prediction data
  
      // Hide loading GIF and show result and chart
      loadingDiv.style.display = 'none';
      resultDiv.style.display = 'block';
      chartContainer.style.display = 'block';
      messageDiv.style.display = 'none'; // Hide message when chart is shown
  
      // Display the prediction result
      resultDiv.textContent = `Prediction: ${fakeData.prediction.toFixed(2)}`;
  
      // Update the chart dynamically
      myChart.data.labels.push(searchInput); // Add search input as the label
      myChart.data.datasets[0].data.push(fakeData.prediction); // Add prediction value to the dataset
      myChart.update();
    } catch (error) {
      // Hide loading GIF and show error message
      loadingDiv.style.display = 'none';
      resultDiv.style.display = 'block';
      messageDiv.style.display = 'block'; // Show message in case of error
      resultDiv.textContent = `Error: ${error.message}`;
    }
  });
  
  // OPTIONS request for testing (remove if unnecessary)
  fetch('https://futurenest.vercel.app/predict', {
    method: 'OPTIONS',
  })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
  