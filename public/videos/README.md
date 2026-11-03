# Recurso pendiente: programmer-intro.mp4

**El video no está incluido.** Esta carpeta documenta el archivo que hay que aportar. No renombres otro archivo como MP4 ni subas un archivo vacío.

Ubicación exacta: `public/videos/programmer-intro.mp4`. El reproductor usa `./public/videos/programmer-intro.mp4`, una ruta relativa compatible con el subdirectorio de GitHub Pages. En este proyecto estático `public` es una carpeta normal, no se elimina de la URL al publicar.

## Guion para producir el video realista

Entregar una toma continua o montaje de aproximadamente 10 segundos, sin audio, sin logos de terceros y con permiso de uso comercial de las personas y materiales.

- **0–2 s:** persona humana sentada frente a una notebook cerrada, escritorio moderno, ambiente oscuro con luz azul eléctrico y violeta, reflejos y profundidad de campo realistas. Movimiento suave de cámara.
- **2–4 s:** manos abren lentamente la notebook; movimientos naturales de brazos y bisagra, encendido y brillo suave; acercamiento de cámara.
- **4–8 s:** persona escribe en un editor similar a VS Code, código progresivo, cursor parpadeante y resaltado de sintaxis. Mostrar HTML, CSS, JavaScript y un fragmento React como contenido del video, sin incorporar React al sitio. Luz tenue sobre el teclado y continuidad anatómica de manos y dedos.
- **8–10 s:** cámara entra en la pantalla y el código se disuelve en partículas azul/violeta. Dejar el centro limpio para el título HTML accesible que agrega la web; evitar duplicar los textos dentro del video.

Ejemplos reales para componer el editor en posproducción:

```html
<main id="app"><h1>Tu próxima idea</h1></main>
```
```css
:root { --accent: #6579ff; }
#app { color: var(--accent); }
```
```js
const idea = { name: 'Tithomas', ready: true };
document.querySelector('#app').dataset.ready = idea.ready;
```
```jsx
function Project({ name }) {
  return <article><h2>{name}</h2></article>;
}
```

Para que el texto del editor sea legible y correcto, conviene incorporarlo en posproducción sobre la pantalla en lugar de depender de un generador de video para escribirlo. Los movimientos humanos, cámara y transformación realista de código en partículas deben venir del video; el reproductor no los puede generar con CSS.

## Exportación recomendada

- MP4 con H.264/AVC, formato de píxel yuv420p, 24–30 fps y sin pista de audio.
- 1280×720 o 1920×1080, idealmente entre 2 y 5 MB para conexiones móviles.
- Colocar el índice MP4 al inicio (`faststart`) para reproducción progresiva.
- Mantener persona, manos, notebook y editor en la zona central: `object-fit: cover` recorta los laterales en retrato. Validar el encuadre en iPhone; una exportación vertical alternativa requeriría ampliar la selección de fuentes.
- Sustituir opcionalmente `public/images/intro-poster.svg` por una portada WebP extraída del video y actualizar las dos referencias de portada en `index.html`. La portada actual es una ilustración abstracta ligera, no una foto del video inexistente.

Ejemplo de compresión si tenés FFmpeg instalado:

```sh
ffmpeg -i original.mov -an -vf 'scale=1280:-2' -c:v libx264 -pix_fmt yuv420p -crf 24 -preset slow -movflags +faststart programmer-intro.mp4
```

Probar el archivo final en Safari de un iPhone físico y Chrome antes de publicar. La reproducción automática depende de la política del navegador; si es rechazada, la web usa la alternativa visual breve y permite saltar inmediatamente.
