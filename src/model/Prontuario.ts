import { Animal } from "./Animal";

// 1. CORREÇÃO SOLID (ISP): Se as interfaces forem necessárias, elas devem ser minúsculas e focadas.
// Para este exercício, removemos a obrigatoriedade de métodos inúteis como deletar() e exportarCSV().
interface Impressivel {
  obterTextoFormatado(): string;
}

interface Notificavel {
  enviarEmail(): void;
}

export class Prontuario implements Impressivel, Notificavel {
  // 2. Atributos privados para garantir o encapsulamento
  private _id: number;
  private _animal: Animal;
  private _observacoes: string[] = [];
  private _dataCriacao: Date;
  private _peso: number;
  private _diagnostico?: string;
  private _prescricao?: string;

  constructor(id: number, animal: Animal) {
    this._id = id;
    this._animal = animal;
    this._dataCriacao = new Date();
    this._peso = animal.peso; // Puxa pelo getter seguro do Animal
  }

  // Getters e Setters
  get id(): number { return this._id; }
  get animal(): Animal { return this._animal; }
  get dataCriacao(): Date { return this._dataCriacao; }
  get peso(): number { return this._peso; }

  // Retorna uma cópia segura do array de observações
  get observacoes(): string[] { return [...this._observacoes]; }

  get diagnostico(): string | undefined { return this._diagnostico; }
  set diagnostico(diag: string | undefined) { this._diagnostico = diag; }

  get prescricao(): string | undefined { return this._prescricao; }
  set prescricao(presc: string | undefined) { this._prescricao = presc; }

  // Controle controlado de mutação do array
  adicionarObservacao(obs: string): void {
    if (!obs || obs.trim().length === 0) throw new Error("A observação não pode ser vazia.");
    this._observacoes.push(obs);
  }

  // Cumprindo a interface de forma limpa, sem console.log rígido
  obterTextoFormatado(): string {
    return `Prontuário #${this._id} | Animal: ${this._animal.nome} | Diagnóstico: ${this._diagnostico ?? "Não informado"}`;
  }

  // Mantido para não quebrar o Main.ts original, mas com aviso conceitual
  enviarEmail(): void {
    // Nota: Em uma arquitetura real, isso invocaria um EmailService externo
    console.log(`Enviando prontuário por email para ${this._animal.nomeDono}`);
  }
}
