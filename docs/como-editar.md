# Como editar

## Texto dos slides

Todo o conteúdo está em `slides.md`.

- Cada slide é separado por uma linha com `---`.
- A primeira linha de cada slide define o fundo, por exemplo `<!-- .slide: class="claro" data-background-color="#FFFFFF" -->`. Use `class="claro"` com `#FFFFFF` (todos os slides têm fundo branco).
- As notas de fala ficam depois da linha `Note:`, no fim de cada slide.
- Dentro de blocos HTML (`<div>`), **não deixe linhas em branco**, porque o Markdown encerra o bloco nelas. A exceção é a linha em branco antes de um `<pre>`, que é necessária.
- No código dentro de `<pre>`, escreva `&lt;` no lugar de `<` e `&gt;` no lugar de `>`.

Depois de editar, rode `python3 build.py` para atualizar o `apresentacao.html`.

## Números calculados

Qualquer elemento com `data-calc` recebe um valor calculado das notas.

```html
<span data-calc="media" data-casas="2">66,09</span>
```

O texto dentro da tag é só um valor provisório. Chaves disponíveis

| Chave | Valor |
|---|---|
| `n`, `min`, `max`, `amp` | quantidade, menor nota, maior nota e amplitude |
| `media`, `mediana`, `moda`, `freqModa` | medidas de centro |
| `variancia`, `s`, `g` | variância, desvio-padrão e assimetria |
| `r1q`, `r1p`, `r1inf`, `r1sup`, `r1dif` | regra empírica para 1 desvio (troque 1 por 2 ou 3) |
| `zmin`, `zmax`, `z50`, `z75`, `z90` | escores z |
| `natip`, `atipicos` | quantidade e lista das notas com \|z\| > 3 |

`data-casas` define as casas decimais e `data-sinal` mostra o sinal de + em valores positivos.

## Passos do código

Os blocos de código usam o plugin highlight do reveal.js. O atributo `data-line-numbers` define quais linhas ficam em destaque a cada clique, separadas por `|`.

```html
<pre><code class="language-python" data-trim data-line-numbers="1-2|3-4|5-7">
...
</code></pre>
```

## Cores

O visual segue a arte de rua: fundo branco com roxo `#3C1642` e verde-limão `#AFFC41` em destaque. As cores, as manchas de spray (`assets/spray-lima.svg` e `assets/spray-roxo.svg`) e as fontes de grafite (Sedgwick Ave Display nos títulos e Permanent Marker nos detalhes, em `vendor/fonts`) ficam no início de `assets/tema.css`. Nos gráficos, as barras são lima com contorno roxo, a curva é roxa, a média `#086375`, o desvio-padrão `#0E9F84` e os valores atípicos `#E4572E`. Se mudar alguma cor dos gráficos, troque também no objeto `COR` do `assets/graficos.js`. Os trechos de código usam fundo `#1A0820` com cores de alto contraste.

## Trocar os dados ou as imagens

- Para usar outro CSV com a mesma coluna, substitua `dados/StudentsPerformance.csv` e rode `python3 build.py`.
- Se rodar o `analise_distribuicao_normal.py` de novo, copie o `histograma_curva_normal.png` e o `boxplot.png` novos para `assets/`.

## Animações

Os slides deslizam para o lado ao avançar (`transition: "slide"` no `index.html`). Ao entrar em cada slide, a etiqueta se desenrola como fita, o título aparece como spray saindo de foco, os cartões, painéis e códigos caem como adesivos, um depois do outro, e as manchas de tinta escorrem. As regras ficam no fim de `assets/tema.css`, na seção "Animações de entrada". Elas são desligadas na impressão em PDF e quando o sistema pede menos movimento.
