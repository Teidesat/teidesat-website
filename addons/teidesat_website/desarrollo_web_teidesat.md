# Desarrollo web TEIDESAT en Odoo: arquitectura, estructura del proyecto y forma de trabajo

## 1. Objetivo de este documento

Este documento resume de forma práctica cómo se está planteando el nuevo desarrollo web de TEIDESAT en Odoo, qué estructura de proyecto se está usando, por qué se ha decidido trabajar mediante un módulo personalizado y cómo debería crecer el proyecto a partir de ahora.

La idea es que este documento sirva para tres cosas al mismo tiempo:

- documentar técnicamente el trabajo realizado
- explicar en reuniones qué se ha hecho y por qué
- servir como guía interna para seguir desarrollando la web sin perderse

## 2. Contexto del proyecto

Hasta ahora se había trabajado principalmente con Odoo Website Builder, es decir, el constructor visual de páginas de Odoo.

Ese enfoque permite crear páginas de forma rápida mediante bloques, textos, imágenes y edición visual. Sin embargo, al analizar las necesidades reales del proyecto y las ideas propuestas por el equipo artístico, se ha visto que este enfoque presenta limitaciones importantes.

Entre las ideas planteadas por el equipo de arte están:

- una landing visual potente con elementos espaciales
- un posible mapa de Canarias con tratamiento visual dinámico
- satélites u objetos orbitando
- objetivos mostrados como elementos interactivos
- animaciones suaves y componentes más artísticos

Estas necesidades superan bastante lo que resulta cómodo hacer únicamente con Website Builder.

Por ese motivo se ha empezado a explorar un enfoque más técnico y flexible: el desarrollo de la web mediante módulos personalizados de Odoo.

## 3. Problema detectado con Website Builder

El problema principal de Website Builder no es que sea inútil, sino que está pensado sobre todo para:

- maquetación visual rápida
- edición de contenidos
- webs sencillas o corporativas
- gestión por usuarios no técnicos

Sin embargo, presenta varias limitaciones para este proyecto:

- no es la mejor opción para interacciones complejas
- no facilita un flujo de trabajo parecido a Git
- los cambios del editor visual se guardan en base de datos, no en archivos
- complica el trabajo colaborativo entre desarrolladores
- limita bastante el control fino sobre estructura, estilos y animaciones

## 4. Decisión técnica adoptada

Se ha decidido comenzar una nueva línea de trabajo basada en un módulo personalizado de Odoo para construir una nueva versión de la landing page y, en el futuro, del resto de páginas.

La idea no es borrar de golpe todo el trabajo previo, sino usarlo como referencia visual y de contenidos, pero empezar a construir una base más profesional y escalable.

Esto permite:

- trabajar con archivos reales
- usar control de versiones con Git
- separar responsabilidades por carpetas
- introducir CSS y JavaScript personalizados
- preparar componentes visuales avanzados
- integrar después SVG e ilustraciones del equipo de arte

## 5. Qué es un módulo personalizado de Odoo

Un módulo de Odoo es una carpeta con una estructura concreta que permite añadir nuevas funcionalidades al sistema.

Un módulo puede contener muchas cosas distintas:

- modelos de datos
- vistas internas
- controladores web
- páginas del sitio
- hojas de estilo
- scripts JavaScript
- imágenes y assets

En el caso de TEIDESAT, el módulo se está usando sobre todo para la parte web.

Según la documentación oficial de Odoo, el archivo __manifest__.py es el archivo que declara un paquete Python como módulo de Odoo y define sus metadatos, dependencias y archivos que deben cargarse.

## 6. Estructura general del proyecto

Ahora mismo el proyecto puede entenderse en dos niveles:

### 6.1 Estructura general del entorno Odoo con Docker

```text
odoo-teidesat/
├── compose.yml
├── .env
├── .gitignore
├── README.md
├── backups/
├── addons/
│   └── teidesat_website/
└── docs/
```

### 6.2 Explicación de cada elemento

#### compose.yml
Archivo que define los contenedores Docker del proyecto, normalmente Odoo y PostgreSQL.

#### .env
Archivo donde se guardan variables como usuario, contraseña o puertos.

#### .gitignore
Archivo para decirle a Git qué no debe subirse al repositorio.

#### README.md
Documento general del proyecto. Puede usarse para explicar cómo arrancar el entorno.

#### backups/
Carpeta para copias de seguridad o ficheros relacionados con restauraciones.

#### addons/
Carpeta muy importante. Aquí es donde se colocan los módulos personalizados que Odoo debe detectar.

#### docs/
Carpeta recomendada para toda la documentación técnica del proyecto.

## 7. Por qué addons/ es clave

En el compose.yml se ha montado la carpeta local addons/ dentro del contenedor de Odoo.

Normalmente esto se hace con una línea como esta:

```yaml
./addons:/mnt/extra-addons
```

Eso significa que todo lo que metas en la carpeta local addons aparecerá dentro del contenedor, y Odoo podrá detectarlo como módulo instalable.

Esta es la razón por la que no hace falta instalar Odoo dentro de la carpeta del módulo. Odoo ya existe dentro del contenedor. Lo que hacemos es añadirle módulos personalizados.

## 8. Estructura del módulo teidesat_website

La estructura actual recomendada del módulo es la siguiente:

```text
addons/
└── teidesat_website/
    ├── __init__.py
    ├── __manifest__.py
    ├── controllers/
    │   ├── __init__.py
    │   └── main.py
    ├── views/
    │   └── templates.xml
    └── static/
        └── src/
            ├── css/
            │   └── style.css
            ├── js/
            │   └── script.js
            └── img/
```

Esta estructura separa claramente responsabilidades.

## 9. Qué hace cada archivo y carpeta

### 9.1 __manifest__.py

Es el archivo más importante del módulo. Le dice a Odoo:

- cómo se llama el módulo
- qué versión tiene
- de qué módulos depende
- qué archivos XML debe cargar
- qué assets frontend debe incluir

Odoo indica en su documentación que los bundles de assets se definen en el __manifest__.py mediante la clave assets, donde se asignan listas de archivos CSS, JS o XML a bundles concretos.

En nuestro caso, se ha usado para cargar:

- views/templates.xml
- static/src/css/style.css
- static/src/js/script.js

### 9.2 __init__.py

Este archivo existe porque el módulo también es un paquete Python.

En Python, __init__.py indica que una carpeta forma parte de un paquete e inicializa su carga.

Por eso hay dos:

- uno en la raíz del módulo
- otro dentro de controllers

#### teidesat_website/__init__.py

Normalmente contiene algo como:

```python
from . import controllers
```

Esto indica que, cuando Odoo cargue el módulo, también debe cargar la carpeta controllers.

#### teidesat_website/controllers/__init__.py

Normalmente contiene:

```python
from . import main
```

Esto indica que, dentro de controllers, debe cargar el archivo main.py.

### 9.3 controllers/

Esta carpeta contiene los controladores web del módulo.

Los controladores sirven para definir rutas HTTP.

Por ejemplo, una ruta como:

```text
/teidesat
```

puede definirse en main.py.

La documentación oficial de Odoo explica que los controladores se crean heredando de Controller y definiendo rutas mediante métodos decorados con @route.

Un ejemplo sencillo sería:

```python
from odoo import http
from odoo.http import request


class TeidesatWebsite(http.Controller):

    @http.route('/teidesat', type='http', auth='public', website=True)
    def teidesat_page(self, **kwargs):
        return request.render('teidesat_website.teidesat_homepage')
```

Esto hace que, al visitar /teidesat, Odoo renderice la plantilla indicada.

### 9.4 views/

Aquí se guardan las plantillas QWeb.

QWeb es el sistema de plantillas de Odoo. En la práctica, aquí se define la estructura HTML de las páginas.

En templates.xml se puede declarar una plantilla como:

- una landing page
- una sección
- un bloque reutilizable
- una herencia de otra vista

### 9.5 static/

Aquí van los recursos estáticos del módulo.

Dentro de static/src/ se suelen organizar por tipo:

- css/
- js/
- img/

Esto es importante porque esta carpeta será la que más crecerá cuando empieces a integrar diseño real.

Por ejemplo, aquí irán en el futuro:

- SVG del satélite
- SVG del mapa de Canarias
- iconos de objetivos
- fondos ilustrados
- animaciones JavaScript

## 10. Qué se ha construido ya

Actualmente se ha conseguido:

- crear e instalar correctamente el módulo teidesat_website
- definir una ruta web nueva
- levantar una primera landing page de prueba en una URL separada
- cargar CSS y JS personalizados
- comprobar que Odoo ya puede servir una nueva página desarrollada por código

## 11. Dónde está la nueva landing y cómo convive con la antigua

La nueva página no sustituye automáticamente la home que ya estaba creada con Website Builder.

Lo que se ha hecho es crear una página nueva en una ruta independiente, por ejemplo:

```text
http://localhost:8069/teidesat
```

Eso significa que ahora conviven:

- la web anterior creada con Website Builder
- la nueva landing creada mediante módulo personalizado


## 12. Conclusión

El proyecto ha pasado de una fase basada en Website Builder a una nueva fase de desarrollo mediante módulos personalizados.

Este cambio es importante porque permite trabajar de una forma mucho más profesional:

- con archivos reales
- con estructura clara
- con posibilidad de usar Git
- con margen para animaciones e interacciones avanzadas
- con facilidad para integrar después los SVG y propuestas visuales del equipo de arte

A nivel práctico, el módulo teidesat_website debe convertirse en la base del nuevo desarrollo web.

No es necesario crear un módulo nuevo para cada página del sitio. Lo correcto es que este módulo vaya creciendo con:

- nuevas rutas
- nuevas plantillas
- nuevos componentes
- nuevos estilos
- nuevos scripts

## 13. Próximos pasos inmediatos

Los siguientes pasos razonables para continuar son:

1. limpiar y ordenar la estructura del módulo
2. consolidar la landing nueva como base visual del proyecto
3. crear una segunda página de prueba dentro del mismo módulo
4. empezar a separar componentes reutilizables
5. preparar el módulo para subirlo al repositorio de GitHub del proyecto

## 14. Referencias oficiales utilizadas

- Odoo 17.0 Developer Documentation, Module Manifests: explica que `__manifest__.py` declara el módulo, sus dependencias, sus archivos `data` y sus `assets`.
- Odoo 17.0 Developer Documentation, Assets: explica que los bundles de assets se definen en el manifest mediante la clave `assets`.
- Odoo 17.0 Developer Documentation, Web Controllers: explica que los controladores se crean heredando de `Controller` y declarando rutas con `@route`.
