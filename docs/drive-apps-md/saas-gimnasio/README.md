# SaaS Gimnasio

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Gimnasio

**PDF:** Manual_GymSaaS_Pro.pdf

---

GymSaaS Pro
Manual del Sistema
Plataforma SaaS de Gestion para Gimnasios

CONTENIDO DE ESTE MANUAL

1. Tecnologia utilizada
2. Funcionalidades del sistema
3. Instalacion en una computadora nueva
4. Hosting web recomendado
5. Despliegue paso a paso en Hostinger

PHP Laravel 10 - MySQL - Junio 2026

GymSaaS Pro

1

Manual del Sistema

Tecnologia utilizada

GymSaaS Pro es una aplicacion web desarrollada con el framework Laravel sobre PHP, con base de datos
MySQL. La interfaz se construye con plantillas Blade y CSS propio (sin frameworks de CSS externos), y
graficos interactivos con Chart.js. La arquitectura es multi-tenant: un mismo sistema atiende a muchos
gimnasios, con los datos de cada uno aislados de forma automatica.
Componente

Tecnologia

Lenguaje backend

PHP 8.1 o superior

Framework

Laravel 10

Base de datos

MySQL 8 / MariaDB 10

Interfaz (frontend)

Blade + HTML5 + CSS personalizado + JavaScript

Graficos / estadisticas

Chart.js 4.4

Iconos y tipografia

Font Awesome 6.5 + fuente Inter (Google Fonts)

Autenticacion

Laravel Auth + Sanctum (doble guard: staff y socios)

Arquitectura

Multi-tenant (aislamiento por gymnasium_id con Global Scope)

Gestor de dependencias

Composer

Servidor de desarrollo

XAMPP / Laragon o "php artisan serve"

GymSaaS Pro - Sistema de gestion para gimnasios

Pagina 1

GymSaaS Pro

Manual del Sistema

Arquitectura general
Usuarios (Navegador web)
Staff - Super Admin - Socios

APLICACION LARAVEL 10 (PHP 8.1+)

Rutas

Middleware

Controladores

Vistas Blade

web.php

Tenant + Auth

+ Modelos

+ Chart.js

Aislamiento multi-tenant por gymnasium_id (Global Scope)

Base de datos MySQL / MariaDB
Datos de todos los gimnasios

GymSaaS Pro - Sistema de gestion para gimnasios

Pagina 2

GymSaaS Pro

2

Manual del Sistema

Funcionalidades del sistema

El sistema cubre tres grandes ambitos: la plataforma SaaS (que tu administras y vendes), la gestion del
gimnasio (lo que usa cada cliente) y el portal del socio. A continuacion el detalle:

+

Plataforma SaaS - Panel Super Admin

• Multi-tenant: cada gimnasio ve unicamente sus propios datos.
• Registro de gimnasios con prueba gratis de 14 dias y landing con precios.
• Dashboard con KPIs, MRR (ingreso recurrente) y crecimiento mensual.
• Gestion de gimnasios: alta, edicion, suspender/activar y "Entrar como" (impersonacion de soporte).
• Planes SaaS, suscripciones y cobros manuales con recibo imprimible.
• Cupones de descuento (porcentaje o monto fijo, vigencia y limite de usos).
• Reportes y analitica financiera con exportacion a CSV.
• Comunicados masivos y bandeja de soporte / tickets.

+

Gestion del Gimnasio - Panel del Administrador

• Dashboard con ingresos, socios activos, clases, asistencia y graficos.
• Socios y membresias: alta, busqueda, estados y vencimientos.
• Planes de membresia y registro de pagos con historial y recibos.
• Clases con horario semanal e inscripcion con control de cupo.
• Entrenadores, asistencia (check-in/out) e inventario con alertas de stock.
• Rutinas de entrenamiento y progreso del socio (medidas + grafico de evolucion).
• Facturacion del propio gimnasio: plan actual, uso vs limites y mejora de plan con cupon.
• Limites por plan, equipo/staff con roles, marca propia (logo + color) y notificaciones.
• Configuracion (moneda, horario) sincronizada y perfil de usuario editable.
• Exportacion a CSV/Excel e impresion de reportes a PDF.

+

Portal del Socio

• Acceso independiente con su propio usuario y contrasena.
• Consulta de su membresia, fecha de vencimiento y estado.
• Visualizacion de su rutina de entrenamiento y sus pagos.
• Auto-inscripcion y cancelacion en clases segun cupo disponible.

GymSaaS Pro - Sistema de gestion para gimnasios

Pagina 3

GymSaaS Pro

3

Manual del Sistema

Instalacion en una computadora nueva

Guia para dejar el sistema funcionando en una PC con Windows desde cero. Se usa XAMPP (o Laragon)
para tener Apache, PHP y MySQL juntos.

Programas a descargar e instalar
Programa

Para que sirve

Donde

XAMPP (PHP 8.1+) o Laragon Servidor local: Apache + PHP + MySQL

apachefriends.org / laragon.org

Composer

Instala las dependencias de Laravel

getcomposer.org

Git (opcional)

Clonar / actualizar el proyecto

git-scm.com

Visual Studio Code (opcional) Editar el codigo

code.visualstudio.com

Configuracion paso a paso
1

Instalar XAMPP y Composer
Descarga e instala XAMPP (incluye Apache, PHP y MySQL) y luego Composer. Acepta las
opciones por defecto.

2

Copiar el proyecto
Coloca la carpeta del sistema en C:\xampp\htdocs\saas_gimnasio (o donde prefieras).

3

Instalar dependencias
Abre una terminal dentro de la carpeta del proyecto y ejecuta:
cd C:\xampp\htdocs\saas_gimnasio
composer install

4

Crear el archivo .env
Copia .env.example a .env y configura la conexion a la base de datos (servidor local: usuario
"root", contrasena vacia).
copy .env.example .env
DB_DATABASE=saas_gimnasio
DB_USERNAME=root
DB_PASSWORD=

5

Generar la llave de la aplicacion
php artisan key:generate

GymSaaS Pro - Sistema de gestion para gimnasios

Pagina 4

GymSaaS Pro

6

7

Manual del Sistema

Crear la base de datos
Inicia Apache y MySQL en XAMPP. Abre http://localhost/phpmyadmin y crea una base llamada
saas_gimnasio.
Importar los scripts SQL en orden
Desde phpMyAdmin (pestana Importar) o por consola, ejecuta en este orden:
mysql -u root saas_gimnasio < database\saas_gimnasio.sql
mysql -u root saas_gimnasio < database\saas_setup.sql
mysql -u root saas_gimnasio < database\saas_features.sql
mysql -u root saas_gimnasio < database\saas_features2.sql
mysql -u root saas_gimnasio < database\saas_features3.sql

8

Enlazar el almacenamiento y arrancar
Crea el enlace de almacenamiento (para los logos) e inicia el servidor:
php artisan storage:link
php artisan serve --port=8080

9

Abrir el sistema
Entra a http://localhost:8080. Accesos demo:
- Super Admin: superadmin@gymsaas.com / password
- Gimnasio (admin): admin@gymsaas.com / password

GymSaaS Pro - Sistema de gestion para gimnasios

Pagina 5

GymSaaS Pro

4

Manual del Sistema

Hosting web recomendado

Para publicar una aplicacion Laravel + MySQL existen varias opciones segun presupuesto y nivel de control.
Comparativa de las mas usadas en 2026:
Opcion

Tipo

Ideal para

Facilidad

Hostinger (recomendado)

Hosting / VPS

Costo bajo y despliegue sencillo

Alta

DigitalOcean + Laravel Forge

VPS gestionado

Mas control y escalabilidad

Media

Laravel Cloud

PaaS (cero devops)

No administrar servidores

Alta

Railway / Render

PaaS

Despliegue rapido desde Git

Alta

Recomendacion: para este proyecto, Hostinger ofrece el mejor equilibrio entre precio y facilidad.
Soporta PHP 8 y Composer, incluye MySQL y phpMyAdmin, instalador automatico y panel hPanel
sencillo. Para mayor trafico, su plan Cloud o un VPS (desde ~5 USD/mes) dan recursos dedicados.

GymSaaS Pro - Sistema de gestion para gimnasios

Pagina 6

GymSaaS Pro

5

Manual del Sistema

Despliegue paso a paso en Hostinger

Pasos para subir el sistema a Hostinger (plan con PHP 8.1+, por ejemplo Premium, Business o Cloud). En
un VPS los pasos de servidor son similares via SSH.

1

2

3

4

5

Contratar el plan y el dominio
Elige un plan de Hostinger con PHP 8.1 o superior. Configura tu dominio o subdominio desde
hPanel.
Crear la base de datos MySQL
En hPanel, Bases de datos MySQL, crea una base y un usuario. Anota nombre de la base,
usuario, contrasena y host; los usaras en el .env.
Subir los archivos del proyecto
Sube el proyecto por Git (hPanel, Git) o comprimido en ZIP via Administrador de archivos / FTP, y
descomprimelo en la carpeta del dominio.
Apuntar el dominio a la carpeta /public
Laravel sirve desde la carpeta public. En hPanel define el Document Root del dominio hacia
.../saas_gimnasio/public. (Alternativa en hosting compartido: mover el contenido de "public" a
"public_html" y ajustar las rutas en index.php.)
Instalar dependencias
Si el plan tiene SSH/Terminal, ejecuta composer install. Si no, sube la carpeta vendor completa
junto
