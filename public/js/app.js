const forecastDiv = document.getElementById("forecast");

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  const location = event.srcElement[0].value;

  forecastDiv.innerHTML = "<h3>Loading...</h3>";
  
  fetch(`/weather?address=${location}`).then(res => {
    res.json().then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        forecastDiv.innerHTML = `<p>${data.error}</p>`;
      } else {
        console.log(`Forecast: ${data.forecast}`);
        forecastDiv.innerHTML =
          "<p><h3>" + data.location + "</h3><br>" + data.forecast + "</p>";
        console.log(`Location: ${data.location}`);
      }
    });
  });
});
