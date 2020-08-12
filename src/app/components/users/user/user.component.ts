import { Subscription } from 'rxjs';
import { TodosService } from './../../../services/todos.service';
import { UsersService } from 'src/app/services/users.service';
import { IUser, ITodo } from './../../../interface/interface';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  // Input user from parent component
  @Input() user: IUser;

  // toggle display of address details
  showAddress = false;

  // control the border color of the component
  uncompletedTasks = false;


  todos: ITodo[];

  sub: Subscription;

  constructor(
    private userService: UsersService,
    private todoService: TodosService
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {

    if (this.user.address.city === 'data') {
      this.user.address.city = this.user.address.city.replace('data', '');
    }
    if (this.user.address.street === 'data') {
      this.user.address.street = this.user.address.street.replace('data', '');
    }
    if (typeof this.user.address.zipcode === 'string' && this.user.address.zipcode === 'data') {
      this.user.address.zipcode = this.user.address.zipcode.replace('data', '');
    }

    this.sub = this.todoService.checkTodos.subscribe((val) => {
      if (val) {
        this.getTodos(this.user.id);
      }
    });
  }

  async getTodos(id) {
    try {

      this.todos = await this.todoService.getAllTodos(id);

      this.uncompletedTasks = false;
      this.todos.forEach((todo: ITodo) => {
        if (!todo.completed) {
          this.uncompletedTasks = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id);
  }

  onUpdate(data) {
    this.userService.updateUser(this.user);
  }

  showInfo() {
    this.userService.currentUser.next(this.user.id);
  }

}
