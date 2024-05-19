import { Component } from '@angular/core';
import { AstraDatabaseService } from "../../services/astra-database/astra-database.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(readonly astraDBService: AstraDatabaseService) {}

  createConnect(): void {
    this.astraDBService.connect().then(res => console.log(res))
  }
}
