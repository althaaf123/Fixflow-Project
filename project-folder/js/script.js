
document.addEventListener('DOMContentLoaded', () => {


  function placeholderDataUri(letter) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>`
      + `<rect width='100%' height='100%' fill='#2F6B93'/>`
      + `<text x='50%' y='54%' font-family='Arial, sans-serif' font-size='150' `
      + `font-weight='700' fill='#FFA51F' text-anchor='middle' dominant-baseline='middle'>${letter}</text>`
      + `</svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return; 
      img.dataset.fallbackApplied = 'true';
      const letter = (img.alt || 'F').trim().charAt(0).toUpperCase();
      img.src = placeholderDataUri(letter);
    });
  });

  /* ---------- 1. NAV SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------- 1b. MOBILE HAMBURGER MENU ----------*/

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('open');
    mobileMenuPanel.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenuPanel.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });


  mobileMenuPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.getElementById('mobileSignInBtn').addEventListener('click', () => {
    closeMobileMenu();
    document.getElementById('signInBtn').click(); // reuses the same sign-in modal logic below
  });
  document.getElementById('mobileGetStartedBtn').addEventListener('click', () => {
    closeMobileMenu();
    document.getElementById('getStartedBtn').click(); // reuses the same "scroll to services" logic below
  });

  /* ---------- 2. SIGN IN MODAL ---------- */
  const signInModal = document.getElementById('signInModal');
  document.getElementById('signInBtn').addEventListener('click', () => signInModal.classList.add('show'));
  document.getElementById('closeSignIn').addEventListener('click', () => signInModal.classList.remove('show'));
  signInModal.addEventListener('click', (e) => { if (e.target === signInModal) signInModal.classList.remove('show'); });
  document.getElementById('modalSignInBtn').addEventListener('click', () => {
    signInModal.classList.remove('show');
    alert('Signed in successfully.');
  });

  /* ---------- 3. GET STARTED / EXPLORE / FIND SOLUTION ---------- */
  document.getElementById('getStartedBtn').addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('exploreServicesBtn').addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('findSolutionBtn').addEventListener('click', () => {
    document.getElementById('assistant').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- 4. SERVICE CARDS CLICKABLE ---------- */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('assistant').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- 5. SMART ASSISTANT CHIPS ---------- */
  const issueText = document.getElementById('issueText');
  const assistantError = document.getElementById('assistantError');
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      issueText.value = chip.dataset.issue;
      assistantError.classList.remove('show');
    });
  });

  /* ---------- 5b. UPLOAD A PHOTO (working file input + preview) ---------- */
  const issuePhotoInput = document.getElementById('issuePhotoInput');
  const uploadBoxText = document.getElementById('uploadBoxText');
  const uploadPreview = document.getElementById('uploadPreview');
  issuePhotoInput.addEventListener('change', () => {
    const file = issuePhotoInput.files && issuePhotoInput.files[0];
    if (!file) return;
    uploadBoxText.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadPreview.src = e.target.result;
      uploadPreview.hidden = false;
    };
    reader.readAsDataURL(file);
  });

  /* ---------- SUCCESS BUTTON HELPER ---------- */

  function showButtonSuccess(btn, successText, targetSectionId, holdMs = 900, resetMs = 1600) {
    const originalText = btn.textContent;
    btn.classList.add('btn-success');
    btn.textContent = successText;
    btn.disabled = true;
    setTimeout(() => {
      if (targetSectionId) {
        document.getElementById(targetSectionId).scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        btn.classList.remove('btn-success');
        btn.textContent = originalText;
        btn.disabled = false;
      }, resetMs);
    }, holdMs);
  }

  /* ---------- 6. ANALYZE ISSUE VALIDATION ---------- */
  document.getElementById('analyzeBtn').addEventListener('click', (e) => {
    if (!issueText.value.trim()) {
      assistantError.classList.add('show');
      return;
    }
    assistantError.classList.remove('show');
    showButtonSuccess(e.currentTarget, '✓ Issue Analyzed', 'match');
  });

  /* ---------- 7. SMART MATCH SELECT & CONTINUE ---------- */
  document.getElementById('selectContinueBtn').addEventListener('click', () => {
    document.getElementById('professionals').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- 8. PROFESSIONAL SEARCH FILTER ---------- */
  const proSearch = document.getElementById('proSearch');
  const proCards = document.querySelectorAll('.pro-card');
  function filterPros() {
    const q = proSearch.value.trim().toLowerCase();
    proCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.classList.toggle('hidden', q && !name.includes(q));
    });
  }
  proSearch.addEventListener('input', filterPros);

  /* ---------- 9. FILTER BUTTON (sort by rating desc, simple demo) ---------- */
  document.getElementById('proFilterBtn').addEventListener('click', () => {
    const grid = document.getElementById('prosGrid');
    const cards = Array.from(grid.children);
    cards.sort((a, b) => {
      const ra = parseFloat(a.querySelector('.pro-rating').textContent.replace('★', ''));
      const rb = parseFloat(b.querySelector('.pro-rating').textContent.replace('★', ''));
      return rb - ra;
    });
    cards.forEach(c => grid.appendChild(c));
  });

  /* ---------- 10 & 11. VIEW PROFILE / SELECT PRO ---------- */
  const detailName = document.getElementById('detailName');
  const detailRole = document.getElementById('detailRole');
  const detailPhoto = document.getElementById('detailPhoto');
  const detailRating = document.getElementById('detailRating');
  const detailDesc = document.getElementById('detailDesc');
  const detailExperience = document.getElementById('detailExperience');
  const detailJobs = document.getElementById('detailJobs');
  const detailResponse = document.getElementById('detailResponse');
  const detailPrice = document.getElementById('detailPrice');


  const proData = {
    'Rajesh Kumar': {
      img: 'assets/images/Rajesh Kumar.png',
      role: 'Verified AC & Refrigeration Expert',
      rating: '4.9',
      experience: '8 Years',
      jobs: '1,240+',
      response: 'Usually within 1 hr',
      price: 'Standard Rates',
      desc: 'Highly experienced technician specializing in split and window AC units. Known for quick diagnostics and clean work. Always arrives on time with full toolkits.'
    },
    'Amit Singh': {
      img: 'assets/images/Amit Singh.jpg',
      role: 'Verified Plumbing Specialist',
      rating: '4.8',
      experience: '6 Years',
      jobs: '890+',
      response: 'Usually within 2 hrs',
      price: 'Standard Rates',
      desc: 'Specialist in leak detection, pipe repair, and bathroom fittings. Careful, tidy work with a strong focus on fixing the root cause, not just the symptom.'
    },
    'Suresh Menon': {
      img: 'assets/images/Suresh Menon.jpg',
      role: 'Verified Electrical Technician',
      rating: '4.7',
      experience: '10 Years',
      jobs: '1,560+',
      response: 'Usually within 1.5 hrs',
      price: 'Standard Rates',
      desc: 'Handles wiring faults, switchboard upgrades, and appliance installations. Follows strict safety checks on every job before signing off.'
    },
    'David Wilson': {
      img: 'assets/images/David Wilson.jpg',
      role: 'Verified Carpentry Expert',
      rating: '4.9',
      experience: '7 Years',
      jobs: '710+',
      response: 'Usually within 3 hrs',
      price: 'Standard Rates',
      desc: 'Custom furniture repair, door and cabinet fitting, and general woodwork. Precise measurements and a clean finish on every job.'
    }
  };


  document.querySelectorAll('.pro-card').forEach(card => {
    const name = card.dataset.name;
    const info = proData[name];
    const cardImg = card.querySelector('img');
    if (info && cardImg) {
      cardImg.src = info.img;
    }
  });

  let selectedPro = 'Rajesh Kumar';


  function syncTrackingProfessional() {
    if (typeof trackingState !== 'undefined') {
      const firstName = selectedPro.split(' ')[0];
      trackingState.proName = firstName;
      if (typeof timelineItems !== 'undefined' && timelineItems[1]) {
        timelineItems[1].textContent = firstName + ' Assigned';
      }
      if (typeof renderTracking === 'function') renderTracking();
    }
  }

  document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.pro;
      selectedPro = name;
      const info = proData[name] || proData['Rajesh Kumar'];

      detailName.textContent = name;
      detailRole.textContent = info.role;
      detailRating.textContent = info.rating;
      detailDesc.textContent = info.desc;
      detailExperience.textContent = info.experience;
      detailJobs.textContent = info.jobs;
      detailResponse.textContent = info.response;
      detailPrice.textContent = info.price;
      detailPhoto.src = info.img; 
      detailPhoto.alt = name;

      document.getElementById('proDetail').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.getElementById('selectProBtn').addEventListener('click', () => {
    syncTrackingProfessional();

    document.getElementById('confPro').textContent = selectedPro + ' assigned';
    alert(selectedPro + ' selected for your service.');
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- 12, 13 & 14. BOOKING FORM: SERVICE / DATE / TIME / ADDRESS ---------- */
  const bookingService = document.getElementById('bookingService');
  const bookingDate = document.getElementById('bookingDate');
  const bookingTime = document.getElementById('bookingTime');
  const bookingAddress = document.getElementById('bookingAddress');

  const summaryServiceName = document.getElementById('summaryServiceName');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const summaryPrice = document.getElementById('summaryPrice');

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d)) return '—';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function updateBookingSummary() {
    const selectedOption = bookingService.options[bookingService.selectedIndex];
    summaryServiceName.textContent = selectedOption.value;
    summaryPrice.textContent = '₹' + selectedOption.dataset.price;
    summaryDate.textContent = formatDate(bookingDate.value);
    summaryTime.textContent = bookingTime.value;
  }

  // default the date field to today
  (function setDefaultDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    bookingDate.value = `${yyyy}-${mm}-${dd}`;
  })();

  [bookingService, bookingDate, bookingTime].forEach(el => {
    el.addEventListener('change', updateBookingSummary);
  });
  updateBookingSummary();

  /* ---------- 15 & 16. CONFIRM BOOKING ---------- */
  document.getElementById('confirmBookingBtn').addEventListener('click', (e) => {
    if (!bookingAddress.value.trim()) {
      alert('Please enter your service address.');
      bookingAddress.focus();
      return;
    }
    const bookingId = 'FF-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('bookingId').textContent = bookingId;
    document.getElementById('confBookedDate').textContent = formatDate(bookingDate.value);
    document.getElementById('confPro').textContent = selectedPro + ' assigned';
    document.getElementById('confTime').textContent = bookingTime.value;

    syncTrackingProfessional();

    showButtonSuccess(e.currentTarget, '✓ Booking Confirmed', 'confirmed');
  });

  /* ---------- 17. LIVE TRACKING: MOVING MARKER ALONG THE DRAWN ROUTE ---------- */
  const trackName = document.getElementById('trackName');
  const etaMinsEl = document.getElementById('etaMins');
  const distKmEl = document.getElementById('distKm');
  const mapMarker = document.getElementById('mapMarker');
  const routePath = document.getElementById('routePath');
  const timelineItems = document.querySelectorAll('#timeline li');

  // Editable tracking state — change these values (or wire them up to a real
  // booking/professional) and the map + info card update automatically.
  const trackingState = {
    proName: 'Rajesh',
    startEta: 12,     // minutes, when the professional was first "on the way"
    startDistance: 2.5 // km, distance at the start
  };

  let currentEta = trackingState.startEta;
  let currentDistance = trackingState.startDistance;
  const pathLength = routePath.getTotalLength();

  function placeMarkerAtProgress(progress) {
    // progress: 0 = just started, 1 = arrived at destination
    const clamped = Math.max(0, Math.min(1, progress));
    const point = routePath.getPointAtLength(clamped * pathLength);
    // the SVG viewBox is 600x420 — use % so it stays correct at any container size
    mapMarker.style.left = (point.x / 600 * 100) + '%';
    mapMarker.style.top = (point.y / 420 * 100) + '%';
  }

  function renderTracking() {
    // this is the fix: the "on the way" text now always reflects
    // trackingState.proName instead of the hardcoded HTML text
    trackName.textContent = trackingState.proName + ' is on the way';
    etaMinsEl.textContent = currentEta;
    distKmEl.textContent = currentDistance.toFixed(1);
    const etaSpan = Math.max(1, trackingState.startEta - 1); // avoid divide-by-zero if startEta is 1
    const progress = 1 - (currentEta - 1) / etaSpan;
    placeMarkerAtProgress(progress);
  }

  // place marker at the starting position on load
  renderTracking();

  function updateTracking() {
    if (currentEta > 1) {
      currentEta -= 1;
      const step = trackingState.startDistance / Math.max(1, trackingState.startEta - 1);
      currentDistance = Math.max(0.1, +(currentDistance - step).toFixed(1));
      renderTracking();
    } else {
      trackName.textContent = trackingState.proName + ' has arrived';
      document.getElementById('trackEta').textContent = 'Arrived just now';
      document.getElementById('trackDistance').textContent = 'At your doorstep';
      placeMarkerAtProgress(1); // snap marker exactly onto the destination pin
      timelineItems.forEach(li => { li.classList.add('tl-done'); li.classList.remove('tl-active'); });
      clearInterval(trackingInterval);
    }
  }
  const trackingInterval = setInterval(updateTracking, 8000);

  /* ---------- 18. SUPPORT CARDS ---------- */
  document.getElementById('helpCenterCard').addEventListener('click', () => alert('Opening Help Center articles...'));
  document.getElementById('chatSupportCard').addEventListener('click', () => alert('Connecting you to live chat support...'));
  document.getElementById('emailUsCard').addEventListener('click', () => alert('Opening email support: support@fixflow.com'));
  document.getElementById('emergencyCard').addEventListener('click', () => alert('Priority emergency support requested. A professional will call you shortly.'));

  /* ---------- 19. DOWNLOAD APP ---------- */
  document.getElementById('downloadAppBtn').addEventListener('click', () => {
    alert('The FixFlow app link will be sent to your device shortly.');
  });
  document.getElementById('bookNowBtn').addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  });

});
