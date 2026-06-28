# ERP_EDUCATIVO

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/PORTAFOLIO APLICACIONES CRM Y ERP - 2026/APLICACIONES CRM Y ERP/ERD - Empresas/ERP_EDUCATIVO

**PDF:** ERP_Educativo_Documentacion.pdf

---

ERP EDUCATIVO
Sistema de Gestion Integral para Institutos,
Academias y Universidades

Documentacion tecnica completa
Tecnologia - Funcionalidades - Instalacion - Hosting - Despliegue

Version 1.0 - Mayo 2026
Preparado para Vito - victor.rs.datsoft@gmail.com

ERP EDUCATIVO

Documentacion tecnica - Vito, 2026

Contenido
Esta documentacion describe en detalle el ERP Educativo: su arquitectura, modulos funcionales,
instrucciones de instalacion en un equipo nuevo y opciones de despliegue en internet.

1.

Tecnologia y arquitectura del sistema

pag. 3

2.

Funcionalidades - los 20 modulos

pag. 5

3.

Instalacion paso a paso en un equipo nuevo

pag. 9

4.

Hosting web recomendado

pag. 13

5.

Despliegue en Azure App Service paso a paso

pag. 15

6.

Recomendaciones finales

pag. 18

Acerca de este documento
Stack tecnologico del proyecto: .NET 10, Blazor Server, Entity Framework Core 10, SQL
Server, MudBlazor, ApexCharts y arquitectura limpia con MediatR. El sistema cubre 20
modulos funcionales que abarcan desde la admision y matricula hasta la titulacion del
estudiante.

ERP Educativo - Sistema de gestion academica integral

Pagina 1

ERP EDUCATIVO

Documentacion tecnica - Vito, 2026

1. Tecnologia y arquitectura
El ERP Educativo esta desarrollado sobre el ecosistema de Microsoft .NET 10 empleando una
arquitectura limpia (Clean Architecture). Esto significa que el codigo esta separado en capas con
responsabilidades muy claras, lo que facilita el mantenimiento, las pruebas automatizadas y la
incorporacion futura de nuevas funcionalidades.

Stack tecnologico completo
Frontend

Blazor Server (Razor Components, .NET 10)

Backend

ASP.NET Core 10 con C# 13

ORM

Entity Framework Core 10

Base de datos

SQL Server 2022/2025

SDK

.NET 10 SDK

Autenticacion

ASP.NET Core Identity + JWT Bearer

Componentes UI

MudBlazor (Material Design)

Graficos

Blazor-ApexCharts

Reportes

QuestPDF (PDF) + ClosedXML (Excel)

Logging

Serilog (consola + archivo + BD)

Patrones

CQRS con MediatR, Repository, Unit of Work

Validaciones

FluentValidation

Mapeo de objetos

AutoMapper

Pruebas

xUnit + Moq

CI/CD

GitHub Actions

Distribucion del stack

ERP Educativo - Sistema de gestion academica integral

Pagina 2

ERP EDUCATIVO

ERP Educativo - Sistema de gestion academica integral

Documentacion tecnica - Vito, 2026

Pagina 3

ERP EDUCATIVO

Documentacion tecnica - Vito, 2026

Arquitectura por capas (Clean Architecture)
La solucion ERPEducativo.slnx se compone de seis proyectos que respetan la regla de dependencias
hacia el centro: las capas externas dependen de las internas, nunca al reves. Esto deja al dominio (las
reglas de negocio educativas) totalmente independiente de la base de datos o del framework web.

ERP.Domain

Entidades del negocio (Estudiante, Curso, Matricula...) y reglas
de negocio puras.

ERP.Application

Casos de uso, comandos y consultas via MediatR, DTOs e
interfaces.

ERP.Infrastructure

Implementacion de EF Core, repositorios, Identity, acceso a SQL
Server.

ERP.API

API REST en ASP.NET Core para integracion con apps externas
y portales.

ERP.Web

Frontend Blazor Server con MudBlazor (interfaz principal del
sistema).

ERP.Shared

DTOs, enums y constantes compartidas entre todas las capas.

ERP Educativo - Sistema de gestion academica integral

Pagina 4

ERP EDUCATIVO

Documentacion tecnica - Vito, 2026

2. Funcionalidades - los 20 modulos
El sistema cubre la operacion completa de una institucion educativa (instituto, academia o universidad).
Cada modulo agrupa funcionalidades relacionadas y se integra con los demas a traves de la capa de
aplicacion.

ERP Educativo - Sistema de gestion academica integral

Pagina 5

ERP EDUCATIVO

Documentacion tecnica - Vito, 2026

1. Configuracion general

2. Usuarios y seguridad

Parametriza la institucion antes de operar: datos
basicos, logo, anios y periodos academicos,
niveles, modalidades, turnos, moneda, SMTP,
roles, auditoria, backup y tema visual.

Registro de usuarios con roles (Administrador,
Docente,
Alumno,
Apoderado,
Contador,
Recepcionista), permisos granulares por modulo,
2FA, recuperacion de contrasenia, bloqueo por
intentos fallidos e historial de accesos.

3. Gestion academica

4. Admision y matricula

Facultades, carreras, planes de estudio (malla
curricular), cursos/asignaturas, prerrequisitos,
creditos, secciones, asignacion de docentes,
horarios, calendario y syllabus.

Registro de prospectos, postulacion en linea,
examen de admision, cuadro de meritos, matricula
(nueva/regular/traslado), pago integrado, ficha
PDF, control de vacantes y matricula condicional.

5. Gestion de estudiantes

6. Gestion de docentes

Expediente
completo
del
alumno:
datos
personales, apoderado, historial academico,
traslados, retiros, reingreso, documentos, ficha
medica, carnet con QR y exportacion.

Datos personales y profesionales, contratos,
especialidades, hoja de vida, asignacion de
cursos, carga horaria, evaluacion de desempenio y
capacitaciones.

7. Asistencia

8. Calificaciones y evaluaciones

Registro de asistencia de alumnos y docentes por
sesion,
asistencia
masiva,
integracion
biometrica/QR/RFID, justificaciones, alertas por
baja asistencia y reportes.

Sistema configurable (0-20, A-F, 0-100), formulas
de promedio ponderado, registro de notas,
recuperaciones, libretas, actas firmadas en PDF,
ranking y alertas de riesgo academico.

9. Tesoreria y finanzas

10. Biblioteca

Conceptos de pago, tarifarios, deuda automatica
por
matricula,
pagos
en
caja/transferencia/QR/tarjeta, comprobantes PDF,
descuentos y becas, fraccionamiento, mora,
integracion
con
pasarelas
y
facturacion
electronica.

Catalogo bibliografico, ejemplares con QR/codigo
de barras, prestamos y devoluciones, reservas en
linea, multas y reportes de los libros mas
solicitados.

11. Horarios

12. Comunicaciones

Configuracion de franjas, generacion manual y
automatica, deteccion de conflictos, vista
personalizada por alumno y docente, impresion
PDF y control de capacidad de aulas.

Mensajeria interna, comunicados masivos por
email
y
push,
circulares,
notificaciones
automaticas de notas/asistencia/deuda, chat
institucional, SMS y tablon de anuncios.

13. Portal del estudiante

14. Portal del docente

Dashboard personalizado, consulta de notas y
asistencia, descarga de constancias, estado de
cuenta, pago en linea, horario, materiales del
curso y mensajeria con docentes.

Resumen de cursos, ingreso digital de notas y
asistencia, subida de material, creacion de tareas,
mensajeria y descarga de actas.

15. Portal del apoderado

16. Tramites y documentos

Seguimiento de las notas, asistencia y pagos de
los hijos, recepcion de comunicados, solicitud de
citas con docentes y visualizacion de horarios.

Catalogo
de
documentos
(constancias,
certificados, historial...), solicitud en linea,
aprobacion, generacion automatica PDF con firma
digital y seguimiento del estado.

ERP Educativo - Sistema de gestion academica integral

Pagina 6

ERP EDUCATIVO

Documentacion tecnica - Vito, 2026

17. Personal administrativo

18. Inventario y activos

Registro del personal no docente, contratos,
control de asistencia, vacaciones, permisos,
evaluacion, liquidacion de haberes y boletas de
pago.

Activos fijos con codigo, asignacion a personas o
ambientes, mantenimiento preventivo y correctivo,
bajas, gestion de almacen y control de stock
minimo y maximo.

19. Reportes y BI

20. Graduacion y titulacion

Dashboard ejecutivo con KPIs, reportes de
matricula, rendimiento, asistencia, ingresos,
desercion, egresados; graficos de evolucion y
reportes automaticos por email.

Verificacion de requisitos de egreso, proceso de
grado, tesis y jurados, actas en PDF, registro de
titulos, diplomas y seguimiento de alumni.

ERP Educativo - Sistema de gestion academica integral

Pagina 7

ERP EDUCATIVO

Documentacion tecnica - Vito, 2026

3. Instalacion paso a paso en un equipo
nuevo
Esta guia explica todo lo necesario para poner en marcha el ERP Educativo en una computadora con
Windows 10
