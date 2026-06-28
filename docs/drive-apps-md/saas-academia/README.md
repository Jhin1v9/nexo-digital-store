# SaaS Academia

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Academia/SaaS Academia

**PDF:** AcademiaPro_Documentacion.pdf

---

A
AcademiaPro
SISTEMA SaaS DE GESTIÓN DE ACADEMIAS

Documentación técnica y guía de instalación / despliegue
Tecnología · Funcionalidades · Instalación local
Hosting recomendado · Publicación paso a paso

Laravel 11 · PHP 8.2 · MySQL · Multi-tenant

AcademiaPro — Documentación del Sistema

Contenido del documento
Esta guía describe la tecnología del sistema, sus funcionalidades, la instalación en una computadora
nueva y la publicación en un hosting web, paso a paso.
1

Tecnología utilizada

2

Funcionalidades del sistema

3

Instalación en una computadora nueva

4

Hosting web sugerido

5

Publicación en el hosting recomendado (Hostinger)

1

TECNOLOGÍA UTILIZADA

El sistema fue desarrollado como una aplicación web SaaS multi-academia, con una arquitectura moderna
basada en el framework Laravel. La siguiente tabla resume el stack tecnológico:
Componente

Tecnología

Lenguaje (backend)

PHP 8.2 o superior

Framework

Laravel 11 (patrón MVC, Eloquent ORM, plantillas Blade)

Base de datos

MySQL 8 / MariaDB 10.4+ (motor InnoDB, UTF-8)

Frontend

HTML5, CSS3 propio (paleta cian/navy, diseño responsivo) y JavaScript

Gráficos

Chart.js (gráficos de barras, líneas, dona) vía CDN

Dependencias

Composer (gestor de paquetes PHP)

Correos

Mailables de Laravel + tareas programadas (scheduler)

Servidor web

Desarrollo: php artisan serve · Producción: Apache o Nginx

Características de arquitectura
• Multi-tenant (single-database): cada academia se aísla con una columna academia_id y un global scope
que filtra los datos automáticamente.
• Control de acceso por roles y permisos por módulo (Super Admin, Admin, Secretaría, Docente,
Estudiante).
• Seguridad: contraseñas cifradas (hash), protección CSRF, validación de formularios y middleware de
autenticación.
• Bitácora de auditoría automática de altas, cambios, bajas e inicios de sesión.

Sistema SaaS de gestión de academias

Página 1

AcademiaPro — Documentación del Sistema
Frontend: Blade + CSS3 + JavaScript + Chart.js

Laravel 11 (PHP 8.2)
Usuario

MySQL
Rutas

Navegador web

Middleware

Controladores Eloquent ORM

Blade

Base de datos

Arquitectura multi-tenant: columna academia_id + global scope

Figura 1 — Flujo de una petición y arquitectura general del sistema

SUPER ADMIN (Plataforma)

Academia A

Academia B

Academia C

Admin · Docentes
Estudiantes · Datos aislados

Admin · Docentes
Estudiantes · Datos aislados

Admin · Docentes
Estudiantes · Datos aislados

Figura 2 — Multi-tenant: el Super Admin gestiona todas las academias; cada una ve solo sus datos

Sistema SaaS de gestión de academias

Página 2

AcademiaPro — Documentación del Sistema

2

FUNCIONALIDADES DEL SISTEMA

El sistema cubre toda la operación de una academia y de la plataforma SaaS que la aloja. Las
funcionalidades se agrupan por tipo de usuario:

Plataforma — Super Admin

Sitio público

• Panel global con métricas e ingresos (MRR)

• Landing con presentación y precios

• Gestión de academias (alta, edición, baja)

• Registro self-service (15 días de prueba)

• Planes de suscripción y límites

• Inicio de sesión multi-rol

• Suscripciones por academia

• Diseño responsivo (PC, tablet, móvil)

• Facturación: generar, marcar pagada, recibo
• Bitácora global y “Entrar” a una academia

Academia — Admin / Secretaría

Portales de autoservicio

• Dashboard con KPIs y gráficos

• Portal del estudiante: cursos, notas, asistencia

• Estudiantes y matrículas (cobro automático)

• Pago de cuotas en línea (checkout)

• Cursos y docentes

• Panel del docente: sus cursos

• Pagos, recibos imprimibles y morosidad

• Registrar asistencia y notas de sus cursos

• Asistencia y calificaciones

• Notificaciones por correo

• Reportes (CSV y PDF) y más gráficos

• Límites según el plan contratado

• Usuarios, roles y permisos
• Configuración y “Mi plan”

EN MODO DEMO: Pagos en línea y correos funcionan en modo demostración: el checkout no genera cargos
reales y los correos se registran en el archivo de log mientras no se configure un servidor SMTP.

Sistema SaaS de gestión de academias

Página 3

AcademiaPro — Documentación del Sistema

3

INSTALACIÓN EN UNA COMPUTADORA NUEVA

Programas a descargar e instalar
Programa

Para qué sirve / dónde obtenerlo

XAMPP

Incluye PHP 8.2+, MySQL/MariaDB y Apache. Descarga: apachefriends.org

Composer

Gestor de dependencias de PHP. Descarga: getcomposer.org

Visual Studio Code

Editor de código (opcional). Descarga: code.visualstudio.com

Git

Control de versiones (opcional). Descarga: git-scm.com

NOTA: Verifica que XAMPP traiga PHP 8.2 o superior (versiones XAMPP 8.2.x). Si tu XAMPP trae una versión
menor, descarga una más reciente; Laravel 11 requiere PHP 8.2 como mínimo.

Configuración paso a paso
1

Instalar XAMPP y abrir el panel de control
Inicia los servicios Apache y MySQL (botón Start).

2

Instalar Composer
Durante la instalación, apunta al PHP de XAMPP: C:\xampp\php\php.exe

3

Copiar el proyecto a tu equipo
Por ejemplo a C:\SAAS\saas_academia

4

Abrir una terminal en la carpeta del proyecto
cd C:\SAAS\saas_academia

5

Instalar las dependencias de Laravel
composer install

6

Generar la clave de la aplicación
php artisan key:generate

7

Crear la base de datos
En http://localhost/phpmyadmin crea la base saas_academia con cotejamiento utf8mb4_unicode_ci. El archivo
.env ya viene configurado (usuario root, sin contraseña).

8

Crear las tablas y cargar datos de demostración
php artisan migrate --seed

9

Habilitar el almacenamiento de archivos (logos/avatares)
php artisan storage:link

10

Levantar el servidor de desarrollo
php artisan serve

Sistema SaaS de gestión de academias

Página 4

AcademiaPro — Documentación del Sistema

11

Abrir el sistema en el navegador
Visita http://127.0.0.1:8000 e inicia sesión con superadmin@saas.com / password

ACCESOS DEMO: Cuentas de prueba (contraseña “password”): superadmin@saas.com (plataforma),
admin@academia.com (academia), docente@academia.com (docente) y estudiante@academia.com (portal del
alumno).

Sistema SaaS de gestión de academias

Página 5

AcademiaPro — Documentación del Sistema

4

HOSTING WEB SUGERIDO

Una aplicación Laravel necesita un hosting con PHP 8.2+, MySQL y, idealmente, acceso por consola
(SSH) para ejecutar Composer y los comandos de Artisan. Opciones recomendadas:
Opción

Tipo

Ideal para

Hostinger (Business /
Cloud)

Hosting
administrado

Recomendado: económico, soporta PHP 8.2 + MySQL, SSH,
popular en LATAM

Railway / Render

Plataforma
(PaaS)

Despliegue moderno desde Git; bueno para empezar rápido

DigitalOcean + Laravel
Forge

Servidor VPS

Proyectos profesionales: control total y escalabilidad

AWS / Google Cloud

Nube a gran
escala

Alto tráfico; mayor complejidad de configuración

Hosting compartido
cPanel

Compartido
básico

Muy económico, pero a veces sin SSH/Composer (limitado)

RECOMENDACIÓN: Más recomendado para este proyecto: Hostinger en su plan Business o Cloud, que
incluyen acceso SSH para ejecutar Composer y Artisan, certificado SSL gratis y buen precio. En la siguiente
sección se detalla su publicación paso a paso.

Sistema SaaS de gestión de academias

Página 6

AcademiaPro — Documentación del Sistema

5

PUBLICACIÓN EN EL HOSTING RECOMENDADO (HOSTINGER)

1

2

3

4

5

6

Contratar
plan

Subir
proyecto

Crear
BD

Configurar
.env

Migrar
datos

SSL
y online

Figura 3 — Flujo de publicación en el hosting

1

Contratar un plan con SSH y registrar el dominio
Elige Hostinger Business/Cloud (PHP 8.2). Apunta tu dominio o usa el subdominio gratuito.

2

Crear la base de datos MySQL
En hPanel → Bases de datos MySQL: crea la base y el usuario, y anota nombre, usuario y contraseña.

3

Subir el proyecto
Recomendado por Git (clonar el repositorio) o subiendo un ZIP y extrayéndolo con el Administrador de archivos.

4

Apuntar el dominio a la carpeta /public
En hosting Laravel el sitio debe servirse desde la carpeta public. En hPanel configura la “raíz del documento” del
dominio hacia …/saas_academia/public.

5

Instalar dependenc
