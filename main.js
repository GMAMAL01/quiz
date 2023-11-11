let qunmber = document.querySelector("footer span.Qnumber")
let currentQ = document.querySelector("footer span.currentQ")
let labels = document.querySelectorAll("label")
let radios = document.querySelectorAll("input.radio")
let Button = document.querySelector("button.next")
let previous = document.querySelector("button.previous")
let Tilte = document.querySelector("p.title")
let bar = document.querySelector(".bar span")
let timer = document.querySelector("header p span")
let score = document.querySelector(".score")
let percentage = document.querySelector(".score .percentage")
let percentageSpan = document.querySelector(".score .percentage span")
let review = document.querySelector(".score  .review")
let current = 0
let currentQN = 1
let correctAnswers = 0 
let interval 
let counter = 0
let Time = 20
let scale = 10
function data(){
let request = new XMLHttpRequest()
request.open("GET", "data.json", true)
request.onreadystatechange = function(){
    if(this.status === 200 && this.readyState === 4){
        let jsopject = JSON.parse(this.responseText)
        let random = jsopject["questions"].sort((a, b) => .5 - Math.random())
        showData(random[current], random.length, 0)
        data(random, random.length)
        intervel(Time,  random.length)
        
     
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
        intervel(Time,  random.length)
        current++
        currentQN++
        showData(random[current], random.length, 0)
        
      }else{
        Button.style.cssText  = `
       pointer-events: none;
        `
        clearInterval(interval)
        score.style.cssText = `display: block;`
        let stop = Math.round(correctAnswers / length * 100)
       let counterin = setInterval(() => {
        if(correctAnswers !== 0){

          counter++
        }
        scale++
        percentageSpan.textContent  = `${counter}%`
        
        percentage.style.cssText = `background-image: conic-gradient(#e88232 ${counter * 3.6}deg, white 0deg);
        scale: 1.0${scale};`
          if (counter === stop){
            clearInterval(counterin)
          }
        }, 15);
      }

    })
    previous.addEventListener("click", function(){
      for(i = 0; i < labels.length; i++){
        labels[i].classList.remove("correct")
      }
      if(current !== 0){
        current--
        currentQN--

      }
      showData(random[current], random.length, 0)
      radios[0].checked = false
      labels[random[current]["correctAnswer"]].classList.add("correct")
    })
    review.addEventListener("click", function(){
      score.style.cssText = `display: none;`
      Button.style.cssText = `display: none;`
      previous.style.cssText = `display: block;`
      for(i = 0; i < radios.length; i++){
        radios[i].checked = false
      }
      labels[random[current]["correctAnswer"]].classList.add("correct")
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
      time = time < 10 ? `0${time}` : time
      timer.innerHTML = time
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

