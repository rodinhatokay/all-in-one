import { DataSource } from "typeorm";

import config from './src/config/app.config';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const connectionSource = new DataSource({
	...config().database,
  } as PostgresConnectionOptions);
  

