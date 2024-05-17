import { Injectable } from '@angular/core';
import { DatabaseInfo } from "@datastax/astra-db-ts";
const { DataAPIClient } = require('@datastax/astra-db-ts');

@Injectable({
  providedIn: 'root'
})
export class AstraDatabaseService {
  constructor() {}

  async connect(): Promise<DatabaseInfo> {
    const client = new DataAPIClient('AstraCS:gwUPAQWUYwZqAXeKNpXgPkAQ:04645b5637c4ae509a1b7ba755ccb2f57bed70106924d3ef936e56e4c73cf7e0');
    const db2 = client.db('c0652eb7-52d3-4ed7-870c-d2baab5a68eb', 'us-east1');

    try {
      return await db2.info();
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }
}
