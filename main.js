// Inputs
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');

// Prevenir q se envie el formulario vacio

form.addEventListener('submit', (e) =>{
    if(controlarEmail() && controlarPassword()) return true;
    e.preventDefault();
})


// Validaciones
const controlarEmail = () =>{
    if ( controlarCampoVacio (email, email.nextElementSibling)) return;
    if (!pwCaseRequirement (email, 5, email.nextElementSibling)) return;
    return true;
}

const controlarPassword = () =>{
    if ( controlarCampoVacio (password, password.nextElementSibling)) return;
    if ( !pwLengthRequirement(password, 6, 20, password.nextElementSibling)) return;
    //switch para comprobar parametros de seguridad
    /*  case1: solo letras
        case2: letras y numeros
        case3: letra mayuscula y numero 
        case4: letra mayuscula, numero y simbolo
        case5: control de email */
    if (!pwCaseRequirement (password, 2, password.nextElementSibling)) return;
    return true;
}

const mostrarContraseña = () => {
    if (password.type === "password"){
        password.type = "text";
    } else {
        password.type = "password";
    }
}

//Funciones de control
const controlarCampoVacio = (campo, campoSibiling) => {
    if(estaVacio(campo.value.trim())){
        //seteamos el campo a invalido
        setCampoInvalido(campo, `${campo.name} no debe estar vacio`, campoSibiling);
        
        return true;
    } else{
        //seteamos el campo a valido
        setCampoValido (campo, campoSibiling);
        return false;
    }
}

const estaVacio = (valor) => {
    if (valor === ''){
        return true;
    } else {
        return false;
    }
}

const setCampoInvalido = (campo, mensaje, sibiling) => {
    campo.style.borderColor = 'red';
    sibiling.innerHTML = mensaje;
    sibiling.style.color = 'red';
}

const setCampoValido = (campo, sibiling) => {
    campo.style.borderColor = 'green';
    sibiling.innerHTML = '';
    sibiling.style.color = 'green';
}

const pwLengthRequirement = (campo, minLength, maxLength, sibiling) => {
    if (campo.value.length >= minLength && campo.value.length <= maxLength){
        setCampoValido(campo, sibiling);
        return true;
    } else if( campo.value.length < minLength){
        setCampoInvalido(campo, `${campo.name} debe contener al menos ${minLength} caracteres `, sibiling);
        return false;
    }else{
        setCampoInvalido(campo, `${campo.name} debe contener menos de ${maxLength} caracteres `, sibiling );
        return false;
    }
    
}

const pwCaseRequirement = (campo, numberCase , sibiling) =>{
    //para comprobar los casos, vamos a utilizar expresiones regulares
    let regEx;
    switch(numberCase){
        case 1:
            regEx = /(?=.*[a-zA-Z])/;
            return comprobarRegEx (regEx, campo, `Debe contener solo letras`, sibiling);
        case 2:
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return comprobarRegEx (regEx,campo,`Debe contener al menos una letra y un número` ,sibiling );
        case 3:
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return comprobarRegEx (regEx,campo,`Debe contener al menos una letra mayuscula y un número` ,sibiling );
        case 4:
            regEx =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return comprobarRegEx (regEx,campo,`Debe contener al menos una letra mayuscula, un número y un simbolo` ,sibiling );
        case 5:
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return comprobarRegEx (regEx,campo,`Debe ser un email valido` ,sibiling );
        default:
            return false;
    }
}

const comprobarRegEx = (regEx, campo, mensaje, sibiling) => {
    if( campo.value.match(regEx)){
        setCampoValido(campo, sibiling);
        return true;
    } else
        setCampoInvalido(campo, mensaje, sibiling);
        return false;
}