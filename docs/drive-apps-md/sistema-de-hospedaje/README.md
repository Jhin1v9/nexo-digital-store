# SISTEMA DE HOSPEDAJE

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/App web portafolio/PORTAFOLIO 2 WEBS/PHP - PORTAFOLIO APLICACIONES WEBS 2026/SISTEMA DE HOSPEDAJE

**PDF:** Manual_Sistema_Hospedaje.pdf

---

MANUAL TÉCNICO · v1.0

Sistema de
Hospedaje
Gestión hotelera, reservas y
facturación electrónica SUNAT

PHP · Laravel 10 · MySQL · AdminLTE
Tecnología · Funcionalidades · Instalación · Hosting · Despliegue

Documento generado el 29 de mayo de 2026

0

Contenido

1. Tecnología de desarrollo — stack y librerías
2. Funcionalidades del sistema — módulos para casos reales
3. Instalación en una computadora nueva — programas y configuración
4. Hosting web recomendado — opciones y comparativa
5. Despliegue en el hosting recomendado — guía paso a paso

1

Tecnología de desarrollo

El sistema es una aplicación web construida sobre el framework Laravel 10 (PHP) con base de datos
MySQL, siguiendo el patrón MVC. La interfaz administrativa usa la plantilla AdminLTE, y la facturación
electrónica se integra con la SUNAT (Perú) mediante la librería Greenter.
Backend

Base de datos

PHP 8.1+ · Laravel 10 · Eloquent ORM · Laravel Sanctum
· Laravel UI (autenticación)

MySQL 5.7+ / 8.0 · migraciones y seeders versionados

Frontend

Facturación electrónica

Blade · AdminLTE 3 · Bootstrap · Chart.js · Vite para
assets

Greenter 5 (SUNAT) · DomPDF (PDF) · php-qrcode (QR)

Librerías clave: laravel/framework ^10 · jeroennoten/laravel-adminlte · barryvdh/laravel-dompdf ·
greenter/greenter ^5.2 · chillerlan/php-qrcode ^6 · laravel/sanctum · guzzlehttp/guzzle

2

Funcionalidades del sistema

Módulos diseñados para la operación real de un hotel, hostal u hospedaje:
Dashboard

Calendario

Panel con métricas de ocupación, ingresos y gráficos en
tiempo real.

Disponibilidad y eventos; verifica habitaciones libres por
fecha.

Habitaciones y tipos

Huéspedes

CRUD por piso, estados (libre, ocupada, mantenimiento)
y tipos con precio base.

Registro con historial, búsqueda AJAX y borrado lógico
(softDelete).

Reservas

Housekeeping

Alta con disponibilidad en tiempo real, check-in y
check-out.

Control de limpieza: marcar habitaciones sucias/limpias y
cambiar estado.

Facturación SUNAT

Notas de crédito

Boletas y facturas con IGV, emisión electrónica, XML y
CDR, PDF y QR.

Anulación/corrección de comprobantes con emisión a
SUNAT.

Comunicación de baja

Resumen de boletas

Baja de facturas ante SUNAT con consulta de ticket, XML
y CDR.

Resúmenes diarios con emisión y seguimiento del ticket.

Sistema de Hospedaje — Manual Técnico

Página 2

Pagos y cargos

Tarifas por temporada

Efectivo, tarjeta, Yape, etc. y cargos extra (minibar,
restaurante).

Precios diferenciados por temporada,
activables/desactivables.

Reportes

Usuarios y roles

Ocupación, ingresos y huéspedes, con exportación de
resultados.

Gestión de usuarios; perfiles Admin y Recepción con sus
permisos.

Flujo operativo principal
1
2
3
4
5
6
7

Registrar huésped con sus datos.
Crear reserva verificando disponibilidad en tiempo real.
Check-in al llegar el huésped.
Cargos adicionales durante la estancia (restaurante, minibar…).
Check-out al finalizar la estancia.
Emitir comprobante (boleta/factura) y enviarlo a SUNAT.
Registrar pago y descargar el PDF con código QR.

Sistema de Hospedaje — Manual Técnico

Página 3

3

Instalación en una computadora nueva

Sigue estos pasos en orden. Aplica para Windows; en macOS/Linux el procedimiento es equivalente.

3.1 Programas a descargar e instalar
Programa

Para qué sirve

Dónde descargar

XAMPP (o Laragon)

Incluye PHP 8.2+, MySQL/MariaDB y Apache en un
paquete

apachefriends.org /
laragon.org

Composer

Gestor de dependencias de PHP (Laravel y librerías)

getcomposer.org

Node.js (opcional)

Compilar assets de frontend (Vite)

nodejs.org (LTS)

Git (opcional)

Clonar el proyecto y control de versiones

git-scm.com

VS Code (opcional)

Editor de código recomendado

code.visualstudio.com

Importante: el proyecto requiere PHP 8.1 o superior (recomendado 8.2). Tras instalar XAMPP, verifica con php
-v y composer -V en la terminal.

3.2 Configuración paso a paso
1
2
3
4

Instalar XAMPP e iniciar los servicios Apache y MySQL desde el panel de control.
Instalar Composer y, si lo deseas, Node.js y Git.
Copiar el proyecto a la carpeta de trabajo, p. ej. C:\Webs\PHP\sistema-hospedaje.
Crear la base de datos. En phpMyAdmin (localhost/phpmyadmin) ejecuta:
CREATE DATABASE hospedaje_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

5

Instalar dependencias. En la terminal del proyecto:
composer install
# si vas a compilar assets:
npm install && npm run build

6

Configurar el archivo .env. Copia el ejemplo y ajusta MySQL:
copy .env.example .env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=hospedaje_db
DB_USERNAME=root
DB_PASSWORD=

7

# vacío o tu contraseña

Generar la clave de la aplicación y enlazar el almacenamiento:

Sistema de Hospedaje — Manual Técnico

Página 4

php artisan key:generate
php artisan storage:link

8

Crear tablas y datos iniciales (o importar bk_basededatos.sql):
php artisan migrate --seed

9

Iniciar el servidor de desarrollo:
php artisan serve

10

Abrir el sistema en el navegador: http://localhost:8000

Credenciales por defecto:
Administrador — admin@hospedaje.com / password
Recepción — recepcion@hospedaje.com / password
Cámbialas inmediatamente en producción.
SUNAT: para emitir comprobantes electrónicos configura el certificado digital y credenciales en .env / panel de
configuración. Consulta SUNAT_SETUP.md y el Manual_Facturacion_Electronica_SUNAT.pdf del proyecto. Usa
el entorno beta de SUNAT para pruebas antes de producción.

Sistema de Hospedaje — Manual Técnico

Página 5

4

Hosting web recomendado

Al ser una aplicación Laravel + MySQL, necesitas un hosting que soporte PHP 8.1+, Composer, acceso
SSH y control del document root (debe apuntar a la carpeta /public). Opciones según presupuesto y
conocimientos:
Opción

Tipo

Ideal para

Costo

Hostinger

Compartido /
VPS

Despliegue sencillo, panel en español, PHP+MySQL listos

$ bajo

DigitalOcean /
Vultr

VPS propio

Control total, escalable; requiere administrar el servidor

$ medio

Laravel Cloud /
Forge

PaaS Laravel

Despliegue optimizado para Laravel; muy cómodo

$ medio
-alto

AWS / Google
Cloud

Nube (IaaS)

Proyectos grandes con alta demanda

$
variable

Recomendación: para este sistema, Hostinger (plan Business / Cloud con acceso SSH) ofrece el mejor
equilibrio entre precio, facilidad y soporte de Laravel — la opción más recomendada para empezar. Si esperas
mucho tráfico o necesitas control total, un VPS en DigitalOcean es la mejor alternativa.

5

Despliegue paso a paso en Hostinger

Guía para subir la aplicación al hosting recomendado (plan con acceso SSH).

1
2
3
4

Contratar el plan y configurar tu dominio en el panel hPanel.
Crear la base de datos MySQL desde hPanel → Bases de datos. Anota nombre, usuario y
contraseña.
Importar los datos: en phpMyAdmin importa bk_basededatos.sql (o ejecuta migraciones por SSH).
Subir el código por SSH (git) o SFTP a la carpeta del dominio:
ssh usuario@tu-servidor
cd domains/tudominio.com
git clone

5

.

Instalar dependencias de producción:
composer install --optimize-autoloader --no-dev

6

Configurar el .env de producción:

Sistema de Hospedaje — Manual Técnico

Página 6

cp .env.example .env
php artisan key:generate
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tudominio.com
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

7

Preparar la base de datos y enlaces:
php artisan migrate --seed --force
php artisan storage:link

8
9

Apuntar el dominio a /public. Cambia el document root del dominio a la carpeta public. Nunca
expongas la raíz del proyecto.
Optimizar y dar permisos de escritura:
php artisan config:cache
php artisan route:cache
php artisan view:cache
chmod -R 775 storage bootstrap/cache

10
11

Activar HTTPS (SSL) gratuito (Let's Encrypt) desde hPanel y forzar redirección.
Probar con https://tudominio.com, iniciar sesión y verificar SUNAT en producción.

Buenas prácticas: mantén APP_DEBUG=false en producción, programa respaldos automáticos de la base de
datos y cambia todas las credenciales por defecto antes del uso real.

Sistema de Hos
