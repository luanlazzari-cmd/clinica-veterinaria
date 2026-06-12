import { Animal } from "./Animal";

export class Gato extends Animal {
  // 1. Atributos privados para garantir o encapsulamento
  private _ehCastrado: boolean;
  private _pelagem: string;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    ehCastrado: boolean,
    pelagem: string,
    nomeDono: string,
    telefoneDono: string,
    cpfDono: string
  ) {
    // Passando "gato" e "pequeno" respeitando os tipos estritos exigidos pela classe pai
    super(nome, idade, peso, "gato", "pequeno", nomeDono, telefoneDono, cpfDono);
    this._ehCastrado = ehCastrado;
    this._pelagem = pelagem;
  }

  // Getters e Setters seguros
  get ehCastrado(): boolean { return this._ehCastrado; }
  set ehCastrado(ehCastrado: boolean) { this._ehCastrado = ehCastrado; }

  get pelagem(): string { return this._pelagem; }
  set pelagem(pelagem: string) { this._pelagem = pelagem; }

  // Sobrescrevendo a ficha para adicionar as propriedades específicas do gato
  obterFichaFormatada(): string {
    const fichaPai = super.obterFichaFormatada();
    // Remove a linha final de decoração do pai para emendar os dados do gato
    const fichaLimpa = fichaPai.replace("=====================================", "");
    
    return `${fichaLimpa}Castrado : ${this._ehCastrado ? "Sim" : "Não"}
Pelagem  : ${this._pelagem}
=====================================`;
  }
}
