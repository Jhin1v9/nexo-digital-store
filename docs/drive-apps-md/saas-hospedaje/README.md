# SaaS Hospedaje

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Hospedaje/SaaS Hospedaje

**PDF:** Hospedaje_Pro_Documentacion.pdf

---

H

Hospedaje Pro
Sistema SaaS de Gestion Hotelera
Documentacion tecnica, instalacion y despliegue

HOTEL

Laravel 11 | PHP 8.2+ | MySQL | Bootstrap 5 - Junio 2026

Hospedaje Pro

Documentacion del sistema

1. Tecnologia de desarrollo
El sistema fue desarrollado con un stack moderno de codigo abierto, ampliamente usado en la industria,
robusto y de bajo costo de operacion:

Backend
■ PHP 8.2+ con el framework Laravel 11 (arquitectura MVC) y el ORM Eloquent.
■ Arquitectura SaaS multi-tenant: cada empresa tiene sus datos aislados mediante una columna
empresa_id y un global scope automatico.
■ Seguridad: sesiones de Laravel, hashing bcrypt, proteccion CSRF, validacion de formularios y
middleware de roles y permisos.

Base de datos
■ MySQL 8 (motor InnoDB) con migraciones versionadas de Laravel.
■ Tablas principales: empresas, planes, suscripciones, usuarios, habitaciones, reservas, facturas, pagos,
caja, productos, consumos, permisos.

Frontend
■ Plantillas Blade (motor de Laravel) con Bootstrap 5 y Bootstrap Icons.
■ Graficos con Chart.js y calendario con FullCalendar.
■ Diseno responsivo (movil/tablet) y carga por CDN, sin compilacion de assets (npm).

Entorno
■ Desarrollo: servidor embebido php artisan serve + Composer.
■ Produccion: Apache o Nginx + PHP-FPM + MySQL.
■ Localizacion: moneda Soles (S/), IGV 18%, idioma espanol, zona horaria America/Lima.

2. Funcionalidades del sistema
Plataforma SaaS
■ Registro de empresas (hoteles) con datos totalmente aislados.
■ Planes de suscripcion Free / Pro / Empresarial con limites de habitaciones y usuarios.
■ Suscripcion: prueba de 30 dias, vencimiento que bloquea el acceso, renovacion e historial de pagos.
■ Panel Super-Admin de plataforma: metricas globales, MRR, suspender/activar empresas y cambiar
su plan.
■ Onboarding (primeros pasos) y diseno responsivo + landing publica.

Operacion hotelera

Hospedaje Pro - Sistema de gestion hotelera SaaS

Pag. 2

Hospedaje Pro

Documentacion del sistema

■ Dashboard con KPIs de ocupacion, ingresos e indicadores hoteleros ADR y RevPAR.
■ Reservas con calculo de noches/total, anti-overbooking (sin fechas solapadas) y tarifa por
temporada.
■ Calendario visual de reservas (mes / semana / lista).
■ Huespedes (CRUD con tipo de documento) y Habitaciones con tipos y estados.
■ Housekeeping: tablero de limpieza y mantenimiento.
■ Facturacion con IGV, pagos parciales y saldo, y comprobante imprimible.
■ Caja diaria: apertura, movimientos del turno y arqueo de cierre.
■ Consumos / productos (minibar, restaurante, lavanderia) cargados a la cuenta.
■ Tarifas de temporada que ajustan precios automaticamente.
■ Reportes de ingresos, ocupacion y por tipo, con exportacion CSV y PDF.

Administracion y seguridad
■ Roles y permisos finos por modulo (administrador / recepcion / housekeeping).
■ Usuarios, configuracion del hotel, respaldo de la base de datos (.sql) y limpieza de cache.
■ Cuenta self-service: cada usuario edita su perfil y cambia su contrasena.

3. Instalacion en una computadora nueva
Estas instrucciones son para Windows. La idea es instalar PHP, MySQL y Composer, copiar el proyecto y
ejecutar unos comandos.

A) Programas a descargar e instalar

1

Laragon (recomendado). Incluye PHP 8.2+, Apache y MySQL listos para Laravel. Descarga en
laragon.org. Alternativa: XAMPP (apachefriends.org).

2

Composer. Gestor de dependencias de PHP. Descarga el instalador en getcomposer.org
(Composer-Setup.exe).

3
4

Git (opcional). Para clonar el proyecto. Descarga en git-scm.com.
Visual Studio Code (opcional). Editor de codigo, en code.visualstudio.com.

B) Puesta en marcha paso a paso

1
2
3

Instala Laragon y arranca. Abre Laragon y pulsa "Start All" (levanta Apache y MySQL).
Instala Composer. Ejecuta el instalador; detecta el PHP de Laragon automaticamente.
Copia el proyecto. Pega la carpeta del sistema en C:\laragon\www\saas_hospedaje.

Hospedaje Pro - Sistema de gestion hotelera SaaS

Pag. 3

Hospedaje Pro

4

Documentacion del sistema

Crea la base de datos. En Laragon > Menu > MySQL, o en phpMyAdmin, ejecuta el comando SQL
de abajo.
CREATE DATABASE saas_hospedaje CHARACTER SET utf8mb4 COLLATE
utf8mb4_unicode_ci;

Luego, abre una terminal dentro de la carpeta del proyecto y ejecuta en orden:
composer install
copy .env.example .env :: (si no existe el .env)
php artisan key:generate
php artisan migrate:fresh --seed
php artisan optimize:clear
php artisan serve

En el archivo .env verifica la conexion a la base de datos:
DB_DATABASE=saas_hospedaje
DB_USERNAME=root
DB_PASSWORD= # vacio en Laragon/XAMPP por defecto
APP_URL=http://127.0.0.1:8000

Abre http://127.0.0.1:8000 en el navegador. Inicia sesion con admin@hospedaje.com / password (o el super-admin:
superadmin@hospedaje.com / password).

4. Hosting web sugerido
Laravel funciona en casi cualquier hosting con PHP 8.2+ y MySQL. Estas son las opciones mas recomendadas
en 2026, de la mas sencilla a la mas avanzada:
Opcion

Ideal para

Costo aprox.

Hostinger (Cloud / Business)

Empezar facil y barato, con SSH e instalador
US$Laravel
3 - 9 /mes

Dificultad
Baja

VPS (Hostinger / DigitalOcean / Vultr)SaaS que crece; mas control y rendimiento
US$ 5 - 7 /mes

Media

Laravel Cloud

Totalmente gestionado, autoescala, cero US$
DevOps
5 - 20 /mes

Baja

Laravel Forge + DigitalOcean

Control total con gestion de servidor

Alta

~US$ 19 /mes + VPS

Recomendado para ti: Hostinger
Hostinger es la mejor relacion precio / facilidad para empezar: es economico, muy popular en Latinoamerica,
incluye dominio y SSL gratis, copias de seguridad, servidores rapidos (LiteSpeed) y acceso SSH desde el
plan Premium/Business, que permite instalar Laravel con Composer. Cuando el SaaS crezca en clientes,
conviene pasar a un VPS o a Laravel Cloud para mayor rendimiento y escalado automatico.

Hospedaje Pro - Sistema de gestion hotelera SaaS

Pag. 4

Hospedaje Pro

Documentacion del sistema

5. Como subir el sistema a Hostinger
Guia para un plan de Hostinger con acceso SSH (Premium, Business, Cloud o VPS).

1

Contrata el plan y el dominio. En hostinger.com elige un plan con SSH; aprovecha el dominio y el
SSL gratis.

2

Crea la base de datos MySQL. En hPanel > Bases de datos > MySQL: crea la BD y un usuario;
anota nombre, usuario y contrasena.

3

4

5

Sube el proyecto. Recomendado por Git: en la consola SSH ejecuta "git clone " dentro de
domains/tudominio.com. Alternativa: comprime el proyecto, subelo por el Administrador de archivos y
descomprimelo.
Apunta el dominio a /public. En hPanel > Avanzado > cambia el "Document Root" del dominio a la
carpeta /public del proyecto (Laravel sirve desde public). O crea un subdominio apuntando a esa
carpeta.
Conecta por SSH. Abre el terminal SSH (hPanel > Avanzado > Acceso SSH) y entra a la carpeta del
proyecto.

Dentro de la carpeta del proyecto, ejecuta:
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
php artisan migrate --force --seed
chmod -R 775 storage bootstrap/cache
php artisan optimize

En el .env de produccion configura:
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tudominio.com
DB_DATABASE=... DB_USERNAME=... DB_PASSWORD=...

1

Activa el SSL. En hPanel > Seguridad > SSL instala el certificado gratuito (Let's Encrypt) y fuerza
HTTPS.

2

Programa el scheduler (opcional). Si usas tareas automaticas, agrega un cron que ejecute "php
artisan schedule:run" cada minuto.

3

Prueba el dominio. Abre https://tudominio.com e inicia sesion. Listo: tu SaaS esta en linea.

Hospedaje Pro - Sistema de gestion hotelera SaaS

Pag. 5

Hospedaje Pro

Documentacion del sistema

Sugerencia: manten APP_DEBUG=false en produccion, activa los respaldos automaticos de Hostinger y, tras cada
actualizacion, vuelve a ejecutar "php artisan optimize".

Hospedaje Pro - Sistema de gestion hotelera SaaS

Pag. 6
