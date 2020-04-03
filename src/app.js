import { createStateMachine } from "./state";

const showAnalyzingIndicator = (show) => {

    const analyzingIndicator = document.getElementById('analyzing-indicator')
    const childDivs = document.getElementsByClassName('dot-loader')

    analyzingIndicator.style.display = !show ? "none" : "flex"
    Array.from(childDivs).forEach(element => {
        element.hidden = !show
    });
}
const show = (element) => {
    element.classList.remove('hidden')
}

const hide = (element) => {
  element.classList.add('hidden')
}

const afterPageLoad = () => {

    const fingerprintReader = document.getElementById('fingerprint-scanner')
    const textLabel = document.getElementById('label');
    const resetButton = document.getElementById('reset')
    const scanningAnimation = document.getElementById('scanning-animation')
    const backgroundImage = document.getElementById('background-image')

    const machine = createStateMachine((state) => {


        if (state === 'idle') {
            textLabel.innerText = 'Place your finger to the reader and wait for the measurement to complete'
            textLabel.classList.remove('text-green-600', 'text-red-600', 'text-3xl')
            textLabel.classList.add('text-gray-100', 'text-xl')
            hide(resetButton)
            hide(scanningAnimation)
            showAnalyzingIndicator(false)
            show(fingerprintReader)
            backgroundImage.classList.remove('deblur')

        } else if (state === 'measuring') {
            textLabel.innerText = 'Measuring...'
            show(scanningAnimation)
        } else if (state === 'analyzing') {
            textLabel.innerText = 'Analyzing the results...'
            hide(scanningAnimation)
            hide(fingerprintReader)
            showAnalyzingIndicator(true)
            backgroundImage.classList.add('deblur')
        } else if (state === 'healthy') {
            textLabel.innerText = 'You are probably healthy'
            show(resetButton)
            textLabel.classList.remove('text-gray-100', 'text-xl')
            textLabel.classList.add('text-green-600', 'text-3xl')
            showAnalyzingIndicator(false)
        } else if (state === 'infected') {
            textLabel.innerText = 'You migth have been infected'
            textLabel.classList.remove('text-gray-100', 'text-xl')
            textLabel.classList.add('text-red-600', 'text-3xl')
            show(resetButton)
            showAnalyzingIndicator(false)
        }
    })

    fingerprintReader.ontouchstart = (event) => {
        machine.send('ON_FINGER_DOWN')
        event.preventDefault()
    }

    fingerprintReader.ontouchend = () => {
        machine.send('ON_FINGER_UP')
    }

    resetButton.onclick = () => {
        machine.send('RESET')
    }

}

window.addEventListener("load", () => {
    afterPageLoad()
})

window.addEventListener("contextmenu", function (e) { e.preventDefault(); })