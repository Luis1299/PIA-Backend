# Backend
Este es la parte del servidor backend del pia

## Instalar
Para comenzar se necesitan instalar las librerias y modulos con los siguientes comandos en la consola de comandos:
* Nos ubicamos en la carpeta
`cd <directorio del backend>`
* Instalamos
`npm install`


**Antes de ejecutar se requiere de configurar el archivo .env**
* En caso de querer ejecutar el servidor en modo localhost cambiar la extension del archivo [.env.example](https://github.com/Luis1299/PIA-Backend/blob/main/backend/.env.example) a simplemente .env y modificar segun sea necesario:

```
MONGODB_URI= se asigna la url del servidor mongodb ya sea local o en red
PORT= se asigna el puerto del servidor
SECRET_KEY= se asigna una llave para el hashing
```
* Nota
	* En caso de subirlo a red este archivo se debe eliminar, se configura dependiendo del proveedor

* Por ultimo iniciamos el servidor
`npm run start`
------------
## Endpoints 
Los endpoints del backend suponiendo que se encuentra en modo local (http://localhost:8000)

### **Obtener usuarios:**
http://localhost:8000/users
* Llamada curl:
	Reemplazando `<JWT Token>` por el token obtenido al registrarse o iniciar sesión
```
curl -L -X GET "localhost:8000/users" -H "Authorization: Bearer <JWT Token>"
```
* Método: GET
* Headers: Se necesita obtener el token JWT ya sea haciendo iniciando sesión (/users/login) o Registrarse (/users/register) y enviar el token:
“Authorization: Bearer `<JWT Token>`”
* **Status 200 – OK:** Retorna un arreglo de los usuarios en JSON con el siguiente formato: 
_Donde las comillas representan el valor del atributo del usuario_
```
[{
	firstName: “”, 
	lastName: “”,
	email: “”, 
	country: “”
}, {…}]
```
* ** Status 401 – Not authorized**: 
	* Token expiro: "El token ha expirado, inicia sesión nuevamente”
	* No se envió token: "Error, inicia sesión primero”

**Prueba postman**
![Prueba get users](https://github.com/Luis1299/PIA-Backend/blob/main/capturas/getUsers.JPG "Get users")
--------

### **Registrarse:** 
http://localhost:8000/users/register
* Llamada curl:
_Reemplazando `<Nombre>` `<Apellido>` `<correo electronico>`  `<contraseña>` y `<Pais>` por los valores 	correspondientes_

```
curl -L -X POST "http://localhost:8000/users/register" -H "Content-Type: application/x-www-form-urlencoded" --data-urlencode "firstName=<Nombre>" --data-urlencode "lastName=<Apellido>" --data-urlencode "email=<correo electronico>" --data-urlencode "password=<contraseña>" --data-urlencode "country=<Pais>"
```
* Método: GET
* Body: 
	 * Tipo: application/x-www-form-urlencoded
Datos: (reemplazando los valores entre <> por los valores correspondientes)
```
firstName:<Nombre>
lastName:<Apellido>
email:<correo electronico>
password:<contraseña>
```
* **Status 200 – OK:**
	Se registro el usuario con éxito, se genera un token JWT que expira en 6 horas y retorna un JSON con información del del token y del usuario con el siguiente formato:
```
{ token: “”, firstName: “”, lastName: “”, email: “”, country: “”, uid: “”}
```
* **Status 400 – Bad Request:**
Retorna un JSON con información acerca del error con los siguientes valores:
_Donde las comillas simples `''` contienen información de lo sucedido_
```
{ isValid: false, firstName: '', lastName: '', email: '', password: '', country: '', msg: ''}
```

**Prueba postman**
![Prueba /users/register](https://github.com/Luis1299/PIA-Backend/blob/main/capturas/newUser.JPG "Register")
--------

### **Iniciar sesión:**
http://localhost:8000/users/login
* Llamada curl:
```
curl -L -X POST "localhost:8000/users/login" -H "Content-Type: application/x-www-form-urlencoded" --data-urlencode "email=<correo electronico>" --data-urlencode "password=<contraseña>"
```
Reemplazando `<correo electronico>` y `<contraseña>` por los valores correspondientes
* Método: POST
* Body:
	 * Tipo: application/x-www-form-urlencoded
	 * Datos: (reemplazando los valores entre <> por los valores correspondientes)
```
email:<correo electronico>
password:<contraseña>
```
* **Status 200 – OK:**
Se genera un token JWT que expira en 6 horas y retorna un JSON con información del del token y del usuario con el siguiente formato:
```
{ token: “”, firstName: “”, lastName: “”, email: “”, country: “”, uid: “”}
```
* **Status 400 – Bad Request:**
Retorna un mensaje en JSON:
`{"msg": "Error, llene los datos correctamente"}`
![Prueba login](https://github.com/Luis1299/PIA-Backend/blob/main/capturas/login.JPG "Login")
--------

### **Eliminar usuario:**
http://localhost:8000/users/ `<id del usuario>`
* Llamada curl:
_ Reemplazando `<id del usuario>` y `<JWT Token>` por los valores correspondientes _ 
```
curl -L -X DELETE "localhost:8000/users/<id del usuario>" -H "Authorization: Bearer <JWT Token>"
```
* Método: DELETE
* Parametros del url: id del usuario a editar
* Headers: Se necesita obtener el token JWT ya sea haciendo LogIn (/users/login) o Registrarse (/users/register) y enviar el token:
“Authorization: Bearer `<Token JWT>`”
* **Status 200 – OK:** Se logró eliminar el usuario y se retorna un arreglo JSON de los usuarios:
```
[{
	firstName: “”, 
	lastName: “”,
	email: “”, 
	country: “”
}, {…}]
```
* **Status 401 – Not authorized:**
	* Token expiro: “El token ha expirado, inicia sesión nuevamente”
	* No se envió token: “Error, inicia sesión primero”

* **Status 404 – Not Found:** El usuario no fue encontrado, retorna un mensaje:
“Error, ese usuario no existe”

**Prueba postman**
![Prueba eliminar](https://github.com/Luis1299/PIA-Backend/blob/main/capturas/deleteUser.JPG "Borrar user")
--------

## **Editar usuario:**
http://localhost:8000/users/ `<id del usuario>`
* Llamada curl:
_Reemplazando `<id del usuario>` `<Nombre>` `<Apellido>` `<correo electronico>` `<contraseña>` y `<JWT Token>` por los valores correspondientes (no necesariamente todos)_
```
curl -L -X PUT "localhost:8000/users/<id del usuario>" -H "Authorization: Bearer <JWT Token>" -H "Content-Type: application/x-www-form-urlencoded" --data-urlencode "firstName=<Nombre>" --data-urlencode "lastName=<Apellido>" --data-urlencode "email=<Correo electronico>" --data-urlencode "country=<Pais>"
```
**Nota:** En caso de no enviar todos los datos, se eliminan los datos no usados quitando la parte del dato:
```--data-urlencode "dato=<valor>"```
* Método: PUT
* Parametros del url: id del usuario a editar
* Headers: Se necesita obtener el token JWT ya sea haciendo LogIn (/users/login) o Registrarse (/users/register) y enviar el token:
```“Authorization: Bearer <Token JWT>”```
* Body:
	* Tipo: application/x-www-form-urlencoded
	* Datos: (reemplazando los valores entre <> por los valores correspondientes):
```
firstName:<Nombre>
lastName:<Apellido>
email:<Correo electronico>
country:<País>
```
* **Status 200 – OK:** Se logró editar el usuario y se retorna un arreglo JSON de los usuarios:
```
[{
	firstName: “”, 
	lastName: “”,
	email: “”, 
	country: “”
}, {…}]
```
* **Status 400 – Bad Request:** No se envió información en el body, retorna un mensaje: 
`“No se ha enviado informacion a traves del cuerpo del request”`

* **Status 401 – Not authorized:** 
	* Token expiro: 
`“El token ha expirado, inicia sesión nuevamente”`
	* No se envió token:
`Error, inicia sesión primero”`

* **Status 404 – Not Found:** El usuario no fue encontrado, retorna un mensaje: 
`“Error, ese usuario no existe”`


Además de esos endpoints cuando se realiza una petición a un endpoint no existente se obtiene un error 404
**Status 404 – Not Found:** La página no existe: 
“Mensaje 404”

**Prueba postman**
![Prueba editar](https://github.com/Luis1299/PIA-Backend/blob/main/capturas/updateUser.JPG "Actualizar usuario")

------------
## Puntos

- [x] CRUD: Create 
&ensp;&ensp; --Registro de nuevos usuarios [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/routes/user.js#L61-L71)
- [x] CRUD: Read
&ensp;&ensp;--Obtener arreglo de usuarios [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/routes/user.js#L17)
- [x] CRUD: Update
 &ensp;&ensp;-- Actualizar un usuario [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/routes/user.js#L109-L118)
- [x] CRUD: Delete
&ensp;&ensp;-- Borrar un usuario [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/routes/user.js#L148-L152)
- [x] Uso de Token Bearer
&ensp;&ensp;-- Read (lectura de usuarios) protegido por jwt token [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/routes/user.js#L8-L16)
&ensp;&ensp;-- Update (actualizar usuarios) protegido por jwt token [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/routes/user.js#L96-L107)
&ensp;&ensp;-- Delete (borrar usuarios) protegido por jwt token [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/routes/user.js#L137-L147)
- [x] Configurar CORS
&ensp;&ensp;-- En este caso los cors se [imporaron](https://github.com/Luis1299/PIA-Backend/blob/main/backend/index.js#L3) y configuraron de manera que se pueda acceder desde cualquier origen [Codigo](https://github.com/Luis1299/PIA-Backend/blob/main/backend/index.js#L15-L16)