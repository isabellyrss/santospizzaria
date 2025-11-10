from tinydb import TinyDB, Query  

ARQUIVO_DB = "banco.json"

db = TinyDB(ARQUIVO_DB)
tabela = db.table("pessoas")  

def ler_inteiro(mensagem):
    """Lê um número inteiro do usuário com tratamento de erro"""
    while True:
        valor = input(mensagem).strip()
        try:
            return int(valor)
        except ValueError:
            print("Entrada inválida. Digite um número inteiro!")

def adicionar_registro():
    print("\n=== Adicionar registro ===")
    id_val = ler_inteiro("ID (número inteiro): ")
    if tabela.contains(Query().id == id_val):
        print("Já existe um registro com esse ID. Tente outro")
        return

    nome = input("Nome: ").strip()
    if not nome:
        print("Digite novamente")
        return

    idade = ler_inteiro("Idade (número inteiro): ")

    tabela.insert({"id": id_val, "nome": nome, "idade": idade})
    print("Registro adicionado com sucesso!!")

def visualizar_registros():
    print("\n=== Registros atuais ===")
    registros = tabela.all()
    if not registros:
        print("Não há registros ainda.")
        return
    print(f"{'ID':<6} {'NOME':<25} {'IDADE':<6}")
    print("-" * 40)
    for doc in registros:
        print(f"{doc.get('id', ''):<6} {doc.get('nome', ''):<25} {doc.get('idade', ''):<6}")

def remover_registro():
    print("\n=== Remover registro ===")
    print("Remover por:\n1) ID\n2) Nome")
    opc = input("Escolha (1 ou 2): ").strip()

    if opc == "1":
        id_val = ler_inteiro("ID a remover: ")
        if not tabela.contains(Query().id == id_val):
            print("Nenhum registro encontrado com esse ID")
            return
        tabela.remove(Query().id == id_val)
        print("Registro removido")
    elif opc == "2":
        nome = input("Nome exato a remover: ").strip()
        if not nome:
            print("Nome não pode ser vazio")
            return
        if not tabela.contains(Query().nome == nome):
            print("Nenhum registro encontrado com esse nome")
            return
        removidos = tabela.remove(Query().nome == nome)
        if removidos:
            print(f"{len(removidos)} registro(s) removido(s)")
        else:
            print("Nada removido")
    else:
        print("Opção inválida.")

def pesquisar_registro():
    print("\n=== Pesquisar por ID ===")
    id_val = ler_inteiro("ID a pesquisar: ")
    resultado = tabela.search(Query().id == id_val)
    if not resultado:
        print("Nenhum registro encontrado com esse ID")
        return
    print(f"{'ID':<6} {'NOME':<25} {'IDADE':<6}")
    print("-" * 40)
    for doc in resultado:
        print(f"{doc.get('id', ''):<6} {doc.get('nome', ''):<25} {doc.get('idade', ''):<6}")

def menu():
    while True:
        print("\n==== MENU ====")
        print("1) Adicionar registro")
        print("2) Visualizar registros")
        print("3) Remover registro")
        print("4) Pesquisar (opcional)")
        print("0) Encerrar programa")
        escolha = input("Escolha uma opção: ").strip()

        if escolha == "1":
            adicionar_registro()
        elif escolha == "2":
            visualizar_registros()
        elif escolha == "3":
            remover_registro()
        elif escolha == "4":
            pesquisar_registro()
        elif escolha == "0":
            print("Encerrando")
            break
        else:
            print("Opção inválida. Tente novamente")

if __name__ == "__main__":
    menu()