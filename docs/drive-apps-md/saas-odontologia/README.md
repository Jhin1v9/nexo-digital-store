# SaaS Odontología

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Saas - 2026/SaaS Odontología

**PDF:** OdontoCRM_Documentacion.pdf

---

OdontoCRM
Sistema de Gestión para Clínicas Dentales
Documentación técnica: tecnología, funcionalidades, instalación
en una computadora nueva y guía de publicación en un hosting
web.

Laravel 11

PHP 8.2+

MySQL / MariaDB

TailwindCSS

Alpine.js

Aplicación Web

Documento generado el 17 de junio de 2026 · Guía de instalación y despliegue · OdontoCRM
SaaS

i

Contenido

1

Tecnología con la que está desarrollado el sistema

2

Funcionalidades del sistema

3

Instalación paso a paso en una computadora nueva (Windows)

4

Hosting web sugerido y comparativa

5

Publicación paso a paso en el hosting recomendado (Hostinger)

6

Lista de verificación final

Sobre este sistema: OdontoCRM es una aplicación web tipo SaaS para administrar una clínica
dental: pacientes, citas, tratamientos, presupuestos, pagos, inventario, portal del paciente y
reportes. Funciona en el navegador y puede instalarse en una computadora local o publicarse en
internet.

OdontoCRM · Documentación técnica

Pág. 2

1

Tecnología del sistema

OdontoCRM está construido sobre un stack moderno de PHP, ligero y de bajo costo de operación.
No requiere compilación de assets (usa CDN), lo que simplifica su instalación.
Componente

Tecnología utilizada

Lenguaje de servidor

PHP 8.2 o superior

Framework backend

Laravel 11 (arquitectura MVC, Eloquent ORM, sistema de rutas,
migraciones)

Base de datos

MySQL 5.7+ / MariaDB 10.3+

Motor de vistas

Blade (plantillas del lado del servidor)

Interfaz / estilos

TailwindCSS (vía CDN) + tipografía Inter

Interactividad

Alpine.js (menús, pestañas, validación en vivo)

Autenticación

Doble guard: personal de la clínica (web) y portal del paciente
(paciente)

Correo / notificaciones

Mailables de Laravel (recordatorios de cita por email)

Tareas programadas

Scheduler de Laravel (recordatorios automáticos diarios)

Gestor de dependencias

Composer

Reportes / exportación

CSV (compatible con Excel) y PDF imprimible

Arquitectura en una mirada

→

→

Navegador

Servidor

Base de datos

Blade + Tailwind + Alpine.js

PHP 8.2 + Laravel 11

MySQL / MariaDB

OdontoCRM · Documentación técnica

Pág. 3

2

Funcionalidades del sistema

El sistema cubre el flujo completo de una clínica dental, desde la primera cita hasta el cobro y el
seguimiento clínico.

Pacientes e historia clínica

Agenda y citas

• Ficha completa y buscador global

• Listado y calendario mensual

• Odontograma interactivo

• Disponibilidad por doctor y silla (antisolapamiento)

• Antecedentes médicos estructurados, alergias
y tipo de sangre

• Confirmación de cita por enlace público

• Evolución clínica por sesión

• Recordatorios por email y WhatsApp

• Archivos: radiografías, fotos y documentos

• Recordatorios automáticos programados

• Consentimientos informados imprimibles

Finanzas y cobros

Inventario de insumos

• Presupuestos por tratamiento con estados

• Catálogo por categorías y proveedor

• Plan de pago en cuotas

• Entradas, salidas y ajustes de stock

• Pagos con recibos numerados imprimibles

• Alertas de existencias bajas

• Estado de cuenta del paciente

• Valor total del inventario

• Caja diaria (arqueo), gastos y comisiones por
doctor

Portal del paciente

Administración y seguridad

• Acceso propio con correo y clave

• Usuarios y roles (admin, doctor, recepción)

• Consulta de citas y presupuestos

• Recuperación y cambio de contraseña

• Estado de cuenta y descarga de recibos

• Bitácora de actividad
• Configuración de la clínica
• Respaldo / restauración y limpieza de caché
• Exportación a Excel (CSV) y PDF

OdontoCRM · Documentación técnica

Pág. 4

3

Instalación en una computadora nueva

Guía para Windows. Al final tendrás el sistema corriendo en http://localhost:8000 . El mismo
procedimiento aplica, con mínimos cambios, en macOS o Linux.

A. Programas que debes descargar e instalar
Programa

Para qué sirve

Dónde se obtiene

XAMPP (incluye

Servidor web y base de

apachefriends.org — elegir la versión con

Apache, MySQL/

datos

PHP 8.2+

Instala las dependencias de

getcomposer.org

MariaDB y PHP 8.2)
Composer

Laravel
Git (opcional)

Descargar/clonar el proyecto

git-scm.com

Editor de código

Editar configuración

Visual Studio Code — code.visualstudio.com

(opcional)

Nota: XAMPP ya trae PHP y MySQL juntos, por eso es la vía más sencilla. Si prefieres, puedes instalar
PHP 8.2 y MySQL por separado; los comandos siguientes son los mismos.

B. Configuración paso a paso
1

Instalar XAMPP y arrancar MySQL
Instala XAMPP, abre el Panel de Control de XAMPP y pulsa Start en la fila de MySQL
(debe quedar en verde). Verifica que escuche el puerto 3306.

2

Instalar Composer
Ejecuta el instalador de Composer; cuando pida la ruta de PHP, apunta a C:
\xampp\php\php.exe . Al terminar, comprueba en una terminal: composer --version .

3

Copiar el proyecto
Coloca la carpeta del proyecto en una ruta sencilla, por ejemplo C:\SAAS\saas_odontologia .
Abre una terminal (PowerShell) dentro de esa carpeta.

4

Crear el archivo de configuración .env
Si no existe, copia el de ejemplo y edítalo:
# crear .env a partir del ejemplo
copy .env.example .env

Abre .env y revisa estos valores (para XAMPP, la contraseña de root suele ir vacía):
APP_NAME=OdontoCRM
APP_ENV=local
APP_URL=http://localhost:8000
DB_CONNECTION=mysql

OdontoCRM · Documentación técnica

Pág. 5

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=saas_odontologia
DB_USERNAME=root
DB_PASSWORD=

5

Instalar dependencias y generar la clave
# descarga las librerías de Laravel
composer install
# genera la clave de cifrado de la app
php artisan key:generate

6

Crear la base de datos
Crea una base llamada saas_odontologia desde phpMyAdmin (en XAMPP, botón "Admin"
de MySQL) o por terminal:
mysql -u root -e "CREATE DATABASE saas_odontologia CHARACTER SET utf8mb4 COLLATE
utf8mb4_unicode_ci;"

7

Crear las tablas y datos de demostración
# crea todas las tablas (y datos de ejemplo si hay seeders)
php artisan migrate --seed
# enlace para mostrar archivos subidos (radiografías, fotos)
php artisan storage:link

8

Levantar el sistema
php artisan serve

Abre el navegador en http://localhost:8000. Para los recordatorios automáticos, deja
corriendo en otra terminal:
php artisan schedule:work

¡Listo! El sistema ya funciona localmente. Si cambias configuración y algo no se refleja, ejecuta php
artisan optimize:clear .

OdontoCRM · Documentación técnica

Pág. 6

4

Hosting web sugerido

Para publicar la aplicación en internet necesitas un hosting que soporte PHP 8.2+, MySQL/
MariaDB, acceso por SSH y que permita apuntar el dominio a la carpeta /public . Estas son las
mejores opciones en 2026.
Proveedor

Tipo

Ideal para

Costo aprox.

Hostinger

Compartido /

La opción más sencilla y económica; panel

desde ~US$3/

Cloud

hPanel, MySQL y phpMyAdmin incluidos.

mes

Recomendado

Perfecto para una clínica.
Cloudways

Cloud

Instalaciones de un clic, caché, copias de

desde

administrado

seguridad y staging sin administrar el

~US$11/mes

servidor.
DigitalOcean +

VPS

Control total y escalabilidad; estándar entre

Droplet

Laravel Forge

administrado

desarrolladores Laravel.

~US$4/mes +
Forge

A2 Hosting /
IONOS

Compartido

Alternativas con SSH, SSL gratis y soporte

desde

de varias versiones de PHP.

~US$3–5/mes

Recomendación: para una clínica dental que quiere publicar el sistema sin complicaciones técnicas,
Hostinger es la mejor relación facilidad/precio: incluye panel visual, base de datos MySQL,
certificado SSL gratis y acceso SSH. La guía del punto 5 está hecha para Hostinger.

Importante: evita los hosting "gratuitos" para un sistema con datos de pacientes. La información
clínica exige respaldos, SSL y estabilidad que solo garantiza un plan de pago.

OdontoCRM · Documentación técnica

Pág. 7

5

Publicar en Hostinger paso a paso

Guía para subir OdontoCRM a un plan de Hostinger con dominio propio. Usaremos el panel
hPanel, la base de datos y la terminal SSH.

1

Contratar el plan y el dominio
Adquiere un plan Premium/Business (o C
