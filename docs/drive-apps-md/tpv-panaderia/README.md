# TPV PANADERIA

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/FACTURACION DEV/PERÚ - APPS WEBS FACTURACIÓN/TPV PANADERIA

**PDF:** TPV_Panaderia_Documentacion.pdf

---

P
TPV PANADERÍA
Sistema de Punto de Venta
para Panaderías, Pastelerías y Confiterías

Documentación técnica

Tecnologías · Funcionalidades · Instalación · Despliegue
Versión 1.0 · Mayo 2026

Índice
1.

Tecnologías utilizadas

3

2.

Funcionalidades del sistema

4

3.

Instalación en una computadora nueva

7

4.

Hosting web recomendado

11

5.

Guía de despliegue al hosting

13

6.

Credenciales y soporte

16

TPV Panadería · Documentación técnica

Página 1

1. Tecnologías utilizadas
El sistema TPV Panadería se ha desarrollado siguiendo el patrón MVC (Modelo-Vista-Controlador)
sobre un stack moderno, abierto y ampliamente soportado, que permite ejecutarlo tanto en local
como en cualquier servidor de hosting compartido, VPS o servicios cloud.

Backend

PHP
LAR
SQL
COM

PHP 8.2+
Lenguaje de servidor que ejecuta toda la lógica de negocio.

Laravel 11
Framework MVC para gestionar rutas, controladores, ORM, autenticación y migraciones.

MySQL 5.7+ / MariaDB 10.3+
Base de datos relacional para todos los datos del negocio.

Composer
Gestor de dependencias de PHP para instalar Laravel y librerías.

Frontend y vistas

HTM
CSS
JS
ICO

HTML5 + Blade
Sistema de plantillas de Laravel para renderizar las vistas dinámicas.

CSS3 personalizado + Bootstrap 5
Diseño visual con paleta panadería (tonos cálidos, marrones, dorados).

JavaScript ES6 + Chart.js
Gráficos interactivos del dashboard (líneas, donut) y lógica del TPV táctil.

Font Awesome 6
Librería de iconos profesionales para toda la interfaz.

TPV Panadería · Documentación técnica

Página 2

Librerías PHP adicionales
Librería

Función

barryvdh/laravel-dompdf

Generación de PDFs (tickets, facturas, presupuestos, albaranes)

spatie/laravel-permission

Sistema de roles y permisos (admin, encargado, vendedor, obrador)

intervention/image

Tratamiento de imágenes de productos y logo

laravel/tinker

REPL interactivo para depuración

Arquitectura del proyecto
La aplicación sigue la estructura estándar de Laravel y respeta la separación de responsabilidades:
las migraciones definen el esquema de base de datos, los modelos Eloquent encapsulan los datos y
relaciones, los controladores reciben las peticiones HTTP y las vistas Blade renderizan el HTML
final.
Capa

Ubicación

Contenido

Rutas

routes/web.php

Definición de URLs y mapeo a controladores

Controladores

app/Http/Controllers/

16 controladores (TPV, Productos, Stock, etc.)

Modelos

app/Models/

17 modelos Eloquent con relaciones

Migraciones

database/migrations/

13 migraciones que crean todo el esquema

Seeders

database/seeders/

Datos iniciales y de demostración

Vistas

resources/views/

43 plantillas Blade

Estilos

public/assets/css/app.css

Diseño visual del sistema

Storage

storage/app/

Logos, imágenes, backups generados

TPV Panadería · Documentación técnica

Página 3

2. Funcionalidades del sistema
TPV Panadería integra en una sola aplicación todos los procesos de un negocio de panadería,
pastelería o confitería: desde la venta rápida en mostrador hasta la valoración del stock, pasando por
compras a proveedores, fichaje de empleados e informes detallados de gestión.

TPV

Punto de venta táctil

Mostrador rápido con carrito en tiempo real, cobro en efectivo, tarjeta y Bizum, cálculo automático de cambio e impresión

Dashboard ejecutivo

DASH KPIs en tiempo real (ventas del día, ticket medio, stock bajo) con gráficos de líneas y donut por categoría.
Productos elaborados

PROD Catálogo con materias primas, productos elaborados, recetas con ingredientes, formatos y unidades de medida.
STK
DOC

Control de stock
Existencias, movimientos detallados (entrada, salida, merma, ajuste), alertas de reposición y valoración del inventario.

Documentos comerciales
Generación e impresión en PDF de tickets, facturas, presupuestos y albaranes con datos fiscales completos.

Compras a proveedores

COMP Pedidos con líneas dinámicas, recepción automática que incrementa stock y actualiza precios de coste.

TPV Panadería · Documentación técnica

Página 4

INF
HOR
USR
CLI
CFG
BAK

Informes y estadísticas
Reportes de ventas, productos top, márgenes, clientes, valoración de stock y arqueo diario de caja.

Control horario
Fichaje de entrada/salida de empleados con cronómetro en vivo, histórico por persona y rango de fechas.

Usuarios y roles
Sistema multiusuario con 4 roles: administrador, encargado, vendedor y obrador. Permisos diferenciados.

Clientes y proveedores
CRUD completo con historial de compras por cliente, descuentos personalizados y datos fiscales.

Configuración avanzada

Datos de empresa, logo, moneda, símbolo y posición, separadores de miles/decimales, impuestos, series de documento

Backup y mantenimiento

Crear copias de seguridad de toda la base de datos, restaurar desde archivo .sql y resetear el sistema para una empres

Características destacadas
• Interfaz visual moderna con paleta panadería (tonos cálidos y profesionales).
• TPV optimizado para pantalla táctil: ideal para mostrador.
• Multimoneda y multilenguaje configurable: euros, soles, pesos, dólares...
• Búsqueda por código de barras integrada en el TPV.
• Mermas con motivos categorizados (caducidad, rotura, error elaboración).
• Tickets impresos en formato 80mm (impresoras térmicas estándar).
• Generación de PDF profesional para facturas y albaranes.
• Sistema de sesiones de caja con apertura y cierre con arqueo.
• Gráficos interactivos con Chart.js en dashboard e informes.
• Multiempresa: con la opción "Resetear" preparas el sistema para otro negocio.

TPV Panadería · Documentación técnica

Página 5

3. Instalación en una computadora nueva
Esta sección describe paso a paso cómo poner en funcionamiento el sistema en una computadora
completamente nueva sin software previo instalado. Se asume sistema operativo Windows 10/11.
El procedimiento en macOS y Linux es análogo.

3.1 Programas a descargar e instalar
Programa

Versión

Descargar desde

Laragon (incluye PHP, MySQL, Apache, phpMyAdmin)
6.0+

https://laragon.org/download/

Composer (gestor PHP)

2.x

https://getcomposer.org/Composer-Setup.exe

Git (control de versiones)

última

https://git-scm.com/download/win

Visual Studio Code (editor)

última

https://code.visualstudio.com/

Google Chrome o Firefox

última

https://www.google.com/chrome/

Sugerencia: Laragon es un entorno todo-en-uno que ya incluye PHP, MySQL, Apache y phpMyAdmin. Es la forma
más sencilla de levantar el entorno en Windows. Como alternativa puede usarse XAMPP o WAMP.

3.2 Pasos de instalación
1

Instalar Laragon

Descarga Laragon "Full" desde la web oficial. Ejecuta el instalador y acepta las opciones por defecto.
Al terminar, abre Laragon y pulsa el botón Start All: se levantarán los servicios de Apache y MySQL
automáticamente.

2

Instalar Composer

Descarga el instalador Composer-Setup.exe y ejecútalo. Durante la instalación te pedirá la ruta de
PHP; selecciona la que está dentro de Laragon (por ejemplo C:\laragon\bin\php\php-8.2.x\php.exe).

3

Comprobar instalación

Abre la terminal CMD (Win + R → cmd) y ejecuta los siguientes comandos para verificar que todo
está disponible:
php -v
composer -V
mysql --version

4

Copiar el proyecto al servidor

Copia la carpeta completa tpv-panaderia dentro de C:\laragon\www\ (esa es la carpeta donde
Laragon publica los proyectos web).

TPV Panadería · Documentación técnica

Página 6

5

Instalar dependencias de Laravel

Abre CMD dentro de la carpeta del proyecto y ejecuta:
cd C:\laragon\www\tpv-panaderia
composer install
Composer descargará las librerías necesarias. Tardará unos minutos.

TPV Panadería · Documentación técnica

Página 7

6

Crear el archivo de entorno (.env)

Copia .env.example como .env y genera la clave de aplicación:
copy .env.example .env
php artisan key:generate

7

Configurar la base de datos en .env

Abre el archivo .env con VS Code y ajusta las credenciales de MySQL (las que vienen por defecto
en Laragon son usuario root sin contraseña):
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABA
