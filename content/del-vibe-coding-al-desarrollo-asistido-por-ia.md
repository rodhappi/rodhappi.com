---
title: "Del vibe coding al desarrollo asistido por IA: la arquitectura de 7 capas"
date: 2026-04-02
description: "Los asistentes de IA para código son potentes pero sin estado. Sin arquitectura, cada sesión empieza de cero. Así se construye un sistema que mejora con el tiempo."
featured: false
status: draft
---

## El problema con el vibe coding

Tu equipo entregó tres features la semana pasada usando asistentes de IA. Celebración. Pero luego alguien revisa el código y encuentra tres patrones distintos de autenticación. Tests faltantes en dos de las tres. Y una vulnerabilidad de seguridad que la IA introdujo el martes — y volvió a introducir el jueves, porque no recordó haberla corregido antes.

Esto es *vibe coding* a escala: abrir un chat con la IA, describir lo que quieres, aceptar lo que funciona, iterar hasta que pase. Funciona sorprendentemente bien para tareas aisladas. Pero cuando un equipo completo lo hace durante semanas, el resultado es un codebase que crece sin coherencia.

El problema no es la IA. Las herramientas son extraordinariamente capaces. El problema es que son **sin estado**. Cada sesión empieza de cero. No recuerdan las decisiones de ayer. No saben que existe una convención para manejar errores. No aprenden de los bugs que ya resolvieron.

> Vibe coding es como tener un desarrollador brillante con amnesia. Cada mañana, hay que explicarle todo de nuevo.

Para tareas puntuales, esto es tolerable. Para construir software serio, necesitas algo más.

## La IA necesita infraestructura, no solo prompts

Pensemos en una analogía. Nadie despliega una base de datos en producción sin connection pooling, backups, monitoreo y control de acceso. Nadie pone un servidor web sin balanceo de carga ni logs. Tratamos cada componente de infraestructura como un sistema que necesita configuración, gobernanza y observabilidad.

Pero con los asistentes de IA para código, el enfoque dominante sigue siendo: abre el chat y escribe un prompt.

Las restricciones son reales. Una sola integración con la API de GitHub consume aproximadamente 26,000 tokens — entre el 13% y el 26% de la ventana de contexto — antes de que el usuario escriba una palabra. El contexto es el recurso más escaso en el desarrollo asistido por IA, y la mayoría de los equipos lo desperdician sin saberlo.

La consecuencia es predecible: sin arquitectura, la sesión número 100 no es mejor que la sesión número 1. Cada interacción es igualmente ingenua. Los mismos errores se repiten. El mismo conocimiento se redescubre. El mismo contexto se reconstruye.

> La pregunta no es si la IA es útil. La pregunta es si tu equipo está capturando valor acumulativo — o empezando de cero cada vez.

## La arquitectura de 7 capas

Después de meses construyendo y refinando flujos de desarrollo con IA, llegué a una conclusión: lo que necesitamos no es un mejor prompt. Es una **arquitectura de infraestructura** para el desarrollo asistido por IA.

La llamé la Arquitectura de 7 Capas. La analogía más cercana es el modelo OSI de redes: cada capa tiene una responsabilidad específica, y todas operan simultáneamente.

| Capa | Nombre | Responsabilidad |
|------|--------|-----------------|
| L1 | **Contexto** | Gestionar qué sabe la IA en cada momento |
| L2 | **Orquestación** | Coordinar múltiples agentes y tareas |
| L3 | **Memoria** | Persistir estado entre sesiones |
| L4 | **Ejecución** | Definir flujos de trabajo y quality gates |
| L5 | **Integración** | Conectar con herramientas externas |
| L6 | **Compounding** | Aprender del trabajo y mejorar con el tiempo |
| L7 | **Medición** | Medir efectividad y habilitar optimización |

El principio más importante: **estas son capas de infraestructura paralelas, no pasos secuenciales**. Mientras ejecutas código (L4), estás gestionando contexto (L1). Mientras orquestas agentes (L2), estás persistiendo memoria (L3). Mientras mides (L7), estás capturando aprendizajes (L6).

No es un flujo lineal. Es un sistema.

El framework es agnóstico de herramienta — funciona con Claude Code, Codex CLI, Gemini CLI, Qwen CLI u Ollama. Los principios son los mismos; lo que cambia es cómo se implementan.

```
┌──────────────────────────────────────────────────────────────┐
│                  ARQUITECTURA DE 7 CAPAS                      │
│                                                               │
│   Todas las capas operan SIMULTÁNEAMENTE como                │
│   infraestructura, no secuencialmente.                       │
│                                                               │
│   L7: MEDICIÓN        Métricas, evaluación, optimización     │
│   L6: COMPOUNDING     Aprender, capturar patrones, mejorar   │
│   L5: INTEGRACIÓN     Git, navegadores, bases de datos, APIs │
│   L4: EJECUCIÓN       Flujos, quality gates, gobernanza      │
│   L3: MEMORIA         Estado, checkpoints, continuidad       │
│   L2: ORQUESTACIÓN    Agentes paralelos, síntesis            │
│   L1: CONTEXTO        Presupuesto de tokens, conocimiento    │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## Los cimientos: contexto y memoria (L1, L3)

El contexto es el recurso más escaso y menos gestionado del desarrollo con IA. Las ventanas de contexto son finitas — 100K a 200K tokens — y se llenan rápido cuando compiten las definiciones de herramientas, las reglas del proyecto, el historial de conversación y el código fuente.

La capa de contexto introduce presupuestos de tokens con umbrales de acción: advertencia al 75%, guardado de estado al 85%. Pero más importante, introduce una **arquitectura de conocimiento de dos niveles**:

- **Nivel 1: Expertise pre-construido.** Skills de dominio que se cargan bajo demanda — 500 a 2,000 tokens cada uno, reutilizables. Patrones de React, convenciones de testing, prácticas de seguridad. Se cargan una vez y sirven para siempre.
- **Nivel 2: Búsqueda web.** Bajo demanda, 5,000 a 15,000 tokens por consulta, resultados efímeros. Solo cuando el Nivel 1 no tiene la respuesta.

La diferencia de eficiencia es de 3x a 10x. Construir expertise para tu stack tecnológico es como cachear las consultas más frecuentes a tu base de datos.

La capa de memoria (L3) resuelve el otro problema fundamental: la amnesia entre sesiones. Define dos tipos de persistencia:

- **Memoria de sesión:** local, temporal, para continuidad dentro del trabajo de un desarrollador. Checkpoints nombrados para rollback. Se pierde al cerrar.
- **Conocimiento de proyecto:** committed en git, permanente, compartido con todo el equipo. Patrones, decisiones, soluciones a problemas recurrentes.

Para líderes de ingeniería, esto es gestión de recursos y caching estratégico — conceptos que ya entienden.

## El motor: orquestación y ejecución (L2, L4)

Las tareas complejas exceden la capacidad de un solo agente. La capa de orquestación define tres patrones de coordinación:

- **Fan-out:** agentes paralelos e independientes. Una revisión de código lanza simultáneamente agentes de seguridad, rendimiento, accesibilidad, cumplimiento constitucional y cumplimiento de spec. Cada uno especializado, cada uno con contexto enfocado.
- **Pipeline:** pasos secuenciales donde cada fase depende de la anterior. Especificar → Planificar → Implementar → Revisar.
- **Refinamiento iterativo:** ciclos de producción y validación hasta alcanzar la calidad requerida.

La capa de ejecución (L4) es donde vive la gobernanza real. Define flujos completos con quality gates que no se pueden saltar:

```
Especificar → Clarificar → Planificar → [Aprobación humana] → Implementar → Revisar → Capturar
```

Cada transición tiene una condición:

| Transición | Gate |
|------------|------|
| Spec → Plan | Sin marcadores de ambigüedad pendientes |
| Plan → Trabajo | Artículos constitucionales satisfechos |
| Trabajo → Revisión | Todos los tests pasando |
| Revisión → Completo | Sin hallazgos P1 (críticos) |

Los hallazgos P1 — vulnerabilidades de seguridad, violaciones de spec, fallos de accesibilidad — bloquean el progreso. No hay workaround. Esto no es un linter que puedes ignorar con un `// eslint-disable`. Es gobernanza estructural.

La trazabilidad fluye desde la especificación hasta el código: cada cambio referencia un plan, cada plan referencia una spec, cada spec tiene criterios de aceptación verificables.

## Gobernanza constitucional: principios con dientes

Cortar código rápido con IA es fácil. Mantener estándares mientras lo haces es el desafío real.

El framework introduce el concepto de **constitución de proyecto**: artículos inmutables que definen cómo se desarrolla software en tu entorno. No son guías aspiracionales — son principios verificados por máquina en cada quality gate.

Ejemplos de artículos constitucionales:

- **Spec-First:** No hay implementación sin especificación aprobada.
- **Test-First:** Los tests se escriben antes del código de producción.
- **Simplicidad:** No hay abstracción prematura. La solución más simple que funcione.
- **Seguridad:** Cumplimiento OWASP verificado en cada revisión.

La diferencia con linting es fundamental. Los linters verifican *sintaxis* — ¿faltan punto y coma? ¿Hay variables no usadas? La gobernanza constitucional verifica *intención* — ¿escribiste una spec antes de codificar? ¿Escribiste tests antes de la implementación? ¿Es esta la solución más simple?

```
┌──────────┐  Gate  ┌──────────┐  Gate  ┌──────────┐  Gate  ┌──────────┐
│ESPECIFICAR│──────►│PLANIFICAR│──────►│IMPLEMENTAR│──────►│ REVISAR  │
│           │       │          │       │           │       │          │
│  Qué/Por  │       │   Cómo   │       │  Ejecutar │       │ Validar  │
│   qué     │       │          │       │           │       │          │
└──────────┘       └──────────┘       └──────────┘       └──────────┘
     │                   │                  │                  │
     ▼                   ▼                  ▼                  ▼
  spec.md           plan.md            código +          sin hallazgos
                    tasks.md            tests              P1
```

El proceso de enmienda existe — la tecnología cambia, el equipo aprende. Pero requiere consenso explícito y versionado. No se cambian los principios en silencio.

## El efecto compuesto: por qué esto mejora con el tiempo

Aquí es donde el framework se separa fundamentalmente del vibe coding.

La capa 6 (Compounding) implementa un loop de aprendizaje formal:

```
Trabajar → Reflexionar → Extraer → Almacenar → Recuperar → Trabajar (mejor)

     ┌──────────┐                              ┌──────────┐
     │ Trabajar │                              │ Recuperar│
     │          │                              │conocimiento
     └────┬─────┘                              └─────▲────┘
          │                                          │
          ▼                                          │
     ┌──────────┐     ┌──────────┐     ┌────────────┴┐
     │Reflexionar│───►│ Extraer  │───►│  Almacenar   │
     │          │     │ patrón   │     │ en knowledge │
     └──────────┘     └──────────┘     └──────────────┘
```

Al final de cada flujo de trabajo, el comando `/compound` analiza la sesión, extrae patrones, correcciones y decisiones, y los almacena en una base de conocimiento estructurada y buscable. No es housekeeping opcional — es el mecanismo que hace que la sesión 100 sea fundamentalmente mejor que la sesión 1.

Dos loops auto-reforzantes emergen:

**Loop 1: Investigación → Conocimiento → Investigación.** Un agente de investigación descubre un patrón. `/compound` lo captura. Semanas después, otro agente de investigación lo encuentra automáticamente. La investigación se vuelve más eficiente con el tiempo.

**Loop 2: Error → Reflexión → Prevención.** Un desarrollador dedica una hora a debuggear un problema de CORS. `/compound` captura la solución — el error exacto, el enfoque incorrecto, la solución correcta, y cómo prevenirlo. Dos semanas después, otro desarrollador enfrenta el mismo problema. El agente de búsqueda de conocimiento lo encuentra durante la fase de investigación. Tiempo de resolución: minutos en lugar de una hora.

Las métricas lo hacen visible. La capa 7 (Medición) define 24 métricas en 5 categorías — contexto, calidad, compounding, eficiencia y colaboración humano-IA. Dos métricas importan especialmente:

- **Tasa de reutilización de conocimiento:** ¿con qué frecuencia se usa el conocimiento capturado? Objetivo: >50%.
- **Recurrencia de errores documentados:** ¿se repiten problemas que ya resolvimos? Objetivo: 0%.

Honestamente, no todas las métricas son fáciles de recolectar. El framework etiqueta cada una con su nivel de fidelidad: *disponible* (se puede calcular de artefactos existentes), *estimable* (requiere aproximación) o *no disponible* (requiere instrumentación adicional). Sin números inventados.

## Primeros pasos

No necesitas las 7 capas desde el día uno. El camino pragmático:

1. **Empieza con L1 (Contexto) y L4 (Ejecución).** Un archivo de contexto bien diseñado y un flujo de trabajo definido con quality gates entregan valor inmediato. La diferencia entre "abre el chat y escribe" y un flujo estructurado es visible desde la primera semana.

2. **Añade L3 (Memoria) y L6 (Compounding)** cuando los flujos estén establecidos. Estas capas son las que crean la diferenciación a largo plazo — el conocimiento que se acumula y el sistema que mejora solo.

3. **L2 (Orquestación) y L7 (Medición)** se añaden conforme el sistema madura. Múltiples agentes y métricas formales son poderosos pero no urgentes al inicio.

4. **L5 (Integración)** es deliberadamente específica por proyecto. Cada equipo conecta las herramientas que necesita.

El framework completo es open source y está disponible en [GitHub](https://github.com/rodhappi/ai-assisted-development-framework). La implementación de referencia es para Claude Code, pero incluye guías para Codex CLI, Gemini CLI, Qwen CLI y Ollama.

---

La pregunta no es si tu equipo usará asistentes de IA para código. Ya los está usando. La pregunta es si la sesión 100 será significativamente mejor que la sesión 1. Eso requiere arquitectura, no solo vibes.
