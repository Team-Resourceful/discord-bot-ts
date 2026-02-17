import { Pool, PoolConfig } from "pg";

export class Database {
    private readonly pool: Pool;

    constructor(config: PoolConfig) {
        this.pool = new Pool(config);
    }

    async query(sql: string, values?: any[]): Promise<any> {
        const result = await this.pool.query(sql, values);
        return result.rows;
    }

    async connect(): Promise<void> {
        // simple health check
        await this.pool.query("SELECT 1");
    }

    getConnection(): Pool {
        return this.pool;
    }
}
