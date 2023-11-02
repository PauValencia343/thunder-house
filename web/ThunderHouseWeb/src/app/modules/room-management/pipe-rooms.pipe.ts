import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeRooms'
})
export class PipeRoomsPipe implements PipeTransform {

  transform(id_equipment: number, supplies: any[]): string {
    const matchingRawMaterial = supplies.find(nameSupplies => nameSupplies.id_cat_supplie === id_equipment);

    if (matchingRawMaterial) {
      return matchingRawMaterial.name;
    }

    return 'Unknown Supplies';
  }

}
