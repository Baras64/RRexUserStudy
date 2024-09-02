var tutorialId = new URLSearchParams(window.location.search).get('tutorial');
//console.log('tutorialId', tutorialId);
table = document.getElementById('map-table');



quesTitle = document.getElementById('ques-title')
legend = document.getElementById('legend-div')
containerInfo = document.getElementsByClassName('container-info')[0]
tutorial1 = document.getElementById('tutorial-1')
// tutorial2 = document.getElementById('tutorial-2')
// tutorial3 = document.getElementById('tutorial-3')

// console.log(tutorialId)

if(tutorialId === '1'){
    quesTitle.style.display = 'none';
    table.style.display = 'none';
    legend.style.display = 'none';

    tutorial1.style.display = 'block';
    // tutorial2.style.display = 'none';
    // tutorial3.style.display = 'none';

} else if(tutorialId === '2') {

    // tutorial1.style.display = 'none';
    // tutorial2.style.display = 'block';
    // tutorial3.style.display = 'none';

    quesTitle.style.display = 'none';
    // table.style.display 
    legend.style.display = 'none';
    containerInfo.style.display = 'none';
    temp = setInterval(() => {
        // console.log("hey")
        if(table.rows.length > 0){
            rows = table.rows;
            rows[0].style.display = "none";
            rows[1].style.display = "none";
            for (let i = 2; i < rows.length; i++) {
                cells = rows[i].cells;
                for (let j = 3; j < cells.length; j++) {
                    cells[j].style.display = "none";
                }
            }
            clearInterval(temp);
        }
    }, 100);
    // table.rows[0].style.display = "none";
} else if(tutorialId === '3') {

    // tutorial1.style.display = 'none';
    // tutorial2.style.display = 'none';
    // tutorial3.style.display = 'block';

    quesTitle.style.display = 'none';
    containerInfo.style.display = 'none';
} else if (tutorialId === '12') {
    quesTitle.style.display = 'none';
    // table.style.display 
    legend.style.display = 'none';
    // containerInfo.style.display = 'none';
    temp = setInterval(() => {
        // console.log("hey")
        if(table.rows.length > 0){
            rows = table.rows;
            rows[0].style.display = "none";
            rows[1].style.display = "none";
            for (let i = 2; i < rows.length; i++) {
                cells = rows[i].cells;
                for (let j = 3; j < cells.length; j++) {
                    cells[j].style.display = "none";
                }
            }
            clearInterval(temp);
        }
    }, 100);
}

