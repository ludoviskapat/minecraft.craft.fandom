let discovered = ["stone","log","water"]

let recipes = {
    "log": "plank",
    "plank,plank": "stick"
}

let grid = new Array(9).fill(null)

const itemsDiv = document.getElementById("items")
const crafting = document.getElementById("crafting")
const result = document.getElementById("result")

function texture(item){
    return "textures/" + item + ".png"
}

function renderItems(){

    itemsDiv.innerHTML=""

    discovered.forEach(item=>{
        let div=document.createElement("div")
        div.className="item"

        div.innerHTML = `<img src="${texture(item)}"> ${item}`

        div.onclick=()=>placeItem(item)

        itemsDiv.appendChild(div)
    })
}

function renderGrid(){

    crafting.innerHTML=""

    grid.forEach((item,i)=>{

        let slot=document.createElement("div")
        slot.className="slot"

        if(item){
            slot.innerHTML=`<img src="${texture(item)}">`
        }

        slot.onclick=()=>{
            grid[i]=null
            renderGrid()
        }

        crafting.appendChild(slot)
    })
}

function placeItem(item){

    let index = grid.indexOf(null)

    if(index!=-1){
        grid[index]=item
        renderGrid()
        checkRecipe()
    }
}

function checkRecipe(){

    let items = grid.filter(x=>x)

    let key = items.join(",")

    if(recipes[key]){

        let newItem = recipes[key]

        result.innerHTML = `<img src="${texture(newItem)}">`

        if(!discovered.includes(newItem)){
            discovered.push(newItem)
            renderItems()
        }
    }
}

renderItems()
renderGrid()
