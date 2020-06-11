

const form = document.querySelector("form");
const input = document.querySelector("input");
const msg1 = document.querySelector(".msg1");
const msg2 = document.querySelector(".msg2");

form.addEventListener("submit", e => {
  e.preventDefault();
  const location = input.value;
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    });
});
