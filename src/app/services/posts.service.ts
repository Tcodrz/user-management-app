import { IPost } from './../interface/interface';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  checkPosts: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  getAllPosts(id: number) {
    return new Promise<IPost[]>((resolve, reject) => {

      this.http.get(`${environment.api}/posts`).subscribe(data => {
        const posts = data['posts'];
        const userPosts = posts.filter(x => x.userId === id);
        resolve(userPosts);
      });
    });
  }

  createPost(userid, post) {
    return this.http.post(`${environment.api}/posts/${userid}`, post);
  }
}
