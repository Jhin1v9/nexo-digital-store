# TPV Cafeteria

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/TPV - 2026/TPV Cafeteria

**PDF:** Manual_TPV_Cafeteria.pdf

---

MANUAL TÉCNICO

Sistema TPV
Cafetería
Punto de Venta · Documentación de tecnología, instalación y
despliegue web

Laravel 11

MySQL

Bootstrap 5

TVP · Versión 1.0 · Mayo 2026

Contenido
1. Tecnología utilizada

3

2. Funcionalidades del sistema

4

3. Instalación en una computadora nueva

6

4. Hosting web recomendado

8

5. Cómo subir la aplicación al hosting (paso a paso)

9

TPV Cafetería · Manual técnico v1.0

Pág. 2 / 10

1

Tecnología utilizada

El sistema fue desarrollado como una aplicación web con arquitectura MVC sobre el framework Laravel 11
(PHP). Es una aplicación de servidor que se ejecuta en el navegador, por lo que funciona en cualquier
computadora, tablet o móvil sin instalación adicional en el cliente.
Backend

Base de datos

Laravel 11 (PHP 8.2+), Eloquent ORM, Laravel

MySQL 5.7+ / MariaDB 10.3+, con 13

Sanctum (autenticación), Laravel Tinker.

migraciones y seeders de datos iniciales.

Frontend

Librerías clave

Bootstrap 5.3, Bootstrap Icons, Alpine.js

barryvdh/laravel-dompdf (tickets/PDF),

(reactividad del POS), Chart.js (gráficas).

intervention/image (imágenes de productos).

Resumen del stack
Capa

Tecnología

Función

Framework

Laravel 11

Lógica, rutas, controladores, seguridad

Lenguaje

PHP 8.2+

Ejecución en el servidor

Base de datos

MySQL / MariaDB

Almacenamiento de datos

Vistas

Blade + Bootstrap 5

Interfaz de usuario

Interactividad

Alpine.js + Chart.js

POS reactivo y gráficas

Gestor de paquetes

Composer 2.x

Dependencias PHP

Tipo de aplicación: Aplicación web responsiva (no requiere instalación en escritorio ni app móvil; se usa desde el
navegador). El servidor sirve la carpeta public/ .

TPV Cafetería · Manual técnico v1.0

Pág. 3 / 10

2

Funcionalidades del sistema

El sistema es un TPV/POS completo para cafeterías y restaurantes, organizado en 13 módulos:
1 · Dashboard

2 · Punto de Venta (POS)

KPIs de ventas (hoy/semana/mes), gráficas,

Búsqueda y filtros por categoría, lector de

top de productos, últimas ventas y alertas de

código de barras, carrito, tipos de venta

stock bajo.

(mostrador/mesa/llevar/domicilio), pago
efectivo/tarjeta/transferencia/mixto, cálculo de
impuestos y cambio, ticket imprimible.

3 · Productos y Categorías

4 · Inventario

CRUD con imágenes, control de stock,

Valor de inventario, ajustes (entrada/salida/

impuestos individuales y productos de servicio.

ajuste/merma) e historial de movimientos.

5 · Compras

6 · Mesas y Áreas

Registro de compras a proveedores con

Vista visual de mesas por área con estados:

actualización automática de stock y costo.

libre, ocupada, reservada, mantenimiento.

7 · Caja

8 · Ventas

Apertura con monto inicial, movimientos de

Listado filtrable, detalle, anulación con

ingreso/egreso, cierre con arqueo e historial.

reposición de stock e impresión de ticket.

9 · Clientes y Proveedores

10 · Reportes

Datos fiscales, contacto, crédito y puntos de

Ventas por período y método de pago,

fidelización.

productos más vendidos, estado del inventario.

11 · Usuarios y Roles

12 · Configuración

4 roles (admin, gerente, cajero, mesero) con

Empresa y logo, moneda y separadores,

permisos granulares por módulo.

impuestos, tickets y ajustes del sistema (zona
horaria, tema, color).

13 · Backup y Mantenimiento
Crear/descargar/eliminar copias de seguridad (.sql vía mysqldump o PHP puro), restaurar desde
archivo, resetear datos operativos y reset total ("Nueva empresa").

Usuarios demo precargados
Usuario

Contraseña

Rol

TPV Cafetería · Manual técnico v1.0

Pág. 4 / 10

admin

admin123

Administrador (acceso total)

gerente

gerente123

Gerente

cajero

cajero123

Cajero

Importante: cambia estas contraseñas antes de poner el sistema en producción.

TPV Cafetería · Manual técnico v1.0

Pág. 5 / 10

3

Instalación en una computadora nueva

Guía para Windows. Antes de empezar necesitas descargar e instalar estos programas:

Programas a descargar e instalar
Programa

Para qué sirve

Dónde descargar

XAMPP o Laragon

Incluye PHP 8.2+ y MySQL/MariaDB

apachefriends.org / laragon.org

Composer 2.x

Gestor de dependencias PHP

getcomposer.org

Navegador web

Usar el sistema

Chrome / Edge / Firefox

Recomendado Laragon: ya trae PHP, MySQL y deja todo en el PATH automáticamente. Verifica las extensiones PHP
pdo_mysql, mbstring, xml, gd, fileinfo, tokenizer, openssl, curl .

Paso 1 · Verificar PHP y Composer
php -v
composer -V

Paso 2 · Crear la base de datos Abre phpMyAdmin ( http://localhost/phpmyadmin ) y ejecuta:
CREATE DATABASE tpv_cafeteria
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Paso 3 · Instalar dependencias
cd C:\TVP\tpv-cafeteria
composer install

Paso 4 · Configurar el entorno
copy .env.example .env
php artisan key:generate

Edita el .env con tus datos de MySQL:
DB_HOST=127.0.0.1
DB_PORT=3306

TPV Cafetería · Manual técnico v1.0

Pág. 6 / 10

DB_DATABASE=tpv_cafeteria
DB_USERNAME=root
DB_PASSWORD=

Paso 5 · Migraciones y datos iniciales
php artisan migrate --seed

# Carga roles, usuarios, 28 productos, mesas, proveedores y clientes demo.

Paso 6 · Enlazar el storage (imágenes)
php artisan storage:link

Paso 7 · Arrancar el servidor
php artisan serve

Abre http://127.0.0.1:8000 e inicia sesión con admin / admin123.

Solución de problemas frecuentes
Error

Solución

"could not find driver"

Habilita extension=pdo_mysql en php.ini

Las imágenes no se ven

Ejecuta php artisan storage:link

Error 419 "Page expired"

Verifica APP_KEY y limpia sesiones

No puedo iniciar sesión

Revisa php artisan migrate:status

TPV Cafetería · Manual técnico v1.0

Pág. 7 / 10

Hosting web recomendado

4

Para una aplicación Laravel como esta existen varias opciones según presupuesto y nivel técnico:
Opción

Tipo

Hostinger

Hosting compartido / Cloud

Cloudways
Laravel Cloud
Laravel Forge +
VPS
SiteGround

Managed cloud (DO/Vultr/
AWS)
Oficial de Laravel

Precio aprox.

Ideal para

desde ~$8.99/

Negocios pequeños, fácil y

mes

económico

desde ~$11/mes

Gestión sin devops

tier gratis + uso

Despliegue oficial, autoescalado

$12-39/mes +

Aprovisionamiento VPS

VPS
desde ~$6.69/

Hosting compartido

mes

Control total, escalabilidad

Presupuesto ajustado

Recomendación principal: Hostinger
Para una cafetería es la opción más equilibrada: precio bajo, soporte de PHP/MySQL, panel sencillo
(hPanel), SSL gratis e instalación de Composer. Su plan Cloud Startup (~$8.99/mes) ofrece 2 vCPU,
3 GB RAM y 200 GB NVMe, suficiente para el sistema con holgura.
Económico

PHP 8.2 + MySQL

SSL gratis

Panel fácil

Si prefieres "cero mantenimiento de servidor", Laravel Cloud (oficial) o Cloudways son alternativas excelentes. Si
quieres máximo control y crecer a futuro, un VPS + Laravel Forge.

TPV Cafetería · Manual técnico v1.0

Pág. 8 / 10

5

Subir la aplicación a Hostinger (paso a paso)

Guía para desplegar en el hosting recomendado (Hostinger). Aplica de forma similar a otros hosting con
cPanel/hPanel.
Paso 1 · Contratar el plan y crear la base de datos En hPanel contrata el plan Cloud Startup.
Luego en Bases de datos → MySQL crea una base tpv_cafeteria , un usuario y una contraseña.
Anota estos datos.

Paso 2 · Subir los archivos del proyecto Comprime el proyecto en .zip (sin la carpeta vendor si
vas a usar Composer en el servidor) y súbelo con el Administrador de archivos de hPanel o por SFTP.
Descomprímelo fuera de public_html , por ejemplo en /home/usuario/tpv-cafeteria .

Paso 3 · Apuntar el dominio a la carpeta public Laravel debe servir solo la carpeta public/ . En
hPanel configura la "raíz del documento" (document root) del dominio hacia /home/usuario/tpvcafeteria/public . Si tu plan no lo permite, mueve el contenido de public/ a public_html y

ajusta las rutas en index.php .

Paso 4 · Instalar dependencias en el servidor Activa el acceso SSH en hPanel y ejecuta:
cd ~/tpv-cafeteria
composer install --optimize-autoloader --no-dev

Paso 5 · Configurar el archivo .env de producción
cp .env.example .env
php artisan key:generate

Edita el .env :
APP_
