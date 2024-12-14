const btn = document.getElementById("btn");
const fromImg = document.getElementById("from-img");
const toImg = document.getElementById("to-img");
const selFrom = document.getElementById("select-from");
const selTo = document.getElementById("select-to");
const input = document.getElementById("inp");
// const result = document.getElementById("result");
const result = document.getElementById("p");

let api =
  `https://currency-converter-pro1.p.rapidapi.com/convert`
  
const url =
  "https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=USD";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3a85454212mshfe09c9b1b69ab49p1aa3e3jsn784737adc563",
    "x-rapidapi-host": "currency-converter-pro1.p.rapidapi.com",
  },
  
};

async function getData() {
    const response = await fetch(url, options);
    const data = await response.json();
    for (const key in data.result) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        selFrom.appendChild(option);
    }
    for (const key in data.result) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        selTo.appendChild(option);
    }
}
getData()

selFrom.addEventListener("change", () => {
    fromImg.src = `https://flagcdn.com/24x18/${selFrom.value.toLowerCase().slice(0,2)}.png`
})
selTo.addEventListener("change", () => {
    toImg.src = `https://flagcdn.com/24x18/${selTo.value.toLowerCase().slice(0,2)}.png`
})


btn.addEventListener("click", () => {
    if (input.value.trim().length < 1) {
        alert("Please enter amount!!!");
    }
    else {
        fetch(api +
            `?from=${selFrom.value}&to=${selTo.value}&amount=${input.value}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                result.textContent=data.result.toFixed(2) + " " + selTo.value;
            })
    }
});


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});