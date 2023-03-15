let display = document.querySelector('[data-display]')
let error = document.querySelector('[data-error]')

let buttons = Array.from(document.querySelectorAll('[data-button]'))

buttons.map(button => {
    button.addEventListener('click', (e) => {
        switch (e.target.innerText){
            case 'AC':
                if(error.innerText !== ''){
                    error.innerText = ''    
                }
                display.innerText = '';
                break;
            case 'DEL':
                display.innerText = display.innerText.slice(0, -1);
                break;
            case '=':
                try {
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = ''
                    error.innerText = 'INVALID OPERATION'
                }
                break;
            default:
            if(error.innerText !== ''){
                error.innerText = ''    
            }
            display.innerText += e.target.innerText;
        }
    })
})