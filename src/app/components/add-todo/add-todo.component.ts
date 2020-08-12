import { UsersService } from 'src/app/services/users.service';
import { TodosService } from './../../services/todos.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  @Output() submitedTodo: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  sub: Subscription;
  id: number;

  constructor(private todoService: TodosService, private userService: UsersService) { }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((id: number) => {
      this.id = id;
    });
  }

  handleSubmit(todo) {
    this.todoService.addTodo(todo, this.id).subscribe(data => {

      this.todoService.checkTodos.next(true);
      this.submitedTodo.emit();
    });

  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
