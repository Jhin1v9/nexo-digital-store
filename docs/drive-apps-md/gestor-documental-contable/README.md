# GESTOR DOCUMENTAL CONTABLE

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Negocios Apps - 2026/GESTOR DOCUMENTAL CONTABLE

**PDF:** ContaDoc-Guia-Tecnica-e-Instalacion.pdf

---

ContaDoc

Gestor Documental
Contable
Guía técnica e instructivo de instalación y publicación en la web. Sistema
de gestión de documentos contables, contabilidad, tesorería, activos,
presupuestos y obligaciones tributarias.

Tecnología · Funcionalidades · Instalación · Hosting · Despliegue

Documento técnico del sistema

Junio 2026

1. Tecnología con la que fue desarrollado
El sistema es una aplicación web construida con una arquitectura moderna basada en Python y el
framework Django, con base de datos MySQL. A continuación, el detalle de cada componente del stack
tecnológico.
Lenguaje · Python 3.10+

Framework · Django 5.0

Lenguaje principal del backend, moderno y

Framework web de alto nivel: ORM, autenticación,

ampliamente soportado.

panel admin y seguridad.

Base de datos · MySQL 8

API · Django REST Framework

Motor relacional robusto. Conexión vía PyMySQL

Endpoints REST con autenticación por token para

(Python puro, sin compilar).

integraciones externas.

Frontend · HTML5 + CSS3

Reportes · ReportLab + openpyxl

Interfaz propia responsiva en paleta esmeralda/grafito,

Generación de PDF de comprobantes/reportes y

con Chart.js para gráficos.

exportación a Excel.

Resumen del stack
Capa

Tecnología

Función

Backend

Python 3.10+, Django 5.0.6

Lógica de negocio, ORM, vistas y seguridad

Base de datos

MySQL 8.x + PyMySQL 1.1

Almacenamiento de datos contables

API REST

Django REST Framework 3.15

Servicios web con token de autenticación

Frontend

HTML5, CSS3, Chart.js

Interfaz visual y gráficos del dashboard

Documentos

ReportLab 4.2, openpyxl 3.1

PDF y Excel (comprobantes, reportes, PLE)

Configuración

python-dotenv, venv

Variables de entorno y entorno aislado

Producción

WSGI (Gunicorn/uWSGI) + Nginx

Servidor de aplicaciones y archivos estáticos

ContaDoc · Gestor Documental Contable

Pág. 2 / 8

2. Funcionalidades del sistema
El sistema cubre el ciclo documental y contable completo de un negocio, organizado en módulos accesibles
desde un menú lateral. Todos cuentan con CRUD completo dentro de la aplicación, control de roles y
registro de auditoría.
Dashboard

Documentos

KPIs, 6 gráficos (ingresos/egresos, tipos, estados,

Facturas, boletas, notas y recibos. Cálculo de IGV,

monedas, top terceros) y alertas de vencimientos.

archivo adjunto, PDF imprimible, pagos/cobros y carga
masiva Excel.

Clientes y Proveedores

Contabilidad

Maestro de terceros con datos fiscales, validación de

Plan de cuentas y libro diario con asientos debe/haber

RUC/DNI e importación desde Excel.

y validación de cuadre en vivo.

Tesorería y Bancos

Activos Fijos

Cuentas bancarias, movimientos, saldo en tiempo real

Registro con categorías, depreciación mensual por

y conciliación (manual y automática) con los pagos.

línea recta, cronograma y valor neto en libros.

Presupuestos

Calendario Tributario

Presupuesto anual por cuenta y reporte presupuesto

Obligaciones SUNAT con vencimientos, generador de

vs ejecución real con desviación y % de avance.

cronograma anual y alertas en el dashboard.

Reportes

Notificaciones

Ventas, compras, libro diario/mayor, estado de

Envío del comprobante en PDF por correo y alertas

resultados, balance, CxC/CxP, tesorería y ratios.

automáticas de vencimientos a administradores.

Exporta a Excel, PDF y PLE-SUNAT.

API REST

Configuración

Endpoints para terceros, documentos, cuentas,

Usuarios y roles, datos de empresa (con logo), series

bancos, activos y obligaciones, con token de

correlativas, impuestos, tipos de cambio y cierre de

seguridad.

periodos.

Características transversales
• Multiempresa: manejo de varias empresas con selector de empresa activa y filtrado de datos.
• Roles y seguridad: Administrador (acceso total) y Operador (registra/edita, no elimina ni administra).
• Auditoría: bitácora que registra quién crea, edita o elimina cada registro.
• Moneda y tipo de cambio: conversión automática a soles según la cotización de la fecha.
• Detracciones y retenciones, notas de crédito/débito y cierre contable mensual.
• Pruebas automáticas: 37 pruebas que validan todos los módulos, reportes y la API.

ContaDoc · Gestor Documental Contable

Pág. 3 / 8

3. Instalación en una computadora nueva
Guía paso a paso para dejar el sistema funcionando localmente en Windows. Primero se instalan los
programas requeridos y luego se configura el proyecto.

Paso A · Programas a descargar e instalar
Programa

Para qué sirve

Dónde descargarlo

Python 3.10 o superior

Ejecuta la aplicación

python.org/downloads

MySQL Server 8.x

Base de datos

dev.mysql.com/downloads/installer

Administrar la BD visualmente

Incluido en el MySQL Installer

Descargar/actualizar el código

git-scm.com/download/win

Editar el código

code.visualstudio.com

MySQL Workbench
Git

opcional

opcional

VS Code

opcional

Importante: al instalar Python, marca la casilla “Add Python to PATH”. Al instalar MySQL, anota la contraseña del
usuario root que definas.

Paso B · Configuración del proyecto
1

Copia el proyecto a una carpeta, por ejemplo C:\gestordocumental-contable.

2

Crea la base de datos. Abre MySQL Workbench o la consola y ejecuta:
CREATE DATABASE neg_gestordocumental_contable
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

3

Abre una terminal en la carpeta del proyecto y crea el entorno virtual:
python -m venv venv
venv\Scripts\activate

4

Instala las dependencias:
pip install -r requirements.txt

5

Configura las variables de entorno. Copia .env.example a .env y ajusta los datos de tu MySQL:
copy .env.example .env
DB_ENGINE=mysql
DB_NAME=neg_gestordocumental_contable
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=3306

ContaDoc · Gestor Documental Contable

Pág. 4 / 8

6

Crea las tablas y el usuario administrador:
python manage.py migrate
python manage.py createsuperuser
python manage.py init_roles

7

(Opcional) Carga datos de ejemplo para ver el sistema poblado:
python manage.py seed_demo

8

Inicia el servidor:
python manage.py runserver

Abre el navegador en http://127.0.0.1:8000/ e ingresa con el usuario que creaste.
¡Listo! El sistema ya funciona en tu computadora. El panel de administración de Django está en /admin/.

ContaDoc · Gestor Documental Contable

Pág. 5 / 8

4. Hosting web sugerido
Para publicar la aplicación en internet existen varias opciones. Como el sistema usa Django + MySQL, la
recomendación principal es PythonAnywhere: es el que mejor soporta MySQL de forma nativa y el más
sencillo para empezar, sin necesidad de Docker ni configuración compleja.
Hosting

Ideal para

Base de datos

Costo aprox.

Dificultad

PythonAnywhere

Principiantes, Django +

MySQL incluido

Desde ~US$5/mes

Muy baja

Recomendado

MySQL

Render

Producción con precio

PostgreSQL

Free / desde ~US$7/

Media

fijo

gestionado

mes

Despliegue rápido desde

PostgreSQL/

Por consumo (con

Git

MySQL

crédito inicial)

Control total y escalado

La que instales

Desde ~US$6/mes

Railway

VPS (DigitalOcean, etc.)

Media

Alta

Nota (cambios 2026): en PythonAnywhere las cuentas nuevas necesitan un plan de pago para usar MySQL (el plan
Hacker desde ~US$5/mes ya lo incluye). El plan gratuito sirve para probar, pero con base de datos SQLite.

¿Por qué PythonAnywhere para este sistema?
• Soporta MySQL nativamente, igual que tu entorno local (no requiere migrar a PostgreSQL).
• Está enfocado en Python/Django: no necesitas Docker ni servidores adicionales.
• Incluye consola Bash en el navegador para correr migrate, createsuperuser, etc.
• Configura HTTPS y el dominio tuusuario.pythonanywhere.com automáticamente.

ContaDoc · Gestor Documental Contable

Pág. 6 / 8

5. Cómo subirlo a PythonAnywhere (paso a paso)
Guía para publicar el sistema en PythonAnywhere con base de datos MySQL. Tiempo estimado: 20-30
minutos.

1

Crea tu cuenta en pythonanywhere.com y elige un plan con MySQL (plan Hacker o superior). Tu
sitio quedará en tuusuario.pythonanywhere.com.

2

Sube el código. En la pestaña Consoles → Bash, clona tu repositorio
