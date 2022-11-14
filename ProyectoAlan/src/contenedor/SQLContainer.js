class SQLContainer {
  // esta clase recibe el knex ya con sus options (esto está en el DAO/index.js, y el nombre de la tabla)
  constructor(knex, tableName) {
    this.knex = knex;
    this.table = tableName;
  }

  async getAll() {
    try {
      const response = await this.knex.select("*").from(this.table);
      return response;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const response = await this.knex.insert(element).into(this.table);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { SQLContainer };