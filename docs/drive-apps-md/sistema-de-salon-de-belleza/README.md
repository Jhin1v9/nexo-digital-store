# SISTEMA DE SALÓN DE BELLEZA

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/App web portafolio/PORTAFOLIO 2 WEBS/JAVASCRIPT - PORTAFOLIO APLICACIONES WEBS 2026/SISTEMA DE SALÓN DE BELLEZA

**PDF:** Documentacion_Sistema.pdf

---

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

👑
Sistema de Gestión
Salón de Belleza
Documentación Técnica Completa

Elaborado para: Administrador del Sistema
Clasificación: Uso Interno

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

1/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

2/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

📑 Tabla de Contenidos
1. Stack Tecnológico del Sistema

Pág. 3

2. Funcionalidades del Sistema

Pág. 4

3. Guía de Instalación Local (Paso a Paso)

Pág. 5

4. Opciones de Hosting Web Recomendadas

Pág. 7

5. Despliegue en Railway + Vercel (Guía Completa)

Pág. 8

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

3/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

Stack Tecnológico del Sistema

1

Tecnologías, frameworks y librerías que conforman la aplicación

🖥️ FRONTEND

⚙️ BACKEND

🗄️ BASE DE DATOS

(INTERFAZ VISUAL)

(SERVIDOR DE API)

React + Vite

Node.js +

Interfaz de usuario

Express

reactiva construida

API REST robusta

con soporte para

con componentes

con autenticación

transacciones y

modernos y

JWT, manejo de

claves foráneas.

renderizado

archivos con Multer

ultrarrápido.

y lógica de negocio

MySQL 8.x

React 18

Vite 5

alta confiabilidad

centralizada.

React Router v6

Express 4

Tailwind CSS

JWT Auth

Chart.js

Bcrypt

📊 EXPORTACIÓN DE

Motor relacional de

MySQL 8.4
mysql2/promise
Connection Pool

Multer

🔐 AUTENTICACIÓN

📨 NOTIFICACIONES

JWT + Roles

WhatsApp API

Tokens firmados y

Envío automático de

Generación de

control de acceso

mensajes

informes PDF y

con tres niveles de

personalizados ante

Excel directamente

permisos de

nuevas citas y

en el navegador del

usuario.

cancelaciones.

DATOS

jsPDF + XLSX

cliente.
jsonwebtoken

WhatsApp API

bcryptjs

Plantillas

jsPDF
3 roles

jspdf-autotable
SweetAlert2
XLSX

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

4/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

Figura 1 — Arquitectura de tres capas: Frontend React ↔ API Express ↔ Base de Datos MySQL

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

5/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

2

Funcionalidades del Sistema
Módulos operativos disponibles en el panel administrativo

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

6/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

📊

📅

Dashboard Ejecutivo
KPIs en tiempo real con gráficas

👥

galería de fotos antes/después por

y rendimiento del negocio.

cliente.

Agenda de Citas
Reservas con estados múltiples, pagos

💰

Control de Inventario
Gestión de productos del salón con
alertas de stock bajo y control de

🔧

Reportes Administrativos
Análisis por fechas: ingresos totales,

📉

Historial financiero de servicios

Egresos y Gastos
Registro categórico de salidas de
dinero (nómina, insumos, servicios,
mantenimiento).

👤

Gestión de Personal
Usuarios con roles: Administrador,

métodos de pago, desempeño por

Recepcionista y Estilista. Control de

estilista y servicios populares.

permisos granular.

Mantenimiento de Equipos
Registro de mantenimientos

📤

preventivos/correctivos con fechas,
presupuesto y evidencia fotográfica.

💾

Registro de Ventas
completados con métodos de pago y
filtros avanzados.

precios.

📈

CRUD completo con búsqueda en vivo,

interactivas de ingresos, citas, clientes

parciales (abonos) y notificaciones de
WhatsApp automáticas.

📦

Directorio de Clientes

Respaldo y Restauración
Copia de seguridad (.sql), restauración
y purga de fábrica para transferencia
de negocio.

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

Exportación Universal
Descarga de datos en PDF, Excel
(.xlsx) o vista de impresión desde todos
los módulos.

⚙️

Configuración Global
Personalización de logo, símbolo de
moneda, nombre del negocio y
plantillas de WhatsApp.

7/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

3

Guía de Instalación Local
Paso a paso para instalar el sistema en una computadora nueva

del Sistema
ℹ️ Requisitos
Windows 10/11 (64-bit), macOS 12+ o Ubuntu 20.04+. Mínimo 4 GB RAM, 2 GB de
espacio libre y conexión a internet.

📥 Programas a Instalar
A

Node.js v18 LTS o superior
Descarga desde: https://nodejs.org/es/download → Selecciona la versión LTS →
Instala con opciones por defecto. Verifica:
node --version
npm --version

B

MySQL Community Server 8.x
Descarga desde: https://dev.mysql.com/downloads/mysql/ → Selecciona Developer
Default. Anota la contraseña que pongas para el usuario root .

C

Git
Descarga desde: https://git-scm.com/downloads → Instala con opciones
predeterminadas.

🚀 Configuración del Sistema
1

Clonar el repositorio
git clone https://github.com/tu-usuario/sistema-salondebelleza.git
cd sistema-salondebelleza

2

Instalar dependencias del Backend

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

8/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

cd backend
npm install

3

Crear el archivo de entorno Backend
Crea el archivo backend/.env con:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=salon_belleza_db
JWT_SECRET=clave_secreta_muy_larga_y_segura

4

Crear la base de datos automáticamente
node setup_db.js

Crea todas las tablas y usuario admin: admin@salon.com / admin123

5

Instalar dependencias del Frontend y configurar
cd ../frontend
npm install

Crea el archivo frontend/.env :
VITE_API_URL=http://localhost:5000/api

6

Iniciar el sistema (dos terminales)
Terminal 1 — Backend:
cd backend && node server.js

Terminal 2 — Frontend:
cd frontend && npm run dev

Accede en: http://localhost:5173

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

9/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

10/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

4

Opciones de Hosting Web
Comparativa de plataformas para publicar el sistema en internet

Plataforma

⭐

Node.js

MySQL

✓ Sí

✓ Sí

Gratis

Trial $5

Facilidad

Ideal para

⭐⭐⭐⭐⭐

Backend + BD —

Railway.app
Vercel

RECOMENDADO

Solo

✗ No

✓ Sí

⭐⭐⭐⭐⭐

Frontend React

✓ Sí

Limitado

⭐⭐⭐⭐

Alternativa a

API

Render.com

✓ Sí

Railway
DigitalOcean

✓ Sí

✓ Sí

✗ No

⭐⭐⭐

Producción
empresarial

Hostinger

✓ Sí

✓ Sí

✗ No

⭐⭐⭐

VPS

Hosting
latinoamericano

Óptima: Railway + Vercel
💡 Combinación
Railway para el Backend (Node.js + MySQL) y Vercel para el Frontend (React). HTTPS
automático, despliege desde GitHub y costo aproximado de $5–10 USD/mes.

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

11/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

5

Despliegue en Railway + Vercel
Guía completa para publicar el sistema en internet

Figura 2 — Flujo: código local → GitHub → Railway (Backend+DB) + Vercel (Frontend)

☁️ Fase A: Subir Código a GitHub
1

Crear repositorio en GitHub.com
Ve a https://github.com → New Repository → Nombre: salon-belleza → Privado →
Crear.

file:///C:/Webs/Javascript/sistema-salondebelleza/documentacion_tecnica.html

12/14

22/3/26, 7:54

Documentación Técnica – Sistema Salón de Belleza

2

Subir el proyecto
git init
git add .
git commit -m "Sistema Salón de Belleza v1.0"
git remote add origin https://github.com/tu-usuario/salon-belleza.git
git push -u origin main

🚂 Fase B: Backend en Railway
3

Crear cuenta y proyecto en Railway
Ve a https://railway.app → Login with GitHub → New Project → Provision MySQL.
Copia las credenciales de conexión generadas.

4

Añadir servicio Node.js
En el proyecto: Add Service → GitHub R
