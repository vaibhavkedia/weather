console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let location = search.value;
  search.blur();

  msg1.textContent = "Getting your data...";
  msg2.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    });
  });
});
