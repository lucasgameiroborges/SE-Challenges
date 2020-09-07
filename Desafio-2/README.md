# Descrição da solução do desafio 2
O problema descrito no desafio 2 é o clássico problema do troco, cuja solução ótima decorre de um algoritmo baseado em programação dinâmica - PD (Um algoritmo recursivo também poderia ser aplicado, porém ele teria alguns problemas conforme será comentado a seguir). 

Uma solução recursiva para o problema poderia ser pensada assim: Se o valor x em questão for igual ao valor de uma moeda, está resolvido. Se não for, a solução será a menor solução do subproblema de valor x - c, onde c é o valor de uma das moedas disponíveis, somada a uma moeda do tipo c. Dessa forma, se houvermos n tipos de moeda, a função fará n chamadas recursivas (uma para cada valor x -c possível) vai escolher a menor solução (em número de moedas) e somar 1 moeda do tipo c escolhido.

Perceba que no algoritmo recursivo não há nenhum tipo de verificação se um dado valor já foi calculado. Para uma gama de moedas disponíveis e altos valores, a árvore de chamadas recursivas será muito ramificada e alta, de forma que haverá muito retrabalho. Poderia ser utilizada a técnica de memoization para armazenar os resultados e evitar retrabalho, porém isso ainda não evitaria cálculos "inúteis" (ie que não contribuíram para a solução final).

Portanto, a melhor solução é começar por baixo: Primeiro calculamos o troco do valor 1, depois o do 2, e assim sucessivamente. Perceba como, ao calcular a solução para o valor x, já sabemos todas as soluções anteriores e podemos facilmente fazer as comparações descritas no passo recursivo sem calcular nada mais. Essa é a solução por programação dinâmica.

No arquivo C++ fornecido encontra-se, além dos devidos comentários, uma função que implementa o algoritmo descrito, bem como um exemplo de aplicação na main. Ao compilar o código, é visível que o resultado é ótimo (3 moedas de 21), e não o resultado errôneo que o algoritmo guloso retornaria (que incluiria a moeda de valor 25). 
