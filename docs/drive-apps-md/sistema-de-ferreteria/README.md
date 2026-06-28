# SISTEMA DE FERRETERIA

**Fonte:** drive-download-20260628T170401Z-3-003.zip > Apps-Webs - 2026/App web portafolio/PORTAFOLIO 2 WEBS/JAVASCRIPT - PORTAFOLIO APLICACIONES WEBS 2026/SISTEMA DE FERRETERIA

**PDF:** Documentacion_Sistema_Ferreteria.pdf

---

F

Sistema de Gestion
para Ferreteria
Punto de Venta - Inventario - Reportes

Manual tecnico, instalacion y despliegue web

React + Vite - Node.js + Express - MySQL

Documento generado en Junio 2026

SISTEMA DE GESTION PARA FERRETERIA

Documentacion tecnica

1. Tecnologia del sistema
El sistema es una aplicacion web full-stack con arquitectura cliente-servidor. El frontend (interfaz que
ve el usuario) y el backend (logica y base de datos) son proyectos separados que se comunican
mediante una API REST en formato JSON.

Frontend - Cliente (carpeta client)
Componente

Tecnologia

Libreria de interfaz

React 18

Empaquetador / servidor dev

Vite 5

Ruteo de paginas

React Router DOM 6

Estado global

Zustand

Peticiones HTTP

Axios

Graficas del dashboard

Chart.js + react-chartjs-2

Iconos / notificaciones

Lucide React - react-hot-toast

Backend - Servidor (carpeta server)
Componente

Tecnologia

Entorno de ejecucion

Node.js (probado en v22)

Framework web / API

Express 4

ORM (acceso a datos)

Sequelize 6

Base de datos

MySQL (driver mysql2)

Autenticacion

JWT (jsonwebtoken) + bcryptjs

Subida de archivos

Multer

Exportacion de reportes

ExcelJS (Excel) - PDFKit (PDF)

Validacion de datos

express-validator

Variables de entorno

dotenv

Puertos por defecto: el backend corre en localhost:3002 (configurable en server/.env) y el frontend de desarrollo en
localhost:5173. El token de sesion JWT expira en 8 horas.

Generado: Junio 2026

Pagina 2

SISTEMA DE GESTION PARA FERRETERIA

Documentacion tecnica

2. Funcionalidades del sistema
El sistema cuenta con 19 modulos que cubren la operacion completa de una ferreteria, desde la venta
en mostrador hasta la contabilidad de cuentas y los reportes gerenciales.
Modulo
Punto de Venta (POS)

Descripcion
Venta rapida en mostrador con busqueda de productos, carrito, cobro e
impresion de ticket.

Ventas

Registro y consulta historica de ventas con su detalle.

Productos

Alta, edicion e imagen de productos, precios y existencias.

Categorias

Clasificacion de productos por categoria.

Inventario

Control de existencias y movimientos de entrada/salida.

Compras

Registro de compras a proveedores y su detalle.

Proveedores

Directorio y gestion de proveedores.

Clientes

Directorio de clientes.

Cotizaciones

Generacion de cotizaciones con su detalle.

Cuentas por Cobrar

Creditos a clientes y registro de abonos.

Cuentas por Pagar

Deudas a proveedores y registro de abonos.

Devoluciones

Gestion de devoluciones con su detalle.

Caja

Apertura/cierre de caja, ingresos y egresos.

Dashboard

Indicadores y graficas del negocio en tiempo real.

Reportes

Reportes exportables a Excel y PDF.

Usuarios y Roles

Administracion de usuarios con permisos por rol.

Configuracion

Datos del negocio y parametros del sistema.

Logs / Auditoria

Registro de acciones de los usuarios.

Mantenimiento

Respaldos y tareas de mantenimiento de la base de datos.

Acceso inicial: usuario admin@ferreteria.com - contrasena admin123 (cambiela tras el primer ingreso).

Generado: Junio 2026

Pagina 3

SISTEMA DE GESTION PARA FERRETERIA

Documentacion tecnica

3. Instalacion en una computadora nueva
Siga estos pasos en orden. La instalacion esta pensada para Windows, ya que el proyecto incluye
archivos .bat que automatizan el proceso.

Paso 1 - Descargar e instalar los programas requeridos
Programa
Node.js LTS (v20+)

Para que sirve
Ejecuta el backend y compila el frontend. Incluye
npm.

Donde descargar
nodejs.org

Base de datos. Puede usar MySQL Community o

dev.mysql.com /

XAMPP (incluye MySQL).

apachefriends.org

Administrar la base de datos visualmente.

dev.mysql.com

Git (opcional)

Clonar/actualizar el codigo.

git-scm.com

VS Code (opcional)

Editar el codigo.

code.visualstudio.com

MySQL Server 8
MySQL Workbench
(opcional)

Al instalar Node.js, marque la opcion 'Add to PATH'. Verifique en una terminal con node -v y npm -v.

Paso 2 - Copiar el proyecto
Copie la carpeta completa del sistema (con las subcarpetas client y server) a la nueva
computadora, por ejemplo en C:\sistema-ferreteria.

Paso 3 - Instalar dependencias
Doble clic en 1_Instalar_Dependencias.bat. Instala automaticamente las librerias del servidor y
del cliente (equivale a ejecutar npm install en cada carpeta).

Paso 4 - Configurar la base de datos
1
2

Asegurese de que el servicio de MySQL este corriendo (en XAMPP, inicie MySQL desde el panel).

3
4

Si el .bat falla, ejecute manualmente: mysql -u root < ferreteria_db.sql

Doble clic en 2_Configurar_Base_Datos.bat: importa el archivo ferreteria_db.sql y crea
la base ferreteria_db.
(Opcional) Importe datos_base.sql o datos_prueba.sql para cargar datos de ejemplo.

Paso 5 - Revisar variables de entorno
Abra server/.env y confirme que coincidan con su instalacion de MySQL:

Generado: Junio 2026

Pagina 4

SISTEMA DE GESTION PARA FERRETERIA

Documentacion tecnica

PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ferreteria_db
DB_DIALECT=mysql
JWT_SECRET=ferreteria_super_secret_2024
JWT_EXPIRES_IN=8h
Si su MySQL tiene contrasena, escribala en DB_PASSWORD. Cambie JWT_SECRET por un valor propio en produccion.

Paso 6 - Iniciar el sistema
Doble clic en 3_Iniciar_Sistema.bat. Levanta el backend (puerto 3002) y el cliente (puerto 5173)
y abre el navegador en http://localhost:5173. Inicie sesion con admin@ferreteria.com /
admin123.

Generado: Junio 2026

Pagina 5

SISTEMA DE GESTION PARA FERRETERIA

Documentacion tecnica

4. Hosting web sugerido
Esta aplicacion necesita un hosting que ejecute Node.js y disponga de base de datos MySQL; no
basta un hosting estatico. Opciones segun presupuesto y experiencia tecnica:
Opcion
Railway (Recomendado)

Ideal para

Notas

Desplegar rapido sin administrar

Soporta Node + MySQL en un mismo

servidor.

proyecto.

Render

Alternativa similar a Railway.

Hostinger VPS

Bajo costo y control total.

DigitalOcean / AWS

Proyectos que creceran.

Vercel / Netlify

Solo el frontend.

Web Service para el backend + base
MySQL.
VPS con Node + MySQL; configuracion
manual.
Mayor control y escalabilidad; mas
complejo.
Cliente aqui; backend/BD en otro
proveedor.

Recomendacion: Railway
Permite desplegar el backend Node.js y una base de datos MySQL en el mismo proyecto, con muy
poca configuracion. Es la via mas sencilla para poner este sistema en linea.

Generado: Junio 2026

Pagina 6

SISTEMA DE GESTION PARA FERRETERIA

Documentacion tecnica

5. Como subir la app a Railway (paso a paso)
Estrategia: backend + base de datos MySQL en Railway, y el frontend (carpeta client) en Railway
como sitio estatico o en Vercel. Pasos:

A) Preparar el codigo
1
2

Suba el proyecto a un repositorio en GitHub (Railway despliega desde GitHub).

3

Confirme que el servidor escuche en process.env.PORT, ya que Railway asigna el puerto
automaticamente.

4

En el frontend, configure la URL del backend (variable VITE_API_URL) apuntando al dominio
publico del backend.

En el backend, use las variables de entorno para la conexion MySQL (host, usuario, contrasena,
puerto) en vez de valores fijos.

B) Crear el proyecto y la base de datos
1
2
3

Cree una cuenta en railway.app e inicie sesion con GitHub.
Clic en 'New Project' y luego 'Provision MySQL'. Railway crea la base y entrega sus credenciales.
Importe su base: conectese con MySQL Workbench usando esas credenciales e importe
ferreteria_db.sql (y datos base si aplica).

C) Desplegar el backend
1
2

En el mismo proyecto: 'New' y luego 'GitHub Repo'; seleccione el repositorio del servidor.

3
4

Defina el comando de inicio npm start. Railway construye y publica.

En 'Variables', configure DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT y
JWT_SECRET con los datos del MySQL de Railway.
Copie el dominio publico generado (ej. https://miapp.up.railway.app).

D) Desplegar el frontend
1

Coloque la VITE_API_URL con el dominio del backend y ejecute npm run build (genera la
carpeta dist).

2

Publique dist en Vercel/Netlify (arrastrar y soltar o desde GitHub), o como servi
