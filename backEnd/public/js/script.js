
let sockStep = 1
const sockContainer = document.querySelector(".sockContainer")
const newSock = document.querySelector(".newSock")
const cancelNewSock = document.querySelector(".cancel")
const continueNewSock = document.querySelector(".continue")
const newForm = document.querySelector(".newForm")
const fullSock = document.querySelector(".sideSock")
const sockTop = document.querySelector(".sideSockTop")
const sockBody = document.querySelector(".sideSockBody")
const sockStripe = document.querySelector(".sideSockStripe")
const sockBottom = document.querySelector(".sideSockBottom")
const moreVertStripes = document.querySelector("#more-vert")
const lessVertStripes = document.querySelector("#less-vert")
const moreHorzStripes = document.querySelector("#more-horz")
const lessHorzStripes = document.querySelector("#less-horz")
const containerX = document.querySelector(".containerx")
const delButton = document.querySelector(".delete")
const showSock = document.querySelector(".showSock")
const editBtn = document.querySelector(".edit")

let currentSock = {};

if (sockContainer != null) {
    for (let i = 0; i < sockContainer.children.length; i++) {
        sockContainer.children[i].addEventListener('click', () => { viewSock(sockContainer.children[i].id) })
    }
}
if (delButton != null) {
    delButton.addEventListener('click', () => {deleteSock(showSock.id)})
}
function deleteSock(id) {
    let payload = id;
    axios.delete(`/socks/${payload}`)
    .then(() => {
        location.replace('/socks')
    })
}

const sockColors = ["6b705c", "a5a58d", "e76f51", "2a9d8f", "e9c46a", "ffe8d6",
                    "e63946", "a8dadc", "457b9d", "264653", "b7b7a4", "cb997e", 
                    "b5838d", "6d6875", "e5989b", "ffb4a2", "ccd5ae", "283618", 
                    "800f2f", "a4133c", "f15bb5", "9b5de5", "f28482", "000814", 
                    "f8f9fa", "6c757d", "e0fbfc", "4d194d", "ffffff", "000000",
                    "ff595e", "ffca3a", "8ac926", "fad2e1", "fde2e4", "eae4e9"];

function viewSock(id) {
    location.replace("/socks/" + id)
}

if (containerX != null) {
    let sockTop = document.querySelector(".showSockTop")
    let sockBody = document.querySelector(".showSockBody")
    let sockStripe = document.querySelector(".showSockStripe")
    let sockBottom = document.querySelector(".showSockBottom")
    editBtn.addEventListener("click", editShow)
    sockTop.addEventListener("click", changeColor)
    sockBody.addEventListener("click", changeColor)
    sockStripe.addEventListener("click", changeColor)
    sockBottom.addEventListener("click", changeColor)
    for (let i = 0; i < 19; i++) {
        let rand = Math.floor(Math.random() * sockColors.length)
        let colored = document.createElement("div")
        colored.style.backgroundColor = "#" + sockColors[rand]
        console.log(colored.style.backgroundColor)
        containerX.appendChild(colored)
    }
    let string = "1fr ".repeat(20)
    containerX.style.gridTemplateRows = string;
    let confirm = false
    function editShow() {
        let helperText = document.querySelector(".smalltext")
        helperText.classList.remove("hidden")
        if (confirm) {
            editAxios()
        } else {
            editBtn.innerHTML = "Confirm Edit"
            confirm = true
        }
    }
    function returnStripes() {
        let ret = [];
        for (let i = 0; i < sockBody.childElementCount; i++) {
            ret.push(sockBody.children[i].style.backgroundColor)
        }
        return ret;
    }
    function editAxios() {
        let stripesColors = returnStripes()
        let payload = {
            sockColors: [sockTop.style.backgroundColor, sockStripe.style.backgroundColor, sockBottom.style.backgroundColor],
            stripeColors: stripesColors,
            gridRows: sockBody.style.gridTemplateRows,
            gridCols: sockBody.style.gridTemplateColumns,
        };
        axios.put('/socks/' + showSock.id, { id: showSock.id, payload: payload })
        .then(() => location.replace("/socks"))
    }
}

if (newSock != null) {
    newSock.addEventListener('click', () => {
        const inners = document.querySelectorAll(".inner");
        newSock.classList.add("hidden")
        cancelNewSock.classList.remove("hidden")
        continueNewSock.classList.remove("hidden")
    
        for (let i = 0; i < inners.length; i++) {
            inners[i].addEventListener('click', changeColor)
        }
        sockTop.addEventListener('click', changeColor)
        sockBody.addEventListener('click', changeColor)
        sockStripe.addEventListener('click', changeColor)
        sockBottom.addEventListener('click', changeColor)
        moreHorzStripes.addEventListener('click', () => { updateHorzStripe("more") })
        lessHorzStripes.addEventListener('click', () => { updateHorzStripe("less") })
        moreVertStripes.addEventListener('click', () => { updateVertStripe("more") })
        lessVertStripes.addEventListener('click', () => { updateVertStripe("less") })
        currentSock = {
            horzStripes: 1,
            vertStripes: 1,
        }
        sockBody.gridTemplateRows = "1fr"
        sockBody.gridTemplateColumns = "1fr"
    });
    
    cancelNewSock.addEventListener('click', cancel)
    continueNewSock.addEventListener('click', continueSock)
    
    function cancel() {
        currentSock = {
            horzStripes: 1,
            vertStripes: 1,
        }
        sockTop.removeEventListener('click', changeColor)
        sockBody.removeEventListener('click', changeColor)
        sockStripe.removeEventListener('click', changeColor)
        sockBottom.removeEventListener('click', changeColor)
        moreHorzStripes.removeEventListener('click', () => { updateHorzStripe("more") })
        lessHorzStripes.removeEventListener('click', () => { updateHorzStripe("less") })
        moreVertStripes.removeEventListener('click', () => { updateVertStripe("more") })
        lessVertStripes.removeEventListener('click', () => { updateVertStripe("less") })
        resetSideSock()
        newSock.classList.remove("hidden")
        cancelNewSock.classList.add("hidden")
        continueNewSock.classList.add("hidden")
    }
    
    function continueSock() {
        let stripesColors = getStripes()
        let payload = {
            sockColors: [sockTop.style.backgroundColor, sockStripe.style.backgroundColor, sockBottom.style.backgroundColor],
            stripeColors: stripesColors,
            gridRows: sockBody.style.gridTemplateRows,
            gridCols: sockBody.style.gridTemplateColumns,
        };
        resetSideSock()
        axios.post('/socks', payload)
        .then((res) => {
            location.reload();
        })
        cancel()
    }
    
    function getStripes() {
        let ret = [];
        for (let i = 0; i < sockBody.childElementCount; i++) {
            ret.push(sockBody.children[i].style.backgroundColor)
        }
        return ret;
    }
    
    function updateHorzStripe(param) {
        console.log(currentSock.horzStripes)
        if (param == "more") {
            if (currentSock.horzStripes >= 25) {
                currentSock.horzStripes = 25;
            } else {
                currentSock.horzStripes += 1
                createRow()
            }
        } else if (param == 'less') {
            if (currentSock.horzStripes <= 1) {
                currentSock.horzStripes = 1;
            } else {
                destroyRow()
                currentSock.horzStripes -= 1
            }
        } else {
            console.log("potential bug")
        }
    }
    
    function updateVertStripe(param) {
        if (param == "more") {
            if (currentSock.vertStripes >= 16) {
                currentSock.vertStripes = 16;
            } else {
                currentSock.vertStripes += 1
                createCol()
            }
        } else if (param == 'less') {
            if (currentSock.vertStripes <= 1) {
                currentSock.vertStripes = 1;
            } else {
                destroyColumn()
                currentSock.vertStripes -= 1
            }
        } else {
            console.log("potential bug")
        }
    }
    function destroyColumn() {
        let column = currentSock.vertStripes;
        for (let i = currentSock.horzStripes; i >= 1; i--) {
            let el = document.getElementById(`${i}:${column}`);
            el.remove();
        }
        let string = " 1fr".repeat(column - 1);
        sockBody.style.gridTemplateColumns = string;
    }
    function destroyRow() {
        let row = currentSock.horzStripes;
        for (let i = currentSock.vertStripes; i >= 1; i--) {
            let el = document.getElementById(`${row}:${i}`);
            el.remove();
        }
        let string = " 1fr".repeat(row - 1);
        sockBody.style.gridTemplateRows = string;
    }
    function createCol() {
        let col = currentSock.vertStripes;
        for (let i = 1; i <= currentSock.horzStripes; i++) {
            let newStripe = document.createElement("div");
            newStripe.id = i + ":" + col;
            sockBody.appendChild(newStripe)
        }
        let string = "1fr ".repeat(col);
        sockBody.style.gridTemplateColumns = string
    }
    function createRow() {
        let row = currentSock.horzStripes;
        for (let i = 1; i <= currentSock.vertStripes; i++) {
            let newStripe = document.createElement("div");
            newStripe.id = row + ":" + i;
            sockBody.appendChild(newStripe)
        }
        let string = "1fr ".repeat(row);
        sockBody.style.gridTemplateRows = string
    }
    
    function resetSideSock() {
        sockTop.style.backgroundColor = null
        sockBody.innerHTML = "<div></div>";
        sockBody.style.gridTemplateRows = null
        sockBody.style.gridTemplateColumns = null
        sockBody.style.backgroundColor = null
        sockStripe.style.backgroundColor = null
        sockBottom.style.backgroundColor = null
        sockBody.gridTemplateRows = "1fr"
        sockBody.gridTemplateColumns = "1fr"
    }
    
}
let index = 0
function changeColor(e) {
    e.target.style.backgroundColor = "#" + sockColors[index]
    index++
    if (index >= sockColors.length - 1) {
        index = 0;
    }
}
