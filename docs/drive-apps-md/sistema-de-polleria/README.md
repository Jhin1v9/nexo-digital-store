# SISTEMA DE POLLERIA

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/App web portafolio/PORTAFOLIO 2 WEBS/JAVASCRIPT - PORTAFOLIO APLICACIONES WEBS 2026/SISTEMA DE POLLERIA

**PDF:** Documentacion_Sistema_Polleria.pdf

---

Documentación Técnica y de Usuario: Sistema de
Pollería MERN
1. Tecnología de Desarrollo (Stack Tecnológico)
El sistema ha sido desarrollado utilizando el stack MERN (con una adaptación en la base de datos). Las tecnologías
principales son:

Frontend (Interfaz de Usuario)
React 18: Librería principal para la construcción de interfaces de usuario interactivas.
Vite: Herramienta de construcción rápida y empaquetador para proyectos web modernos.
Zustand: Gestor de estado ligero y rápido para React.
React Router DOM v6: Enrutamiento para navegación SPA (Single Page Application).
Axios: Cliente HTTP para la comunicación con la API del backend.
Chart.js & React-Chartjs-2: Librerías para renderizar gráficos interactivos en el Dashboard.
Lucide React: Colección de iconos modernos y consistentes.

Backend (Servidor y API)
Node.js: Entorno de ejecución para JavaScript en el servidor.
Express.js: Framework minimalista para crear la API REST.
Sequelize ORM: Mapeador objeto-relacional para interactuar con la base de datos de manera segura y
eficiente.
JSON Web Tokens (JWT) & bcryptjs: Implementación de seguridad, encriptación de contraseñas y
autenticación de usuarios.
Multer: Middleware para la gestión y subida de archivos (imágenes de productos).
ExcelJS & PDFKit: Herramientas para la generación de reportes exportables a Excel y PDF.
Node Thermal Printer: Integración nativa para la impresión automática de tickets o comprobantes en
impresoras térmicas.
Nodemailer: Módulo para el envío automático de correos electrónicos.

Base de Datos
MySQL: Motor de base de datos relacional (a través del paquete mysql2 ), ideal para la integridad
transaccional de ventas e inventario.

2. Funcionalidades del Sistema
El sistema está compuesto por módulos interconectados para administrar eficientemente el negocio:
1. Dashboard (Panel de Control): Muestra gráficos y estadísticas en tiempo real (KPIs) sobre ingresos, ventas
del día, productos más vendidos y estado general del negocio.
2. Punto de Venta (POS): Pantalla optimizada para que los cajeros o meseros registren pedidos rápidamente.
Permite seleccionar productos, aplicar descuentos, relacionar a un cliente y generar la venta al instante.
3. Gestión de Cajas: Permite la apertura y cierre de caja, registro manual de ingresos extras y egresos diarios.
Mantiene un flujo de caja controlado y auditado.
4. Clientes y CRM: Registro de clientes frecuentes, visualización de su perfil, historial de compras y estrategias
de fidelización para mejorar la relación comercial.
5. Catálogo y Productos: Administración del menú o catálogo de venta. Creación, edición y eliminación de
productos y sus respectivas categorías. Permite subir imágenes.

6. Gestión de Pedidos: Pantalla tipo KDS (Kitchen Display System) para ver el estado de los pedidos en tiempo
real (En cola, Preparando, Entregado).
7. Inventario y Compras: Control exacto del stock de productos o ingredientes. Registro de compras a
proveedores para reabastecimiento automático del inventario.
8. Proveedores: Directorio de proveedores para facilitar la compra de inventario.
9. Promociones: Módulo para aplicar descuentos estratégicos a ciertos productos o categorías por tiempo
limitado.
10. Reportes: Generación de informes financieros, ventas por fechas y reportes de inventario exportables a
múltiples formatos.
11. Usuarios y Control de Acceso (Logs): Creación de nuevos usuarios (cajeros, administradores) y registro
(logs) de todas las acciones sensibles dentro del sistema por motivos de seguridad auditoría.
12. Configuración: Ajustes globales del sistema como datos de la empresa, moneda local, tasas de impuestos y
logos.

3. Instalación y Configuración (Entorno Local)
Para ejecutar esta aplicación en un computador nuevo, se deben seguir los siguientes pasos:

Requisitos Previos:
1. Instalar Node.js (versión 18 o superior). Descargar desde nodejs.org.
2. Instalar un servidor local de base de datos MySQL (Recomendado: XAMPP o Laragon). Iniciar el servicio de
MySQL.

Instalación Rápida Automática:
La aplicación cuenta con scripts amigables en su carpeta raíz c:/Webs/Javascript/sistema-polleria/ para
instalarse en 3 simples clics:
1. Paso 1: Hacer doble clic en 1_Instalar_Dependencias.bat . Esto descargará todos los módulos
necesarios tanto para el Frontend como Backend.
2. Paso 2: Hacer doble clic en 2_Configurar_Base_Datos.bat . Esto creará la base de datos polleria_db
de forma automática e importará todas las tablas necesarias utilizando el archivo SQL adjunto.
3. Paso 3: Hacer doble clic en 3_Iniciar_Sistema.bat . Esto arrancará el servidor Node en segundo plano y
el cliente React en el navegador.

Ejecución de forma Manual por CMD:
Si deseas ejecutar la aplicación de forma manual mediante la línea de comandos (cmd):
1. Iniciar el Servidor (Backend): Abre un cmd, navega a la carpeta raiz del proyecto y ejecuta: cd server
npm install (solo la primera vez) npm run start o npm run dev (El servidor correrá en el puerto

donde se haya configurado, comúnmente 3000 o 3001)
2. Iniciar la Interfaz (Frontend): Abre otro cmd paralelo, navega a la carpeta raiz y ejecuta: cd client
install (solo la primera vez) npm run dev (Esto mostrará una URL local, comúnmente

http://localhost:5173, ábrela en tu navegador Chrome u otro de preferencia).

4. Credenciales de Acceso Administrador
Una vez cargada la pantalla de acceso o Login, utiliza las siguientes credenciales administrativas seguras:
Correo Electrónico (Usuario): admin@polleria.com

npm

Contraseña: admin
(Nota: Se recomienda encarecidamente cambiar la contraseña y revisar el archivo "server/src/config/db.js" si se utilizan
configuraciones diferentes de MySQL o en despliegue de Producción)

5. Recomendación de Hosting y Despliegue en Producción
Para una aplicación robusta como un sistema de punto de venta (que involucra posibles impresiones de tickets
locales y consultas SQL rápidas), recomendamos una arquitectura VPS (Virtual Private Server).
Mejor Sugerencia de Hosting: Hostinger VPS o DigitalOcean (Droplet de Ubuntu 22.04 / 24.04).
Razón: Otorga control completo del sistema operativo. Permite instalar Node.js, MySQL y configurar PM2
(Process Manager) y Nginx como proxy reverso, asegurando un uptime del 99.9%.

Guía Paso a Paso para Despliegue (VPS - Ubuntu)
Paso 1: Preparación del Servidor
1. Adquiere el VPS en Hostinger/DigitalOcean y accede vía SSH ( ssh root@tu_ip_del_servidor ).
2. Actualiza los paquetes: sudo apt update && sudo apt upgrade -y .
3. Instala Node.js y npm ( curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&
sudo apt-get install -y nodejs ).

Paso 2: Instalación de la Base de Datos
1. Instala MySQL: sudo apt install mysql-server -y .
2. Configura una nueva base de datos y usuario:
CREATE DATABASE polleria_db;
CREATE USER 'polleria_user'@'localhost' IDENTIFIED BY 'tu_clave_segura';
GRANT ALL PRIVILEGES ON polleria_db.* TO 'polleria_user'@'localhost';
FLUSH PRIVILEGES;

3. Importa el archivo bk_basededatos.sql o polleria_db.sql usando: mysql -u polleria_user -p
polleria_db < polleria_db.sql .

Paso 3: Desplegar el Backend (API)
1. Sube los archivos al servidor (usando FTP como FileZilla o clonado desde Git). Ubícalos en
/var/www/sistema-polleria/server .

2. Instala dependencias: cd /var/www/sistema-polleria/server && npm install .
3. Configura las credenciales en el archivo .env o en src/config/db.js conectando a polleria_user .
4. Instala PM2 globalmente: sudo npm install -g pm2 .
5. Ejecuta el backend de forma perpetua: pm2 start src/app.js --name "api-polleria" .
Paso 4: Compilar y Desplegar el Frontend
1. En tu máquina local, navega a client/ y edita la ruta URL base de Axios para que apunte a la IP de tu
servidor o tu dominio web.
2. Construye la versión de producción: npm run build .
3. Sube el contenido de la carpeta generada dist/ a tu servidor VPS, en una ruta como
/var/www/sistema-polleria/client/dist .

Paso 5: Configurar Nginx (Proxy Reverso)

1. Instala Nginx: sudo apt install nginx -y .
2. Cr
