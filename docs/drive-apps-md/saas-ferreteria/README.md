# SaaS Ferretería

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Ferretería/SaaS Ferretería

**PDF:** FerreMax_SaaS_Documentacion.pdf

---

FM

FerreMax SaaS
Sistema de Gestion para Ferreterias
Documentacion tecnica · Instalacion · Despliegue

1 · Tecnologia de desarrollo

2 · Funcionalidades del sistema

3 · Instalacion en una PC nueva

4 · Hosting web recomendado

5 · Despliegue paso a paso en Hostinger

6 · Recomendaciones finales

PHP 8.2 · Laravel 11 · MySQL · Blade + Tailwind · Chart.js
Datsoft · Junio 2026

FM

Documentacion tecnica

FerreMax SaaS

Resumen del sistema
FerreMax es una aplicacion web SaaS multi-empresa para la gestion integral de ferreterias: ventas en
punto de venta, inventario, compras, caja, cuentas por cobrar y pagar, reportes y un panel de super
administrador para operar toda la plataforma. Cada ferreteria (tenant) trabaja con sus datos
completamente aislados de las demas. Este documento describe la tecnologia, las funcionalidades, y
como instalar y publicar el sistema en internet.

1

Tecnologia de desarrollo

El sistema esta construido sobre PHP 8.2+ con el framework Laravel 11 (arquitectura MVC) y base de datos
MySQL. La interfaz usa plantillas Blade con Tailwind CSS y graficas con Chart.js. La multi-empresa se logra
con un global scope por empresa_id.
Backend

Base de datos

PHP 8.2+ y Laravel 11 (rutas, controladores, Eloquent ORM,
middleware, migraciones y seeders).

MySQL 8 con 19 tablas. Arrancable con datos de
demostracion (seeders).

Frontend

Arquitectura

Blade + Tailwind CSS (via CDN), Chart.js para graficas y
tipografia Inter.

Multi-tenant: cada empresa aislada por empresa_id; el Super
Admin queda fuera del scope.

Seguridad / roles

Entorno local

Autenticacion Laravel y roles: superadmin, admin, vendedor,
almacenero, cajero.

Laragon (Apache + MySQL + PHP) y Composer como gestor
de dependencias.

Arquitectura general

Navegador · Usuarios de la ferreteria
HTTPS

Aplicacion Laravel 11 (PHP 8.2+)

Rutas / Controladores

Vistas Blade + Tailwind

Middleware: auth · superadmin · tenant

Eloquent ORM

MySQL · 19 tablas · multi-tenant (empresa_id)

Cada ferreteria ve solo sus datos · el Super Admin administra todas

FerreMax SaaS — Sistema de Gestion para Ferreterias

Pagina 1

FM

Documentacion tecnica

FerreMax SaaS

2

Funcionalidades del sistema

Modulos de la ferreteria (cada empresa)
Autenticacion y multi-empresa

Dashboard

Login, registro self-service de ferreterias y aislamiento total
de datos por empresa.

KPIs de ventas, graficas de 7 dias y 6 meses, top de
productos y alertas de stock bajo.

Punto de Venta (POS)

Ventas

Carrito, lectura de codigo de barras, descuentos, stock en
vivo, atajos y ticket 80mm.

Historial con filtros, detalle, y anulacion con devolucion
automatica de stock.

Cotizaciones

Caja

Creacion, impresion y conversion directa a venta.

Apertura, cierre y arqueo con diferencia en vivo.

Inventario / Kardex

Compras

Movimientos de entrada/salida, ajustes manuales y
catalogos (categorias, marcas, unidades).

Registro con ingreso a stock, actualizacion de costos y
anulacion.

Cuentas por Cobrar / Pagar

Clientes y Proveedores

Ventas y compras a credito, abonos parciales, vencimientos
y estado de cuenta.

CRUD completo con historial de operaciones.

Reportes

Usuarios y configuracion

Ventas, utilidad, productos top, graficas y exportacion a
CSV.

Gestion de usuarios/roles y ajustes de moneda e impuesto
por empresa.

Panel Super Admin (control de la plataforma)
Metricas globales y MRR

Gestion de ferreterias

Total de ferreterias, usuarios, ventas globales e ingreso
recurrente mensual estimado.

Crear, editar, ver detalle y suspender/reactivar cada tenant.

Usuarios globales

Impersonacion

Ver, activar/desactivar y resetear contrasenas de cualquier
empresa.

Entrar como administrador de una ferreteria para dar
soporte, con retorno al panel.

Planes y precios

Facturacion de suscripcion

Catalogo Basico / Pro / Premium con MRR por plan.

Pagos de plan, renovacion de vencimiento, morosos y limites
por plan con bloqueo.

FerreMax SaaS — Sistema de Gestion para Ferreterias

Pagina 2

FM

Documentacion tecnica

FerreMax SaaS

Instalacion en una computadora nueva

3

Guia para Windows usando Laragon, que ya incluye Apache, MySQL, PHP y Composer en un solo
instalador.

Programas a descargar e instalar
Programa

Para que sirve

Descarga

Laragon (Full)

Servidor local: Apache + MySQL + PHP 8.2 + Composer

laragon.org

Composer

Gestor de dependencias (incluido en Laragon)

getcomposer.org

Git (opcional)

Clonar el proyecto y control de versiones

git-scm.com

VS Code (opcional)

Editor de codigo

code.visualstudio.com

HeidiSQL (incluido)

Administrar la base de datos MySQL

incluido en Laragon

Pasos de configuracion
1
2
3
4
5
6
7
8
9
10

Instala Laragon Full y abrelo. Pulsa Start All para encender Apache y MySQL.
Verifica PHP 8.2: menu Laragon > PHP > Version. Selecciona 8.2 o superior.
Coloca el proyecto en C:\laragon\www\saas_ferreteria (o usa tu carpeta actual
C:\SAAS\saas_ferreteria).
Abre la terminal con Laragon > Terminal y entra a la carpeta del proyecto.
Instala dependencias: composer install
Crea el archivo de entorno: copy .env.example .env y luego php artisan key:generate
Edita el .env: DB_DATABASE=saas_ferreteria, DB_USERNAME=root, DB_PASSWORD= (vacio).
Crea la base de datos: mysql -u root -e "CREATE DATABASE saas_ferreteria CHARACTER
SET utf8mb4;" (o desde HeidiSQL).
Crea las tablas con datos demo: php artisan migrate --seed
Inicia el servidor: php artisan serve y abre http://localhost:8000

Credenciales de demostracion
Perfil

Correo

Contrasena

Super Admin (plataforma)

superadmin@ferremax.com

super123

Administrador (ferreteria demo)

admin@ferremax.com

admin123

Vendedor

vendedor@ferremax.com

vendedor123

FerreMax SaaS — Sistema de Gestion para Ferreterias

Pagina 3

FM

Documentacion tecnica

FerreMax SaaS

4

Hosting web recomendado

Para publicar la aplicacion en internet existen varias opciones segun presupuesto y conocimientos. Para una
ferreteria que recien empieza, lo mas recomendado por facilidad y precio es Hostinger (panel hPanel en
espanol, soporte en Latinoamerica, SSL gratis e instalacion sencilla).
Proveedor

Tipo

Precio aprox.*

Ideal para

Dificultad

Hostinger
(recomendado)

Compartido / Cloud /
VPS

desde ~$8.99/mes

Empezar rapido y barato

Baja

Laravel Cloud

Plataforma oficial
(PaaS)

Pago por uso

Cero administracion de
servidor

Baja-Media

DigitalOcean + Forge

VPS gestionado con
Forge

~$4 droplet + ~$12
Forge

Mas control y escalabilidad

Media

Cloudways

Cloud gestionado

desde ~$14/mes

Rendimiento gestionado

Media

SiteGround

Compartido

desde ~$6.69/mes

Sitios pequenos

Baja

*Precios referenciales de junio 2026; verifica el valor vigente en cada proveedor.

Recomendacion: si quieres simplicidad maxima y costo bajo, contrata Hostinger (plan Business o Cloud
Startup). Si prefieres no administrar nada del servidor, Laravel Cloud es la opcion oficial. Si necesitas mas
control y crecimiento, usa DigitalOcean + Laravel Forge.

FerreMax SaaS — Sistema de Gestion para Ferreterias

Pagina 4

FM

5

1
2
3

Documentacion tecnica

FerreMax SaaS

Despliegue paso a paso en Hostinger

1

2

3

4

Proyecto local
Laravel listo y probado

Subir al hosting

Hostinger

Dominio + SSL

Git o FTP (FileZilla)

hPanel: PHP, MySQL, public_html

Online con HTTPS

Contrata un plan en hostinger.com (Premium, Business o Cloud) y asocia o registra tu dominio.
En hPanel entra a PHP Configuration y selecciona PHP 8.2 o superior.
Crea la base de datos en hPanel > Bases de datos MySQL: anota nombre, usuario, contrasena y host.

4

Sube el proyecto: opcion A) Git (recomendado) desde hPanel > GIT, u opcion B) FTP con FileZilla /
Administrador de archivos.

5

Estructura recomendada: coloca el proyecto Laravel fuera de public_html y deja que public_html
apunte a la carpeta /public del proyecto (o ajusta el document root del dominio a /public).

6

Instala dependencias por SSH: composer install --optimize-autoloader --no-dev (si no hay
SSH, sube la carpeta vendor desde tu PC).

7

Crea el .env en el
