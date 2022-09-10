document.querySelector('.control-buttons span').onclick = function() {
    yourName = prompt('Enter Your Name');

    if (yourName == null || yourName == "") {
        document.querySelector('.name span').innerHTML = "Unknown";
    } else {
        document.querySelector('.name span').innerHTML = yourName;

    }

    document.querySelector('.control-buttons').remove();

}

let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange)
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', function() {

        flipped(block)
    })
})


function flipped(selectedBlock) {

    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        stopClicking();

        Match(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

function Match(fristBlock, secondBlock) {

    let triesNumber = document.querySelector('.tries span')

    if (fristBlock.dataset.technology == secondBlock.dataset.technology) {
        fristBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        fristBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    } else {

        triesNumber.innerHTML = parseInt(triesNumber.innerHTML) + 1;

        setTimeout(() => {
            fristBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration)

        document.getElementById('fail').play();

    }
}

function stopClicking() {
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration)
}

function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
}