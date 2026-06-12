export class Pessoa {
  // 1. Atributos privados para garantir o encapsulamento
  private _nome: string;
  private _cpf: string;
  private _telefone: string;
  private _email: string;

  constructor(nome: string, cpf: string, telefone: string, email: string) {
    // 2. CORREÇÃO: Forçando a validação do CPF no momento da criação do objeto
    if (!Pessoa.validarCPF(cpf)) {
      throw new Error(`CPF inválido: ${cpf}. O CPF deve conter exatamente 11 dígitos numéricos.`);
    }

    this._nome = nome;
    this._cpf = cpf;
    this._telefone = telefone;
    this._email = email;
  }

  // Getters e Setters para acesso seguro
  get nome(): string { return this._nome; }
  set nome(nome: string) { this._nome = nome; }

  get cpf(): string { return this._cpf; }
  // Não criamos 'set cpf' porque o CPF geralmente é um identificador único e imutável

  get telefone(): string { return this._telefone; }
  set telefone(telefone: string) { this._telefone = telefone; }

  get email(): string { return this._email; }
  set email(email: string) { this._email = email; }

  // Regra de validação estática limpa e aprimorada
  static validarCPF(cpf: string): boolean {
    if (!cpf) return false;
    // Remove caracteres especiais se houver e garante que tem 11 dígitos
    const apenasNumeros = cpf.replace(/\D/g, "");
    return apenasNumeros.length === 11;
  }
}
