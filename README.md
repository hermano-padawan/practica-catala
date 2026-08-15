# Practica Català

Web de ejercicios interactivos para practicar catalán de forma directa: responder, corregir al instante y entender el error con una explicación breve.

## Estado actual

El primer MVP incluye:

- portada adaptable a móvil y ordenador;
- navegación por niveles B2, C1 y C2;
- categorías de ejercicios de gramática, ortografía y vocabulario;
- una tanda funcional de cinco preguntas de nivel C1;
- corrección inmediata, explicación y resultado final;
- posibilidad de repetir la tanda.

Los bloques que todavía no tienen ejercicios aparecen como **En preparació** para no prometer contenido inexistente.

## Ejecutarlo en local

Requisitos: Node.js 22.13 o posterior.

```bash
npm install
npm run dev
```

Después, abre la dirección que muestre la terminal.

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción
npm test         # validaciones del proyecto
```

## Tecnología

- React y TypeScript
- Vinext/Vite
- CSS propio, sin librería visual externa

## Próximos pasos

1. Ampliar el banco de preguntas y separarlo del componente visual.
2. Añadir más tandas por nivel y tema.
3. Guardar el progreso en el navegador.
4. Crear páginas indexables para cada tipo de ejercicio.
