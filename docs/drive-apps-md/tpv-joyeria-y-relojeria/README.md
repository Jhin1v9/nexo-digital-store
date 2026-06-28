# TPV Joyería y relojería

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/TPV - 2026/TPV Joyería y relojería

**PDF:** TPV_Joyeria_Documentacion.pdf

---

TPV JOYERIA
y RELOJERIA
Sistema de punto de venta profesional
Para joyerias, relojerias y bisuterias

Ventas y caja registradora
Gestion de reparaciones
Control de stock e inventario
Dashboard con estadisticas
Backup y multi-usuario

DOCUMENTACION TECNICA COMPLETA
Tecnologias - Funcionalidades - Instalacion - Despliegue

TPV Joyeria y Relojeria

Documentacion tecnica

Indice de contenidos
1.

Tecnologias utilizadas

3

2.

Funcionalidades del sistema

4

3.

Instalacion paso a paso en computadora nueva

6

4.

Hosting web recomendado

10

5.

Guia de despliegue al hosting (Hostinger)

11

6.

Recursos y soporte

14

TPV Joyeria y Relojeria - Sistema POS Profesional

Pagina 2

TPV Joyeria y Relojeria

Documentacion tecnica

1. Tecnologias utilizadas
El sistema TPV Joyeria y Relojeria ha sido desarrollado siguiendo las mejores practicas de desarrollo
web actual, con un stack moderno, robusto y ampliamente utilizado en la industria. La arquitectura
MVC (Modelo-Vista-Controlador) facilita el mantenimiento y la escalabilidad.

Capa

Tecnologia

Version

Proposito

Backend

PHP

8.1+

Lenguaje del lado servidor

Framework

Laravel

10.x

Estructura MVC, ORM, rutas, seguridad

Base de datos

MySQL

8.0 / MariaDB 10.4+

Almacenamiento relacional

Autenticacion

Laravel Breeze

1.x

Login, registro, recuperacion

ORM

Eloquent

Laravel 10

Mapeo objeto-relacional

Frontend CSS

Bootstrap

5.3

Sistema de diseño responsive

Iconos

Bootstrap Icons

1.11

Iconografia de la interfaz

Graficos

Chart.js

4.4

Visualizacion de datos en dashboard

Tablas dinamicas DataTables

1.13

Tablas con paginacion y filtros

Selects avanzadosSelect2

4.1

Buscadores con autocompletado

Modales/Alertas

SweetAlert2

11

Notificaciones bonitas

Plantillas

Blade

Laravel 10

Motor de vistas server-side

Idioma

Espanol (es)

-

Localizacion completa

Servidor web

Apache / Nginx

-

Puede usarse php artisan serve

Arquitectura del sistema
El sistema sigue un patron MVC clasico. El navegador del usuario realiza una peticion HTTP al
servidor web (Apache o Nginx). El servidor entrega la peticion a PHP, que con Laravel enruta la
solicitud al controlador adecuado. El controlador consulta la base de datos MySQL mediante el ORM
Eloquent y devuelve los datos a una vista Blade que renderiza el HTML final. El frontend usa
Bootstrap 5 y Chart.js para la presentacion visual y los graficos.

[OK]El proyecto esta listo para produccion: incluye autenticacion, control de stock,
facturacion electronica basica, gestion de taller y modulo de backup integrado.

TPV Joyeria y Relojeria - Sistema POS Profesional

Pagina 3

TPV Joyeria y Relojeria

Documentacion tecnica

2. Funcionalidades del sistema
El sistema integra 15 modulos principales que cubren todas las operaciones diarias de una joyeria o
relojeria: desde la venta en caja hasta la gestion del taller y la analitica del negocio.

Dashboard

TPV / Caja

KPIs en tiempo real, graficos de ventas (12 meses), top
productos, metodos de pago, estado de reparaciones,
alertas de stock.

Pantalla de venta rapida, busqueda por nombre o codigo
de barras, carrito, descuentos, multiples metodos de
pago, tickets y facturas.

Productos

Categorias

Joyas (material, quilates, peso, piedra), relojes (marca,
modelo, movimiento, garantia), bisuteria, accesorios y
servicios.

Clasificacion por tipo (joyeria, relojeria, bisuteria) con
colores e iconos personalizables.

Stock

Clientes

Movimientos (entrada, salida, ajuste, inventario), alertas
de stock bajo, valor del inventario.

Fichas con historial de compras y reparaciones, tipo
(particular, empresa, VIP), descuentos, puntos de
fidelidad.

Proveedores

Ventas

Gestion comercial con datos fiscales, contacto y notas.

Listado con filtros por fecha, tipo y estado. Anulacion con
devolucion automatica al stock.

Tickets/Facturas

Reparaciones

Impresion directa, formato termico y A4, con datos
fiscales y logo.

Flujo de estados (recibido, presupuestado, aprobado, en
taller, listo, entregado). Orden de trabajo imprimible.

Apartados

Reportes

Reservas con abonos parciales, vencimiento y conversion
a venta.

Informes de ventas, inventario, reparaciones y top
clientes.

Usuarios

Configuracion

Roles (administrador, vendedor, tecnico, cajero) con
permisos diferenciados.

Datos empresa, logo, simbolo de moneda, IVA, prefijos
de documentos, terminos legales, tema visual.

Backup/Reset
Copia de seguridad, restauracion desde .sql, reset del
sistema para empresa nueva (con backup automatico).

Caracteristicas destacadas
• Multiidioma y multimoneda: Configurable para Espana (EUR, IVA 21%), Mexico (MXN, IVA
16%), Latinoamerica, etc.
• Multi-usuario con roles: Administrador, vendedor, cajero, tecnico. Cada uno con permisos
diferenciados.

TPV Joyeria y Relojeria - Sistema POS Profesional

Pagina 4

TPV Joyeria y Relojeria

Documentacion tecnica

• Dashboard interactivo: 8 KPIs en tarjetas, 4 graficos en tiempo real (linea, barras, doughnut,
horizontales).
• TPV optimizado: Atajos de teclado, busqueda con escaner, cobro en multiples metodos de
pago.
• Trazabilidad de stock: Cada movimiento queda registrado con usuario, fecha y motivo.
• Documentos profesionales: Tickets para impresora termica y facturas A4 con datos fiscales.
• Sistema de backup: Generacion manual o programada de copias .sql, restauracion y reset
para empresa nueva.
• Diseno responsive: Funciona en escritorio, tablet y movil.

TPV Joyeria y Relojeria - Sistema POS Profesional

Pagina 5

TPV Joyeria y Relojeria

Documentacion tecnica

3. Instalacion paso a paso en computadora
nueva
Esta guia te llevara desde una computadora sin nada instalado hasta tener el sistema TPV
funcionando en local. Tiempo estimado: 30-45 minutos.

Requisitos previos (que descargar)
Antes de comenzar, debes descargar e instalar los siguientes programas. Todos son gratuitos.
Programa

Descripcion

Sitio oficial

Tamano

XAMPP

Paquete con Apache + MySQL + PHP apachefriends.org

~160 MB

Composer

Gestor de dependencias PHP

getcomposer.org

~3 MB

Git (opcional)

Control de versiones

git-scm.com

~60 MB

VS Code

Editor de codigo (opcional)

code.visualstudio.com

~90 MB

Pasos de instalacion
1

Descargar e instalar XAMPP
Visita https://www.apachefriends.org y descarga la version para Windows con PHP 8.1 o
superior.
Ejecuta el instalador. Acepta las opciones por defecto, ten en cuenta:
• Carpeta sugerida: C:\xampp
• Marca al menos: Apache, MySQL y PHP
Al finalizar, abre el XAMPP Control Panel y pulsa Start en Apache y MySQL.

2

Descargar e instalar Composer
Visita https://getcomposer.org/download y descarga Composer-Setup.exe.
Ejecuta el instalador. Cuando pida la ruta de PHP, selecciona:
C:\xampp\php\php.exe

Para verificar que se instalo, abre PowerShell y ejecuta:
composer --version
php --version

TPV Joyeria y Relojeria - Sistema POS Profesional

Pagina 6

TPV Joyeria y Relojeria

3

Documentacion tecnica

Copiar el proyecto a XAMPP
Copia la carpeta completa tpv-joyeria-relojeria dentro de:
C:\xampp\htdocs\tpv-joyeria-relojeria

Si tienes el codigo en otra ruta, simplemente arrastra la carpeta entera.

TPV Joyeria y Relojeria - Sistema POS Profesional

Pagina 7

TPV Joyeria y Relojeria

4

Documentacion tecnica

Instalar dependencias del proyecto
Abre PowerShell en la carpeta del proyecto (Shift + click derecho > Abrir PowerShell aqui) y
ejecuta:
cd C:\xampp\htdocs\tpv-joyeria-relojeria
composer install

Composer descargara automaticamente todas las librerias de Laravel (~150 MB). Tardara 2-5
minutos.

5

Generar la clave de la aplicacion
Esta clave la usa Laravel para encriptar las sesiones de los usuarios:
php artisan key:generate

6

Crear la base de datos en MySQL
Abre tu navegador y visita: http://localhost/phpmyadmin
Haz click en "Nueva" en el menu izquierdo y crea una base de datos:
• Nombre: tpv_joyeria_relojeria
• Cotejamiento: utf8mb4_unicode_ci
Tambien puedes crearla desde la consola con:
CREATE DATABASE tpv_joyeria_relojeria
CHARACTER SET utf8mb4 COLLATE utf8m
