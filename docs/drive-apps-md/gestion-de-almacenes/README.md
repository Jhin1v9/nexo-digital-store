# GESTIÓN DE ALMACENES

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Negocios Apps - 2026/GESTIÓN DE ALMACENES

**PDF:** Manual_AlmacenPro.pdf

---

AlmacénPro
Sistema de Gestión de Almacenes

Manual técnico · Guía de instalación y despliegue

Documento generado el 24 de junio de 2026
Tecnología: Python · Django 5 · MySQL · Bootstrap 5 · Chart.js
Contenido: tecnologías, funcionalidades, instalación local y despliegue web.

AlmacénPro · Sistema de Gestión de Almacenes

Página 1

1. Tecnologías utilizadas
AlmacénPro es una aplicación web construida sobre el framework Django (Python) con base de datos
MySQL. La interfaz usa Bootstrap 5 y los gráficos del panel se generan con Chart.js. A continuación, el
detalle de la pila tecnológica:
Capa

Tecnología

Detalle

Lenguaje

Python 3.10+

Lenguaje de programación del backend

Framework

Django 5

Estructura, ORM, autenticación y panel admin

Base de datos

MySQL 8

Base de datos «neg_gestion_almacenes»

Frontend

Bootstrap 5 + Bootstrap Icons

Diseño responsivo e iconografía

Gráficos

Chart.js

Gráficos estadísticos del dashboard

Plantillas

Django Templates

Renderizado de páginas en el servidor

Exportación

openpyxl · CSV · PDF

Reportes en Excel, CSV e impresión PDF

Configuración

python-decouple (.env)

Variables de entorno y credenciales

Servidor

runserver (dev) · WSGI (prod)

Despliegue en producción vía WSGI

Arquitectura general

AlmacénPro · Sistema de Gestión de Almacenes

Página 2

2. Funcionalidades del sistema
El sistema cubre el ciclo completo de gestión de un almacén, desde el catálogo de productos hasta las
ventas, con control de stock en tiempo real y reportes exportables.
Módulo

Funcionalidad

Autenticación

Inicio de sesión seguro con roles de usuario.

Dashboard

6 indicadores (KPIs) y 4 gráficos en tiempo real: movimientos, stock por
almacén, stock por categoría y compras vs. ventas.

Productos / Categorías /
Unidades

CRUD completo del catálogo: código, categoría, unidad, costo, precio y stock
mínimo.

Inventario

Stock por producto y almacén, con alertas de bajo stock.

Almacenes

Gestión de múltiples almacenes (CRUD).

Movimientos

Entradas, salidas y transferencias que actualizan el stock automáticamente, con
validación de disponibilidad.

Kardex valorizado

Historial por producto con saldo y valorización.

Ajustes de inventario

Corrección de stock por conteo físico o mermas.

Compras / Proveedores

Órdenes de compra con detalle de productos; al recibirlas, ingresan stock
automáticamente.

Ventas / Clientes

Órdenes de venta con detalle; al facturar, descuentan stock validando
disponibilidad.

Reportes

Inventario valorizado y movimientos, exportables a Excel (.xlsx), CSV y PDF.

Usuarios y permisos

CRUD de usuarios y control de acceso por rol (Admin, Supervisor, Almacenero,
Vendedor).

Configuración

Datos de la empresa, moneda y parámetros generales.

Generales

Buscador en vivo y paginación en todos los listados; diseño responsivo y
profesional.

AlmacénPro · Sistema de Gestión de Almacenes

Página 3

3. Instalación en una computadora nueva
3.1 Programas que debes descargar e instalar
Programa

Para qué

Dónde

Python 3.12

Ejecutar la aplicación (lenguaje base)

python.org/downloads

MySQL Community Server

Base de datos del sistema

dev.mysql.com/downloads

MySQL Workbench

Administrar la base de datos (visual)

dev.mysql.com/downloads

Git (opcional)

Descargar/actualizar el código

git-scm.com

VS Code (opcional)

Editar el código

code.visualstudio.com

Importante: al instalar Python, marca la casilla «Add Python to PATH». Al instalar MySQL, define y anota
la contraseña del usuario root; la necesitarás para conectar la aplicación.

3.2 Pasos de instalación y configuración
1

Instalar Python. Instálalo y verifica en una terminal:
python --version

2
3
4

Instalar MySQL. Instala MySQL Server + Workbench y define la contraseña de root.

Copiar el proyecto. Coloca la carpeta «gestion-almacenes» en tu equipo y abre una terminal
dentro de ella.
Crear entorno virtual. Aísla las librerías del proyecto:
python -m venv venv
venv\Scripts\activate

5

Instalar dependencias. Instala todo lo necesario:
pip install -r requirements.txt

6

Crear la base de datos. En MySQL Workbench ejecuta:
CREATE DATABASE neg_gestion_almacenes
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

7
8

Configurar credenciales. Copia «.env.example» a «.env» y coloca tu contraseña de MySQL
(DB_PASSWORD).
Crear las tablas. Genera y aplica las migraciones:
python manage.py makemigrations
python manage.py migrate

AlmacénPro · Sistema de Gestión de Almacenes

Página 4

9

Datos iniciales. Crea el administrador y datos de ejemplo:
python manage.py crear_admin
python manage.py cargar_datos

10

Ejecutar el sistema. Inicia el servidor de desarrollo:
python manage.py runserver

11

Ingresar. Abre http://127.0.0.1:8000 e inicia sesión con: usuario «admin» / contraseña
«admin123».

AlmacénPro · Sistema de Gestión de Almacenes

Página 5

4. Hosting web sugerido
Para publicar la aplicación en internet existen varias plataformas. Como el sistema usa MySQL, conviene
una que lo soporte de forma nativa. Comparativa de las opciones más recomendadas (2026):
Plataforma

Ideal para

MySQL

Costo aprox.

PythonAnywhere

Principiantes; Django con MySQL sin
configurar servidor

Sí (nativo)

Desde ~5
USD/mes

Railway

Despliegue rápido desde Git; muy ágil

Prefiere
PostgreSQL

Uso (crédito
inicial)

Render

Precios predecibles; PostgreSQL
gestionado

Prefiere
PostgreSQL

Plan gratuito /
pago

Recomendación: PythonAnywhere es la opción más sencilla para Django + MySQL: incluye MySQL de
forma nativa y no requiere configurar un servidor. Nota: desde 2026, para cuentas nuevas el acceso a
MySQL está en el plan de pago (Hacker, ~5 USD/mes). Railway y Render son excelentes, pero están
orientados a PostgreSQL.

AlmacénPro · Sistema de Gestión de Almacenes

Página 6

5. Despliegue paso a paso en PythonAnywhere

1

Crear la cuenta. Regístrate en pythonanywhere.com. Para usar MySQL y dominio propio elige
el plan «Hacker» (~5 USD/mes).

2

Subir el código. En la pestaña Consoles abre una consola «Bash» y descarga tu proyecto con
Git (o súbelo en «Files» como ZIP):
git clone

3

Crear el entorno virtual. Dentro de la consola Bash crea el virtualenv e instala las dependencias:
mkvirtualenv --python=/usr/bin/python3.10 venv
pip install -r requirements.txt

4

Crear la base de datos MySQL. En la pestaña Databases inicializa MySQL, crea la base
«tuusuario$neg_gestion_almacenes» y anota host, usuario y contraseña.

5

Configurar credenciales. Edita el archivo «.env» con los datos de MySQL de PythonAnywhere y
ajusta: DEBUG=False y ALLOWED_HOSTS=tuusuario.pythonanywhere.com

6

Migrar y preparar. En la consola Bash aplica migraciones, archivos estáticos y crea el
administrador:
python manage.py migrate
python manage.py collectstatic
python manage.py crear_admin

7

Crear la Web app. En la pestaña Web → «Add a new web app» → «Manual configuration»
(Django). Indica la ruta del virtualenv y la carpeta del código fuente.

8

Editar el archivo WSGI. En la pestaña Web, edita el WSGI para apuntar a «config.wsgi» y define
DJANGO_SETTINGS_MODULE = config.settings.

9
10

Archivos estáticos. En «Static files» mapea la URL /static/ a la carpeta «staticfiles» del proyecto.

Publicar. Pulsa Reload y visita https://tuusuario.pythonanywhere.com — ¡tu sistema estará en
línea!

Consejo de seguridad: en producción usa siempre DEBUG=False, una SECRET_KEY nueva y secreta, y
nunca subas el archivo «.env» a repositorios públicos.

AlmacénPro · Sistema de Gestión de Almacenes

Página 7
