(() => {
  console.log("welcome to tourista expert help");
  Toastify({
    text: "welcome to tourista expert help",
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
})();
