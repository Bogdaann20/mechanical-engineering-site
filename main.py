def calculeaza_media(lista):
    return sum(lista) / len(lista)

def afiseaza_lista(lista):
    print("Numerele introduse sunt: ")
    for nr in lista:
        print("-", nr)

numere = []

while True:
    valoare = input("Intordu un numar (sau screi 'stop' pentru a termina): ")
    if valoare.lower() == "stop":
        break

    numere.append(float(valoare))

afiseaza_lista(numere)

media = calculeaza_media(numere)
maxim = max(numere)
minim = min(numere)

print("\nStatistici: ")
print("Media numerelor este: ", media)
print("Numarul maxim este: ", maxim)
print("Numarul minim este: ", minim)