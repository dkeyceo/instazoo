import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false;
  user: User;
  selectedFile: File;
  userProfileImage: File;
  previewImgURL: any;

  constructor(private tokenStorageService: TokenStorageService,
    private postService: PostService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private imageUploadService: ImageUploadService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .subscribe(data => {
      this.user = data;
      this.isUserDataLoaded = true;
    });

    this.imageUploadService.getProfileImage()
    .subscribe(data => {
      this.userProfileImage = data.imageBytes;
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

  openEditDialog(){
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(img: any) {
    if(img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(){
    if(this.selectedFile !=null){
      this.imageUploadService.uploadImageToUser(this.selectedFile)
      .subscribe(() => {
        this.notificationService.showSnackBar('Profile image was updated!');
      });
    }
  }
}
