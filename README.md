# Proyecto 8: Inmobiliaria API REST FILES

Este proyecto es una API REST hecha con Node.js, Express y MongoDB Atlas. Permite manejar información de agentes inmobiliarios y casas. Se pueden crear, leer, actualizar y borrar datos (CRUD), y subir fotos usando Cloudinary.  

La idea es que la propia inmobiliaria pueda subir un perfil de cada agente y luego, al subir una casa, se asocie automáticamente al agente encargado de su zona (por ejemplo, provincia, ciudad, barrio, etc.).

## Tecnologías

- Node.js  
- Express  
- MongoDB Atlas  
- Mongoose  
- Multer + Cloudinary  
- dotenv  

## Modelos

### Agentes

| Campo    | Tipo    | Descripción |
|----------|--------|-------------|
| name     | String | Nombre del agente |
| location | String | Ubicación del agente |
| phone    | Number | Teléfono de contacto |
| email    | String | Correo electrónico |
| img      | String | URL de la foto de perfil |

### Casas

| Campo       | Tipo         | Descripción |
|-------------|-------------|-------------|
| title       | String       | Nombre o título de la casa |
| img         | Array[String]| URLs de las fotos de la casa |
| area        | String       | Área o zona de la casa |
| location    | String       | Ubicación de la casa |
| description | String       | Descripción de la casa |
| agent       | Array[ObjectId] | Referencia a agentes responsables |

## Endpoints de Agentes

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| GET    | /agents | Lista todos los agentes | Ninguna |
| GET    | /agents/:id | Ver un agente por ID | Ninguna |
| GET    | /agents/location/:location | Buscar agentes por ubicación | Ninguna |
| POST   | /agents | Crear un agente (acepta foto) | Ninguna |
| PUT    | /agents/:id | Modificar un agente (si subes foto nueva borra la anterior) | Ninguna |
| DELETE | /agents/:id | Eliminar un agente (borra su foto) | Ninguna |

## Endpoints de Casas

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| GET    | /houses | Lista todas las casas | Ninguna |
| GET    | /houses/:id | Ver una casa por ID | Ninguna |
| GET    | /houses/location/:location | Buscar casas por ubicación | Ninguna |
| POST   | /houses | Crear una casa (acepta fotos) | Ninguna |
| PUT    | /houses/:id | Modificar una casa (puedes añadir más fotos sin borrar las anteriores) | Ninguna |
| DELETE | /houses/:id | Eliminar una casa (borra todas sus fotos) | Ninguna |

## Uso de fotos

- Los archivos se suben a Cloudinary mediante Multer.  
- Para agentes: solo una foto por agente, la anterior se borra automáticamente si se cambia.  
- Para casas: se pueden añadir varias fotos. Las fotos anteriores no se borran al añadir nuevas mediante PUT.  
- Al borrar un registro (agente o casa), las fotos en Cloudinary también se borran.  

## Seeds

- Hay un archivo de seed que crea agentes con sus datos iniciales.  
- Las imágenes se pueden añadir después mediante PUT.  

## Nota

- Todas las relaciones entre casas y agentes se gestionan automáticamente según la ubicación.  
- Las imágenes y datos son ejemplos de práctica y no corresponden a agentes inmobiliarios o inmuebles a la venta reales.
