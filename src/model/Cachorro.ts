import { Animal } from "./Animal";

// Importando os tipos estritos necessários da classe Pai
type Porte = "pequeno" | "medio" | "grande";

export class Cachorro extends Animal {
  // 1. Atributos privados para garantir o encapsulamento
  private _raca: string;
  private _vacinado: boolean;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    porte: Porte, // Corrigido para usar o tipo restrito
    raca: string,
    vacinado: boolean,
    nomeDono: string,
    telefoneDono: string,
    cpfDono: string
  ) {
    // Passando "cachorro" como o tipo Especie estrito exigido pelo construtor de Animal
    super(nome, idade, peso, "cachorro", porte, nomeDono, telefoneDono, cpfDono);
    this._raca = raca;
    this._vacinado = vacinado;
  }

  // Getters e Setters seguros
  get raca(): string { return this._raca; }
  set raca(raca: string) { this._raca = raca; }

  get vacinado(): boolean { return this._vacinado; }
  set vacinado(vacinado: boolean) { this._vacinado = vacinado; }

  // Regra de negócio estendida com segurança
  override getCategoriaVacina(): string {
    return super.getCategoriaVacina() + (this._vacinado ? "-reforco" : "-primaria");
  }

  // Substituindo a impressão direta por retorno de texto formatado
  obterFichaFormatada(): string {
    const fichaPai = super.obterFichaFormatada();
    // Remove a linha final de decoração do pai para emendar os dados do cachorro
    const fichaLimpa = fichaPai.replace("=====================================", "");
    
    return `${fichaLimpa}Raça   : ${this._raca}
Vacina : ${this._vacinado ? "Em dia" : "Pendente"}
=====================================`;
  }
}
