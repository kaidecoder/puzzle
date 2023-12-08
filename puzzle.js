let image = new Image();
image.width = 800;
image.height = 800;
image.src = './images/holiday-bells.webp';
let imagePieces = []
function cutImageUp() {
    // imagePieces = [];
    for(let x = 0; x < 8; ++x) {
        for(let y = 0; y < 8; ++y) {
            let canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            let context = canvas.getContext('2d');
            context.drawImage(image, x * 100, y * 100, 100, 100, 0, 0, 400, 400);
            imagePieces.push(canvas.toDataURL());
        }
 
    }

    // imagePieces now contains data urls of all the pieces of the image
    // load one piece onto the page
    // let anImageElement = document.getElementById('puzzle');
    // anImageElement.src = imagePieces[0];
    
}
const content = document.querySelector(".content")
console.log(cutImageUp())

// const randomNumber = Math.floor(Math.random() * 64)
// console.log(randomNumber)

console.log(imagePieces.length)

for(let i=0; i<64; i++){
    content.innerHTML += `
    
        <img src="${imagePieces[i]}" class="draggable" draggable="true" alt="image" />
    
    `
}

const draggables = document.querySelectorAll(".draggable")
const containers = document.querySelectorAll(".container")

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {

        // console.log('drag start')
        draggable.classList.add("dragging")
    })

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging")
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        // console.log('drag over')
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector(".dragging")
        if(afterElement == null){
            container.appendChild(draggable)
        }else{
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height/2
        console.log(offset)
        if(offset < 0 && offset > closest.offset){
            return { offset: offset, element: child}
        }else{
            return closest
        }
        console.log(box)

    }, {offset: Number.NEGATIVE_INFINITY}).element
}

