window.onload = function() { 
    console.log("Script loaded and DOM is ready!");

    populatePortfolio(portfolioData);
    setLanguage('en');

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var stars = [], 
        FPS = 60, 
        starCount = 100, 
        mouse = { x: 0, y: 0 };

    // Create stars
    for (var i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1 + 1,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25
        });
    }

    // Draw the stars and the lines between them, and the mouse circle
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.globalCompositeOperation = "lighter";

        // Draw stars
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }

        // Draw lines between stars and mouse if close enough
        ctx.beginPath();
        for (var i = 0; i < stars.length; i++) {
            var starI = stars[i];
            ctx.moveTo(starI.x, starI.y); 
            if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
            for (var j = 0; j < stars.length; j++) {
                var starII = stars[j];
                if (distance(starI, starII) < 150) {
                    ctx.lineTo(starII.x, starII.y); 
                }
            }
        }
        ctx.lineWidth = 0.05;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Draw the circle at the mouse position
        ctx.beginPath();
        ctx.fillStyle = 'red'; // Color of the mouse-following point
        ctx.arc(mouse.x, mouse.y, 5, 0, 2 * Math.PI); // 5px radius circle
        ctx.fill();
    }

    // Calculate the distance between two points
    function distance(point1, point2) {
        var xs = point2.x - point1.x;
        var ys = point2.y - point1.y;
        return Math.sqrt(xs * xs + ys * ys);
    }

    // Update star positions
    function update() {
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            s.x += s.vx / FPS;
            s.y += s.vy / FPS;

            // Reverse direction if out of bounds
            if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
            if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
        }
    }

    // Handle mouse move events to draw lines from the stars to the mouse
    canvas.addEventListener('mousemove', function(e) {
        // Get the bounding rectangle of the canvas
        var rect = canvas.getBoundingClientRect();
        
        // Adjust the mouse position relative to the canvas
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Redraw and update on each frame
    function tick() {
        draw();
        update();
        requestAnimationFrame(tick);
    }

    // Adjust canvas size on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start the animation
    tick();
}


function opentab(tabname,event){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
function openCertification(evt, certId) {
    var i, certContent, tabLinks;

    certContent = document.getElementsByClassName("cert-content");
    for (i = 0; i < certContent.length; i++) {
        certContent[i].style.display = "none";
        certContent[i].classList.remove("active");
    }

    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
    document.getElementById(certId).style.display = "block";
    document.getElementById(certId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

document.getElementById("cert1").style.display = "block";

function showMedia(dot, mediaType) {
    const projectMedia = dot.closest('.project-media');

    const dots = projectMedia.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dot.classList.add('active');

    const video = projectMedia.querySelector('video');
    const image = projectMedia.querySelector('img');

    if (mediaType === 'video') {
        video.classList.add('active');
        image.classList.remove('active');
    } else {
        image.classList.add('active');
        video.classList.remove('active');
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = -50; 
        const targetPosition = target.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Language data for dynamic text replacement
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

function toggleLangMenu() {
    document.getElementById('lang-menu').classList.toggle('show');
}

// Function to change the language and update text dynamically
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


window.onload = function() {
    setLanguage('en');
};

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
const portfolioData = {
    name: "Abdullah Musharaf",
    title: "Junior Computer Science Student",
    bio: "I am a junior computer science student with a strong passion for software development and machine learning. My experience includes developing web applications using Flask and integrating AI APIs to enhance functionality. My background in coding competitions has sharpened my problem-solving skills, and I am enthusiastic about contributing to innovative projects while continuing to grow my expertise in Python development.",
    skills: {
        hardskills: ["C++", "Python", "JavaScript", "Backend Development"],
        softskills: ["Teamwork", "Collaboration", "Research"]
    },
    experience: [{
        role: "SWE Fellow",
        company: "Headstarter AI"
    }],
    education: [{
        year: "2022 - current",
        degree: "BSCS",
        institution: "Information Technology University"
    }],
    projects: [{
        title: "Code Flash Academy",
        description: "Developed and optimized prompts for the Gemini API to generate real-time flashcards with a Flask-based backend, integrating Stripe for secure payment processing.",
        link: "https://github.com/abdullah-azeemi/AI_Flashcards"
    }, {
        title: "Health Care Chatbot",
        description: "An AI-powered Healthcare Chatbot that provides patients with disease information, symptoms, and possible treatments.",
        link: "https://github.com/Nabeel849/AI-Healthcare-Chatbot"
    }],
    certifications: [{
        title: "Certification 1",
        img: "images/certificate1.png"
    }, {
        title: "Certification 2",
        img: "images/certificate2.png"
    }],
    socialLinks: [{
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/abdullah-musharaf-6179a6125/"
    }, {
        name: "GitHub",
        link: "https://github.com/abdullah-azeemi"
    }]
};

function populatePortfolio(data) {
    // populating the header here
    document.querySelector('.header-text h1').innerHTML = `Hi, I'am <span>${data.name}</span>`;
    document.querySelector('.header-text p').innerHTML = data.title;

    // Populate About section
    document.querySelector('.about-col-2 p').textContent = data.bio;

    // // Populating skills
    // const skillsList = document.getElementById('skills').querySelector('ul');
    // skillsList.innerHTML = `
    //     <li><span>Hardskills</span><br> ${data.skills.hardskills.join('<br>')}</li>
    //     <li><span>Softskills</span><br> ${data.skills.softskills.join('<br>')}</li>
    // `;
    // // Populate Experience
    // const experienceList = document.getElementById('experience').querySelector('ul');
    // experienceList.innerHTML = data.experience.map(exp => `<li><span>${exp.role}</span><br>${exp.company}</li>`).join('');

    // // Populate Education
    // const educationList = document.getElementById('education').querySelector('ul');
    // educationList.innerHTML = data.education.map(edu => `<li><span>${edu.year}</span><br>${edu.degree}<br>${edu.institution}</li>`).join('');

    // Populate Projects
    const projectsSection = document.getElementById('projects').querySelector('.container');
    data.projects.forEach(project => {
        const projectHTML = `
        <div class="project">
            <div class="project-text">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="btn">Learn More</a>
            </div>
            <div class="project-media">
                <img src="images/p1.jpeg" alt="Project Image">
                <video class="active" controls>
                    <source src="https://www.youtube.com/93KSNyOe7zo" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
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
