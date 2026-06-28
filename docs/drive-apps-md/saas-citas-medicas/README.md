# SaaS Citas Médicas

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Citas Médicas

**PDF:** Documentacion_CitasMedicas.pdf

---

CitasMédicas
SaaS CLÍNICO

Documentación
del Sistema
Sistema SaaS de gestión de citas médicas
Tecnología · Funcionalidades · Instalación local
Hosting recomendado y guía de despliegue

Dashboard

9

Junio 2026

67

127

122

Elaborado para: Vito · PHP / Laravel + MySQL

Resumen del proyecto
CitasMédicas es una aplicación web tipo SaaS (Software as a Service) para la gestión
integral de citas médicas. Permite que varias clínicas operen de forma independiente sobre
la misma plataforma (multi-tenant), con control de acceso por roles, panel administrativo de
la clínica y un panel de super administrador para gestionar toda la plataforma. Este
documento describe la tecnología empleada, las funcionalidades, cómo instalarlo en una
computadora nueva y cómo desplegarlo en un hosting web.

Accesos de demostración
Administrador de clínica: admin@citasmedicas.test · contraseña password
Super administrador: superadmin@citasmedicas.test · contraseña password

1

Tecnología utilizada
Lenguajes, framework y herramientas del sistema

El sistema está construido con un stack moderno de PHP, siguiendo el patrón MVC del
framework Laravel.
PHP 8.2+

Laravel 11

Lenguaje de programación del lado del servidor
(backend).

Framework PHP (MVC): rutas, controladores,
modelos Eloquent, migraciones.

MySQL 8 / MariaDB

Blade

Base de datos relacional donde se almacena toda
la información.

Motor de plantillas de Laravel para generar las
vistas HTML.

Tailwind CSS

Alpine.js

Framework de estilos por utilidades (servido
como CSS compilado).

Librería ligera para interactividad (menús,
modales, pestañas).

Chart.js

Composer

Librería para los gráficos del dashboard y
reportes.

Gestor de dependencias de PHP (instala Laravel y
librerías).

Arquitectura general
Navegador

Servidor Laravel

Base de datos

HTML · CSS · JS
Alpine · Chart.js

Rutas · Controladores
Blade · Eloquent

MySQL / MariaDB
Tablas y relaciones

CitasMédicas · Documentación del sistema

Página 2

Arquitectura multi-tenant: cada clínica ve solo sus datos (aislamiento por clinica_id). Incluye
control de acceso por roles (super admin, administrador, médico, recepción) y bitácora de auditoría de
las acciones.

CitasMédicas · Documentación del sistema

Página 3

2

Funcionalidades del sistema
Qué puede hacer la plataforma

Acceso público
•

Landing page de presentación con secciones de funciones, módulos y planes.

•

Inicio de sesión con cuentas de demostración y redirección según el rol.

Panel de la clínica (administrador / médico / recepción)
•

Dashboard: indicadores de citas (hoy, semana, pacientes, médicos), estados y gráficos.

•

Citas / Agenda: alta, edición, filtros y cambio rápido de estado (pendiente, confirmada,
atendida, cancelada).

•

Calendario mensual visual con citas por color de especialidad y estado.

•

Lista de espera con prioridades y conversión directa a cita.

•

Pacientes, Médicos, Especialidades y Aseguradores: gestión completa (CRUD) con
búsqueda.

•

Recetas médicas: medicamentos, dosis e indicaciones, con versión imprimible.

•

Plantillas CIE-10: catálogo de diagnósticos reutilizable.

•

Facturación: comprobantes con ítems dinámicos, descuentos, impuestos y estado de pago.

•

Reportes: gráficos por mes, estado y especialidad, con exportación a CSV.

•

Mensajería interna entre los usuarios de la clínica.

•

Usuarios y roles, Plantillas de Email y Configuración de la clínica (admin).

•

Mantenimiento: información del sistema, limpieza de caché, respaldo de datos y bitácora.

Panel de Super Administrador (plataforma SaaS)
•

Dashboard SaaS: métricas globales (clínicas, suscripciones, ingresos, usuarios).

•

Clínicas: gestión de cuentas, plan y estado de suscripción.

•

Planes y suscripciones: configuración de planes (Básico, Profesional, Clínica).

•

Usuarios globales de toda la plataforma y Bitácora de auditoría.

Características transversales
•

Multi-tenant: aislamiento de datos por clínica.

•

Control de acceso por rol y registro de auditoría de acciones.

•

Diseño responsivo (computadora, tableta y celular) y exportación CSV / JSON.

CitasMédicas · Documentación del sistema

Página 4

3

Instalación en una computadora nueva
Programas a instalar y configuración (Windows)

1) Programas a descargar e instalar
Laragon (recomendado)

Alternativa: XAMPP

Incluye PHP 8.2, MySQL/MariaDB, Apache y
Composer en un solo instalador. Descarga:
laragon.org

PHP + Apache + MySQL. Descarga:
apachefriends.org. (Composer se instala aparte).

Composer

Editor + extras (opcional)

Solo si no usas Laragon. Gestor de dependencias
PHP: getcomposer.org

Visual Studio Code (editor), Git y Node.js si
deseas compilar estilos.

2) Pasos para ponerlo en funcionamiento
1

Instalar Laragon
Instálalo con las opciones por defecto. Ya trae PHP 8.2, MySQL y Composer listos para
usar.

2

Copiar el proyecto
Coloca la carpeta del sistema en C:\laragon\www\saas_citasmedicas (o la ruta que
prefieras).

3

Abrir la terminal
Abre una terminal dentro de la carpeta del proyecto (clic derecho › Terminal, o desde
Laragon).

4

Instalar dependencias
Ejecuta composer install para descargar Laravel y sus librerías.

5

Crear el archivo de entorno
copy .env.example .env y luego php artisan key:generate.

6

Crear la base de datos
En HeidiSQL o phpMyAdmin crea una base llamada saas_citasmedicas (utf8mb4).

7

Configurar el .env
Edita DB_DATABASE=saas_citasmedicas, DB_USERNAME=root y DB_PASSWORD= (vacío en
local).

8

Migrar y poblar
Ejecuta php artisan migrate --seed para crear las tablas y datos de ejemplo.

9

Compilar los estilos
Ejecuta el archivo compilar-css.bat (o npm install && npm run build).

1
0

Levantar el servidor
Ejecuta php artisan serve y abre http://127.0.0.1:8000.

CitasMédicas · Documentación del sistema

Página 5

1
1

Iniciar sesión
Entra con admin@citasmedicas.test / password.

Si no ves los cambios: ejecuta php artisan optimize:clear (limpia vistas, rutas y configuración en
caché) y refresca con Ctrl+F5.

CitasMédicas · Documentación del sistema

Página 6

4

Hosting web sugerido
Dónde publicar la aplicación

Laravel necesita un hosting con PHP 8.2+, MySQL, acceso por consola (SSH) y,
preferiblemente, que el dominio pueda apuntar a la carpeta /public. Opciones
recomendadas en 2026:
Proveedor

Tipo

Desde (aprox.)

Hostinger (recomendado)

VPS / Cloud con Laravel≈ $6.49 / mes

Ideal para

Principiantes; instalación de Laravel en 1 clic, SSH y

DigitalOcean + Laravel Forge
VPS administrado

≈ $6 + Forge

Proyectos profesionales y escalables (Forge es de lo

Railway / Render

Plataforma (PaaS)

Plan gratis / desde $5Despliegue automático por Git, muy fácil de configu

SiteGround

Hosting administrado

≈ $6.69 / mes

Buen rendimiento y soporte, panel sencillo.

Recomendación: para empezar con buena relación costo/facilidad, se sugiere Hostinger (plan VPS
para Laravel o Cloud), por su instalación asistida, soporte de PHP 8.x, SSL gratuito y precio accesible. La
siguiente sección detalla el despliegue en Hostinger.

CitasMédicas · Documentación del sistema

Página 7

5

Cómo subirlo a Hostinger
Guía de despliegue paso a paso

Pasos para publicar el sistema en Hostinger (plan VPS para Laravel o Cloud/Business con
SSH):

1

Contratar el plan
Adquiere un plan con PHP 8.2+ y acceso SSH (VPS para Laravel o Cloud/Business). Apunta
tu dominio.

2

Crear la base de datos
En el panel (hPanel) crea una base de datos MySQL y anota: nombre, usuario, contraseña
y host.

3

Subir el proyecto
Opción A: hPanel › Git, conecta tu repositorio. Opción B: comprime el proyecto en .zip,
súbelo por el Administrador de archivos y descomprímelo.

4

Apuntar el dominio a /public
Configura el dominio para que su raíz sea la carpeta public del proyecto (en VPS se hace
en Nginx/Apache; en Cloud, desde el panel del dominio).

5

Instalar dependencias
Por SSH, en la carpeta del proyecto: composer install --optimize-autoloader
--no-dev.

6

Configurar el entorno
Crea el .env con APP_ENV=production, APP_DEBUG=false, APP_URL=https://
