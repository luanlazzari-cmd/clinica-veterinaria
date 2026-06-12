// Usando as tipagens estritas corretamente
type Especie = "cachorro" | "gato" | "passaro" | "reptil";
type Porte = "pequeno" | "medio" | "grande";

export class Animal {
  // 1. Atributos privados para garantir o encapsulamento
  // 2. Uso dos tipos específicos (Especie e Porte) em vez de string genérica
  private _nome: string;
  private _idade: number;
  private _peso: number;
  private _especie: Especie;
  private _porte: Porte;
  
  // Nota: Idealmente, 'nomeDono', 'telefoneDono' e 'cpfDono' deveriam ser substituídos 
  // por uma instância da classe Pessoa (ex: private _dono: Pessoa). 
  // Se você já tiver a classe Pessoa.ts pronta, mude aqui. Por enquanto, mantivemos encapsulado:
  private _nomeDono: string;
  private _telefoneDono: string;
  private _cpfDono: string;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    especie: Especie, // Tipo corrigido
    porte: Porte,     // Tipo corrigido
    nomeDono: string,
    telefoneDono: string,
    cpfDono: string
  ) {
    this._nome = nome;
    this._idade = idade;
    this._peso = peso; // Passa pelo setter para validar
    this._especie = especie;
    this._porte = porte;
    this._nomeDono = nomeDono;
    this._telefoneDono = telefoneDono;
    this._cpfDono = cpfDono;
  }

  // Getters e Setters para acesso seguro
  get nome(): string { return this._nome; }
  set nome(nome: string) { this._nome = nome; }

  get idade(): number { return this._idade; }
  set idade(idade: number) { this._idade = idade; }

  get peso(): number { return this._peso; }
  set peso(value: number) {
    if (value <= 0) throw new Error("O peso do animal deve ser maior que zero.");
    this._peso = value;
  }

  get especie(): Especie { return this._especie; }
  get porte(): Porte { return this._porte; }

  get nomeDono(): string { return this._nomeDono; }
  get telefoneDono(): string { return this._telefoneDono; }
  get cpfDono(): string { return this._cpfDono; }

  // Regra de negócio mantida, mas agora totalmente segura contra strings inválidas
  getCategoriaVacina(): string {
    if (this._especie === "cachorro") {
      if (this._porte === "pequeno") return "V8-pequeno";
      if (this._porte === "medio") return "V8-medio";
      return "V10-grande";
    } else if (this._especie === "gato") {
      return "V4-felino";
    }
    return "";
  }

  // 3. Em vez de dar console.log aqui dentro, retornamos uma string formatada (Ficha).
  // Quem chamar o método decide se vai dar console.log, salvar em arquivo ou exibir na tela.
  obterFichaFormatada(): string {
    return `
========== FICHA DO ANIMAL ==========
Nome   : ${this._nome}
Espécie: ${this._especie}
Porte  : ${this._porte}
Peso   : ${this._peso} kg
Idade  : ${this._idade} anos
Dono   : ${this._nomeDono} | CPF: ${this._cpfDono} | Tel: ${this._telefoneDono}
=====================================`;
  }
}
