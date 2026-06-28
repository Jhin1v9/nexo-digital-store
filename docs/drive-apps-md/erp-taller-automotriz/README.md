# ERP_TALLER_AUTOMOTRIZ

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/PORTAFOLIO APLICACIONES CRM Y ERP - 2026/APLICACIONES CRM Y ERP/ERD - Empresas/ERP_TALLER_AUTOMOTRIZ

**PDF:** Manual_AutoTaller_ERP.pdf

---

26/4/26, 14:07

Manual Técnico - AutoTaller ERP

AutoTaller ERP
Manual Técnico y Guía de Despliegue

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

1/8

26/4/26, 14:07

Manual Técnico - AutoTaller ERP

Documentación Técnica Oficial

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

2/8

26/4/26, 14:07

Manual Técnico - AutoTaller ERP

1. Especificaciones

AutoTaller ERP

Stack Tecnológico
El sistema AutoTaller ERP está construido sobre una arquitectura moderna,
escalable y en tiempo real, utilizando las últimas tecnologías del ecosistema de
Microsoft, estructurado bajo el patrón Clean Architecture (Dominio, Aplicación,
Infraestructura y Web).

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

3/8

26/4/26, 14:07

Manual Técnico - AutoTaller ERP

Figura 1: Tecnologías clave utilizadas en el desarrollo

Presentación (Frontend): Blazor Server (.NET 8), con componentes visuales de
MudBlazor 7 y Material Icons para una experiencia rica de usuario (SPA) sin
escribir JavaScript.

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

4/8

26/4/26, 14:07

Manual Técnico - AutoTaller ERP

2. Instalación
Local

Puesta en marcha en equipo
nuevo

Requisitos Previos
Para instalar y ejecutar el proyecto fuente en una computadora nueva, se deben
descargar e instalar las siguientes herramientas:

1. SDK de .NET 8.0: Descargar desde Microsoft .NET.
2. SQL Server 2022 (Developer o Express): Descargar desde la página oficial
de SQL Server.
3. SQL Server Management Studio (SSMS): Para visualización de la base de
datos.
4. Visual Studio 2022 o VS Code: Entorno de desarrollo (IDE).

Paso a Paso: Configuración y Ejecución
1

Clonar/Copiar el Repositorio
Copia la carpeta completa erp-taller-automotriz a tu disco local (ej.
C:\Proyectos\erp-taller-automotriz).

2

Configurar Cadena de Conexión
Abre el archivo src\ERP.TallerAutomotriz.Web\appsettings.json y verifica que el Server
Ejemplo:

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

5/8

26/4/26, 14:07

Manual Técnico - AutoTaller ERP

"ConnectionStrings": { "DefaultConnection":
"Server=TU_PC\\SQLEXPRESS;Database=TallerAutomotrizERP;Trusted_Conne
}

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

6/8

26/4/26, 14:07

Manual Técnico - AutoTaller ERP

3. Despliegue en la Recomendaciones de
Nube

Hosting

Hosting Web Recomendado
Dado que el sistema está construido en Blazor Server (.NET 8) y SQL Server, las
mejores opciones para un despliegue profesional y robusto son plataformas
optimizadas para el ecosistema Windows/Microsoft. La mejor opción, por
escalabilidad y compatibilidad perfecta es Microsoft Azure, seguido de servicios
especializados en Windows Hosting como SmarterASP.NET o Hostinger (VPS
Windows).

Nuestra recomendación: Microsoft Azure App Service
Ofrece un entorno PaaS (Plataforma como Servicio) donde no te preocupas
por configurar el servidor (IIS). Tiene soporte nativo para WebSockets
(requerido por Blazor Server) e integraciones directas con Azure SQL
Database.

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

7/8

26/4/26, 14:07

file:///C:/CRMyERP/erp-taller-automotriz/Manual_AutoTaller_ERP.html

Manual Técnico - AutoTaller ERP

8/8
