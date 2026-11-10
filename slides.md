<!-- .slide: class="claro capa" data-background-color="#FFFFFF" -->

<div class="fundo-curva"><canvas class="fundo-sino" width="1920" height="1080" aria-hidden="true"></canvas></div>

<p class="eyebrow">Probabilidade e Estatística Aplicada · IFSP Itapetininga</p>

<h1 class="titulo-capa">Distribuição Normal <span class="azul">e Curva de Gauss</span></h1>

<p class="subtitulo">As notas de matemática de 1.000 estudantes seguem uma Curva de Gauss? Um programa em Python para descobrir</p>

<p class="rodape">Mariana Alice Pires Leite (3043151)<br>Prof. Dr. Wilton Moreira Ferraz Junior</p>

Note:
(20 segundos) Bom dia ou boa noite, professor e turma. Meu nome é Mariana e o meu trabalho é sobre distribuição normal, a Curva de Gauss. A pergunta que eu quis responder é se as notas de matemática de mil estudantes se comportam como uma Curva de Gauss, e para isso eu desenvolvi um programa em Python que faz toda a análise a partir dos dados brutos.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<p class="eyebrow">O que a atividade pede</p>

## Ler os dados, calcular, desenhar e concluir

<div class="grade g3">
<div class="cartao">
<p class="rotulo azul">A base</p>
<h3>Students Performance in Exams</h3>
<p><b><span data-calc="n">1000</span> estudantes</b> e 8 colunas, com dados dos alunos e notas de matemática, leitura e escrita.</p>
<p>Variável analisada <code>math score</code>, notas inteiras de 0 a 100.</p>
</div>
<div class="cartao">
<p class="rotulo azul">Pode usar</p>
<div class="lista-codigo"><code>csv</code><code>math</code><code>matplotlib</code></div>
<p>O <code>matplotlib</code> serve <b>só para os gráficos</b>. Toda conta é feita à mão no código.</p>
</div>
<div class="cartao">
<p class="rotulo" style="color:#E4572E">Não pode usar</p>
<div class="lista-codigo proibido"><code>statistics</code><code>scipy.stats</code><code>numpy.mean</code><code>numpy.std</code><code>pandas.mean</code><code>pandas.std</code></div>
<p>E nenhum resultado pode ser digitado à mão.</p>
</div>
</div>

<p class="lead">O trabalho tem sete partes. <b>A</b> teoria, <b>B</b> leitura, <b>C</b> medidas, <b>D</b> regra 68–95–99,7, <b>E</b> escore z, <b>F</b> gráficos e <b>G</b> conclusão.</p>

Note:
(40 segundos) A base é a Students Performance in Exams, do Kaggle, com mil estudantes e oito colunas. Eu analisei a coluna math score, que são as notas de matemática de zero a cem. A atividade tinha uma regra importante, que era não usar bibliotecas estatísticas prontas. Então eu só podia usar o csv e o math, que são da biblioteca padrão do Python, e o matplotlib apenas para desenhar. Média, desvio-padrão e todo o resto eu programei com as fórmulas. O trabalho segue sete partes, da teoria até a conclusão, e a apresentação segue essa mesma ordem.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<div class="lado-a-lado">
<div>
<p class="eyebrow">Parte A · Teoria</p>
<h2>A Curva de Gauss</h2>
<ul>
<li>Distribuição <b>contínua</b>, simétrica e em formato de <b>sino</b></li>
<li><b>Média, mediana e moda</b> são iguais e ficam no centro</li>
<li>As caudas nunca tocam o eixo e a <b>área total é 1</b></li>
</ul>
<div class="caixa-formula">
<div class="formula"><i>f</i>(<i>x</i>) = <span class="frac"><span>1</span><span><i>σ</i>√2π</span></span> <i>e</i><sup style="font-size:30px">−(<i>x</i>−<i>μ</i>)² / 2<i>σ</i>²</sup></div>
</div>
<p class="lead" style="margin-top:20px"><b class="azul">μ</b> é o centro da curva. <b>σ</b> é o quanto ela se espalha.</p>
</div>
<div class="painel">
<canvas class="curva-parametros" width="1000" height="560" aria-label="Curva normal que muda com a média e o desvio-padrão"></canvas>
<div class="controles">
<label>μ <input type="range" data-param="mu" min="30" max="90" step="1"><output data-out="mu">66</output></label>
<label>σ <input type="range" data-param="sigma" min="8" max="30" step="1"><output data-out="sigma">15</output></label>
<button class="btn" data-reset>valores da base</button>
</div>
<p class="nota" style="margin-top:12px">A linha tracejada cinza é a curva com a média e o desvio das notas reais.</p>
</div>
</div>

Note:
(55 segundos) A distribuição normal é contínua, simétrica e tem formato de sino. Nela a média, a mediana e a moda coincidem no centro, e a área total embaixo da curva vale um, que representa cem por cento de probabilidade. Ela depende de dois parâmetros. Aqui eu mostro mexendo nos controles. Quando eu mudo o mu, a curva inteira anda para a direita ou para a esquerda, então a média define a posição. Quando eu aumento o sigma, a curva fica mais baixa e larga, e quando diminuo ela fica alta e estreita, então o desvio-padrão define a dispersão. A área continua sendo um em todos os casos. Termino clicando em valores da base para voltar para a curva das notas.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<div class="lado-a-lado largo">
<div>
<p class="eyebrow">Parte A · Teoria</p>
<h2>Regra 68–95–99,7 e escore z</h2>
<p class="lead">Em dados normais, a parte dos valores perto da média é <b>sempre a mesma</b>, não importa quanto valem μ e σ.</p>
<div class="caixa-formula">
<div class="formula"><i>z</i> = <span class="frac"><span><i>x</i> − <i>μ</i></span><span><i>σ</i></span></span></div>
<p class="pequeno" style="margin:0">O escore z diz <b>quantos desvios-padrão</b> um valor está acima (z &gt; 0) ou abaixo (z &lt; 0) da média.</p>
</div>
<p class="lead" style="margin-top:24px">Como só 0,27% dos valores ficam além de 3σ, notas com <b>|z| &gt; 3</b> são tratadas como <b>possíveis valores atípicos</b>.</p>
</div>
<div class="painel">
<canvas class="curva-regra" width="1000" height="560" aria-label="Curva normal padrão com as faixas de um, dois e três desvios-padrão"></canvas>
<div class="controles">
<button class="btn ativo" data-k="1">± 1σ</button>
<button class="btn" data-k="2">± 2σ</button>
<button class="btn" data-k="3">± 3σ</button>
</div>
</div>
</div>

Note:
(45 segundos) Uma consequência da forma da curva é a regra empírica. Clicando nos botões eu mostro que cerca de sessenta e oito por cento dos valores ficam a até um desvio-padrão da média, noventa e cinco por cento a até dois e noventa e nove vírgula sete por cento a até três. Isso vale para qualquer normal. O escore z traduz um valor para essa régua, dizendo quantos desvios-padrão ele está acima ou abaixo da média. Como quase nada passa de três desvios, um valor com módulo de z maior que três é considerado um possível valor atípico.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<p class="eyebrow">Como o programa está organizado</p>

## Um arquivo, uma função para cada parte

<div class="fluxo">
<div class="cartao"><p class="rotulo azul">Parte B</p><h3>Ler</h3><code>carregar_notas()</code><p>CSV vira lista de notas</p></div>
<div class="seta"></div>
<div class="cartao"><p class="rotulo azul">Parte C</p><h3>Medir</h3><code>media() mediana() modas() ...</code><p>Medidas com as fórmulas</p></div>
<div class="seta"></div>
<div class="cartao"><p class="rotulo azul">Parte D</p><h3>Contar</h3><code>regra_empirica()</code><p>Notas em <span class="xb">x</span> ± k·s</p></div>
<div class="seta"></div>
<div class="cartao"><p class="rotulo azul">Parte E</p><h3>Padronizar</h3><code>escore_z()</code><p>z e valores atípicos</p></div>
<div class="seta"></div>
<div class="cartao"><p class="rotulo azul">Parte F</p><h3>Desenhar</h3><code>gerar_histograma()</code><p>PNG com a curva</p></div>
</div>

<div class="grade g2">
<div class="cartao inverso"><p class="rotulo azul">Para rodar</p><p style="font-family:monospace;font-size:30px;color:#AFFC41">python analise_distribuicao_normal.py</p></div>
<div class="cartao inverso"><p class="rotulo azul">O que sai</p><p>Todos os resultados no terminal, separados por parte, mais <code>histograma_curva_normal.png</code> e <code>boxplot.png</code>.</p></div>
</div>

Note:
(30 segundos) Antes de entrar nos resultados, mostro como o código está organizado. É um único arquivo, analise distribuição normal ponto py, e cada parte da atividade virou uma função. A carregar notas lê o arquivo, as funções de medidas fazem os cálculos da Parte C, a regra empírica conta as notas nos intervalos, a escore z padroniza e a gerar histograma desenha o gráfico. A função main chama tudo nessa ordem e imprime os resultados no terminal, separados por parte.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<div class="lado-a-lado codigo">
<div>
<p class="eyebrow">Parte B · Leitura e organização dos dados</p>
<p class="arquivo">analise_distribuicao_normal.py · carregar_notas()</p>

<pre><code class="language-python" data-trim data-line-numbers="1-2|3-4|5-7|8-12|13-15|16">
with open(caminho, newline="", encoding="utf-8") as arquivo:
    leitor = csv.DictReader(arquivo)
    for numero_linha, registro in enumerate(leitor, start=2):
        valor = registro.get("math score")
        if valor is None or valor.strip() == "":
            problemas.append((numero_linha, "valor ausente"))
            continue
        try:
            nota = int(valor.strip())
        except ValueError:
            problemas.append((numero_linha, "valor inválido"))
            continue
        if nota &lt; 0 or nota &gt; 100:
            problemas.append((numero_linha, "fora de 0-100"))
            continue
        notas.append(nota)
</code></pre>
</div>
<div style="padding-top:60px">
<div class="cartao">
<p class="rotulo azul">O que acontece</p>
<p><b>DictReader</b> transforma cada linha em um dicionário, então a nota é lida pelo nome da coluna.</p>
<p>Cada valor passa por <b>três testes</b>, se está vazio, se vira inteiro com <code>int()</code> e se está entre 0 e 100.</p>
<p>As notas aprovadas vão para uma <b>lista</b> e os problemas são guardados com o número da linha.</p>
</div>
<div class="grade g2" style="margin-top:28px">
<div class="cartao realce"><p class="rotulo">Registros lidos</p><p class="numero" data-calc="n">1000</p></div>
<div class="cartao realce"><p class="rotulo">Ausentes ou inválidos</p><p class="numero">0</p></div>
</div>
</div>
</div>

Note:
(45 segundos) Na Parte B, o arquivo é aberto com o módulo csv e lido com o DictReader, que transforma cada linha em um dicionário. Assim eu acesso a nota pelo nome da coluna, math score. Vou avançando o código com as setas. Para cada valor o programa faz três testes. Primeiro vê se está vazio, depois tenta converter para inteiro, e se não der é inválido, e por último confere se está entre zero e cem. O que passa nos testes vai para a lista de notas. O resultado foi que as mil notas foram lidas e nenhuma estava ausente ou inválida.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<div class="lado-a-lado codigo">
<div>
<p class="eyebrow">Parte C · Medidas sem biblioteca estatística</p>
<p class="arquivo">analise_distribuicao_normal.py</p>

<pre style="font-size:19px"><code class="language-python" data-trim data-line-numbers="1-5|6-11|12-17|18-22|23-27">
def media(dados):
    total = 0
    for x in dados:
        total += x
    return total / len(dados)
def mediana(dados):
    ordenados = sorted(dados)
    n, meio = len(ordenados), len(ordenados) // 2
    if n % 2 == 1:
        return ordenados[meio]
    return (ordenados[meio - 1] + ordenados[meio]) / 2
def modas(dados):
    frequencias = {}
    for x in dados:
        frequencias[x] = frequencias.get(x, 0) + 1
    maior = max(frequencias.values())
    return [v for v, f in frequencias.items() if f == maior], maior
def variancia_amostral(dados, m):
    soma_quadrados = 0
    for x in dados:
        soma_quadrados += (x - m) ** 2
    return soma_quadrados / (len(dados) - 1)   # s = math.sqrt(...)
def coeficiente_assimetria(dados, m, s):
    n, soma_cubos = len(dados), 0
    for x in dados:
        soma_cubos += ((x - m) / s) ** 3
    return n / ((n - 1) * (n - 2)) * soma_cubos
</code></pre>
</div>
<div style="padding-top:60px">
<div class="caixa-formula">
<div class="formula pequena"><i>x̄</i> = <span class="frac"><span>Σ <i>x<sub>i</sub></i></span><span><i>n</i></span></span></div>
<p class="pequeno">Mediana é o valor central da lista ordenada. Com <i>n</i> par, é a média dos dois do meio.</p>
<p class="pequeno">Moda é a nota mais frequente. O código devolve <b>todas</b> as que empatam.</p>
<div class="formula pequena"><i>s</i>² = <span class="frac"><span>Σ (<i>x<sub>i</sub></i> − <i>x̄</i>)²</span><span><i>n</i> − 1</span></span> &nbsp; <i>s</i> = √<i>s</i>²</div>
<div class="formula pequena"><i>g</i> = <span class="frac"><span><i>n</i></span><span>(<i>n</i>−1)(<i>n</i>−2)</span></span> Σ <span style="font-size:34px">(</span><span class="frac"><span><i>x<sub>i</sub></i> − <i>x̄</i></span><span><i>s</i></span></span><span style="font-size:34px">)</span>³</div>
</div>
<p class="nota" style="margin-top:20px">Divide por <i>n</i> − 1 porque a média veio dos próprios dados, o que deixaria a dispersão um pouco subestimada.</p>
</div>
</div>

Note:
(50 segundos) Na Parte C cada medida virou uma função que segue a fórmula. A média soma as notas com um laço e divide pela quantidade. A mediana ordena a lista e, como mil é par, faz a média dos dois valores do meio. A moda monta um dicionário de frequências e devolve todas as notas que empatam na maior frequência, então o código também funcionaria se houvesse mais de uma moda. A variância amostral soma os desvios ao quadrado e divide por n menos um, e o desvio-padrão é a raiz dela, usando só o math ponto sqrt. Por último, o coeficiente de assimetria eleva os desvios padronizados ao cubo, o que mantém o sinal e mostra para que lado a cauda é mais longa.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<p class="eyebrow">Parte C · Resultados</p>

## O centro está em 66 e o espalhamento em 15 pontos

<div class="grade g5">
<div class="cartao"><p class="rotulo">Quantidade</p><p class="numero" data-calc="n">1000</p></div>
<div class="cartao"><p class="rotulo">Menor nota</p><p class="numero" data-calc="min">0</p></div>
<div class="cartao"><p class="rotulo">Maior nota</p><p class="numero" data-calc="max">100</p></div>
<div class="cartao"><p class="rotulo">Amplitude</p><p class="numero" data-calc="amp">100</p></div>
<div class="cartao"><p class="rotulo">Moda</p><p class="numero" data-calc="moda">65</p><p class="pequeno"><span data-calc="freqModa">36</span> vezes</p></div>
<div class="cartao realce"><p class="rotulo">Média</p><p class="numero" data-calc="media" data-casas="2">66,09</p></div>
<div class="cartao realce"><p class="rotulo">Mediana</p><p class="numero" data-calc="mediana" data-casas="0">66</p></div>
<div class="cartao"><p class="rotulo">Variância</p><p class="numero" data-calc="variancia" data-casas="2">229,92</p></div>
<div class="cartao realce"><p class="rotulo">Desvio-padrão</p><p class="numero" data-calc="s" data-casas="2">15,16</p></div>
<div class="cartao"><p class="rotulo">Assimetria</p><p class="numero" data-calc="g" data-casas="2">−0,28</p></div>
</div>

<div class="grade g2">
<div class="cartao fragment"><p class="rotulo azul">Média, mediana e moda</p><p><b>Quase iguais</b>, como numa normal. A diferença entre média e mediana é de menos de 0,1 ponto.</p></div>
<div class="cartao fragment"><p class="rotulo azul">Assimetria g = <span data-calc="g" data-casas="4">−0,2789</span></p><p>Negativa e com |g| &lt; 0,5, então é uma <b>assimetria leve</b>, com a cauda das notas baixas um pouco mais longa.</p></div>
</div>

Note:
(40 segundos) Esses números são os que o programa calculou, e aqui na apresentação eles também são calculados a partir do CSV, não foram digitados. As notas vão de zero a cem. A média deu sessenta e seis vírgula zero nove, a mediana sessenta e seis e a moda sessenta e cinco, que aparece trinta e seis vezes. O desvio-padrão é de quinze pontos. No primeiro clique eu destaco que as três medidas de centro são quase iguais, como numa normal. No segundo, que a assimetria deu menos zero vírgula vinte e oito, uma assimetria negativa leve, ou seja, a cauda das notas baixas é um pouco mais comprida.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<div class="lado-a-lado" style="grid-template-columns:1080px 1fr">
<div class="painel">
<canvas class="hist-regra" width="1040" height="600" aria-label="Histograma das notas com o intervalo de k desvios-padrão destacado"></canvas>
<div class="controles">
<button class="btn ativo" data-k="1">± 1 desvio</button>
<button class="btn" data-k="2">± 2 desvios</button>
<button class="btn" data-k="3">± 3 desvios</button>
</div>
</div>
<div>
<p class="eyebrow">Parte D · Regra 68–95–99,7</p>
<h2>A regra funciona nas notas?</h2>
<table class="tabela">
<tr><th>Faixa</th><th>Qtd.</th><th>Obs.</th><th>Esp.</th></tr>
<tr data-linha="1"><td><span class="xb">x</span> ± 1s</td><td class="num" data-calc="r1q">696</td><td class="num"><span data-calc="r1p" data-casas="1">69,6</span>%</td><td class="num">68%</td></tr>
<tr data-linha="2"><td><span class="xb">x</span> ± 2s</td><td class="num" data-calc="r2q">954</td><td class="num"><span data-calc="r2p" data-casas="1">95,4</span>%</td><td class="num">95%</td></tr>
<tr data-linha="3"><td><span class="xb">x</span> ± 3s</td><td class="num" data-calc="r3q">996</td><td class="num"><span data-calc="r3p" data-casas="1">99,6</span>%</td><td class="num">99,7%</td></tr>
</table>
<p class="lead"><b>Sim.</b> A maior diferença é de <span data-calc="r1dif" data-casas="1" data-sinal>+1,6</span> ponto percentual.</p>
<p class="nota">No código, um laço conta quantas notas ficam entre <code>m - k*s</code> e <code>m + k*s</code> para k = 1, 2 e 3.</p>
</div>
</div>

Note:
(50 segundos) Na Parte D, a função regra empírica calcula os limites média menos k desvios e média mais k desvios, e conta quantas notas ficam dentro. No gráfico, cada barra é uma nota e as barras claras são as que estão dentro do intervalo. Com um desvio, entre cinquenta e um e oitenta e um, ficaram seiscentas e noventa e seis notas, sessenta e nove vírgula seis por cento, contra sessenta e oito esperados. Clico em dois desvios e dá noventa e cinco vírgula quatro, contra noventa e cinco. Em três desvios dá noventa e nove vírgula seis, contra noventa e nove vírgula sete. Os valores ficaram muito próximos, e o primeiro intervalo um pouco acima mostra que as notas se concentram um pouco mais no centro. Um detalhe é que o limite de três desvios passa de cem, que é uma nota impossível.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<div class="lado-a-lado" style="grid-template-columns:1fr 1080px">
<div>
<p class="eyebrow">Parte E · Escores padronizados</p>
<h2>Onde fica cada nota?</h2>
<table class="tabela">
<tr><th>Caso</th><th>Nota</th><th>z</th></tr>
<tr><td>Menor nota</td><td class="num" data-calc="min">0</td><td class="num" style="color:#E4572E" data-calc="zmin" data-casas="4">−4,3585</td></tr>
<tr><td>Maior nota</td><td class="num" data-calc="max">100</td><td class="num" data-calc="zmax" data-casas="4">2,2364</td></tr>
<tr><td>Nota 50</td><td class="num">50</td><td class="num" data-calc="z50" data-casas="4">−1,0611</td></tr>
<tr><td>Nota 75</td><td class="num">75</td><td class="num" data-calc="z75" data-casas="4">0,5877</td></tr>
<tr><td>Nota 90</td><td class="num">90</td><td class="num" data-calc="z90" data-casas="4">1,5769</td></tr>
</table>
<p class="lead">Na base inteira, <b><span data-calc="natip">4</span> notas</b> têm |z| &gt; 3, que são <b><span data-calc="atipicos">0, 8, 18, 19</span></b>, todas na cauda de baixo.</p>
</div>
<div class="painel">
<canvas class="curva-z" width="1040" height="520" aria-label="Posição da nota escolhida na curva e seu escore z"></canvas>
<div class="controles">
<label>nota <input class="entrada" type="number" min="0" max="100" value="75" data-z></label>
<button class="btn" data-nota="0">0</button>
<button class="btn" data-nota="50">50</button>
<button class="btn" data-nota="75">75</button>
<button class="btn" data-nota="90">90</button>
<button class="btn" data-nota="100">100</button>
</div>
<div class="controles resultado" data-saida-z></div>
</div>
</div>

Note:
(50 segundos) Na Parte E a função escore z faz x menos a média, dividido pelo desvio-padrão. Aqui dá para testar qualquer nota. Com setenta e cinco, z dá zero vírgula cinquenta e nove, ou seja, pouco mais de meio desvio acima da média. Clico em cinquenta e dá menos um vírgula zero seis, cerca de um desvio abaixo. Noventa dá um vírgula cinquenta e oito e a maior nota, cem, dá dois vírgula vinte e quatro, então nenhuma delas é atípica. Por último clico em zero. O z dá menos quatro vírgula trinta e seis, mais de quatro desvios abaixo da média, e por isso a nota zero é um possível valor atípico. O programa percorreu a base inteira e achou quatro notas assim, zero, oito, dezoito e dezenove, os pontos vermelhos, todas na cauda de baixo.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<div class="lado-a-lado" style="grid-template-columns:1080px 1fr">
<div class="painel" style="background:#fff">
<canvas class="hist-camadas" data-tema="claro" width="1040" height="600" aria-label="Histograma das notas com camadas que podem ser ligadas"></canvas>
<div class="controles">
<button class="btn ativo" data-camada="barras" style="--c:#5E9112">histograma</button>
<button class="btn" data-camada="curva" style="--c:#3C1642">curva normal</button>
<button class="btn" data-camada="media" style="--c:#086375">média</button>
<button class="btn" data-camada="sigma" style="--c:#0E9F84">± 1 desvio</button>
</div>
</div>
<div>
<p class="eyebrow">Parte F · Representação gráfica</p>
<h2>Montando o gráfico</h2>

<pre style="font-size:20px"><code class="language-python" data-trim data-line-numbers="1-2|3-5|6-7|8-9">
classes = list(range(0, 105, 5))
ax.hist(dados, bins=classes, density=True)
xs = [i / 10 for i in range(0, 1001)]
ys = [densidade_normal(x, m, s) for x in xs]
ax.plot(xs, ys)
ax.axvline(m, color="red")
ax.axvline(m - s, linestyle="--")
ax.axvline(m + s, linestyle="--")
fig.savefig("histograma_curva_normal.png")
</code></pre>
<p class="lead"><code>density=True</code> faz a área das barras valer <b>1</b>, igual à área da curva, e por isso os dois podem ser comparados.</p>
</div>
</div>

Note:
(45 segundos) Na Parte F eu monto o gráfico em camadas, do mesmo jeito que o código faz. Primeiro o histograma com classes de cinco em cinco pontos, usando density igual a true, que transforma a altura das barras em densidade para que a área total seja um, igual à da curva. Clico em curva normal, que o programa desenha calculando a fórmula da densidade em mil e um pontos com a média e o desvio da base. Depois ligo a linha da média e as linhas de um desvio abaixo e acima. Dá para ver que a curva acompanha bem as barras, com o pico um pouco mais alto no centro e a cauda esquerda indo até o zero.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<p class="eyebrow">Parte F · Arquivos gerados pelo programa</p>

## O que o Python salvou na pasta

<div class="lado-a-lado" style="grid-template-columns:1180px 1fr;gap:48px">
<div>
<img class="imagem-python" src="assets/histograma_curva_normal.png" alt="Histograma das notas com a curva normal gerado pelo matplotlib">
<p class="arquivo" style="margin-top:10px">histograma_curva_normal.png</p>
</div>
<div>
<img class="imagem-python" src="assets/boxplot.png" alt="Gráfico de caixa das notas" style="width:400px">
<p class="arquivo" style="margin-top:10px">boxplot.png (opcional)</p>
<p class="pequeno">A mediana fica no meio da caixa e os pontos soltos aparecem <b>só embaixo</b>, que são as notas atípicas.</p>
</div>
</div>

Note:
(20 segundos) Esses são os arquivos que o próprio programa gerou, o histograma com a curva, que é o arquivo pedido na entrega, e o gráfico de caixa opcional. No gráfico de caixa a mediana fica bem no meio da caixa, então o centro dos dados é quase simétrico, e os pontos soltos aparecem só embaixo, que são justamente as notas atípicas.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<p class="eyebrow">Parte G · Conclusão</p>

## Respondendo às perguntas

<div class="grade g3 perguntas">
<div class="cartao pergunta"><span class="pill ok">Sim</span><h3>Formato de sino?</h3><p>Pico no centro e frequências caindo para os dois lados. A curva acompanha bem as barras.</p></div>
<div class="cartao pergunta"><span class="pill ok">Sim</span><h3>Média ≈ mediana?</h3><p><span data-calc="media" data-casas="3">66,089</span> contra <span data-calc="mediana">66</span>, e a moda é <span data-calc="moda">65</span>.</p></div>
<div class="cartao pergunta"><span class="pill ok">Sim</span><h3>Perto de 68–95–99,7?</h3><p><span data-calc="r1p" data-casas="1">69,6</span>%, <span data-calc="r2p" data-casas="1">95,4</span>% e <span data-calc="r3p" data-casas="1">99,6</span>%. Diferença máxima de 1,6 ponto.</p></div>
<div class="cartao pergunta"><span class="pill leve">Leve</span><h3>Há assimetria?</h3><p>g = <span data-calc="g" data-casas="2">−0,28</span>, negativa e leve. A cauda das notas baixas é mais longa.</p></div>
<div class="cartao pergunta"><span class="pill leve">Sim, <span data-calc="natip">4</span></span><h3>Valores atípicos?</h3><p>Notas <span data-calc="atipicos">0, 8, 18, 19</span>. São possíveis atípicos, não erros, e foram mantidas.</p></div>
<div class="cartao pergunta realce"><span class="pill nao">Não</span><h3>Normal perfeita?</h3><p>Próximo slide.</p></div>
</div>

Note:
(50 segundos) Na Parte G respondo às perguntas da atividade. O histograma tem formato de sino, sim. Média e mediana são próximas, sessenta e seis vírgula zero oito nove e sessenta e seis, com a moda em sessenta e cinco. Os percentuais ficaram muito próximos da regra, com no máximo um vírgula seis ponto de diferença. Existe assimetria, mas leve e negativa. E existem quatro possíveis valores atípicos, que eu mantive porque podem ser estudantes que realmente foram muito mal, e não erros na base. A última pergunta, se é uma normal perfeita, eu respondo no próximo slide.

---

<!-- .slide: class="claro" data-background-color="#FFFFFF" -->

<p class="eyebrow">Parte G · Conclusão</p>

## Aproximadamente normal, mas não perfeitamente

<div class="grade g2" style="margin-top:40px">
<div class="cartao alto">
<p class="rotulo" style="color:#E4572E">Por que não é perfeita</p>
<ul class="lista-grande">
<li>A normal é <b>contínua e infinita</b>. As notas são <b>inteiras e vão só de 0 a 100</b>. O limite de <span class="xb">x</span> + 3s deu <b><span data-calc="r3sup" data-casas="2">111,58</span></b>, uma nota impossível.</li>
<li>A normal é simétrica, e as notas têm <b>leve assimetria negativa</b>.</li>
<li>O centro é um pouco <b>mais concentrado</b> do que a curva prevê.</li>
<li>Usei análise <b>descritiva e visual</b>, não um teste formal de normalidade.</li>
</ul>
</div>
<div class="cartao inverso alto">
<p class="rotulo azul">Conclusão mais cuidadosa</p>
<p class="conclusao-final">As notas de matemática têm <b>comportamento aproximadamente normal</b>. A Curva de Gauss é um <b>bom modelo</b> para descrever o desempenho da turma, desde que seja entendida como uma <b>aproximação</b> e não como uma descrição exata dos dados.</p>
</div>
</div>

Note:
(40 segundos) Então, os dados seguem perfeitamente uma normal? Não. A normal é contínua e aceita qualquer valor, enquanto as notas são inteiras e presas entre zero e cem, tanto que o limite de três desvios deu cento e onze, uma nota que não existe. Além disso há uma leve assimetria e o centro é um pouco mais concentrado que o previsto, e eu fiz uma análise descritiva, não um teste formal. A conclusão mais cuidadosa é que as notas têm comportamento aproximadamente normal, e que a Curva de Gauss é um bom modelo para descrever a turma, desde que seja vista como uma aproximação.

---

<!-- .slide: class="claro capa" data-background-color="#FFFFFF" -->

<div class="fundo-curva"><canvas class="fundo-sino" width="1920" height="1080" aria-hidden="true"></canvas></div>

<p class="eyebrow">Distribuição Normal e Curva de Gauss</p>

<h1 class="titulo-capa">Obrigada!</h1>

<p class="subtitulo">Perguntas?</p>

<p class="rodape">Mariana Alice Pires Leite (3043151)<br>Prof. Dr. Wilton Moreira Ferraz Junior</p>

Note:
(10 segundos) Essa foi a minha análise. Obrigada pela atenção, e fico à disposição para perguntas.
