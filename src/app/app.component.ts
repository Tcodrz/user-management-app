import { IUser } from './interface/interface';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // VIEW VALUES
  showInfo = false;
  showAddTodo = false;
  showPosts = false;
  showAddPost = false;
  addUser = false;

  currentUser: IUser = null;

  // SEARCH INPUT
  search: string;

  constructor(private userService: UsersService) {

  }
  ngOnInit(): void {
    // TRGIER A CALL TO GET ALL USERS - LISTENING IN USERS COMPONENT
    this.userService.checkUsers.next(true);

    // LISTENING TO CLICKS ON USERS CARDS - CHANGE THE LAYOUT AND GET THE USER FROM API
    this.userService.currentUser.subscribe((id: number) => {

      if (id === 0) {
        this.showInfo = false;
        this.showPosts = false;
        this.addUser = false;
        this.currentUser = null;
      }
      if (id > 0) {
        this.showInfo = true;
        this.showPosts = true;
        this.userService.getUserById(id).subscribe(data => {
          this.currentUser = data['user'];
        });
      }
    });
  }
  handleTodoSubmit() {
    // CHANGE THE LAYOUT
    this.showAddTodo = false;
    this.showInfo = true;
  }
  handleCancelPostAdd() {
    // CHANGE THE LAYOUT
    this.showPosts = true;
    this.showAddPost = false;
  }

  handleAddUserEvent() {
    // CHANGE THE LAYOUT
    this.showInfo = false;
    this.showPosts = false;
    this.showAddTodo = false;
    this.showAddPost = false;
    this.addUser = true;
    this.currentUser = null;
  }

  handleCancelAddUser(userid: number) {
    // CHANGE THE LAYOUT
    this.addUser = false;
    this.showInfo = false;
    this.userService.currentUser.next(userid);
  }


}
