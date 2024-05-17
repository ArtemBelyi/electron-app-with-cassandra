import { Component } from '@angular/core';
import { CassandraService } from "../../services/cassandra/cassandra.service";
import { AstraDatabaseService } from "../../services/astra-database/astra-database.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(
    readonly cassandraService: CassandraService,
    readonly astraDBService: AstraDatabaseService
  ) {}

  testConnection(): void {
    this.cassandraService.testConnection().then(res => console.log(res))
  }

  createKeyspace(): void {
    this.cassandraService.createKeyspace("new_keyspace_belyi_1").then(res => console.log(res))
  }

  createConnect(): void {
    this.astraDBService.connect().then(res => console.log(res))
  }

  createTable(): void {
    this.cassandraService.createTable("abelyi_2", "Table_race_2").then(res => console.log(res))
  }

  getTablesName(): void {
    this.cassandraService.getTableNamesFromKeyspace("abelyi_2").then(res => console.log(res))
  }

  getColumnFromTable(): void {
    this.cassandraService.getColumnsForTable("abelyi_2", "table_race_2").then(res => console.log(res))
  }
}
