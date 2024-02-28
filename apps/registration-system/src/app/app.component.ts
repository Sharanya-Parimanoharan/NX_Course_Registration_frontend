import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UserSigninComponent } from '@mono-repo/user/signin';
import { UserProfileComponent } from '@mono-repo/user/profile';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {NavMenuSideNavMenuComponent} from '@mono-repo/nav-menu/side-nav-menu';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
@Component({
  standalone: true,
  imports: [HttpClientModule,NxWelcomeComponent,MatDialogModule,NavMenuSideNavMenuComponent, RouterModule,UserSigninComponent,UserProfileComponent,MatFormFieldModule,FlexLayoutModule,HomeComponent,MatInputModule,MatTableModule],
  selector: 'mono-repo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'registration-system';
}
