import { IUser } from './../interface/interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: IUser[], searchValue: string) {
    if (!users) {
      return null;
    }
    if (!searchValue) {
      return users;
    }
    return users.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
  }

}
