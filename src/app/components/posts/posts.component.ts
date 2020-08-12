import { IUser, IPost } from './../../interface/interface';
import { UsersService } from 'src/app/services/users.service';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  user: IUser;

  userid: number;
  sub: Subscription;
  postSub: Subscription;

  constructor(
    private postsService: PostsService,
    private userService: UsersService,
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.postSub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.userService.currentUser.subscribe((id: number) => {

      if (id === 0) {
        return;
      }

      this.userService.getUserById(id).subscribe((data: any) => {
        this.user = data['user'];
        this.getPosts();
      });
    });

    this.postSub = this.postsService.checkPosts.subscribe(val => {
      this.getPosts();
    });
  }
  async getPosts() {
    this.posts = await this.postsService.getAllPosts(this.user.id);

  }

}
