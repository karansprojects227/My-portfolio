
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';

// particles effect on click
(() => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight; // Pure page ki height
    }
    resizeCanvas();

    const gravity = 0.1;
    const friction = 0.99;
    let particles = [];

    class Particle {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.alpha = 1;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.velocity.y += gravity;
            this.velocity.x *= friction;
            this.velocity.y *= friction;
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            if (this.y + this.radius >= canvas.height) {
                this.velocity.y = -this.velocity.y * 0.8;
            }
            if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
                this.velocity.x = -this.velocity.x;
            }
            this.alpha -= 0.005;
        }
    }

    function createParticles(x, y) {
        for (let i = 0; i < 50; i++) {
            const radius = Math.random() * 5 + 2;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            const velocity = {
                x: (Math.random() - 0.5) * 5,
                y: (Math.random() - 0.5) * 5
            };
            particles.push(new Particle(x, y, radius, color, velocity));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            if (particle.alpha > 0) {
                particle.update();
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
    }

    animate();

    window.addEventListener("resize", resizeCanvas);
    document.body.addEventListener("click", (event) => {
        createParticles(event.clientX, event.clientY + window.scrollY);
    });

})();

// **Menu Animation**
(() => {
    const menuOpenIcon = document.querySelector(".openmenu .open");
    const menuCloseIcon = document.querySelector(".openmenu .close");
    const menu = document.querySelector(".menu");
    const main = document.querySelector(".main");
    let lastScrollPosition = 0;
    let menuOpen = false
    
    gsap.from(".openmenu", { x: "120%", duration: 2, yoyo: true, repeat: -1,
    ease: "power2.out" });
    
    // **Function to Open Menu**
    function openMenu() {
            lastScrollPosition = window.scrollY; // Store current scroll position
    
            // Hide `.main` smoothly
            gsap.to(main, {
                duration: 0.003,
                onComplete: () => {
                    main.style.display = "none"; // ✅ Hide main content
                }
            });
    
            // Show Menu
            gsap.set(menu, { display: "block"});
    
            menuOpen = true;
    
            // Animate next page text (Open Animation)
            gsap.from(".home", {
                x: -500,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.from(".about", {
                x: 500,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.from(".extra", {
                y: 500,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    
    // **Function to Close Menu**
    function closeMenu() {
        gsap.to(".menu .home", {
            x: -500,
            duration: 1.5,
            ease: "power2.out"
        });
    
        gsap.to(".menu .about", {
            x: 500,
            duration: 1.5,
            ease: "power2.out"
        });
    
        gsap.to(".menu .extra", {
            y: 500,
            duration: 1.5,
            ease: "power2.out",
            onComplete: function() {
                // Reset all elements to default position
                gsap.set(".menu .home", { x: 0 });
                gsap.set(".menu .about", { x: 0 });
                gsap.set(".menu .extra", { y: 0 });
    
                // Show main section and hide menu
                document.querySelector(".main").style.display = "block";
                document.querySelector(".menu").style.display = "none";
    
                // Restore scroll position
                window.scrollTo(0, lastScrollPosition);
            }
        });
    }
    
    // **Click Events**
    if (menuOpenIcon) menuOpenIcon.addEventListener("click", openMenu);
    if (menuCloseIcon) menuCloseIcon.addEventListener("click", closeMenu);
    
        // **Menu Item Click Events**
        document.querySelector(".skill")?.addEventListener("click", () => {
            window.location.href = "skillpage/index.html";
        });
    
        document.querySelector(".about")?.addEventListener("click", () => {
            window.location.href = "aboutpage/index.html";
        });
    
        document.querySelector(".extra")?.addEventListener("click", () => {
            window.location.href = "extrapage/index.html";
        });
    
})();

// **Create Background for Multiple Sections
(() => { 
  const sections = document.querySelectorAll("section"); const scenes = []; const planetColors = [0x00ff00, 0x0000ff, 0xff0000];

sections.forEach((section, index) => { 
  const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(75, section.clientWidth / section.clientHeight, 0.1, 1000); camera.position.z = 6; const renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setSize(section.clientWidth, section.clientHeight); section.appendChild(renderer.domElement);

function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starVertices = Array.from({ length: 10000 }, () => (Math.random() - 0.5) * 2000);
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 1 })));
}
createStars();

const planetTexture = new THREE.TextureLoader().load('images/earth.png');

function createPlanet(size, positionX, glowColor) {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.x = positionX;

  const glowGeometry = geometry.clone();
  const glowMesh = new THREE.Mesh(glowGeometry, new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.3 }));
  glowMesh.scale.set(1.2, 1.2, 1.2);
  planet.add(glowMesh);

  scene.add(planet);
  return planet;
}

const planet = createPlanet(1.5, 0, planetColors[index % planetColors.length]);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

let skillSets = [
  { impacts: "Foundational Tech", skills: "HTML , CSS , JS" },
  { impacts: "Interactive Tech", skills: "Three.js , GSAP , React" },
  { impacts: "Future Tech", skills: "AI , Cloud Computing , BCI" }
];

function createTextTexture(title, skills) {
  const scaleFactor = 4;
  const textCanvas = document.createElement("canvas");
  textCanvas.width = 1024 * scaleFactor;
  textCanvas.height = 512 * scaleFactor;
  const ctx = textCanvas.getContext("2d");

  ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
  ctx.shadowBlur = 15 * scaleFactor;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 10 * scaleFactor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `Bold ${112 * scaleFactor}px Arial`;
  ctx.strokeText(title, textCanvas.width / 2, textCanvas.height / 3);
  ctx.fillText(title, textCanvas.width / 2, textCanvas.height / 3);
  ctx.font = `Bold ${60 * scaleFactor}px Arial`;
  ctx.strokeText(skills, textCanvas.width / 2, (textCanvas.height / 3) * 2);
  ctx.fillText(skills, textCanvas.width / 2, (textCanvas.height / 3) * 2);

  const textTexture = new THREE.CanvasTexture(textCanvas);
  textTexture.minFilter = THREE.LinearFilter;
  textTexture.magFilter = THREE.NearestFilter;
  textTexture.anisotropy = 16;
  textTexture.needsUpdate = true;

  return textTexture;
}

const textTexture = createTextTexture(skillSets[index].impacts, skillSets[index].skills);
const spriteMaterial = new THREE.SpriteMaterial({ map: textTexture, transparent: true });
const textSprite = new THREE.Sprite(spriteMaterial);
textSprite.scale.set(3, 1.5, 1);
textSprite.position.set(0, 0, 2);
scene.add(textSprite);

function animate() {
  requestAnimationFrame(animate);
  planet.rotation.y += 0.01;
  renderer.render(scene, camera);
}

const floatAnimation = gsap.to([planet.position, textSprite.position], {
  y: "+=1.5",
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isHovering = false;
const main = document.querySelector(".main");
let isClick = false;
let lastScrollPosition = 0;

// hover on planet
window.addEventListener("mouseenter", (event) => {
  const rect = section.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / section.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / section.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(planet);

  if (intersects.length > 0) {
    if (!isHovering) {
      isHovering = true;
      floatAnimation.pause();
      gsap.to(planet.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.5, ease: "power2.out" });
      gsap.to(textSprite.position, { z: 4, duration: 0.5, ease: "power2.out" });
    }
  } else {
    if (isHovering) {
      isHovering = false;
      floatAnimation.resume();
      gsap.to(planet.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(textSprite.position, { z: 2, duration: 0.5, ease: "power2.out" });
    }
  }
});

// Click on Planet to Open Portol
window.addEventListener("click", (event) => {
  const rect = section.getBoundingClientRect();
  const mouse = {
    x: ((event.clientX - rect.left) / section.clientWidth) * 2 - 1,
    y: -((event.clientY - rect.top) / section.clientHeight) * 2 + 1,
  };

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(planet, true); // `true` to check children also
  if (intersects.length > 0) {
    if (!isClick) {
      lastScrollPosition = window.scrollY; // Store scroll position
      
      // zoom in Planet Effect
      gsap.to(camera.position,{
        z:1,
        duration:1,
        ease:"power2.out",
        onComplete:() => {
          // Hide `.main` smoothly
      gsap.to(".main", {
        duration: 0.3,
        onComplete: () => {
          document.querySelector(".main").style.display = "none";
        },
      });

      // Show portol-container
      gsap.set(".portol-container", { display: "block"});
      gsap.to(".portol-container", {duration: 0.5 });
      
      (function initBubbleScene() {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 15);

  let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const portol = document.querySelector(".portol-container");
  portol.appendChild(renderer.domElement);

  let world = new CANNON.World();
  world.gravity.set(0, -0.02, 0);

  let light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(10, 10, 10);
  scene.add(light);

  let bubbles = [];
  for (let i = 0; i < 50; i++) {
    let geometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.8, 64, 64);
    let material = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      roughness: 0,
      metalness: 0,
      transmission: 0.9, // Transparent Glass Effect
      thickness: 1,
      clearcoat: 1,
    });

    let bubble = new THREE.Mesh(geometry, material);
    let x = (Math.random() - 0.5) * 20;
    let y = Math.random() * 10 - 5;
    let z = (Math.random() - 0.5) * 20;
    bubble.position.set(x, y, z);
    scene.add(bubble);

    let shape = new CANNON.Sphere(geometry.parameters.radius);
    let body = new CANNON.Body({ mass: 0.1, shape });
    body.position.set(x, y, z);
    world.addBody(body);

    bubbles.push({ mesh: bubble, body });
  }

  function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);
    bubbles.forEach((bubble) => {
      bubble.mesh.position.copy(bubble.body.position);
    });
    renderer.render(scene, camera);
  }

  animate();
})();

      (function initBubbleScene() {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 15);

  let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const portol = document.querySelector(".portol-container");
  portol.appendChild(renderer.domElement);

  let world = new CANNON.World();
  world.gravity.set(0, -0.02, 0);

  let light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(10, 10, 10);
  scene.add(light);

  let bubbles = [];
  for (let i = 0; i < 50; i++) {
    let geometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.8, 64, 64);
    let material = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      roughness: 0,
      metalness: 0,
      transmission: 0.9, // Transparent Glass Effect
      thickness: 1,
      clearcoat: 1,
    });

    let bubble = new THREE.Mesh(geometry, material);
    let x = (Math.random() - 0.5) * 20;
    let y = Math.random() * 10 - 5;
    let z = (Math.random() - 0.5) * 20;
    bubble.position.set(x, y, z);
    scene.add(bubble);

    let shape = new CANNON.Sphere(geometry.parameters.radius);
    let body = new CANNON.Body({ mass: 0.1, shape });
    body.position.set(x, y, z);
    world.addBody(body);

    bubbles.push({ mesh: bubble, body });
  }

  function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);
    bubbles.forEach((bubble) => {
      bubble.mesh.position.copy(bubble.body.position);
    });
    renderer.render(scene, camera);
  }

  animate();
})();

      // Create info Bubbles
      (() => { 
  const container = document.querySelector(".info-bubble"); 
  if (!container) { 
    console.error("Container not found!"); 
    return; 
  }

  // **Scene & Camera Setup**
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 6;

  // **Renderer Setup**
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // **Lighting Setup**
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 2, 100);
  pointLight.position.set(5, 5, 5);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // **Environment Reflection Map**
  const textureLoader = new THREE.CubeTextureLoader();
  const envMap = textureLoader.load([
      'path/px.jpg', 'path/nx.jpg',
      'path/py.jpg', 'path/ny.jpg',
      'path/pz.jpg', 'path/nz.jpg'
  ]);
  scene.environment = envMap;

  // **Bubble Material (Glass Effect)**
  const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0055ff,
      transparent: true,
      opacity: 0.8,
      roughness: 0.3,
      metalness: 0.2,
      transmission: 0.9, // Glass-like effect
      envMap: envMap,
      envMapIntensity: 1.5
  });

  // Creating the main big bubble
  const bigBubble = new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), bubbleMaterial);
  bigBubble.position.set(0, 0, 0);
  scene.add(bigBubble);

  // Creating the small bubble at the left bottom
  const smallBubble = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), bubbleMaterial);
  smallBubble.position.set(-1.5, -1.5, 0.5);
  scene.add(smallBubble);

  // **Text Inside the Big Bubble**
  const textArray = ["HTML", "CSS", "JavaScript", "Tailwind CSS", "PHP",
  "MySQL"];
  let textIndex = 0;

  const textCanvas = document.createElement("canvas");
  const textContext = textCanvas.getContext("2d");
  textCanvas.width = 512;
  textCanvas.height = 256;
  textContext.font = "50px Arial";
  textContext.fillStyle = "white";
  textContext.textAlign = "center";
  textContext.fillText(textArray[textIndex], 256, 128);

  const textTexture = new THREE.CanvasTexture(textCanvas);
  const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
  const textSprite = new THREE.Sprite(textMaterial);
  textSprite.scale.set(2.5, 1.2, 1);
  textSprite.position.set(0, 0, 2.1);
  scene.add(textSprite);

  function updateText() {
    textIndex = (textIndex + 1) % textArray.length;
    textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textContext.fillText(textArray[textIndex], 256, 128);
    textTexture.needsUpdate = true;
  }

  setInterval(updateText, 2000);

  // **Animation Loop**
  function animate(time) {
      requestAnimationFrame(animate);
      const scaleFactor = 1 + Math.sin(time * 0.001) * 0.02;
      bigBubble.scale.set(scaleFactor, scaleFactor, scaleFactor);
      smallBubble.scale.set(scaleFactor * 0.9, scaleFactor * 0.9, scaleFactor * 0.9);
      bigBubble.rotation.y += 0.005;
      smallBubble.rotation.y += 0.008;
      renderer.render(scene, camera);
  }
  animate(0);

  // **Window Resize Handler**
  window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
  });

})();
      
      isClick = true;
      
      // Close Portol Logic
      document.querySelector(".portol-container .close-portol").addEventListener("click", () => {
    
    gsap.set(camera.position,{
      z:6,
      duration:.01,
      ease:"power2.out"
    });
    
    gsap.to(".portol-container", {
      duration:.5,
      ease:"power2.out",
      onComplete:function(){
        document.querySelector(".portol-container").style.display = "none";
      }
    });
    
    gsap.to(main, {
      duration:.5,
      ease:"power2.out",
      onComplete:function(){
        main.style.display = "block";
         // Restore scroll position
        window.scrollTo(0, lastScrollPosition);
      }
    });

    isClick = false;
  });
        }
      });
    }
  }
});

animate();

window.addEventListener('resize', () => {
  renderer.setSize(section.clientWidth, section.clientHeight);
  camera.aspect = section.clientWidth / section.clientHeight;
  camera.updateProjectionMatrix();
});

scenes.push({ scene, renderer });

}); })();

