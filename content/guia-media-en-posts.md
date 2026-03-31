---
title: "Guía: cómo usar imágenes y video en posts"
date: 2026-03-10
description: "Ejemplos prácticos de cómo insertar imágenes, videos de YouTube, Vimeo y archivos locales en un post del blog."
featured: false
thumbnail: ../media/thumbnail-sistemas.png
status: draft
---

## Imágenes

Las imágenes usan la sintaxis estándar de Markdown. Solo coloca el archivo en la carpeta `media/` y referéncialo con una ruta relativa.

### Imagen básica

![Diagrama de sistemas](../media/thumbnail-sistemas.png)

### Imagen con texto alrededor

A veces necesitas una imagen para ilustrar un concepto. Aquí va un ejemplo dentro del flujo del texto:

![Ejemplo de imagen inline](../media/thumbnail-sistemas.png)

La imagen se renderiza con `loading="lazy"` automáticamente, así que no afecta la carga inicial de la página.

---

## Videos

Para videos, el blog usa la directiva especial `@video()`. Soporta tres fuentes:

### YouTube

Copia la URL normal del video y pásala a `@video()`:

@video(https://www.youtube.com/watch?v=dQw4w9WgXcQ)

También funciona con URLs cortas de YouTube:

@video(https://youtu.be/dQw4w9WgXcQ)

### Vimeo

Lo mismo con cualquier URL de Vimeo:

@video(https://vimeo.com/76979871)

### Video local

Si tienes un archivo `.mp4` o `.webm` en la carpeta `media/`, puedes incrustarlo directamente:

@video(../media/demo.mp4)

---

## Combinando todo

Un post puede mezclar texto, imágenes y videos sin problema. El parser los procesa en orden:

1. Escribe tu contenido en Markdown
2. Inserta imágenes con `![alt](ruta)`
3. Inserta videos con `@video(url)`
4. Corre `node build.js` y listo

> **Tip:** Usa nombres descriptivos en kebab-case para los archivos de media. Ejemplo: `diagrama-arquitectura.png`, `demo-feature.mp4`.

### Referencia rápida

```markdown
<!-- Imagen -->
![Texto alternativo](../media/mi-imagen.png)

<!-- YouTube -->
@video(https://www.youtube.com/watch?v=VIDEO_ID)

<!-- Vimeo -->
@video(https://vimeo.com/VIDEO_ID)

<!-- Video local -->
@video(../media/mi-video.mp4)
```

Eso es todo. Simple y sin dependencias extras.
