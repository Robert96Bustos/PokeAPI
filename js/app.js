// El minimo es incluido y el máximo excluido
// console.log(getRandomInt(1, 151));
// getRandomInt(1, 151) {}

// Usamos el MathRandom para el numero aleatorio
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// Se dispara cuando el HTML a sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151)
    fetchData(random)
})

// Hacer solicitud de pokemones
// Async porque necesitamos que se espere a que traigamos la información
const fetchData = async(id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            // lo transformamos a JSON
        const data = await res.json()
        console.log(data)

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            attack: data.stats[1].base_stat,
            def: data.stats[2].base_stat,
            speed: data.stats[5].base_stat
        }

        pintarCard(pokemon)

    } catch (error) {
        // Error por si nos equivocamos o escribimos mal
        console.log(error)
    }
}

// Pintar en HTML o Card
const pintarCard = (pokemon) => {
    console.log(pokemon)
        // donde irá nuestro template
    const container = document.querySelector('.container')
        // capturamos el template
    const template = document.querySelector('#template-card').content
        // Creamos nuestro clon del template anterior
    const clone = template.cloneNode(true)
        // El fragment es algo invisible quje se genera solamente en JS y no interfiere el HTML
    const fragment = document.createDocumentFragment()

    // acceder a la data
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre}<span>${pokemon.hp} hp</span>`
    clone.querySelector('.card-body-text').innerHTML = `<p>${pokemon.exp} exp</p>`

    // Text content para texto plano del html
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.def
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.speed

    // que guarde en el fragment 
    fragment.appendChild(clone)
        // lo pasamos al contenedor
    container.appendChild(fragment)
}