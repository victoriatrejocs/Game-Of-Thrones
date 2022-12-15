class Character{
    constructor(fullName,imageUrl, title, family){
    this.fullName = fullName
    this.imageUrl=imageUrl
    this.title=title
    this.family=family
}

getName(){
    return this.fullName
}

getImage(){
    return this.imageUrl
}

getTitle(){
    return this.title
}

getFamily(){
    return this.family
}
}

let characters=[]
let element=document.getElementById("characters-wrapper")

const inputSearchBar=document.getElementById("searchBar")

function buildCharacterCard(fullName, imageUrl, title, family){
    return `
    <div class="column">
    <div class="card">
    <h2 class="name">${fullName}</h2>
    <p>
    <img src="${imageUrl}" height="270" width="270"/>
    </p>
    <h4>${title}</h4>
    <p>${family}</p>
    </div>
    </div>
    `
}

async function getCharacters(){
    let url="https://thronesapi.com/api/v2/Characters"

    const response=await fetch(url)
    const data= await response.json()

    data.forEach(datum => {
        let newCharacter = new Character (datum.fullName, datum.imageUrl, datum.title, datum.family)
        characters.push(newCharacter)
    })

    characters.forEach((character) => {
        element.innerHTML+=buildCharacterCard(
            character.getName(),
            character.getImage(),
            character.getTitle(),
            character.getFamily()
        )
    })
}

function resetData(){
    characters.length=0
    element.innerHTML=null
    getCharacters()
}

function searchCharacters(){
    setTimeout(()=>{
        const consulta=inputSearchBar.value
        const filteredCharacters=characters.filter(character=>character.fullName.toLowerCase().includes(consulta.toLowerCase()))
    if(filteredCharacters.length>0){
        element.innerHTML=null
        filteredCharacters.forEach((filteredCharacter) => {
            element.innerHTML+=buildCharacterCard(
                filteredCharacter.getName(),
                filteredCharacter.getImage(),
                filteredCharacter.getTitle(),
                filteredCharacter.getFamily()
            )
        })
    }
}, 500)
}

function orderCharacters(){
    const selector= document.getElementById("sort").value

    if(selector==="none"){
        resetData()
        return null
    }

    const orderedCharacters=characters.sort((a,b) => {
        let characterA=a.fullName.toLowerCase()
        let characterB=b.fullName.toLowerCase()


    if(selector==="aToZ"){
        if(characterA<characterB){
            return -1
        }
    }else if(selector==="zToA"){
        if(characterA>characterB){
            return -1
        }
    }else{
        return 0
    }
})

if(orderedCharacters.length>0){
    element.innerHTML=null
    orderedCharacters.forEach((orderedCharacter)=>{
        element.innerHTML+=buildCharacterCard(
            orderedCharacter.getName(),
            orderedCharacter.getImage(),
            orderedCharacter.getTitle(),
            orderedCharacter.getFamily()
        )
    })
}
}

getCharacters()