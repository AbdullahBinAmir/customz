const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "medusa-fRTB",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}