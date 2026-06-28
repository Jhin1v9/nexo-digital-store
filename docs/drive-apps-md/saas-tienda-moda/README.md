# SaaS Tienda Moda

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Tienda Moda

**PDF:** Manual_SaaS_Tienda_Moda.pdf

---

SaaS Tienda Moda
Sistema de Gestion Multi-Tienda para Moda

Manual Tecnico y Guia de Despliegue
Tecnologia - Funcionalidades - Instalacion
Hosting recomendado - Despliegue paso a paso

Laravel 10 + PHP 8 + MySQL
Documento generado el 6 de junio de 2026

SaaS Tienda Moda | Manual Tecnico

Acerca de este documento
Este manual describe el sistema SaaS Tienda Moda, una aplicacion web de gestion integral para
tiendas de ropa (damas, caballeros y ninos). Incluye la tecnologia con la que fue construido, sus
funcionalidades, la guia para instalarlo en una computadora nueva y las recomendaciones de
hosting con el paso a paso para publicarlo en internet.

1

Tecnologia del sistema

El sistema sigue una arquitectura por capas basada en el framework Laravel (patron MVC). El frontend
se renderiza con plantillas Blade y graficos interactivos; la logica de negocio vive en controladores y
modelos PHP; y los datos se almacenan en una base de datos relacional MySQL con aislamiento
multi-tienda.

CAPA DE PRESENTACION (Frontend)
Blade - HTML5 - CSS3 - JavaScript - Chart.js - Font Awesome

CAPA DE LOGICA (Backend)
PHP 8 - Laravel 10 - Eloquent ORM - Sanctum - Blade Engine

CAPA DE DATOS
MySQL 8 / MariaDB - Migraciones - Multi-tenant (tienda_id)

Componente

Tecnologia

Version / Detalle

Lenguaje

PHP

8.1 o superior (recomendado 8.2 / 8.3)

Framework

Laravel

10.x (patron MVC, Eloquent ORM)

Base de datos

MySQL / MariaDB

MySQL 8 (puerto 3306)

Plantillas

Blade

Motor de vistas de Laravel

Frontend

HTML5, CSS3, JS

Diseno responsivo propio (sin framework CSS)

Graficos

Chart.js

4.4 (lineas, barras, dona)

Iconos / Fuentes

Font Awesome 6, Poppins

Via CDN

Autenticacion

Laravel Sanctum

Sesiones y tokens

Dependencias

Composer

Gestor de paquetes PHP

SaaS Tienda Moda - Sistema de gestion para tiendas de ropa

Pagina 2

SaaS Tienda Moda | Manual Tecnico

2

Arquitectura Multi-Tenant (SaaS)

Al ser un producto SaaS (Software as a Service), una sola instalacion del sistema atiende a multiples
tiendas a la vez. Cada registro de la base de datos lleva una columna tienda_id y un filtro automatico
garantiza que cada tienda solo acceda a su propia informacion. Un Super Administrador gestiona todas
las tiendas, sus planes y el estado de las suscripciones.

Aplicacion SaaS

Super Admin

Laravel - 1 base de datos

controla todo

Tienda A

Tienda B

Tienda C

Tienda D

datos
aislados

datos
aislados

datos
aislados

datos
aislados

Cada tienda solo ve sus propios datos (aislamiento por columna tienda_id)

Beneficio clave
Con una sola base de codigo y una sola base de datos se administran ilimitadas tiendas, reduciendo costos de
mantenimiento y permitiendo planes de suscripcion (Basico, Pro, Premium).

3

Funcionalidades del sistema

El sistema cubre el ciclo completo de operacion de una tienda de moda, organizado en modulos:

Autenticacion y Onboarding

Dashboard

• Inicio de sesion seguro
• Registro publico de nuevas tiendas
• 15 dias de prueba gratis
• Cierre de sesion

• KPIs: ventas hoy/mes, clientes, stock
• Grafico de ventas (7 dias)
• Ventas por categoria
• Inventario por categoria y metodos de pago

Ventas

Clientes

• Nueva venta (punto de venta)
• Historial de ventas
• Comprobantes (boleta/factura/ticket)
• Anulacion de ventas

• Registro y edicion
• Busqueda y puntos de fidelidad
• Historial de compras

SaaS Tienda Moda - Sistema de gestion para tiendas de ropa

Pagina 3

SaaS Tienda Moda | Manual Tecnico

Catalogo

Inventario

• Productos con variantes (talla/color)
• Categorias por genero
• Marcas

• Control de stock por variante
• Alertas de stock bajo
• Proveedores
• Compras que suman stock

Reportes

Administracion de la tienda

• Reporte de ventas
• Reporte de inventario

• Usuarios y roles del equipo
• Perfil de la tienda (Mi Tienda)
• Configuracion: IGV, moneda, series

Suscripcion y Planes

Panel Super-Admin

• Planes Basico / Pro / Premium
• Limites por plan (productos, usuarios)
• Estado y vencimiento

• Metricas globales de la plataforma
• Gestion de tiendas (suspender/activar)
• Gestion de planes y precios
• Perfil del super administrador

Diseno responsivo
Toda la interfaz se adapta automaticamente a computadoras, tabletas y celulares. En pantallas pequenas el
menu lateral se convierte en un menu deslizable con boton hamburguesa.

SaaS Tienda Moda - Sistema de gestion para tiendas de ropa

Pagina 4

SaaS Tienda Moda | Manual Tecnico

4

Instalacion en una computadora nueva (Windows)

La forma mas sencilla de ejecutar el sistema en local es con Laragon, que ya incluye Apache, PHP,
MySQL y Composer en un solo instalador. A continuacion, los programas necesarios y el procedimiento.

Programas a descargar e instalar
Programa

Para que sirve

Donde descargar

Laragon (Full)

Servidor local: Apache + PHP 8 + MySQL +
Composer

laragon.org

PHP 8.1+

Lenguaje (incluido en Laragon)

php.net (si se instala aparte)

Composer

Instala las dependencias de Laravel

getcomposer.org

MySQL / HeidiSQL

Base de datos (incluida en Laragon)

incluido en Laragon

Git (opcional)

Clonar y versionar el proyecto

git-scm.com

VS Code (opcional)

Editor de codigo

code.visualstudio.com

Procedimiento paso a paso
1

Instalar Laragon

2

Copiar el proyecto

3

Crear la base de datos

4

Configurar el archivo .env

5

Instalar dependencias

6

Generar la clave de la app

7

Crear tablas y datos de prueba

Descargar "Laragon Full" desde laragon.org e instalarlo con las opciones por defecto. Esto deja listo
Apache, PHP, MySQL y Composer.

Colocar la carpeta del sistema (saas_tienda_moda) dentro de C:\laragon\www\.

Abrir HeidiSQL (boton Database en Laragon) y crear una base de datos vacia llamada
saas_tienda_moda con cotejamiento utf8mb4.

En la raiz del proyecto, abrir el archivo .env y ajustar: DB_DATABASE=saas_tienda_moda,
DB_USERNAME=root y DB_PASSWORD (vacio en Laragon).

Abrir la terminal de Laragon (Menu > Terminal), ubicarse en la carpeta del proyecto y ejecutar:
composer install.

Ejecutar: php artisan key:generate

Ejecutar: php artisan migrate --seed (crea las tablas e inserta datos demo).

SaaS Tienda Moda - Sistema de gestion para tiendas de ropa

Pagina 5

SaaS Tienda Moda | Manual Tecnico

8

Iniciar el servidor

9

Abrir en el navegador

Ejecutar: php artisan serve (o usar el host virtual de Laragon).

Visitar http://127.0.0.1:8000 e iniciar sesion con las credenciales demo.

Credenciales de prueba
Administrador de tienda: admin@tiendamoda.com / admin123 | Super administrador:
superadmin@tiendamoda.com / super123

SaaS Tienda Moda - Sistema de gestion para tiendas de ropa

Pagina 6

SaaS Tienda Moda | Manual Tecnico

5

Hosting web recomendado

Para publicar la aplicacion en internet se necesita un hosting compatible con PHP 8 y MySQL,
idealmente con acceso SSH y Composer. Estas son las opciones mas usadas para proyectos Laravel,
ordenadas de mas simple a mas avanzado:
Hosting

Tipo

Ideal para

Costo aprox.

Hostinger

Compartido /
VPS

Empezar facil y economico

USD 3 - 12 /mes

Cloudways

Cloud gestionado

Crecer sin administrar servidor

desde USD 14 /mes

Laravel Forge +
DigitalOcean

VPS gestionado

Equipos con algo de tecnica

USD 12 + 6 /mes

Laravel Cloud

Plataforma oficial

Cero devops, autoescalable

por uso

Recomendacion
Para este sistema y un primer despliegue, la opcion mas recomendada es Hostinger (plan Premium o
Business): es economico, soporta Laravel, incluye MySQL, SSH, Composer, Git y certificado SSL gratuito, con
un panel (hPanel) sencillo. Si la plataforma crece y necesita colas, escalado o varios servidores, conviene
migrar a Cloudways o Laravel Forge.

SaaS Tienda Moda - Sistema de gestion para tiendas de ropa

Pagina 7

SaaS Tienda Moda | Manual Tecnico

6

Despliegue paso a paso en Hostinger

Guia resumida para subir el sistema a Hostinger usando hPanel, Git/Composer por SSH y apuntando el
dominio a la carpeta public de Laravel.

1

Contratar plan y dominio

2

Crear la base de datos

3

Habilitar acceso SSH

4

Subir el proy
