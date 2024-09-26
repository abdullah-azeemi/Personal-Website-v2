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
    populatePortfolio(portfolioData);
    setLanguage('en');

    // Setup the canvas animation
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    
    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    setupCanvas();

    var stars = [], FPS = 60, starCount = 100, mouse = { x: 0, y: 0 };

    for (var i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1 + 1,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";

        stars.forEach(s => {
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        });

        ctx.beginPath();
        stars.forEach(starI => {
            ctx.moveTo(starI.x, starI.y);
            if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
            stars.forEach(starII => {
                if (distance(starI, starII) < 150) {
                    ctx.lineTo(starII.x, starII.y);
                }
            });
        });
        ctx.lineWidth = 0.05;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(mouse.x, mouse.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    function distance(point1, point2) {
        var xs = point2.x - point1.x;
        var ys = point2.y - point1.y;
        return Math.sqrt(xs * xs + ys * ys);
    }

    function update() {
        stars.forEach(s => {
            s.x += s.vx / FPS;
            s.y += s.vy / FPS;

            if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
            if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
        });
    }

    canvas.addEventListener('mousemove', function(e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('touchmove', function(e) {
        var touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    });

    function tick() {
        draw();
        update();
        requestAnimationFrame(tick);
    }

    window.addEventListener('resize', function() {
        setupCanvas();  // Redraw the canvas when the size changes
    });

    tick();
};

// Back to Top Button functionality
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
                <img src="images/${project.image}" alt="Project Image" class="active">
                <video controls>
                    <source src="${project.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="media-controls">
                    <span class="dot" onclick="showMedia(this, 'image')">Image</span>
                    <span class="dot" onclick="showMedia(this, 'video')">Video</span>
                </div>
            </div>
        </div>`;
        projectsSection.insertAdjacentHTML('beforeend', projectHTML);
    });

    const certTabs = document.querySelector('.cert-tabs');
    const certContents = document.querySelectorAll('.cert-content');
    data.certifications.forEach((cert, index) => {
        certTabs.innerHTML += `<button class="tab-link ${index === 0 ? 'active' : ''}" onclick="openCertification(event, 'cert${index+1}')">${cert.title}</button>`;
        certContents[index].querySelector('img').src = cert.img;
    });

    const footerIcons = document.querySelector('#footer .icons');
    footerIcons.innerHTML = data.socialLinks.map(link => `<li><a href="${link.link}" target="_blank" class="fab fa-${link.name.toLowerCase()}"></a></li>`).join('');
}
