# SISTEMA DE ENCOMIENDAS

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Negocios Apps - 2026/SISTEMA DE ENCOMIENDAS

**PDF:** EnviosPro_Documentacion.pdf

---

EnviosPro
Sistema de Encomiendas y Paqueteria
Documentacion tecnica - Instalacion - Despliegue web

Django 5

Python

MySQL

Chart.js

28 de junio de 2026
Aplicacion web - Gestion integral de encomiendas

ReportLab

EnviosPro

1

Sistema de Encomiendas - Documentacion

Tecnologia utilizada

EnviosPro es una aplicacion web desarrollada con el framework Django 5 (lenguaje Python) sobre una
base de datos MySQL. La interfaz combina plantillas HTML de Django con Chart.js para los graficos del
panel, y un tema visual propio en CSS (modo claro con barra lateral oscura y modo oscuro conmutable).
La generacion de guias, comprobantes y reportes se realiza con ReportLab (PDF) y openpyxl (Excel).
Componente

Tecnologia

Rol en el sistema

Lenguaje

Python 3.10+

Logica del servidor y comandos

Framework web

Django 5.0

Rutas, vistas, ORM, autenticacion, panel admin

Base de datos

MySQL 5.7 / 8.0

Almacenamiento de todos los datos del negocio

Conector BD

PyMySQL 1.1

Driver Python - MySQL

Frontend

HTML + CSS + Chart.js

Plantillas, tema neumorfico y graficos del dashboard

PDF

ReportLab 4.2

Guias, manifiestos, comprobantes y reportes en PDF

Excel

openpyxl 3.1

Exportacion de reportes a .xlsx

Configuracion

python-dotenv

Variables de entorno (.env): clave, BD, correo

Autenticacion

Usuario personalizado

Roles: Administrador, Operador, Repartidor, Cajero

Arquitectura: el proyecto sigue el patron de Django con un modulo de configuracion config/ (settings,
urls, wsgi) y dos aplicaciones internas: accounts (usuarios y roles) y core (logica del negocio: modelos,
vistas, formularios, PDF, permisos y reportes). La zona horaria esta fijada en America/Lima y el idioma
en espanol.

EnviosPro - Django 5 + MySQL

Pagina 1

EnviosPro

2

Sistema de Encomiendas - Documentacion

Funcionalidades del sistema

El sistema cubre el flujo completo de una empresa de encomiendas: desde el registro del envio hasta su
entrega, cobro y comprobante, con control de acceso por rol y rastreo publico para el cliente.

Encomiendas

Dashboard

Rastreo publico

CRUD completo, codigo de
seguimiento, costo automatico y guia
PDF con QR

KPIs y graficos de linea, dona, barras
y medidor (Chart.js)

Pagina sin login para que el cliente
rastree por codigo

Caja y pagos

Comprobantes

Manifiestos

Pagos parciales, saldo, contra
entrega y cierre de caja diario

Boleta/factura con IGV 18%, serie
correlativa y PDF

Hoja de ruta con vehiculo, repartidor y
asignacion masiva

Listado completo de modulos y capacidades
■

Autenticacion y roles: Login con control de acceso para Administrador, Operador, Repartidor y
Cajero; recuperacion de contrasena por correo; cada rol ve solo sus modulos.

■

Encomiendas: Alta, edicion, baja logica, detalle, cambio de estado con maquina de estados valida,
codigo de seguimiento autogenerado y descarga de guia en PDF con codigo QR.

■

Seguimiento: Historial de movimientos por encomienda y vista "Mis entregas" para el repartidor (solo
sus paquetes asignados).

■

Clientes: Personas naturales o juridicas (remitente/destinatario) con validacion de DNI (8 digitos) y
RUC (11 digitos).

■

Sucursales y rutas: Oficinas por ciudad y rutas origen-destino con distancia, tiempo y tarifas propias
por ruta.

■

Costo automatico: Calculo del costo segun tarifa base + peso x costo/kg + distancia x costo/km, con
recargo express.

■

Pagos y caja: Pagos multiples/parciales con saldo, pago contra entrega y cierre de caja diario con
arqueo por metodo (efectivo, tarjeta, Yape/Plin, transferencia).

■

Comprobantes: Boleta y factura con numeracion correlativa por serie, IGV 18%, PDF y anulacion.

■

Vehiculos y manifiestos: Registro de vehiculos y manifiestos/hoja de ruta que agrupan encomiendas
por viaje, con asignacion masiva y PDF con firmas.

■

Notificaciones: Correo automatico al cliente y campana interna con contador de no leidas.

■

Reportes: Filtros por fecha, sucursal y estado, con exportacion a Excel (.xlsx) y PDF.

■

Configuracion: Datos de la empresa (RUC, direccion) y tarifas globales - solo Administrador.

■

Auditoria: Bitacora de creaciones, cambios de estado, emisiones, anulaciones y accesos (con IP).

■

Calidad y seguridad: Pruebas automatizadas, paginacion, baja logica para conservar historial y
ajustes de seguridad HTTPS/HSTS para produccion.

EnviosPro - Django 5 + MySQL

Pagina 2

EnviosPro

3

Sistema de Encomiendas - Documentacion

Instalacion en una computadora nueva

Guia paso a paso para dejar el sistema funcionando en un equipo Windows desde cero. Sigue los pasos
en orden.

Programas que debes descargar e instalar primero
Programa

Para que sirve

Donde obtenerlo

Python 3.10 o superior

Ejecuta la aplicacion

python.org/downloads

MySQL Server 8.0

Base de datos del sistema

dev.mysql.com/downloads/installer

MySQL Workbench (opcional)

Administrar la BD con interfaz

Incluido en el instalador de MySQL

Editor de codigo (opcional)

Ver/editar archivos

code.visualstudio.com

Importante: al instalar Python marca la casilla "Add Python to PATH". Durante la instalacion de MySQL anota la
contrasena del usuario root, la necesitaras luego.

Configuracion paso a paso
1

Copiar el proyecto al equipo
Copia la carpeta del proyecto neg-sistema-encomiendas al equipo nuevo (por ejemplo en
C:\Negocios\). Luego abre PowerShell dentro de esa carpeta.
POWERSHELL

$ cd C:\Negocios\neg-sistema-encomiendas

2

Crear la base de datos en MySQL
Abre MySQL Workbench o la consola de MySQL y crea la base de datos vacia (puedes usar el
archivo incluido):
MySQL

# Opcion A: con el archivo incluido
$ mysql -u root -p < crear_base_datos.sql
# Opcion B: a mano dentro de MySQL
$ CREATE DATABASE neg_encomiendas CHARACTER SET utf8mb4;

3

Crear y activar el entorno virtual
Aisla las librerias del proyecto del resto del sistema:
POWERSHELL

$ python -m venv .venv
$ .venv\Scripts\activate

EnviosPro - Django 5 + MySQL

Pagina 3

EnviosPro

4

Sistema de Encomiendas - Documentacion

Instalar las dependencias
Instala Django y todas las librerias necesarias listadas en requirements.txt:
POWERSHELL

$ pip install -r requirements.txt

5

Configurar la conexion (.env)
Copia .env.example como .env y edita tu contrasena de MySQL (deja DB_PASSWORD vacio si
root no tiene contrasena):
POWERSHELL

$ copy .env.example .env
# Luego edita .env:
$ DB_NAME=neg_encomiendas
$ DB_USER=root
$ DB_PASSWORD=tu_password
$ DB_HOST=localhost
$ DB_PORT=3306

6

Crear las tablas (migraciones)
Django genera automaticamente todas las tablas en la base de datos:
POWERSHELL

$ python manage.py migrate

7

Cargar datos de demostracion (recomendado)
Crea sucursales, clientes, 40 encomiendas con pagos y los usuarios de prueba:
POWERSHELL

$ python manage.py seed_demo

8

Iniciar el servidor
Arranca la aplicacion. Luego abre http://127.0.0.1:8000/ en el navegador.
POWERSHELL

$ python manage.py runserver

Credenciales de prueba (tras cargar los datos demo)
Usuario

Contrasena

Rol

admin

admin123

Administrador

operador

operador123

Operador

EnviosPro - Django 5 + MySQL

Pagina 4

EnviosPro

Sistema de Encomiendas - Documentacion

repartidor

repartidor123

Repartidor

cajero

cajero123

Cajero

Consejo: si no cargaste los datos demo, crea tu propio administrador con python manage.py
createsuperuser. El panel de administracion esta en /admin/.

EnviosPro - Django 5 + MySQL

Pagina 5

EnviosPro

4

Sistema de Encomiendas - Documentacion

Donde subir la aplicacion: hosting web sugerido

Como el sistema usa Django + MySQL, conviene un hosting que soporte Python y ofrezca una base de
datos MySQL. Estas son las tres opciones mas recomendadas en 2026:
Hosting

Ideal para

MySQL

Plan gratis

PythonAnywhere

Principiantes - cero configuracion, especializado
Si, incluida
en Python/Django
Si (1 app)

Muy baja

Railway

Despliegue moderno desde GitHub, MySQL Si,
gestionada
gestionada
en minutos
Credito inicial

Baja

Render

Precios predecibles, despliegue desde GitHub
Solo externa

Media

Si (limitado)

Dificultad

Recome
