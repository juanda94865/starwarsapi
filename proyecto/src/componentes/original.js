import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

export default async function mostrarOriginal() {
  const app = document.getElementById("app");

  app.innerHTML = `<h2>Películas de Star Wars</h2>
  <p>Cargando películas...</p>
  `;

  try {
    // 1. Obtener películas desde la API
    const resp = await fetch("https://www.swapi.tech/api/films");
    const data = await resp.json();
    const films = data.result;

    // 2. Construir el formulario dinámico
    app.innerHTML = `
      <h2>Películas de Star Wars</h2>

      <label>Selecciona una película:</label><br>
      <select id="pelicula">
        ${films
          .map(
            (f) =>
              `<option value="${f.uid}">${f.properties.title}</option>`
          )
          .join("")}
      </select>
      <br><br>

      <label>Comentario personal:</label><br>
      <textarea id="comentario" rows="4" cols="40" placeholder="Escribe algo sobre esta película"></textarea>
      <br><br>

      <label>Puntuación (0 - 10):</label><br>
      <input type="number" id="puntuacion" min="0" max="10" value="0">
      <br><br>

      <button id="guardarBtn">Guardar en Firestore</button>

      <p id="mensaje"></p>
    `;

    // 3. Guardar en Firestore
    document.getElementById("guardarBtn").addEventListener("click", async () => {
      const peliculaID = document.getElementById("pelicula").value;
      const comentario = document.getElementById("comentario").value;
      const puntuacion = document.getElementById("puntuacion").value;

      // Obtener detalles de la película seleccionada
      const filmData = films.find((f) => f.uid === peliculaID);

      const objetoAGuardar = {
        peliculaID,
        titulo: filmData.properties.title,
        director: filmData.properties.director,
        comentario,
        puntuacion: Number(puntuacion),
        fechaGuardado: new Date().toISOString()
      };

      try {
        await addDoc(collection(db, "peliculasFavoritas"), objetoAGuardar);

        document.getElementById("mensaje").textContent =
          "Película guardada correctamente en Firestore ✔️";
      } catch (error) {
        document.getElementById("mensaje").textContent =
          "Error al guardar: " + error.message;
      }
    });
  } catch (e) {
    app.innerHTML = `<p>Error cargando la API: ${e.message}</p>`;
  }
}
