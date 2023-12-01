const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
let fruits = ["🍇", "🍉", "🍊", "🍓", "🍌", "🍎"];

//Controla a roração da roda
const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
]

//Tamanho das fatias
const data = [16, 16, 16, 16, 16, 16];

//Cor das fatias
var pieColors = [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3"
];

//Desenha um grafico em pizza, que será a nossa roleta
let myChart = new Chart(wheel, {
    //Mostramos o texto em cada fatia do grafico
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        //Valores no grafico
        labels: [fruits[0], fruits[1], fruits[2], fruits[3], fruits[4], fruits[5]],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data
            },
        ],
    },
    options: {
        //Design do grafico responsivo
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            //Mostrar os valores dentro do grafico
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 44 }
            },
        },
    },
});

//Mostra o valor baseado em um angulo aleatorio
const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p>Resultado: ${showResult(i.value)}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

const showResult = (value) => {
    return fruits[value - 1]
}

//Contador de rotações
let count = 0;
//Animação gira 100 vezes e uma ultima rotação para ober o resultado
let resultValue = 101;

//Ininiar o giro
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = '<p>Boa Sorte!</p>';
    //Gera um angulo aleatório e para
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Intervalo da animação de rotação
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        //Se a rotação é maior que 360, volta a 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval)
            count = 0;
            resultValue = 101;
        }
    }, 10);
});
