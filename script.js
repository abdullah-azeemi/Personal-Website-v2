const languageData = {
    en: {
        home: "Home",
        projects: "Projects",
        certifications: "Certifications",
        contact: "Contact",
        welcomeMessage: "Hi, I'm Abdullah Musharaf",
        aboutTitle: "About Me",
        aboutText: "I am a junior computer science student with a strong passion for software development and machine learning. My experience includes developing web applications using Flask and integrating AI APIs to enhance functionality. My background in coding competitions has sharpened my problem-solving skills, and I am enthusiastic about contributing to innovative projects while continuing to grow my expertise in Python development."
    },
    es: {
        home: "Inicio",
        projects: "Proyectos",
        certifications: "Certificaciones",
        contact: "Contacto",
        welcomeMessage: "Hola, soy Abdullah Musharaf",
        aboutTitle: "Sobre mí",
        aboutText: "Soy un estudiante de informática junior con una gran pasión por el desarrollo de software y el aprendizaje automático. Mi experiencia incluye el desarrollo de aplicaciones web utilizando Flask e integración de APIs de IA para mejorar la funcionalidad. Mi experiencia en competiciones de codificación ha agudizado mis habilidades para resolver problemas, y estoy entusiasmado por contribuir a proyectos innovadores mientras continúo desarrollando mi experiencia en el desarrollo en Python."
    },
    fr: {
        home: "Accueil",
        projects: "Projets",
        certifications: "Certifications",
        contact: "Contact",
        welcomeMessage: "Salut, je suis Abdullah Musharaf",
        aboutTitle: "À propos de moi",
        aboutText: "Je suis un étudiant en informatique de niveau junior avec une forte passion pour le développement logiciel et l'apprentissage automatique. Mon expérience inclut le développement d'applications web avec Flask et l'intégration d'APIs d'IA pour améliorer les fonctionnalités. Mon parcours en compétitions de codage a aiguisé mes compétences en résolution de problèmes, et je suis enthousiaste à l'idée de contribuer à des projets innovants tout en continuant à développer mon expertise en développement Python."
    }
};

window.onload = function() {
    console.log("Script loaded and DOM is ready!");
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext('2d');

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    setupCanvas(); 

    var stars = [],
        FPS = 60,
        numberOfStars = 180,
        mouse = { x: 0, y: 0 };

    for (var i = 0; i < numberOfStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: Math.floor(Math.random() * 20) - 10,
            vy: Math.floor(Math.random() * 20) - 10
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";

        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            ctx.fillStyle = "rgba(21, 0, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.beginPath();
        for (var i = 0; i < stars.length; i++) {
            var starI = stars[i];
            ctx.moveTo(starI.x, starI.y);

            if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);

            for (var j = 0; j < stars.length; j++) {
                var starII = stars[j];
                if (distance(starI, starII) < 120) {
                    ctx.lineTo(starII.x, starII.y);
                }
            }
        }

        ctx.lineWidth = 0.1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
    }

    function distance(point1, point2) {
        var xs = point2.x - point1.x,
            ys = point2.y - point1.y;
        return Math.sqrt(xs * xs + ys * ys);
    }

    function update() {
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            s.x += s.vx / FPS;
            s.y += s.vy / FPS;

            if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
            if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
        }
    }

    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', setupCanvas); // Handle resizing

    function tick() {
        draw();
        update();
        requestAnimationFrame(tick);
    }

    tick();
};

const portfolioData = {
    name: "Abdullah Musharaf",
    title: "Software Developer",
    bio: "I am a junior computer science student...",
    certifications: [
        { title: "Certification 1", img: "cert1.jpg" },
        { title: "Certification 2", img: "cert2.jpg" }
    ],
    socialLinks: [
        { name: "LinkedIn", link: "https://linkedin.com" },
        { name: "GitHub", link: "https://github.com" }
    ]
};


function populatePortfolio(data) {
    document.querySelector('.header-text h1').innerHTML = `Hi, I'm <span>${data.name}</span>`;
    document.querySelector('.header-text p').innerHTML = data.title;
    document.querySelector('.about-col-2 p').textContent = data.bio;

    const projectsSection = document.getElementById('projects-container');
    data.projects.forEach(project => {
        const projectHTML = `
        <div class="project">
            <div class="project-text">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="btn">Learn More</a>
            </div>
            <div class="project-media">
                <img src="images/${project.image}" alt="Project Image">
            </div>
        </div>`;
        projectsSection.insertAdjacentHTML('beforeend', projectHTML);
    });
}


window.onscroll = function() {
    let backToTop = document.getElementById("back-to-top");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
};

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});

// Language Dropdown Menu and Text Replacement
function toggleLangMenu() {
    document.getElementById('lang-menu').classList.toggle('show');
}
function setLanguage(lang) {
    document.getElementById('home-link').textContent = languageData[lang].home;
    document.getElementById('projects-link').textContent = languageData[lang].projects;
    document.getElementById('certifications-link').textContent = languageData[lang].certifications;
    document.getElementById('contact-link').textContent = languageData[lang].contact;
    document.querySelector('.header-text h1').textContent = languageData[lang].welcomeMessage;
    document.querySelector('.sub-title').textContent = languageData[lang].aboutTitle;
    document.querySelector('.about-col-2 p').textContent = languageData[lang].aboutText;
    document.querySelector('.lang-btn').innerHTML = `${languageData[lang].home} <i class="fas fa-caret-down"></i>`;
    toggleLangMenu();
}

window.onclick = function(event) {
    if (!event.target.matches('.lang-btn')) {
        const dropdowns = document.getElementsByClassName("lang-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

function openTab(tabName, event) {
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabLinks.forEach(tab => tab.classList.remove('active-link'));
    tabContents.forEach(tab => tab.classList.remove('active-tab'));

    event.currentTarget.classList.add('active-link');
    document.getElementById(tabName).classList.add('active-tab');
}

