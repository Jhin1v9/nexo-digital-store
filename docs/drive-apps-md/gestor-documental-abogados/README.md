# GESTOR DOCUMENTAL ABOGADOS

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Negocios Apps - 2026/GESTOR DOCUMENTAL ABOGADOS

**PDF:** LexDoc_Manual_Tecnico_y_Despliegue.pdf

---

LX

LexDoc
Gestor Documental para Estudios Juridicos

Manual Tecnico y Guia de Despliegue
Tecnologia - Funcionalidades - Instalacion - Hosting

Documento generado automaticamente - Junio 2026

v1.0

LexDoc - Manual Tecnico y de Despliegue

1. Tecnologia utilizada
LexDoc es una aplicacion web construida con un stack moderno de Python, centrado en el framework
Django y la base de datos MySQL. El sistema sigue el patron MVT (Modelo-Vista-Template) y esta
organizado en aplicaciones modulares, una por cada area de negocio.

NAVEGADOR

HTTP

SERVIDOR DJANGO

Usuario
(HTML, CSS, Chart.js)

ORM / SQL

Apps: expedientes,
clientes, documentos...

BASE DE DATOS
MySQL 8
neg_gestordocumental

Arquitectura MVT (Modelo - Vista - Template) con apps modulares

Componente

Tecnologia

Funcion

Lenguaje

Python 3.12+

Logica del servidor

Framework

Django 5.0

Backend, ORM, seguridad, plantillas

Base de datos

MySQL 8 (via PyMySQL)

Almacenamiento de datos

Frontend

HTML5 + CSS3 propio

Interfaz responsiva (burdeos/grafito)

Graficos

Chart.js

4 graficos estadisticos del dashboard

Exportacion

openpyxl / reportlab

Reportes en Excel y PDF

Otros

Pillow, widget-tweaks

Imagenes y formularios

2. Funcionalidades del sistema
El sistema cubre el flujo completo de gestion de un estudio de abogados:
Seguridad y acceso

Dashboard

Login, cierre de sesion, perfil editable, cambio de

KPIs, 4 graficos estadisticos (estado, materia, evolucion

contrasena y permisos por rol (Socio, Abogado, Asistente,

mensual, facturacion) y alertas de vencimientos.

Secretaria, Admin).

Expedientes

Clientes

Alta/edicion/cierre, bitacora de actuaciones, estados,

Personas naturales y juridicas, ficha con historial de

prioridad, busqueda y filtros.

expedientes y facturas.

Documentos

Agenda

Subida y descarga de archivos, versionado con historial y

Audiencias, plazos y diligencias; completar/reabrir y filtros

marca de confidencialidad.

(pendientes, proximos, vencidos).

Gestor Documental Juridico

Pagina 1

LexDoc - Manual Tecnico y de Despliegue

Facturacion

Reportes

Honorarios por cliente/expediente, estados y totales por

Panel analitico con exportacion a Excel y PDF.

cobrar y cobrado.

Configuracion

Busqueda global

Materias legales, categorias de documentos y

Busqueda unificada de expedientes, clientes y

administracion de usuarios.

documentos desde la barra superior.

Gestor Documental Juridico

Pagina 2

LexDoc - Manual Tecnico y de Despliegue

3. Instalacion en una computadora nueva
Sigue estos pasos en orden. Los comandos se ejecutan en la consola de Windows (CMD o PowerShell)
dentro de la carpeta del proyecto.

Programas a descargar e instalar
Programa

Donde

Notas

Python 3.12

python.org/downloads

Marcar 'Add Python to PATH' al instalar

MySQL Server 8

dev.mysql.com/downloads/installer

Definir contrasena de root, puerto 3306

MySQL Workbench

(incluido en el instalador)

Opcional, para administrar la base visualmente

Pasos de configuracion

1

Crear la base de datos en MySQL
Abre MySQL Workbench o la consola de MySQL y ejecuta:

CREATE DATABASE neg_gestordocumental_abogados
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

2
3

Copiar el proyecto
Copia la carpeta del sistema a la nueva computadora (por ejemplo a C:\Negocios\).

Crear y activar el entorno virtual
Aisla las librerias del proyecto:

cd C:\Negocios\gestordocumental-abogados
python -m venv venv
venv\Scripts\activate

4

Instalar las dependencias
Instala Django y las demas librerias:

pip install -r requirements.txt

5

Configurar credenciales
Copia el archivo de ejemplo y edita la contrasena de MySQL:

copy .env.example .env
# luego edita .env: DB_PASSWORD=tu_contrasena

6

Crear las tablas (migraciones)

python manage.py migrate

7

Cargar datos de demostracion (opcional)
Crea el usuario admin y registros de ejemplo:

Gestor Documental Juridico

Pagina 3

LexDoc - Manual Tecnico y de Despliegue

python manage.py seed_demo
# Acceso: usuario = admin

8

contrasena = admin12345

Iniciar el servidor
Abre el navegador en http://127.0.0.1:8000/

python manage.py runserver

Gestor Documental Juridico

Pagina 4

LexDoc - Manual Tecnico y de Despliegue

4. Hosting web sugerido
Para publicar la aplicacion en internet existen varias plataformas. Como el sistema usa MySQL, conviene
una que lo soporte de forma nativa. A continuacion, las opciones mas recomendadas en 2026:
Plataforma

PythonAnywhere

Ideal para
Principiantes /
Django+MySQL

Base de datos

Costo aprox.

MySQL nativo

Plan pago ~US$5-10/mes

PostgreSQL (MySQL

Railway

Despliegue rapido desde Git

Render

Precios predecibles

PostgreSQL

Plan gratuito / desde ~US$7/mes

DigitalOcean

Control total (VPS)

MySQL/PostgreSQL

Desde ~US$6/mes

add-on)

Uso; credito gratis inicial

Recomendacion: PythonAnywhere. Es la opcion mas sencilla para Django y la unica de la lista con
MySQL nativo (justo la base de datos que usa LexDoc), sin necesidad de Docker ni configuracion
compleja. Nota: desde enero 2026 MySQL requiere un plan de pago (Developer/Hacker, ~US$5-10 al
mes).

5. Como subirlo a PythonAnywhere (paso a paso)
1
2

Crear una cuenta
Registrate en www.pythonanywhere.com. Para usar MySQL elige un plan de pago (Developer/Hacker).

Subir el codigo
Desde 'Consoles' abre una consola Bash y clona tu repositorio Git, o sube el proyecto en .zip y descomprimelo:

git clone https://tu-repositorio/gestordocumental-abogados.git
# o: unzip proyecto.zip

3

Crear la base de datos MySQL
En la pestana 'Databases' crea una base. El nombre tendra el formato usuario$nombre y el host sera
usuario.mysql.pythonanywhere-services.com

4

Crear el entorno virtual e instalar dependencias

mkvirtualenv --python=python3.10 venv
pip install -r requirements.txt

5
6

Configurar la aplicacion web
En la pestana 'Web' -> 'Add a new web app' -> 'Manual configuration' -> Python 3.10.

Editar el archivo WSGI
En la pestana 'Web', edita el archivo WSGI para apuntar al proyecto y la configuracion:

Gestor Documental Juridico

Pagina 5

LexDoc - Manual Tecnico y de Despliegue

import os, sys
path = '/home/usuario/gestordocumental-abogados'
if path not in sys.path: sys.path.append(path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

7

Ajustar variables de produccion
En .env / settings: DEBUG=False, ALLOWED_HOSTS con tu dominio y las credenciales MySQL de PythonAnywhere.

DEBUG=False
ALLOWED_HOSTS=usuario.pythonanywhere.com
DB_HOST=usuario.mysql.pythonanywhere-services.com
DB_NAME=usuario$neg_gestordocumental_abogados

8

Migrar y recolectar estaticos

python manage.py migrate
python manage.py collectstatic

9
10

Mapear archivos estaticos
En 'Web' -> 'Static files', anade la URL /static/ apuntando a la carpeta staticfiles del proyecto.

Recargar la aplicacion
Pulsa el boton verde 'Reload'. Tu sistema quedara en https://usuario.pythonanywhere.com

Sugerencia de seguridad: en produccion usa siempre DEBUG=False, una SECRET_KEY nueva y secreta, contrasenas
robustas y copias de seguridad periodicas de la base de datos.

Gestor Documental Juridico

Pagina 6
