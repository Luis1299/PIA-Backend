# Frontend

Lado del cliente hecho en react que permite la comunicación con el backend

Para comenzar se necesitan instalar las librerias y modulos con los siguientes comandos en la consola de comandos:
* Nos ubicamos en la carpeta
`cd <directorio del backend>`
* Instalamos librerias y modulos
`npm install`

### Nota
Verificar que la url del archivo [config.js](https://github.com/Luis1299/PIA-Backend/blob/main/frontend/src/config.js) tenga la misma dirección del backend.
En caso de estar en modo local cambiar la url a http://localhost:8000 o en caso de haber modificado el [.env](https://github.com/Luis1299/PIA-Backend/blob/main/backend/.env.example#L1) (el cual ya solo se llama .env) cambiar el puerto al asignado

Rutas y lo que cada una consume del backend:
   * "/login"    : permite iniciar sesion
    * POST http://localhost:8000/users/login
   * "/register": permite registrarse
    * POST http://localhost:8000/users/register
   * "/users": muestra la pantalla de usuarios (solo si se inicio sesión)
    * GET http://localhost:8000/users/ para obtener los usuarios
    * PUT http://localhost:8000/users/:id para editar uno
    * DELETE http://localhost:8000/users/:id para elimintar uno
   * "/addUser": agrega un nuevo usuario
    * POST http://localhost:8000/users/register