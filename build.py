#!/usr/bin/env python3
"""Prepara a apresentação para abrir com duplo clique.

Este script faz duas coisas.

1. Lê o arquivo dados/StudentsPerformance.csv com csv.DictReader e grava as
   notas de matemática em assets/dados.js. Os gráficos e números dos slides são
   calculados a partir dessas notas, sem nenhum valor digitado à mão.
2. Copia o conteúdo do slides.md para dentro do index.html e gera o
   apresentacao.html, que funciona offline e sem servidor.

Uso:
    python3 build.py

Rode de novo sempre que editar o slides.md ou trocar o CSV.
"""
import csv
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
CSV = RAIZ / "dados" / "StudentsPerformance.csv"
DADOS_JS = RAIZ / "assets" / "dados.js"
COLUNA = "math score"
MARCADOR = '<section data-markdown="slides.md"></section>'


def gerar_dados() -> int:
    notas = []
    with open(CSV, newline="", encoding="utf-8") as arquivo:
        for registro in csv.DictReader(arquivo):
            valor = (registro.get(COLUNA) or "").strip()
            if valor.isdigit() and 0 <= int(valor) <= 100:
                notas.append(int(valor))
    DADOS_JS.write_text(
        "// Gerado pelo build.py a partir de dados/StudentsPerformance.csv. Não edite.\n"
        f"window.NOTAS = {json.dumps(notas)};\n",
        encoding="utf-8",
    )
    return len(notas)


def gerar_html() -> None:
    markdown = (RAIZ / "slides.md").read_text(encoding="utf-8")
    modelo = (RAIZ / "index.html").read_text(encoding="utf-8")

    if MARCADOR not in modelo:
        raise SystemExit(f"Não encontrei {MARCADOR!r} no index.html.")
    if "</textarea>" in markdown:
        raise SystemExit("O slides.md não pode conter a tag </textarea>.")

    embutido = (
        "<section data-markdown>\n<textarea data-template>\n"
        + markdown
        + "\n</textarea>\n</section>"
    )
    (RAIZ / "apresentacao.html").write_text(modelo.replace(MARCADOR, embutido), encoding="utf-8")


def main() -> None:
    n = gerar_dados()
    print(f"{n} notas gravadas em assets/dados.js.")
    gerar_html()
    print("Pronto: apresentacao.html gerado. Abra com duplo clique.")


if __name__ == "__main__":
    main()
