# Thunder-House-Services

Brief project description here.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **MySQL:** Install MySQL on your machine.
- **Node.js:** Install NodeJS.

## Installation
1. Create a MySQL Database:
Execute the following SQL script in your MySQL management tool to create the database:

```
DROP DATABASE IF EXISTS db_thunder_house;
CREATE DATABASE db_thunder_house;
USE db_thunder_house;
```

2. Navigate to the project directory.
```
cd services
```

3. If this is the first time you are running the project or you have updates, run the following command.
```
npm run create
```

4. If you have run the project before and just want to run the server again, run the following command.
```
npm run start
```







Se agregaron los datos de
start_date
end_start
is_from_platform_promotion
has_breakfast

Ubicado en la carpeta de
catalogs>reservation>add-reservation
catalogs>reservation>put-reservation


Se agrego el precio de habitacion en tipo de habitacion
price

Ubicado en la carpeta de
catalogs>room-type>add-room-type
catalogs>room-type>put-room-type










1. Registro de reservacion
- Reserva hecha desde plataforma de promoción (variará el precio con este campo)
- Con nopmbre del lider
- Con nopmbre del sublider
- Id del cliente
- Se envia el detalle de reservaciones (por habitacion):
- - Cantidad de personas
- - Id de habitacion
- - Se indica si se tiene desayuno incluido

2. Arribo de huespedes (todos los siguientes campos corresponden a cada habitacion reservada):
- Se contabiliza el total de personas que llegaron (si difiere con el total de personas que llegaron se sumará al total)
- Se notifica que se ha entregado el pase de estacionamiento
- (Opcionalmente) Se indica cuantos pases extras de estacionamiento se entregaron - se sumará al total
- Se entrega la llave de habitacion
- Se notifica si se ha dejado el equipaje en resguardo
- Se entrega a la habitacion los suministros

3. Desalojo de huespedes (todos los siguientes campos corresponden a cada habitacion reservada):
- Se notifica que se ha retornado el pase de estacionamiento (en caso de perdida se sumará al total)
- (Opcionalmente) Se indica cuantos pases extras de estacionamiento se retornaron (en caso de perdida se sumará al total)
- Se retorna la llave de habitacion (en caso de perdida se sumará al total)
- Se valora si existen daños y se agregan al total











///////////////
Update detail reservation
Validate jwt
make view for get free  busy and other rooms
make view for get free rooms, total size, and price
make view for Hoja de registro (detail reservation)
lotes
200 pesos por daño a cada producto
obtener habitaciones por disponibilidad
obtener habitaciones por total de personas soportadas
actualizar reservaciones