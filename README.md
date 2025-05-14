# 💼 Intellice CV | Aplicación Web para Generar Currículums

![Vista previa de Intellice CV](public/assets/images/home-page-preview.png)

Este proyecto es una aplicación web diseñada para ayudar a los usuarios a crear y gestionar su **Currículum Vitae (CV)** de manera rápida, utilizando **Inteligencia Artificial (IA)** para facilitar la redacción del CV. La aplicación aprovecha la API de **ChatGPT** para generar el contenido y proporciona una experiencia interactiva utilizando **React**, **Tailwind CSS**, y **TypeScript**.

## 🛠️ Tecnologías utilizadas

- **Frontend**: 
  - **React**: Librería para la construcción de interfaces de usuario.
  - **Tailwind CSS**: Framework de CSS para crear diseños rápidos y responsivos.
  - **Zustand**: Librería para el manejo del estado de la aplicación.
  - **Zod**: Herramienta para la validación de datos en el frontend y backend.
  - **TypeScript**: Lenguaje de programación que mejora la seguridad y escalabilidad del código.

- **Backend**:
  - **Node.js** con **TypeScript**: Plataforma para el backend de la aplicación.
  - **PostgreSQL**: Base de datos para almacenar los CVs creados.
  - **ChatGPT API**: Utilizada para generar el contenido del CV a partir de las respuestas del usuario.

---

## 📝 Descripción de la aplicación

La aplicación permite a los usuarios crear un CV interactivo con la ayuda de **ChatGPT** para generar textos personalizados. El sistema utiliza las respuestas de los usuarios sobre su experiencia, habilidades y educación para construir un CV atractivo y profesional.

### 🧠 Características principales

- **Generación automática del CV**: Gracias a la integración con la API de **ChatGPT**, la aplicación puede generar contenido profesional de calidad basado en las respuestas del usuario.
- **Edición y personalización**: El usuario puede editar el contenido generado, agregar más detalles o modificar el formato.
- **Almacenamiento en base de datos**: Los CVs creados se guardan en una base de datos **PostgreSQL** para que los usuarios puedan acceder a ellos en el futuro o hacer modificaciones.
- **Interfaz fácil de usar**: Con **React** y **Tailwind CSS**, la aplicación ofrece una interfaz limpia y moderna, optimizada para dispositivos móviles y de escritorio.
- **Autenticación de usuarios**: Los usuarios pueden crear una cuenta para almacenar y gestionar varios CVs en su perfil.

---

## 🖥️ ¿Cómo correr el proyecto en tu máquina?
```bash
git clone https://enriqueSFranco/intellice-cv.git
cd frontend
pnpm install

cd backend
npm install

cd frontend
npm run dev

cd backend
npm run start
```

📊 Estructura de la base de datos
