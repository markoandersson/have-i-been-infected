import { createStateMachine } from "./state";

const fingerprintReader = document.getElementById('fingerprint-scanner')
const textLabel = document.getElementById('label');
const resetButton = document.getElementById('reset')
const scanningAnimation = document.getElementById('scanning-animation')

const showAnalyzingIndicator = (show) => {
  
    const analyzingIndicator = document.getElementById('analyzing-indicator')
    const childDivs = document.getElementsByClassName('dot-loader')

    analyzingIndicator.style.display = !show ? "none": "flex"
    Array.from(childDivs).forEach(element => {
        element.hidden = !show
    });
}


const machine = createStateMachine((state) => {

    if (state === 'idle') {
        textLabel.innerText = 'Place your finger to the reader and wait for the measurement to complete'
        textLabel.classList.remove('text-green-600', 'text-red-600', 'text-3xl')
        textLabel.classList.add('text-gray-100', 'text-xl')
        resetButton.hidden = true
        showAnalyzingIndicator(false)
        fingerprintReader.hidden = false
        scanningAnimation.hidden = true
    } else if (state === 'measuring'){
        textLabel.innerText = 'Measuring...'
        scanningAnimation.hidden = false
    } else if (state === 'analyzing') {
        textLabel.innerText = 'Analyzing the results...'
        scanningAnimation.hidden = true
        fingerprintReader.hidden = true
        showAnalyzingIndicator(true)
    } else if (state === 'healthy') {
        textLabel.innerText = 'You are probably healthy'
        resetButton.hidden = false
        textLabel.classList.remove('text-gray-100', 'text-xl')
        textLabel.classList.add('text-green-600', 'text-3xl')
        showAnalyzingIndicator(false)
    } else if (state === 'infected') {
        textLabel.innerText = 'You migth have been infected'
        textLabel.classList.remove('text-gray-100', 'text-xl')
        textLabel.classList.add('text-red-600', 'text-3xl')
        resetButton.hidden = false
        showAnalyzingIndicator(false)
    }
})

fingerprintReader.ontouchstart = (event) => {
    machine.send('ON_FINGER_DOWN')
    // event.preventDefault()
}

fingerprintReader.ontouchend = () => {
  machine.send('ON_FINGER_UP')
}

resetButton.onclick = () => {
  machine.send('RESET')
}

window.addEventListener("contextmenu", function(e) { e.preventDefault(); })