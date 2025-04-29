# GSE Frontend

Este proyecto es una aplicación web construida con [Next.js](https://nextjs.org), utilizando TypeScript, Material UI y fuentes optimizadas de Vercel ([Geist](https://vercel.com/font)). El objetivo de esta app es proporcionar una base sólida y moderna para el desarrollo de interfaces de usuario escalables y eficientes.

## Características

- ⚡️ **Next.js 13+** con estructura de carpetas `app/`
- 🎨 **Material UI** para componentes visuales y theming
- 🖋️ **Fuentes optimizadas** con [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- 🌐 **Internacionalización** lista para ser extendida
- 🛠️ **TypeScript** para mayor seguridad y productividad
- 🚀 Listo para despliegue en [Vercel](https://vercel.com)

## Primeros pasos

Instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install

Abre http://localhost:3000 en tu navegador para ver la aplicación.

Estructura del proyecto
src/app/ — Páginas y layout principal
src/components/ — Componentes reutilizables
src/utils/ — Funciones utilitarias
src/interfaces/ — Tipos y contratos TypeScript
src/theme.ts — Configuración de tema Material UI
public/ — Recursos estáticos (imágenes, íconos, etc.)
Personalización
Modifica el tema en src/theme.ts.
Cambia la fuente o agrega nuevas en src/app/layout.tsx.
Agrega tus páginas en src/app/.
Despliegue
El método recomendado es desplegar en Vercel.

Consulta la documentación de despliegue de Next.js para más opciones.

Recursos útiles
Documentación de Next.js
Material UI
Guía de fuentes Next.js