const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Tentando conectar ao banco...');
console.log('Tentando criar tabelas...');

(async () => {
  try {
    await createDatabase(); // Cria o banco de dados
    await createTables();   // Cria as tabelas dentro do banco
    console.log('Servidor pronto para receber requisições.');
  } catch (error) {
    console.error('Erro durante a inicialização:', error);
  }
})();

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: '172.17.0.1', // Nome do host do seu contêiner MySQL
      user: process.env.MYSQL_USER, // Usuário do MySQL
      password: process.env.MYSQL_PASSWORD, // Senha do MySQL
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
    console.log(`Banco de dados "${process.env.MYSQL_DATABASE}" criado com sucesso.`);
    await connection.end(); // Fecha a conexão
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
    throw error;
  }
}

async function createTables() {
  try {
    const connection = await mysql.createConnection({
      host: '172.17.0.1', // Nome do host do seu contêiner MySQL
      user: process.env.MYSQL_USER, // Usuário do MySQL
      password: process.env.MYSQL_PASSWORD, // Senha do MySQL
      database: process.env.MYSQL_DATABASE, // Nome do banco de dados
    });

    await connection.query(`
      CREATE TABLE IF NOT EXISTS fornecedores (
          id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
          NomeFornecedor VARCHAR(255),
          CnpjFornecedor VARCHAR(18),
          IEFornecedor VARCHAR(50),
          EnderecoFornecedor VARCHAR(255),
          CepFornecedor VARCHAR(10),
          NrEndFornecedor VARCHAR(10),
          PaisFornecedor VARCHAR(100),
          EstadoFornecedor VARCHAR(100),
          EmailFornecedor VARCHAR(255),
          TelFornecedor VARCHAR(20),
          OutrosFornecedor VARCHAR(255)
      );
    `);

    console.log('Tabela "fornecedores" criada com sucesso.');
    await connection.end(); // Fecha a conexão
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    throw error;
  }
}
