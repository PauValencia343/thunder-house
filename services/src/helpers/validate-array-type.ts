import { roomExistsById } from '.';

export const validateArrayRoomsReservationInsert = (value: []) => {
  if (value.length === 0) {
    throw new Error(`The ArrayRooms can not be empty`);
  }
  value.forEach((item: any, index: any) => {
    if (!item.fk_cat_room || typeof item.fk_cat_room !== 'number' || item.fk_cat_room <= 0) {
      throw new Error(`detail_reservation_room[${index}].fk_cat_room should be integer and greater than 0`);
    }
    if (!item.total_people_booked || typeof item.total_people_booked !== 'number' || item.total_people_booked <= 0) {
      throw new Error(`detail_reservation_room[${index}].total_people_booked should be integer and greater than 0`);
    }
    // if (!item.start_date || !validator.isISO8601(item.start_date)) {
    //   throw new Error(`detail_reservation_room[${index}].start_date is required with this format yyyy-mm-dd`);
    // }
    // if (!item.end_date || !validator.isISO8601(item.end_date)) {
    //   throw new Error(`detail_reservation_room[${index}].end_date is required with this format yyyy-mm-dd`);
    // }
    if (typeof item.has_breakfast !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].has_breakfast should be a boolean`);
    }
  });
  return true;
}

///////////////////////////////
export const validateArrayRoomsReservationArrive = (value: []) => {
  if (value.length === 0) {
    throw new Error(`The ArrayRooms can not be empty`);
  }
  value.forEach((item: any, index: any) => {
    if (!item.id_detail_reservation_room || typeof item.id_detail_reservation_room !== 'number' || item.id_detail_reservation_room <= 0) {
      throw new Error(`detail_reservation_room[${index}].id_detail_reservation_room should be integer and greater than 0`);
    }
    if (!item.total_people_arrived || typeof item.total_people_arrived !== 'number' || item.total_people_arrived <= 0) {
      throw new Error(`detail_reservation_room[${index}].total_people_arrived should be integer and greater than 0`);
    }
    if (item.extra_parking_pass) {
      if (typeof item.extra_parking_pass !== 'number' || item.extra_parking_pass <= 0) {
        throw new Error(`detail_reservation_room[${index}].extra_parking_pass should be integer and greater than 0`);
      }
    }
    if (typeof item.parking_pass_delivered !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].parking_pass_delivered should be a boolean`);
    }
    if (typeof item.key_delivered !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].key_delivered should be a boolean`);
    }
    if (typeof item.baggage_claim !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].baggage_claim should be a boolean`);
    }
    if (typeof item.supplies_delivered !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].supplies_delivered should be a boolean`);
    }
  });
  return true;
}

export const validateArrayRoomsReservationOutput = (value: []) => {
  if (value.length === 0) {
    throw new Error(`The ArrayRooms can not be empty`);
  }
  value.forEach((item: any, index: any) => {
    if (!item.id_detail_reservation_room || typeof item.id_detail_reservation_room !== 'number' || item.id_detail_reservation_room <= 0) {
      throw new Error(`detail_reservation_room[${index}].id_detail_reservation_room should be integer and greater than 0`);
    }
    if (item.extra_parking_pass_returned !== undefined && (typeof item.extra_parking_pass_returned !== 'number' || item.extra_parking_pass_returned <= 0)) {
      throw new Error(`detail_reservation_room[${index}].extra_parking_pass_returned should be an integer and greater than 0`);
    }
    if (typeof item.parking_pass_returned !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].parking_pass_returned should be a boolean`);
    }
    if (item.parking_pass_forgot !== undefined && typeof item.parking_pass_forgot !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].parking_pass_forgot should be a boolean`);
    }
    if (typeof item.key_returned !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].key_returned should be a boolean`);
    }
    if (item.key_forgot !== undefined && typeof item.key_forgot !== 'boolean') {
      throw new Error(`detail_reservation_room[${index}].key_forgot should be a boolean`);
    }
    if (item.observations !== undefined && typeof item.observations !== 'string') {
      throw new Error(`detail_reservation_room[${index}].observations should be a string`);
    }
    if (item.extra_charges !== undefined && (typeof item.extra_charges !== 'number' || item.extra_charges < 0 || !Number(item.extra_charges.toFixed(2)))) {
      throw new Error(`detail_reservation_room[${index}].extra_charges should be a positive number with up to 2 decimal places`);
    }
  });
  return true;
}

export const validateExistingArrayRooms = async (arr: {
  fk_cat_room: number,
}[]
) => {
  const promises = arr.map((item) => roomExistsById(false)(item.fk_cat_room));
  try {
    await Promise.all(promises);
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


