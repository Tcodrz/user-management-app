import { IUser } from './../../../interface/interface';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  // cancel event handled in parent UsersComponent
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  id: number;

  sub: Subscription;

  constructor(private userService: UsersService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.userService.currentUser.subscribe(id => this.id = id);
  }

  handleSubmitUser(data) {
    const addUser: IUser = {
      name: data.name,
      email: data.email,
      address: {
        city: 'data',
        street: 'data',
        zipcode: 'data'
      }
    };
    this.userService.register(addUser);

  }
  onCancel() {
    this.cancelEvent.emit(this.id);
  }

}
