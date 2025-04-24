fetch("https://pokeapi.co/api/v2/pokemon/ditto", { method: "GET" })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

(async function fetchDataPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
})();
