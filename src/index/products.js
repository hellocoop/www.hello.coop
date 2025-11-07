import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

window.onload = async () => {
  handleDropdown();

  gsap.registerPlugin(MotionPathPlugin);
  offboardingAnimation();
}

function offboardingAnimation() {
  gsap.registerPlugin(MotionPathPlugin);

  // Set initial states
  ["#one", "#a"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
  gsap.set("#cursor", { opacity: 0, x: 0, y: 0 });
  gsap.set("#deprovisioned-user-1", { scale: 1, opacity: 0, x: 0, y: 0 });
  gsap.set("#deprovisioned-user-2", { opacity: 0, x: 0, y: 0 });
  gsap.set("#deprovisioned-user-3", { opacity: 0, x: 0, y: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power1.inOut" },
    repeat: -1,
    repeatDelay: 0.25,
  });

  // 2. Start with users and cursor fade in, then selection and movement
  tl.addLabel("fadeInUsers")
    .to(["#deprovisioned-user-3", "#deprovisioned-user-2", "#deprovisioned-user-1"], {
      opacity: 1,
      duration: 0.3,
    }, "fadeInUsers")
    // Cursor fades in (appears in place), after a short delay following users
    .to("#cursor", {
      opacity: 1,
      duration: 0.4,
    }, "fadeInUsers+=0.5")
    // 3. Deprovisioned user 2 scales (to indicate it being selected by cursor)
    .to("#deprovisioned-user-1", {
      scale: 1.2,
      duration: 0.3,
      transformOrigin: "center center",
    }, ">+0.2")
    // 4. Move both cursor and deprovisioned user 2 to translate x and y of 50
    .to(["#cursor", "#deprovisioned-user-1"], {
      x: 50,
      y: 50,
      duration: 0.5,
    }, ">+0.1")

    // 5. Scale and the deprovisioned user 2 to 0 and opacity to 0 as well at the same time
    // 6. Should start at same time of 5, start path animation #one
    .addLabel("fadeAndPath")
    .to("#deprovisioned-user-1", {
      scale: 0,
      opacity: 0,
      duration: 0.25,
    }, "fadeAndPath")
    .to("#cursor", {
      opacity: 0,
      duration: 0.25,
    }, "fadeAndPath")
    .set("#one", { opacity: 1 }, "fadeAndPath")
    .to("#one", {
      duration: 0.35,
      ease: "none",
      motionPath: {
        path: "#one-path",
        align: "#one-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "fadeAndPath")
    .to("#one", {
      duration: 0.15,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#one-path",
        align: "#one-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    .to("#deprovisioned-user-2", {
      opacity: 0,
      duration: 0.25,
    })
    // 7. Start path animation #a
    .set("#a", { opacity: 1 }, ">-0.25")
    .to("#a", {
      duration: 0.35,
      ease: "none",
      motionPath: {
        path: "#a-path",
        align: "#a-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, ">-0.25")
    .to("#a", {
      duration: 0.15,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#a-path",
        align: "#a-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")

    // 8. Wait for path animations to be done, then reduce opacity of deprovisioned user to 0
    // #one ends at fadeAndPath+=0.5, #a ends at fadeAndPath+=0.75 (starts at fadeAndPath+=0.25, duration 0.5)
    .to("#deprovisioned-user-3", {
      opacity: 0,
      duration: 0.25,
    }, ">")

    // 9. Set deprovisioned user to translate x and y of 0
    .to("#deprovisioned-user-3", {
      x: 0,
      y: 0,
      duration: 0,
    }, ">")
}

async function handleDropdown() {
  const mobileNavToggle = document.querySelector('#movile-nav-toggle');
  const mobileNavDropdown = document.querySelector('#mobile-nav-dropdown');
  mobileNavToggle.onclick = () => {
    mobileNavDropdown.classList.toggle('hidden');
    if (mobileNavDropdown.classList.contains('hidden')) {
      document.body.classList.remove('overflow-y-hidden');
    } else {
      document.body.classList.add('overflow-y-hidden');
    }
  }
  window.onresize = () => {
    if (window.innerWidth > 768) {
      document.body.classList.remove('overflow-y-hidden');
    }
  }
}