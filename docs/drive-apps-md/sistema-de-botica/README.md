# SISTEMA DE BOTICA

**Fonte:** drive-download-20260628T170401Z-3-002.zip > Apps-Webs - 2026/FACTURACION DEV/COLOMBIA - APPS WEBS FACTURACION/SISTEMA DE BOTICA

**PDF:** Manual_Facturacion_Electronica_DIAN.pdf

---

D O C U M E N TAC I Ó N T É C N I C A Y F U N C I O N A L

Facturación Electrónica DIAN
Colombia
Manual técnico y funcional del módulo de facturación electrónica: tecnología,
funcionalidades, requisitos del contribuyente y guía de puesta en producción paso a
paso.
Sistema: ERP Botica / Droguería · Módulo: Facturación Electrónica
País / Norma: Colombia · DIAN · UBL 2.1 · Versión del documento: 1.0

DOCUMENTO DE USO INTERNO — ELABORADO PARA EL PROPIETARIO Y EL ÁREA TÉCNICA

CAPÍTULO 1

1

Tecnología de
desarrollo

La integración de facturación electrónica fue construida en su totalidad sobre el mismo stack del ERP, con código nativo y sin
dependencias externas ni Composer, lo que facilita su despliegue en cualquier servidor con PHP y MySQL.

Componentes tecnológicos
COMPONENTE

TECNOLOGÍA UTILIZADA

Lenguaje / Arquitectura

PHP nativo, patrón MVC puro (sin framework)

Base de datos

MySQL — base de datos col_botica_db

Estándar del documento

UBL 2.1 con la personalización de la DIAN (Colombia)

Generación del XML

Extensión DOM de PHP (DOMDocument)

CUFE / CUDE

Algoritmo de hash SHA-384

Firma digital

XAdES-EPES — extensión OpenSSL + canonicalización C14N nativa del DOM

Transmisión

SOAP sobre HTTPS vía cURL al web service de la DIAN

Empaquetado

Compresión ZIP (ZipArchive) exigida por la DIAN

Interfaz

HTML5, CSS y Bootstrap 5

Arquitectura del módulo
El módulo se apoya en tres servicios especializados que trabajan de forma encadenada durante cada venta facturable:

DianUblGenerator.php

DianXmlSigner.php

Construye el XML UBL 2.1 con la personalización DIAN y calcula el

Aplica la firma digital XAdES-EPES con el certificado .p12 del

CUFE / CUDE.

contribuyente.

DianApiClient.php

Panel de Configuración

Comprime, transmite el documento al web service de la DIAN e interpreta

Vista de administración para parametrizar credenciales, certificado y

la respuesta.

numeración.

Manual de Facturación Electrónica DIAN · Página 2 de 9

Sistema Botica / Droguería

Capas del sistema
CAPA DE PRESENTACIÓN
POS · Panel DIAN · Factura PDF A4 · Tiquete POS

CAPA DE LÓGICA (Controladores)
VentaController · ConfiguracionController

SERVICIOS DIAN
UblGenerator · XmlSigner · ApiClient

CAPA DE DATOS
MySQL col_botica_db · Archivos XML firmados

Figura 1. Arquitectura en capas del módulo de facturación electrónica.

Manual de Facturación Electrónica DIAN · Página 3 de 9

Sistema Botica / Droguería

CAPÍTULO 2

2

Funcionalidades del
módulo

El módulo cubre el ciclo completo del documento electrónico: emisión, cálculo del código único, firma digital, transmisión a la DIAN
y representación impresa.

Documentos que emite

Factura Electrónica de Venta

Documento Equivalente POS

Documento fiscal estándar (código DIAN 01) con datos completos del

Documento electrónico POS (código DIAN 02), típico para ventas de

adquiriente.

mostrador.

Ticket de venta interno

Representación impresa

Comprobante interno sin valor fiscal, para control operativo de la caja.

Factura en formato A4 (PDF) y tiquete térmico de 80 mm con código QR.

Capacidades principales

1

Generación automática del XML UBL 2.1 DIAN en cada venta

facturable.

3

Firma digital XAdES-EPES con el certificado .p12 del

contribuyente.

5

Cálculo del CUFE y CUDE mediante hash SHA-384, según el

4

Numeración consecutiva por prefijo y rango autorizado en la

resolución DIAN.

Transmisión automática al web service de la DIAN (pruebas o

producción).

7

2

algoritmo oficial.

6

Modo generación local: guarda el XML para descarga si el envío

está desactivado.

Código QR de validación DIAN impreso en la factura y el tiquete.

8

Seguimiento de estados: Pendiente, Generado Local, Aceptado

DIAN, Rechazado.

9

Consulta de estado de un documento ya transmitido a la DIAN.

10

Cálculo de IVA (19% general; medicamentos excluidos) y moneda

en pesos (COP).

11

Descarga del XML firmado desde el historial de ventas.

12

Panel de configuración DIAN centralizado para credenciales y

numeración.

Manual de Facturación Electrónica DIAN · Página 4 de 9

Sistema Botica / Droguería

Flujo de emisión de un documento

1. Venta

2. XML UBL

3. CUFE

4. Firma

en el POS

2.1 DIAN

SHA-384

XAdES-EPES

7. Respuesta

6. Envío DIAN

5. ZIP

Aceptado / Rechazado

web service

empaquetado

El estado se registra en la venta y se refleja en el comprobante impreso (QR + CUFE).

Figura 2. Flujo de emisión, firma y transmisión de un documento electrónico.

Manual de Facturación Electrónica DIAN · Página 5 de 9

Sistema Botica / Droguería

CAPÍTULO 3

3

Datos que debe proporcionar el
propietario

Para operar en producción con validez fiscal, el dueño de la empresa debe realizar una serie de trámites ante la DIAN y reunir la
información que se detalla a continuación. Sin estos datos el sistema solo puede generar el XML de forma local, sin validez legal.

GRUPO A · Información de la empresa
Se obtiene del RUT (Registro Único Tributario) de la empresa. Debe coincidir exactamente con lo registrado ante la DIAN:
• NIT de la empresa con su dígito de verificación.
• Razón social exacta (o nombre, si es persona natural).
• Dirección del establecimiento, ciudad y códigos DANE de municipio y departamento.
• Teléfono y correo electrónico de contacto.
• Tipo de persona: jurídica o natural.
• Responsabilidad fiscal (código del RUT, p. ej. O-1, R-99-PN).

GRUPO B · Habilitación como facturador electrónico
• RUT actualizado incluyendo la responsabilidad de facturador electrónico.
• Inscripción en el servicio "Sistema de Factura Electrónica" del portal de la DIAN (MUISCA).

GRUPO C · Certificado digital
• Un certificado digital en archivo .p12 (o .pfx), emitido por una entidad de certificación digital acreditada por la ONAC (por ejemplo:
Certicámara, GSE, Andes SCD, Thomas Signe).
• La contraseña del certificado.

GRUPO D · Registro del software
• Software ID: identificador que la DIAN asigna al registrar el software (modalidad "software propio").
• PIN del software: clave numérica que define el propio contribuyente al registrar el software.
• Clave técnica: cadena que la DIAN entrega junto con el rango de numeración; interviene en el cálculo del CUFE.

GRUPO E · Resolución de numeración
• Número de resolución de facturación y su fecha de expedición.
• Prefijo autorizado y rango de numeración (número inicial y final).
• Test Set Id: identificador del set de pruebas de habilitación.

Lista de verificación de datos requeridos
✓

DATO

¿DÓNDE SE OBTIENE?

☐

NIT + dígito de verificación

RUT de la empresa

☐

Razón social y dirección

RUT de la empresa

☐

Códigos DANE municipio / departamento

Tablas DANE / RUT

Manual de Facturación Electrónica DIAN · Página 6 de 9

Sistema Botica / Droguería

☐

Responsabilidad fiscal

RUT de la empresa

☐

Certificado digital .p12 + contraseña

Entidad certificadora acreditada

☐

Software ID

Portal DIAN — registro del software

☐

PIN del software

Lo define el contribuyente

☐

Clave técnica

Portal DIAN — rango de numeración

☐

Resolución: número, fecha, prefijo, rango

Portal DIAN — resolución de facturación

☐

Test Set Id

Portal DIAN — set de pruebas

⚠ Importante
El certificado digital y la resolución de numeración tienen vigencia limitada. El propietario debe renovarlos antes de su vencimiento para no interrumpir
la facturación.

Manual de Facturación Electrónica DIAN · Página 7 de 9

Sistema Botica / Droguería

CAPÍTULO 4

4

Puesta en producción — paso a
paso

El paso a producción se realiza en cuatro etapas. No se debe activar el ambiente de producción hasta que la DIAN apruebe el set
de pruebas de habilitación.

Hoja de ruta

1

2

3

4

Trámites

Habilitación

Configuración

Producción

ante la DIAN

set de pruebas

del sistema

emisión real

Figura 3. Hoja de ruta para la puesta en producción.

ETAPA 1 · Trámites previos ante la DIAN

1

Actualizar el RUT
Incluir la responsabilidad de facturador electrónico en el RUT de la empresa.

2

Inscribirse en el Sistema de Factura Electrónica
Ingresar
