import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  user: User;

  constructor(private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isDataLoaded = true;
      },err => console.log(err));
    }
  }

  logout(){
    this.tokenStorageService.logOut();
    this.router.navigate(['/login']);
  }
}
