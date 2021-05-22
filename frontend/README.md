# Frontend

Lado del cliente hecho en react

Para comenzar se necesitan instalar las librerias y modulos con los siguientes comandos en la consola de comandos:
* Nos ubicamos en la carpeta
`cd <directorio del backend>`
* Instalamos librerias y modulos
`npm install`

### Nota
Verificar que la url del archivo [config.js](https://github.com/Luis1299/PIA-Backend/blob/main/frontend/src/config.js) tenga la misma dirección del backend.
En caso de estar en modo local cambiar la url a http://localhost:8000 o en caso de haber modificado el [.env](https://github.com/Luis1299/PIA-Backend/blob/main/backend/.env.example#L1) (el cual ya solo se llama .env) cambiar el puerto al asignado

El frontend cuenta con los siguientes urls:
    * "/login"    : permite iniciar sesion
    * "/register": permite registrarse
    * "/users": muestra la pantalla de usuarios (solo si se inicio sesión)
    * "/addUser": agrega un nuevo usuario