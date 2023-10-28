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


Pase gratis x carro x habitación
Solo reserva dias completos
  Reserva
  1000
  lunes    15:00 - martes     12:00
  1000
  martes   15:00 - miercoles  12:00
Cada habitación con su limite máximo (380 extra por persona)
Checkout: Hora de salida a las 12 am Son todas las habitaciones y el husped tiene que salir, si pasa de la hora se cobra extra que es media renta.
Máximo dos o tres horas (pierde la reservacion y queda limpia y libre)
Contemplar descuentos por grupo
Resguardo de equipaje
Hoja de registro: Datos persona y desperfecto


Habitaciones por rol
Usuarios por rol
Estatus de la habitación
  Desocupada limpia
  Rentada limpia (Snow - reservada y pagada por el cliente)
  Ocupada limpia (Cheking)
  Ocupada sucia
  Desocupada sucia (Checkout)



Kit de amenidades:
  - Shampoo
  - Crema
  - Jabón
  - 2 Botellas de agua
  - Acondicionador

Suit
  - 7 - 8 personas
  - 3 camas matrimoniales
  - 1 sofa cama
Jr
  - 5 - 6 personas
  - 2 camas matrimoniales
  - 1 sofa cama
Matrimoniales
  - 2 - 4 personas
  - 2 camas matromoniales
Simples
  - 1 - 2 personas
  - 1 cama matrimonial

Encargado de habitaciones
10 + personas 10% de descuento


Desayuno x 155 x día x persona
Comida y cena no lo administra el sistema

Inventario por lotes
Las habitaciones aumentan el precio un 40% de viernes y sábado
Las habitaciones disminuyen el precio un 30% si se reserva por alguna plataforma (Boking/Spedia/Travel)

Reservacion
  Credencial de lector
  ?Numero de placas
  ?Credencial de segundo encargado
  Datos personales
  Total personas
  Almacenamiento de equipaje anticipado

Productos administrados:
  Toallas
  Sabanas
  Almohadas
200 pesos por daño a cada producto
90 pesos por llave extraviada

roles
- administrator
- recepcionista
- adminsitrador de llaves por piso
- limpiador



Habitaciones por rol
Usuarios por rol
Estatus de la habitación
  Desocupada limpia
  Rentada limpia (Snow - reservada y pagada por el cliente)
  Ocupada limpia (Cheking)
  Ocupada sucia
  Desocupada sucia (Checkout)



producto
empleado

cliente
  uuid
  nombre
reservacion
  uuid
  fechas
  pagos
  jefeGrupo
  subJefeGrupo
  estatus
detalle_reservacion_habitacion


