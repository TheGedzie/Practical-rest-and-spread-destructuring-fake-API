import { URL } from './URL.js'
const main = document.querySelector('main')

const createCard = ({name, avatar, age, emain, gender, address, ...id}) => {

    const card = document.createElement('div')
    card.classList.add('card')

    const cardLeft = document.createElement('div')
    cardLeft.classList.add('card__left')
    const names = document.createElement('span')
    names.textContent = name 
    const ages = document.createElement('span')
    ages.textContent = age
    const emains = document.createElement('span')
    emains.textContent = emain
    const addresss = document.createElement('span')
    addresss.textContent = address
    cardLeft.append(names,ages,emains,addresss)

    const cardRight = document.createElement('div')
    const avatars = document.createElement('img')
    avatars.classList.add('card__right-avatar')
    avatars.src = avatar;
    const genders = document.createElement('span')
    genders.textContent = gender
    cardRight.classList.add('card__right')
    cardRight.append(avatars, genders)
    card.append(cardLeft, cardRight)
    main.append(card)
}



const getUsers = async (URL) => {
    try{
        const response = await fetch(URL)
        if(!response.ok){
            throw new Error(`Error ---> ${response.status}, ${response.statusText}`)
        }
        const data = await response.json()
        return data
    }
    catch(e){
        console.error('New error', e)
    }
}

const renderCards = async () => {
   const data = await getUsers(URL)
   data.forEach(element => {
        createCard(element)
   });
}


renderCards()