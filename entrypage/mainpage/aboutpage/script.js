

// *****Start Scripting*****

window.onload = function(){
      
      setTimeout(() => {
        document.querySelector('.loading-container').style.opacity = '0';
        setTimeout(() => {
          document.querySelector('.loading-container').style.display = 'none';
          
          // Common animation settings
          const defaultEase = "power3.out";
          
          // 1 section Animation
          (() => {
            
            // name animate
            (() => {
              
              gsap.set(".hero-text1",{
                opacity:1
              });
              
              function splitText(element) {
              let text = element.innerText;
              element.innerHTML = ""; 
              let chars = text.split(""); 
  
              chars.forEach(char => {
                  let span = document.createElement("span");
                  span.classList.add("char");
                  span.innerHTML = char === " " ? "&nbsp;" : char;
                  element.appendChild(span);
              });
  
              return element.querySelectorAll(".char");
          }
  
          function advancedScrambleAnimation(chars, finalText) {
              let randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?";
              let tl = gsap.timeline();
  
              chars.forEach((char, i) => {
                  let original = finalText[i]; // Final character
                  let duration = 1.5 + Math.random() * 1; // Random speed for each letter
  
                  tl.to(char, { 
                      opacity: 1,
                      duration: 0.1, 
                      onStart: () => {
                          let iterations = 10 + Math.floor(Math.random() * 10);
                          let scrambleInterval = setInterval(() => {
                              char.innerText = randomChars[Math.floor(Math.random() * randomChars.length)];
                          }, 50);
                          
                          setTimeout(() => {
                              clearInterval(scrambleInterval);
                              char.innerText = original;
                          }, iterations * 50);
                      }
                  }, i * 0.1); // Stagger animation
              });
          }
  
          let textElement = document.querySelector(".hero-text1");
          let characters = splitText(textElement);
          let finalText = textElement.innerText.split("");
  
          advancedScrambleAnimation(characters, finalText);
              
          })();
            
            // tagline animate
            (() => {
              
              gsap.set(".tagline",{
                opacity:1
              });
              
              function splitText(element) {
              let text = element.innerText;
              element.innerHTML = ""; 
              let chars = text.split(""); 
  
              chars.forEach(char => {
                  let span = document.createElement("span");
                  span.classList.add("char");
                  span.innerHTML = char === " " ? "&nbsp;" : char;
                  element.appendChild(span);
              });
  
              return element.querySelectorAll(".char");
          }
  
          function advancedScrambleAnimation(chars, finalText) {
              let randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?";
              let tl = gsap.timeline();
  
              chars.forEach((char, i) => {
                  let original = finalText[i]; // Final character
                  let duration = 1.5 + Math.random() * 1; // Random speed for each letter
  
                  tl.to(char, { 
                      opacity: 1,
                      duration: 0.1, 
                      onStart: () => {
                          let iterations = 10 + Math.floor(Math.random() * 10);
                          let scrambleInterval = setInterval(() => {
                              char.innerText = randomChars[Math.floor(Math.random() * randomChars.length)];
                          }, 50);
                          
                          setTimeout(() => {
                              clearInterval(scrambleInterval);
                              char.innerText = original;
                          }, iterations * 50);
                      }
                  }, i * 0.1); // Stagger animation
              });
          }
  
          let textElement = document.querySelector(".tagline");
          let characters = splitText(textElement);
          let finalText = textElement.innerText.split("");
  
          advancedScrambleAnimation(characters, finalText);
              
          })();
            
            // headings animate
            (() => {
      gsap.set(".heading h2", {
          opacity: 1
      });
  
      function splitText(element) {
          let text = element.innerText;
          element.innerHTML = "";
          let chars = text.split("");
  
          chars.forEach(char => {
              let span = document.createElement("span");
              span.classList.add("char");
              span.innerHTML = char === " " ? "&nbsp;" : char;
              element.appendChild(span);
          });
  
          return element.querySelectorAll(".char");
      }
  
      function rotateSlideAnimation(chars) {
          gsap.fromTo(chars, 
              { rotate: 180, y: "-100%", opacity: 0 }, // Initial state
              { rotate: 0, y: "0%", opacity: 1, duration: 1.2, stagger: 0.04, ease: "power2.out" } // Final state
          );
      }
  
      // Apply animation on each h2 separately
      document.querySelectorAll(".heading h2").forEach(h2 => {
          let characters = splitText(h2);
          rotateSlideAnimation(characters);
      });
  
})();
            
            // Summary p animate
            (() => {
              gsap.set(".para p", {
          opacity: 1
      });
  
              function splitText(element) {
          let text = element.innerText;
          element.innerHTML = "";
          let chars = text.split("");
  
          chars.forEach(char => {
              let span = document.createElement("span");
              span.classList.add("char");
              span.innerHTML = char === " " ? "&nbsp;" : char;
              element.appendChild(span);
          });
  
          return element.querySelectorAll(".char");
      }
  
      function rotateSlideAnimation(chars) {
          gsap.fromTo(chars, 
              { rotate: 180, y: "-100%", opacity: 0 }, // Initial state
              { rotate: 0, y: "0%", opacity: 1, duration: 1.2, stagger: 0.04, ease: "power2.out" } // Final state
          );
      }
  
      // Apply animation on each h2 separately
      document.querySelectorAll(".para p").forEach(h2 => {
          let characters = splitText(h2);
          rotateSlideAnimation(characters);
      });
  
})();
            
            // percentage h5 animate
            (() => {
              gsap.set(".percentage h5", {
          opacity: 1
      });
  
              function splitText(element) {
          let text = element.innerText;
          element.innerHTML = "";
          let chars = text.split("");
  
          chars.forEach(char => {
              let span = document.createElement("span");
              span.classList.add("char");
              span.innerHTML = char === " " ? "&nbsp;" : char;
              element.appendChild(span);
          });
  
          return element.querySelectorAll(".char");
      }
  
      function rotateSlideAnimation(chars) {
          gsap.fromTo(chars, 
              { 
                scale: 0, x:"-100%",
                stagger: 0.04, 
                duration:1.2, 
                ease: defaultEase
              }, // Initial state
              { scale: 1,
                opacity:1,
                x:0,
                stagger: 0.04, 
                duration:1.2, 
                ease: defaultEase } // Final state
          );
      }
  
      // Apply animation on each h2 separately
      document.querySelectorAll(".percentage h5").forEach(h2 => {
          let characters = splitText(h2);
          rotateSlideAnimation(characters);
      });
  
})();
            
            // colledge h5 animate
            (() => {
              gsap.set(".colledge h5", {
          opacity: 1
      });
  
              function splitText(element) {
          let text = element.innerText;
          element.innerHTML = "";
          let chars = text.split("");
  
          chars.forEach(char => {
              let span = document.createElement("span");
              span.classList.add("char");
              span.innerHTML = char === " " ? "&nbsp;" : char;
              element.appendChild(span);
          });
  
          return element.querySelectorAll(".char");
      }
  
      function rotateSlideAnimation(chars) {
          gsap.fromTo(chars, 
              { 
                scale: 0, 
                x:"100%",
                stagger: 0.04, 
                duration:1.2, 
                ease: defaultEase
              }, // Initial state
              { scale: 1,
                opacity:1,
                x:0,
                stagger: 0.04, 
                duration:1.2, 
                ease: defaultEase } // Final state
          );
      }
  
      // Apply animation on each h2 separately
      document.querySelectorAll(".colledge h5").forEach(h2 => {
          let characters = splitText(h2);
          rotateSlideAnimation(characters);
      });
  
})();
            
          })();
          
          // 2 section Animation
          (() => {
            
            // future animate
            (() => {
              gsap.set(".hero-text2", {
                opacity: 1
              });
  
              function splitText(element) {
          let text = element.innerText;
          element.innerHTML = "";
          let chars = text.split("");
  
          chars.forEach(char => {
              let span = document.createElement("span");
              span.classList.add("char");
              span.innerHTML = char === " " ? "&nbsp;" : char;
              element.appendChild(span);
          });
  
          return element.querySelectorAll(".char");
      }
  
      function rotateSlideAnimation(chars) {
          gsap.fromTo(chars, 
              {
                opacity: 0, x: "-100%", rotate: 360, stagger: 0.08, duration: 3, ease: defaultEase,
              scrollTrigger: { trigger: ".hero-text2", start: "top 80%", end:
              "top 50%", scrub: true }
              }, // Initial state
              { opacity: 1, x: "0%", rotate:0, stagger: 0.08, duration: 3, ease: defaultEase,
              scrollTrigger: { trigger: ".hero-text2", start: "top 80%", end: "top 50%", scrub: true }} // Final state
          );
      }
  
      // Apply animation on each h2 separately
      document.querySelectorAll(".hero-text2").forEach(h2 => {
          let characters = splitText(h2);
          rotateSlideAnimation(characters);
      });
  
})();

            // para animate
            (() => {
              gsap.set(".future-para p", {
                opacity: 1
              });
  
              function splitText(element) {
          let text = element.innerText;
          element.innerHTML = "";
          let chars = text.split("");
  
          chars.forEach(char => {
              let span = document.createElement("span");
              span.classList.add("char");
              span.innerHTML = char === " " ? "&nbsp;" : char;
              element.appendChild(span);
          });
  
          return element.querySelectorAll(".char");
      }
  
      function rotateSlideAnimation(chars) {
          gsap.fromTo(chars, 
              {
                opacity: 0, rotate: 180, y: "100%", scale: 0, stagger: 0.4, duration: 4, ease: defaultEase,
              scrollTrigger: { trigger: ".future-para p", start: "top 80%", end:
              "top top", scrub: true }
              }, // Initial state
              { 
                opacity: 1, rotate: 0, y: "0%", scale: 1, stagger: 0.4, duration: 4, ease: defaultEase,
              scrollTrigger: { trigger: ".future-para p", start: "top 80%", end: "top top", scrub: true }
              } // Final state
          );
      }
  
      // Apply animation on each h2 separately
      document.querySelectorAll(".future-para p").forEach(h2 => {
          let characters = splitText(h2);
          rotateSlideAnimation(characters);
      });
  
})();
            
          })();
          
          
        }, 500);
      }, 4500); // Wait for rocket launch to finish
      
      // Floating Form Animation
      gsap.to(".form-container", { y: "-40%", duration: 3, yoyo: true, repeat: -1, ease: "power2.out" });
      
      // **Click on Resume**
      
      document.querySelector(".resume").addEventListener("click", () => {
        
      });
      
      // **Menu Animation**
      (() => {
          const menuOpenIcon = document.querySelector(".openmenu .open");
          const menuCloseIcon = document.querySelector(".openmenu .close");
          const menu = document.querySelector(".menu");
          const main = document.querySelector(".main");
          let lastScrollPosition = 0;
          let menuOpen = false
          
          gsap.from(".openmenu", { x: "-120%", duration: 2, yoyo: true, repeat: -1, ease: "power2.out" });
          
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
                  gsap.from(".skill", {
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
          
              gsap.to(".menu .skill", {
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
                      gsap.set(".menu .skill", { x: 0 });
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
          
      })();
      
    }

// *****End Scripting*****