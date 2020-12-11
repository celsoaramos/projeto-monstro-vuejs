const app = new Vue({
    el: '.app',
    data: {
        iniciarBatalha: false,
        pontoVidaJogador: 100,
        pontoVidaMonstro: 100,
        corBarraVidaJogador: 'bg-success',
        corBarraVidaMonstro: 'bg-success',
        forcaJogador: 10,
        forcaMonstro: 14,
        forcaJogadorEspecial: 14,
        forcaMonstroEspecial: 10,
        ganhouJogador: false,
        ganhouMonstro: false,
        mostrarMensagem: false,
        forcaAtaqueJogador: 0,
        forcaAtaqueMonstro: 0,
        listaLog: [{
            id: '',
            classe: '',
            mensagem: ''
        }],
    },
    methods: {

        logar() {
            this.iniciarBatalha = true;
        },

        atacar() {
            if (this.pontoVidaJogador > 0 && this.pontoVidaMonstro > 0) {
                this.calculaForcaAtaque();
                this.verificaCorBarraVida();
            }
            this.insereLog();
            this.verificaGanhador();
        },

        atacarEspecial() {
            if (this.pontoVidaJogador > 0 && this.pontoVidaMonstro > 0) {
                this.calculaForcaAtaque("especial");
                this.verificaCorBarraVida();
            }
            this.insereLog();
            this.verificaGanhador();
        },

        curar() {
            if (this.pontoVidaJogador > 0 && this.pontoVidaMonstro > 0) {
                // no curar, o jogador ganha ponto de vida mas tbm sofre ataque do monstro
                this.pontoVidaJogador = this.pontoVidaJogador + Math.floor(Math.random() * this.forcaJogadorEspecial);
                this.pontoVidaJogador = this.pontoVidaJogador - Math.floor(Math.random() * this.forcaJogador);

                this.verificaCorBarraVida();
            }
            this.insereLog();
            this.verificaGanhador();
        },

        desistir() {
            this.iniciarBatalha = false;
            this.pontoVidaJogador = 100;
            this.pontoVidaMonstro = 100;
            this.ganhouJogador = false;
            this.ganhouMonstro = false;
            this.listaLog = [];
            this.corBarraVidaJogador = 'bg-success';
            this.corBarraVidaMonstro = 'bg-success';
        },

        calculaForcaAtaque(especial) {
            if (especial) {
                this.forcaAtaqueJogador = Math.floor(Math.random() * this.forcaJogadorEspecial);
            } else {
                this.forcaAtaqueJogador = Math.floor(Math.random() * this.forcaJogador);
            }
            this.forcaAtaqueMonstro = Math.floor(Math.random() * this.forcaMonstro);

            this.pontoVidaJogador = this.pontoVidaJogador - this.forcaAtaqueMonstro;
            this.pontoVidaMonstro = this.pontoVidaMonstro - this.forcaAtaqueJogador;
        },

        verificaCorBarraVida() {

            // JOGADOR
            if (this.pontoVidaJogador > 100) {
                this.pontoVidaJogador = 100
                this.corBarraVidaJogador = 'bg-success'
            }
            if (this.pontoVidaJogador < 75 ) {
                this.corBarraVidaJogador = 'bg-info'
            }
            if (this.pontoVidaJogador < 50 ) {
                this.corBarraVidaJogador = 'bg-warning'
            }
            if (this.pontoVidaJogador < 20) {
                this.corBarraVidaJogador = 'bg-danger'
            }

            // MONSTRO
            if (this.pontoVidaMonstro < 75 ) {
                this.corBarraVidaMonstro = 'bg-info'
            }
            if (this.pontoVidaMonstro < 50 ) {
                this.corBarraVidaMonstro = 'bg-warning'
            }
            if (this.pontoVidaMonstro < 20) {
                this.corBarraVidaMonstro = 'bg-danger'
            }
        },

        verificaGanhador() {
            if (this.pontoVidaJogador < 0  || this.pontoVidaJogador == 0) {
                this.pontoVidaJogador = 0;
                this.mostrarMensagem = true;
                this.ganhouMonstro = true;
                this.ganhouJogador = false;
            }

            if (this.pontoVidaMonstro < 0 || this.pontoVidaMonstro == 0) {
                this.pontoVidaMonstro = 0;
                this.mostrarMensagem = true;
                this.ganhouJogador = true;
                this.ganhouMonstro = false;
            }
        },

        insereLog() {
            var tamanhoLista = this.listaLog.length;
            this.listaLog.unshift({id: tamanhoLista + 1, classe: 'alert-danger', mensagem: "O ataque do monstro foi de " + this.forcaAtaqueMonstro});
            this.listaLog.unshift({id: tamanhoLista + 1, classe: 'alert-info', mensagem: "O ataque do jogador foi de " + this.forcaAtaqueJogador});

        },

    }
    
})