# Como rodar e apresentar

## Abrir

O jeito mais simples é dar duplo clique em `apresentacao.html`. Ele funciona sem internet e sem servidor, desde que fique dentro da pasta, junto com `assets/` e `vendor/`.

No terminal, também dá para abrir com

```bash
xdg-open apresentacao.html
```

Se aparecer a tela "Quase lá!", você abriu o `index.html` direto. Use o `apresentacao.html` ou rode um servidor local.

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

## Apresentar no projetor

1. Abra o `apresentacao.html` no navegador do computador da sala.
2. Aperte `F` para tela cheia.
3. Aperte `S` para abrir a janela do apresentador. Arraste essa janela para a tela do notebook. Ela mostra o slide atual, o próximo, as notas de fala e um relógio.
4. Se quiser um cronômetro de 10 minutos visível para você, aperte `T` quando começar a falar. `R` reinicia a contagem.

Dica: leve a pasta inteira num pendrive. Se o computador da sala bloquear arquivos HTML, exporte o PDF antes (veja abaixo) como plano B.

## Interações durante a fala

- **Slide 3.** Arraste os controles μ e σ. O botão "valores da base" volta para a média e o desvio das notas.
- **Slide 4 e slide 9.** Clique nos botões de ±1, ±2 e ±3 desvios.
- **Slides 6, 7 e 11.** A seta para a direita avança os trechos destacados do código.
- **Slide 10.** Clique nas notas 0, 50, 75, 90 e 100 ou digite qualquer nota no campo.
- **Slide 11.** Ligue as camadas na ordem histograma, curva normal, média e ±1 desvio.

Depois de clicar num botão ou num campo, as setas do teclado continuam funcionando para trocar de slide. Se o campo de nota estiver selecionado, clique fora dele antes de usar as setas.

## Exportar em PDF (plano B)

1. Abra `apresentacao.html?print-pdf` no Chrome (acrescente `?print-pdf` ao fim do endereço).
2. Aperte `Ctrl + P`, escolha "Salvar como PDF", orientação paisagem, margens "Nenhuma" e marque "Gráficos de plano de fundo".

No PDF os gráficos aparecem no estado inicial, sem as interações.

## Problemas comuns

| Problema | Solução |
|---|---|
| Gráficos vazios | Rode `python3 build.py` para gerar o `assets/dados.js`. |
| Mudei o `slides.md` e nada mudou no duplo clique | Rode `python3 build.py` de novo. |
| Fontes diferentes | Confira se a pasta `vendor/fonts` foi copiada junto. |
| Imagens do Python não aparecem | Confira se `assets/histograma_curva_normal.png` e `assets/boxplot.png` existem. |
