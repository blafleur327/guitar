/**
 * Notes object necessary for various things.
 */
const Notes = ['C','C♯/D♭','D','D♯/E♭','E','F','F♯/G♭','G','G♯/A♭','A','A♯/B♭','B'];


/**
 * Builds a real table...
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
                list.addEventListener('click',() => {  
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
            let string = item.id.match(/[0-9]+/ig);
            let targ = document.getElementById('display');
            targ.innerHTML = `String ${string[1]} fret ${string[0]} = ${item.textContent}`;
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
            // attach();
        }
    })
})