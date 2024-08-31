let audioText = document.getElementById('audio-text');

let targetAudio = document.getElementById('target-audio');
let counterfactualAudio = document.getElementById('counterfactual-audio');

let targetEmotion = document.getElementById('target-emotion');
// let counterfactualEmotion = document.getElementById('counterfactual-emotion');

let mapTable = document.getElementById('map-table');
// let counterfactualSelect = document.getElementById('counterfactual-emotion-select');

let audioTarget = document.getElementById('play-target');
let audioCf = document.getElementById('play-counterfactual');

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

audioTarget.addEventListener('click', function () {
    // targetAudio.src = "example1/word_clips/cf_are_6.wav";
    targetAudio.play();
});

audioCf.addEventListener('click', function () {
    // counterfactualAudio.src = "example1/word_clips/tgt_are_6.wav";
    counterfactualAudio.play();
});

const idx2cueidx = {
    0: "loudness",
    1: "average_pitch",
    2: "pitch_range",
    3: "speed",
    4: "pauses"
}

const cueidx2cue = {
    "loudness": "loudness",
    "average_pitch": "average pitch",
    "pitch_range": "pitch range",
    "speed": "time",
    "pauses": "pauses"
}

const rlt2color = {
    "Lower": "#E74B3C",
    "Shorter": "#E74B3C",
    "Higher": "#3498DB",
    "Longer": "#3498DB",
    "Similar": "#BDC3C7",
    "More": "#3498DB",
    "Less": "#E74B3C",
    "Faster": "#3498DB",
}

const sessionColor2hex = {
    "blue": "rgb(69, 170, 227)",
    "purple": "#9659d4"
}

// counterfactualSelect.addEventListener('change', function(){
//     console.log("Counterfactual emotion changed to: ", counterfactualSelect.value);
// });

function addBothAudioPlayback(leftElement, rightElement, leftPath, rightPath) {

    leftElement.style.cursor = "pointer";
    rightElement.style.cursor = "pointer";

    oldColor = leftElement.style.backgroundColor;

    let leftAudio = new Audio(`${leftPath}`);
    let rightAudio = new Audio(`${rightPath}`);

    leftElement.addEventListener('click', function () {
        leftAudio.onended = function () { return }
        rightAudio.onended = function () { return }
        leftElement.children[0].classList.remove('fa-play');
        leftElement.children[0].classList.add('fa-pause');
        leftAudio.play();
        leftAudio.onended = function () {
            leftElement.children[0].classList.remove('fa-pause');
            leftElement.children[0].classList.add('fa-play');
            rightAudio.play();
        }
    });

    rightElement.addEventListener('click', function () {
        leftAudio.onended = function () { return }
        rightAudio.onended = function () { return }
        rightElement.children[0].classList.remove('fa-play');
        rightElement.children[0].classList.add('fa-pause');
        rightAudio.play();
        rightAudio.onended = function () {
            rightElement.children[0].classList.add('fa-play');
            rightElement.children[0].classList.remove('fa-pause');
            leftAudio.play();
        }
    });

    leftAudio.addEventListener('play', function () {
        // leftElement.style.borderColor = "#67ed37";
        leftElement.children[0].style.display = "block";
        leftElement.children[0].classList.remove('fa-play');
        leftElement.children[0].classList.add('fa-pause');
        leftElement.style.borderColor = "orange";
    });

    rightAudio.addEventListener('play', function () {
        // rightElement.style.borderColor = "#67ed37";
        rightElement.children[0].style.display = "block";
        rightElement.children[0].classList.remove('fa-play');
        rightElement.children[0].classList.add('fa-pause');
        rightElement.style.borderColor = "orange";
    });

    leftAudio.addEventListener('ended', function () {
        leftElement.children[0].style.display = "none";
        leftElement.children[0].classList.remove('fa-pause');
        leftElement.children[0].classList.add('fa-play');
        leftElement.style.borderColor = "white";
    });

    rightAudio.addEventListener('ended', function () {
        rightElement.children[0].style.display = "none";
        rightElement.children[0].classList.remove('fa-pause');
        rightElement.children[0].classList.add('fa-play');
        rightElement.style.borderColor = "white";
    });

    leftElement.addEventListener('mouseover', function () {
        leftElement.children[0].style.display = "block";
        // leftElement.style.borderColor = leftElement.style.backgroundColor;
    });

    leftElement.addEventListener('mouseout', function () {
        if (!leftAudio.paused) {
            return
        }
        // leftElement.style.borderColor = "white";
        leftElement.children[0].style.display = "none";
    });

    rightElement.addEventListener('mouseover', function () {
        rightElement.children[0].style.display = "block";
        // rightElement.style.borderColor = rightElement.style.backgroundColor;
    });

    rightElement.addEventListener('mouseout', function () {
        if (!rightAudio.paused) {
            return
        }
        rightElement.children[0].style.display = "none";
        // rightElement.style.borderColor = "white";
    });

}

function createCapsule(colorLeft, colorRight, audioPathLeft, audioPathRight) {
    let container = document.createElement('div');
    container.classList.add('container-capsule');

    let leftShape = document.createElement('div');
    let leftPlayBtn = document.createElement('i');
    leftPlayBtn.classList.add('fa');
    leftPlayBtn.classList.add('fa-play');
    leftPlayBtn.classList.add('left-play-btn');
    leftPlayBtn.style.display = "none";

    leftShape.classList.add('left-shape');
    leftShape.style.backgroundColor = colorLeft;
    leftShape.style.borderColor = "white";

    leftShape.appendChild(leftPlayBtn)

    // addAudioPlayback(leftShape, audioPathLeft, true)

    let gap = document.createElement('div');
    gap.classList.add('gap');

    let rightShape = document.createElement('div');
    let rightPlayBtn = document.createElement('i');
    rightPlayBtn.classList.add('fa');
    rightPlayBtn.classList.add('fa-play');
    rightPlayBtn.classList.add('right-play-btn');
    rightPlayBtn.style.display = "none";

    rightShape.classList.add('right-shape');
    rightShape.style.backgroundColor = colorRight;
    rightShape.style.borderColor = "white";

    rightShape.appendChild(rightPlayBtn);

    // addAudioPlayback(rightShape, audioPathRight, true)

    addBothAudioPlayback(leftShape, rightShape, audioPathLeft, audioPathRight)

    container.appendChild(leftShape);
    container.appendChild(gap);
    container.appendChild(rightShape);

    container.style.justifyContent = "center";

    return container;
}

function createTriangle(colorLeft, colorRight, audioPathLeft, audioPathRight) {

    if (colorLeft == "white") {
        return document.createElement('div')
    }

    let container = document.createElement('div');
    container.classList.add('container-capsule');

    let leftShape = document.createElement('div');

    let leftPlayBtn = document.createElement('i');
    leftPlayBtn.classList.add('fa');
    leftPlayBtn.classList.add('fa-play');
    leftPlayBtn.classList.add('triangle-play-btn');
    leftPlayBtn.style.display = "none";

    leftShape.classList.add('triangle-left');
    leftShape.style.backgroundColor = colorLeft;
    // leftShape.style.borderColor = "white";
    leftShape.appendChild(leftPlayBtn);

    // addAudioPlayback(leftShape, audioPathLeft, false)

    let rightShape = document.createElement('div');

    let rightPlayBtn = document.createElement('i');
    rightPlayBtn.classList.add('fa');
    rightPlayBtn.classList.add('fa-play');
    rightPlayBtn.classList.add('triangle-play-btn');
    rightPlayBtn.style.display = "none";

    rightShape.classList.add('triangle-right');
    rightShape.style.backgroundColor = colorRight;
    // rightShape.style.borderColor = "white";
    rightShape.appendChild(rightPlayBtn);

    // addAudioPlayback(rightShape, audioPathRight, false)

    addBothAudioPlayback(leftShape, rightShape, audioPathLeft, audioPathRight)

    container.appendChild(leftShape);
    container.appendChild(rightShape);

    container.style.justifyContent = "center";
    container.style.paddingLeft = "10px";

    return container;
}

var emotions = ["angry", "surprise", "happy", "sad", "neutral"];

function insertPaddedCell(row, padding = '30px') {
    let cell = row.insertCell();
    cell.style.width = padding;
}

function loadTable(filename, isPlay = false) {

    mapTable.innerHTML = "";
    fetch(filename)
        .then(response => response.json())
        .then(data => {

            if (showAns == "true") {
                document.getElementById('ques-title').innerText = `The answer is ${data.target_emotion.capitalize()}`;
            }


            targetAudio.src = `${baseDir}${data.target_audio_path}`;
            counterfactualAudio.src = `${baseDir}${data.counterfactual_audio_path}`;

            targetAudio.onplay = function () {
                audioTarget.classList.remove('fa-play');
                audioTarget.classList.add('fa-pause');
            }

            targetAudio.onended = function () {
                audioTarget.classList.remove('fa-pause');
                audioTarget.classList.add('fa-play');
            }

            counterfactualAudio.onplay = function () {
                // audioCf.classList.remove('fa-play-circle');
                // audioCf.classList.add('fa-pause-circle');
                audioCf.classList.remove('fa-play');
                audioCf.classList.add('fa-pause');
            }

            counterfactualAudio.onended = function () {
                audioCf.classList.remove('fa-pause');
                audioCf.classList.add('fa-play');
            }

            // targetEmotion.innerText = data.target_emotion;
            // counterfactualEmotion.innerText = data.counterfactual_emotion;

            audio_text = data.text;

            audioText.innerHTML = `<i>"${audio_text}"</i>`;

            words = audio_text.split(" ");

            let row = mapTable.insertRow();

            cell = row.insertCell();
            cell.innerHTML = "For these words:";
            cell = row.insertCell();
            cell = row.insertCell();
            cell = row.insertCell();
            cell = row.insertCell();

            words.forEach(element => {
                let cell = row.insertCell();
                cell.innerText = element;
                row.insertCell();
            });

            row = mapTable.insertRow();
            cell = row.insertCell();
            cell.innerHTML = "This voice has:";

            for (let index = 0; index < 5; index++) {
                cueData = data[idx2cueidx[index]]
                let row = mapTable.insertRow();
                row.value = index;
                row.addEventListener('mouseover', function () {

                    Array.from(mapTable.rows).forEach(row => {
                        if (row.value <= 4 && row.value >= 0) {
                            if (row.value != index) {
                                row.style.opacity = 0.3;
                                row.style.transition = "opacity 0.3s";
                            }
                        }
                    });

                });
                row.addEventListener('mouseout', function () {
                    Array.from(mapTable.rows).forEach(row => {
                        if (row.value <= 4 && row.value >= 0) {
                            if (row.value != index) {
                                row.style.opacity = 1;
                            }
                        }
                    });
                });

                cell = row.insertCell();
                rltText = cueData.rlt
                cell.innerText = cueData.rlt;
                // cell.innerHTML = `<span style='color: ${rlt2color[rltText]}'>${cueData.rlt}</span> ${cueidx2cue[idx2cueidx[index]]}`;
                cueStr = cueidx2cue[idx2cueidx[index]]
                if (cueStr == "time") {
                    cueStr = "speaking time"
                }
                // cell.innerHTML = `<b style="color:rgb(69, 170, 227)">${cueData.rlt}</b> ${cueStr}`;
                cell.innerHTML = `<b style="color:${sessionColor}">${cueData.rlt}</b> ${cueStr}`;

                cell.classList.add("tooltip");


                possibleEmotions = emotionsMap[data.counterfactual_emotion.toLowerCase()][cueidx2cue[idx2cueidx[index].toLowerCase()]][cueData.rlt.toLowerCase()]

                if (possibleEmotions == undefined) {
                    possibleEmotions = [" "]
                } else {
                    possibleEmotions = possibleEmotions.map((e) => { return e.capitalize() })
                }

                newEmotionsArr = []

                for (const emotion in possibleEmotions) {


                    emotionName = possibleEmotions[emotion]

                    if (emotionName.length < 2) {
                        elem = `<span style="display: inline-flex; flex-direction: row; align-items: center;">
                        </span>`
                    } else {
                        elem = `<span style="display: inline-flex; flex-direction: row; align-items: center;">
                        <u style="font-size: 12px; margin: 5px;"><b>${emotionName}</b></u>
                        <img src="./icons/${emotionName.toLowerCase()}.svg"/>
                        </span>`
                    }

                    newEmotionsArr.push(elem);
                }

                cueStr = cueidx2cue[idx2cueidx[index]].toLowerCase()
                if (cueStr == "time") {
                    cueStr = "speaking time"
                }

                if (cueData.rlt == "Similar") {
                    // cell.title = `Actual has ${cueData.rlt.toLowerCase()} ${cueidx2cue[idx2cueidx[index]].toLowerCase()} to ${data.counterfactual_emotion}`;
                    let elem = document.createElement('span');
                    elem.classList.add("tooltiptext");
                    elem.innerHTML = `<u>Actual</u> has ${cueData.rlt.toLowerCase()} ${cueStr} to ${data.counterfactual_emotion} <br> Actual could be:${newEmotionsArr.join(",")}`;
                    cell.appendChild(elem);
                } else {
                    // cell.title = `Actual has ${cueData.rlt.toLowerCase()} ${cueidx2cue[idx2cueidx[index]].toLowerCase()} than ${data.counterfactual_emotion}`;
                    let elem = document.createElement('span');
                    elem.classList.add("tooltiptext");
                    elem.innerHTML = `<u>Actual</u> has ${cueData.rlt.toLowerCase()} ${cueStr} than ${data.counterfactual_emotion} <br> Actual could be:${newEmotionsArr.join(",")}`;
                    cell.appendChild(elem);
                }

                insertPaddedCell(row, '10px');

                icon = document.createElement('img');
                icon.src = `./icons/${idx2cueidx[index].toLowerCase()}.svg`;
                icon.style.width = "16px";

                cell = row.insertCell();
                cell.appendChild(icon);

                insertPaddedCell(row, '5px');

                // cell = row.insertCell();
                // cell.innerText = cueidx2cue[idx2cueidx[index]];

                insertPaddedCell(row);

                words.forEach((element, idx) => {
                    let colorLeft = cueData["left"][idx];
                    // let colorRight = cueData["right"][idx];
                    //Intentionally kept it to left
                    let colorRight = cueData["left"][idx];

                    if(colorLeft !== "lightgray"){
                        colorLeft = sessionColor;
                    }
                    if(colorRight !== "lightgray"){
                        colorRight = sessionColor;
                    }
                    let cell = row.insertCell();

                    if (index == 4) {
                        capsule = createTriangle(colorLeft, colorRight, `${baseDir}${data.tgt_pause_word_clips[idx]}`, `${baseDir}${data.cf_pause_word_clips[idx]}`);
                    } else {
                        capsule = createCapsule(colorLeft, colorRight, `${baseDir}${data.tgt_word_clips[idx]}`, `${baseDir}${data.cf_word_clips[idx]}`);
                    }

                    cell.appendChild(capsule);
                    insertPaddedCell(row);

                });

            }

            if (isPlay) {
                counterfactualAudio.play();
            }

        });

}

// counterfactualSelect.addEventListener('change', function () {

//     let emotion = counterfactualSelect.value;
//     console.log("Counterfactual emotion changed to: ", emotion);

//     let filename = `./${baseDir}/data_${emotion}.json`;
//     loadTable(filename, isPlay = true);
// });

var newEmotions = [];
var targetEmo = ""

/*async function checkFile(emotions) {
    let response;
    for (let i = 0; i < emotions.length; i++) {

        response = await fetch(`${baseDir}${id}/data_${emotions[i]}.json`);
        if (response.ok) {
            // console.log("File exists")
            newEmotions.push(emotions[i])
        } else {
            // console.log("File does not exist")
            targetEmo = emotions[i]
        }
    }
}*/

// var baseDir = `example${new URLSearchParams(window.location.search).get("example")}`;
var showAns = new URLSearchParams(window.location.search).get("showAns");
var cf = new URLSearchParams(window.location.search).get("cf");

var baseDir = `${new URLSearchParams(window.location.search).get("xaitype")}/${new URLSearchParams(window.location.search).get("audiotype")}/`;
var id = new URLSearchParams(window.location.search).get("id");
var sessionColor = sessionColor2hex[new URLSearchParams(window.location.search).get("color")]

document.getElementById('left-shape-ui').style.backgroundColor = sessionColor;
document.getElementById('right-shape-ui').style.backgroundColor = sessionColor;

loadTable(`${baseDir}${id}/data_${cf.toLowerCase()}.json`);

/* checkFile(emotions).then(() => {

    // counterfactualSelect.innerHTML = "";
    // newEmotions.forEach(emotion => {
    //     let option = document.createElement('option');
    //     option.value = emotion;
    //     option.innerText = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    //     counterfactualSelect.appendChild(option)
    // });

    // console.log(baseDir, id, cf)
    elem = document.getElementById('counterfactual-emotion-text')
    // emotionFile = newEmotions[Math.floor(Math.random() * newEmotions.length)];
    // elem.innerText = emotionFile.capitalize();

    elem.innerText = cf.capitalize();

    // loadTable(`./${baseDir}/data_${emotionFile}.json`);
    loadTable(`${baseDir}${id}/data_${cf.toLowerCase()}.json`);
}); */
// loadTable("");


let emotionsMap = {
    'angry': {
        'loudness': {
            'similar': ['angry'],
            'lower': ['happy', 'sad', 'neutral'],
            'higher': ['surprise']
        },
        'average pitch': {
            'similar': ['angry', 'happy'],
            'lower': ['neutral', 'sad'],
            'higher': ['surprise']
        },
        'pitch range': {
            'similar': ['angry', 'surprise'],
            'lower': ['neutral', 'sad'],
            'higher': ['happy']
        },
        'time': {
            'similar': ['angry'],
            'longer': ['sad'],
            'shorter': ['happy', 'neutral', 'surprise']
        },
        'pauses': {
            'similar': ['angry'],
            'lower': ['happy', 'neutral', 'sad', 'surprise'],
            'higher': ['']
        }
    },
    'surprise': {
        'loudness': {
            'similar': ['surprise'],
            'lower': ['angry', 'happy', 'neutral', 'sad'],
            'higher': ['']
        },
        'average pitch': {
            'similar': ['surprise'],
            'lower': ['angry', 'happy', 'neutral', 'sad'],
            'higher': ['']
        },
        'pitch range': {
            'similar': ['angry', 'surprise'],
            'lower': ['neutral', 'sad'],
            'higher': ['happy']
        },
        'time': {
            'similar': ['happy', 'surprise'],
            'longer': ['angry', 'sad'],
            'shorter': ['neutral']
        },
        'pauses': {
            'similar': ['happy', 'surprise'],
            'lower': ['neutral'],
            'higher': ['angry', 'sad']
        }
    },
    'happy': {
        'loudness': {
            'similar': ['happy'],
            'lower': ['neutral', 'sad'],
            'higher': ['angry', 'surprise']
        },
        'average pitch': {
            'similar': ['angry', 'happy'],
            'lower': ['neutral', 'sad'],
            'higher': ['surprise']
        },
        'pitch range': {
            'similar': ['happy'],
            'lower': ['angry', 'neutral', 'sad', 'surprise'],
            'higher': ['']
        },
        'time': {
            'similar': ['happy', 'surprise'],
            'longer': ['angry', 'sad'],
            'shorter': ['neutral']
        },
        'pauses': {
            'similar': ['happy', 'neutral', 'surprise'],
            'lower': [''],
            'higher': ['angry', 'sad']
        }
    },
    'sad': {
        'loudness': {
            'similar': ['sad'],
            'lower': ['neutral'],
            'higher': ['angry', 'happy', 'surprise']
        },
        'average pitch': {
            'similar': ['neutral', 'sad'],
            'lower': [''],
            'higher': ['angry', 'happy', 'surprise']
        },
        'pitch range': {
            'similar': ['neutral', 'sad'],
            'lower': [''],
            'higher': ['angry', 'happy', 'surprise']
        },
        'time': {
            'similar': ['sad'],
            'longer': [''],
            'shorter': ['angry', 'happy', 'surprise', 'neutral']
        },
        'pauses': {
            'similar': ['sad'],
            'lower': ['happy', 'neutral', 'surprise'],
            'higher': ['angry']
        }
    },
    'neutral': {
        'loudness': {
            'similar': ['neutral'],
            'lower': [''],
            'higher': ['angry', 'happy', 'sad', 'surprise']
        },
        'average pitch': {
            'similar': ['neutral', 'sad'],
            'lower': [''],
            'higher': ['angry', 'happy', 'surprise']
        },
        'pitch range': {
            'similar': ['neutral', 'sad'],
            'lower': [''],
            'higher': ['angry', 'happy', 'surprise']
        },
        'time': {
            'similar': ['neutral'],
            'longer': ['angry', 'happy', 'surprise', 'sad'],
            'shorter': ['']
        },
        'pauses': {
            'similar': ['happy', 'neutral'],
            'lower': [''],
            'higher': ['angry', 'sad', 'surprise']
        }
    }
}

