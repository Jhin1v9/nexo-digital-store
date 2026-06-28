# SISTEMA DE CONSULTORIO MÉDICO

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Negocios Apps - 2026/SISTEMA DE CONSULTORIO MÉDICO

**PDF:** Manual_MediCare.pdf

---

MediCare

Sistema de Gestion para Consultorio Medico

Manual tecnico, instalacion y despliegue
Tecnologia del sistema · Funcionalidades
Instalacion paso a paso · Hosting recomendado
Guia de publicacion en internet

Tecnologia: Python · Django 5 · MySQL · HTML/CSS/JS
Documento generado el 25/06/2026

MediCare · Manual del sistema

Acerca de este documento
Este manual describe el sistema MediCare, un software de gestion para consultorios medicos. Encontraras la
tecnologia con la que fue construido, todas sus funcionalidades, la guia paso a paso para instalarlo en una
computadora nueva, y como publicarlo en internet en el hosting recomendado. Esta pensado para que cualquier
persona pueda seguirlo, aunque no sea programador.

1

Tecnologia del sistema

MediCare es una aplicacion web. Esto significa que se usa desde un navegador (Chrome, Edge, Firefox) y
puede funcionar tanto en una sola computadora como publicada en internet para acceder desde cualquier
lugar.

Lenguaje y framework principal
Python 3.12

Django 5

MySQL 8

HTML + CSS

JavaScript

Componentes y librerias
●

Python / Django 5: el "motor" del sistema. Django es uno de los frameworks web mas usados y seguros del
mundo.

●

MySQL 8 / MariaDB: la base de datos donde se guarda toda la informacion (pacientes, citas, facturas, etc.). Se
conecta con el driver PyMySQL.

●

HTML, CSS y JavaScript: la parte visual. Diseno propio con paleta verde-azulada (teal) apropiada para salud, y
Chart.js para los graficos del panel.

●

Pillow (imagenes), openpyxl (exportar a Excel), ReportLab (generar PDF de recetas, reportes y ordenes).

●

python-dotenv: lee la configuracion (claves y datos de la base) desde un archivo .env.

●

Jitsi Meet para las videollamadas de telemedicina (gratis, sin instalar nada) y, opcionalmente, Twilio para enviar
SMS.

Como se conectan las piezas
Usuarios: Administrador · Medico · Recepcion · Paciente (Portal)

Navegador web — HTML + CSS (paleta teal) + JavaScript + Chart.js

Django 5 (proyecto consultorio)

Servicios

13 modulos: pacientes, citas, consultas, laboratorio,

Jitsi (videollamada)

facturacion, inventario, compras, finanzas, portal...

Correo / WhatsApp / SMS

Base de datos — MySQL 8 / MariaDB (via PyMySQL)

El usuario entra desde el navegador; Django procesa la peticion, consulta o guarda en MySQL y devuelve la pagina. Algunos servicios
externos (videollamada, correo, WhatsApp/SMS) se usan solo cuando se necesitan.

MediCare — Manual tecnico, instalacion y despliegue

Pagina 1

2

Funcionalidades del sistema

MediCare cubre practicamente todo el ciclo de atencion de un consultorio. Estos son sus modulos:
Tablero / Dashboard

Pacientes

Indicadores del dia y graficos. Panel distinto segun el rol
(admin, medico o recepcion).

Ficha clinica completa: alergias, antecedentes, contacto de
emergencia y documentos adjuntos.

Medicos y especialidades

Citas y agenda

Tarifas, colegiatura (CMP), horarios de atencion y catalogo
de especialidades.

Agenda semanal, estados, horarios libres y modalidad
presencial o virtual (telemedicina).

Consultas / Historia

Recetas

Signos vitales, IMC, diagnostico, tratamiento e historia
clinica del paciente.

Receta medica imprimible y descargable en PDF con
membrete y firma.

Laboratorio

Facturacion

Ordenes de examenes, impresion y registro de resultados
que llegan al portal del paciente.

Comprobantes con IGV automatico, metodos de pago y
estados.

Cuentas por cobrar

Caja diaria

Saldos pendientes por paciente, antiguedad de la deuda y
recordatorio de pago.

Apertura y cierre de caja, arqueo y sesiones con
responsable.

Inventario

Compras y proveedores

Productos, stock, stock minimo y movimientos de
entrada/salida.

Ordenes de compra que, al recibirse, suman stock y
registran el gasto.

Finanzas

Portal del paciente

Gastos por categoria y balance de ingresos contra egresos.

El paciente ve sus citas, historial, descarga recetas, reserva
cita y cambia su clave.

Recordatorios

Reportes e indicadores

Avisos de cita por correo, WhatsApp y SMS, manuales o
automaticos.

Reportes en Excel y PDF, e indicadores gerenciales con
graficos por periodo.

Seguridad por roles
El sistema controla quien puede ver y hacer cada cosa segun su rol: Administrador, Medico y Recepcion, mas un
acceso independiente y seguro para el Paciente en su portal. Las claves se guardan cifradas.

MediCare — Manual tecnico, instalacion y despliegue

Pagina 2

3

Instalacion en una computadora nueva

Sigue estos pasos en orden. La guia esta pensada para Windows, que es lo mas comun en un consultorio.

A. Programas que debes descargar e instalar
1. Python 3.12

2. XAMPP (MySQL)

Descarga desde python.org/downloads. Al instalar, marca la
casilla "Add Python to PATH".

Descarga desde apachefriends.org. Trae MySQL/MariaDB y
phpMyAdmin para administrar la base con clics.

3. Editor de texto (opcional)

4. Git (opcional)

Visual Studio Code (code.visualstudio.com) para ver y editar
archivos comodamente.

git-scm.com. Util si vas a descargar el proyecto desde un
repositorio o subirlo a un hosting.

B. Puesta en marcha paso a paso

1

Coloca el proyecto en una carpeta

2

Abre una terminal en esa carpeta

Copia la carpeta del sistema (por ejemplo sistema-consultorio-medico) en tu disco, por ejemplo en
C:\Negocios\.

Abre el "Simbolo del sistema" (CMD), o en VS Code el menu Terminal, y entra a la carpeta:
cd C:\Negocios\sistema-consultorio-medico

3

Crea e activa el entorno virtual
Un entorno virtual aisla las librerias del proyecto:
python -m venv venv
venv\Scripts\activate

4

Instala las librerias del proyecto
pip install -r requirements.txt

5

Crea la base de datos en MySQL
Inicia MySQL en el panel de XAMPP, abre phpMyAdmin y crea una base llamada neg_consultorio_medico
(cotejamiento utf8mb4_unicode_ci). O por consola:
CREATE DATABASE neg_consultorio_medico
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

MediCare — Manual tecnico, instalacion y despliegue

Pagina 3

6

Configura el archivo .env
Copia .env.example como .env y ajusta usuario y clave de MySQL (en XAMPP el usuario suele ser root sin clave):
DB_NAME=neg_consultorio_medico
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306

7

Crea las tablas y los datos de ejemplo
python manage.py migrate
python manage.py seed
python manage.py seed_modulos (opcional: datos de prueba)

8

Inicia el servidor
python manage.py runserver
Abre el navegador en http://127.0.0.1:8000/ e ingresa con admin / admin123.

Listo. Ya tienes el sistema funcionando localmente
A partir de aqui, cada vez que quieras usarlo: abre la terminal en la carpeta, ejecuta "venv\Scripts\activate" y luego
"python manage.py runserver".

MediCare — Manual tecnico, instalacion y despliegue

Pagina 4

Hosting web: donde publicar tu aplicacion

4

Para que el sistema sea accesible desde internet (y no solo en una computadora) necesitas un hosting que
soporte Python/Django y base de datos MySQL. Estas son las mejores opciones en 2026:
Hosting

Ideal para

Base de datos

Precio aprox.

Facilidad

PythonAnywhere

Principiantes / este sistema

MySQL nativo

Desde US$5/mes

Muy facil

Railway

Despliegue rapido con Git

PostgreSQL

Uso + ~US$5 credito

Facil

Render

Precio predecible

PostgreSQL

Gratis* / desde US$7

Media

DigitalOcean

Mas control (servidor propio)

MySQL/PostgreSQ
L

Desde US$6/mes

Avanzada

Recomendado: PythonAnywhere
Es la opcion mas sencilla y la unica grande que soporta MySQL de forma nativa, que es la base de datos de MediCare.
No requiere conocimientos de servidores ni Docker. Nota 2026: el uso de MySQL ahora requiere un plan de pago; el
plan "Hacker" cuesta unos US$5 al mes e incluye base de datos MySQL y dominio propio.
* El plan gratuito de Render "duerme" tras unos minutos de inactividad y usa PostgreSQL, por lo que habria que cambiar el motor de
base de datos. Railway tambien usa PostgreSQL. Por eso, para este sistema, PythonAnywhere es lo mas directo.

MediCare — Manual tecnico, instalacion y despliegue

Pagina 5

5
