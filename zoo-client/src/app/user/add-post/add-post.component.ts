import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup;
  selectedFile: File;
  isPostCreated: boolean;
  createdPost: Post;
  previewImgURL: any;

  constructor(private postService: PostService,
    private imageUploadService: ImageUploadService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.createPostForm()
  }

  createPostForm(): FormGroup{
    return this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      caption: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
    });
  }

  submit(){
    this.postService.createPost({
      title: this.postForm.value.title,
      caption: this.postForm.value.caption,
      location: this.postForm.value.location
    }).subscribe(data => {
      this.createdPost = data;
      if(this.createdPost.id != null){
        this.imageUploadService.uploadImageToPost(this.selectedFile, this.createdPost.id)
        .subscribe(() => {
          this.notificationService.showSnackBar('Post create successfully');
          this.isPostCreated = true;
          this.router.navigate(['/profile']);
        });
      }
    });
  }
  onFileSelected(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }
}
