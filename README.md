# PIA Backend
Proyecto final de la materia backend

#### Nombre: Luis Angel Martinez Trejo 1941437
----
## Base de datos
1. Para hacer uso de la base de datos se debe instalar [mongodb](https://www.mongodb.com/try/download/community) o utilizar un servicio como [atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_americas_mexico_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624326&gclid=Cj0KCQjw16KFBhCgARIsALB0g8K4A2DOop89cf4NfTUaBpzUWwjFfl0fKL3v618SFPSO2uwovSr85DAaAn8xEALw_wcB)
2. Se crea la base de datos
3. Se agrega la informacion del archivo [users.json](https://github.com/Luis1299/PIA-Backend/blob/main/users.json)

## Instalación en modo local
1. Se instala el backend, leer [readme](https://github.com/Luis1299/PIA-Backend/tree/main/backend)
2. Se instala el frontend, leer [readme](https://github.com/Luis1299/PIA-Backend/tree/main/frontend)
3. Se obtiene la url del servicio o del servidor local de mongodb y en localhost entonces se modifica el archivo [.env](https://github.com/Luis1299/PIA-Backend/blob/main/backend/.env.example#L2) en la carpeta backend

## Probar en postman
* Cargar el archivo con la colección (Elegir uno):
    * Cargar el archivo normal [PIA.postman_collection.json](https://github.com/Luis1299/PIA-Backend/blob/main/PIA.postman_collection.json)
    * Cargar el archivo con ejemplos [PIAEjemplos.postman_collection.json](https://github.com/Luis1299/PIA-Backend/blob/main/PIAEjemplos.postman_collection.json)
* Existe ya cargado un bearer token y ejemplos
* Nota: _Es mejor probar en orden, para hacer login despues del registro o no eliminar o editar un usuario aun no existente_
* Peticiones:
    * **POST Register:** http://localhost:8000/users/register </br>
    Precargado con la siguiente informacion:
    ```
    firstName:registroPruebaNombre
    lastName:registroPruebaApellido
    email:registro@mail.com
    password:registro
    country:registroPruebaPais
    ```
    Retorna:
    ```
    {"token": <Token generado>, "firstName":"registroPruebaNombre", "lastName":"registroPruebaApellido", "email":"registro@mail.com", "country":"registroPruebaPais", "uid":"60aad875e044d7192c5498d8"}
    ```
    * **POST Login:** http://localhost:8000/users/login </br>
    Precargado con la siguiente informacion:
    ```
    email:registro@mail.com
    password:registro
    ```
    Retorna:
    ```
    {"token": <Token generado>, "firstName":"registroPruebaNombre", "lastName":"registroPruebaApellido", "email":"registro@mail.com", "country":"registroPruebaPais", "uid":"60aad875e044d7192c5498d8"}
    ```
    * **GET Users:** http://localhost:8000/users </br>
    Retorna: lista de usuarios
    * **PUT Edit:** http://localhost:8000/users/"id" </br>
    Precargado con la siguiente informacion:
    ```
    firstName:NombreEditado
    lastName:ApellidoEditado
    country:PaisEditado
    ```
    Retorna: lista de usuarios pero ya con el usuario de id especificado modificado
    * **DELETE User:** http://localhost:8000/users/"id" </br>
    Retorna: lista de usuarios pero ya eliminado el usuario con el id especificado
