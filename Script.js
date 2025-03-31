// Start Scripting ----->>

// ✅ Three.js Library Import
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// ✅ Global Variables
var isRotating = true; // Rotation control ke liye variable
let camera; // 🎥 Camera ko globally define kiya taaki baaki functions bhi use kar sakein

// 🔵 1️⃣  3D Earth Function
function create3DEarth() {
  // ✅ Scene, Camera, and Renderer Initialization
  const scene = new THREE.Scene(); // 🎭 3D Scene create kiya
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 🎥 Camera define kiya
  camera.position.z = 3.25; // ✅ Camera z-position set kiya

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // ✅ Anti-aliasing aur transparency enabled
  renderer.setSize(window.innerWidth, window.innerHeight); // ✅ Window size ke equal set kiya

  // ✅ Renderer ko webpage me inject karna
  const main = document.querySelector(".main"); // HTML element select kiya
  main.appendChild(renderer.domElement); // Renderer ko HTML me add kiya

  // ✅ Transparent Background
  scene.background = null;

  // ✅ Earth Shape (Sphere Geometry)
  const geometry = new THREE.SphereGeometry(1, 130, 130);

  // ✅ Load Earth Texture
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

  // ✅ Material & Mesh (Texture ko sphere par apply karna)
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });
  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth); // ✅ Scene me earth add kiya

  // ✅ Lighting Setup
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 5);
  scene.add(light);

  // ✅ Rendering Function (With Rotation)
  function animate() {
    requestAnimationFrame(animate); // ✅ Animation loop

    // ✅ Earth rotation function
    function rotation() {
      if (isRotating) {
        earth.rotation.y += 0.02;
        earth.rotation.x += 0.02;
      }
    }
    rotation();

    renderer.render(scene, camera); // ✅ Scene render
  }

  animate(); // ✅ Start Animation
}

// 🔵 2️⃣ Tracker Animation Function (Up & Down Motion)
function animateTracker() {
  let tl = gsap.timeline();
  tl.to(".tracker", {
    y: -10,
    duration: 1,
    ease: "power4.inOut",
    repeat: -1,
    yoyo:true
  });
}

// 🔵 3️⃣ Finding Icon Animation (Fade Effect)
function animateFindingIcon() {
  const animation = gsap.to(".finding-icon", {
    opacity: 0,
    duration: 1.5,
    ease: "power2.inOut",
    repeat: -1,
    yoyo:true
  });

  // ✅ 6 sec ke baad elements ka transition aur rotation stop
  setTimeout(() => {
    // ✅ Finding Icon Hide
    gsap.to(".finding-icon", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      yoyo:true,
      onComplete: function () {
        gsap.set(".finding-icon", { display: "none" });
      }
    });

    // ✅ Access Granted Message Show
    gsap.to(".access", {
      onComplete: function () {
        gsap.set(".access", {
          display: "block",
          text: "Access Granted !",
          duration: 1.5,
          ease: "power3.out",
          yoyo:true
        });
      }
    });

    // ✅ Portal Text Show
    gsap.to(".portol-text", {
      onComplete: function () {
        gsap.set(".portol-text", {
          display: "block",
          text: "Main Portal Opening ...",
          duration: 1.5,
          ease: "power3.out",
          yoyo:true
        });
      }
    });

    // ✅ Tracker Hide
    gsap.to(".tracker", {
      yoyo:true,
      onComplete: function () {
        gsap.set(".tracker", { display: "none", ease: "power2.inOut" });
      }
    });

    // ✅ Locator Show
    gsap.to(".locator", {
      yoyo:true,
      onComplete: function () {
        gsap.set(".locator", { display: "block", ease: "power2.inOut" });
      }
    });

    // ✅ 1 sec ke baad elements hide aur camera zoom-in effect
    setTimeout(() => {
      gsap.to(".access", {
        yoyo:true,
        onComplete: function () {
          gsap.set(".access", { display: "none", duration: 1.5, ease: "power3.out" });
        }
      });

      gsap.to(".portol-text", {
        yoyo:true,
        onComplete: function () {
          gsap.set(".portol-text", { display: "none", duration: 1.5, ease: "power3.out" });
        }
      });

      gsap.to(".locator", {
        yoyo:true,
        onComplete: function () {
          gsap.set(".locator", { display: "none", ease: "power2.inOut" });
        }
      });

      isRotating = false; // ✅ Rotation Stop
      
      // ✅ Camera Zoom-in Animation
      gsap.to(camera.position, {
        z: 0.1, // ✅ Camera move karega Earth ke andar
        duration: 3,
        ease: "power2.inOut",
        onComplete: function () {
          // ✅ Earth Hide
          gsap.set(".main", {
            display: "none",
            ease: "power2.inOut" });

          // ✅ Portal Show
          gsap.set(".portol-div", { display: "block", ease: "power2.inOut",
          yoyo:true });

          // ✅ Portal Animation (Rotate & Scale)
          gsap.to(".portol", {
            rotate: -720,
            scale: 20,
            duration:2,
            ease: "power2.inOut",
            yoyo:true,
            onComplete:function(){
              window.location.href = "mainpage/index.html"; // redirect to main page
            }
          });
        }
      });

    }, 1000); // ✅ 1 sec ke delay ke baad
  }, 6000); // ✅ 6 sec ke delay ke baad
}

// ✅ Function Calls
create3DEarth(); // ✅ Earth create karega
animateTracker(); // ✅ Tracker animation start karega
animateFindingIcon(); // ✅ Finding icon animation start karega

// End Scripting ----->>