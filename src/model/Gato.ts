import { Animal } from "./Animal";

export class Gato extends Animal {
  private ehCastrado: boolean;
  private pelagem: string;

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
    super(nome, idade, peso, "gato", "pequeno", nomeDono, telefoneDono, cpfDono);
    this.ehCastrado = ehCastrado;
    this.pelagem = pelagem;
  }
}
