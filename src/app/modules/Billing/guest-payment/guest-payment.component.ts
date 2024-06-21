import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../Auth/Services/auth.service';

@Component({
  selector: 'app-guest-payment',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './guest-payment.component.html',
  styleUrl: './guest-payment.component.scss'
})
export class GuestPaymentComponent {


}
