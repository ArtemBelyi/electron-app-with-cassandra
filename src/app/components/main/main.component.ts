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

  testConnection(): void {
    this.cassandraService.testConnection().then(res => console.log(res))
  }

  createKeyspace(): void {
    this.cassandraService.createKeyspace("new_keyspace_belyi_1").then(res => console.log(res))
  }

  createTable(): void {
    this.cassandraService.createTable("abelyi_2", "Table_race_2").then(res => console.log(res))
  }
}
