const readline = require ('readline')
const logUpdate = require('log-update')
const {between, generateRandomSpace} = require('./utils')


const rl = readline.createInterface( {
    input: process.stdin,
    output:process.stdout

})



readline.emitKeypressEvents(process.stdin, rl)


if(process.stdin.isTTY) {
    process.stdin.setRawMode(true);
} 


process.stdin.on('keypress', (character,key) => {
   if (key.name === 'l') {
        giveFood()
        return
    }

   if (key.name === 'm') {
        soigner()
        return
    }

    if (key.name === 'a') {
        clean()
        return
    }


})

    
function giveFood() {
        
    state.faim = state.faim+10
    
}



function soigner() {
        
    state.malade = true
}




function clean() {
        
  state.propreté = false
}


        
rl.on('close', () => {
  process.exit(0)
})
 
 
 
//creation ours


 const bear = [
    'ʕ•ᴥ•ʔ',
    'ʕ·ᴥ·ʔ',
    'ʕºᴥºʔ'
];

 


//Etat

const state = {
    life : 100,
    time: 0, 
    faim: 100,
    malade: false,
    propreté:false,

}
    // time : 0 //temps en seconde

function getOurs() {
    
    if (state.malade) {
        return  'ʕºᴥºʔ à l aide'
    }
    if (state.propreté) {
        return 'Lave moi !'
    }

    if (state.life === 0) {
       return ' ⚰️ RIP'
    }

   if(state.faim === 0) {
       return '༼ಢ_ಢ༽ '
    }
  

return generateRandomSpace() + bear[Math.floor(Math.random() * bear.length)]

}

function getLifeBar() {
    
    
    if (state.life <75 ) {
        
        return ' ❤ ❤ ♡ '  + state.life + '/100'
    }
    
    if (state.life <50)  {
        return ' ❤ ♡ ♡ ' + state.life + './100'
    }
    
    if (state.life <10)  {
        return '♡ ♡ ♡ ' + state.life + '/100'
    }

    return ' ❤ ❤ ❤ ' + state.life + '/100'

}

function getHungry() {

    if(state.faim <= 0) {
        return 'RIP'
    }
    
    if (state.faim < 75 ) {
        
        return  'j\'ai faim' + state.faim + ' / 100'
    }
    
    if (state.faim < 50) {
        return ' je vais crever' +  state.faim + '/100'
    }
    
    if (state.faim < 10) {
        return ' Adieu monde cruel' + state.faim + '/100'
    }
    
    return '' + state.faim + '/100'
}


setInterval(function() {


    const espace = [
      getOurs(),
      '',
      getLifeBar(),
      getHungry(),
      giveFood(),
      clean(), 
      soigner()
    ]
    
    logUpdate(espace.join('\n'))
    
},750)


    //boucle d'Etat

setInterval(function() {
    
    const tombemalade = between(1, 10000)

        if (tombemalade === 48 ) {
            state.malade = true
            state.life --
        }

    const sale = between(50, 700)

        if(sale === 534) {
            state.propreté = true
        }
    
    
    state.time += 1

        if (state.time % 3 === 0  && state.life !== 0) {
            state.faim--
        }
        
        if (state.faim === 0) {
            state.life--
        }
    


},100)
