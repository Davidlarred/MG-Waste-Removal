import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTHROUTES, COMPONENTS } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RegisterComponent } from './components/register/register.component';
// import {MatInputModule} from '@angular/material/input';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import {MatRadioModule} from '@angular/material/radio';
// import { SearchForPasswordRecoveryComponent } from './components/search-for-password-recovery/search-for-password-recovery.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatIconModule,
    // MatButtonModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatRadioModule,
    RouterModule.forChild(AUTHROUTES)
  ],
})
export class AuthModule { }
