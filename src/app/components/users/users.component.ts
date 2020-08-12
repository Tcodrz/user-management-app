import { IUser } from './../../interface/interface';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  @Output() showInfoEvent = new EventEmitter();

  @Input() searchText: string;

  sub: Subscription;
  searchSub: Subscription;
  checkSub: Subscription;

  users: IUser[] = [];

  // searchValue = '';

  constructor(private userService: UsersService) { }

  async ngOnInit() {
    this.users = await this.getUsers();

    this.checkSub = this.userService.checkUsers.subscribe(async () => { this.users = await this.getUsers(); });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.searchSub.unsubscribe();
    this.checkSub.unsubscribe();
  }

  getUsers() {
    return new Promise<IUser[]>(resolve => {

      this.sub = this.userService.getAllUsers().subscribe(data => {
        const users = data['users'];
        users.sort((a, b) => {
          return a.id - b.id;
        });
        resolve(users);
      });
    });
  }

}
