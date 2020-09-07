#include <iostream>
#include <vector>
#include <string>

// TrocoSolverPD = Função que retorna um vetor com uma solução ótima para o problema do troco da máquina de vendas
//---- INPUTS ---- 
// denom = vetor com os valores das moedas (ex [1, 5, 10, 25] )
// value = inteiro do valor do troco a ser gerado (ex 28)
// coins = vetor a ser preenchido de acordo com o número de moedas do troco (ex [3, 0, 0, 1] = 3*1 + 1*25 = 28)
void TrocoSolverPD(const std::vector <unsigned int> &denom,unsigned int value, std::vector <unsigned int> &coins) {
    coins.resize(denom.size(), 0); 

    std::vector<unsigned int> listaUsadas; // lista que armazena a nova moeda incluida para o troco do valor i na posicao i
    std::vector<unsigned int> listaMinima; // lista que armazena o numero minimo de moedas de troco
    listaUsadas.resize(value+1, 0);
    listaMinima.resize(value+1, 0);

    int contagem, nova, k;
    for(int i = 1; i <= value; i++){ //loop que resolve os casos, do 1 até o value
        contagem = i; //armazena o num minimo de moedas
        nova = 1;     //armazena a moeda utilizada 
        k = denom.size();
        while (k > 0) // loop que testa os possíveis valores de x-c 
        {
            --k;
            if(denom[k] <= i){ //se a moeda na posicao k couber no valor i
                if(listaMinima[i-denom[k]] + 1 < contagem){ //se o num de moedas for menor
                    contagem = listaMinima[i-denom[k]] + 1;
                    nova = denom[k];
                }
            }
        }
        listaMinima[i] = contagem; //valores escontrados sao armazenados nos vetores
        listaUsadas[i] = nova;     //
    }
    
    int valor = value;
    int moeda = 0;
    int x = denom.size();
    while(valor > 0){ // loop que converte as moedas do vetor de moedas usadas no vetor coins
        
        moeda = listaUsadas[valor];
        
        x = denom.size();
        while (x > 0) // loop que encontra o indice da moeda usada e incrementa no vetor coins
        {
            --x;
            if(denom[x] == moeda){
                coins[x]++;
            }
        }
        valor = valor - moeda; // tira o valor da moeda incrementada do troco
        
    }
    
}

int main(){ // exemplo de uso: troco para 63, moedas no vetor denom
    std::vector<unsigned int> denom = {1, 5, 10, 21, 25};
    int valor = 63;
    std::vector<unsigned int> coins = {0, 0, 0, 0, 0};
    TrocoSolverPD(denom, valor, coins);
    for (int x : coins) 
        std::cout << x << " "; 
    return 0;
}
