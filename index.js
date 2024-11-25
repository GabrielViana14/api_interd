require('dotenv').config();

console.log('root:', process.env.MYSQL_USER);
console.log('senha@123:', process.env.MYSQL_PASSWORD);
console.log('fornecedoresdb:', process.env.MYSQL_DATABASE);


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); //converte para JSON ou vice versa
require('dotenv').config();

const app = express();
const port = 3000;


// Configuração do MySQL
const connection = mysql.createConnection({
  host: '172.17.0.1',
  user: process.env.MYSQL_USER, // Usa variáveis de ambiente
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());

// Rotas CRUD

// Criar fornecedor
app.post('/fornecedores', (req, res) => {
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
    txtTelFornecedor,
    txtOutrosFornecedor
  } = req.body;

  const INSERT_FORNECEDOR_QUERY = `
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
      txtTelFornecedor, 
      txtOutrosFornecedor
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    INSERT_FORNECEDOR_QUERY,
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
      txtTelFornecedor,
      txtOutrosFornecedor
    ],
    (err, results) => {
      if (err) throw err;
      res.send('Fornecedor criado com sucesso');
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
    txtTelFornecedor,
    txtOutrosFornecedor
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
      txtTelFornecedor = ?, 
      txtOutrosFornecedor = ? 
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
      txtTelFornecedor,
      txtOutrosFornecedor,
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


module.exports = {app,server,connection};