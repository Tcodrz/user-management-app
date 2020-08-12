import { TodosService } from './../../services/todos.service';
import { IUser, ITodo } from './../../interface/interface';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  user: IUser;

  todos: ITodo[] = [];

  sub: Subscription;
  todoSub: Subscription;

  constructor(private userService: UsersService, private todoService: TodosService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    // this.todoSub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.userService.currentUser.subscribe((id: number) => {

      this.todoService.getAllTodos(id).then((data) => {
        this.todos = data;
      });

    });
  }

  markCompleted(id) {
    this.todoService.markCompleted(id).subscribe((todo) => {

      if (todo['todo']) {
        this.todoService.checkTodos.next(true);
      }
      const current = this.todos.find(x => x.id === id);
      current.completed = true;
    });
  }

}
