const sqlite3 = require("sqlite3").verbose();

console.log("Inicializando banco de dados...");

const db = new sqlite3.Database("./concessionaria.db", (err) => {
  if (err) {
    console.error("Erro ao conectar:", err);
    process.exit(1);
  }
  console.log("Conectado ao banco SQLite!");
  criarTabelas();
});

function criarTabelas() {
  db.serialize(() => {
    console.log("Criando tabelas...");
    
    db.run(`CREATE TABLE IF NOT EXISTS veiculos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      marca TEXT NOT NULL,
      modelo TEXT NOT NULL,
      ano INTEGER NOT NULL,
      disponivel INTEGER DEFAULT 1
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS vendedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      setor TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      veiculo_id INTEGER NOT NULL,
      vendedor_id INTEGER NOT NULL,
      data TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS financiamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venda_id INTEGER NOT NULL,
      valor_total REAL NOT NULL,
      parcelas INTEGER NOT NULL,
      valor_parcela REAL NOT NULL,
      taxa_juros REAL NOT NULL,
      banco TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS manutencoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      veiculo_id INTEGER NOT NULL,
      cliente_id INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      data TEXT NOT NULL,
      status TEXT DEFAULT 'Pendente'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS test_drives (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      veiculo_id INTEGER NOT NULL,
      vendedor_id INTEGER NOT NULL,
      data_agendamento TEXT NOT NULL,
      status TEXT DEFAULT 'Agendado',
      observacoes TEXT
    )`, () => {
      console.log("Tabelas criadas com sucesso!");
      console.log("Banco pronto! Execute: node server.js");
      db.close();
    });
  });
}