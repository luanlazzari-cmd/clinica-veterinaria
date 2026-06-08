# Clínica Veterinária — Repositório Legado

## Contexto

Este sistema simula o software de uma clínica veterinária desenvolvido por um programador que aprendeu TypeScript de forma autodidata, sem estudar os princípios de orientação a objetos.

O código **funciona**, compila e executa. Contudo está **repleto** de decisões ruins de design.

Seu trabalho é encontrá-las, corrigi-las e **defender cada correção**.

## Como trabalhar

1. **Clone** este repositório
2. **Instale dependências:** `npm install`
3. **Compile:** `npm run build`
4. **Leia** o código com calma antes de mexer em qualquer coisa
5. Para cada problema identificado:
   - Crie uma **branch** com nome descritivo  
     Ex: `fix/encapsulamento-xyz`, `fix/enum-status-xyz`
   - Realize os ajustes com **commits atômicos e mensagens claras**
   - Abra uma **Pull Request** respondendo:
     - O que estava errado?
     - Por que está errado? (cite o conceito OO)
     - O que você fez para corrigir?
     - Que outros problemas a correção pode revelar ou resolver?

## Estrutura do projeto

```
src/
├── Main.ts
├── model/
│   ├── Pessoa.ts
│   ├── Animal.ts
│   ├── Cachorro.ts
│   ├── Gato.ts
│   ├── Consulta.ts
│   ├── Veterinario.ts
│   ├── Prontuario.ts
│   └── Estoque.ts
└── service/
    └── ClinicaService.ts
```

## O que olhar (pistas)

- Algum atributo deveria ser inacessível diretamente de fora da classe?
- Strings estão sendo usadas para representar conjuntos de valores conhecidos?
- As subclasses (`Cachorro`, `Gato`) realmente precisam existir como hierarquia?
- Existe alguma classe que faz coisas demais?
- Alguma interface obriga implementar métodos que não fazem sentido?
- Como as exceções estão sendo usadas — e onde isso é um problema?
- Existe lógica de exibição dentro de modelos de domínio?
- A array retornada por `getItens()` é segura de usar?

## Versão TypeScript/Node

Node 18+ e TypeScript 6+

```bash
# Instalar dependências
npm install

# Compilar
npm run build

# Executar
npm start

# Compilar e executar em um comando
npm run dev
```
