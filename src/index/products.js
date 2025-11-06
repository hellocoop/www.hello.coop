import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

window.onload = async () => {
  handleDropdown();

  gsap.registerPlugin(MotionPathPlugin);

  const tl = gsap.timeline({
    defaults: { ease: "power1.inOut" },
    repeat: -1, // optional — remove if you don't want looping
    repeatDelay: 1, // optional delay between loops
  });

  // 1. Cursor fades in
  tl.fromTo(
    "#cursor",
    { opacity: 0 },
    { opacity: 1, duration: 0.4 }
  )

    // 2. After short delay, scale deprovisioned-user (cursor "clicks" it)
    .addLabel("click")
    .to(
      "#deprovisioned-user_2",
      { scale: 1.2, duration: 0.3, transformOrigin: "center center" },
      "click+=0.2"
    )

    // 3. Move both cursor + deprovisioned-user together
    .to(
      ["#cursor", "#deprovisioned-user_2"],
      { x: "+=50", y: "+=50", duration: 0.5 },
      ">+0.1"
    )

    // 4. Deprovisioned user scales to 0 and fades out
    .addLabel("disappear")
    .to(
      "#deprovisioned-user_2",
      { scale: 0, opacity: 0, duration: 0.25 },
      "disappear"
    )
    .to(
      "#cursor",
      { opacity: 0, duration: 0.25 },
    )
    // 5 & 6. At the same time as 4 → animate #one and #a along their paths
    .to(
      "#one",
      {
        motionPath: {
          path: "#one-path",
          align: "#one-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        duration: 0.5,
        opacity: 1,
        ease: "power1.inOut",
      },
      "disappear"
    )
    .to(
      "#a",
      {
        motionPath: {
          path: "#a-path",
          align: "#a-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        duration: 0.5,
        opacity: 1,
        ease: "power1.inOut",
      }
    )
    .to(
      "#deprovisioned-user",
      { opacity: 0, duration: 0.25 },
      // "disappear"
    )
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