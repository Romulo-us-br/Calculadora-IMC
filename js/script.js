const data = [ 
    {
        min:0,
        max:18.4,
        classification:"Menor que 18,5",
        info:"Magreza",
        obesity:"0",
    },
    {
        min:18.5,
        max:24.9,
        classification:"Entre 18,5 e 24,9",
        info:"Normal",
        obesity:"0",
    },
    {
        min:25,
        max:29.9,
        classification:"Entre 25,0 e 29,9",
        info:"Sobrepeso",
        obesity:"I",
    },
    {
        min:30,
        max:39.9,
        classification:"Entre 30,0 e 39,9",
        info:"Obesidade",
        obesity:"II",
    },
    {
        min:40,
        max:99.9,
        classification:"Maior que 40,0",
        info:"Obesidade Grave",
        obesity:"III",
    },
];

// seleção
const imctable=document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

// Funções
function createTable(data){
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity; 

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imctable.appendChild(div);
    });
}

function cleanInputs(){
    heightInput.value = "";
    weightInput.value = "";
}

// Função de validação de Numeros e virgula
function validDigits(text){
    return text.replace(/[^0-9,]/g, "");
}

function calcImc(weight,height) {
    const imc = (weight / (height*height)).toFixed(1);
    return imc;
}
// Inicialização
createTable(data);
// Eventos

// Validação de numeros
[heightInput, weightInput].forEach((el)=>{
    el.addEventListener("input", (e)=> {
        const updateValue = validDigits(e.target.value);

        e.target.value = updateValue;
    });
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    if(!weight || !height ) return;

    const imc = calcImc(weight,height);

    let info;

    data.forEach((item) =>{
        if(imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });

    if(!info) return;
});


clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs();
})