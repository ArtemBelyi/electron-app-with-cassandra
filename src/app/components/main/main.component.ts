import { Component } from '@angular/core';
import { CassandraService } from "../../services/cassandra/cassandra.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(readonly cassandraService: CassandraService) {}

  getTestConnection(): void {
    this.cassandraService.testConnection().then(res => console.log(res))
  }
}
