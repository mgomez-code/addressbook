# Addressbook
# Tutorial AddressBook

### ¿Cómo funciona?  

Ejemplo de contrato inteligente, que permite almacenar y consultar datos de: dirección de wallet, nombre, apellido y edad de los usuarios

### Paso a Paso
#####  1.- Obtener la base aepp de cualquiera de los siguientes enlaces:
  - [Google Play](https://play.google.com/store/apps/details?id=com.aeternity.base)
  - [App Store](https://apps.apple.com/ru/app/base-%C3%A6pp-wallet/id1458655724)
#####  2.- Ejecutar la aplicación y crear una cuenta.
#####  3.- Configure la la red en baseaepp. In setting > node on: Network seleccione testnet.
#####  4.- Selecciones una cuenta.
#####  5.- Obtener token de pruebas.
        5.1- Copiar dirección de la wallet.
        5.2- Ingresar al faucet a través del siguiente enlace usando el navegador de su preferencia:(https://testnet.faucet.aepps.com/)
        5.3- Pegar Dirección de wallet en el campo destinado para ello.
        5.4- Hacer clic en el botón identificado como Top UP.
#####  6.- Verificar los token en la wallet del base aepp.
#####  7.- Ingresar al Browser de base aepp y copiar la siguiente url:(https://mgomez-code.github.io/addressbook/)
#####  8.- Regresar al wallet y copia la dirección.
#####  9.- Regresar nuevamente al Browser de base aepp.
#####  10.- Ingresar dirección de la wallet copiada en el campo address wallet, con los demás datos solicitados.
#####  11.- Presionar botón de comando que dice registrar.
#####  12.- Copia nuevamente la dirección del wallet en el campo address wallet.
#####  13.- Por último haz clic en el botón Consultar y veras los datos almacenados en el contrato inteligente.


### Descripción de Métodos
- entrypoint addPerson(address: address, first_name: string, last_name: string, age: int) registra a la persona con los datos de address wallet, nombre, apellido y edad.
- entrypoint getPerson(address : address) – muestra el registro asociado con esa wallet address.
- entrypoint function lookupByAddress(k : address, m, v) - Busca por wallet address.
