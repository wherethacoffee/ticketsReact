# Sistema de ticket de turno

Página web realizada con React y varias de sus librerias como react-hook-forms, react-dom, etc.

Los datos que obtiene la página han sido realizados con node js y un servidor de express, utilizando herramientas como nodemon, morgan, cors, bcryptjs, qrcode, pdfkit y una ORM de javascript llamada "sequelize" que utiliza como motor de datos la libreria mysql2.

## Instrucciones

### Página de inicio de la página web:
 ![](https://hackmd.io/_uploads/r1GdrKhfa.png)

En este inicio, puedes continuar como usuario público sin necesidad de iniciar sesión, las funciones disponibles para este tipo de usuario son:

###  **Nuevo ingreso de alumno** 
este botón lo llevará a la siguiente pantalla:

![](https://hackmd.io/_uploads/HkgyDLK2fa.png)

en el que deberá de llenar los datos del alumno que quiera registrar para generar un turno para cualquiera de los trámites escolares disponibles.

> Nota: el alumno no debe de estar previamente registrado en el sistema, si ya cuenta con un alumno previamente registrado pase al punto **CREAR TICKET DE ALUMNO YA REGISTRADO**.

Una vez ingresados los datos y son válidos para el sistema, lo moverá al siguiente formulario y a su vez, un mensaje de éxito le avisará si el alumno fue correctamente registrado.

![](https://hackmd.io/_uploads/rJ_tDYhfa.png)

En este formulario deberá de llenar los datos del representante o tutor del alumno, el nombre del tutor deberá ser [PRIMER NOMBRE + PRIMER APELLIDO] y sin acentuaciones, para el celular y el teléfono, deberá de ser un número teléfonico que sea SOLAMENTE DE 10 DIGITOS, no más ni menos, y para el correo deberá de ser cualquiera válido. 

> Nota: el representante no debe de estar previamente registrado en el sistema, si ya cuenta con un representante previamente registrado pase al punto **CREAR TICKET DE ALUMNO YA REGISTRADO**.

Una vez ingresados los datos y son válidos para el sistema, lo moverá al último formulario y a su vez, un mensaje de éxito le avisará si el representante fue correctamente registrado.

![](https://hackmd.io/_uploads/B1K0OY2fT.png)

Éste último formulario pide rellenar los mismo datos tanto del alumno como del representante otra vez por seguridad y también para generar el ticket de su turno

> Nota: los datos de los campos "CURP", "NOMBRE, "PATERNO" y "MATERNO" referencían a los datos del alumno registrado previamente y los campos "NOMBRE COMPLETO DE QUIEN REALIZARÁ EL TRÁMITE", "TELÉFONO", "CELULAR" Y "CORREO" referencían a los datos del representante registrado previamente, asi que, debe de ingresar exactamente los datos de algún representante o alumno ya existentes en el sistema, tambien cabe aclarar que para los otros campos no es necesario que ya estén registrados en el sistema, esos se registran a la hora de generar el ticket junto con su turno.

Así es como se debe de ver el formulario con los datos ingresados:

![](https://hackmd.io/_uploads/SyHV2F2fp.png)


Una vez que haya completado todos los campos y presione el botón "GENERAR TURNO", si son validos los datos, aparecerá un mensaje en pantalla con algunos de los datos del turno y se descargará automaticamente un archivo pdf con el nombre de "turno.pdf" con los datos del alumno y el representante, así como el id, el número de turno y el status actual del turno, así como un codigo qr con las curp del alumno (cabe aclarar que esta acción lo redireccionará a la página de inicio).

- Mensaje de éxito

![](https://hackmd.io/_uploads/H1793t3zp.png)

- Ticket en formato PDF

![](https://hackmd.io/_uploads/HySnht2fT.png)

- Resultado del código QR

![](https://hackmd.io/_uploads/BJpX6YhGa.jpg)


### Crear ticket de alumno ya ingresado

este botón es SOLAMENTE para aquellos representantes Y alumnos previamente registrados en el sistema, si usted o el alumnno no se encuentran registrados en el sistema, vuelva al punto anterior, este formulario es para aquellos representantes que quierer generar un nuevo turno para un tramite distinto, un nivel de estudios distinto o un municipio distinto del alumno con los datos que ya han registrado previamente, de la siguiente forma:

- Formulario que lo recibe (similar al ultimo formulario del punto anterior pero con los datos del turno actualizados para generar uno nuevo):

![](https://hackmd.io/_uploads/ryDT0K2f6.png)

Una vez que haya completado todos los campos y presione el botón "GENERAR TURNO", si son validos los datos, aparecerá un mensaje en pantalla con algunos de los datos del turno y se descargará automaticamente un archivo pdf con el nombre de "turno.pdf" con los datos del alumno y el representante, así como el id, el número de turno y el status actual del turno, así como un codigo qr con las curp del alumno (cabe aclarar que esta acción lo redireccionará a la página de inicio).

- Mensaje de éxito

![](https://hackmd.io/_uploads/ry5xJchMT.png)

- Ticket en formato PDF

![](https://hackmd.io/_uploads/ryaQ1chfa.png)

- Resultado del código QR (el mismo que el punto anterior realemente porque sigue siendo el mismo alumno)

![](https://hackmd.io/_uploads/BJpX6YhGa.jpg)

>Nota: el id del turno es autoincrementable y es único para cada registro pero el número de turno siempre se inicializa en 1 por cada nuevo municipio en el que se crea un turno y se autoincrementa.

### Iniciar sesión para convertirse en usuario administrador

En la página de inicio, presione el boton "iniciar sesión", esto lo redireccionará a la siguiente pantalla:

![](https://hackmd.io/_uploads/ryFq152zp.png)

Si no se ha registrado con alguna cuenta anteriormente, presione el boton "registrarse", esto lo llevará a la siguiente pantalla:

![](https://hackmd.io/_uploads/Skdrx93GT.png)

ingrese cualquier nombre de usuario y cualquier contraseña que guste de más de 8 caracteres, ambos campos de la contraseña deben de ser idénticos y puede ver la contraseña u ocultarla con el boton "ver", si los campos son válidos, se mostrará una alerta de exito y será redireccionado a la pantalla de inicio:

![](https://hackmd.io/_uploads/rJHRe52GT.png)

para iniciar sesión sólo coloque sus credenciales y complete el captcha, de la siguiente manera:

![](https://hackmd.io/_uploads/r1a4Zc3MT.png)

si sus credenciales corresponden a las registradas, esto le dará acceso a nuevas funcionalidades en la pantalla de inicio de la siguiente forma:

![](https://hackmd.io/_uploads/SJWOb9nfp.png)

algunas de las nuevas funcionalidades son:

- modificar catalogos

en esta pantalla puede registrar, eliminar o editar algun registros de los catalagos de la base de datos, si usted desea registrar un elemento debe rellenar todos los campos a excepcion de ID porque es autoincremental (sin contar el catalago de alumno que ahi si debe ingresar la curp ya que es su llave primaria), a la hora de editar un registro si debe colocar el id (o curp) del registro correspondiente y los demás campos que quisiera actualizar, y para eliminar solo coloque el id (o curp) del registro que quiera borrar del sistema, una vez que realice alguno de estos cambios, la tabla debajo del formulario debería de actualizarse

![](https://hackmd.io/_uploads/r1llNq3G6.png)

> Nota: si alguno de los registros no se pueden actualizar o eliminar, es porque están siendo usados en algun turno registrado en el sistema

- Modificar tickets:

En esta pantalla se muestra el catalago de turnos en una lista interactiva, si da click en alguno de los registros, estos le permitirán borrar un registro, cambiar su status de pendiente a realizado y viceversa, el boton de "editar" no se le agregó funcionalidad, y el formulario que está al costado de la lista solo genera turnos en base a los datos de representante y alumnos que ya han sido registrados.

![](https://hackmd.io/_uploads/S1YjP52Ma.png)

- Ultimos dos registros que acabamos de hacer con el status actualizado de pendiente a realizado:

![](https://hackmd.io/_uploads/Syzl_9nf6.png)

- Ultimo registro eliminado:

![](https://hackmd.io/_uploads/BJ2Z_cnzp.png)


>Nota: cabe aclarar que la lista se actualiza automaticamente si actualiza el status o elimina un registro.

- Grafica por municipios:

inicialmente esta pantalla muestra el total de solicitudes, pero en cuanto selecciona algun muncipio, la grafica se actualiza con los datos que recopila de dicho municipio, si la grafica no muestra datos es porque no hay registros de ese municipio:

- Grafica inicial:

![](https://hackmd.io/_uploads/S1BFuc3zp.png)

- Grafica con las solicitudes en Saltillo:

![](https://hackmd.io/_uploads/By4TOq2za.png)

- Grafica con las solicitudes en Monterrey (aun no hay turnos en dicha ciudad)

![](https://hackmd.io/_uploads/SkPJF5nMa.png)

Y por ultimo:

- Grafica total

Esta pantalla muestra unicamente el total de solicitudes:

![](https://hackmd.io/_uploads/BJRMF9hM6.png)

y eso ha sido todo de las instrucciones del sistema de tickets de turno.

> [name=Jorge de Jesús Cedillo Gutiérrez]



