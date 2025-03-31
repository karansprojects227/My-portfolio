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
        { heading: "AI", paragraph: "Artificial intelligence (AI) is rapidly transforming our world, moving from science fiction to everyday reality. At its core, AI involves the development of computer systems capable of performing tasks that typically require human intelligence, such as learning, reasoning, and problem-solving. This is achieved through various techniques, including machine learning, deep learning, and neural networks, which enable machines to analyze vast amounts of data and identify patterns. The applications of AI are incredibly diverse. From powering search engines and personalized recommendations on streaming platforms to driving advancements in healthcare and autonomous vehicles, AI is reshaping industries and daily life. In healthcare, AI aids in disease diagnosis, drug discovery, and personalized treatment plans. In finance, it helps detect fraud and manage risk. Furthermore, AI-powered virtual assistants and chatbots are becoming increasingly common, providing personalized customer service and support.However, the rise of AI also brings ethical considerations and potential challenges. Concerns about job displacement, data privacy, and the potential for misuse of AI technologies are being actively discussed. It is crucial to develop AI systems that are transparent, accountable, and aligned with human values. As AI continues to evolve, it is essential to navigate its potential benefits and risks responsibly, ensuring that it serves to enhance human well-being and progress." },
        { heading: "AI-Driven 4K Ultra", paragraph: "AI-driven 4K ultra web development represents a cutting-edge approach to creating immersive and highly functional online experiences. Leveraging artificial intelligence, developers can streamline workflows, enhance user interfaces, and deliver visually stunning websites optimized for ultra-high-definition displays. AI algorithms play a pivotal role in automating repetitive tasks, such as code generation, image optimization, and responsive design adjustments, freeing up developers to focus on more creative and strategic aspects of the project. In the realm of 4K ultra web development, AI facilitates the intelligent scaling and optimization of high-resolution images and videos, ensuring they load quickly and seamlessly across various devices and screen sizes. Machine learning models can analyze user behavior and preferences, enabling personalized content delivery and interface customization. AI-powered tools can also assist in detecting and rectifying code errors, improving website performance, and enhancing security. Furthermore, AI contributes to creating dynamic and interactive web elements, such as chatbots, virtual assistants, and personalized recommendations. These features enhance user engagement and provide a more intuitive and responsive browsing experience. With the increasing availability of 4K displays, AI-driven development is crucial for delivering visually captivating websites that fully utilize the enhanced resolution, resulting in richer, more detailed, and more immersive online experiences. As AI continues to advance, its integration into web development will further revolutionize how websites are designed, built, and experienced." },
        { heading: "AI-Powered Smart Cities", paragraph: "AI-powered smart cities represent a paradigm shift in urban planning and management, aiming to enhance the quality of life for citizens while optimizing resource utilization. At the heart of this concept is the integration of artificial intelligence into various city systems, enabling data-driven decision-making and automated processes. These smart cities leverage sensors, IoT devices, and advanced algorithms to collect and analyze real-time data, transforming it into actionable insights. One of the key applications of AI in smart cities is traffic management. AI-powered systems can analyze traffic patterns, predict congestion, and optimize traffic light timings, reducing commute times and fuel consumption. Similarly, smart energy grids can use AI to balance supply and demand, reducing energy waste and promoting renewable energy integration. In public safety, AI-powered surveillance systems can detect anomalies and predict crime hotspots, enabling faster response times. Furthermore, smart cities utilize AI to improve waste management, optimize public transportation, and enhance infrastructure maintenance. AI-driven systems can monitor waste levels, optimize collection routes, and predict infrastructure failures, minimizing disruptions and reducing costs. Citizen engagement is also enhanced through AI-powered platforms that provide real-time information, personalized services, and interactive feedback mechanisms. However, the development of AI-powered smart cities also raises concerns about data privacy, security, and equity. It is crucial to implement robust data protection measures and ensure that the benefits of smart city technologies are accessible to all citizens, regardless of their socioeconomic background. As cities continue to grow and face increasing challenges, AI offers promising solutions for creating more sustainable, efficient, and livable urban environments." },
        { heading: "Quantum Computing", paragraph: "Quantum computing represents a paradigm shift in computation, moving away from the classical bits of 0s and 1s to the quantum bits, or qubits. These qubits, leveraging the principles of quantum mechanics, can exist in a state of superposition, meaning they can be 0 and 1 simultaneously. This, coupled with entanglement, where qubits become interconnected and their fates intertwined, allows quantum computers to perform certain calculations exponentially faster than their classical counterparts. The potential of quantum computing is vast, promising to revolutionize fields like cryptography, materials science, and drug discovery. In cryptography, quantum computers threaten to break existing encryption methods, while also paving the way for more secure, quantum-resistant ones. In materials science, they can simulate complex molecular interactions, leading to the development of novel materials with desired properties. In pharmaceuticals, quantum simulations can accelerate drug discovery by accurately modeling molecular behavior. However, quantum computing is still in its nascent stages. Building and maintaining stable qubits is incredibly challenging, requiring extremely low temperatures and precise control. Error correction is also a significant hurdle, as qubits are highly susceptible to noise. Despite these challenges, the field is rapidly advancing, with major tech companies and research institutions investing heavily in quantum hardware and software development. The journey to fully realized, fault-tolerant quantum computers is ongoing, but the potential rewards are immense, promising to unlock solutions to some of humanity's most complex problems." },
        { heading: "Neural AI Assistant", paragraph: "Neural AI assistants represent a significant leap forward in the realm of artificial intelligence, leveraging the power of neural networks to create more intuitive and human-like interactions. These assistants, often powered by deep learning models, are designed to understand and respond to complex natural language queries, going beyond simple keyword matching. They are capable of learning from vast datasets, allowing them to personalize responses, anticipate user needs, and engage in more nuanced conversations. Unlike traditional AI assistants that rely on pre-programmed rules, neural AI assistants can adapt and improve over time, refining their understanding of language and context. This allows them to handle a wider range of tasks, from scheduling appointments and providing information to generating creative content and offering personalized recommendations. Their ability to process and interpret complex language structures enables them to understand the intent behind user requests, leading to more accurate and relevant responses. The development of neural AI assistants is driven by advancements in natural language processing (NLP) and machine learning. These assistants are increasingly integrated into various platforms, including smartphones, smart speakers, and online services, becoming integral to daily life. As they continue to evolve, neural AI assistants are expected to play a more prominent role in areas such as customer service, education, and healthcare, providing personalized support and enhancing human-computer interaction. However, the ethical considerations regarding data privacy and potential bias must be addressed to ensure their responsible and beneficial deployment." },
        { heading: "BCI", paragraph: "Brain-computer interfaces (BCIs) represent a cutting-edge field of research that aims to establish a direct communication pathway between the human brain and external devices. These systems hold immense potential for revolutionizing how we interact with technology, particularly for individuals with severe motor disabilities. At its core, a BCI system works by recording and interpreting brain activity. This is typically achieved through various techniques, including electroencephalography (EEG), which measures electrical activity on the scalp, or more invasive methods that involve implanting electrodes directly into the brain. The recorded brain signals are then processed and translated into commands that can control external devices, such as computers, robotic limbs, or communication systems. The potential applications of BCIs are vast and transformative. For individuals with conditions like amyotrophic lateral sclerosis (ALS) or spinal cord injuries, BCIs can provide a means of communication and control, restoring a sense of independence and improving their quality of life. Beyond medical applications, BCIs are also being explored for use in areas such as gaming, virtual reality, and even enhancing human cognitive abilities. However, the development of BCIs also raises important ethical considerations. Issues such as data privacy, security, and the potential for misuse of this technology must be carefully addressed. As research progresses and BCIs become more sophisticated, it is crucial to ensure that these technologies are developed and used responsibly, with a focus on maximizing their benefits while minimizing potential risks." }
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