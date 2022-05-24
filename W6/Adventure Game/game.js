const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextBit(1)
}

function showTextBit(textBitIndex) {
  const textBit = textBits.find(textBit => textBit.id === textBitIndex)
  textElement.innerText = textBit.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textBit.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('button')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextBitId = option.nextText
  if (nextTextBitId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextBit(nextTextBitId)
}

const textBits = [
  {
    // Countdown!
    id: 1,
    text: 'You are in The Hunger Games. The countdown is going off, and you are about to have to make a decision. You see a cornucopia that is full of food, weapons, and supplies. You also see the woods. Do you want to run for the CORNUCOPIA or into the WOODS?',
    options: [
      {
        text: 'Run to the cornocopia!',
        nextText: 2
      },
      {
        text: 'Run into the woods!',
        nextText: 3
      },
      {
        text: 'Get a head start!',
        nextText: 9
      },   
    ]
  },
  {
    // Cornocopia!
    id: 2,
    text: 'The countdown stops, and you run to the cornucopia. There is food, weapons, and other supplies (medicine, sleeping bags, etc.). Other tributes are starting to get there as well, so you only have time to choose one. Do you want to pick up the FOOD, WEAPONS, or SUPPLIES?',
    options: [
      {
        text: 'Grab the food.',
        setState: { food: true },
        nextText: 4
      },
      {
        text: 'Take the weapons.',
        setState: { weapons: true },
        nextText: 5
      },
      {
        text: 'Get the supplies.',
        setState: { supplies: true },
        nextText: 6
      }
    ]
  },
  {
    // Woods!
    id: 3,
    text: 'The countdown stops, and you start to run for the woods. You see a backpack close by. You can keep running or pick up the backpack. Do you want to RUN or pick up the BACKPACK?.',
    options: [
      {
        text: 'Keep running!',
        nextText: 7
      },
      {
        text: 'Pick up the backpack.',
        setState: { supplies: true },
        nextText: 8
      },
    ]
  },
  {
    // Take Food
    id: 4,
    text: 'You grab some food and run towards the woods. You trip over a rock and hurt your ankle. You go deeper into the woods and need a break. Do you want to make a SPLINT or EAT some food?',
    options: [
      {
        text: 'Make a splint for your ankle.',
        nextText: 14
      },
      {
        text: 'Eat some food.',
        requiredState: (currentState) => currentState.food,
        setState: { food: false},
        nextText: 15
      },
    ]
  },
  {
    //Take weapons.
    id: 5,
    text: 'You grab a weapon. Fighting is taking place all around you. Do you want to FIGHT or SPRINT away?',
    options: [
      {
        text: 'Fight for your life.',
        requiredState: (currentState) => currentState.weapons,
        setState: { weapons: false},
        nextText: 16
      },
      {
        text: 'Sprint away as fast as you can!',
        nextText: 17
      },
    ]
  },
  {
    // Take supllies
    id: 6,
    text: 'You grab some supplies and run towards the woods. You go deep into the woods, and it starts to get dark and cold. Do you want to CAMP in a tree or start a FIRE?',
    options: [
      {
        text: 'Camp in a tree.',
        requiredState: (currentState) => currentState.supplies,
        setState: { supplies: false },
        nextText: 21
      },
      {
        text: 'Start a fire.',
        requiredState: (currentState) => currentState.supplies,
        setState: { supplies: false },
        nextText: 22
      },     
    ]
  },
  {
    //Keep Running
    id: 7,
    text: 'You make it into the woods and keep running. You walk for a bit and hear a creek nearby. You start heading for the creek and find some berries. Do you want to eat the BERRIES or keep going to the CREEK?',
    options: [
      {
        text: 'Eat some berries.',
        nextText: 10
      },
      {
        text: 'Head for creek.',
        nextText: 11
      },
    ]
  },
  {
    //Pick up backpack 
    id: 8,
    text: 'You pick up the backpack and keep running. You find a pond and stop. Do you want to SWIM or DRINK some water?',
    options: [
      {
        text: 'Swim in the pond.',
        nextText: 12 
      },
      {
        text: 'Drink some water.',
        requiredState: (currentState) => currentState.supplies,
        setState: { supplies: false },
        nextText: 13
      },
    ]
  },
  {
    // Step Off Of The Plate
    id: 9,
    text: 'You foolishly thought that you could get a head start. As soon as you stepped off, you exploded.',
    options: [
      {
        text: 'Come on now?! Restart',
        nextText: -1
      }
    ]
  },
  { 
    // Eat berries
    id: 10,
    text: 'You eat the berries and figure out that it is nightlock. It is too late.',
    options: [
      {
        text: 'Restart?',
        nextText: -1
      }
    ]
  },
  {
    // Head for creek
    id: 11,
    text: 'You find the creek and drink some water. You are going to be a well-hydrated tribute.',
    options: [
      {
        text: 'Congratulations. Play Again?',
        nextText: -1
      }
    ]
  },
  {
    // Swim
    id: 12,
    text: 'You swim in the pond. You are going to be the cleanest tribute!',
    options: [
      {
        text: 'Congratulations. Play Again?',
        nextText: -1
      }
    ]
  },
  {
    // Drink
    id: 13,
    text: 'Your pack has iodine in it, so you add mix it with some water and let it sit. You drink some water, and it is very refreshing until you hear a pack of tributes headed your way. It is time to move.',
    options: [
      {
        text: 'Close Call. Play Again?',
        setState: { supplies: false },
        nextText: -1
      }
    ]
  },
{
    // Make a splint
    id: 14,
    text: 'You make a splint out of some sticks and are testing it out, but then hear a twig snap. You look around you and then fall to the ground. You have been speared.',
    options: [
      {
        text: 'R.I.P. Play Again?',
        nextText: -1
      }
    ]
  },
{
    // Eat some food
    id: 15,
    text: 'You eat some delicious crackers. You are going to be a well-fed tribute.',
    options: [
      {
        text: 'Yum. Play Again?',
        nextText: -1
      }
    ]
  },
{
    // Fight
    id: 16,
    text: 'You take down a few other tributes but not before one could get to you.',
    options: [
      {
        text: 'Yikes! Play Again?',
        nextText: -1
      }
    ]
  },
{
    // Sprint
    id: 17,
    text: 'You sprint away into the woods. You find a tribute and decide to become allies. Do you want to BETRAY them, be LOYAL, or be a DOUBLE agent?',
    options: [
      {
        text: 'Betray',
        nextText: 18
      },
      {
        text: 'Loyal',
        nextText: 19
      },  
      {
        text: 'Double Agent',
        nextText: 20
      },    
    ]
  },
{
    // Betray
    id: 18,
    text: 'You lead them to some tracker jackers where they get stung, while you escape.',
    options: [
      {
        text: 'Brutal. Play Again?',
        nextText: 18
      },
    ]
  },
{
    // Loyal
    id: 19,
    text: 'You get stuck in a net trap that your ally made for you.',
    options: [
      {
        text: 'Uh Oh. Restart?',
        nextText: -1
      },
    ]
  },
{
    // Double Agent
    id: 20,
    text: 'You both plan to attack another group of tributes, but you join the other side and finish off your ally',
    options: [
      {
        text: 'Congrats. Play Again?',
        nextText: -1
      },
    ]
  },
{
    // Camp In A Tree
    id: 21,
    text: 'You climb a tree and sleep in a sleeping bag. You are going to be a well-rested tribute.',
    options: [
      {
        text: 'ZZZzzzz. Play Again?',
        nextText: -1
      },
    ]
  },
{
    // Start A Fire
    id: 22,
    text: 'You make a fire hoping that there are not any tributes nearby that can see the smoke. You stay warm and comfortable until you hear tributes surrounding you. You are trapped.',
    options: [
      {
        text: 'Was it worth it? Play Again?',
        nextText: -1
      },
    ]
  },
]

startGame();
//music!
var audio = new Audio('alarm.mp3');
audio.play();