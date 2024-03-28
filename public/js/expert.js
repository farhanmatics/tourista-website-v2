(() => {
  console.log("welcome to tourista expert help");
})();

document.addEventListener("alpine:init", () => {
  Alpine.store("expertHelpStore", {
    countries: [],
    countrySearch: "",

    open: false,
    fullname: "",
    email: "",
    mobile: "",
    selectedCountry: "-1",
    selectedVisaCategory: "-1",
    selectedProfession: "-1",

    help_type: [],
    visaCategory: [],
    profession: [],
    comment: "",

    agreeTerms: false,

    showToast: false,
    toastMessage: "",

    loading: false,

    searchCountry() {
      return this.countries.filter((i) =>
        i.visa_country
          .toLowerCase()
          .startsWith(this.countrySearch.toLowerCase()),
      );
    },

    loadCountries() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("/api/countries", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.countries = result;
        })
        .catch((error) => console.log("error", error));
    },

    loadProfessions() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("/api/professions", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.profession = result;
        })
        .catch((error) => console.log("error", error));
    },

    submitForm() {
      console.log("clicked", this.selectedCountry);
      Toastify({
        text: "Your request is being processed. Thank You For Submitting your request. An expert will reach out to you shortly. Meanwhile you can visit our website to get more details.",
        duration: 9000,
        destination: "https://stts3g-8080.csb.app/",
        newWindow: false,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className:
          "font-[Onest] flex items-center justify-center text-lg flex-wrap bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl py-2 px-4 w-96 capitalize",
        duration: -1,
      }).showToast();
    },

    toast(message) {
      Toastify({
        text: message,
        duration: 7000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:
            "linear-gradient(to left bottom, #7039aa, #563395, #3f2b80, #29236a, #151b54)",
          borderRadius: "10px",
          textShadow: "1px 1px 1px #000",
          padding: "10px 25px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    },

    errtoast(message) {
      Toastify({
        text: message,
        duration: 7000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background:
            "linear-gradient(to right top, #b70f1b, #b00f17, #a90e14, #a20e10, #9b0d0d)",
          borderRadius: "10px",
          textShadow: "1px 1px 1px #000",
          padding: "10px 25px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    },
  });
});
