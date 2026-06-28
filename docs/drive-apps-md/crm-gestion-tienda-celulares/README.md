# CRM-GESTION-TIENDA-CELULARES

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/PORTAFOLIO APLICACIONES CRM Y ERP - 2026/APLICACIONES CRM Y ERP/CRM-GESTION-TIENDA-CELULARES

**PDF:** Manual_CRM_Celulares.pdf

---

C
CRM Tienda Celulares
Sistema de Gestion Integral
Manual Tecnico, Guia de Instalacion
y Despliegue en Hosting Web
PHP 8.1

Laravel 10

MySQL

Bootstrap 5

Mayo 2026 | Version 1.0

Documento generado automaticamente por CRM Tienda Celulares

CRM Tienda Celulares

Manual Tecnico y de Instalacion

Tabla de Contenido
1
.

Tecnologias Utilizadas

3

2
.

Funcionalidades del Sistema

4

3
.

Instalacion en Computadora Nueva

6

4
.

Hosting Web Recomendado

9

5
.

Despliegue en DigitalOcean (paso a paso)

10

6
.

Credenciales y Acceso Inicial

13

CRM Gestion Tienda de Celulares | Laravel 10 + MySQL

Pagina 2

CRM Tienda Celulares

1

Manual Tecnico y de Instalacion

Tecnologias Utilizadas

El sistema CRM para tienda de celulares fue desarrollado utilizando un stack moderno y robusto que
garantiza rendimiento, seguridad y facilidad de mantenimiento.

Tecnologia

Version

Descripcion

PHP

8.1+

Lenguaje de programacion del lado del servidor. Potente, rapido y con
amplia comunidad.

Laravel

10.x

Framework PHP MVC. Provee enrutamiento, ORM Eloquent,
migraciones, autenticacion y mas.

MySQL

8.0+

Sistema gestor de base de datos relacional. Almacena clientes,
ventas, productos y reparaciones.

Bootstrap

5.3

Framework CSS responsivo. Grilla de 12 columnas, componentes UI
listos para usar.

Chart.js

4.x

Libreria JavaScript para graficas interactivas en el dashboard (barras,
lineas, dona).

Font Awesome

6.4

Libreria de iconos vectoriales utilizados en toda la interfaz del sistema.

Blade
Templates

Laravel

Motor de plantillas de Laravel para generar vistas HTML dinamicas
con logica PHP.

Composer

2.x

Gestor de dependencias PHP. Instala y actualiza todas las librerias
del proyecto.

ReportLab

Python

Libreria para generacion de reportes PDF internos del sistema
(comprobantes, etc.).

Arquitectura MVC del Sistema
MODELO (M) Base de datos
MySQL Cliente, Producto Venta,
Reparacion User, Categoria

CRM Gestion Tienda de Celulares | Laravel 10 + MySQL

VISTA (V) Blade Templates
Dashboard, Clientes Ventas,
Productos Reparaciones

CONTROLADOR (C) Laravel PHP
Logica de negocio Validaciones
Respuestas HTTP

Pagina 3

CRM Tienda Celulares

Manual Tecnico y de Instalacion

Funcionalidades del Sistema

2

El CRM cuenta con 8 modulos principales disenados especificamente para las operaciones diarias de una
tienda de celulares en Peru.

#

@ Clientes (CRM)

Dashboard

Panel principal con KPIs en tiempo real: ventas del dia,
ventas del mes, clientes nuevos, productos con stock
bajo y reparaciones pendientes. Incluye graficas de
ventas por semana y por mes con Chart.js.

Gestion completa de clientes: registro con DNI/RUC,
historial de compras, historial de reparaciones,
busqueda avanzada, edicion y estado activo/inactivo.

$

+

Inventario

Ventas (POS)

Control de productos: stock en tiempo real, alertas de
stock minimo, carga de imagenes, especificaciones
tecnicas (IMEI, RAM, almacenamiento), margenes de
ganancia automaticos.

Punto de venta con busqueda de productos en tiempo
real, calculo automatico de IGV (18%), descuentos por
linea, multiples metodos de pago (efectivo, tarjeta, Yape,
Plin, cuotas) e impresion de ticket.

!

% Reportes

Reparaciones

Ordenes de servicio tecnico con 7 estados de
seguimiento, asignacion de tecnico, presupuesto, costo
final, garantia, prioridad (baja/media/alta/urgente) y
notas tecnicas.

Reportes con filtro de fechas: ventas por dia, ventas por
metodo de pago, top 10 productos mas vendidos, top 10
clientes, reparaciones por estado y productos con stock
bajo.

*

S

Configuracion

Gestion de usuarios del sistema con 3 roles:
Administrador (acceso total), Vendedor (ventas e
inventario) y Tecnico (reparaciones). Activar/desactivar
cuentas.

Backup & Restore

Modulo de seguridad para exportar/importar la base de
datos completa en formato SQL, restauracion con
backup automatico previo y 3 niveles de reset del
sistema.

Roles y Permisos del Sistema
Modulo

Administrador

Vendedor

Tecnico

Dashboard

Si

Si

Si

Clientes

Si

Si

Solo consulta

CRM Gestion Tienda de Celulares | Laravel 10 + MySQL

Pagina 4

CRM Tienda Celulares

Manual Tecnico y de Instalacion

Inventario

Si

Si

Solo consulta

Ventas (POS)

Si

Si

No

Reparaciones

Si

Solo consulta

Si

Reportes

Si

Si

No

Configuracion

Si

No

No

Backup

Si

No

No

CRM Gestion Tienda de Celulares | Laravel 10 + MySQL

Pagina 5

CRM Tienda Celulares

Manual Tecnico y de Instalacion

Instalacion en Computadora Nueva

3

Sigue estos pasos en orden para instalar el sistema en una computadora con Windows 10/11. El proceso
toma aproximadamente 20-30 minutos la primera vez.

Programas a Descargar e Instalar
#

Programa

Donde descargar

Para que sirve

1

XAMPP 8.2

apachefriends.org

Incluye Apache, PHP 8.2 y MySQL en un solo
instalador

2

Composer 2.x

getcomposer.org

Gestor de dependencias PHP para instalar
Laravel

3

Git

git-scm.com

Control de versiones (opcional pero
recomendado)

4

HeidiSQL

heidisql.com

Cliente grafico para administrar MySQL (incluido
en XAMPP)

Pasos de Instalacion

1

Instalar XAMPP
Descarga XAMPP desde apachefriends.org e instalalo en C:\xampp. Al terminar, abre el Panel de Control de
XAMPP y haz clic en "Start" para Apache y MySQL.

2

Instalar Composer
Descarga el instalador desde getcomposer.org/download. Ejecutalo y asegurate de que detecta
automaticamente el PHP de XAMPP en C:\xampp\php\php.exe.

3

Copiar el proyecto
Copia la carpeta del sistema (crm-gestion-tienda-celulares) dentro de C:\xampp\htdocs\. La ruta completa
debe ser: C:\xampp\htdocs\crm-gestion-tienda-celulares\

4

Crear la base de datos
Abre tu navegador y ve a http://localhost/phpmyadmin. Crea una nueva base de datos con el nombre exacto:
tiendacelulares_crm. Selecciona cotejamiento utf8mb4_unicode_ci.

CRM Gestion Tienda de Celulares | Laravel 10 + MySQL

Pagina 6

CRM Tienda Celulares

5

Manual Tecnico y de Instalacion

Configurar el archivo .env
Dentro de la carpeta del proyecto, copia el archivo ".env.example" y renombralo a ".env". Abrelo con el Bloc
de notas y configura: DB_DATABASE=tiendacelulares_crm, DB_USERNAME=root, DB_PASSWORD=
(dejar vacio si no pusiste contrasena en MySQL).

6

Instalar dependencias con Composer
Abre PowerShell o CMD, navega a la carpeta del proyecto con: cd
C:\xampp\htdocs\crm-gestion-tienda-celulares y ejecuta: composer install

7

Generar clave de aplicacion
En la misma consola ejecuta: php artisan key:generate Esto genera una clave unica de seguridad para tu
instalacion.

8

Ejecutar migraciones y datos de ejemplo
Ejecuta en la consola: php artisan migrate:fresh --seed Esto crea todas las tablas y carga los datos iniciales
del sistema.

9

Configurar almacenamiento de imagenes
Ejecuta: php artisan storage:link Esto crea el enlace simbolico para que las imagenes de productos sean
accesibles.

10

Iniciar el servidor y acceder al sistema
Ejecuta: php artisan serve Abre tu navegador y ve a http://127.0.0.1:8000. Ingresa con: admin@tienda.com /
password

TIP: Si ves un error de permisos, ejecuta en consola: php artisan config:clear && php artisan cache:clear

CRM Gestion Tienda de Celulares | Laravel 10 + MySQL

Pagina 7

CRM Tienda Celulares

4

Manual Tecnico y de Instalacion

Hosting Web Recomendado

Para publicar el sistema en internet y acceder desde cualquier dispositivo, se recomienda DigitalOcean
como la opcion mas confiable para aplicaciones Laravel en produccion.

Hosting

Precio/mes

Laravel

Nivel

Recomendacion

DigitalOcean

$6 USD

Nativo

Intermedio

MEJOR OPCION

Railway.app

$5 USD

Si

Facil

Muy buena opcion

Hostinger

$2.99 USD

Limitado

Facil

Solo hosting basico

AWS / GCP

$15+ USD

Si

Avanzado

Sobredimensionado

Por que DigitalOcean es la mejor opcion?
Control total del servidor
Tienes acceso root completo al servidor Linux,
puedes instalar cualquier software.

PHP 8.1+ y MySQL incluidos
La imagen LAMP de DigitalOcean ya viene con
todo lo necesario preinstalado.

Precio accesible
Desde $6 USD/mes por un Dro
