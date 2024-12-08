const numsCheckBx = document.querySelector('#numbers');
const capitalsCheckBx = document.querySelector('#capitals');
const symbolsCheckBx = document.querySelector('#symbols');
const passwordTxtEl = document.querySelector('#password');
const lengthSlider = document.getElementById("length-slider");
const lengthSliderTxt = document.getElementById("slider-label");
const copyPswdBtn = document.querySelector('#copy-pswd');
const genPswdBtn = document.querySelector('#gen-pswd');


const symbols = {
    dom: symbolsCheckBx,
    chars: '!@#$*&%',
    selected: true
};

const numbers = {
    dom: numsCheckBx,
    chars: '0123456789',
    selected: true
};

const capitals = {
    dom: capitalsCheckBx,
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    selected: true
};

const options = [symbols, numbers, capitals];
let generatedPswd;

lengthSlider.addEventListener('input', () => {
    lengthSliderTxt.innerHTML = lengthSlider.value;
    generatedPswd = createPswd(options);
    passwordTxtEl.textContent = generatedPswd;
});

options.forEach(opt => opt.dom.addEventListener('input', () => {
    opt.selected === false ? opt.selected = true : opt.selected = false;
    generatedPswd = createPswd(options);
    passwordTxtEl.textContent = generatedPswd;
}));

passwordTxtEl.addEventListener('click', () => {
    const dummy = document.createElement("textarea");
    dummy.value = passwordTxtEl.textContent;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
});

genPswdBtn.addEventListener('click', () => {
    generatedPswd = createPswd(options);
    passwordTxtEl.textContent = generatedPswd;
});


function createPswd(options) {

    const pswdLength = lengthSlider.value;
    let pswdChars = ['abcdefghijklmnopqrstuvwxyz'];
    let pswd = '';

    options.forEach(opt => opt.selected ? pswdChars.push(opt.chars) : pswdChars);

    for (let i = 0; pswd.length < pswdLength; i++) {

        if (pswdLength >= 14 && i !== 0 && i !== pswdLength && i % 4 === 0) {
            pswd += '-';
        }

        const typeOfChar = pswdChars[randInt(0, pswdChars.length - 1)];
        pswd += typeOfChar[randInt(0, typeOfChar.length - 1)];
    }

    return pswd;
}


const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

passwordTxtEl.innerHTML = createPswd(options);