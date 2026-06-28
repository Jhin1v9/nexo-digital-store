# TPV MINIMARKET

**Fonte:** drive-download-20260628T170401Z-3-001.zip > Apps-Webs - 2026/FACTURACION DEV/ECUADOR - APPS WEBS FACTURACIÓN/TPV MINIMARKET

**PDF:** Manual-Facturacion-Electronica-SRI.pdf

---

S I ST E M A T PV M I N I M A R K E T

DOCUMENTO TÉCNICO-OPERATIVO
Versión 1.0

Manual de Facturación
Electrónica
Integración con el SRI de Ecuador — Facturación Directa

Tecnología · Funcionalidades · Datos requeridos · Puesta en producción

Proyecto: ec_tvp-minimarket · Dirigido a: Propietario del negocio y equipo técnico
Fecha de emisión: 22 de mayo de 2026 · Ámbito: Servicio de Rentas Internas (SRI) — República del
Ecuador

i

Contenido del documento

Este manual describe la integración de facturación electrónica del sistema TPV Minimarket con el Servicio de
Rentas Internas (SRI) del Ecuador, e indica de forma detallada qué necesita el propietario del negocio y cómo
poner el sistema en funcionamiento en producción.

1. Tecnología con la que fue desarrollada la integración

3

2. Funcionalidades de la facturación electrónica

5

3. Datos que debe proporcionar el dueño de la empresa

7

4. Configuración paso a paso para producción

9

Flujo general de la facturación electrónica
El siguiente diagrama resume el recorrido de un comprobante desde la venta hasta su autorización por el SRI:

Venta tipo FACTURA

1. Clave de acceso

2. Firma digital

3. Recepción

Punto de venta (POS)

49 dígitos + XML

XAdES-BES (.p12)

Web service SRI

6. RIDE + XML

5. Comprobante

4. Autorización

A4 / ticket 80mm

AUTORIZADO

Web service SRI

Estados que registra el sistema durante el proceso
CREADO

FIRMADO

RECIBIDA

Manual de Facturación Electrónica · SRI Ecuador

AUTORIZADO

DEVUELTA

NO AUTORIZADO

Página 2

1

Tecnología de desarrollo

La integración fue construida sobre el mismo stack del sistema TPV (Laravel) e incorpora la firma electrónica y la
comunicación con el SRI de forma nativa, sin depender de librerías externas de pago, lo que facilita su
mantenimiento y actualización.

Stack tecnológico
COMPONENTE

TECNOLOGÍA UTILIZADA

Lenguaje y framework

PHP 8.2 o superior · Laravel 11

Base de datos

MySQL 8 (motor relacional del sistema TPV)

Firma electrónica

XAdES-BES implementada de forma nativa con DOMDocument y la extensión
OpenSSL de PHP

Canonicalización XML

C14N inclusiva — estándar REC-xml-c14n-20010315

Algoritmos criptográficos

Resumen SHA-1 y firma RSA-SHA1 (esquema exigido por el SRI)

Comunicación con el SRI

Protocolo SOAP 1.1 mediante SoapClient (extensión php-soap)

Interfaz de usuario

Blade · Tailwind CSS · Alpine.js

RIDE e impresión

Vistas imprimibles en formato A4 y ticket de 80 mm

Extensiones PHP requeridas

soap, openssl, dom, mbstring

Componentes desarrollados
COMPONENTE

RESPONSABILIDAD

SriService

Genera la clave de acceso, construye el XML de cada comprobante y gestiona
el envío a Recepción y Autorización del SRI.

XadesBesSigner

Firma electrónica XAdES-BES embebida sobre el XML, usando el
certificado .p12.

CedulaRucValidator

Valida cédulas (módulo 10) y RUC (módulo 11) ecuatorianos.

FacturacionElectronicaController

Orquesta la emisión, autorización, descarga de XML y generación del RIDE.

Modelos de datos

ComprobanteElectronico, ComprobanteDetalle y PuntoEmision.

Esquemas del SRI soportados
COMPROBANTE

CÓDIGO

VERSIÓN DEL ESQUEMA XML

Factura

01

1.1.0

Nota de Crédito

04

1.1.0

Nota de Débito

05

1.0.0

Manual de Facturación Electrónica · SRI Ecuador

Página 3

Comprobante de Retención

07

1.0.0

Modalidad de emisión
El sistema opera bajo el esquema de facturación directa (en línea): cada comprobante se firma y se envía de
inmediato a los servicios web del SRI para obtener su autorización en tiempo real.

Manual de Facturación Electrónica · SRI Ecuador

Página 4

2

Funcionalidades de la facturación electrónica

El módulo cubre el ciclo completo de la facturación electrónica del SRI: emisión, firma, envío, autorización,
consulta y representación impresa de los comprobantes.

Emisión de comprobantes
F

C

Factura electrónica

Nota de Crédito

Se emite automáticamente al cerrar una venta tipo

Anula o corrige una factura ya autorizada; copia el detalle

FACTURA, o manualmente desde la vista de la venta.

del documento de origen.

D

R

Nota de Débito

Comprobante de Retención

Registra cargos adicionales sobre una factura (intereses,

Formulario propio con líneas dinámicas de retención de

recargos) con su motivo y valor.

Renta, IVA o ISD.

Procesamiento y envío al SRI
#

✓

Clave de acceso

Firma digital

Genera automáticamente la clave de 49 dígitos con su dígito

Firma XAdES-BES del XML usando el certificado de firma

verificador (módulo 11).

del emisor.

↑

★

Recepción automática

Autorización

Envía el comprobante firmado al web service de Recepción

Consulta la autorización con reintentos automáticos y guarda

del SRI.

el XML autorizado.

↻

≡

Reintento manual

Seguimiento de estados

Permite reintentar la autorización de comprobantes que

Registra CREADO, FIRMADO, RECIBIDA, AUTORIZADO,

quedaron en proceso.

DEVUELTA, NO AUTORIZADO y EXCEPCIÓN.

Manual de Facturación Electrónica · SRI Ecuador

Página 5

Consulta, impresión y administración
⌕

!

Listado con filtros

Mensajes del SRI

Búsqueda por tipo, estado, fecha, número, clave de acceso o

Muestra códigos y mensajes de respuesta del SRI en el

cliente.

detalle del comprobante.

⤓

▭

Descarga de XML

RIDE

Descarga del XML firmado y del XML autorizado para el

Representación impresa en formato A4 y en ticket de 80

respaldo contable.

mm.

⌂

⚙

Puntos de emisión

Ambiente configurable

Administra establecimiento, punto de emisión y secuenciales

Conmutación entre los ambientes de Pruebas y Producción

por tipo de comprobante.

del SRI.

ID

CF

Validación de identificación

Consumidor final

Valida cédula y RUC ecuatorianos antes de emitir.

Emite a "Consumidor Final" cuando la venta no tiene un
cliente identificado.

Resumen
En conjunto, el sistema permite emitir los cuatro comprobantes electrónicos exigidos por el SRI, firmarlos, autorizarlos
en línea, consultarlos, imprimirlos y conservar sus archivos XML, todo desde la misma interfaz del TPV.

Manual de Facturación Electrónica · SRI Ecuador

Página 6

3

Datos que debe proporcionar el dueño de la empresa

Para utilizar la facturación electrónica en producción, el propietario del negocio debe reunir y entregar tres
grupos de información: los datos tributarios de la empresa, el certificado de firma electrónica y las habilitaciones
gestionadas ante el SRI.

3.1 · Datos tributarios de la empresa
Estos datos deben coincidir exactamente con los registrados en el SRI:
DATO

DESCRIPCIÓN

RUC

Registro Único de Contribuyentes de 13 dígitos, en estado activo.

Razón social

Nombre legal tal como aparece registrado en el SRI.

Nombre comercial

Nombre con el que opera el negocio (puede coincidir con la razón social).

Dirección de la matriz

Dirección registrada de la casa matriz del contribuyente.

Dirección del establecimiento

Dirección del local desde el cual se emiten los comprobantes.

Provincia, cantón y parroquia

Ubicación geográfica del establecimiento emisor.

Obligado a llevar contabilidad

Indicar SÍ o NO según la condición tributaria de la empresa.

Contribuyente especial

Número de resolución, únicamente si el SRI lo designó como tal.

Agente de retención

Número de resolución, únicamente si fue designado agente de retención.

Correo y teléfono

Datos de contacto que se muestran en el comprobante.

Logotipo

Opcional; se utiliza en el RIDE (representación impresa).

3.2 · Certificado de firma electrónica
El certificado es obligatorio: sin él no es posible firmar ni autorizar comprobantes. Se requiere el archivo y su
contraseña:
ELEMENTO

DESCRIPCIÓN

Archivo del certificado

Archivo en formato .p12 o .pfx, vigente y a nombre de la empresa o su
representante.

Contraseña del certificado

Clave definida al momento de emitir el certificado; es indispensable para
firmar.

Entidades de certificación autorizadas en Ecuador
El certificado se adquiere en una entidad autorizada, por ejemplo: Security Data, ANF AC, Banco Central del
Ecuador, Uanataca o Lazzate. El trámite habitual consiste
