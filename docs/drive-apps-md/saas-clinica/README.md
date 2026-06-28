# SaaS Clínica

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Clínica

**PDF:** SaaS_Clinica_Documentacion.pdf

---

SaaS Clinica
Sistema de Gestion Clinica Multi-Clinica
Documentacion Tecnica & Guia de Instalacion y Despliegue

Contenido del documento
1. Tecnologia utilizada
2. Funcionalidades del sistema
3. Instalacion local (paso a paso)
4. Hosting web recomendado
5. Despliegue en el hosting (paso a paso)

Stack: PHP 8.2+ · Laravel 12 · MySQL 8 · Tailwind CSS · Chart.js
Generado en junio de 2026

SaaS Clinica · Documentacion

1

Gestion Clinica

Tecnologia utilizada

El sistema es una aplicacion web desarrollada con el framework Laravel sobre PHP, con base de datos
MySQL. La interfaz usa Blade (motor de plantillas de Laravel) con Tailwind CSS para el diseño y Chart.js
para los graficos. La arquitectura es multi-clinica (multi-tenant) con aislamiento de datos.

Backend

Base de datos

PHP 8.2+ con Laravel 12 (patron MVC, Eloquent ORM,
Artisan).

MySQL 8 (o MariaDB). Sesiones, cache y colas en base
de datos.

Frontend

Arquitectura

Blade + Tailwind CSS (via CDN) y Chart.js para
visualizaciones.

Multi-tenant con global scopes, roles y permisos, soft
deletes, auditoria.

Automatizacion

Seguridad

Comandos Artisan + Scheduler (recordatorios),
exportacion CSV, PDF imprimible.

Login propio, recuperacion de contrasena, control de
acceso por rol.

Arquitectura general
Navegador

Laravel 12

MySQL 8

Usuario / Paciente

Blade · Controllers

Base de datos

Capa de aplicacion (MVC) · Multi-tenant · Roles · Auditoria

SaaS Clinica — PHP/Laravel + MySQL

Tailwind CSS

Chart.js

Artisan + Scheduler

Soft Deletes

Pagina 2

SaaS Clinica · Documentacion

2

Gestion Clinica

Funcionalidades del sistema

El sistema cubre la operacion completa de una clinica y ademas incorpora una capa SaaS para administrar
multiples clinicas desde un panel de Super Administrador.

Gestion Clinica
Citas y Agenda

Pacientes

Lista y vista de calendario mensual, estados, validacion
anti doble-reserva, recordatorios por email y filtros.

Ficha completa, historial de citas, busqueda y
exportacion a CSV.

Medicos

Especialidades

Profesionales, especialidad, horarios y estado.

Catalogo con tarifas y colores.

Historias Clinicas

Recetas

Signos vitales, IMC, diagnostico, tratamiento y archivos
adjuntos.

Emision con varios medicamentos y receta imprimible.

Laboratorio
Ordenes de examen con resultados y orden imprimible.

Administracion y Sistema
Facturacion y Pagos

Farmacia e Inventario

Facturas con items, descuentos, estados, cobro y
comprobante imprimible.

Stock, minimos, movimientos (entradas/salidas) y
alertas.

Reportes

Usuarios y Roles

Indicadores y graficos por periodo, con exportacion
CSV.

Admin, medico, recepcion, enfermeria con permisos por
modulo.

Configuracion

Auditoria y Papelera

Datos de la clinica y moneda dinamica en todo el
sistema.

Bitacora de acciones y restauracion de registros
eliminados.

Plataforma SaaS (Super Admin)

SaaS Clinica — PHP/Laravel + MySQL

Pagina 3

SaaS Clinica · Documentacion

Gestion Clinica

Clinicas (tenants)

Planes y Suscripciones

Alta con aprovisionamiento del administrador, estado y
datos aislados.

Catalogo de planes, suscripciones y calculo de MRR.

Dashboard global

Landing + Auto-registro

Metricas de toda la plataforma y reportes globales.

Pagina publica con planes; una clinica se registra sola
(prueba 14 dias).

Impersonacion

Notificaciones in-app

El super admin puede entrar a cualquier clinica y volver.

Alertas de citas, recordatorios y stock en la campana.

SaaS Clinica — PHP/Laravel + MySQL

Pagina 4

SaaS Clinica · Documentacion

3

Gestion Clinica

Instalacion en una computadora nueva

Guia para dejar el sistema funcionando en una PC con Windows. Se usa XAMPP (incluye Apache, PHP y
MySQL) y Composer. No se necesita Node.js porque Tailwind y Chart.js se cargan por CDN.

A. Programas a descargar e instalar
XAMPP

Composer

Paquete con PHP 8.2+, MySQL y Apache. Descargar de
apachefriends.org e instalar.

Gestor de dependencias de PHP. Descargar de
getcomposer.org (Composer-Setup.exe).

Visual Studio Code

Git

Editor de codigo (opcional, recomendado).
code.visualstudio.com

Control de versiones (opcional, para clonar/actualizar).
git-scm.com

B. Puesta en marcha (paso a paso)
1

Instalar XAMPP y abrir el panel de control
Inicia los modulos Apache y MySQL (boton Start en ambos).

2

Instalar Composer
Ejecuta Composer-Setup.exe; cuando pida el PHP, apunta a C:\xampp\php\php.exe.

3

Copiar el proyecto
Coloca la carpeta saas_clinica en una ruta de trabajo (por ejemplo C:\SAAS\saas_clinica).

4

5

Crear la base de datos
Abre http://localhost/phpmyadmin, crea una base llamada saas_clinica (cotejamiento
utf8mb4_unicode_ci).
Configurar el archivo .env
Copia .env.example a .env y ajusta: DB_DATABASE=saas_clinica, DB_USERNAME=root,
DB_PASSWORD= (vacio).

6

Instalar dependencias
En la carpeta del proyecto ejecuta los comandos del recuadro inferior.

7

Preparar la aplicacion
Genera la clave, ejecuta migraciones con datos de ejemplo y enlaza el almacenamiento.

8

Iniciar el servidor
Ejecuta php artisan serve y abre http://localhost:8000 en el navegador.

cd C:\SAAS\saas_clinica
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve

SaaS Clinica — PHP/Laravel + MySQL

Pagina 5

SaaS Clinica · Documentacion

Gestion Clinica

Cuentas de prueba (contrasena: password)
Super Admin: superadmin@saas.test · Administrador: admin@clinica.test
Medico: medico@clinica.test · Recepcion: recepcion@clinica.test

4

Hosting web recomendado

Una aplicacion Laravel necesita un hosting que permita PHP 8.2+, Composer y acceso por consola (SSH).
Estas son las mejores opciones en 2026, de mayor a menor facilidad de gestion:
Opcion

Tipo

Ideal para

Costo aprox.

Dificultad

Laravel Cloud

Plataforma oficial
gestionada

Produccion sin devops,
escalado automatico

Gratis / desde
~US$20 mes

Baja

Hostinger
(VPS/Cloud)

VPS / Hosting con SSH

Bajo costo, popular en LatAm

Desde ~US$5-12
mes

Media

Laravel Forge + VPS

Gestor sobre
DigitalOcean/Hetzner

Control total, equipos tecnicos

US$12 Forge +
VPS

Media-alta

Cloudways

Cloud gestionado

Equilibrio entre control y
simplicidad

Desde ~US$11
mes

Media

Recomendacion
Para la mejor experiencia sin administrar servidores, la opcion mas recomendada es Laravel Cloud (de los
creadores de Laravel). Sin embargo, por su bajo costo, popularidad y facilidad para subir el proyecto, para este
caso recomendamos Hostinger (plan VPS o Cloud Hosting con acceso SSH). El paso a paso siguiente esta basado
en Hostinger.

SaaS Clinica — PHP/Laravel + MySQL

Pagina 6

SaaS Clinica · Documentacion

5

Gestion Clinica

Desplegar en Hostinger (paso a paso)

Pasos para publicar el sistema en un plan VPS o Cloud Hosting de Hostinger con acceso SSH. El objetivo
es que el dominio apunte a la carpeta public de Laravel.

1
2

Contratar el plan y el dominio
En hostinger.com elige un plan con soporte Laravel/PHP 8.2 y SSH. Asocia tu dominio.
Acceder por SSH
Desde hPanel > VPS/Hosting > Avanzado > Acceso SSH. Conectate con la terminal del navegador o
PuTTY.

3

Verificar PHP y Composer
Confirma php -v (8.2+) y composer --version. Hostinger ya los incluye.

4

Subir el proyecto
Sube el codigo por Git (git clone) o por el Administrador de Archivos / FTP. Evita subir la carpeta vendor.

5

Crear la base de datos MySQL
En hPanel > Bases de datos MySQL crea la base, el usuario y la contrasena.

6

Configurar el .env de produccion
Ajusta APP_ENV=production, APP_DEBUG=false, APP_URL=tu dominio y las credenciales de la base.

7

Instalar dependencias y preparar
Ejecuta los comandos del recuadro: install en modo produccion, key, migraciones y enlace de storage.

8

Apuntar el dominio a /public
En la configuracion del dominio define la raiz (document root) hacia la carpeta public del proyecto.

9

Activar HTTPS y el cron
Habilita el certificado SSL gratuito y agrega el cron del scheduler (recuadro inferior).

# En la carpeta del proyecto (por SSH):
composer install --no-dev --optimize-a
