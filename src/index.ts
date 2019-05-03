import './styles.css';

const billAmountInput: HTMLInputElement = <HTMLInputElement>document.getElementById('billAmount');
const billAmountLabel: HTMLElement = <HTMLElement>document.getElementById('liBillAmount');
const tipPercentageLabel: HTMLElement = <HTMLElement>document.getElementById('liTipPercentage');
const amountOfTipLabel: HTMLElement = <HTMLElement>document.getElementById('liAmountOfTip');
const totalPaidLabel: HTMLElement = <HTMLElement>document.getElementById('liTotalPaid');

let _percentSelected: boolean = false;
let _percent: number = 0;

billAmountInput.addEventListener('input', () => compute());
document.getElementById('twoPercent').addEventListener('click', () => setTipPercent(2));
document.getElementById('tenPercent').addEventListener('click', () => setTipPercent(10));
document.getElementById('fifteenPercent').addEventListener('click', () => setTipPercent(15));
document.getElementById('twentyPercent').addEventListener('click', () => setTipPercent(20));
document.getElementById('customPercent').addEventListener('click', () => toggleCustom());

readLocalStorage();

function setTipPercent(percent: number) {
    _percentSelected = true;
    _percent = percent;
    setTipMessage(_percent);
    compute();

    window.localStorage.setItem("tipPercent", _percent.toString());
}

function setTipMessage(percent: number) {
    let tipMessage: HTMLElement = <HTMLElement>document.getElementById('tipMessage');

    if (percent >= 10) {
        tipMessage.innerText = "You are tipping " + percent.toString() + "%";
    } else {
        tipMessage.innerText = "You are tipping " + percent.toString() + "%.  Why are you so cheap?!  Did they spit in your food?";
    }
}

function toggleCustom() {

}

function compute() {
    if (billAmountInput.value.length > 0) {
        let amount: number = parseFloat(billAmountInput.value);

        if (amount < 0) {
            billAmountInput.classList.add("badInput");

            setDefaultText();
        } else {
            billAmountInput.classList.remove("badInput");
            billAmountLabel.innerText = "Bill Amount: $" + amount.toString();
            tipPercentageLabel.innerText = "Tip Percentage: " + _percent.toString() + "%";

            if (_percentSelected) {
                let tip: number = (amount * _percent / 100);
                amountOfTipLabel.innerText = "Amount of tip: $" + tip.toString();
                let total: number = amount + tip;
                totalPaidLabel.innerText = "Total to be Paid: $" + total.toString();
            }
        }
    } else {
        setDefaultText();
    }
}

function setDefaultText() {
    billAmountLabel.innerText = "Bill Amount: ";
    tipPercentageLabel.innerText = "Tip Percentage: ";
    amountOfTipLabel.innerText = "Amount of tip: ";
    totalPaidLabel.innerText = "Total to be Paid: ";
}

function readLocalStorage() {
    let percent: string = window.localStorage.getItem("tipPercent");
    if (percent.length > 0) {
        switch (percent) {
            case "2":
                setTipPercent(2);
                document.getElementById("twoPercent").classList.add("focus");
                document.getElementById("twoPercent").classList.add("active");
                break;
            case "10":
                setTipPercent(10);
                document.getElementById("tenPercent").classList.add("focus");
                document.getElementById("tenPercent").classList.add("active");
                break;
            case "15":
                setTipPercent(15);
                document.getElementById("fifteenPercent").classList.add("focus");
                document.getElementById("fifteenPercent").classList.add("active");
                break;
            case "20":
                setTipPercent(20);
                document.getElementById("twentyPercent").classList.add("focus");
                document.getElementById("twentyPercent").classList.add("active");
                break;
            default:
        }
    }


}
