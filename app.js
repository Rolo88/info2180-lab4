let searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", function () {
  fetch("superheroes.php")
    .then((response) => {
      return response.text();
    })
    .then((res) => {
      alert(res);
    })
    .catch((e) => {
      console.error(e);
    });
});
