# Tithomas Programming Full Stack

Web institucional en español construida con HTML5, CSS3 y JavaScript puro. Sin frameworks, dependencias de producción, fuentes remotas ni proceso de compilación. Compatible con GitHub Pages y con rutas relativas.

## Archivos

- `index.html`: contenido, navegación, metadatos SEO y maquetas de demostración.
- `style.css`: diseño responsive, animaciones, estados de foco y preferencias de movimiento reducido.
- `script.js`: menú móvil, enlaces de contacto, año y apariciones suaves.

## Ver en local

Abrí `index.html` en tu navegador o, desde la raíz, ejecutá:

```sh
python3 -m http.server 8000
```

Visitá `http://localhost:8000`. No se necesita instalar paquetes.

## Configurar los contactos antes de publicar

Editá el objeto `CONTACT` al comienzo de `script.js`:

```js
const CONTACT = Object.freeze({
  whatsapp: '', // Tu número internacional real: solo dígitos, código de país incluido.
  email: '', // Tu dirección de correo real.
  message: '¡Hola! Me gustaría conversar sobre un proyecto con Tithomas Programming.'
});
```

1. Completá `whatsapp` sin `+`, espacios, guiones ni paréntesis. Usá el formato internacional admitido por WhatsApp para tu país; verificá que el número corresponda a tu cuenta.
2. Completá `email` con una dirección que controles.
3. Personalizá `message`, el texto inicial de WhatsApp. El script codifica el texto y crea los enlaces `wa.me` y `mailto`.
4. Probá ambos botones desde un teléfono y desde escritorio. El correo requiere un cliente de email configurado.

Los campos están vacíos deliberadamente: no se inventan datos de contacto. Hasta completar un canal válido, su botón se anuncia como deshabilitado y se informa qué falta configurar. Los datos son públicos en el navegador; no coloques contraseñas, claves de API ni secretos. La página no envía formularios, no almacena datos y no incluye un chatbot real.

## Personalizar contenido y diseño

- Cambiá textos y títulos en `index.html`; conservá un único `h1` y la jerarquía de encabezados.
- Modificá colores en las variables de `:root` de `style.css`.
- Actualizá `title`, `description` y metadatos Open Graph al cambiar la propuesta. Cuando conozcas la URL pública definitiva, podés agregar `canonical`, `og:url` y una imagen social propia con URL absoluta.
- Las ilustraciones se crean con HTML y CSS. Nexo y Forma son conceptos visuales ficticios, con datos simulados, claramente rotulados. No representan clientes, trabajos entregados, aplicaciones navegables ni tiendas operativas. No agregues resultados, testimonios ni clientes sin evidencia y autorización.
- Si reemplazás una maqueta por imágenes, agregá textos alternativos útiles y optimizá su tamaño.

## Publicar en GitHub Pages

1. Revisá el pull request y completá los contactos. Hacé merge manual cuando esté listo.
2. En GitHub, abrí **Settings → Pages** del repositorio.
3. En **Build and deployment**, seleccioná **Deploy from a branch**.
4. Elegí la rama `main` (o la rama aprobada) y la carpeta **/ (root)**; guardá.
5. Esperá el despliegue y abrí la URL que informe GitHub. La URL habitual para este repositorio es `https://tithomas-win7.github.io/tithomas-programming/`.

Crear el PR no publica la web ni habilita Pages automáticamente. No hace falta un dominio propio ni un archivo CNAME. Los enlaces internos y recursos funcionan bajo el subdirectorio del repositorio.

## Accesibilidad y revisión

Incluye enlace para saltar al contenido, regiones semánticas, navegación por teclado, foco visible, estado expandido del menú y cierre con Escape. Las ilustraciones decorativas se ocultan de la lectura asistida. Sin JavaScript se conserva el contenido y la navegación. `prefers-reduced-motion` desactiva las animaciones.

Antes de publicar, verificá:

- Navegación y ausencia de desbordes desde 320 px de ancho hasta escritorio, también con zoom al 200 %.
- Menú móvil con teclado, Escape y selección de una sección.
- Botones con contactos vacíos y con los datos reales configurados.
- Preferencia de movimiento reducido, lectura de encabezados y foco visible.
- Consola sin errores, recursos locales disponibles y enlaces internos válidos.

Comprobaciones básicas disponibles sin dependencias:

```sh
node --check script.js
git diff --check
```

## Actualización: introducción cinematográfica

Se conserva el sitio existente, sus secciones, textos, enlaces, servicios y configuración de contacto. Se suma una capa independiente de mejora progresiva:

- `components/intro/intro.js`: reproducción, estados, límites de espera, salida y limpieza.
- `components/intro/intro.css`: portada, partículas decorativas, título, transición y adaptación móvil.
- `public/images/intro-poster.svg`: portada abstracta local y ligera.
- `public/videos/README.md`: guion de las escenas, especificaciones y recurso pendiente.
- `index.html`: diálogo de introducción y carga de sus dos archivos locales.
- `style.css`: refinamientos de profundidad, hover y aparición al hacer scroll.

**Falta el video realista `public/videos/programmer-intro.mp4`.** No se incluye ni se simula una persona hiperrealista. Sin el archivo, un error de reproducción o un rechazo del autoplay se muestra una identidad visual abstracta con el título y partículas durante unos 2,4 segundos, y se entra automáticamente al sitio. La espera inicial se limita a 1,8 segundos. Mientras carga se ve la portada.

Con el MP4 disponible, la reproducción silenciosa usa `autoplay`, `muted` y `playsinline`. A partir del segundo 8 aparece el título HTML y al llegar al segundo 10 se inicia la salida. Un límite independiente cierra toda la introducción antes de 12,5 segundos, incluso si el video se queda cargando. Los videos cortos pasan al cierre de marca al terminar.

### Comportamiento y accesibilidad

- **Saltar introducción** y **Escape** permiten entrar inmediatamente; el foco vuelve al título principal o al elemento que estaba enfocado.
- El diálogo nativo mantiene el foco dentro de la introducción mientras está abierta. Al salir se restaura el scroll y se liberan el video, listeners y temporizadores.
- Con movimiento reducido, ahorro de datos informado por el navegador o conexión 2G informada, se omite la introducción y no se solicita el video.
- Se reproduce una vez por pestaña/sesión. Los enlaces directos con `#seccion` también la omiten. Si Safari restringe el almacenamiento, la web sigue funcionando.
- Sin JavaScript, si no carga el script o si el navegador no admite `<dialog>`, el sitio se muestra directamente.
- Cambiar de pestaña o abandonar la página cierra la introducción para no reproducirla en segundo plano.
- Para volver a probarla, abrí una pestaña nueva sin fragmento o ejecutá `sessionStorage.removeItem('tp-intro-seen-v1')` en la consola y recargá.

### Compilación y publicación de esta actualización

Este proyecto no tiene `package.json`, dependencias ni comando de compilación. Los archivos se sirven directamente; no hay un build que ejecutar. Validá la sintaxis con:

```sh
node --check script.js
node --check components/intro/intro.js
git diff --check
```

Agregá el MP4 real siguiendo `public/videos/README.md`. Conservá las rutas relativas: usar `/public/...` desde la raíz del dominio rompería el recurso en un sitio de proyecto de GitHub Pages.

Para actualizar un sitio ya publicado, revisá y fusioná manualmente los cambios hacia la **rama que ya utiliza Pages**, sin cambiar su configuración. Esperá que el despliegue de Pages termine correctamente en Actions y probá la URL pública en una sesión nueva. La web existente y esta actualización se revisan en el mismo PR #1. Su rama contiene el sitio completo; `main` aún conserva el commit inicial. No se hace merge ni publicación automática desde esta actualización.

La prueba automatizada de navegador no reemplaza la revisión del MP4 definitivo en Safari/iPhone físico: hasta aportar ese recurso no se puede validar su decodificación, encuadre o realismo.


### Validación realizada de la introducción

- Sintaxis de los dos scripts y `git diff --check` correctos.
- Chromium/Playwright: video ausente (404), carga sin respuesta, autoplay rechazado, salto y Escape durante la carga, restauración del foco y scroll, una reproducción por sesión.
- Acceso directo sin solicitar video con movimiento reducido, ahorro de datos, fragmento de URL y JavaScript desactivado.
- Reproducción de un MP4 sintético temporal de 10 segundos para comprobar los eventos del reproductor, título desde el segundo 8 y salida automática. Ese archivo no forma parte del sitio ni es el video cinematográfico pendiente.
- Sin desbordes horizontales en 320, 375, 768, 1024 y 1440 px; menú móvil operativo. Comparación del HTML de header, main y footer y del script de contactos con la versión anterior: conservados.
- WebKit/Safari no disponible en el entorno. Falta revisión en iPhone físico y con el archivo audiovisual definitivo.
