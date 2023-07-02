import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { CommentService } from 'src/app/services/comment.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  isUserPostsLoaded = false;
  posts: Post[];

  constructor(private postService: PostService,
    private imageUploadService: ImageUploadService,
    private commentService: CommentService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.postService.getPostForCurrentUser()
    .subscribe(data => {
      this.posts = data;
      this.getCommentsToPosts(this.posts);
      this.getImagesToPosts(this.posts);
      this.isUserPostsLoaded = true;
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

  getCommentsToPosts(posts: Post[]){
    posts.forEach( p => {
      this.commentService.getCommentsToPost(p.id)
      .subscribe(data => {
        p.comments = data;
      });
    });
  }

  removePost(post: Post, index: number) {
    const result = confirm('Do you want to delete this post ?');
    if(result) {
      this.postService.delete(post.id)
      .subscribe(() => {
        this.posts.splice(index, 1);
        this.notificationService.showSnackBar('Post was deleted');
      });
    }
  }

  deleteComment(commentId: number, postIndex: number, commentIndex: number){
    const post = this.posts[postIndex];

    this.commentService.delete(commentId)
    .subscribe(() => {
      this.notificationService.showSnackBar('comment removed');
      post.comments.splice(commentIndex, 1);
    });
  }

  formatImage(img: any) {
    if(img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
