import { UsersService } from 'src/app/services/users.service';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnDestroy {

  userid: number;

  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
  sub: Subscription;

  constructor(
    private postService: PostsService,
    private userService: UsersService
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.userService.currentUser.subscribe((id: number) => {

      this.userid = id;
    });
  }

  handleSubmit(title, body) {

    this.postService.createPost(this.userid, { title, body })
      .subscribe((data: any) => {
        this.postService.checkPosts.next(true);
        this.onCancel();
      });
  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
