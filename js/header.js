const menuBtn = document.getElementById('menu-icon')
const menu = document.getElementById('menu')
const svgPath = menuBtn.querySelector('path')

const xIco = 'M17 7L7 17M7 7L17 17'
const menuIco = 'M3 12H21M3 6H21M3 18H21'

menuBtn.onclick = () => {
    const att = svgPath.getAttribute('d')

    if (att == menuIco) {
        svgPath.setAttribute('d', xIco)
    } else {
        svgPath.setAttribute('d', menuIco)
    }

    menu.classList.toggle('visible')
}