let qunmber = document.querySelector("footer span.Qnumber")
let currentQ = document.querySelector("footer span.currentQ")
let labels = document.querySelectorAll("label")
let radios = document.querySelectorAll("input.radio")
let Button = document.querySelector("button.next")
let Tilte = document.querySelector("p.title")
let bar = document.querySelector(".bar span")
let timer = document.querySelector("header p span")
let score = document.querySelector(".score")
let percentage = document.querySelector(".score .percentage")
let percentageSpan = document.querySelector(".score .percentage span")
let current = 0
let currentQN = 1
let correctAnswers = 0 
let interval 
let counter = 0

function data(){
let request = new XMLHttpRequest()
request.open("GET", "data.json", true)
request.onreadystatechange = function(){
    if(this.status === 200 && this.readyState === 4){
        let jsopject = JSON.parse(this.responseText)
        let random = jsopject["questions"].sort((a, b) => .5 - Math.random())
        showData(random[current], random.length, 0)
        data(random, random.length)
        intervel(10,  random.length)
     
    }
  }
  function data(random, length){
    Button.addEventListener("click",function next(){
      for(i = 0; i < radios.length; i++){
        if(radios[i].checked){
          if(i === random[current]["correctAnswer"]){
            correctAnswers++
            console.log("correct", correctAnswers)
          }
          
        }
      }
      if (current !== (length - 1)){
        clearInterval(interval)
        intervel(10,  random.length)
        current++
        currentQN++
        showData(random[current], random.length, 0)
        
      }else{
        Button.style.cssText  = `
       pointer-events: none;
        `
        score.style.cssText = `display: block;`
        let stop = Math.round(correctAnswers / length * 100)
       let counterin = setInterval(() => {
        if(correctAnswers !== 0){

          counter++
        }
        percentageSpan.textContent  = `${counter}%`
        
        percentage.style.cssText = `background-image: conic-gradient(#356496 ${counter * 3.6}deg, white 0deg);`
          if (counter === stop){
            clearInterval(counterin)
          }
        }, 20);
      }

    })
  }
  

request.send()
  function intervel(time, length){
    interval =  setInterval(() => {
      time--
      if(time == 0){
        clearInterval(interval)
        if (current < (length - 1)){
          Button.click()
        }
      }
      timer.innerHTML = `0${time}`
    }, 1000);
  }
}
data()
function showData(data, number, num){
  radios[0].checked = true
  Tilte.innerHTML = data.question
  for(i = 0; i < data.answers.length; i++){
      labels[i].innerHTML = data.answers[i]
  }
  qunmber.innerHTML = number
  currentQ.innerHTML = currentQN
  bar.style.cssText = `
    width: calc((100% / ${number})* ${currentQN});
  `
}