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
