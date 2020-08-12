import { IUser } from './../interface/interface';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser: BehaviorSubject<number> = new BehaviorSubject(0);
  checkUsers: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${environment.api}/users`);
  }

  getUserById(id: number) {
    return this.http.get(`${environment.api}/users/${id}`);
  }

  deleteUser(id: number) {
    this.http.delete(`${environment.api}/users/${id}`).subscribe(() => {
      this.removeTodos(id);
      this.removePosts(id);
      this.currentUser.next(0);
      this.checkUsers.next();
    });
  }
  removeTodos(userid) {
    this.http.delete(`${environment.api}/todo/remove/${userid}`).subscribe();
  }
  removePosts(userid) {
    this.http.delete(`${environment.api}/posts/remove/${userid}`).subscribe();
  }

  updateUser(user: IUser) {
    this.http.put(`${environment.api}/users/${user.id}`, user).subscribe();
  }

  currentUserUpdate(id) {
    this.currentUser.next(id);
  }

  register(user) {
    this.http.post(`${environment.api}/auth/register`, user)
      .subscribe((resp) => {
        this.currentUser.next(resp['user'].id);
        this.checkUsers.next();
      });
  }
}
