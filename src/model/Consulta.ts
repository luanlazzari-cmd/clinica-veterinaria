import { Animal } from "./Animal";

// Definindo tipos estritos para evitar strings mágicas
type StatusConsulta = "agendada" | "cancelada" | "concluida";
type FormaPagamento = "pix" | "cartao" | "dinheiro";

export class Consulta {
  // 1. Atributos privados para garantir o encapsulamento
  private _id: number;
  private _animal: Animal;
  private _veterinario: string;
  private _dataHora: Date;
  private _status: StatusConsulta;
  private _motivoCancelamento?: string;
  private _valorConsulta: number;
  private _formaPagamento?: FormaPagamento;
  private _pago: boolean;

  constructor(
    id: number,
    animal: Animal,
    veterinario: string,
    dataHora: Date,
    valorConsulta: number
  ) {
    // 2. CORREÇÃO DE EXCEÇÃO: Se os dados forem inválidos, o erro DEVE interromper a criação do objeto
    if (!animal) throw new Error("O animal não pode ser nulo ou indefinido.");
    if (valorConsulta < 0) throw new Error("O valor da consulta não pode ser negativo.");
    if (!veterinario || veterinario.trim().length === 0) {
      throw new Error("O nome do veterinário deve ser preenchido.");
    }

    this._id = id;
    this._animal = animal;
    this._veterinario = veterinario;
    this._dataHora = dataHora;
    this._valorConsulta = valorConsulta;
    this._status = "agendada";
    this._pago = false;
  }

  // Getters e Setters seguros
  get id(): number { return this._id; }
  get animal(): Animal { return this._animal; }
  get veterinario(): string { return this._veterinario; }
  
  get dataHora(): Date { return this._dataHora; }
  set dataHora(data: Date) { this._dataHora = data; }

  get status(): StatusConsulta { return this._status; }
  get motivoCancelamento(): string | undefined { return this._motivoCancelamento; }
  get valorConsulta(): number { return this._valorConsulta; }
  get formaPagamento(): FormaPagamento | undefined { return this._formaPagamento; }
  get pago(): boolean { return this._pago; }

  // 3. Método de pagamento utilizando tipagem estrita
  registrarPagamento(forma: string): void {
    const formaNormalizada = forma.toLowerCase();

    if (
      formaNormalizada === "pix" ||
      formaNormalizada === "cartao" ||
      formaNormalizada === "dinheiro"
    ) {
      this._formaPagamento = formaNormalizada as FormaPagamento;
      this._pago = true;
    } else {
      throw new Error("Forma de pagamento inválida: " + forma);
    }
  }

  cancelar(motivo: string): void {
    if (!motivo || motivo.trim().length === 0) {
      throw new Error("É necessário informar um motivo para o cancelamento.");
    }
    this._status = "cancelada";
    this._motivoCancelamento = motivo;
  }

  // 4. Substituição do console.log por retorno de texto formatado
  obterResumoFormatado(): string {
    return `[Consulta #${this._id}] ${this._animal.nome} | Vet: ${this._veterinario} | Status: ${this._status} | Valor: R$${this._valorConsulta} | Pago: ${this._pago ? "Sim" : "Não"}`;
  }
}
