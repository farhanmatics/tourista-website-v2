let currentIndex = 0;
const hello = ["Visas", "Travel", "Paperwork", "Tours", "Holidays"];

const countries = [
  {
      "id": 14,
      "visa_country": "Australia ",
      "iso3_code": "AUS "
  },
  {
      "id": 39,
      "visa_country": "Cambodia ",
      "iso3_code": "KHM "
  },
  {
      "id": 41,
      "visa_country": "Canada ",
      "iso3_code": "CAN "
  },
  {
      "id": 46,
      "visa_country": "China ",
      "iso3_code": "CHN "
  },
  {
      "id": 66,
      "visa_country": "Egypt ",
      "iso3_code": "EGY "
  },
  {
      "id": 77,
      "visa_country": "France",
      "iso3_code": "FRA "
  },
  {
      "id": 84,
      "visa_country": "Germany ",
      "iso3_code": "DEU "
  },
  {
      "id": 101,
      "visa_country": "Hong Kong",
      "iso3_code": "HKG "
  },
  {
      "id": 105,
      "visa_country": "Indonesia ",
      "iso3_code": "IDN "
  },
  {
      "id": 111,
      "visa_country": "Italy",
      "iso3_code": "ITA "
  },
  {
      "id": 115,
      "visa_country": "Jordan ",
      "iso3_code": "JOR "
  },
  {
      "id": 116,
      "visa_country": "Kazakhstan ",
      "iso3_code": "KAZ "
  },
  {
      "id": 117,
      "visa_country": "Kenya ",
      "iso3_code": "KEN "
  },
  {
      "id": 136,
      "visa_country": "Malaysia ",
      "iso3_code": "MYS "
  },
  {
      "id": 152,
      "visa_country": "Morocco ",
      "iso3_code": "MAR "
  },
  {
      "id": 157,
      "visa_country": "Nepal ",
      "iso3_code": "NPL "
  },
  {
      "id": 158,
      "visa_country": "Netherlands",
      "iso3_code": "NLD "
  },
  {
      "id": 176,
      "visa_country": "Philippines ",
      "iso3_code": "PHL "
  },
  {
      "id": 181,
      "visa_country": "Qatar ",
      "iso3_code": "QAT "
  },
  {
      "id": 196,
      "visa_country": "Saudi Arabia ",
      "iso3_code": "SAU "
  },
  {
      "id": 201,
      "visa_country": "Singapore ",
      "iso3_code": "SGP "
  },
  {
      "id": 211,
      "visa_country": "Sri Lanka ",
      "iso3_code": "LKA "
  },
  {
      "id": 215,
      "visa_country": "Sweden ",
      "iso3_code": "SWE "
  },
  {
      "id": 216,
      "visa_country": "Switzerland",
      "iso3_code": "CHE "
  },
  {
      "id": 221,
      "visa_country": "Thailand",
      "iso3_code": "THA "
  },
  {
      "id": 228,
      "visa_country": "Turkey",
      "iso3_code": "TUR "
  },
  {
      "id": 234,
      "visa_country": "United Arab Emirates (Dubai)",
      "iso3_code": "ARE "
  },
  {
      "id": 235,
      "visa_country": "United Kingdom",
      "iso3_code": "GBR "
  },
  {
      "id": 237,
      "visa_country": "United States of America ",
      "iso3_code": "USA "
  },
  {
      "id": 239,
      "visa_country": "Uzbekistan ",
      "iso3_code": "UZB "
  },
  {
      "id": 242,
      "visa_country": "Vietnam ",
      "iso3_code": "VNM "
  }
];



function randomIndex() {
  return ~~(Math.random() * hello.length);
}

window.setInterval(function () {
  let newIndex = randomIndex();
  while (newIndex === currentIndex) newIndex = randomIndex();
  currentIndex = newIndex;
  document.getElementById("animtext").textContent = hello[currentIndex];
}, 2300);


