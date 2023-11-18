import { DataSource, DataSourceOptions } from "typeorm";

const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'expressdb',
    schema: 'public',
    synchronize: true,
    entities: ['src/database/entities/*.ts'],
	migrations: ['src/database/migrations/*.ts']
}

export const AppDataSource = new DataSource(DataSourceConfig);