const FilteredExtension = require("./src/entity/FilteredExtension").default;
const SnakeNamingStrategy = require('typeorm-naming-strategies')
    .SnakeNamingStrategy;

module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "yoojin",
    password: "password",
    database: "extension-filter",
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [FilteredExtension]
}