const FilteredExtension = require("./src/entity/FilteredExtension").default;
const SnakeNamingStrategy = require('typeorm-naming-strategies')
    .SnakeNamingStrategy;

module.exports = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [FilteredExtension]
}