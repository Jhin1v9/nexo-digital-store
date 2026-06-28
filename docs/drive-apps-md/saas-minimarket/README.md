# SaaS Minimarket

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Minimarket

**PDF:** MANUAL~1.PDF

---

SISTEMA DE PUNTO DE VENTA · SaaS

Mi Minimarket
Manual técnico del sistema: tecnologías, funcionalidades,
instalación local y guía de despliegue en hosting web.
Laravel 11

PHP 8.2+

MySQL

Multi-empresa (SaaS)

Documento técnico · Junio 2026 · Versión 1.0

Tailwind CSS

CONTENIDO

Índice del documento
1

Tecnologías con las que fue desarrollado

2

Funcionalidades del sistema

3

Instalación en una computadora nueva (entorno local)

4

Hosting web recomendado (comparativa)

5

Guía paso a paso para subirlo a Hostinger

Sobre este sistema: aplicación web tipo SaaS multi-empresa donde cada minimarket administra su propio
inventario, ventas y caja de forma aislada, gestionada desde un panel de super administrador de plataforma.

Sistema SaaS Minimarket · Manual técnico · página 2

CAPÍTULO 1

Tecnologías de desarrollo
El sistema sigue el patrón MVC sobre el framework Laravel, con base de datos relacional MySQL y una
capa de presentación ligera basada en Blade y utilidades CSS por CDN (sin necesidad de compilar con
Node).
Componente

Tecnología

Descripción

Lenguaje backend

PHP 8.2 o superior

Lógica del servidor (probado en PHP 8.3).

Framework

Laravel 11

Rutas, controladores, ORM Eloquent, migraciones y
seguridad.

Base de datos

MySQL 5.7+ / MariaDB

Almacenamiento relacional (BD saas_minimarket).

Motor de vistas

Blade

Plantillas del lado del servidor.

Estilos (UI)

Tailwind CSS (CDN)

Diseño responsivo sin proceso de build.

Gráficos

Chart.js

Gráficos estadísticos (líneas, barras, donas).

Autenticación

Laravel (sesiones)

Login a medida, roles y middleware de acceso.

Dependencias

Composer

Gestor de paquetes PHP.

Arquitectura

SaaS multi-tenant

Una BD con aislamiento por tenant_id.

Características de arquitectura
■ Multi-empresa: cada empresa ve solo sus datos mediante un filtro global automático por tenant.
■ Roles: Administrador, Cajero y Almacén, más el Super Administrador de la plataforma.
■ Planes y suscripciones: límites de productos, usuarios y ventas, con periodo de prueba.
■ Sin Node/Vite: Tailwind y Chart.js por CDN, lo que simplifica el despliegue.

Sistema SaaS Minimarket · Manual técnico · página 3

CAPÍTULO 2

Funcionalidades del sistema
El sistema se divide en dos paneles: el panel del negocio (para cada minimarket) y el panel de
plataforma (super administrador del servicio SaaS).

Panel del negocio (minimarket)
Módulo

Qué permite hacer

Dashboard

Indicadores de ventas del día/mes, productos y clientes, con gráficos de ventas, por
categoría, por día de la semana y por forma de pago.

Punto de Venta (POS)

Registrar ventas, descontar stock, calcular IGV (18%) y elegir forma de pago
(efectivo, tarjeta, Yape, Plin).

Ventas

Historial de comprobantes y ticket imprimible.

Devoluciones

Notas de crédito: reponen stock, registran el movimiento en el kardex y ajustan la
caja.

Compras

Registrar ingresos de mercadería; suma stock y actualiza el costo.

Caja

Apertura y cierre de caja, movimientos de efectivo y arqueo.

Inventario / Control de Stock

Alertas de agotados y bajo mínimo, valor del inventario, kardex de movimientos y
ajustes manuales.

Productos y Categorías

Catálogo con código de barras, costo, precio, stock y stock mínimo.

Promociones

Gestión de promociones y descuentos.

Clientes y Proveedores

Directorios de contactos del negocio.

Reportes

Ventas, utilidad, más vendidos, por categoría, por cajero y por pago. Exporta a Excel
(CSV) e impresión/PDF.

Usuarios

Alta de usuarios y asignación de roles.

Configuración

Datos del negocio, moneda, IGV y pie de ticket.

Backup

Generar, descargar, restaurar y eliminar copias de la base de datos.

Mi Perfil

Editar datos personales y cambiar contraseña.

Panel de plataforma (Super Administrador)
Módulo

Qué permite hacer

Dashboard de plataforma

Métricas globales: empresas activas, en prueba, vencidas e ingresos (MRR), con
gráficos de crecimiento, ingresos por plan, empresas por plan y estado de
suscripciones.

Sistema SaaS Minimarket · Manual técnico · página 4

Módulo

Qué permite hacer

Empresas (tenants)

Listado, edición de plan/estado/vencimiento y eliminación de empresas.

Planes

Crear y editar planes con límites de productos, usuarios y ventas mensuales.

Mi Perfil

Datos y seguridad de la cuenta de super administrador.

Sistema SaaS Minimarket · Manual técnico · página 5

CAPÍTULO 3

Instalación en una computadora nueva
Esta guía instala el sistema en un entorno local (desarrollo o demostración) en Windows: primero PHP,
MySQL y Composer, y luego la puesta en marcha del proyecto.

Programas a descargar e instalar
Programa

Para qué sirve

Dónde obtenerlo

XAMPP

Incluye Apache, PHP 8.2+ y
MySQL/MariaDB

apachefriends.org

Composer

Instalar las dependencias PHP

getcomposer.org

Visual Studio Code

Editor de código (opcional)

code.visualstudio.com

Git

Clonar/actualizar el proyecto (opcional)

git-scm.com

Recomendación: instala XAMPP con PHP 8.2 o superior. Tras instalar Composer, cierra y reabre la terminal para
que reconozca los comandos php y composer.

Puesta en marcha paso a paso
PASO 1 Iniciar los servicios
Abre el Panel de Control de XAMPP y pulsa Start en Apache y MySQL.

PASO 2 Copiar el proyecto
Coloca la carpeta del proyecto en una ubicación de trabajo, por ejemplo C:\\SAAS\\saas_minimarket.

PASO 3 Crear la base de datos
Entra a localhost/phpmyadmin, pulsa Nueva y crea la base de datos saas_minimarket (cotejamiento
utf8mb4_unicode_ci).

PASO 4 Configurar el archivo .env
Copia .env.example a .env y verifica la conexión:
APP_NAME="Mi Minimarket"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=saas_minimarket
DB_USERNAME=root
DB_PASSWORD=

Sistema SaaS Minimarket · Manual técnico · página 6

PASO 5 Instalar dependencias y generar la clave
Abre una terminal dentro de la carpeta del proyecto y ejecuta:
composer install
php artisan key:generate

PASO 6 Crear las tablas y datos demo
Ejecuta las migraciones con los datos de ejemplo (crea productos, ventas, caja, inventario, devoluciones, planes y
cuentas):
php artisan migrate --seed

PASO 7 Levantar el servidor
Inicia el servidor de desarrollo y abre http://127.0.0.1:8000:
php artisan serve

Cuentas de acceso (datos demo)
Rol

Correo

Contraseña

Administrador del minimarket

admin@minimarket.test

password

Cajero

cajero@minimarket.test

password

Super Administrador (plataforma)

superadmin@saas.test

superadmin123

Importante: cambia estas contraseñas antes de usar el sistema en un entorno real o en producción.

Sistema SaaS Minimarket · Manual técnico · página 7

CAPÍTULO 4

Hosting web recomendado
Para una aplicación Laravel + MySQL existen varias opciones según presupuesto y nivel técnico. La
siguiente tabla resume las más usadas en 2026.
Proveedor / tipo

Ideal para

Costo

Notas

Hostinger (Business/Cloud
o VPS) ★

PYMES y proyectos
pequeños-medianos

Bajo

El más recomendado por precio/facilidad:
hPanel, PHP reciente, MySQL, SSH y
dominio incluido.

VPS + Laravel Forge

Apps en crecimiento

Medio

Despliegue automatizado sobre
DigitalOcean/Hetzner/AWS.

Laravel Cloud

Cero administración

Medio

Plataforma oficial gestionada; escalado
automático.

AWS / Google Cloud

Alta escala

Alto

Máxima potencia y control, mayor
complejidad.

Recomendación para este sistema: Hostinger. Para un minimarket o un SaaS en etapa inicial ofrece el mejor
equilibrio entre costo, sencillez y rendimiento. Si esperas mucho tráfico o varias empresas activas, escala a su
plan VPS (más recursos y control total con SSH).

Sistema SaaS Minimarket · Manual técnico · página 8

CAPÍTULO 5

Subir el sistema a Hostinger
Guía paso a paso para publicar el sistema en Hostinger (hosting compartido con hPanel). En planes con
SSH el proceso es aún más simple.

PASO 1 Contratar el plan y conectar el dominio
Activa un plan (Business/Cloud o VPS) y agrega tu dominio desde hPanel. Espera a que el dominio apunte al
servidor.

PASO 2 Preparar el p
