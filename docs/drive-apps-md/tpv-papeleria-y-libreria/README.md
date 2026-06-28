# TPV Papeleria y Libreria

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/TPV - 2026/TPV Papeleria y Libreria

**PDF:** Manual_TPV_Papeleria_Libreria.pdf

---

MANUAL TECNICO

TPV Papeleria
y Libreria
Software de Punto de Venta
Manual Tecnico y Guia de Instalacion

Documento tecnico del sistema
Tecnologia · Funcionalidades · Instalacion · Hosting
Version 1.0

1

Tecnologia de desarrollo

El sistema es una aplicacion web moderna construida sobre un conjunto de tecnologias
estables, ampliamente utilizadas y de codigo abierto, lo que garantiza fiabilidad, seguridad
y facilidad de mantenimiento.

Arquitectura del sistema
La aplicacion sigue el patron Modelo-Vista-Controlador (MVC) y se organiza en tres capas:
Capa de Presentacion (Frontend)
Blade (motor de plantillas) + Tailwind CSS + Alpine.js + Chart.js para los graficos

Capa de Logica de Negocio (Backend)
PHP 8.2 con el framework Laravel 11 (controladores, modelos Eloquent, rutas)

Capa de Datos (Base de datos)
MySQL / MariaDB - almacenamiento de productos, ventas, clientes, stock, etc.

Componentes y versiones
Componente

Tecnologia

Funcion

Lenguaje

PHP 8.2 o superior

Lenguaje de programacion del servidor

Framework

Laravel 11

Estructura de la aplicacion, seguridad y rutas

Base de datos

MySQL 8 / MariaDB 10

Almacenamiento de toda la informacion

Vistas

Blade

Generacion de las paginas HTML

Estilos

Tailwind CSS 3

Diseno visual de la interfaz

Interactividad

Alpine.js

Comportamiento dinamico sin recargar pagina

Graficos

Chart.js 4

Graficos estadisticos del panel

Dependencias

Composer

Gestor de paquetes de PHP

Servidor web

Apache / Nginx

Publicacion de la aplicacion

Ventaja: los estilos (Tailwind CSS) se cargan mediante CDN, por lo que el sistema NO requiere
compilar archivos con Node.js / npm. Esto simplifica enormemente la instalacion y el despliegue.

Caracteristicas tecnicas destacadas
Autenticacion de usuarios con roles (Administrador y Vendedor).
Proteccion contra ataques CSRF, inyeccion SQL y XSS, incluida en Laravel.
Base de datos relacional con integridad referencial (claves foraneas).

TPV Papeleria y Libreria · Manual Tecnico

Pag. 2 / 9

Modulo de copia de seguridad y restauracion integrado.
Interfaz responsiva, adaptable a pantallas de escritorio y tablet.

TPV Papeleria y Libreria · Manual Tecnico

Pag. 3 / 9

2

Funcionalidades del sistema

TPV Papeleria y Libreria centraliza toda la gestion del negocio en una sola aplicacion:
ventas, inventario, catalogo, clientes, proveedores, informes y mucho mas.
💳

🧾

Punto de Venta (TPV)

Ventas y Tickets

Venta rapida en mostrador, busqueda por nombre

Listado de ventas con filtros por fecha y tipo,

o codigo de barras, carrito, descuentos, cobro en

detalle de cada venta, reimpresion de tickets y

efectivo, tarjeta o mixto, y ticket imprimible.

anulacion con devolucion de stock.

📚

📦

Catalogo y Referencias

Stock e Inventario

Gestion de productos, familias, editoriales,

Control de existencias, stock minimo, avisos de

autores y generos. Organizacion de libros,

reposicion, ajustes de inventario e historial

papeleria y material escolar.

completo de movimientos.

👥

🚚

Clientes y Fidelizacion

Proveedores y Compras

Fichas de clientes, historial de compras, puntos de

Gestion de proveedores y pedidos de compra, con

fidelizacion, descuentos personalizados y vales.

recepcion de mercancia que actualiza el stock
automaticamente.

📝

🎫

Apartados y Encargos

Vales y Promociones

Registro de encargos de libros y reservas de

Emision de tarjetas regalo y vales descuento, y

articulos, con senal o anticipo y seguimiento de

campanas promocionales por porcentaje, importe

estado.

o 2x1.

💰

📊

Arqueo de Caja

Informes y Estadisticas

Apertura y cierre de caja, entradas y salidas de

Panel con graficos de ventas, productos mas

efectivo, y calculo automatico de descuadres.

vendidos, ventas por familia y evolucion mensual
del negocio.

⚙

💾

Configuracion

Copia de Seguridad

Datos de la empresa, logo, simbolo de moneda,

Creacion, descarga y restauracion de copias de

separadores de decimales y miles, IVA y diseno

seguridad, y reinicio del sistema para una

del ticket.

empresa nueva.

Roles de usuario: el Administrador tiene acceso completo, incluida la configuracion y
las copias de seguridad. El Vendedor accede al dia a dia: ventas, catalogo, clientes, stock
e informes.

TPV Papeleria y Libreria · Manual Tecnico

Pag. 4 / 9

3

Instalacion en una computadora nueva

Esta guia explica que programas descargar e instalar y como dejar el sistema funcionando
en un equipo con Windows, paso a paso.

A. Programas necesarios (descargar e instalar)
Programa

Para que sirve

Donde descargarlo

XAMPP

Incluye PHP 8.2, MySQL/MariaDB y Apache en un solo

www.apachefriends.org

instalador
Composer

Gestor de dependencias de PHP (instala las librerias del

getcomposer.org

sistema)
Navegador

Para usar la aplicacion (Chrome, Edge o Firefox)

Ya incluido en Windows

web

Alternativa recomendada: en lugar de XAMPP puede usar Laragon (laragon.org), un entorno mas
moderno y ligero que tambien incluye PHP, MySQL y Apache, y facilita el manejo de proyectos
Laravel.

B. Configuracion paso a paso
1

Instalar XAMPP
Descargue XAMPP con PHP 8.2 o superior, ejecute el instalador y acepte las opciones por
defecto. Al terminar, abra el "Panel de Control de XAMPP".

2

Iniciar los servicios
En el panel de XAMPP, pulse "Start" en los modulos Apache y MySQL. Ambos deben quedar en
color verde.

3

Instalar Composer
Descargue e instale Composer. Durante la instalacion, cuando le pida la ruta de PHP, indique
C:\xampp\php\php.exe . Acepte el resto de opciones.

4

Copiar el proyecto
Copie la carpeta completa del sistema (por ejemplo a C:\TVP\tpv-papeleria-libreria ).

5

Crear la base de datos
Abra el navegador en http://localhost/phpmyadmin , pulse "Nueva" y cree una base de datos
llamada tpv_papeleria_libreria con cotejamiento utf8mb4_unicode_ci .

6

Configurar el archivo .env
En la carpeta del proyecto, abra el archivo .env con el Bloc de notas y verifique los datos de
conexion (usuario root y contrasena vacia es lo habitual en XAMPP):

DB_CONNECTION=mysql
DB_HOST=localhost

TPV Papeleria y Libreria · Manual Tecnico

Pag. 5 / 9

DB_PORT=3306
DB_DATABASE=tpv_papeleria_libreria
DB_USERNAME=root
DB_PASSWORD=

7

Abrir la terminal en la carpeta del proyecto
Dentro de la carpeta del proyecto, mantenga pulsada la tecla Mayus, haga clic derecho y elija
"Abrir ventana de PowerShell aqui" (o use CMD).

8

Instalar las dependencias y preparar el sistema
Ejecute los siguientes comandos, uno por uno, esperando a que cada uno termine:

$ composer install # instala las librerias
$ php artisan key:generate # genera la clave de seguridad
$ php artisan migrate # crea las tablas en la BD
$ php artisan db:seed # carga datos iniciales
$ php artisan storage:link # enlace para imagenes

9

Arrancar la aplicacion
Ejecute el siguiente comando. Deje esta ventana abierta mientras use el sistema:

$ php artisan serve

10

Acceder al sistema
Abra el navegador en http://localhost:8000 e inicie sesion con el usuario administrador.

Acceso inicial: Usuario admin@tpv.local

· Contrasena admin123 . Se recomienda cambiar la

contrasena tras el primer acceso.

Si desea datos de ejemplo para ver los graficos del panel con informacion, ejecute ademas: php
artisan db:seed --class=DatosDemoSeeder

TPV Papeleria y Libreria · Manual Tecnico

Pag. 6 / 9

4

Hosting web sugerido

Para publicar la aplicacion en Internet y que sea accesible desde cualquier lugar, se
necesita un servicio de hosting compatible con PHP 8.2 y base de datos MySQL. A
continuacion se comparan las opciones mas adecuadas.
Opcion

Tipo

Ventajas

Ideal para

Hostinger

Hosting

Economico, panel sencillo en

Pequeno y mediano

compartido

espanol, PHP 8.2 y MySQL

negocio. Mejor relacion

(cPanel/hPanel)

incluidos, soporte 24/7

calidad-precio.

Hosting

Muy buen rendimiento y

Quien prioriza rendimiento

compartido

soporte, optimizado para PHP

y soporte premium.

Servidor virtual

Control total del servidor, muy

Usuarios con conocimientos

(VPS)

escalable
