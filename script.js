document.addEventListener('DOMContentLoaded', function() {
    // Create the sun animation SVG
    const animationContainer = document.getElementById('sun-animation');
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Create SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 200 200");
    animationContainer.appendChild(svg);
    
    // Define gradient for the sun
    const defs = document.createElementNS(svgNS, "defs");
    svg.appendChild(defs);
    
    // Radial gradient for the sun
    const gradient = document.createElementNS(svgNS, "radialGradient");
    gradient.setAttribute("id", "sunGradient");
    gradient.setAttribute("cx", "50%");
    gradient.setAttribute("cy", "50%");
    gradient.setAttribute("r", "50%");
    
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#ffdd00");
    
    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "70%");
    stop2.setAttribute("stop-color", "#ff9500");
    
    const stop3 = document.createElementNS(svgNS, "stop");
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("stop-color", "#ff6200");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    
    // Create the sun disk
    const sunDisk = document.createElementNS(svgNS, "circle");
    sunDisk.setAttribute("cx", "100");
    sunDisk.setAttribute("cy", "100");
    sunDisk.setAttribute("r", "50");
    sunDisk.setAttribute("fill", "url(#sunGradient)");
    svg.appendChild(sunDisk);
    
    // Create sun rays
    const numRays = 12;
    const rayGroup = document.createElementNS(svgNS, "g");
    svg.appendChild(rayGroup);
    
    for (let i = 0; i < numRays; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = 100 + 50 * Math.cos(angle);
        const y1 = 100 + 50 * Math.sin(angle);
        const x2 = 100 + 75 * Math.cos(angle);
        const y2 = 100 + 75 * Math.sin(angle);
        
        const ray = document.createElementNS(svgNS, "line");
        ray.setAttribute("x1", x1);
        ray.setAttribute("y1", y1);
        ray.setAttribute("x2", x2);
        ray.setAttribute("y2", y2);
        ray.setAttribute("stroke", "#ffdd00");
        ray.setAttribute("stroke-width", "3");
        ray.setAttribute("class", "sun-ray");
        ray.setAttribute("data-angle", angle);
        rayGroup.appendChild(ray);
    }
    
    // Create plasma swirls inside the sun
    for (let i = 0; i < 3; i++) {
        const swirl = document.createElementNS(svgNS, "circle");
        const radius = 10 + Math.random() * 15;
        const distance = Math.random() * 25;
        const angle = Math.random() * Math.PI * 2;
        const x = 100 + distance * Math.cos(angle);
        const y = 100 + distance * Math.sin(angle);
        
        swirl.setAttribute("cx", x);
        swirl.setAttribute("cy", y);
        swirl.setAttribute("r", radius);
        swirl.setAttribute("fill", "rgba(255, 255, 255, 0.2)");
        swirl.setAttribute("class", "plasma-swirl");
        swirl.dataset.speed = 0.5 + Math.random();
        swirl.dataset.size = radius;
        swirl.dataset.x = x;
        swirl.dataset.y = y;
        svg.appendChild(swirl);
    }
    
    // Animation loop
    function animate() {
        // Animate rays
        const rays = document.querySelectorAll('.sun-ray');
        rays.forEach((ray, index) => {
            const length = 75 + Math.sin(Date.now() / 1000 + index) * 10;
            const angle = parseFloat(ray.getAttribute('data-angle'));
            const x2 = 100 + length * Math.cos(angle);
            const y2 = 100 + length * Math.sin(angle);
            ray.setAttribute("x2", x2);
            ray.setAttribute("y2", y2);
            
            // Pulse the opacity
            const opacity = 0.5 + Math.sin(Date.now() / 500 + index) * 0.5;
            ray.setAttribute("stroke-opacity", opacity);
        });
        
        // Animate swirls
        const swirls = document.querySelectorAll('.plasma-swirl');
        swirls.forEach(swirl => {
            const time = Date.now() / 1000;
            const speed = parseFloat(swirl.dataset.speed);
            const size = parseFloat(swirl.dataset.size);
            const x = parseFloat(swirl.dataset.x);
            const y = parseFloat(swirl.dataset.y);
            
            // Pulsate size
            const newSize = size * (0.8 + Math.sin(time * speed) * 0.2);
            swirl.setAttribute("r", newSize);
            
            // Orbital motion
            const orbit = 5;
            const newX = x + Math.cos(time * speed) * orbit;
            const newY = y + Math.sin(time * speed) * orbit;
            swirl.setAttribute("cx", newX);
            swirl.setAttribute("cy", newY);
        });
        
        // Subtle pulse for the sun disk
        const pulse = 1 + Math.sin(Date.now() / 2000) * 0.02;
        sunDisk.setAttribute("r", 50 * pulse);
        
        requestAnimationFrame(animate);
    }
    
    animate();
}); 