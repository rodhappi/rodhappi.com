---
title: "Guía completa de contenido: todos los recursos disponibles"
date: 2026-03-10
description: "Referencia práctica con ejemplos de todos los elementos que puedes usar en un post: texto, encabezados, listas, código, citas, imágenes, video y más."
featured: false
thumbnail: ../media/thumbnail-sistemas.png
status: draft
---

Esta guía muestra **todos** los recursos de contenido que soporta el blog. Cada sección incluye cómo se escribe en Markdown y cómo se ve renderizado.

---

## Encabezados

Usa `##` para secciones principales dentro de un post. El `#` (h1) está reservado para el título del post, así que empieza desde `##`.

## Esto es un h2

### Esto es un h3

#### Esto es un h4

##### Esto es un h5

###### Esto es un h6

Lo normal es usar `##` y `###`. Los niveles más profundos rara vez se necesitan.

---

## Párrafos

Cualquier línea de texto se convierte en un párrafo. Solo escribe normalmente y deja una línea en blanco entre párrafos.

Este es un segundo párrafo. Así se separan los bloques de texto: con una línea vacía entre ellos.

---

## Formato de texto inline

Dentro de un párrafo puedes usar varios formatos:

- Texto en *cursiva* se escribe con `*cursiva*`
- Texto en **negrita** se escribe con `**negrita**`
- Texto en ***negrita y cursiva*** se escribe con `***negrita y cursiva***`
- Código inline como `console.log()` se escribe con backticks: `` `console.log()` ``

Puedes combinarlos libremente: **esta frase tiene *cursiva* dentro de negrita** y también `código inline`.

---

## Enlaces

### Enlace externo

Los enlaces a sitios externos se abren en pestaña nueva automáticamente:

[Visita Anthropic](https://www.anthropic.com)

### Enlace interno

Los enlaces relativos se abren en la misma pestaña:

[Volver al inicio](../index.html)

### Enlace a un correo

También puedes usar mailto:

[Escríbeme](mailto:hola@ejemplo.com)

---

## Imágenes

Las imágenes se colocan en la carpeta `media/` y se referencian con ruta relativa. Se renderizan con `loading="lazy"` automáticamente.

![Diagrama de ejemplo](../media/thumbnail-sistemas.png)

Para buen SEO y accesibilidad, siempre incluye un texto alternativo descriptivo entre los corchetes.

---

## Listas

### Lista no ordenada

Puedes usar `-`, `*` o `+` como marcador:

- Primer elemento
- Segundo elemento
- Tercer elemento con **formato** y `código`

### Lista ordenada

Usa números seguidos de punto:

1. Definir el problema
2. Investigar soluciones
3. Implementar la más simple
4. Iterar según feedback

Las listas soportan formato inline dentro de cada elemento: *cursiva*, **negrita**, `código` y [enlaces](https://ejemplo.com).

---

## Citas (blockquotes)

Las citas se escriben con `>` al inicio de cada línea:

> La simplicidad es la máxima sofisticación.

Puedes incluir formato dentro de las citas:

> **Importante:** las citas pueden contener *cursiva*, **negrita**, `código` y cualquier otro formato inline.

Las citas también soportan múltiples líneas consecutivas:

> Esta es una cita que abarca
> varias líneas seguidas.
> Todas se agrupan en un solo bloque.

---

## Bloques de código

Para bloques de código, usa triple backtick. El contenido se escapa automáticamente (HTML seguro):

```javascript
function saludo(nombre) {
  return `Hola, ${nombre}!`;
}
console.log(saludo('mundo'));
```

Funciona con cualquier lenguaje:

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

```html
<div class="contenedor">
  <p>HTML dentro de un bloque de código</p>
</div>
```

```css
.post-card {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--color-border);
}
```

Y también bloques de texto plano sin lenguaje:

```
Esto es texto plano.
Sin resaltado de sintaxis.
Útil para logs o salida de terminal.
```

---

## Separadores horizontales

Tres guiones, asteriscos o guiones bajos crean una línea horizontal:

---

Útil para separar secciones temáticas dentro de un post.

---

## Video embebido

La directiva especial `@video()` soporta tres fuentes:

### YouTube

@video(https://www.youtube.com/watch?v=dQw4w9WgXcQ)

También acepta URLs cortas:

@video(https://youtu.be/dQw4w9WgXcQ)

### Vimeo

@video(https://vimeo.com/76979871)

### Video local

Archivos `.mp4` o `.webm` desde la carpeta `media/`:

@video(../media/demo.mp4)

---

## Frontmatter (metadatos del post)

Antes del contenido, cada post **debe** comenzar con un bloque de metadatos entre `---`. Esto le dice al blog cómo mostrar y organizar el post. Sin este bloque, el build usa valores por defecto basados en el nombre del archivo.

```yaml
---
title: "Construyendo en público"
date: 2026-02-20
description: "Por qué decidí documentar mi proceso de construcción de productos."
featured: true
thumbnail: ../media/mi-thumbnail.png
---
```

### Campos disponibles

### title

El título del post. Aparece como encabezado principal en la página del post y como texto en las cards del listado.

- **Obligatorio:** sí (si no lo pones, se genera uno a partir del nombre del archivo — `mi-post.md` se convierte en "Mi Post")
- **Formato:** texto entre comillas
- **Ejemplo:** `title: "Guía completa de contenido"`

### date

La fecha de publicación. Controla el **orden** en que aparecen los posts (más reciente primero) y determina en qué sección del homepage se muestra el post.

- **Obligatorio:** sí (si no lo pones o el formato es inválido, usa la fecha de modificación del archivo)
- **Formato:** `YYYY-MM-DD`
- **Ejemplo:** `date: 2026-03-10`

### description

Texto corto que describe el post. Se usa como meta description para SEO y como preview en listados.

- **Obligatorio:** no, pero recomendado para SEO
- **Formato:** texto entre comillas
- **Ejemplo:** `description: "Referencia de todos los elementos de contenido disponibles."`

### featured

Controla la **visibilidad destacada** del post en el homepage. El homepage tiene dos secciones:

- **Escritos** — posts del mes actual (sección principal, arriba)
- **Archivo** — todos los posts de meses anteriores (abajo)

La lógica es automática por fecha: si tu post tiene una fecha del mes actual, aparece en Escritos. Si es de un mes anterior, va al Archivo. El campo `featured` está disponible como marcador, pero la ubicación final depende de la fecha.

- **Obligatorio:** no (por defecto es `false`)
- **Valores:** `true` o `false`
- **Ejemplo:** `featured: true`

### status

Controla si el post se **publica o se oculta**. Un post en `draft` no se genera — no aparece en el sitio ni en el listado. Útil para trabajar en un post sin publicarlo.

- **Obligatorio:** no (por defecto es `published`)
- **Valores:** `draft` o `published`
- **Ejemplo:** `status: draft`

Cuando corres `node build.js`, los drafts se muestran en la terminal pero se excluyen del sitio:

```
  ⊘ mi-post-en-progreso.md (draft, skipped)
✓ 5 post(s) built successfully.
```

Para publicar un draft, simplemente cambia `status: draft` a `status: published` (o elimina la línea, ya que el default es publicado).

### thumbnail

Ruta a una imagen que se muestra como miniatura en la card del post en el listado del homepage.

- **Obligatorio:** no (sin thumbnail, la card muestra solo texto)
- **Formato:** ruta relativa desde la raíz del sitio o desde `media/`
- **Rutas válidas:** `../media/imagen.png`, `media/imagen.png`, `./media/imagen.png`, o URLs completas `https://...`
- **Ejemplo:** `thumbnail: ../media/thumbnail-sistemas.png`

### Ejemplo mínimo vs completo

Un post con lo mínimo:

```yaml
---
title: "Mi post"
date: 2026-03-10
---
```

Un draft (no se publica):

```yaml
---
title: "Post en progreso"
date: 2026-03-10
status: draft
---
```

Un post con todos los campos:

```yaml
---
title: "Mi post completo"
date: 2026-03-10
description: "Descripción detallada para SEO y previews del post."
featured: true
status: published
thumbnail: ../media/mi-thumbnail.png
---
```

---

## Combinando elementos

Lo más útil es combinar estos recursos. Un post típico podría verse así:

### El problema

Necesitábamos un sistema que procesara datos en tiempo real sin dependencias externas.

> No existe una solución perfecta, solo la que funciona para tu contexto.

### La solución

Implementamos un pipeline simple:

1. Leer los datos de entrada
2. Transformar con funciones puras
3. Escribir el resultado

El código clave:

```javascript
const resultado = datos
  .filter(d => d.activo)
  .map(transformar);
```

![Diagrama del pipeline](../media/thumbnail-sistemas.png)

El resultado fue un sistema con **cero dependencias** que procesa *miles de registros por segundo*.

---

## Referencia rápida

```markdown
## Encabezado
**negrita**  *cursiva*  ***ambas***  `código`
[enlace](url)
![imagen](ruta)
@video(url)
- lista no ordenada
1. lista ordenada
> cita
--- (separador)
```  (bloque de código)
```

Eso es todo lo que necesitas para escribir contenido en este blog.
