import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeRooms'
})
export class PipeRoomsPipe implements PipeTransform {

  transform(id: number, data: any[]): string {
    const item = data.find(item => item.id_cat_supplie === id);
    return item ? item.supplie : 'No encontrado';
  }

}

@Pipe({
  name: 'pipeRoomsEquipaments'
})
export class PipeRoomsPipeEquipments implements PipeTransform {

  transform(id: number, data: any[]): string {
    const item = data.find(item => item.id_cat_equipment === id);
    return item ? item.equipment : 'No encontrado equipamiento';
  }

}