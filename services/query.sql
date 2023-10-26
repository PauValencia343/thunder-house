DROP DATABASE IF EXISTS db_thunder_house;
CREATE DATABASE db_thunder_house;
USE db_thunder_house;

CREATE TABLE cat_user(
  id_cat_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  status TINYINT NOT NULL DEFAULT 1
);

INSERT INTO cat_user(email,user_name,password) VALUES('email1','user_name1','password1');
INSERT INTO cat_user(email,user_name,password) VALUES('email2','user_name2','password2');

CREATE TABLE cat_role(
  id_cat_role INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  status TINYINT NOT NULL DEFAULT 1
);

INSERT INTO cat_role(role) VALUES('role1');
INSERT INTO cat_role(role) VALUES('role2');
INSERT INTO cat_role(role) VALUES('role3');
INSERT INTO cat_role(role) VALUES('role4');

CREATE TABLE cat_floor(
  id_cat_floor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  number INT NOT NULL,
  name VARCHAR(255),
  status TINYINT NOT NULL DEFAULT 1
);

INSERT INTO cat_floor(number,name) VALUES(1, 'A');
INSERT INTO cat_floor(number,name) VALUES(2, 'B');
INSERT INTO cat_floor(number,name) VALUES(3, 'C');
INSERT INTO cat_floor(number,name) VALUES(4, 'D');

CREATE TABLE detail_user_role(
  id_detail_user_role INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fk_cat_user INT NOT NULL,
  fk_cat_role INT NOT NULL,
  CONSTRAINT fk_detail_user_role_cat_user FOREIGN KEY (fk_cat_user) REFERENCES cat_user(id_cat_user),
  CONSTRAINT fk_detail_user_role_cat_role FOREIGN KEY (fk_cat_role) REFERENCES cat_role(id_cat_role)
);

INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(1, 1);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(2, 1);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(2, 2);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(2, 3);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(1, 4);

CREATE TABLE detail_role_floor(
  id_detail_user_role INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fk_cat_role INT NOT NULL,
  fk_cat_floor INT NOT NULL,
  CONSTRAINT fk_detail_role_floor_cat_role FOREIGN KEY (fk_cat_role) REFERENCES cat_role(id_cat_role),
  CONSTRAINT fk_detail_role_floor_cat_floor FOREIGN KEY (fk_cat_floor) REFERENCES cat_floor(id_cat_floor)
);

INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(1, 1);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(1, 2);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(2, 1);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(2, 2);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(2, 3);
INSERT INTO detail_user_role(fk_cat_user,fk_cat_role) VALUES(2, 4);

CREATE TABLE cat_room_status(
  id_cat_room_status INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dirty TINYINT NOT NULL,
  busy TINYINT NOT NULL,
  status TINYINT NOT NULL DEFAULT 1
);

INSERT INTO cat_room_status(dirty, busy) VALUES(1, 1);
INSERT INTO cat_room_status(dirty, busy) VALUES(1, 0);
INSERT INTO cat_room_status(dirty, busy) VALUES(0, 1);
INSERT INTO cat_room_status(dirty, busy) VALUES(0, 0);

CREATE TABLE cat_room_type(
  id_cat_room_type INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_type VARCHAR(255) NOT NULL,
  status TINYINT NOT NULL DEFAULT 1
);

INSERT INTO cat_room_type(room_type) VALUES('Suit');
INSERT INTO cat_room_type(room_type) VALUES('Jr');
INSERT INTO cat_room_type(room_type) VALUES('Marriage');
INSERT INTO cat_room_type(room_type) VALUES('Simple');

CREATE TABLE cat_equipment(
  id_cat_equipment INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  equipment VARCHAR(255) NOT NULL,
  total_number_people INT NOT NULL,
  status TINYINT NOT NULL DEFAULT 1
);

INSERT INTO cat_equipment(equipment, total_number_people) VALUES('Single beds', 1);
INSERT INTO cat_equipment(equipment, total_number_people) VALUES('Queen size', 3);
INSERT INTO cat_equipment(equipment, total_number_people) VALUES('Double beds', 2);
INSERT INTO cat_equipment(equipment, total_number_people) VALUES('Sofa bed', 1);

CREATE TABLE cat_room(
  id_cat_room INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  number INT NOT NULL,
  name VARCHAR(255),
  status TINYINT NOT NULL DEFAULT 1,
  fk_cat_floor INT NOT NULL,
  fk_cat_room_status INT NOT NULL,
  fk_cat_room_type INT NOT NULL,
  CONSTRAINT fk_room_floor FOREIGN KEY (fk_cat_floor) REFERENCES cat_floor(id_cat_floor),
  CONSTRAINT fk_room_room_status FOREIGN KEY (fk_cat_room_status) REFERENCES cat_room_status(id_cat_room_status),
  CONSTRAINT fk_room_room_type FOREIGN KEY (fk_cat_room_type) REFERENCES cat_room_type(id_cat_room_type)
);


INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,1,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,1,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,1,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,1,4,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,2,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,2,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,2,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,2,4,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,3,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,3,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,3,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,3,4,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,4,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,4,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,4,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,4,4,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,1,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,1,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,1,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,1,4,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,2,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,2,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,2,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,2,4,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,3,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,3,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,3,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,3,4,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(1,4,1,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(2,4,2,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(3,4,3,1);
INSERT INTO cat_room(number,fk_cat_floor,fk_cat_room_status,fk_cat_room_type) VALUES(4,4,4,1);

CREATE TABLE detail_equipment_room_type(
  id_detail_equipment_room_type INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  total_equipments INT NOT NULL,
  fk_cat_equipment INT NOT NULL,
  fk_cat_room_type INT NOT NULL,
  CONSTRAINT fk_detail_equipment_room_type_cat_equipment FOREIGN KEY (fk_cat_equipment) REFERENCES cat_equipment(id_cat_equipment),
  CONSTRAINT fk_detail_equipment_room_type_cat_room_type FOREIGN KEY (fk_cat_room_type) REFERENCES cat_room_type(id_cat_room_type)
);

INSERT INTO detail_equipment_room_type(total_equipments,fk_cat_equipment,fk_cat_room_type) VALUES(1,4,1);
INSERT INTO detail_equipment_room_type(total_equipments,fk_cat_equipment,fk_cat_room_type) VALUES(3,3,1);




SELECT cf.*, drf.*, cr.*, dur.*, cu.*
FROM cat_floor cf
INNER JOIN detail_role_floor drf ON cf.id_cat_floor = drf.fk_cat_floor
INNER JOIN cat_role cr ON drf.fk_cat_role = cr.id_cat_role
INNER JOIN detail_user_role dur ON cr.id_cat_role = dur.fk_cat_role
INNER JOIN cat_user cu ON dur.fk_cat_user = cu.id_cat_user;



SELECT crt.room_type, cs.supplie, dsrt.total_supplies, ce.equipment, ce.total_number_people, dert.total_equipments
	FROM cat_room_type crt
INNER JOIN detail_supplie_room_type dsrt
	ON dsrt.fk_cat_room_type = crt.id_cat_room_type
INNER JOIN cat_supplie cs
	ON dsrt.fk_cat_supplie = cs.id_cat_supplie
INNER JOIN detail_equipment_room_type dert
	ON dert.fk_cat_room_type = crt.id_cat_room_type
INNER JOIN cat_equipment ce
	ON dert.fk_cat_equipment = ce.id_cat_equipment
WHERE crt.id_cat_room_type = '71d9d042-76af-489c-b314-40fb133212f3';


SELECT * FROM cat_room_type;

SELECT crt.room_type, cs.supplie, dsrt.total_supplies
	FROM cat_room_type crt
INNER JOIN detail_supplie_room_type dsrt
	ON dsrt.fk_cat_room_type = crt.id_cat_room_type
INNER JOIN cat_supplie cs
	ON dsrt.fk_cat_supplie = cs.id_cat_supplie
WHERE crt.id_cat_room_type = '3b592699-66d5-4c33-bee6-abc29baebe53';


SELECT crt.room_type, ce.equipment, ce.total_number_people, dert.total_equipments
	FROM cat_room_type crt
INNER JOIN detail_equipment_room_type dert
	ON dert.fk_cat_room_type = crt.id_cat_room_type
INNER JOIN cat_equipment ce
	ON dert.fk_cat_equipment = ce.id_cat_equipment
WHERE crt.id_cat_room_type = '3b592699-66d5-4c33-bee6-abc29baebe53';


SELECT * FROM cat_room cr
	INNER JOIN cat_floor cf ON cf.id_cat_floor = cr.fk_cat_floor
	INNER JOIN cat_room_status crs ON crs.id_cat_room_status = cr.fk_cat_room_status
	INNER JOIN cat_room_type crt ON crt.id_cat_room_type = cr.fk_cat_room_type
	WHERE id_cat_room = 'ed3a4099-a93d-4a85-9cb4-f080182aca08';


SELECT * FROM cat_role cr INNER JOIN detail_user_role dus ON cr.id_cat_role = dus.fk_cat_role
WHERE dus.fk_cat_user = '23cd94a7-1565-4f5c-a746-9735abfe6059';

SELECT * FROM cat_floor cf INNER JOIN detail_role_floor drf ON cf.id_cat_floor = drf.fk_cat_floor WHERE drf.fk_cat_role = '6f4aeca7-2032-4743-8ab6-230cb26e78f8';


SELECT cf.*, cr.* FROM cat_floor cf
	INNER JOIN detail_role_floor drf
		ON cf.id_cat_floor = drf.fk_cat_floor
	INNER JOIN cat_role cr
		ON cr.id_cat_role = drf.fk_cat_role
WHERE cr.id_cat_role = 'c3070af4-2060-4d9a-a6d2-6e17719d1750';


SELECT cu.*, cr.* FROM cat_user cu
	INNER JOIN detail_user_role dur
		ON cu.id_cat_user = dur.fk_cat_user
	INNER JOIN cat_role cr
		ON cr.id_cat_role = dur.fk_cat_role
WHERE cu.id_cat_user = '21389882-e19c-4a74-a3dc-756f769c1e87';



