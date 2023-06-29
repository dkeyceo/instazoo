import { NgModule } from "@angular/core";
import { MatButtonModule, MatCardMdImage, MatCardModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatMenu, MatMenuModule, MatSnackBarModule, MatToolbarModule } from "@angular/material";
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  exports:[
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatDividerModule,
  MatCardModule,
  MatDialogModule
  ]
})
export class MaterialModule
{}
