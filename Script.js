// ✅ Three.js Library Import (3D Graphics ke liye)
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// ✅ GSAP Plugins Register (Smooth Animations ke liye)
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);


// 3D Earth Function (3D Sphere Earth Render & Animation)
(function create3DEarth() {
  // ✅ Scene, Camera, and Renderer Initialization
  const scene = new THREE.Scene(); // 🎭 3D Scene Create
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 🎥 Camera Define
  camera.position.z = 3.25; // ✅ Camera ka position set

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // ✅ Anti-aliasing & Transparency enabled
  renderer.setSize(window.innerWidth, window.innerHeight); // ✅ Renderer ko window ke size ke equal set karo

  // ✅ Renderer ko webpage me inject karna
  const canvasEarth = document.querySelector(".earth"); 
  const { width, height } = canvasEarth.getBoundingClientRect();
  renderer.setSize(width, height);
  canvasEarth.replaceWith(renderer.domElement); // ✅ Earth Canvas ko replace karo
  
  // ✅ Background Transparent Set
  scene.background = null;

  // ✅ Earth Shape (Sphere Geometry)
  const geometry = new THREE.SphereGeometry(1, 130, 130);

  // ✅ Load Earth Texture (High-Quality Image Map)
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(
    'images/earth.png',
    function (texture) {
      texture.flipY = false;
      console.log("✅ Texture Loaded Successfully");
    },
    undefined,
    function (error) {
      console.error("❌ Error Loading Texture:", error);
    }
  );

  // ✅ Texture ko Sphere par Apply karo
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });
  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth); // ✅ Earth Scene me Add

  // ✅ Lighting Setup
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 5);
  scene.add(light);

  // ✅ Earth Rotate & Render Function
  function animate() {
    requestAnimationFrame(animate); // ✅ Animation Loop
    earth.rotation.y += 0.02; // ✅ Earth Rotation Set
    renderer.render(scene, camera); // ✅ Scene Render
  }

  animate(); // ✅ Animation Start
})();

// Intro Text Animation (Welcome Text Animations)
(function textAnimation() {
  gsap.to(".text-show", {
    opacity: 1,
    scale: 1,
    rotate: 360,
    duration: 3,
    ease: "power2.out",
    stagger: 0.1,
    onComplete: function () {
      gsap.to(".text-show", {
        opacity: 0,
        scale: 0,
        rotate: -360,
        duration: 3,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".intro",
          start: "top top",
          end: "80% top",
          toggleActions: "play reverse play reverse",
          scrub: true
        }
      });

      // ✅ Arrow Animation
      gsap.to(".arrow", {
        y: 5,
        y: -5,
        duration: 1,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        color: "red",
      });

      // ✅ Glowing Text Effect
      gsap.to(".glow-text", {
        textShadow: "0px 0px 10px yellow",
        y: 5,
        y: -5,
        duration: 1,
        ease: "power2.out",
        repeat: -1,
        yoyo: true
      });
    }
  });
})();

// Profile & Earth Bouncing Effect (Subtle Animation)
(function bounceProfileAndEarth() {
  gsap.to(".pro", {
    y: -10,
    duration: 2,
    ease: "power2.out",
    repeat: -1,
    yoyo: true
  });
})();

// Home Icon Hover Effects (Interactive Hover Animations)
(function homeIconHoverEffect() {
  let icon = document.querySelector(".home a");

  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      backgroundColor: "red",
      color: "white",
      duration: 0.5,
      ease: "power2.out",
      yoyo: true
    });
  });
})();

// Tag Glow Effect (Neon Text Effect)
(function tagGlow() {
  gsap.to(".tag", {
    textShadow: "0px 0px 10px red",
    duration: 0.8,
    ease: "power2.out",
    repeat: -1,
    yoyo: true
  });
})();

// Black Hole Animation (Transition Between Current & Future Me)
(function blackHoleAnimation() {
  gsap.to([".black-hole .top", ".black-hole .bottom"], {
    y: (i, target) => target.classList.contains("top") ? "-100%" : "100%", // Different animations based on class
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".black-hole",
      start: "top 30%",
      end: "top top",
      scrub: true,
      toggleActions: "play reverse play reverse"
    },
    onComplete: function () {
      // ✅ Change Text on Scroll
      gsap.to(".curr h2", { text: "Current Me", duration: 2, ease: "power2.out" });
      gsap.to(".curr p", { text: "Software Engineer | Web & App Developer", duration: 2, ease: "power2.out" });

      gsap.to(".reach h2", { text: "Future Me", duration: 2, ease: "power2.out" });
      gsap.to(".reach p", { text: "Tech CEO | AI Visionary", duration: 2, ease: "power2.out" });

      let lastScroll = 0;
      ScrollTrigger.create({
        trigger: ".black-hole",
        start: "top top",
        onUpdate: (self) => {
          let currentScroll = self.scroll();
          if (currentScroll > lastScroll) {
            gsap.set(".container", { zIndex: 99 });
          } else {
            gsap.set(".container", { zIndex: "auto" });
          }
          lastScroll = currentScroll;
        }
      });
    }
  });
})();

// Side Hover Effects (Smooth Side Animations)
(function sideHoverEffects() {
  let positions = document.querySelectorAll(".side");

  positions.forEach((side) => {
    let highlight = side.querySelector(".highlight");

    side.addEventListener("mouseenter", () => {
      gsap.to(side, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
        yoyo: true
      });

      gsap.to(highlight, {
        width: "20px",
        left: "100%",
        duration: 0.6,
        ease: "power2.out",
        yoyo: true
      });
    });

    side.addEventListener("mouseleave", () => {
      gsap.to(side, { scale: 1, duration: 0.4, ease: "power2.out", yoyo: true });
      gsap.to(highlight, { left: "-100%", duration: 0.6, ease: "power2.out", yoyo: true });
    });
  });
})();

// create buubles with text Dynamically
(function createBubbles() {
    const bubbleTexts = [
        { heading: "Hello", paragraph: "This is a friendly greeting." },
        { heading: "Welcome", paragraph: "Glad to have you here!" },
        { heading: "Bubble 1", paragraph: "This is the first bubble text." },
        { heading: "Bubble 2", paragraph: "Another dynamic bubble text." },
        { heading: "Dynamic", paragraph: "Change text dynamically with JS!" },
        { heading: "Awesome!", paragraph: "Make your UI more engaging!" }
    ];

    for (let i = 1; i <= 6; i++) {
        createSingleBubble(i);
    }

    function createSingleBubble(index) {
        // **Scene Setup**
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        let bubblebox = document.querySelector(`.bubble${index}`);
        if (!bubblebox) return;

        const { width, height } = bubblebox.getBoundingClientRect();
        renderer.setSize(width, height);
        bubblebox.replaceWith(renderer.domElement);

        // **Lighting**
        const light1 = new THREE.PointLight(0xff00ff, 1, 100);
        light1.position.set(5, 5, 5);
        scene.add(light1);

        const light2 = new THREE.PointLight(0x00ffff, 1, 100);
        light2.position.set(-5, -5, -5);
        scene.add(light2);

        // **Bubble Geometry**
        const bubbleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            roughness: 0.1,
            metalness: 0.8,
            emissive: 0x5500ff,
            emissiveIntensity: 0.5,
            clearcoat: 1
        });

        const bubble = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), bubbleMaterial);
        scene.add(bubble);

        // **Create Text Texture**
        function createTextTexture(text) {
            const textCanvas = document.createElement("canvas");
            textCanvas.width = 512;
            textCanvas.height = 256;
            const ctx = textCanvas.getContext("2d");

            ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
            ctx.fillStyle = "white";
            ctx.font = "Bold 50px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);

            const textTexture = new THREE.CanvasTexture(textCanvas);
            textTexture.needsUpdate = true;
            return textTexture;
        }

        // **Add Text Sprite**
        const spriteMaterial = new THREE.SpriteMaterial({
            map: createTextTexture(bubbleTexts[index - 1].heading),
            transparent: true
        });

        const textSprite = new THREE.Sprite(spriteMaterial);
        textSprite.scale.set(1.5, 0.75, 1);
        textSprite.position.set(0, 0, 1.1);
        scene.add(textSprite);

        camera.position.z = 3;

        // **Squash & Stretch Animation**
        function squashBubble() {
            gsap.to(bubble.scale, {
                duration: 1,
                y: 0.5,
                repeat: 1,
                yoyo: true,
                ease: "elastic.out(1, 0.3)",
                onComplete: squashBubble
            });
        }
        squashBubble();

        // **Render Loop**
        function animate() {
            requestAnimationFrame(animate);
            bubble.rotation.y += 0.01;
            bubble.rotation.x += 0.005;
            renderer.render(scene, camera);
        }
        animate();
        
        // Select All Bubbles
var bubblesbox = document.querySelectorAll(".bubble-box");

// **Bubble Movement Animation**
var bubblemoving = gsap.to(bubblesbox, {
    x: "-50%", // Using `x` for better performance instead of `left`
    duration: 5,
    ease: "power2.out",
    yoyo: true,
    repeat: -1
});

// **Mini Description Element**
let mini = document.querySelector(".mini-description");

// **Bubble Hover Event (Fixed)**

let minidetails = [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatum iusto deleniti ratione nam reprehenderit blanditiis animi in voluptates a, laborum sed minus rem explicabo illum corrupti hic ad dignissimos sunt.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum iusto deleniti ratione nam reprehenderit blanditiis animi in voluptates a, laborum sed minus rem explicabo illum corrupti hic ad dignissimos sunt.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum iusto deleniti ratione nam reprehenderit blanditiis animi in voluptates a, laborum sed minus rem explicabo illum corrupti hic ad dignissimos sunt.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum iusto deleniti ratione nam reprehenderit blanditiis animi in voluptates a, laborum sed minus rem explicabo illum corrupti hic ad dignissimos sunt.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum iusto deleniti ratione nam reprehenderit blanditiis animi in voluptates a, laborum sed minus rem explicabo illum corrupti hic ad dignissimos sunt.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum iusto deleniti ratione nam reprehenderit blanditiis animi in voluptates a, laborum sed minus rem explicabo illum corrupti hic ad dignissimos sunt."];

renderer.domElement.addEventListener("mouseenter", (event) => {
  mini.textContent = minidetails[index];
  // Position & Show Mini Description
  positionBubble(event);
  gsap.to(mini, {
    display:"block",
    duration: 0.1,
    ease: "power2.out"
  });
})

renderer.domElement.addEventListener("mousemove", (event) => {
   positionBubble(event);
});

renderer.domElement.addEventListener("mouseleave",() => {
  // Hide Mini Description
  gsap.to(mini, {
    display:"none",
    duration: 0.1,
    ease: "power2.out"
  });
});

function positionBubble(event) {
  let x = event.clientX;
  let y = event.clientY;
  mini.style.left = `${x -113}px`;
  mini.style.top = `${y-150}px`; // ✅ Position above the element
}

bubblesbox.forEach(bubble => {
    bubble.addEventListener("mouseenter", (event) => {
        bubblemoving.pause(); // ✅ Stops movement on hover
    });

    bubble.addEventListener("mouseleave", () => {
        bubblemoving.resume(); // ✅ Continues from where it stopped
    });
});
// **Bubble Click Event**
renderer.domElement.addEventListener("click", () => {
            var layer = document.querySelector(".bg-layer");
            var h1 = document.querySelector(".heading h1");
            var p = document.querySelector(".detailed p");
        
            // Set text dynamically
            h1.textContent = bubbleTexts[index - 1].heading;
            p.textContent = bubbleTexts[index - 1].paragraph;
            
            let currScrollPosition = window.scrollY;
            
            // **Hide .main smoothly**
            gsap.to(".main", { 
              display:"none",
              duration:.05,
              ease:"power2.out"
            });
            
            // ** Show Layer smoothly **
            gsap.to(layer, { 
              display:"block", 
              duration: 0.05,
              ease:"power2.out"
            });
            
            // Click on Close icon
            document.querySelector(".close i").addEventListener("click", () => {
              
              // Show Main Container
              gsap.to(".main", {
                display:"block", 
                duration: 0.05,
                ease:"power2.out"
              });
              
              // Restore scroll Position
              setTimeout(() => {
                requestAnimationFrame(() => {
                    window.scrollTo(0, currScrollPosition);
                });
            }, 50); // ✅ Tiny delay ensures browser has time to render
              
              // Hide Layer
              gsap.to(layer, {
                display:"none", 
                duration: 0.05,
                ease:"power2.out"
              });
               
            });
        });
        
        // **Resize Event**
        window.addEventListener("resize", () => {
            const { width, height } = bubblebox.getBoundingClientRect();
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }
})();

// **Menu Animation**
(() => {
    const menuOpenIcon = document.querySelector(".openmenu .open");
    const menuCloseIcon = document.querySelector(".openmenu .close");
    const menu = document.querySelector(".menu");
    const main = document.querySelector(".main");
    let lastScrollPosition = 0;
    let menuOpen = false
    
    gsap.from(".openmenu", { y: "-100%", duration: 2, yoyo: true, repeat: -1, ease: "power2.out" });
    
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
            gsap.from(".skill", {
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
        gsap.to(".menu .skill", {
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
                gsap.set(".menu .skill", { x: 0 });
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

// ✅ **End of Scripting** ✅