# TPV Peluquería

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/TPV - 2026/TPV Peluquería

**PDF:** TPV_Peluqueria_Manual.pdf

---

T
TPV Peluquería
Sistema de gestión integral para
peluquerías, barberías y salones de belleza

Manual técnico completo
Tecnología · Instalación · Despliegue en hosting

Versión 1.0 · Documento generado para puesta en producción
Laravel 11 · MySQL · Bootstrap 5

TPV PELUQUERÍA

Manual de instalación y uso

1. Tecnologías utilizadas
</>
Stack tecnológico moderno y robusto
TPV Peluquería ha sido desarrollado con un stack profesional, escalable y ampliamente soportado
por la comunidad. La elección de cada tecnología responde a criterios de estabilidad, rendimiento
y facilidad de mantenimiento.
Capa

Tecnología

Versión

Función

Lenguaje

PHP

8.2+

Lenguaje principal del servidor

Framework

Laravel

11.x

Framework MVC con Eloquent ORM, Blade y autenticación

Base de datos

MySQL / MariaDB

5.7+ / 10.3+

Almacenamiento relacional con motor InnoDB

Frontend

Blade + Bootstrap

5.3

Plantillas server-side y diseño responsive

JavaScript

Vanilla + Chart.js

4.4

Gráficos estadísticos del dashboard

Calendario

FullCalendar

6.1

Agenda interactiva con drag & drop

Iconografía

Bootstrap Icons

1.11

Más de 1.800 iconos vectoriales

Tipografía

Plus Jakarta Sans

Google Fonts

Fuente moderna y legible

Gestor paquetes

Composer

2.x

Gestión de dependencias PHP

Servidor web

Apache / Nginx

-

Servidor en producción

Sesiones

File / DB

-

Autenticación basada en sesiones de Laravel

Patrón arquitectónico: MVC (Model-View-Controller) con separación clara entre lógica de negocio, acceso
a datos y presentación. Eloquent ORM gestiona las relaciones entre modelos.
Seguridad: protección CSRF en todos los formularios, contraseñas encriptadas con bcrypt, validación de
datos en el servidor, control de acceso por roles y middleware de autenticación.

TPV Peluquería · Sistema de gestión integral

Página 2

TPV PELUQUERÍA

Manual de instalación y uso

2. Funcionalidades
✦
13 módulos integrados en un solo sistema
El sistema cubre todas las áreas de operación de un salón de belleza moderno, desde la gestión
diaria de citas hasta la facturación, pasando por inventario, fidelización y análisis estadístico.

■

€

Dashboard

■

Agenda y citas

KPIs en vivo, gráficos de ventas y

Calendario interactivo con drag & drop por

comparativas mensuales

profesional

TPV / Punto venta

■

Cobro rápido con métodos de pago múltiples

Clientes (CRM)
Ficha completa, historial, fidelización y RGPD

y ticket

■

■

Bonos

✦

Servicios

Plantillas reutilizables y control de sesiones

Catálogo organizado por categorías con

usadas

duración y precio

Productos y stock

★

Inventario con alertas de stock mínimo

Equipo
Empleados con horario, comisiones y color
en agenda

■

Caja diaria

■

Apertura, cierre, descuadre y desglose por

Ventas
Histórico, ticket imprimible y anulaciones

método

■

Informes
Análisis de ventas, clientes, empleados y

■

Configuración
Datos empresa, logo, moneda, IVA y horario

servicios

+ Funcionalidades adicionales del sistema
Sistema de roles: Administrador, Gerente, Empleado y Recepcionista, con permisos
diferenciados.
Backup integrado: generación de copia de seguridad SQL desde la propia interfaz.
Restauración: subida de un archivo .sql para volver a un estado anterior.
Reset del sistema: limpieza de datos operativos manteniendo configuración (útil para nuevas
empresas).
Multi-empresa: arquitectura preparada para gestionar varias empresas en una misma
instalación.

TPV Peluquería · Sistema de gestión integral

Página 3

TPV PELUQUERÍA

Manual de instalación y uso

3. Instalación en una computadora nueva
↓
De cero a sistema funcionando en 15 minutos
Sigue estos pasos en orden. La instalación funciona en Windows, macOS y Linux. Todos los
programas listados son gratuitos y de código abierto.

3.1 Programas a descargar e instalar
Programa

Para qué sirve

Enlace

XAMPP

Paquete con Apache + MySQL + PHP. Forma más rápida de tener todo
apachefriends.org
listo

Composer

Gestor de dependencias PHP requerido por Laravel

getcomposer.org

Node.js (opcional)

Solo si quieres compilar assets propios. No es obligatorio

nodejs.org

Visual Studio Code

Editor de código recomendado para futuras modificaciones

code.visualstudio.com

Git (opcional)

Control de versiones del código

git-scm.com

3.2 Pasos de instalación
1

2

3

4

5

6

Instalar XAMPP
Descarga XAMPP desde apachefriends.org y ejecuta el instalador. Acepta las opciones por
defecto. Al finalizar, abre el Panel de Control de XAMPP y arranca los servicios Apache y
MySQL. Verifica que ambos aparezcan en verde.

Instalar Composer
Descarga el instalador desde getcomposer.org/Composer-Setup.exe (Windows) y ejecútalo.
Cuando pregunte por la ruta de PHP, indica C:\xampp\php\php.exe. Al terminar, abre
PowerShell y ejecuta composer --version para confirmar la instalación.

Copiar el proyecto
Copia la carpeta tpv-peluqueria a C:\TVP\tpv-peluqueria (o donde prefieras). Asegúrate de
que la carpeta tenga permisos de escritura.

Crear la base de datos
Abre tu navegador en http://localhost/phpmyadmin, pulsa Nueva y crea una base de
datos llamada tpv_peluqueria con cotejamiento utf8mb4_unicode_ci.

Configurar el archivo .env
Dentro de la carpeta del proyecto, abre el archivo .env con un editor y verifica que
DB_DATABASE=tpv_peluqueria, DB_USERNAME=root y DB_PASSWORD= (vacío). Si
tu MySQL tiene contraseña, ponla aquí.

Instalar dependencias
Abre PowerShell, navega a la carpeta del proyecto con cd C:\TVP\tpv-peluqueria y ejecuta:

TPV Peluquería · Sistema de gestión integral

Página 4

TPV PELUQUERÍA

Manual de instalación y uso

composer install
php artisan key:generate

7

Crear las tablas y datos demo
Ejecuta el comando que crea todas las tablas y carga los datos de ejemplo:

php artisan migrate --seed
php artisan storage:link

8

Levantar el servidor
Inicia el servidor de desarrollo con:

php artisan serve

Abre tu navegador en http://localhost:8000 y entra con admin@tpv.com / admin1234. ¡Sistema listo!

! Solución de problemas habituales
"could not find driver": activa la extensión pdo_mysql en C:\xampp\php\php.ini
descomentando la línea extension=pdo_mysql.
"419 Page Expired": ejecuta php artisan cache:clear y config:clear.
Imágenes no aparecen: ejecuta php artisan storage:link.
Permisos de escritura: en Linux/Mac ejecuta chmod -R 775 storage bootstrap/cache.

TPV Peluquería · Sistema de gestión integral

Página 5

TPV PELUQUERÍA

Manual de instalación y uso

4. Hostings web recomendados
■
Comparativa para alojar tu aplicación
Laravel necesita un hosting con soporte PHP y MySQL. A continuación te presento los más
recomendados según presupuesto y nivel técnico:
Hosting

Tipo

Precio aprox.

Ideal para

Dificultad

Hostinger

Compartido

€2,99 / mes

Pequeños y medianos negocios. Recomendado.
Fácil ★

SiteGround

Compartido

€3,99 / mes

Buen rendimiento, soporte excelente

A2 Hosting

Compartido

€2,99 / mes

Servidores rápidos optimizados LaravelFácil ★

DigitalOcean

VPS

€5 / mes

Más control, requiere conocimientos Linux
Medio ★★

AWS Lightsail

VPS

€3,50 / mes

Escalable hacia infraestructura AWS

Medio ★★

Forge + DO

VPS gestionado €12 / mes

Despliegue automatizado Laravel

Medio ★★

Heroku

PaaS

Desde €7 / mes

Despliegue desde Git, sin gestión servidor
Fácil ★

Laravel Cloud

PaaS oficial

Variable

Solución oficial Laravel, edge serverless
Fácil ★

Fácil ★

Recomendación: Para la mayoría de peluquerías y barberías la opción ideal es Hostinger, ya que combina
precio bajo, panel sencillo, soporte 24/7 en español y compatibilidad nativa con Laravel.

TPV Peluquería · Sistema de gestión integral

Página 6

TPV PELUQUERÍA

Manual de instalación y uso

5. Subir el sistema a Hostinger
↑
Guía completa de despliegue paso a paso
Esta guía asume que ya has contratado un plan en Hostinger (recomendado: Premium Web
Hosting o superior, que incluye SSH y soporte para Laravel).

5.1 Preparación previa
1

2

3

Contratar plan y dominio
Entra en hostinger.com, contrata un plan Premium o Business y registra (o conect
