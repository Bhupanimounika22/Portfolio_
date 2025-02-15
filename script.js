document.addEventListener('DOMContentLoaded', function() {
 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

 
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
 
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
 

const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];


let puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];


function generatePuzzle() {
    document.getElementById('grid-container').innerHTML = '';  
    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '9';
        input.value = puzzle[row][col] !== 0 ? puzzle[row][col] : '';
        input.disabled = puzzle[row][col] !== 0;  
        input.addEventListener('input', moveToNextCell);  

        cell.appendChild(input);
        document.getElementById('grid-container').appendChild(cell);
    }
}


function moveToNextCell(event) {
    const input = event.target;
    if (input.value.length === 1) {
        
        const index = Array.from(document.querySelectorAll('.grid-cell input')).indexOf(input);
        const nextInput = document.querySelectorAll('.grid-cell input')[index + 1];

        if (nextInput && nextInput.disabled === false) {
            nextInput.focus();
        }
    }
}

function checkSolution() {
    const inputs = document.querySelectorAll('.grid-cell input');
    let isValid = true;

    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = parseInt(input.value);
        if (value !== solution[row][col] && value !== 0) {
            isValid = false;
            input.style.backgroundColor = 'red'; 
        } else {
            input.style.backgroundColor = '';  
        }
    });

    if (isValid) {
        alert('Congratulations, the solution is correct!');
    } else {
        alert('There are some incorrect entries!');
    }
}


function newGame() {
    puzzle = generateNewPuzzle();
    generatePuzzle();
}

function generateNewPuzzle() {
    const newPuzzle = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
  
    const randomCells = shuffleAndRemoveCells(newPuzzle);
    return randomCells;
}

function shuffleAndRemoveCells(grid) {
    const gridCopy = grid.map(row => row.slice());
    let numberOfEmptyCells = 40; 

    while (numberOfEmptyCells > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (gridCopy[row][col] !== 0) {
            gridCopy[row][col] = 0;
            numberOfEmptyCells--;
        }
    }
    return gridCopy;
}

function showSolution() {
    const inputs = document.querySelectorAll('.grid-cell input');
    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        input.value = solution[row][col]; 
        input.disabled = true;  
    });
}

window.onload = generatePuzzle;


 
    document.addEventListener("DOMContentLoaded", function () {
        const themeToggle = document.getElementById("theme-toggle");
        const themeIcon = document.getElementById("theme-icon");
        const root = document.documentElement; // Apply to the root element

        function applyTheme(theme) {
            if (theme === "dark") {
                root.classList.add("dark-theme");
                themeIcon.innerHTML = "☀️"; // Sun icon for light mode
                themeToggle.innerHTML = '<span id="theme-icon">☀️</span> Switch to Light Mode';
            } else {
                root.classList.remove("dark-theme");
                themeIcon.innerHTML = "🌙"; // Moon icon for dark mode
                themeToggle.innerHTML = '<span id="theme-icon">🌙</span> Switch to Dark Mode';
            }
        }

        // Load saved theme preference
        const savedTheme = localStorage.getItem("theme") || "light";
        applyTheme(savedTheme);

        themeToggle.addEventListener("click", function () {
            const currentTheme = root.classList.contains("dark-theme") ? "light" : "dark";
            localStorage.setItem("theme", currentTheme);
            applyTheme(currentTheme);
        });
    });
 


