(() => {
  console.log("welcome to tourista expert help");

  async function getCsrfToken() {
    const response = await fetch('http://localhost:8888/.netlify/functions/api/csrf-token', {
      credentials: 'include' // Include credentials to receive CSRF token cookie
    });
    const data = await response.json();
    document.getElementById('csrfToken').value = data.csrfToken;
  }

  getCsrfToken();
})();

document.addEventListener("alpine:init", () => {
  Alpine.store("expertHelpStore", {
    countries: [],
    countrySearch: "",
    visaCategory: [
      "Tourist Visa",
      "Medical Visa",
      "Business Visa",
      "Student Visa",
    ],
    selectedVisaCategory: "Tourist Visa",

    open: false,
    fullname: "",
    email: "",
    mobile: "",
    selectedCountry: "221",
    selectedProfession: "-1",
    selectedHelpType: "Visa Assistance",

    help_type: ["Visa Assistance", "Paper Processing"],
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

      fetch("https://tourista-monitor.netlify.app/.netlify/functions/api/countries", requestOptions)
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

      fetch("https://tourista-monitor.netlify.app/.netlify/functions/api/professions", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.profession = result;
        })
        .catch((error) => console.log("error", error));
    },

    submitForm() {
      console.log("clicked", this);
      const _csrf = document.getElementById('csrfToken').value;
      console.log(_csrf);

      this.loading = true;
      fetch("http://localhost:8888/.netlify/functions/api/submit-form", {
        method: "POST",
        credentials: 'include', // Include credentials to send CSRF token cookie
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': _csrf,
        },
        body: JSON.stringify({
          fullname: this.fullname,
          mobile: this.mobile,
          email: this.email,
          country: this.selectedCountry,
          profession: this.selectedProfession,
          comment: this.comment,
          visatype: this.selectedVisaCategory,
          helptype: this.selectedHelpType,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Status:", data.success);
          if (!data.success) {
            this.errtoast(data.message);
          } else {
            this.toast(
              "Your request is being processed. Thank You For Submitting your request. An expert will reach out to you shortly. Meanwhile you can visit our website to get more details.",
            );
          }
          this.fullname = "";
          this.mobile = "";
          this.email = "";
          this.comment = "";
          this.loading = false;
        });
    },

    toast(message) {
      Toastify({
        text: message,
        duration: 9000,
        //destination: "https://stts3g-8080.csb.app/",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className:
          "font-[Onest] flex items-center justify-center text-lg flex-wrap bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl py-2 px-4 w-96 capitalize",
      }).showToast();
    },

    errtoast(message) {
      Toastify({
        text: message,
        duration: 7000,
        newWindow: true,
        close: true,
        gravity: "top",
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
