// declare variebles
let getInput = document.querySelector('#input');
let btn = document.querySelector('form .btn');
let getDiv = document.querySelector('.board');

let getSearch = document.forms['search'];
getSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    let flag = true;
    let getItem = document.querySelector('h3');
    // remove the old board and replace the new board
    if (getItem) {
        getDiv.innerHTML = '';
        flag = false;
    } else if (getInput.value === '') {
        getDiv.style.display = 'block';
        getDiv.innerHTML = 'Hi! you forgot to type a word';
        getDiv.style.textAlign = 'center';
    }

    getDiv.style.display = 'block';

    // Fetch the data from the internet
    async function myDic() {
        // if the input value is not typed, there is error,
        // so the fetch data from the internet will not work
        let res = await fetch('https://dictionaryapi.com/api/v3/references/collegiate/json/' + getInput.value + '');
        let data = await res.json();
        // access to meta
        let getMeta = data[0];

        if (getMeta.fl === undefined) {
            getDiv.innerHTML = 'This word does not exist!';
            getDiv.style.textAlign = 'center';
        } else {
            getDiv.innerHTML = '';
            getDiv.style.textAlign = '';

            // word
            let getHeader = document.createElement('h3');
            getHeader.append(getInput.value);
            getDiv.append(getHeader);

            // Type of word
            let getP = document.createElement('p');
            getP.append(getMeta.fl);
            getDiv.append(getP);

            // getAudio
            let getSpeaker = document.createElement('div');
            getSpeaker.classList.add('speaker');
            getSpeaker.innerHTML = '&#128264;';
            getDiv.append(getSpeaker);

            let getAudioId = getMeta.hwi.prs[0].sound.audio;
            let getLetter = getAudioId.charAt(0);

            let getAudio = new Audio('https://media.merriam-webster.com/audio/prons/en/us/mp3/' + getLetter + '/' + getAudioId + '.mp3');
            let speaker = document.querySelector('.speaker');
            speaker.addEventListener('click', () => {
                getAudio.play();
            })

            // Create the list of definition
            let getUl = document.createElement('ul');
            getMeta.shortdef.forEach(item => {
                let getLi = document.createElement('li');
                getLi.append(item);
                getUl.append(getLi);
            })

            getDiv.append(getUl);
        }
    }

    // call function
    myDic().catch(error => {
        console.log('Error!');
        // check if the input field is empty and the old word is there
        if ((getDiv.style.display = 'block') && (getInput.value === '') && (flag === false)) {
            getDiv.innerHTML = 'Hi! you forgot to type a word';
            getDiv.style.textAlign = 'center';
            flag = true;
        }
    });
    // to reset the value of the input field
    getInput.value = "";
});
