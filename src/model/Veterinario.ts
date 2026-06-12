import { Pessoa } from "./Pessoa";
import { Consulta } from "./Consulta";

// Definindo tipos estritos para remover as strings mágicas (Pista 2)
type EspecialidadeVet = "clinico" | "cirurgiao";
type TipoConsulta = "rotina" | "emergencia";

export class Veterinario extends Pessoa {
  // 1. Atributos privados para garantir o encapsulamento
  private _crmv: string;
  private _especialidade: EspecialidadeVet;
  private _historicoConsultas: Consulta[] = [];
  private _disponivel: boolean = true;

  constructor(
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    crmv: string,
    especialidade: string // Mantemos string no parâmetro para aceitar a entrada do Main.ts
  ) {
    super(nome, cpf, telefone, email);
    this._crmv = crmv;
    // Força o cast seguro para o tipo estrito
    this._especialidade = especialidade as EspecialidadeVet;
  }

  // Getters e Setters seguros
  get crmv(): string { return this._crmv; }
  get especialidade(): EspecialidadeVet { return this._especialidade; }
  
  get disponivel(): boolean { return this._disponivel; }
  set disponivel(status: boolean) { this._disponivel = status; }

  // Retorna cópia segura para evitar manipulação externa do histórico (Pista 8)
  get historicoConsultas(): Consulta[] { return [...this._historicoConsultas]; }

  // 2. Método de negócio protegido por tipos estritos do TypeScript
  calcularValorConsulta(tipoConsulta: TipoConsulta): number {
    if (this._especialidade === "clinico") {
      if (tipoConsulta === "rotina") return 150.0;
      if (tipoConsulta === "emergencia") return 300.0;
    } else if (this._especialidade === "cirurgiao") {
      if (tipoConsulta === "rotina") return 250.0;
      if (tipoConsulta === "emergencia") return 500.0;
    }

    return 0.0;
  }

  // 3. CORREÇÃO DE ACOPLAMENTO: O veterinário avisa a consulta para se finalizar, 
  // respeitando o comportamento e o encapsulamento dela!
  finalizarConsulta(c: Consulta): void {
    // Nota: Como mudamos o status da Consulta para privado, você precisará adicionar 
    // um método c.finalizar() dentro de Consulta.ts se o fluxo exigir essa alteração.
    if (typeof (c as any).finalizar === 'function') {
      (c as any).finalizar();
    } else {
      // Caso não queira alterar Consulta.ts agora, o ajuste evita a escrita direta em atributo privado
      throw new Error("O método de finalização precisa estar contido na classe Consulta.");
    }
    
    this._historicoConsultas.push(c);
    this._disponivel = true;
  }
}
