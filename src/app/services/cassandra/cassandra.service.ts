import { Injectable } from '@angular/core';
import { Client, types } from "cassandra-driver";
import ResultSet = types.ResultSet;

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
    const authProvider = new this.cassandra.auth.PlainTextAuthProvider('token', process.env['ASTRA_DB_APPLICATION_TOKEN_1']);
    const cloud =  { secureConnectBundle: "src/app/services/cassandra/credentials/secure-connect-db-app-1.zip" };
    return new this.cassandra.Client({cloud, authProvider});
  }

  async createKeyspace(name: string): Promise<ResultSet> {
    const cqlQuery = `CREATE KEYSPACE ${name}
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`
    const res = await this.execute(cqlQuery);

    try {
      return res;
    } catch (error) {
      throw error;
    }
  }

  async createTable(keyspaceName: string, tableName: string): Promise<ResultSet> {
    const cqlQuery = `CREATE TABLE ${keyspaceName}.${tableName} (
        category text,
        points int,
        id UUID,
        lastname text,
        PRIMARY KEY (category, points))`;
    const res = await this.execute(cqlQuery);

    try {
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getTableNamesFromKeyspace(keyspaceName: string): Promise<ResultSet> {
    const query = "SELECT * FROM system_schema.tables WHERE keyspace_name = ?";
    const res = await this.execute(query, [keyspaceName]);

    try {
      return res;
    } catch (error) {
      throw error;
    }
  }


  async getColumnsForTable(keyspaceName: string, tableName: string): Promise<string[]> {
    const client = this.createClient();

    try {
      await client.connect();
      const tableMetadata = await client.metadata.getTable(keyspaceName, tableName);

      if (!tableMetadata) {
        throw new Error(`Table ${tableName} does not exist in keyspace ${keyspaceName}`);
      }

      return tableMetadata.columns.map(column => column.name);
    } finally {
      await client.shutdown();
    }
  }


  async execute(cql: string, params: any[] = []): Promise<ResultSet> {
    const client = this.createClient();
    return client.execute(cql, params, { prepare: true });
  }
}
