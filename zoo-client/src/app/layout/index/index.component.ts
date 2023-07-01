import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostsLoaded = false;
  posts: Post[];
  isUserDataLoaded = false;
  user: User;

  constructor(private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
    this.postService.getAllPost()
    .subscribe(data => {
      console.log(data);
      this.posts = data;
      this.getCommentsToPosts(this.posts);
      this.getImagesToPosts(this.posts);
      this.isPostsLoaded = true;
    });

    this.userService.getCurrentUser()
    .subscribe(data => {
      this.user = data;
      this.isUserDataLoaded = true;
    });
  }

  getImagesToPosts(posts: Post[]){
    posts.forEach( p => {
      this.imageUploadService.getImageToPost(p.id)
      .subscribe(data => {
        p.image = data.imageBytes;
      });
    });
  }

  getCommentsToPosts(posts: Post[]) {
    posts.forEach( p => {
      this.commentService.getCommentsToPost(p.id)
      .subscribe(data => {
        p.comments = data;
      });
    });
  }

  likePost(postId: number, postIndex: number){
    const post = this.posts[postIndex];

    if(!post.usersLiked.includes(this.user.username)){
      this.postService.likePost(postId, this.user.username)
      .subscribe(() => {
        post.usersLiked.push(this.user.username);
        this.notificationService.showSnackBar('Liked!');
      });
    }else {
      this.postService.likePost(postId, this.user.username)
      .subscribe(() => {
        const index = post.usersLiked.indexOf(this.user.username, 0);
        if(index > -1){
          post.usersLiked.splice(index, 1);
        }
      });
    }
  }

  postComment(event: Event, postId: number, postIndex: number){
    const post = this.posts[postIndex];
    const message = (event.target as HTMLInputElement).value;
    this.commentService.addCommentToPost(postId, message)
    .subscribe(data => {
      console.log(data);
      post.comments.push(data);
    });
  }

  formatImage(img: any) {
    if(img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
