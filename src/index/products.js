import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

window.onload = async () => {
  handleDropdown();

  gsap.registerPlugin(MotionPathPlugin);
  lifecycleAnimation();
  offboardingAnimation();
  handleSignUpModals();
}

function handleSignUpModals() {
  // Get modal elements
  const helloLifecycleModal = document.querySelector('#hello-lifecycle-join-waitlist-modal');
  const githubOffboardingModal = document.querySelector('#github-offboarding-join-waitlist-modal');

  // Get button elements
  const helloLifecycleBtn = document.querySelector('#hello-lifecycle-join-waitlist-btn');
  const githubOffboardingBtn = document.querySelector('#github-offboarding-join-waitlist-btn');

  // Get close icon button elements
  const closeHelloLifecycleModal = document.querySelector('#close-hello-lifecycle-join-waitlist-modal');
  const closeGithubOffboardingModal = document.querySelector('#close-github-offboarding-join-waitlist-modal');

  // Get form elements
  const helloLifecycleForm = helloLifecycleModal?.querySelector('form');
  const githubOffboardingForm = githubOffboardingModal?.querySelector('form');

  // Helper function to get redirect URI based on current page
  function getRedirectUri(hash) {
    const isProductsPage = window.location.pathname.includes('products.html');
    const baseUrl = window.location.origin;
    if (isProductsPage) {
      return `${baseUrl}/products.html${hash}`;
    }
    return `${baseUrl}${hash}`;
  }

  // Helper function to redirect to Hellō authorization
  function redirectToHello(clientId, hash, email) {
    const redirectUri = encodeURIComponent(getRedirectUri(hash));
    const loginHint = encodeURIComponent(email);
    const authUrl = `https://wallet.hello.coop/authorize?scope=openid+email&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&response_mode=fragment&nonce=123&login_hint=${loginHint}`;
    window.location.href = authUrl;
  }

  // Helper function to show modal
  function showModal(modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-y-hidden');
  }

  // Helper function to hide modal
  function hideModal(modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden');
  }

  // Hello Lifecycle modal handlers
  if (helloLifecycleBtn && helloLifecycleModal) {
    helloLifecycleBtn.onclick = (e) => {
      e.preventDefault();
      showModal(helloLifecycleModal);
    };
  }

  if (closeHelloLifecycleModal && helloLifecycleModal) {
    closeHelloLifecycleModal.onclick = () => {
      hideModal(helloLifecycleModal);
    };
  }

  // Hello Lifecycle form submission
  if (helloLifecycleForm) {
    helloLifecycleForm.onsubmit = (e) => {
      e.preventDefault();
      const emailInput = helloLifecycleForm.querySelector('input[type="email"]');
      const submitButton = helloLifecycleForm.querySelector('button[type="submit"]');
      const email = emailInput?.value || '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('hello-btn-loader', 'opacity-50');
      }

      redirectToHello('app_hello_lifecycle_signup', '#hello-lifecycle', email);
    };
  }

  // GitHub Offboarding modal handlers
  if (githubOffboardingBtn && githubOffboardingModal) {
    githubOffboardingBtn.onclick = (e) => {
      e.preventDefault();
      showModal(githubOffboardingModal);
    };
  }

  if (closeGithubOffboardingModal && githubOffboardingModal) {
    closeGithubOffboardingModal.onclick = () => {
      hideModal(githubOffboardingModal);
    };
  }

  // Github Offboarding form submission 
  if (githubOffboardingForm) {
    githubOffboardingForm.onsubmit = (e) => {
      e.preventDefault();
      const emailInput = githubOffboardingForm.querySelector('input[type="email"]');
      const submitButton = githubOffboardingForm.querySelector('button[type="submit"]');
      const email = emailInput?.value || '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('hello-btn-loader', 'opacity-50');
      }

      redirectToHello('app_hello_github_offboarding_signup', '#github-offboarding', email);
    };
  }

  // Close modals when clicking outside (optional enhancement)
  if (helloLifecycleModal) {
    helloLifecycleModal.onclick = (e) => {
      if (e.target === helloLifecycleModal) {
        hideModal(helloLifecycleModal);
      }
    };
  }

  if (githubOffboardingModal) {
    githubOffboardingModal.onclick = (e) => {
      if (e.target === githubOffboardingModal) {
        hideModal(githubOffboardingModal);
      }
    };
  }
}

function lifecycleAnimation() {
  // Set initial states for green, blue, and yellow
  ["#hello-lifecycle #cursor-1", "#hello-lifecycle #cursor-2", "#hello-lifecycle #cursor-3"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
  gsap.set("#hello-lifecycle #green-1", { scale: 1, opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #green-2", { opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #green-3", { opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #blue-1", { scale: 1, opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #blue-2", { opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #blue-3", { opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #yellow-1", { scale: 1, opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #yellow-2", { opacity: 1, x: 0, y: 0 });
  gsap.set("#hello-lifecycle #yellow-3", { opacity: 1, x: 0, y: 0 });
  ["#hello-lifecycle #one", "#hello-lifecycle #two", "#hello-lifecycle #three"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
  ["#hello-lifecycle #a", "#hello-lifecycle #b", "#hello-lifecycle #c"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
  // Set initial states for overlay flash elements (opacity 0)
  ["#hello-lifecycle #source-1", "#hello-lifecycle #source-2", "#hello-lifecycle #source-3"].forEach(id => gsap.set(id, { opacity: 0 }));
  ["#hello-lifecycle #cloud-1", "#hello-lifecycle #cloud-2", "#hello-lifecycle #cloud-3"].forEach(id => gsap.set(id, { opacity: 0 }));
  ["#hello-lifecycle #app-1", "#hello-lifecycle #app-2", "#hello-lifecycle #app-3"].forEach(id => gsap.set(id, { opacity: 0 }));

  const tl = gsap.timeline({
    defaults: { ease: "power1.inOut" },
    repeat: -1,
    repeatDelay: 0.25,
  });

  // 1. Cursor-1 fades in
  tl.addLabel("start")
    .to("#hello-lifecycle #cursor-1", {
      opacity: 1,
      duration: 0.4,
    }, "start")
    // 2. Scale green-1
    .to("#hello-lifecycle #green-1", {
      scale: 1.2,
      duration: 0.3,
      transformOrigin: "center center",
    }, ">+0.2")
    // 3. Move cursor and green-1 to 50 translate x and y
    .to(["#hello-lifecycle #cursor-1", "#hello-lifecycle #green-1"], {
      x: -120,
      y: 25,
      duration: 0.5,
    }, ">+0.1")
    // 4. Scale green-1 to 0 and fade out, start #one path animation at same time
    .addLabel("greenFadeOut")
    .to("#hello-lifecycle #green-1", {
      scale: 0,
      opacity: 0,
      duration: 0.25,
    }, "greenFadeOut")
    .to("#hello-lifecycle #source-1", {
      opacity: 1,
      duration: 0.16,
    }, "greenFadeOut-=0.18")
    .to("#hello-lifecycle #source-1", {
      opacity: 0,
      duration: 0.16,
    }, ">+0.19")
    .set("#hello-lifecycle #one", { opacity: 1 }, "greenFadeOut")
    .to("#hello-lifecycle #one", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#hello-lifecycle #one-path",
        align: "#hello-lifecycle #one-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "greenFadeOut")
    .to("#hello-lifecycle #one", {
      duration: 0.25,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#hello-lifecycle #one-path",
        align: "#hello-lifecycle #one-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    // 5. Fade out cursor (almost immediately after green-1 starts fading)
    .to("#hello-lifecycle #cursor-1", {
      opacity: 0,
      duration: 0.25,
    }, "greenFadeOut+=0.1")
    // 6. At end of #one animation, fade out green-2 and flash cloud green
    .addLabel("greenAPathStart")
    .addLabel("greenCloudFlash")
    .to("#hello-lifecycle #cloud-1", {
      opacity: 1,
      duration: 0.16,
    }, "greenCloudFlash")
  tl.to("#hello-lifecycle #green-2", {
    opacity: 0,
    duration: 0.16,
  }, "greenCloudFlash")
    .to("#hello-lifecycle #cloud-1", {
      opacity: 0,
      duration: 0.16,
    }, "greenCloudFlash+=0.19")
    // 7. Start #a animation on #a-b-c-path (at same time as green-2 starts fading)
    .set("#hello-lifecycle #a", { opacity: 1 }, "greenAPathStart")
    .to("#hello-lifecycle #a", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#hello-lifecycle #a-b-c-path",
        align: "#hello-lifecycle #a-b-c-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "greenAPathStart")
    .to("#hello-lifecycle #a", {
      duration: 0.25,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#hello-lifecycle #a-b-c-path",
        align: "#hello-lifecycle #a-b-c-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    // 8. Once #a animation is done, fade out green-3 and flash app green
    .addLabel("greenAppFlash")
    .to("#hello-lifecycle #app-1", {
      opacity: 1,
      duration: 0.16,
    }, "greenAppFlash")
    .to("#hello-lifecycle #green-3", {
      opacity: 0,
      duration: 0.16,
    }, "greenAppFlash")
    .to("#hello-lifecycle #app-1", {
      opacity: 0,
      duration: 0.16,
    }, "greenAppFlash+=0.19")
    // BLUE SEQUENCE
    // 1. Cursor-2 fades in
    .to("#hello-lifecycle #cursor-2", {
      opacity: 1,
      duration: 0.4,
    }, ">+0.5")
    // 2. Scale blue-1
    .to("#hello-lifecycle #blue-1", {
      scale: 1.2,
      duration: 0.3,
      transformOrigin: "center center",
    }, ">+0.2")
    // 3. Move cursor and blue-1 to 50 translate x and y
    .to(["#hello-lifecycle #cursor-2", "#hello-lifecycle #blue-1"], {
      x: -30,
      y: 35,
      duration: 0.5,
    }, ">+0.1")
    // 4. Scale blue-1 to 0 and fade out, start #two path animation at same time
    .addLabel("blueFadeOut")
    .to("#hello-lifecycle #blue-1", {
      scale: 0,
      opacity: 0,
      duration: 0.25,
    }, "blueFadeOut")
    .to("#hello-lifecycle #source-2", {
      opacity: 1,
      duration: 0.16,
    }, "blueFadeOut-=0.18")
    .to("#hello-lifecycle #source-2", {
      opacity: 0,
      duration: 0.16,
    }, ">+0.19")
    .set("#hello-lifecycle #two", { opacity: 1 }, "blueFadeOut")
    .to("#hello-lifecycle #two", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#hello-lifecycle #two-path",
        align: "#hello-lifecycle #two-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "blueFadeOut")
    .to("#hello-lifecycle #two", {
      duration: 0.25,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#hello-lifecycle #two-path",
        align: "#hello-lifecycle #two-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    // 5. Fade out cursor-2 (almost immediately after blue-1 starts fading)
    .to("#hello-lifecycle #cursor-2", {
      opacity: 0,
      duration: 0.25,
    }, "blueFadeOut+=0.1")
    // 6. At end of #two animation, fade out blue-2 and flash cloud blue
    .addLabel("blueAPathStart")
    .addLabel("blueCloudFlash")
    .to("#hello-lifecycle #cloud-2", {
      opacity: 1,
      duration: 0.16,
    }, "blueCloudFlash")
    .to("#hello-lifecycle #blue-2", {
      opacity: 0,
      duration: 0.16,
    }, "blueCloudFlash")
    .to("#hello-lifecycle #cloud-2", {
      opacity: 0,
      duration: 0.16,
    }, "blueCloudFlash+=0.19")
    // 7. Start #b animation on #a-b-c-path (at same time as blue-2 starts fading)
    .set("#hello-lifecycle #b", { opacity: 1 }, "blueAPathStart")
    .to("#hello-lifecycle #b", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#hello-lifecycle #a-b-c-path",
        align: "#hello-lifecycle #a-b-c-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "blueAPathStart")
    .to("#hello-lifecycle #b", {
      duration: 0.25,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#hello-lifecycle #a-b-c-path",
        align: "#hello-lifecycle #a-b-c-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    // 8. Once #b animation is done, fade out blue-3 and flash app blue
    .addLabel("blueAppFlash")
    .to("#hello-lifecycle #app-2", {
      opacity: 1,
      duration: 0.16,
    }, "blueAppFlash")
    .to("#hello-lifecycle #blue-3", {
      opacity: 0,
      duration: 0.16,
    }, "blueAppFlash")
    .to("#hello-lifecycle #app-2", {
      opacity: 0,
      duration: 0.16,
    }, "blueAppFlash+=0.19")
    // YELLOW SEQUENCE
    // 1. Cursor-3 fades in
    .to("#hello-lifecycle #cursor-3", {
      opacity: 1,
      duration: 0.4,
    }, ">+0.5")
    // 2. Scale yellow-1
    .to("#hello-lifecycle #yellow-1", {
      scale: 1.2,
      duration: 0.3,
      transformOrigin: "center center",
    }, ">+0.2")
    // 3. Move cursor and yellow-1 to 50 translate x and y
    .to(["#hello-lifecycle #cursor-3", "#hello-lifecycle #yellow-1"], {
      x: -90,
      y: -65,
      duration: 0.5,
    }, ">+0.1")
    // 4. Scale yellow-1 to 0 and fade out, start #three path animation at same time
    .addLabel("yellowFadeOut")
    .to("#hello-lifecycle #yellow-1", {
      scale: 0,
      opacity: 0,
      duration: 0.25,
    }, "yellowFadeOut")
    .to("#hello-lifecycle #source-3", {
      opacity: 1,
      duration: 0.16,
    }, "yellowFadeOut-=0.18")
    .to("#hello-lifecycle #source-3", {
      opacity: 0,
      duration: 0.16,
    }, ">+0.19")
    .set("#hello-lifecycle #three", { opacity: 1 }, "yellowFadeOut")
    .to("#hello-lifecycle #three", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#hello-lifecycle #three-path",
        align: "#hello-lifecycle #three-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "yellowFadeOut")
    .to("#hello-lifecycle #three", {
      duration: 0.25,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#hello-lifecycle #three-path",
        align: "#hello-lifecycle #three-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    // 5. Fade out cursor-3 (almost immediately after yellow-1 starts fading)
    .to("#hello-lifecycle #cursor-3", {
      opacity: 0,
      duration: 0.25,
    }, "yellowFadeOut+=0.1")
    // 6. At end of #three animation, fade out yellow-2 and flash cloud yellow
    .addLabel("yellowAPathStart")
    .addLabel("yellowCloudFlash")
    .to("#hello-lifecycle #cloud-3", {
      opacity: 1,
      duration: 0.16,
    }, "yellowCloudFlash")
    .to("#hello-lifecycle #yellow-2", {
      opacity: 0,
      duration: 0.16,
    }, "yellowCloudFlash")
    .to("#hello-lifecycle #cloud-3", {
      opacity: 0,
      duration: 0.16,
    }, "yellowCloudFlash+=0.19")
    // 7. Start #c animation on #a-b-c-path (at same time as yellow-2 starts fading)
    .set("#hello-lifecycle #c", { opacity: 1 }, "yellowAPathStart")
    .to("#hello-lifecycle #c", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#hello-lifecycle #a-b-c-path",
        align: "#hello-lifecycle #a-b-c-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "yellowAPathStart")
    .to("#hello-lifecycle #c", {
      duration: 0.25,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#hello-lifecycle #a-b-c-path",
        align: "#hello-lifecycle #a-b-c-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    // 8. Once #c animation is done, fade out yellow-3 and flash app yellow
    .addLabel("yellowAppFlash")
    .to("#hello-lifecycle #app-3", {
      opacity: 1,
      duration: 0.16,
    }, "yellowAppFlash")
    .to("#hello-lifecycle #yellow-3", {
      opacity: 0,
      duration: 0.16,
    }, "yellowAppFlash")
    .to("#hello-lifecycle #app-3", {
      opacity: 0,
      duration: 0.16,
    }, "yellowAppFlash+=0.19")
    // Reset: Fade in all users at the same time (consistent with offboarding animation)
    .addLabel("reset")
    // Reset positions and states first
    .set([
      "#hello-lifecycle #cursor-1",
      "#hello-lifecycle #cursor-2",
      "#hello-lifecycle #cursor-3"
    ], {
      opacity: 0,
      x: 0,
      y: 0,
    }, "reset")
    .set([
      "#hello-lifecycle #green-1",
      "#hello-lifecycle #blue-1",
      "#hello-lifecycle #yellow-1"
    ], {
      scale: 1,
      opacity: 0,
      x: 0,
      y: 0,
    }, "reset")
    .set([
      "#hello-lifecycle #green-2",
      "#hello-lifecycle #green-3",
      "#hello-lifecycle #blue-2",
      "#hello-lifecycle #blue-3",
      "#hello-lifecycle #yellow-2",
      "#hello-lifecycle #yellow-3"
    ], {
      opacity: 0,
      x: 0,
      y: 0,
    }, "reset")
    // Reset overlay flash elements to opacity 0
    .set([
      "#hello-lifecycle #source-1",
      "#hello-lifecycle #source-2",
      "#hello-lifecycle #source-3",
      "#hello-lifecycle #cloud-1",
      "#hello-lifecycle #cloud-2",
      "#hello-lifecycle #cloud-3",
      "#hello-lifecycle #app-1",
      "#hello-lifecycle #app-2",
      "#hello-lifecycle #app-3"
    ], {
      opacity: 0,
    }, "reset")
    // Fade in all users at the same time
    .to([
      "#hello-lifecycle #green-1",
      "#hello-lifecycle #green-2",
      "#hello-lifecycle #green-3",
      "#hello-lifecycle #blue-1",
      "#hello-lifecycle #blue-2",
      "#hello-lifecycle #blue-3",
      "#hello-lifecycle #yellow-1",
      "#hello-lifecycle #yellow-2",
      "#hello-lifecycle #yellow-3"
    ], {
      opacity: 1,
      duration: 0.3,
    }, "reset+=0.2")
}

function offboardingAnimation() {
  // Set initial states
  ["#github-offboarding #one", "#github-offboarding #a"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
  gsap.set("#github-offboarding #cursor", { opacity: 0, x: 0, y: 0 });
  gsap.set("#github-offboarding #deprovisioned-user-1", { scale: 1, opacity: 0, x: 0, y: 0 });
  gsap.set("#github-offboarding #deprovisioned-user-2", { opacity: 0, x: 0, y: 0 });
  gsap.set("#github-offboarding #deprovisioned-user-3", { opacity: 0, x: 0, y: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power1.inOut" },
    repeat: -1,
    repeatDelay: 0.25,
  });

  // 2. Start with users and cursor fade in, then selection and movement
  tl.addLabel("fadeInUsers")
    .to(["#github-offboarding #deprovisioned-user-3", "#github-offboarding #deprovisioned-user-2", "#github-offboarding #deprovisioned-user-1"], {
      opacity: 1,
      duration: 0.3,
    }, "fadeInUsers")
    // Cursor fades in (appears in place), after a short delay following users
    .to("#github-offboarding #cursor", {
      opacity: 1,
      duration: 0.4,
    }, "fadeInUsers+=0.5")
    // 3. Deprovisioned user 2 scales (to indicate it being selected by cursor)
    .to("#github-offboarding #deprovisioned-user-1", {
      scale: 1.2,
      duration: 0.3,
      transformOrigin: "center center",
    }, ">+0.2")
    // 4. Move both cursor and deprovisioned user 2 to translate x and y of 50
    .to(["#github-offboarding #cursor", "#github-offboarding #deprovisioned-user-1"], {
      x: -30,
      y: 65,
      duration: 0.5,
    }, ">+0.1")

    // 5. Scale and the deprovisioned user 2 to 0 and opacity to 0 as well at the same time
    // 6. Should start at same time of 5, start path animation #one
    .addLabel("fadeAndPath")
    .to("#github-offboarding #deprovisioned-user-1", {
      scale: 0,
      opacity: 0,
      duration: 0.15,
    }, "fadeAndPath")
    .to("#github-offboarding #cursor", {
      opacity: 0,
      duration: 0.25,
    }, "fadeAndPath")
    .set("#github-offboarding #one", { opacity: 1 }, "fadeAndPath")
    .to("#github-offboarding #one", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#github-offboarding #one-path",
        align: "#github-offboarding #one-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, "fadeAndPath")
    .to("#github-offboarding #one", {
      duration: 0.15,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#github-offboarding #one-path",
        align: "#github-offboarding #one-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")
    .to("#github-offboarding #deprovisioned-user-2", {
      opacity: 0,
      duration: 0.25,
    })
    // 7. Start path animation #a (after deprovisioned-user-2 disappears)
    .set("#github-offboarding #a", {
      opacity: 1,
      motionPath: {
        path: "#github-offboarding #a-path",
        align: "#github-offboarding #a-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
      }
    }, ">")
    .to("#github-offboarding #a", {
      duration: 0.4,
      ease: "none",
      motionPath: {
        path: "#github-offboarding #a-path",
        align: "#github-offboarding #a-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 0.7,
      },
    }, ">")
    .to("#github-offboarding #a", {
      duration: 0.15,
      ease: "power1.out",
      opacity: 0,
      motionPath: {
        path: "#github-offboarding #a-path",
        align: "#github-offboarding #a-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.7,
        end: 1,
      },
    }, ">")

    // 8. Wait for path animations to be done, then reduce opacity of deprovisioned user to 0
    // #one ends at fadeAndPath+=0.5, #a ends at fadeAndPath+=0.75 (starts at fadeAndPath+=0.25, duration 0.5)
    .to("#github-offboarding #deprovisioned-user-3", {
      opacity: 0,
      duration: 0.25,
    }, ">")

    // 9. Set deprovisioned user to translate x and y of 0
    .to("#github-offboarding #deprovisioned-user-3", {
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