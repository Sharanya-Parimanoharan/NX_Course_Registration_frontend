import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import toastr from 'toastr';
import { HttpClientModule } from '@angular/common/http';

import 'toastr/toastr.scss'; // Make sure this import is correct
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
