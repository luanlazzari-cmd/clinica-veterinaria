import { Animal } from "../model/Animal";
import { Consulta } from "../model/Consulta";
import { Veterinario } from "../model/Veterinario";

export class ClinicaService {
  // 1. Atributos privados para garantir o encapsulamento das listas
  private _animais: Animal[] = [];
  private _consultas: Consulta[] = [];
  private _veterinarios: Veterinario[] = [];
  private _proximoIdConsulta: number = 1;

  // 2. Métodos de controle de acesso (Getters que retornam cópias para segurança)
  // Evita que códigos externos limpem o array original usando splice, por exemplo (Pista 8)
  get animais(): Animal[] { return [...this._animais]; }
  get consultas(): Consulta[] { return [...this._consultas]; }
  get veterinarians(): Veterinario[] { return [...this._veterinarios]; }

  // 3. Métodos explícitos de cadastro que o Main.ts precisa usar
  cadastrarAnimal(animal: Animal): void {
    this._animais.push(animal);
  }

  cadastrarVeterinario(vet: Veterinario): void {
    this._veterinarios.push(vet);
  }

  // -----------------------------------------------------------------------
  // AGENDAMENTO
  // -----------------------------------------------------------------------

  agendarConsulta(nomeAnimal: string, nomeVeterinario: string, dataHora: Date): Consulta {
    // Buscas utilizando os getters privados internos
    const animal = this._animais.find(a => a.nome === nomeAnimal);
    const vet = this._veterinarios.find(v => v.nome === nomeVeterinario);

    if (animal === undefined) {
      throw new Error("Animal não encontrado: " + nomeAnimal);
    }

    if (vet === undefined) {
      throw new Error("Veterinário não encontrado: " + nomeVeterinario);
    }

    // Nota: Como Veterinario.ts ainda não foi refatorado, mantivemos o acesso direto.
    // Se 'disponivel' virar privado com getter, mude para vet.disponivel aqui.
    if (!vet.disponivel) {
      throw new Error("Veterinário indisponível");
    }

    // Ajustado o construtor da consulta passando o nome do veterinário como string (ou objeto se for o caso)
    const c = new Consulta(
      this._proximoIdConsulta++,
      animal,
      nomeVeterinario,
      dataHora,
      150.0
    );
    this._consultas.push(c);

    return c;
  }

  // -----------------------------------------------------------------------
  // CANCELAMENTO
  // -----------------------------------------------------------------------

  cancelarConsulta(id: number, motivo: string): void {
    const consulta = this._consultas.find(c => c.id === id);

    if (consulta) {
      consulta.cancelar(motivo);
      // Nota: Acessando via getter seguro do animal
      console.log(
        `SMS enviado para ${consulta.animal.nomeDono}: sua consulta foi cancelada. Motivo: ${motivo}`
      );
    } else {
      console.log(`Erro ao cancelar: Consulta com ID ${id} não encontrada.`);
    }
  }

  // -----------------------------------------------------------------------
  // RELATÓRIOS
  // -----------------------------------------------------------------------

  gerarRelatorioConsultas(): void {
    console.log("===== RELATÓRIO DE CONSULTAS =====");
    let total = 0;
    let receita = 0;

    for (const c of this._consultas) {
      // Se Consulta.ts ainda tiver o método de impressão, ele roda. 
      // Se for refatorado, mudaremos para c.obterResumoFormatado()
      if (typeof (c as any).imprimirResumo === 'function') {
        (c as any).imprimirResumo();
      }
      if (c.pago) receita += c.valorConsulta;
      total++;
    }

    console.log("Total: " + total + " | Receita: R$" + receita);
  }

  gerarRelatorioAnimais(): void {
    console.log("===== ANIMAIS CADASTRADOS =====");
    for (const a of this._animais) {
      // CORREÇÃO: Usando o método limpo de retorno de texto que criamos na classe Animal
      console.log(a.obterFichaFormatada());
    }
  }

  // -----------------------------------------------------------------------
  // DESCONTO
  // -----------------------------------------------------------------------

  calcularDesconto(c: Consulta): number {
    // CORREÇÃO: Acessando via getter seguro (.especie) em vez de propriedade pública direta
    if (c.animal.especie === "cachorro" && c.valorConsulta > 200) {
      return c.valorConsulta * 0.1;
    }
    if (c.animal.especie === "gato") {
      return c.valorConsulta * 0.05;
    }

    return 0;
  }

  // -----------------------------------------------------------------------
  // BUSCA
  // -----------------------------------------------------------------------

  buscarAnimal(nome: string): Animal | undefined {
    return this._animais.find(a => a.nome === nome);
  }

  buscarVeterinario(nome: string): Veterinario | undefined {
    return this._veterinarios.find(v => v.nome === nome);
  }
}
