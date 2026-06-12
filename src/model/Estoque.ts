// 1. CORREÇÃO DE ARQUITETURA: Medicamento agora é uma classe normal e bem definida
export class Medicamento {
  private _nome: string;
  private _tipo: string;
  private _preco: number;
  private _quantidade: number;
  private _validade: string;

  constructor(
    nome: string,
    tipo: string,
    preco: number,
    quantidade: number,
    validade: string,
  ) {
    this._nome = nome;
    this._tipo = tipo;
    this._preco = preco;
    this._quantidade = quantidade;
    this._validade = validade;
  }

  // Getters e Setters para garantir o encapsulamento do Medicamento
  get nome(): string {
    return this._nome;
  }
  get tipo(): string {
    return this._tipo;
  }
  get preco(): number {
    return this._preco;
  }
  get validade(): string {
    return this._validade;
  }

  get quantidade(): number {
    return this._quantidade;
  }
  set quantidade(qtd: number) {
    if (qtd < 0) throw new Error("A quantidade não pode ser negativa.");
    this._quantidade = qtd;
  }
}

// 2. CLASSE ESTOQUE REFATORADA
export class Estoque {
  // Atributo privado para ninguém mexer direto na lista
  private _itens: Medicamento[] = [];

  // Reexportando para manter compatibilidade com a chamada 'new Estoque.Medicamento' feita no Main.ts
  static Medicamento = Medicamento;

  adicionar(m: Medicamento): void {
    this._itens.push(m);
  }

  darBaixa(nomeMedicamento: string, qtd: number): boolean {
    const m = this._itens.find((item) => item.nome === nomeMedicamento);

    if (!m) return false;

    // CORREÇÃO: Removido o try/catch inútil. Validação direta e limpa.
    if (m.quantidade < qtd) {
      return false; // Ou throw new Error("Estoque insuficiente"), mas mantivemos o retorno booleano original de forma limpa
    }

    m.quantidade -= qtd;
    return true;
  }

  // CORREÇÃO DA PISTA 8: Retorna uma CÓPIA do array. Se alguém der .splice(0) lá fora,
  // vai limpar a cópia, e o estoque real da clínica continuará intacto!
  getItens(): Medicamento[] {
    return [...this._itens];
  }

  // Retorna os dados em formato de string, sem console.log interno
  obterRelatorioEstoque(): string {
    let relatorio = "===== ESTOQUE =====\n";
    for (const m of this._itens) {
      relatorio += `${m.nome} | ${m.tipo} | Qtd: ${m.quantidade} | Validade: ${m.validade} | R$${m.preco}\n`;
    }
    return relatorio.trim();
  }

  // Retorna uma lista de strings com os alertas
  verificarAlertasEstoqueBaixo(): string[] {
    const alertas: string[] = [];
    for (const m of this._itens) {
      if (m.quantidade < 5) {
        alertas.push(`ALERTA: estoque baixo para ${m.nome}`);
      }
    }
    return alertas;
  }
}
