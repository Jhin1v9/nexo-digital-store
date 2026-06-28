# TPV Copas

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/TPV - 2026/TPV Copas

**PDF:** TPV_Copas_Documentacion.pdf

---

TPV COPAS
Sistema de gestión profesional
para bares de copas, pubs y discotecas

PHP 8.2

Laravel 11

Servicio rápido en barra

MySQL

Bootstrap 5

Promociones flexibles

Cierres de caja

Documentación técnica · Manual de instalación · Guía de hosting
Edición 2026 · Versión 1.1

Chart.js

TPV COPAS

Sistema TPV para bares de copas

SECCIÓN

Índice de contenidos
1.

Introducción y propuesta de valor

2.

Tecnología utilizada

3.

Funcionalidades del sistema

4.

Arquitectura y módulos

5.

Formato numérico configurable

6.

Instalación paso a paso en PC nueva

7.

Hosting recomendado

8.

Despliegue en Hostinger paso a paso

9.

Credenciales y soporte

TPV Copas · Documentación

0

Página 2

TPV COPAS

Sistema TPV para bares de copas

SECCIÓN

1

Introducción

TPV Copas es un sistema de gestión integral diseñado específicamente para pubs, discotecas, bares
de copas, clubes nocturnos y locales de ocio nocturno. Su objetivo es ofrecer un servicio rápido en
barra, control claro de consumiciones, ventas y caja, promociones flexibles y una imagen profesional para
el negocio.
En un local nocturno, la velocidad del servicio y el control son claves. Cuando las ventas se hacen con
procesos lentos, el stock no está bien controlado o no hay visibilidad sobre promociones, consumiciones y
cierres, aparecen errores, pérdidas y menos rentabilidad. TPV Copas centraliza la operativa diaria para
trabajar con más orden, agilidad y mejor experiencia para el cliente.

VELOCIDAD

ERRORES

TICKET MEDIO

+40%
vs. caja manual

−90%
control de stock

+15%
promociones activas

¿Para quién está pensado?
Pubs, discotecas, bares de copas, clubes nocturnos, salas de fiestas y locales de ocio que necesitan
vender rápido en barra y controlar mejor cada servicio: ventas, consumiciones, promociones 2x1,
invitaciones, entradas, varios precios, stock, tickets, facturas, empleados y cierres de caja desde una sola
plataforma.

Beneficios clave
■

Servicio rápido en barra y salón con grilla táctil de productos.

■

Promociones flexibles: 2x1, 3x2, Happy Hour, descuentos por hora y día.

■

Control de stock con alertas y trazabilidad de movimientos.

■

Apertura y cierre de caja con arqueo automático y diferencia.

■

Dashboard con gráficos en tiempo real para tomar decisiones.

■

Configuración multi-país: moneda, impuesto y separadores numéricos.

TPV Copas · Documentación

Página 3

TPV COPAS

Sistema TPV para bares de copas

SECCIÓN

2

Tecnología utilizada

El sistema ha sido desarrollado con un stack moderno, estable y muy compatible con la mayoría de
hostings actuales. La elección prioriza rendimiento, facilidad de despliegue y una comunidad técnica
amplia.
Capa

Tecnología

Versión

Función

Lenguaje servidor

PHP

8.2+

Núcleo de la aplicación

Framework backend

Laravel

11.x

MVC, ORM, autenticación

Base de datos

MySQL / MariaDB

5.7 / 10+

Almacenamiento transaccional

Motor BD

InnoDB

—

Claves foráneas + transacciones

Charset

utf8mb4

—

Emojis y caracteres completos

Frontend CSS

Bootstrap

5.3

UI responsive y profesional

Iconos

FontAwesome

6.5

Iconografía moderna

Tipografía

Inter (Google Fonts)

—

Legibilidad pantalla

Gráficos

Chart.js

4.4

Dashboard estadísticas

Plantillas

Blade

—

Vistas server-side

PDF / Tickets

DomPDF

3.0

Generación tickets/facturas

JS auxiliar

jQuery 3.7

—

AJAX y manipulación DOM

Servidor desarrollo

PHP-CLI (artisan serve)

—

php artisan serve

Servidor producción

Apache / Nginx

—

Con PHP-FPM o mod_php

Por qué este stack
Laravel + MySQL ofrece la mejor relación entre productividad de desarrollo, compatibilidad con
hostings compartidos económicos y seguridad (ORM Eloquent con queries parametrizados, CSRF
automático, hashing bcrypt). Bootstrap 5 garantiza que el TPV se vea bien en tabletas táctiles,
ordenadores en barra y móviles, sin complicaciones.

TPV Copas · Documentación

Página 4

TPV COPAS

Sistema TPV para bares de copas

SECCIÓN

Funcionalidades del sistema

3

Operativa diaria — TPV en barra y salón
Pantalla TPV con grilla de productos por categoría, búsqueda rápida, imágenes y colores. Soporte para
barra, salón, terraza, VIP y reservados, con cambio de precio según zona (precio normal / Happy Hour /
VIP).

Caja y cierres
Apertura de caja con saldo inicial, ingresos/egresos manuales, arqueo automático con desglose
completo (ventas efectivo, ventas tarjeta, ingresos, egresos, diferencia) y cierre con observaciones.
Histórico de todos los cierres.

Promociones y consumiciones
Promociones 2x1, 3x2, descuento %, descuento monto, precio fijo, Happy Hour. Vigencia por fecha,
hora y días de la semana. Productos marcables como invitación o entrada.

Stock y catálogo
Categorías con color e icono (10 predefinidas: cervezas, cubatas, combinados, chupitos, refrescos,
snacks, entradas, botellas, vinos, champagnes). Productos multi-precio. Stock con mínimo, alertas y
trazabilidad.

Empleados y seguridad
Roles: admin, gerente, cajero, camarero. Login profesional con sesiones seguras y middleware de
control por rol. Cada venta queda asociada a su cajero.

Reportes y dashboard
KPIs en tiempo real, gráfica de ventas últimos 7 días, top productos, métodos de pago, stock bajo.
Reporte filtrable por rango de fechas con detalle por ticket.

Configuración multi-país
Datos de empresa, logo, símbolo de moneda y código ISO, impuesto configurable (IVA / IGV / IIBB…),
separador decimal y de miles, número de decimales, mensaje y pie de ticket, zona horaria, formato de
fecha.

TPV Copas · Documentación

Página 5

TPV COPAS

Sistema TPV para bares de copas

Eventos y entradas
Crea eventos con aforo y precio, vende entradas con código único, canjéalas en la puerta y aplica
consumición incluida si corresponde. Tipos: general, VIP, invitación.

Mesas y zonas
Gestión visual con estados (libre, ocupada, reservada, cuenta). Cada zona puede tener su propia tarifa.
Distribución por Barra, Salón, Terraza, VIP.

Clientes y fidelización
Ficha de cliente, marca VIP, puntos de fidelidad, total consumido y vinculación de tickets. Cumpleaños
registrado para campañas de marketing.

Tickets y facturación
Generación automática de ticket térmico (80mm) con auto-impresión. Configurable: logo, datos
fiscales, mensaje y pie. Imprime desglose de impuesto opcional.

Proveedores
Registro de proveedores con datos de contacto, NIF, condiciones. Preparado para futuras compras y
órdenes.

TPV Copas · Documentación

Página 6

TPV COPAS

Sistema TPV para bares de copas

SECCIÓN

4

Arquitectura y módulos
Vista previa del dashboard:
127.0.0.1:8000/dashboard

TPV COPAS

VENTAS HOY

VENTAS MES

TICKET PROM.

CAJA

• Dashboard

774,00

7.096,50

70,36

ABIERTA

• TPV

↑ vs ayer

↑ vs ayer

↑ vs ayer

↑ vs ayer

• Productos
• Categorías
• Promociones

Ventas últimos 7 días

Métodos de pago

• Mesas
• Clientes
• Cajas
• Reportes

Diagrama de capas
Navegador / Tableta táctil

Apache / Nginx + PHP 8.2 (FPM)
public/index.php → Laravel 11

Capa Laravel — MVC
Controllers · Models (Eloquent) · Blade Views · Middleware · Helpers
Auth · TPV · Caja · Productos · Reportes · Configuración · Promociones

MySQL — tpv_copas
17 tablas · InnoDB · utf8mb4

TPV Copas · Documentación

Página 7

TPV COPAS

Sistema TPV para bares de copas

SECCIÓN

5

Formato numérico configurable

El sistema admite distintos formatos numéricos según el país. Desde el módulo de Configuración
puedes elegir el separador decimal (coma o punto), el separador de miles (punto, coma, espacio,
apóstrofo o ninguno) y el número de decimales a mostrar.

Ejemplos de formato:
España / EU

EEUU / Reino Unido

Suiza

Francia

1.234.567,89 €

1,234,567.89 $

1'234'567.89 CHF

1 234 567,89 €

format 1

format 2

format 3

format 4

Sincronización automática
Al cambiar los separadores en Configuración, todo el sistema se actualiza automáticamente:

✓ Dashboard — KPIs y gráficos
✓ TPV — precios de productos, total del ticket en tiempo real
✓ Ticket de impresora térmica (80 mm)
✓ Listados de productos, clientes, cajas
✓ Repor
