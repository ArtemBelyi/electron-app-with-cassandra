import { Injectable } from '@angular/core';
import { Client } from "cassandra-driver";

@Injectable({
  providedIn: 'root'
})
export class CassandraService {
  cassandra = require('cassandra-driver');

  constructor() {}

  async testConnection(): Promise<{ [name: string]: object }> {
    const client = this.createClient();

    try {
      await client.connect();
      return client.metadata.keyspaces;
    } catch (error) {
      throw error;
    } finally {
      await client.shutdown();
    }
  }

  private createClient(): Client {
    const authProvider = new this.cassandra.auth.PlainTextAuthProvider('token', process.env['ASTRA_DB_APPLICATION_TOKEN']);
    const cloud =  { secureConnectBundle: "src/app/services/cassandra/credentials/secure-connect-db-app-1.zip" };
    return new this.cassandra.Client({cloud, authProvider});
  }
}
