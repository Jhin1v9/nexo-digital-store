# SISTEMA DE GIMNASIO

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/FACTURACION DEV/COLOMBIA - APPS WEBS FACTURACION/SISTEMA DE GIMNASIO

**PDF:** Manual_Facturacion_Electronica_DIAN.pdf

---

COL_GYM-SYSTEM
Manual tecnico y operativo

Facturacion Electronica DIAN
Manual tecnico y operativo
Tecnologia, funcionalidades, requisitos del emisor y guia paso a paso para la puesta en produccion en
Colombia.

Sistema: col_gym-system
Documento dirigido al propietario / administrador del negocio.

Documento generado el 27/05/2026

v1.0 - Facturacion Electronica DIAN (Colombia)

COL_GYM-SYSTEM
Manual tecnico y operativo

Contenido
1. Tecnologia utilizada en la integracion

3

2. Funcionalidades disponibles en el sistema

5

3. Datos que debe proveer el dueno de la empresa

7

4. Configuracion y puesta en produccion paso a paso

10

5. Diagramas y referencia visual

14

Que es este documento?
Esta guia explica como esta construido el modulo de Facturacion Electronica del sistema col_gym-system para
Colombia, que funcionalidades ofrece, que informacion y tramites debe gestionar el dueno del negocio ante la DIAN
y, finalmente, como configurar y poner en marcha el modulo en un ambiente de produccion real.

Documento generado el 27/05/2026

v1.0 - Facturacion Electronica DIAN (Colombia)

COL_GYM-SYSTEM
Manual tecnico y operativo

1. Tecnologia utilizada en la integracion
El modulo de facturacion electronica esta construido sobre la arquitectura del propio sistema (PHP nativo + MVC
manual + MySQL) y se comunica con la DIAN de forma directa, sin pasar por un proveedor tecnologico intermedio.
Toda la generacion del XML, la firma digital, el empaquetado y el envio del sobre SOAP se hace integramente
desde el servidor del cliente.

INTERFAZ DE USUARIO

POS - Suscripciones - Bandeja - Configuracion DIAN

LOGICA DE NEGOCIO (PHP 8 + MySQL)
Facturador - UblColombia - Cufe - FirmadorXades - DianClient

SERVICIO WEB DIAN (SOAP + WS-Security)
WcfDianCustomerServices - Habilitacion / Produccion

1.1 Componentes y estandares
Componente

Tecnologia / Estandar

Proposito

Lenguaje

PHP 8.x (CLI + Apache/Nginx)

Servidor de aplicaciones del sistema.

Base de datos

MySQL 8 / MariaDB 10.6+

Persistencia de comprobantes, detalle, resoluciones y log.

Documento generado el 27/05/2026

v1.0 - Facturacion Electronica DIAN (Colombia)

COL_GYM-SYSTEM
Manual tecnico y operativo

Componente

Tecnologia / Estandar

Proposito

Frontend

Bootstrap 5, FontAwesome 6, Chart.js Interfaz de bandeja, configuracion y dashboards.

Estandar fiscal

UBL 2.1 (perfil DIAN 1.9)

Firma digital

XAdES-EPES + politica de firma DIAN Garantiza autenticidad y no repudio del documento.

Algoritmos

SHA-384 (CUFE) - RSA-SHA256 - C14N
Hash
exclusivo
de integridad y firma criptografica.

Servicio web

SOAP 1.2 + WS-Security

Comunicacion con WcfDianCustomerServices de la DIAN.

Certificado

PKCS#12 (.p12 / .pfx)

Identidad digital del emisor (entidad acreditada).

PDF + QR

FPDF - phpqrcode

Representacion grafica del documento electronico.

Extensiones PHP

openssl - dom - curl - zip - pdo_mysql Dependencias del modulo DIAN.

Estructura del XML de Factura, Notas y Documento POS.

1.2 Organizacion del codigo
Toda la logica de facturacion electronica esta agrupada en la carpeta app/lib/dian/ para mantenerla aislada del
resto del sistema:
Facturador.php - orquestador.
UblColombia.php - generador XML UBL 2.1.
Cufe.php - calculo CUFE/CUDE.
FirmadorXades.php - firma XAdES-EPES.
DianClient.php - cliente SOAP DIAN.
ZipHelper.php - empaquetado.
NumeroLetras.php - total en letras (pesos).

Documento generado el 27/05/2026

v1.0 - Facturacion Electronica DIAN (Colombia)

COL_GYM-SYSTEM
Manual tecnico y operativo

2. Funcionalidades disponibles en el sistema
El modulo cubre el ciclo completo de la facturacion electronica para un negocio de gimnasio: desde la generacion
del documento hasta su envio al adquiriente y consulta del estado en la DIAN.
Tipos de documento

• Factura electronica de venta (FV)
• Documento equivalente POS electronico
• Nota credito electronica (anulaciones, devoluciones, descuentos)
• Nota debito electronica (ajustes al alza)

Emision

• Desde el modulo POS al cobrar una venta
• Desde Suscripciones al pagar una membresia
• Generacion manual de notas credito y debito
• Selector factura vs documento POS al momento de cobrar

Procesamiento

• Calculo automatico de IVA y totales
• Asignacion de prefijo y consecutivo segun resolucion DIAN
• Generacion de CUFE (factura) o CUDE (notas / POS) con SHA-384
• Construccion del XML UBL 2.1 con DianExtensions
• Firma XAdES-EPES con politica de firma DIAN
• Empaquetado en ZIP y envio SOAP al WcfDianCustomerServices

Operacion

• Bandeja con filtros (fecha, tipo, estado)
• Reintento individual de envio
• Reintento por lote de pendientes / rechazados
• Consulta del estado por TrackId
• Marcado automatico de anulacion al aceptar una NC
• Soporte de ambiente Habilitacion y Produccion

Documento generado el 27/05/2026

v1.0 - Facturacion Electronica DIAN (Colombia)

COL_GYM-SYSTEM
Manual tecnico y operativo

Entregables

• Representacion grafica en PDF con codigo QR
• Descarga del XML firmado
• Descarga del ApplicationResponse DIAN
• Envio al cliente por correo electronico
• Envio al cliente por WhatsApp (CallMeBot)

Configuracion

• Datos fiscales del emisor (NIT, DV, regimen, responsabilidad)
• Carga de certificado .p12 con clave
• Software ID, Software PIN y TestSetId
• Gestion de resoluciones de numeracion (CRUD)
• Calculo automatico del DV de un NIT

Auditoria

• Log tecnico de cada interaccion con la DIAN
• KPIs del mes en el dashboard
• Grafica de emision diaria
• Historial de mensajes de error

2.1 Estados de un documento electronico
PENDIENTE

ENVIADO

EN PROCESO

RECHAZADO

ERROR

ANULADO

ACEPTADO

(estados de error / cancelacion)

El flujo normal es pendiente - enviado - aceptado. Si la DIAN demora en responder de forma sincronica (tipico del
ambiente de habilitacion), el documento pasa por en proceso y se puede consultar mas tarde con el boton
Consultar estado.

Documento generado el 27/05/2026

v1.0 - Facturacion Electronica DIAN (Colombia)

COL_GYM-SYSTEM
Manual tecnico y operativo

3. Datos que debe proveer el dueno de la empresa
Para emitir documentos electronicos ante la DIAN en produccion se necesita informacion fiscal de la empresa,
credenciales tecnicas asignadas por la DIAN y un certificado digital emitido por una entidad de certificacion
acreditada por el ONAC. La siguiente es la lista completa, agrupada por categoria.

3.1 Datos fiscales del emisor (del RUT)
•

NIT de la empresa, sin el digito de verificacion.

•

Digito de verificacion (DV); el sistema lo calcula automaticamente.

•

Razon social exactamente como aparece en el RUT.

•

Nombre comercial (si lo usa).

•

Tipo de persona: Juridica o Natural.

•

Regimen de IVA: Responsable (48) o No responsable (49).

•

Responsabilidades del RUT: O-13, O-15, O-23, O-47 o R-99-PN.

•

Direccion fiscal completa.

•

Departamento y municipio con sus codigos DANE (p.ej. 11 / 11001 para Bogota D.C.).

•

Codigo postal.

•

Correo electronico de facturacion.

•

Tasa de IVA por defecto (tipicamente 19 %).

3.2 Tramites previos ante la DIAN
Estos pasos los debe realizar el representante legal en el portal MUISCA de la DIAN (muisca.dian.gov.co)
antes de poder usar el modulo. No los hace el sistema.

Documento generado el 27/05/2026

v1.0 - Facturacion Electronica DIAN (Colombia)

COL_GYM-SYSTEM
Manual tecnico y operativo

•

Inscribir la responsabilidad 52 - Facturador electronico en el RUT.

•

Solicitar la habilitacion como facturador electronico en MUISCA.

•

Registrar el software como 'Software propio' y obtener Software ID y Software PIN.

•

Solicitar y aprobar el set de pruebas de la DIAN (TestSetId).

•

Solicitar la resolucion de numeracion de Factura Electronica de Venta para produccion (numero de resolucion,
fecha, prefijo, rango, vigencia y Clave Tecnica).

•

Repetir el tramite anterior - si aplica - para Notas Credito, Notas Debito y Documento Equivalente POS.
Importante
La Clave Tecnica solo se entrega para la resolucion de Factura Electronica de Venta y es indispensable par
