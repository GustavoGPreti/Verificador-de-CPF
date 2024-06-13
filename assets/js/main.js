const botao = document.querySelector('#botao')
botao.addEventListener('click', function () {
    let cpf = document.querySelector('#input-cpf').value
    let cpfLimpo = cpf.replace(/\D+/g, '')
    let contador = 0
    let cpfFinal = ''
    class Cpfverificador {
        constructor() {
            this.resposta = document.querySelector('#p')
            this.cpfLimpo = cpfLimpo
            this.cpfarray = Array.from(cpfLimpo).slice(0, 9)
        }
        chamar() {
            this.multiplicar()
            this.ajuntar()
            this.calcular()
            this.secondNumber()
            this.comparar()
        }
        multiplicar() {
            contador = 0
            let multiplicado = this.cpfarray.map((valor, indice, array) => {
                valor = valor * (this.cpfarray.length + 1 - contador)
                contador++
                return valor
            })
            return multiplicado
        }
        ajuntar() {
            const total = this.multiplicar().reduce((contador, valor, indice, array) => {
                contador += valor
                return contador
            })
            return total
        }
        calcular() {
            let resultado = 11 - (this.ajuntar() % 11)
            return resultado >= 10 ? 0 : resultado
        }

        secondNumber() {
            this.cpfarray.push(this.calcular())
            this.multiplicar()
            this.ajuntar()
            let resultado = this.calcular()
            this.cpfarray.push(resultado)
        }

        comparar() {
            for (let letra of this.cpfarray) {
                cpfFinal += letra
            }
            if (cpfFinal == this.cpfLimpo) {
                this.resposta.innerHTML = 'cpf válido'
                this.resposta.style.backgroundColor = 'green'
            } else {
                this.resposta.innerHTML = 'cpf inválido'
                this.resposta.style.backgroundColor = 'red'
            }

        }
    }
    const cpf1 = new Cpfverificador(cpfLimpo)
    cpf1.chamar()
})
