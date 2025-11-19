export default async function mostrarHome() {
  const app = document.getElementById("app");

  app.innerHTML = `<h2>Películas de Star Wars</h2>
  <p>Cargando datos...</p>`;

  try {
    const resp = await fetch("https://www.swapi.tech/api/films");
    const data = await resp.json();
    const films = data.result;

    // Mapa de imágenes usando episode_id
    const imagenes = {
      "1": "https://lumiere-a.akamaihd.net/v1/images/ep1_poster_1_743b48d0.jpeg",
      "2": "https://lumiere-a.akamaihd.net/v1/images/ep2_poster_1_2aa4f77c.jpeg",
      "3": "https://lumiere-a.akamaihd.net/v1/images/ep3_poster_1_31566182.jpeg",
      "4": "https://lumiere-a.akamaihd.net/v1/images/ep4_poster_1_334f5ad6.jpeg",
      "5": "https://lumiere-a.akamaihd.net/v1/images/ep5_poster_1_060f37bf.jpeg",
      "6": "https://lumiere-a.akamaihd.net/v1/images/ep6_poster_1_2bd4a5c4.jpeg"
    };

    app.innerHTML = `
      <h2>Películas de Star Wars</h2>
      <div id="listaPeliculas" style="display:flex; flex-wrap:wrap; gap:15px;"></div>
    `;

    const lista = document.getElementById("listaPeliculas");

    films.forEach((film) => {
      const p = film.properties;
      const episodio = p.episode_id; // ← AQUÍ ESTÁ LA CLAVE

      const card = document.createElement("div");
      card.style.border = "1px solid #ccc";
      card.style.borderRadius = "10px";
      card.style.padding = "15px";
      card.style.width = "260px";
      card.style.background = "#f5f5f5";
      card.style.position = "relative";

      const descripcionId = "desc-" + episodio;
      const imagenId = "img-" + episodio;

      card.innerHTML = `
        <h3>${p.title}</h3>
        <p><strong>Director:</strong> ${p.director}</p>
        <p><strong>Fecha:</strong> ${p.release_date}</p>

        <p id="${descripcionId}" style="font-size:0.9em; font-style:italic; cursor:pointer;">
          ${p.opening_crawl.substring(0, 100)}...
        </p>

        <img id="${imagenId}"
             src="${imagenes[episodio]}"
             style="width:100%; border-radius:10px; display:none; margin-top:10px;">
      `;

      lista.appendChild(card);

      const descripcion = document.getElementById(descripcionId);
      const imagen = document.getElementById(imagenId);

      descripcion.addEventListener("mouseenter", () => {
        imagen.style.display = "block";
      });

      descripcion.addEventListener("mouseleave", () => {
        imagen.style.display = "none";
      });
    });
  } catch (e) {
    app.innerHTML = `<p>Error cargando la API: ${e.message}</p>`;
  }
}
