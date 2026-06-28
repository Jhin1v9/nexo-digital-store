# TPV Zapateria

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/TPV - 2026/TPV Zapateria

**PDF:** TPV-Zapateria-Guia.pdf

---

DOCUMENTACIÓN OFICIAL · V1.0.0

TPV Zapatería
Sistema de Punto de Venta para zapaterías y tiendas de
calzado.
Guía de tecnología, funcionalidades, instalación y
publicación en internet.
Laravel 11

PHP 8.2

MySQL

Tailwind CSS

Alpine.js

Chart.js

Preparado para: Chatsito · Documento generado el 31 de mayo de 2026
Contenido: stack tecnológico · módulos · instalación local · hosting recomendado · despliegue paso a
paso

CAPÍTULO 1

🛠 Tecnología con la que se desarrolló
TPV Zapatería es una aplicación web construida sobre el framework Laravel 11 (PHP), con base de
datos MySQL e interfaz moderna con Tailwind CSS y Alpine.js. Sigue el patrón MVC y se renderiza
del lado del servidor con plantillas Blade.

Pila tecnológica (stack)
Capa

Tecnología

Función dentro del sistema

Lenguaje backend

PHP 8.2+

Lógica de negocio del servidor.

Framework

Laravel 11

Rutas, controladores, ORM Eloquent,
seguridad y migraciones.

Base de datos

MySQL 5.7+ / MariaDB 10.3+

Almacena productos, ventas, clientes, stock
y configuración.

Plantillas (vistas)

Blade

HTML dinámico renderizado en el servidor.

Estilos / UI

Tailwind CSS 3.4

Diseño visual, componentes y
responsividad.

Interactividad

Alpine.js 3

Menús, modales y comportamiento ligero en
el navegador.

Gráficos

Chart.js 4

Gráficos estadísticos del dashboard.

Compilación frontend

Vite 5 + Node.js 18+

Empaqueta y optimiza CSS y JavaScript.

PDF / facturas

barryvdh/laravel-dompdf

Generación de tickets y facturas en PDF.

Imágenes

Intervention Image 3

Procesado de logos e imágenes de
producto.

Dependencias

Composer 2 (PHP) · NPM (JS)

Gestión de librerías backend y frontend.

Arquitectura: patrón MVC (Modelo–Vista–Controlador). Los datos se modelan con Eloquent ORM, la estructura
de la base de datos se versiona con migraciones y los datos de ejemplo se cargan con seeders. La
autenticación incluye 3 roles: Administrador, Encargado y Cajero.

TPV Zapatería · Guía técnica y de despliegue

Pág. 2 / 9

CAPÍTULO 2

📦 Funcionalidades del sistema
El sistema cubre toda la operación de una zapatería: venta, catálogo con variantes de talla y color,
control de stock, clientes, proveedores, promociones, reportes y administración.

Módulos principales
Módulo

🏠 Dashboard

Acceso
Todos

Descripción

KPIs (ventas hoy/mes), gráfico de tendencia, distribución por
método de pago, top de productos y alertas de stock bajo.

🛒 Punto de Venta

Todos

Venta rápida con búsqueda por nombre, SKU o código de barras;
cálculo de cambio y multipago.

🧾 Ventas

Todos

Histórico de tickets y facturas con filtros; impresión de
comprobante.

↩ Devoluciones

Todos

Devoluciones y cambios con reposición automática de stock.

👟 Productos

Todos

Catálogo con variantes por talla/color, cada una con su stock y
código de barras; IVA configurable.

📦 Stock

Todos

Inventario, ajustes manuales e histórico de movimientos
(entradas, salidas, ventas, devoluciones).

👥 Clientes

Todos

Ficha completa, historial de compras y puntos de fidelización.

🏭 Proveedores

Todos

Datos de contacto y notas por proveedor.

🏷 Catálogos

Todos

Marcas, categorías, tallas (multitipo), colores y temporadas.

🎁 Promociones

Todos

Descuentos por porcentaje, importe fijo, 2x1 y 3x2, por marca o
categoría.

⚙ Usuarios

Admin

Crear, editar y desactivar usuarios con roles.

🏢 Configuración

Admin

Datos de empresa, logo, moneda (símbolo, posición y
separadores), IVA, prefijos e impresora.

💾 Backup

Admin

Crear, descargar y restaurar copias .sql ; reinicio del sistema
para empresa nueva.

TPV Zapatería · Guía técnica y de despliegue

Pág. 3 / 9

Características destacadas
Tickets y facturas

Variantes talla/color

Numeración automática con prefijos configurables y

Cada producto se desglosa en variantes con stock y

plantilla imprimible (A4 o ticket 80 mm).

código de barras propios.

Multipago

Roles y permisos

Efectivo, tarjeta, transferencia o mixto, con cálculo de

Administrador, Encargado y Cajero con accesos

cambio.

diferenciados.

Dashboard estadístico

Lector de códigos

Gráficos de tendencia y método de pago con Chart.js,

Compatible con lectores USB de código de barras

y KPIs en tiempo real.

directamente en el TPV.

TPV Zapatería · Guía técnica y de despliegue

Pág. 4 / 9

CAPÍTULO 3

💻 Instalación en una computadora nueva
Sigue estos pasos en orden. Primero se instalan los programas base; luego se prepara el proyecto.

A. Programas que debes descargar e instalar
Programa

Para qué sirve

Dónde descargarlo

XAMPP o Laragon

Incluye PHP 8.2+, MySQL y Apache

apachefriends.org / laragon.org

en un solo paquete
Composer 2

Gestor de dependencias de PHP

getcomposer.org/download

(instala Laravel)
Node.js LTS (18+)

Compila el CSS y JavaScript con

nodejs.org

Vite
Editor (opcional)

Para ver o editar el código

Visual Studio Code —
code.visualstudio.com

Recomendado: en Windows, Laragon es la opción más sencilla porque ya trae PHP, MySQL y un terminal listo
para usar.

B. Puesta en marcha paso a paso
1

Instala los programas base (XAMPP/Laragon, Composer y Node.js) y reinicia el equipo si lo
pide.

2

Inicia MySQL desde el panel de XAMPP/Laragon (enciende Apache y MySQL).

3

Copia el proyecto a una carpeta, por ejemplo C:\TVP\tpv-zapateria , y abre un terminal dentro
de ella.

4

Crea la base de datos en phpMyAdmin (http://localhost/phpmyadmin):
CREATE DATABASE tpv_zapateria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

5

Configura el archivo .env con los datos de tu base de datos:

TPV Zapatería · Guía técnica y de despliegue

Pág. 5 / 9

DB_DATABASE=tpv_zapateria
DB_USERNAME=root
DB_PASSWORD=

6

Instala dependencias PHP:
composer install

7

Genera la clave de la aplicación:
php artisan key:generate

8

Crea las tablas y datos demo:
php artisan migrate --seed

9

Crea el enlace al almacenamiento (logos e imágenes):
php artisan storage:link

10

Instala y compila el frontend:
npm install
npm run build

11

Arranca el servidor de desarrollo:
php artisan serve

12

Abre el navegador en http://localhost:8000 e inicia sesión.

Acceso inicial (demo): usuario admin@tpvzapateria.local · contraseña admin123 . Cámbialos en
producción desde Administración → Usuarios.

Problemas comunes: si aparece "Could not find driver", activa pdo_mysql en el php.ini . Si el CSS no
carga, ejecuta npm run build y refresca con Ctrl+F5.

TPV Zapatería · Guía técnica y de despliegue

Pág. 6 / 9

CAPÍTULO 4

☁ ¿Dónde subir tu aplicación web? (hosting)
Una aplicación Laravel necesita un servidor con PHP 8.2+, MySQL y acceso por consola (SSH/
Composer). Estas son las mejores opciones en 2026, según presupuesto y nivel técnico.
Proveedor

Tipo

Ideal para

Notas

Hostinger

Hosting

Mejor relación

Económico, panel sencillo (hPanel), soporta

compartido / VPS

precio-

Composer y SSH. Excelente para empezar.

rendimiento
Laravel Cloud

Plataforma

Cero

Creado por el equipo de Laravel.

gestionada (oficial)

mantenimiento

Despliegue con git push , autoescalado
y colas incluidas.

Laravel Forge +

VPS gestionado

Control total

DigitalOcean
Cloudways

Sevalla / IONOS

La combinación clásica para proyectos
serios; tú controlas el servidor.

Cloud gestionado

Gestionado

Escalar sin

Aprovisiona servidores (DO, Vultr, AWS)

DevOps

con SSL y backups gestionados.

Alternativas

Despliegue amigable, recursos generosos.

simples

⭐ Recomendación para tu caso: Hostinger
Para un sistema de punto de venta de una tienda, Hostinger ofrece el mejor equilibrio entre precio,
facilidad y rendimiento. Su panel hPanel permite crear la base de datos en clics, da acceso SSH y
Composer, e incluye certificado SSL gratuito. Es la opción más accesible para publicar tu aplicación
sin necesidad de administrar un servidor desde cero.
Si más adelante el negocio crece o quieres despliegues automáticos sin mantenimiento, el siguiente paso natural es Laravel
Cloud o Forge + DigitalOcean.

Concepto clave: Laravel usa la carpeta public como punto de entrada, pero el hosting compartido
