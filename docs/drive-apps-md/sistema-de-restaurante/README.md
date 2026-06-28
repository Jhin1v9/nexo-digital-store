# SISTEMA DE RESTAURANTE

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/FACTURACION DEV/COLOMBIA - APPS WEBS FACTURACION/SISTEMA DE RESTAURANTE

**PDF:** Documentacion_Facturacion_Electronica_DIAN.pdf

---

FACTURACIÓN
ELECTRÓNICA DIAN
República de Colombia

Documentación técnica e implementación
Sistema POS — col_restaurante
Versión 1.0 — Mayo 2026
Resolución DIAN 000165 de 2023

Preparado para el dueño de la empresa — Guía de puesta en
producción

Facturación Electrónica DIAN Colombia

Sistema col_restaurante

1. Tecnología utilizada
La integración de facturación electrónica con la DIAN se desarrolló como un módulo nativo del propio
sistema POS, sin depender de proveedores tecnológicos externos. Esto significa que el restaurante
envía las facturas directamente a los servidores de la DIAN, sin intermediarios y sin costos por
documento emitido.

1.1 Stack tecnológico
Componente

Tecnología / Librería

Versión

Función

Lenguaje

PHP

8.2+

Backend del sistema

Framework

Laravel

12.x

MVC, ORM Eloquent, routing

Base de datos

MySQL

8.x

Persistencia de órdenes, eventos
DIAN y AR

HTTP / SOAP

Guzzle

7.8+

Cliente HTTP para enviar a la DIAN

Firma digital

robrichards/xmlseclibs

3.1+

Firma XAdES-EPES sobre el XML
UBL

Código QR

endroid/qr-code

5.0+

QR de la representación gráfica

Formato XML

UBL 2.1 + DIAN ext.

CustomizationID
=10

Estándar nacional obligatorio

Hash CUFE

SHA-384

nativo PHP

Código Único de Factura Electrónica

Vistas

Blade + Bootstrap 5

—

Interfaz de configuración y consulta

1.2 Arquitectura por capas
Vistas Blade + Bootstrap 5

Capa 1

Controladores Laravel (Dian*Controller)

Capa 2

Servicios DIAN (XML, Firma, SOAP, CUFE, QR)

Capa 3

Librerías: Guzzle 7 + xmlseclibs 3 + endroid/qr-code 5

Capa 4

Laravel 12 + PHP 8.2

Capa 5

MySQL 8 (col_restaurante_db)

Capa 6

Cada capa se apoya únicamente en la inmediatamente inferior. Esto permite cambiar la implementación de cualquier
componente sin afectar al resto.

Documentación técnica - Mayo 2026

Página 2

Facturación Electrónica DIAN Colombia

Sistema col_restaurante

1.3 Flujo de envío de una factura
1

Order POS

2

XML UBL 2.1

3

Firma XAdES

Venta lista para
facturar

InvoiceXmlBuilder
genera el XML

XadesSigner sella
con el .p12

4

5

6

SOAP DIAN

SendBillSync
vía Guzzle

AR + CUFE

Application
Response

PDF + QR

Representación
gráfica

Cada paso queda registrado en la tabla dian_events con timestamp, request y response, lo que permite trazabilidad
completa para soporte.

1.4 Endpoints DIAN utilizados
Ambiente

Endpoint SOAP

Consulta QR

Habilitación
(pruebas)

https://vpfe-hab.dian.gov.co/
WcfDianCustomerServices.svc

https://catalogo-vpfe-hab.dian.gov.co/
document/searchqr

Producción

https://vpfe.dian.gov.co/
WcfDianCustomerServices.svc

https://catalogo-vpfe.dian.gov.co/
document/searchqr

Importante. El ambiente se controla con un solo selector en Configuración > DIAN Colombia.
Cambiar de Habilitación a Producción NO requiere tocar código ni redesplegar.

Documentación técnica - Mayo 2026

Página 3

Facturación Electrónica DIAN Colombia

Sistema col_restaurante

2. Funcionalidades del sistema
El módulo cubre el ciclo completo de un documento electrónico: desde que se cierra la venta en el POS
hasta que la DIAN devuelve el Application Response (AR) confirmando la aceptación.
Módulo

Funcionalidad

Facturas de venta

• Emisión desde el POS al cerrar la venta.
• Generación del XML UBL 2.1 con extensiones DIAN.
• Firma XAdES-EPES con el certificado .p12.
• Cálculo del CUFE (SHA-384) según fórmula DIAN.
• Envío sincrónico vía SOAP (SendBillSync).
• Almacenamiento del XML firmado y del AR.
• Reintento manual si la DIAN devuelve error.

Notas crédito

• Generación de NC asociada a una factura existente.
• Cálculo de CUDE con motivo (devolución, anulación, etc.).
• Mismo flujo de firma y envío que las facturas.

Numeración

• Resolución DIAN como entidad (prefijo, rango, vigencia).
• Asignación atómica del siguiente consecutivo (lockForUpdate).
• Alerta cuando se acerca el final del rango autorizado.

Representación
gráfica

• PDF tamaño carta con todos los campos exigidos por la DIAN.
• Ticket POS (térmico 80mm) con CUFE truncado y QR.
• Código QR que apunta al portal de consulta DIAN.

Configuración

• Pantalla de Settings con todos los datos del emisor.
• Upload del certificado .p12 desde el navegador.
• Selector de ambiente (Habilitación / Producción).
• Datos de software, PIN y clave técnica.

Trazabilidad

• Tabla dian_events con cada paso de cada documento.
• Estado del documento: PENDING, SIGNED, SENT, ACCEPTED, ERROR.
• Descarga del XML firmado y del AR desde el panel.
• Logs de errores legibles para el dueño y para soporte.

Seguridad

• Acceso al módulo restringido a usuarios con rol admin.
• Certificado .p12 almacenado fuera del directorio público.
• Contraseña del certificado cifrada en BD (Laravel Crypt).

Alcance. Lo que no incluye este módulo: documentos soporte (compras a no obligados), nómina
electrónica, RADIAN (eventos de aceptación / rechazo) ni envío asincrónico por lotes. Si se
necesitan, se pueden agregar como extensiones.

Documentación técnica - Mayo 2026

Página 4

Facturación Electrónica DIAN Colombia

Sistema col_restaurante

3. Datos que debe proveer el dueño
Para poner el sistema en producción, el dueño del restaurante debe reunir la siguiente información. Se
agrupa en cuatro bloques: identificación de la empresa, resolución DIAN, software registrado y
certificado digital. Sin alguno de estos bloques la DIAN rechaza los documentos.

3.1 Identificación de la empresa
Dato

Descripción

Dónde se obtiene

NIT

Número de identificación tributaria.

RUT de la empresa

Dígito de verificación
(DV)

Número de 1 dígito al final del NIT.

RUT (casilla 6)

Razón social

Nombre legal exacto registrado en la DIAN.

RUT (casilla 35)

Nombre comercial

Marca con la que opera el restaurante.

RUT (casilla 36)

Tipo de persona

1 = Jurídica, 2 = Natural.

Estatutos / RUT

Régimen

Responsable de IVA (49) o No responsable
(48).

RUT (casilla 53)

Responsabilidad fiscal

Códigos como R-99-PN, O-13, O-15, etc.

RUT (casilla 53)

Actividad económica

CIIU principal (4 dígitos), p. ej. 5611
restaurantes.

RUT (casilla 46)

Dirección

Dirección fiscal completa de la empresa.

RUT (casilla 41)

Código de municipio

Código DANE de 5 dígitos (Bogotá = 11001).

Tabla DANE

Código de
departamento

Código DANE de 2 dígitos.

Tabla DANE

Teléfono

Teléfono comercial.

—

Email

Correo de notificaciones (recibe el AR).

—

Documentación técnica - Mayo 2026

Página 5

Facturación Electrónica DIAN Colombia

Sistema col_restaurante

3.2 Resolución de numeración DIAN
La empresa debe solicitar a la DIAN una resolución de habilitación primero y, una vez aprobada, una
resolución de producción. Se solicita desde el portal MUISCA.
Dato

Descripción

Ejemplo

Número de resolución

Número que asigna la DIAN al aprobar.

18760000001

Prefijo

Letras o letras+números al inicio del consecutivo.

SETP / FE / FEV

Rango desde

Primer número autorizado del rango.

1

Rango hasta

Último número autorizado del rango.

5000

Fecha desde

Inicio de vigencia.

2026-01-01

Fecha hasta

Fin de vigencia.

2027-12-31

Clave técnica

Cadena alfanumérica entregada por la DIAN.

(36 caracteres)

3.3 Software registrado en la DIAN
Antes de poder facturar, hay que registrar el software (este sistema POS) en el portal MUISCA. La
DIAN devuelve tres datos imprescindibles:
Dato

Descripción

Software ID

UUID que identifica este software ante la DIAN.

PIN

PIN numérico que se eligió al registrar el software.

Test Set ID

Identificador del set de pruebas de habilitación. Sólo se usa mientras se están
enviando los documentos de prueba.

3.4 Certificado digital
Dato

Descripción

Archivo .p12 / .pfx

Certificado digital de firma vigente, emitido a nombre del representante legal o de
la empresa, por una entidad certificadora autorizada en Colombia: Andes SCD,
Certicámara, GSE, entre otras.

Contraseña del .p12

Contraseña que se definió al descargar el certificado. Sin ella el sistema no puede
firmar.

Vigencia

Generalmente 1 o 2 años. Renovar antes del vencimiento para no interrumpir la
fac
