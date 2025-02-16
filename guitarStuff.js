
const Notes = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];

/**
 * Builds a table out of flexboxes.
 * @param {int} columns 
 * @param {int} rows 
 */
const fakeTable = (columns = 24,rows = 6) => {
    let parent = document.getElementById('lower');
    let tab = document.createElement('table');
    for (let a = 0; a < rows+1; a++) {
        let row = document.createElement('tr');
        row.id = `${a}`;
        for (let b = 0; b < columns+1; b++) {
            let column = document.createElement('td');
            if (a == 0) {
                column.innerHTML = `${b}`;
                column.classList.add('header');
            }
            b % 12 == 0 && b > 0? column.classList.add('oct') : null;
            if (b == 0 && a !== 0) {
                let list = document.createElement('select');
                Notes.forEach(item => {
                    let i = document.createElement('option');
                    i.textContent = `${item}`;
                    list.appendChild(i);
                    column.appendChild(list);
                    })
                list.addEventListener('change',() => {
                    let pc = Notes.indexOf(list.value);
                    let frets = document.querySelectorAll(`.row${a}`);
                    for (let c = 1; c <= frets.length; c++) {
                        let oct = Math.floor(c/12);
                        frets[c].innerHTML = `${Notes[(pc+c)%12]}${"'".repeat(oct)}`;
                    }
                    })
                }
                column.id = `col${b}:row${a}`;
                column.classList.add(`row${a}`);
                row.appendChild(column);
            }
            tab.appendChild(row);
        }
        parent.appendChild(tab);
    }

const attach = () => {
    document.querySelectorAll('td:not(.header)').forEach(item => {
        item.addEventListener('mouseover',() => {
            //In progress
        })
    })
}

const noteSelect = (parent) => {
    let par = document.getElementById(parent);
    let list = document.createElement('select');
        Notes.forEach(item => {
        let i = document.createElement('option');
        i.textContent = `${item}`;
        list.appendChild(i);
        elem.appendChild(list);
    })
}

document.addEventListener('DOMContentLoaded',() => {
    console.log('Connected!')
    let primaryIn = document.getElementById('strings');
    primaryIn.addEventListener('keydown',(event) => {
        if (event.key === 'Enter') {
            document.getElementById('lower').innerHTML = '';
            fakeTable(24,parseInt(primaryIn.value));
            console.log('TRIGGERED!');
        }
    })
})