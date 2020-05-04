import 'alpinejs'
import { createStateMachine } from "./state";

window.HaveIBeenInfected = function() {
  
    return {
        state: '',
        init() {
            this.machine = createStateMachine((state) => {
                this.state = state
            })
        },
        pressScanner() {
            this.machine.send('ON_FINGER_DOWN')
        },
        releaseScanner() {
            this.machine.send('ON_FINGER_UP')
        },
        measureAgain() {
            this.machine.send('RESET')
        },
        showFingerprintScanner() {
            return this.isIdle() || this.isMeasuring()
        },
        showResetButton() {
            return this.isHealthy() || this.isInfected()
        },
        deblurBackground() {
            return this.isAnalyzing() || this.isHealthy() || this.isInfected()
        },
        isIdle() {
            return this.state === 'idle'
        },
        isMeasuring() {
            return this.state === 'measuring'
        },
        isAnalyzing() {
            return this.state === 'analyzing'
        },
        isHealthy() {
            return this.state === 'healthy'
        },
        isInfected() {
            return this.state === 'infected'
        },
        isNotMobile() {
            return this.state === 'not_mobile'
        }
    }
}

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})