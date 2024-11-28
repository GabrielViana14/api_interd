require('dotenv').config();

console.log('root:', process.env.MYSQL_USER);
console.log('senha@123:', process.env.MYSQL_PASSWORD);
console.log('fornecedoresdb:', process.env.MYSQL_DATABASE);

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // converte para JSON ou vice-versa


const app = express();
const port = 3000;


// Configuração do MySQL
const connection = mysql.createConnection({
  host: '172.17.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});


// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`, (err) => {
  if (err) throw err;
  console.log(`Banco de dados '${process.env.MYSQL_DATABASE}' criado/verificado.`);
});

const CREATE_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS fornecedores (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    NomeFornecedor VARCHAR(255) NOT NULL,
    CnpjFornecedor VARCHAR(18) NOT NULL,
    IEFornecedor VARCHAR(18) NOT NULL,
    EnderecoFornecedor VARCHAR(255) NOT NULL,
    CepFornecedor VARCHAR(9) NOT NULL,
    NrEndFornecedor VARCHAR(10) NOT NULL,
    PaisFornecedor VARCHAR(100) NOT NULL,
    EstadoFornecedor VARCHAR(100) NOT NULL,
    EmailFornecedor VARCHAR(100) NOT NULL,
    TelFornecedor VARCHAR(15) NOT NULL,
    OutrosFornecedor VARCHAR (255) NOT NULL
  );
`;


connection.query(CREATE_TABLE_QUERY, (err) => {
  if (err) throw err;
  console.log("Tabela 'fornecedores' criada/verificada.");
});


// Rotas CRUD (exemplo: criar fornecedor)
app.post('/fornecedores', (req, res) => {
  console.log('Dados recebidos:', req.body); // Verifique o que está chegando da requisição
  const {
    NomeFornecedor,
    CnpjFornecedor,
    IEFornecedor,
    EnderecoFornecedor,
    CepFornecedor,
    NrEndFornecedor,
    PaisFornecedor,
    EstadoFornecedor,
    EmailFornecedor,
    TelFornecedor,
    OutrosFornecedor,
  } = req.body;

  const query = `
    INSERT INTO fornecedores (
      NomeFornecedor, 
      CnpjFornecedor, 
      IEFornecedor, 
      EnderecoFornecedor, 
      CepFornecedor, 
      NrEndFornecedor, 
      PaisFornecedor, 
      EstadoFornecedor, 
      EmailFornecedor, 
      TelFornecedor, 
      OutrosFornecedor
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      NomeFornecedor,
      CnpjFornecedor,
      IEFornecedor,
      EnderecoFornecedor,
      CepFornecedor,
      NrEndFornecedor,
      PaisFornecedor,
      EstadoFornecedor,
      EmailFornecedor,
      TelFornecedor,
      OutrosFornecedor,
    ],
    (err, results) => {
      if (err) {
        console.error('Erro ao criar fornecedor:', err);
        res.status(500).send('Erro ao criar fornecedor');
      } else {
        res.status(201).send('Fornecedor criado com sucesso');
      }
    }
  );
});

// Obter todos os fornecedores
app.get('/fornecedores', (req, res) => {
  connection.query('SELECT * FROM fornecedores', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Obter um fornecedor por ID
app.get('/fornecedores/:id', (req, res) => {
  const fornecedorId = req.params.id;
  const SELECT_FORNECEDOR_QUERY = `SELECT * FROM fornecedores WHERE id_fornecedor = ?`;
  connection.query(SELECT_FORNECEDOR_QUERY, [fornecedorId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Atualizar fornecedor já existente
app.put('/fornecedores/:id', (req, res) => {
  const fornecedorId = req.params.id;
  const {
    NomeFornecedor,
    CnpjFornecedor,
    IEFornecedor,
    EnderecoFornecedor,
    CepFornecedor,
    NrEndFornecedor,
    PaisFornecedor,
    EstadoFornecedor,
    EmailFornecedor,
    TelFornecedor,
    OutrosFornecedor
  } = req.body;

  const UPDATE_FORNECEDOR_QUERY = `
    UPDATE fornecedores 
    SET 
      NomeFornecedor = ?, 
      CnpjFornecedor = ?, 
      IEFornecedor = ?, 
      EnderecoFornecedor = ?, 
      CepFornecedor = ?, 
      NrEndFornecedor = ?, 
      PaisFornecedor = ?, 
      EstadoFornecedor = ?, 
      EmailFornecedor = ?, 
      TelFornecedor = ?, 
      OutrosFornecedor = ? 
    WHERE id_fornecedor = ?`;

  connection.query(
    UPDATE_FORNECEDOR_QUERY,
    [
      NomeFornecedor,
      CnpjFornecedor,
      IEFornecedor,
      EnderecoFornecedor,
      CepFornecedor,
      NrEndFornecedor,
      PaisFornecedor,
      EstadoFornecedor,
      EmailFornecedor,
      TelFornecedor,
      OutrosFornecedor,
      fornecedorId
    ],
    (err, results) => {
      if (err) throw err;
      res.send('Fornecedor atualizado com sucesso');
    }
  );
});

// Deletar fornecedor
app.delete('/fornecedores/:id', (req, res) => {
  const fornecedorId = req.params.id;
  const DELETE_FORNECEDOR_QUERY = `DELETE FROM fornecedores WHERE id_fornecedor = ?`;
  connection.query(DELETE_FORNECEDOR_QUERY, [fornecedorId], (err, results) => {
    if (err) throw err;
    res.send('Fornecedor deletado com sucesso');
  });
});

// Iniciar o servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exportar variáveis
module.exports = { app, server, connection };