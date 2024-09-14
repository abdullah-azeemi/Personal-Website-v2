window.onload = function() {
    console.log("Script loaded and DOM is ready!");

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
