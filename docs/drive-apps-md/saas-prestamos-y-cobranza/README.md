# Saas Préstamos y Cobranza

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/Saas Préstamos y Cobranza

**PDF:** Documentacion_Sistema_Prestamos_Pro.pdf

---

Prestamos Pro - Documentacion Tecnica

SaaS - Laravel 11

Contenido
#

Seccion

Descripcion

1

Tecnologia utilizada

Stack y arquitectura del sistema

2

Funcionalidades

Modulos y capacidades del SaaS

3

Instalacion local

Como ponerlo en marcha en una PC nueva

4

Hosting recomendado

Opciones para publicar la aplicacion

5

Despliegue en Hostinger

Paso a paso para subirlo a produccion

i

Este documento describe el Sistema de Prestamos y Cobranza Pro, una aplicacion web SaaS
para gestionar clientes, prestamos, cuotas, cobranzas, mora y empenos, con panel
administrativo, control de acceso por roles y reportes.

(c) 2026 Sistema de Prestamos y Cobranza Pro

Pagina 2

Prestamos Pro - Documentacion Tecnica

SaaS - Laravel 11

Tecnologia utilizada

1

El sistema esta construido sobre el framework Laravel 11 (PHP) con base de datos MySQL,
siguiendo el patron MVC. El frontend se renderiza en el servidor con plantillas Blade y una
hoja de estilos propia, sin necesidad de compilar assets (no requiere Node.js ni Vite).

Arquitectura general

Componentes del stack
Capa

Tecnologia

Detalle

Lenguaje

PHP 8.2+

Extensiones: pdo_mysql, mbstring, gd, openssl, fileinfo,
tokenizer, xml, ctype, bcmath

Framework

Laravel 11

MVC, Eloquent ORM, Blade, middleware, migraciones y
seeders

Base de
datos

MySQL 5.7+ /
MariaDB

Sesiones, cache y colas configuradas sobre base de datos

Frontend

Blade + CSS3 + JS

Hoja de estilos propia (sin framework CSS), JavaScript vanilla

Librerias
UI

Chart.js - Bootstrap
Icons

Graficos del dashboard e iconografia (CDN); tipografia Inter

Imagenes

Extension GD

Recorte y redimension automatica de fotos de perfil

Dependenc
ias

Composer

Gestor de paquetes PHP

Servidor
web

Apache / Nginx +
PHP-FPM

En local: php artisan serve

O
K

Sin compilacion de assets: al no usar Vite/Node, el despliegue es mas simple: basta con PHP,
Composer y MySQL. Los recursos visuales se sirven estaticos o desde CDN.

(c) 2026 Sistema de Prestamos y Cobranza Pro

Pagina 3

Prestamos Pro - Documentacion Tecnica

2

SaaS - Laravel 11

Funcionalidades del sistema

La plataforma cubre el ciclo completo de credito y cobranza, ademas de administracion,
seguridad y experiencia de usuario.

Seguridad y acceso
@

#

Autenticacion
Inicio de sesion y recuperacion de contrasena

Control de acceso (RBAC)
Permisos por modulo segun el rol

R

=

Roles de usuario
Super Admin, Admin, Gerente, Operador,
Cobrador

Auditoria
Bitacora de todas las acciones del sistema

Gestion comercial
C

=

D

Clientes
Registro e historial crediticio (CRUD)

Pagos / Cuotas
Cronograma y registro de pagos

Empenos
Garantias con valuacion y vencimientos

$

!

*

Prestamos
Calculo automatico de cuotas e intereses

Cobranzas y Mora
Vencimientos y cartera vencida

Estados
Activo, mora, pagado, vigente, etc.

Finanzas, reportes y administracion
B

X

S

Caja
Movimientos de ingresos y egresos

Reportes
Metricas con exportacion a Excel

Panel Super Admin
Metricas globales e info del sistema

V

O

G

Corte de caja
Arqueo y cierre diario

Dashboard
Indicadores y graficos en tiempo real

Configuracion
Parametros del sistema y usuarios

Experiencia de usuario
W

!

M

Landing publica
Pagina de presentacion del producto

Notificaciones
Alertas de cuotas y empenos por vencer

Diseno responsivo
PC, tableta y celular

(c) 2026 Sistema de Prestamos y Cobranza Pro

P

Q

T

Perfil con foto
Avatar subible con recorte/redimension

Busqueda global
Clientes, prestamos y empenos

Tema profesional
Interfaz moderna y consistente

Pagina 4

Prestamos Pro - Documentacion Tecnica

3

SaaS - Laravel 11

Instalacion en una computadora nueva

Programas a descargar e instalar (Windows)
Programa

Para que sirve

Nota

Laragon
(recomendado)

Incluye PHP 8.2+, MySQL, Apache y Composer en un
instalador

laragon.org (version
Full)

XAMPP
(alternativa)

PHP + MySQL + Apache

Requiere instalar
Composer aparte

Composer

Gestor de dependencias PHP

getcomposer.org
(incluido en Laragon)

Git (opcional)

Clonar el proyecto

git-scm.com

VS Code
(opcional)

Editor de codigo

code.visualstudio.co
m

i

Se recomienda Laragon porque ya trae PHP, MySQL y Composer configurados para Laravel en
Windows, evitando instalaciones por separado.

Pasos de instalacion
1

Instalar Laragon
Descarga la version Full desde laragon.org, instalala y pulsa Start All para iniciar Apache y
MySQL.

2

Copiar el proyecto
Coloca la carpeta del sistema en C:\laragon\www\saas_prestamosycobranzas.

3

Abrir terminal en el proyecto
En Laragon: boton Terminal (o clic derecho en la carpeta) dentro del proyecto.

4

Instalar dependencias
Ejecuta Composer para descargar Laravel y sus paquetes.

5

Preparar el entorno
Copia .env.example a .env y genera la clave de la aplicacion.

6

Crear la base de datos
En Laragon - Database crea la BD saas_prestamos_cobranzas con cotejamiento utf8mb4.

7

Configurar credenciales
Edita el .env con tus datos (en Laragon: usuario root y contrasena vacia).

8

Migrar y poblar datos
Crea las tablas y carga datos demo (incluye usuarios de prueba).

9

Enlazar almacenamiento
Crea el enlace publico para servir las imagenes subidas (avatares).

(c) 2026 Sistema de Prestamos y Cobranza Pro

Pagina 5

Prestamos Pro - Documentacion Tecnica

10

SaaS - Laravel 11

Levantar el servidor
Inicia el servidor de desarrollo y abre la aplicacion en el navegador.

Comandos (en la carpeta del proyecto)
composer install
copy .env.example .env # Windows | cp .env.example .env (Linux/Mac)
php artisan key:generate
# Edita .env -> DB_DATABASE, DB_USERNAME=root, DB_PASSWORD=
php artisan migrate --seed
php artisan storage:link
php artisan serve # abrir http://localhost:8000

*

Cuentas demo (contrasena: password): superadmin@prestamospro.test admin@prestamospro.test - cobrador@prestamospro.test. Cambialas antes de produccion.

(c) 2026 Sistema de Prestamos y Cobranza Pro

Pagina 6

Prestamos Pro - Documentacion Tecnica

SaaS - Laravel 11

Hosting web recomendado

4

Al ser una app Laravel + MySQL sin compilacion de assets, puede alojarse en hosting
compartido con soporte Laravel, en un VPS, o en plataformas gestionadas. Opciones
recomendadas:
Opcion

Ideal para

Precio aprox.

Dificult
ad

Hostinger
(recomendado)

Mejor relacion precio/soporte en espanol
(LATAM)

Compartido o
VPS desde
~$6.99/mes

Baja-Med
ia

Laravel Cloud

Despliegue mas facil, gestionado por Laravel

Por uso (escala
a cero)

Muy baja

Laravel Forge +
VPS

Maximo control y mejor precio a escala

Forge + VPS (Di
gitalOcean/Hetz
ner)

Media-Alt
a

Railway / Render

PaaS sencillos, pago por uso

Por uso

Baja

i

Recomendacion: para este proyecto, Hostinger ofrece el mejor equilibrio entre costo, facilidad
y soporte en espanol. Para un despliegue gestionado sin servidor que mantener, Laravel
Cloud es la alternativa mas sencilla.

Compartido o VPS en Hostinger?
Plan

Cuando elegirlo

Compartido
(Business)

Proyectos pequenos/medianos; incluye SSH y Composer; administracion
simple por hPanel

VPS (KVM 2)

Mas trafico/control, acceso root, ideal para produccion seria; ~$6.99/mes

(c) 2026 Sistema de Prestamos y Cobranza Pro

Pagina 7

Prestamos Pro - Documentacion Tecnica

5

SaaS - Laravel 11

Despliegue paso a paso en Hostinger

Flujo general del despliegue

Pasos detallados
1

2

3

4

5

6

Contratar plan y dominio
En hostinger.com elige Business (compartido) o un VPS, asocia tu dominio y activa el SSL
gratuito (Let's Encrypt) desde hPanel.
Crear la base de datos
En hPanel - Bases de datos - MySQL crea la base, el usuario y la contrasena. Anota los
datos para el .env.
Subir el proyecto
Opcion A: hPanel - Avanzado - Git y clona tu repositorio. Opcion B: sube un .ZIP por el
Administrador de archivos o FTP y extraelo.
Apuntar el dominio a /public
Configura el Document Root del dominio hacia la carpeta public del proyecto. En VPS,
ajusta el vhost de Nginx/Apache a /public.
Instalar dependencias
Abre la Terminal SSH (hPanel - Avanzado - SSH), entra a la carpeta y ejecuta Composer en
