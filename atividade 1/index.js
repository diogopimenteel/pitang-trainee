//Exercicio aula 2
// 1
const nome = "Dennys";
//2
const estaChovendo = false;
//3
const data = new Date("1999", "06", "01");
let dataFormatada =
  data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();

//4
const num = 5;
//Comentado para evitar erro no item 7
//num = 10;
//5
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//6
const aluno = {
  nome: "João",
  dataCadastro: new Date("2022", "02", "01"),
  turma: 2
};
//7
const dados = {
  nomeDados: nome,
  estaChovendoDados: estaChovendo,
  dataDados: dataFormatada,
  numDados: num
};
//console.log(dados);
//8
let var_dez = 10;
var_dez *= 3;
//console.log(var_dez);
//9
const dicionarios = [
  { nome: "Diogo", dataCadastro: new Date("2022", "02", "01") },
  { nome: "Daniel", dataCadastro: new Date("2022", "02", "01") }
];
//console.log(dicionarios);
//10
var numQualquer = 3;
numQualquer = numQualquer * 3;
//console.log(numQualquer);
//Exercicio aula 3

//1
class Automovel {
  constructor(nome, marca, modelo, paisOrigem) {
    this.nome = nome;
    this.marca = marca;
    this.modelo = modelo;
    this.paisOrigem = paisOrigem;
  }
  getAutomovel() {
    return {
      nome: this.nome,
      marca: this.marca,
      modelo: this.modelo,
      paisOrigem: this.paisOrigem
    };
  }
}
//2
const auto1 = new Automovel("Uno", "Fiat", "Fire", "Brasil");
const auto2 = new Automovel("KA", "Ford", "Popular", "Brasil");
const listAutos = [auto1, auto2];
//console.log(listAutos);
//3
for (let auto of listAutos) {
  //console.log("Nome: " + auto.nome + ", Marca: " + auto.marca);
}
//4
for (let automovel of listAutos) {
  for (let key in automovel) {
    //console.log(key, automovel[key]);
  }
}

//Parte 2

//1
const auto_3 = {
  nome: "Sandero",
  marca: "Renault",
  modelo: "Adventure",
  paisOrigem: "França"
};
//2
auto_3["cor"] = "preto";

//3
delete auto_3.paisOrigem;
//console.log(auto_3);
//Exercicio aula 4

//1
class Automovel_Dois {
  constructor(nome, marca, modelo, paisOrigem, tipoCombustivel) {
    this.nomeAutomovel = nome;
    this.marcaAutomovel = marca;
    this.modeloAutomovel = modelo;
    this.paisOrigemAutomovel = paisOrigem;
    this.tipoCombustivelAutomovel = tipoCombustivel;
  }

  getNome() {
    return this.nomeAutomovel;
  }

  getMarca() {
    return this.marcaAutomovel;
  }

  getModelo() {
    return this.modeloAutomovel;
  }

  getPaisOrigem() {
    return this.paisOrigemAutomovel;
  }

  getTipoCombustivel() {
    return this.tipoCombustivelAutomovel;
  }
}
//2
class Carro {
  constructor(velocidadeMax, numeroRodas, temStep, ocupantes) {
    this.velocidadeMax = velocidadeMax;
    this.numeroRodas = numeroRodas;
    this.temStep = temStep;
    this.ocupantes = ocupantes;
  }

  getVelocidadeMax() {
    return this.velocidadeMax;
  }

  getNumeroRodas() {
    return this.numeroRodas;
  }

  temStep() {
    return this.temStep;
  }

  getOcupantes() {
    return this.ocupantes;
  }
}
//3

class Moto {
  constructor(velocidadeMax, numeroRodas, ocupantes) {
    this.velocidadeMax = velocidadeMax;
    this.numeroRodas = numeroRodas;
    this.ocupantes = ocupantes;
  }

  getVelocidadeMax() {
    return this.velocidadeMax;
  }
  getNumeroRodas() {
    return this.numeroRodas;
  }
  getOcupantes() {
    return this.ocupantes;
  }
}
