window.onload = function() {
          // ✅ Call Functions after full page load
          create3DEarth();
          animateTracker();
          animateFindingIcon();
        };
      
      //---- Three.js Module CDN
      import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

      // ✅ Global Variables
      let isRotating = true;
      let camera;

      // 🔵 3D Earth Function
      function create3DEarth() {
            // ✅ Scene Setup
            const scene = new THREE.Scene();
            
            // ✅ Camera Setup
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 3.25;

            // ✅ Renderer Setup
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.querySelector(".main").appendChild(renderer.domElement);

            // ✅ Earth Geometry & Material
            const geometry = new THREE.SphereGeometry(1, 130, 130);
            const textureLoader = new THREE.TextureLoader();
            const earthTexture = textureLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');

            const material = new THREE.MeshBasicMaterial({ map: earthTexture });
            const earth = new THREE.Mesh(geometry, material);
            scene.add(earth);

            // ✅ Light Setup
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(2, 2, 5);
            scene.add(light);

            // ✅ Animation Loop
            function animate() {
                requestAnimationFrame(animate);
                if (isRotating) {
                    earth.rotation.y += 0.02;
                    earth.rotation.x += 0.02;
                }
                renderer.render(scene, camera);
            }
            animate();
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
    gsap.to(".tracker-div img:nth-last-child(1)", {
      yoyo:true,
      onComplete: function () {
        gsap.set(".tracker-div img:nth-last-child(1)", { display: "block", ease: "power2.inOut" });
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

      gsap.to(".tracker-div img:nth-last-child(1)", {
        yoyo:true,
        onComplete: function () {
          gsap.set(".tracker-div img:nth-last-child(1)", { display: "none", ease: "power2.inOut" });
        }
      });

      isRotating = false; // ✅ Rotation Stop
      
      // ✅ Camera Zoom-in Animation
      gsap.to(camera.position, {
        z: 1.099, // ✅ Camera move karega Earth ke andar
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: function () {
          // ✅ Earth Hide
          gsap.set(".main", {
            display: "none",
            ease: "power2.inOut" });
          
          gsap.to(".portol-box",{
            display:"block"
          });
          
          gsap.to(".portol",{
            backgroundColor:"black",
            scale:.1,
            ease:"power2.out"
          });
          
          gsap.to(".portol",{
            rotate:-720,
            scale:30,
            duration:6,
            ease:"power2.out",
            onComplete:function(){
              window.location.href = "mainpage/index.html";
            }
          });
          
          }
      });

    }, 1000); // ✅ 1 sec ke delay ke baad
  }, 8000); // ✅ 6 sec ke delay ke baad
}