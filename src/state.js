import { createMachine, interpret } from 'xstate';

const sendEventAfter = (time, event) => {
  
    return () => cb => {
        const interval = setInterval(() => {
            cb(event)
        }, time);
        return () => {
          clearInterval(interval)
        }
    } 
}

const isInfected = () => {
    return Math.floor(Math.random() * Math.floor(2)) === 0;
  }

const analyzeMachine = createMachine({
    id: 'analyze',
    initial: 'idle',
    states: {
        idle: {
            on:
            {
                ON_FINGER_DOWN: 'measuring',
            }
        },
        measuring: {
            on: { 
                ON_FINGER_UP: 'idle',
                FINISHED_MEASURING: 'analyzing'
            },
            invoke: {
                src: sendEventAfter(2500, 'FINISHED_MEASURING')
            }
        },
        analyzing: {
            on: {
                ANALYZE_FINISHED: 'results'
            },
            invoke: {
                src: sendEventAfter(3000, 'ANALYZE_FINISHED')
            }
        },
        results: {
            on: {
                INFECTED: 'infected',
                HEALTHY: 'healthy'
            },
            invoke: {
                src: () => (cb) => {
                  
                    if (isInfected()) {
                        cb('INFECTED')
                    } else  {
                        cb('HEALTHY')
                    }
                }
            }
        },
        infected: {
            on: {
                RESET: 'idle'
            }
        },
        healthy: {
            on: {
                RESET: 'idle'
            }
        }
    }
});

export const createStateMachine = (onStateChange) => {

    const analyzeService = interpret(analyzeMachine)
        .onTransition(state => onStateChange(state.value))
        .start();

    return analyzeService
}
