# CRM_AGENCIA_VIAJES

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/PORTAFOLIO APLICACIONES CRM Y ERP - 2026/APLICACIONES CRM Y ERP/CRM_AGENCIA_VIAJES

**PDF:** Manual_Viaje360.pdf

---

✈️

Viaje 360 CRM
Manual Técnico y Guía de Implementación
Sistema ERP para Agencia de Viajes · Versión 1.0 · 2026

⚙️ 1. Tecnología de Desarrollo
El sistema Viaje 360 CRM está desarrollado bajo una arquitectura moderna SPA (Single Page
Application) con separación completa entre cliente y servidor, garantizando escalabilidad,
seguridad y alto rendimiento.
🖥️ Frontend (Cliente)

🗄️ Backend (Servidor) y BD

React 19 — Librería principal de interfaz

Node.js 18+ — Entorno de ejecución

Vite 8 — Empaquetador ultrarrápido

Express.js — Framework API REST

React Router DOM 7 — Navegación SPA

Sequelize ORM — Mapeo objeto-relacional

Zustand — Gestión global de estado

MySQL 8+ — Base de datos relacional

Axios — Consumo de API REST

JWT (jsonwebtoken) — Autenticación por
tokens

Chart.js + react-chartjs-2 — Gráficas
dinámicas

bcryptjs — Cifrado de contraseñas

Lucide React — Iconografía moderna

Helmet + CORS — Seguridad HTTP

@dnd-kit — Drag & Drop (Pipeline Kanban)

Multer — Subida de archivos

React Hook Form — Formularios
optimizados

PDFKit — Generación de reportes PDF

CSS Nativo — Design system propio (Light
Premium)
Node.js 18+

React 19

MySQL 8

Sequelize ORM

Nodemon — Recarga automática en
desarrollo

JWT Auth

Vite 8

Chart.js

🧩 2. Funcionalidades del Sistema
El CRM cubre el ciclo completo de operación de una agencia de viajes: desde la captación del
cliente hasta el cierre de la venta y el análisis de resultados.

📊 Dashboard Ejecutivo

👥 Gestión de Clientes

de Ventas (Kanban)
📋 Pipeline
Tablero visual tipo drag & drop para mover

de Paquetes
📦 Catálogo
Administración de paquetes turísticos con

oportunidades entre etapas del embudo:
Nuevo → Cotizado → Negociación →
Ganado/Perdido.

destino, precio, costo neto, duración, cupo
máximo e imagen representativa.

KPIs en tiempo real: reservas del mes,
ingresos totales, margen de utilidad, pipeline
activo y actividades recientes del equipo.

Padrón completo con perfil 360°: historial de
reservas, LTV (valor de vida), pipeline activo,
interacciones y tareas pendientes por
cliente.

🗺️ Destinos y Países

🏨 Proveedores

🎫 Reservas

💰 Pagos y Cobranza

Catálogo de destinos turísticos vinculados a
países, con imagen y estado activo/inactivo
para control del inventario de rutas.

Directorio de proveedores (aerolíneas,
hoteles, transportistas) con tipo, contacto,
comisión y calificación de servicio.

Registro de reservas con paquete, cliente,
agente asignado, fechas de viaje, número de
pasajeros, costo neto y precio final.

Control de pagos por reserva: anticipos,
saldos pendientes, método de pago y estado
(pagado / pendiente / parcial).

✅ Tareas y Actividades

📣 Campañas de Marketing

📈 Reportes y Analíticas

⚙️ Configuración General

Gestión de tareas del equipo: asignación de
agente, fecha límite, prioridad y vinculación a
cliente u oportunidad.

Informes de ventas por mes, rendimiento por
agente, destinos más vendidos y exportación
de datos con visualizaciones interactivas.

Creación y seguimiento de campañas: tipo
(email, WhatsApp, redes), segmento
objetivo, métricas de apertura y conversión.

Datos de la empresa, gestión de usuarios y
roles (Administrador, Agente, Supervisor), y
parámetros del sistema.

💻 3. Instalación en Computadora Nueva
Programas a instalar previamente
1

Descargar e instalar Node.js
Ir a https://nodejs.org y descargar la versión LTS 18 o superior.
Instalar con todas las opciones por defecto (incluye npm automáticamente).
Verificar: abrir terminal y ejecutar node -v y npm -v

2

Instalar MySQL Server (o XAMPP)
Opción A: Descargar MySQL Community Server 8.0 desde https://dev.mysql.com/downloads/
Opción B (más fácil): Instalar XAMPP desde https://www.apachefriends.org — incluye MySQL y
phpMyAdmin.
Anotar el usuario ( root ) y la contraseña que se configure durante la instalación.

3

Crear la base de datos e importar datos
Abrir phpMyAdmin (http://localhost/phpmyadmin) o MySQL Workbench.
Crear una base de datos nueva llamada viaje360 .
Importar el archivo bk_basededatos.sql que se encuentra en la raíz del proyecto.
Importar también seed.sql para cargar datos de ejemplo (opcional pero recomendado).

4

Configurar y arrancar el Backend (API)

Abrir una terminal y entrar a la carpeta: cd crm-viaje360/backend
Instalar dependencias: npm install
Editar el archivo .env con los datos de conexión MySQL:
DB_HOST=localhost
DB_PORT=3306
DB_NAME=viaje360
DB_USER=root
DB_PASS=tu_contraseña
JWT_SECRET=una_clave_secreta_larga
PORT=3001

Iniciar el servidor: npm run dev (se ejecuta en http://localhost:3001)

5

Configurar y arrancar el Frontend (React)
Abrir otra terminal y entrar a: cd crm-viaje360/frontend
Instalar dependencias: npm install
Iniciar la interfaz: npm run dev
El sistema se abrirá en el navegador en http://localhost:5173
Credenciales por defecto: usuario admin@viaje360.com / contraseña Viaje360@

💡 Tip: Mantén las dos terminales abiertas simultáneamente: una con el backend corriendo y otra con
el frontend. Ambas deben estar activas para que el sistema funcione.

☁️ 4. Hosting Web Recomendado
Para una aplicación que combina Node.js + React + MySQL, estas son las mejores opciones
ordenadas por conveniencia:

⭐ Opción 1 — Hostinger Business (Recomendado)
Precio: ~$3–6 USD/mes (plan Business o Cloud)
¿Por qué? Incluye gestor de Node.js en el panel hPanel, MySQL incluido, phpMyAdmin y SSL
gratuito.
Ideal para: Agencias pequeñas a medianas, hasta ~50 usuarios concurrentes.
Dominio: Se puede incluir gratis el primer año.

🥈 Opción 2 — Hostinger VPS (Mayor control)

Precio: ~$8–15 USD/mes
¿Por qué? Servidor Linux dedicado con acceso root total. Ideal si se espera crecimiento o alto
tráfico.
Instalar: Node.js, MySQL y Nginx/Apache con PM2 para mantener el servidor activo.

🥉 Alternativas válidas
Railway.app — Despliegue automático desde GitHub, muy fácil, tiene tier gratuito.
Render.com — Similar a Railway, soporte nativo Node.js + bases de datos.
DigitalOcean (Droplet $6) — VPS con 1-click Node.js, ideal para mayor control.

🚀 5. Paso a Paso: Subir a Hostinger
1

Crear la base de datos en Hostinger
Ingresar al panel hPanel de Hostinger.
Ir a Bases de datos MySQL → Crear nueva base de datos, usuario y contraseña.
Ir a phpMyAdmin → seleccionar la BD creada → Importar el archivo bk_basededatos.sql .

2

Configurar la aplicación Node.js (Backend)
En hPanel ir a Avanzado → Node.js → Crear nueva aplicación.
Seleccionar versión Node.js 18+, configurar la ruta de la app (ej. /api ) y el archivo de entrada
src/app.js .
En el Administrador de Archivos, subir todo el contenido de la carpeta backend a la ruta de la
app (sin incluir node_modules ).
Editar el archivo .env en el servidor con los datos de conexión de producción (host, usuario,
contraseña y nombre de BD de Hostinger).
Volver al gestor de Node.js → clic en Run NPM Install → luego Restart.

3

Compilar y subir el Frontend (React)
En el código local del frontend, localizar donde se configura la URL base de Axios (generalmente
en src/services/api.js o similar).
Cambiar http://localhost:3001 por la URL de tu backend en producción (ej.
https://tudominio.com/api ).
En tu terminal local ejecutar: npm run build dentro de la carpeta frontend .
Se genera la carpeta dist/ . Comprimir su contenido en un ZIP.

En el Administrador de Archivos de Hostinger, ir a public_html y subir el ZIP. Extraer ahí los
archivos.

4

Crear archivo .htaccess para React Router
En la carpeta public_html de Hostinger, crear un archivo llamado .htaccess con el siguiente
contenido:
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]

Esto es indispensable para que las rutas de React (como /clientes o /pipeline ) funcionen
al recargar la página.

5

Activar SSL y verificar
En hPanel ir a SSL → activar el certificado gratuito de Let's Encrypt para tu dominio.
Acceder desde el navegador a tu dominio y verificar el login del sistema.
Si hay error de conexión con la
