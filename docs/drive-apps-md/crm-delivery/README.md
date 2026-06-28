# CRM-DELIVERY

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/PORTAFOLIO APLICACIONES CRM Y ERP - 2026/APLICACIONES CRM Y ERP/CRM-DELIVERY

**PDF:** Manual_CRM_Delivery.pdf

---

CRM DELIVERY
Manual de Sistema y Despliegue

Aplicación web para gestión
de pedidos y delivery

Mayo 2026 — Versión 1.0
Laravel 13 + MySQL + Bootstrap 5

CRM DELIVERY

Manual de Sistema y Despliegue

Tabla de Contenido
1.

Tecnologías utilizadas

3

2.

Funcionalidades del sistema

4

3.

Instalación local paso a paso

6

4.

Hosting recomendado

9

5.

Despliegue en Hostinger

10

6.

Solución de problemas comunes

13

CRM Delivery v1.0 — Mayo 2026

■■■ ◆ ■■■

Pág. 2

CRM DELIVERY

Manual de Sistema y Despliegue

1. Tecnologías utilizadas
El sistema CRM Delivery está construido con tecnologías web modernas, robustas y ampliamente
soportadas. Esta combinación permite escalabilidad, seguridad y facilidad de despliegue tanto en hosting
compartido como en VPS o servidores dedicados.

Arquitectura del Sistema

Cliente Web
Bootstrap 5

Laravel 13

MySQL

PHP 8.3

delivery_crm

Eloquent ORM

15+ tablas

Spatie + DomPDF

App Móvil
API Sanctum

WhatsApp

Email

wa.me link

Mailable

Stack tecnológico completo
Capa

Tecnología

Versión

Propósito

Backend

PHP

8.3+

Lenguaje de servidor

Framework

Laravel

13.0

MVC, ORM, autenticación, routing

Base de datos

MySQL / MariaDB

8.0+ / 10.6+

Almacenamiento relacional

Frontend

Bootstrap

5.3

Diseño responsive y componentes UI

Iconos

Bootstrap Icons

1.11

Más de 1900 íconos SVG

Gráficas

Chart.js

4.4

Dashboard y reportes visuales

Auth UI

Laravel Breeze

última

Login, registro, perfil

Permisos

Spatie Permission

6.x

Roles y permisos granulares

PDF

DomPDF (Barryvdh)

3.x

Tickets, boletas y reportes

API

Laravel Sanctum

4.x

Tokens para apps móviles

Servidor local

Laragon

6.x

Apache + PHP + MySQL Windows

CRM Delivery v1.0 — Mayo 2026

■■■ ◆ ■■■

Pág. 3

CRM DELIVERY

Manual de Sistema y Despliegue

2. Funcionalidades del sistema
El CRM Delivery integra todos los procesos clave de un negocio de entregas: gestión de pedidos, clientes,
productos, repartidores, pagos, inventario, promociones, zonas de delivery, reportes, notificaciones y
mantenimiento. Cada módulo está protegido por permisos según el rol del usuario.
Dashboard

Módulos
del Sistema (12 áreas
funcionales)
Pedidos
Clientes

Productos

KPIs y gráficas

Gestión completa

Base de datos

Catálogo

Inventario

Repartidores

Entregas

Pagos

Control stock

Asignación

Tracking GPS

Cobros

Cupones

Zonas

Reportes

Backup

Promociones

Tarifas

PDF + tablas

Mantenimiento

Módulos principales
● Dashboard interactivo
KPIs en tiempo real: pedidos hoy, en camino, ingresos del día/mes, clientes activos, repartidores
disponibles. Gráficas de pedidos e ingresos de los últimos 7 días, distribución por estado, top 5
repartidores del mes y alertas automáticas de stock bajo.

● Gestión de pedidos
Creación con cálculo automático del total (subtotal + delivery − descuento). Estados: pendiente →
confirmado → preparando → listo → en camino → entregado. Asignación a repartidores, edición,
cancelación con motivo, búsqueda por número, cliente, fecha o estado.

● Clientes (CRM)
CRUD completo, clasificación VIP / frecuente / regular, historial de pedidos por cliente, búsqueda por
teléfono o nombre, dirección y referencia para entrega.

● Productos y categorías
Catálogo con código, precio base, precio delivery, stock, imagen y categoría. Vista de producto con
últimas ventas. Categorías con color e ícono personalizables.

CRM Delivery v1.0 — Mayo 2026

■■■ ◆ ■■■

Pág. 4

CRM DELIVERY

Manual de Sistema y Despliegue

● Inventario
Control de stock con kardex completo (todos los movimientos: entrada, salida por venta, ajuste, merma).
Descuento automático al confirmar pedido. Alertas de stock mínimo. Valor total del inventario.

● Repartidores
Registro con vehículo, zona asignada, calificación. Estados: disponible, ocupado, descanso, inactivo.
Vinculable a un usuario para acceso al panel móvil.

● Panel móvil del repartidor
Vista optimizada para celular con sus entregas asignadas. Botones grandes para cambiar estado
(recogido → en camino → entregado / fallido). Captura GPS en cada paso. Botón directo a Google Maps y
a WhatsApp del cliente.

● Entregas y tracking
Registro de cada entrega con tiempos, distancia, calificación del cliente. Asignación rápida desde la
pantalla de pedidos. Historial GPS del repartidor.

● Pagos
Registro de cobros por pedido con método (efectivo, tarjeta, Yape, Plin, transferencia). Comprobante
(boleta/factura), referencia, vuelto. Resumen diario y mensual.

● Cupones y promociones
Cupones por porcentaje o monto fijo, monto mínimo, descuento máximo, vigencia, usos máximos,
restricción a primer pedido. Validación automática al aplicar.

● Zonas de delivery
Cada distrito con su costo, tiempo estimado y monto mínimo. Auto-cálculo del costo de delivery al elegir
zona en el pedido.

● Reportes
Reportes de ventas, repartidores y clientes con filtros por fecha. Exportación a PDF para imprimir o
archivar. Top productos, ingresos por método de pago.

● Comprobantes PDF
Tickets de impresión 80mm para impresoras térmicas y comprobantes A4 con datos de empresa, logo,
productos detallados y total. Generación instantánea desde cualquier pedido.

● Notificaciones
Envío automático de email al cliente en cada cambio de estado del pedido. Botón de WhatsApp que abre
la conversación con el mensaje listo (link wa.me).

● API REST (Sanctum)
Endpoints para integración con apps móviles: login, listado de productos, pedidos, entregas del repartidor,
actualización de estado, ubicación GPS.

● Backup y mantenimiento
Exportación SQL de toda la BD, restauración desde archivo, descarga, eliminación. Reset del sistema en
3 niveles: solo transaccional, operativo o total (nueva empresa).

● Roles y permisos
Cuatro roles predefinidos: Super Admin (todo), Admin/Gerente (gestión), Operador (toma pedidos),
Repartidor (solo entregas). 30+ permisos asignables granularmente.

CRM Delivery v1.0 — Mayo 2026

■■■ ◆ ■■■

Pág. 5

CRM DELIVERY

Manual de Sistema y Despliegue

3. Instalación local paso a paso
La instalación se hace una sola vez en una máquina con Windows. Una vez configurada, puedes acceder
al sistema desde cualquier navegador del equipo (o de la red local).

Instalación Local en 5 Pasos

1

2

3

4

5

Descargar
Laragon

Extraer
Proyecto

Configurar
.env

Ejecutar
reparar.bat

Iniciar
sesión

Programas a descargar e instalar
Programa

Versión

Para qué sirve

Descarga

Laragon Full

6.0+

Apache + PHP 8.3 + MySQL + Composer en un solo
laragon.org
paquete

Composer

2.7+

Gestor de dependencias PHP (incluido en Laragon)
getcomposer.org

Node.js (opc.)

20+

Solo si vas a recompilar assets frontend

nodejs.org

Visual Studio Code

última

Editor de código (opcional para personalizar)

code.visualstudio.com

Google Chrome

última

Navegador para usar el CRM

google.com/chrome

Procedimiento detallado
Paso 1 — Instalar Laragon Full
1. Entra a laragon.org y descarga la versión Laragon Full (incluye PHP, MySQL, Apache).
2. Ejecuta el instalador con doble clic. Acepta la ruta por defecto C:\laragon.
3. Al terminar, abre Laragon y haz clic en "Iniciar Todo". Verás los servicios Apache y MySQL en verde.
4. Verifica que PHP funciona: clic en Menú → PHP → Versión debe mostrar 8.3 o superior.

Paso 2 — Copiar el proyecto
1. Crea la carpeta C:\CRMyERP\.
2. Pega dentro la carpeta completa crm-delivery (con todos sus archivos).
CRM Delivery v1.0 — Mayo 2026

■■■ ◆ ■■■

Pág. 6

CRM DELIVERY

Manual de Sistema y Despliegue

3. La estructura final debe ser: C:\CRMyERP\crm-delivery\ con los archivos artisan, composer.json, etc.

Paso 3 — Configurar el archivo .env
1. Dentro de la carpeta del proyecto, copia .env.example y renómbralo a .env.
2. Abre .env con un editor de texto y verifica que tenga:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=delivery_crm
DB_USERNAME=root
DB_PASSWORD= (vacío)
3. Guarda el archivo.

Paso 4 — Ejecutar el script de reparación / instalación
1. En Laragon, haz clic derecho sobre la ventana → "Terminal" → se abrirá CMD ya posici
