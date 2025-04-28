import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent, ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'surify_frontend';
}
