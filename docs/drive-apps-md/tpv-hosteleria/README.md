# TPV_Hosteleria

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/TPV - 2026/TPV_Hosteleria

**PDF:** TPV-Hosteleria-Manual.pdf

---

TPV Hosteleria
Manual del Sistema
Software POS para restaurantes, bares y cafeterías.
Comandas, mesas, cocina, caja, stock e informes —
preparado para VeriFactu y TicketBAI.
PHP 8.2 + Laravel 11

MySQL

Tailwind + Vite

Chart.js

Documento técnico y de despliegue · Tecnología · Funcionalidades · Instalación local · Hosting · Puesta en
producción
Generado el 31 de mayo de 2026

i

Contenido
1. Tecnología de desarrollo ········· Stack backend, frontend y librerías
2. Funcionalidades del sistema ········· Módulos operativos y de gestión
3. Instalación en una computadora nueva ········· Programas a instalar y configuración paso a
paso
4. Hosting web recomendado ········· Comparativa de opciones
5. Puesta en producción paso a paso ········· Subir la app al hosting recomendado

Este manual asume el proyecto tpv-hosteleria tal como está, con base de datos MySQL tpv_hosteleria.

TPV Hosteleria · Manual técnico y de despliegue

Pág. 2 / 10

1

Tecnología de desarrollo

El sistema es una aplicación web construida sobre el framework PHP Laravel 11, con base de datos
MySQL y una interfaz moderna basada en Tailwind CSS, Alpine.js y gráficos con Chart.js.
Lenguaje backend

Framework

PHP 8.2 o superior

Laravel 11

Base de datos

Autenticación

MySQL 8 / MariaDB (puerto 3306)

Laravel Sanctum + login por PIN

Interfaz (CSS)

Interactividad

Tailwind CSS 3 + plugins forms/typography

Alpine.js 3 · Axios · SweetAlert2

Gráficos

Compilación de assets

Chart.js 4 (dashboard estadístico)

Vite 5 + laravel-vite-plugin

PDF / Tickets

Excel / Informes

barryvdh/laravel-dompdf

maatwebsite/excel

Imágenes / Logo

Cumplimiento fiscal

intervention/image

Preparado para VeriFactu y TicketBAI

Arquitectura: patrón MVC de Laravel — controladores en app/Http/Controllers, modelos Eloquent, vistas
Blade y más de 50 rutas web. Servidor web Apache o Nginx con PHP-FPM.

TPV Hosteleria · Manual técnico y de despliegue

Pág. 3 / 10

2

Funcionalidades del sistema

Centraliza toda la operativa de un negocio de hostelería desde una sola plataforma: sala, cocina, caja,
catálogo y administración.

🍽 Mesas y sala

📝 Comandas

Gestión de salones, zonas y mesas con estados (libre,

Toma de pedidos en sala, barra, recogida y delivery;

ocupada, reservada, cuenta) y plano visual.

división de cuentas y cambios de mesa.

👨🍳 Cocina (KDS)

🧾 Caja y cobro

Envío de pedidos a cocina con seguimiento de estados

Apertura/cierre de caja, cobros (efectivo, tarjeta, bizum,

para reducir errores y agilizar el servicio.

mixto), tickets y arqueo diario.

📦 Productos y stock

🏷 Categorías

Catálogo, control de inventario, mermas, movimientos

Organización del catálogo por categorías con color, tipo

de stock y proveedores.

y envío a cocina.

📅 Reservas

👥 Usuarios y roles

Reservas por mesa y franja horaria con estados

Roles admin, gerente, cajero, camarero y cocina;

(pendiente, confirmada, sentada, no-show).

acceso por email/contraseña o PIN.

📊 Dashboard e informes

⚙ Configuración

Ventas del día, evolución 7 días, ventas por categoría,

Datos de empresa, logo, símbolo de moneda,

top productos, métodos de pago y top camareros.

separadores de decimales/miles y parámetros fiscales.

💾 Backup & Reset

🛵 Delivery y para llevar

Copia de seguridad, restauración y reinicio del sistema

Gestión de pedidos telefónicos, recogidas en local y

para una empresa nueva.

reparto a domicilio.

TPV Hosteleria · Manual técnico y de despliegue

Pág. 4 / 10

3

Instalación en una computadora nueva

Guía para dejar el sistema funcionando en un equipo Windows desde cero. Necesitas instalar PHP+MySQL,
Composer y Node.js.

1

Instalar el servidor PHP + MySQL (XAMPP)
Descarga XAMPP (incluye Apache, PHP 8.2 y MySQL/MariaDB) desde apachefriends.org. Instálalo y
abre el Panel de Control de XAMPP. Pulsa Start en Apache y MySQL.

2

Instalar Composer (gestor de paquetes PHP)
Descarga el instalador Composer-Setup.exe desde getcomposer.org y sigue el asistente (detecta el
PHP de XAMPP automáticamente). Verifica con:
# comprueba versiones
php -v
composer -V

3

Instalar Node.js (compilación de la interfaz)
Descarga la versión LTS de Node.js desde nodejs.org e instálala. Verifica con node -v y npm -v.

4

Crear la base de datos
Abre http://localhost/phpmyadmin, pulsa Nueva y crea una base de datos llamada
tpv_hosteleria con cotejamiento utf8mb4_unicode_ci.

5

Copiar el proyecto y configurar el .env
Copia la carpeta tpv-hosteleria al equipo (por ejemplo en C:\TVP\). Crea el archivo .env a partir
de .env.example y revisa la conexión MySQL:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tpv_hosteleria
DB_USERNAME=root
DB_PASSWORD=

TPV Hosteleria · Manual técnico y de despliegue

Pág. 5 / 10

6

Instalar dependencias y preparar la app
Abre una terminal en la carpeta del proyecto y ejecuta en orden:
# dependencias PHP y JS
composer install
npm install
# clave de la aplicacion
php artisan key:generate
# crear tablas y cargar datos demo (10+ registros por modulo)
php artisan migrate:fresh --seed
# compilar la interfaz
npm run build

7

Arrancar el sistema
Levanta el servidor de desarrollo y entra en el navegador:
php artisan serve --port=8030
# Abrir: http://127.0.0.1:8030

Credenciales demo: admin@tpv.local / admin123 (PIN 1234) · cajero@tpv.local / cajero123 (PIN 3333)

Si el login falla ("Credenciales incorrectas o usuario inactivo"), ejecuta php artisan tpv:reset-admin para
restablecer el administrador. Tras cambiar el .env, ejecuta siempre php artisan optimize:clear.

TPV Hosteleria · Manual técnico y de despliegue

Pág. 6 / 10

4

Hosting web recomendado

Laravel necesita PHP propio, acceso por terminal (SSH/Composer), tareas programadas y workers. Por eso
un VPS es más adecuado que el hosting compartido básico.
Opción

Ideal para

Coste aprox.

Recomendación

Hostinger VPS (KVM)

Pequeño/mediano restaurante que quiere

Desde ~6,49 $/

★ Más recomendado

control total con buena relación precio/

mes

recurso
DigitalOcean / Linode +

Quien quiere despliegues automáticos y

VPS ~6 $ +

Laravel Forge

gestión profesional del servidor

Forge ~12 $/

Avanzado / escalable

mes
Laravel Cloud

Hosting compartido

Proyectos nuevos que prefieren plataforma

Capa inicial

gestionada sin administrar servidor

gratuita

Demos muy básicas

Bajo

Cómodo, gestionado

No recomendado para
producción

Elección de este manual: Hostinger VPS — equilibrio entre precio, control y soporte en español, con PHP,
MySQL, SSH y dominio incluido. La siguiente sección detalla cómo subir la aplicación ahí.

TPV Hosteleria · Manual técnico y de despliegue

Pág. 7 / 10

5

Puesta en producción en Hostinger VPS

Pasos para publicar la aplicación en un VPS de Hostinger con Ubuntu, Nginx, PHP 8.2 y MySQL.

1

Contratar el VPS y elegir plantilla
En el panel de Hostinger contrata un plan VPS KVM. Al crearlo, elige una plantilla de sistema operativo
con Ubuntu 22.04. Hostinger ofrece imágenes preparadas con panel; también puedes usar Ubuntu limpio.

2

Conectarte por SSH e instalar el stack
Conéctate con los datos del panel y prepara el servidor:
ssh root@TU_IP_DEL_VPS
# paquetes base
apt update && apt upgrade -y
apt install -y nginx mysql-server git unzip \
php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml \
php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath
# Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
# Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash apt install -y nodejs

3

Crear la base de datos en el servidor
mysql -u root -p
CREATE DATABASE tpv_hosteleria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tpv'@'localhost' IDENTIFIED BY 'UNA_CLAVE_SEGURA';
GRANT ALL PRIVILEGES ON tpv_hosteleria.* TO 'tpv'@'localhost';
FLUSH PRIVILEGES; EXIT;

4

Subir el proyecto
Sube el código a /var/www/tpv-hosteleria con Git (recomendado) o por SFTP (FileZilla):
cd /var/www
git clone TU_REPOSITORIO tpv-hosteleria
cd tpv-hosteleria
composer install --no-d
