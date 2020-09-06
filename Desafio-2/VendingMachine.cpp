#include <iostream>
#include <vector>
#include <string>

void TrocoSolverPD(const std::vector <unsigned int> &denom,unsigned int value, std::vector <unsigned int> &coins) {
    coins.resize(denom.size(), 0); 

    std::vector<unsigned int> listaUsadas;
    std::vector<unsigned int> listaMinima;
    listaUsadas.resize(value+1, 0);
    listaMinima.resize(value+1, 0);

    int contagem, nova, k;
    for(int i = 1; i <= value; i++){
        contagem = i;
        nova = 1;
        k = denom.size();
        while (k > 0)
        {
            --k;
            if(denom[k] <= i){
                if(listaMinima[i-denom[k]] + 1 < contagem){
                    contagem = listaMinima[i-denom[k]] + 1;
                    nova = denom[k];
                }
            }
        }
        listaMinima[i] = contagem;
        listaUsadas[i] = nova;
    }
    
    int valor = value;
    int moeda = 0;
    int x = denom.size();
    while(valor > 0){
        
        moeda = listaUsadas[valor];
        
        x = denom.size();
        while (x > 0)
        {
            --x;
            if(denom[x] == moeda){
                coins[x]++;
            }
        }
        valor = valor - moeda;
        
    }
    
}

int main(){
    std::vector<unsigned int> denom = {1, 5, 10, 21, 25};
    int valor = 63;
    std::vector<unsigned int> coins = {0, 0, 0, 0, 0};
    TrocoSolverPD(denom, valor, coins);
    for (int x : coins) 
        std::cout << x << " "; 
    return 0;
}