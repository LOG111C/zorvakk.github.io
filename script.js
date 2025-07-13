// Language translations
const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      schedule: "Schedule",
      highlights: "Highlights",
      setup: "Setup",
      contact: "Contact",
    },
    buttons: {
      follow: "Follow",
      watchLive: "Watch Live",
      support: "Support",
      sendMessage: "Send Message",
    },
    stream: {
      offline: "Currently Offline",
      notStreaming: "Not streaming",
      currentlyPlaying: "Currently Playing: ",
    },
  },
  hu: {
    nav: {
      home: "Főoldal",
      about: "Rólam",
      schedule: "Menetrend",
      highlights: "Kiemelések",
      setup: "Felszerelés",
      contact: "Kapcsolat",
    },
    buttons: {
      follow: "Követés",
      watchLive: "Élő Nézés",
      support: "Támogatás",
      sendMessage: "Üzenet Küldése",
    },
    stream: {
      offline: "Jelenleg Offline",
      notStreaming: "Nem streamel",
      currentlyPlaying: "Jelenleg játszik: ",
    },
  },
}

let currentLanguage = "en"
let isLive = false
let streamData = null

// Twitch API configuration
const TWITCH_USERNAME = "zorvakk_" // Your Twitch username
const TWITCH_CLIENT_ID = "ua106ofiinf9pmdsx9e7cax7tck6xu"; // Twitch Client ID
const TWITCH_ACCESS_TOKEN = "lu9qb2ejollxig2kgh9bvfwojuuune"; // Twitch Access Token


// Check Twitch stream status
async function checkTwitchStatus() {
  try {
    // Get user ID first
    const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${TWITCH_USERNAME}`, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    })

    const userData = await userResponse.json()
    const userId = userData.data[0].id

    // Check if streaming
    const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    })

    const streamData = await streamResponse.json()

    // Get follower count
    const followersResponse = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}`, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    })

    const followersData = await followersResponse.json()

    // Update UI with real data
    if (streamData.data && streamData.data.length > 0) {
      const stream = streamData.data[0]
      updateStreamStatus(true, {
        viewers: stream.viewer_count,
        game: stream.game_name,
        title: stream.title,
        followers: followersData.total,
      })
    } else {
      updateStreamStatus(false, {
        viewers: 0,
        followers: followersData.total,
      })
    }
  } catch (error) {
    console.log("Error fetching Twitch data, using demo data:", error)
    useDemoData()
  }
}

// Use demo data when API is not available
function useDemoData() {
  // Simulate being live sometimes
  const isCurrentlyLive = Math.random() > 0.5

  if (isCurrentlyLive) {
    updateStreamStatus(true, {
      viewers: Math.floor(Math.random() * 2000) + 500,
      game: "Cyberpunk 2077",
      title: "Epic boss fight incoming!",
      followers: 25400,
    })
  } else {
    updateStreamStatus(false, {
      viewers: 0,
      followers: 25400,
    })
  }
}

// Update stream status UI
function updateStreamStatus(live, data) {
  isLive = live
  streamData = data

  const liveStatus = document.getElementById("liveStatus")
  const liveDot = document.getElementById("liveDot")
  const liveText = document.getElementById("liveText")
  const viewerCount = document.getElementById("viewerCount")
  const followerCount = document.getElementById("followerCount")
  const aboutFollowerCount = document.getElementById("aboutFollowerCount")
  const heroBadge = document.getElementById("heroBadge")
  const streamInfo = document.getElementById("streamInfo")
  const streamTitle = document.getElementById("streamTitle")
  const streamGame = document.getElementById("streamGame")
  const streamPreview = document.querySelector(".stream-preview")

  // Show live status
  liveStatus.style.display = "flex"

  if (live) {
    // Live state
    liveStatus.className = "live-status live"
    liveText.textContent = "LIVE"
    heroBadge.style.display = "flex"
    heroBadge.className = "live-badge live"
    streamInfo.style.display = "block"
    streamPreview.className = "stream-preview live"

    // Update stream info
    const currentlyPlaying = translations[currentLanguage].stream.currentlyPlaying
    streamTitle.textContent = currentlyPlaying + data.game
    streamGame.textContent = data.title

    // Update viewer count with animation
    animateCountUp(viewerCount, data.viewers)
  } else {
    // Offline state
    liveStatus.className = "live-status offline"
    liveText.textContent = "OFFLINE"
    heroBadge.style.display = "none"
    streamInfo.style.display = "none"
    streamPreview.className = "stream-preview offline"

    // Set viewer count to 0
    viewerCount.textContent = "0"
  }

  // Update follower counts
  const formattedFollowers = formatNumber(data.followers)
  followerCount.textContent = formattedFollowers
  aboutFollowerCount.textContent = formattedFollowers
}

// Animate number counting up
function animateCountUp(element, targetValue) {
  const startValue = Number.parseInt(element.textContent.replace(/,/g, "")) || 0
  const duration = 2000
  const startTime = Date.now()

  function updateCount() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)
    element.textContent = formatNumber(currentValue)

    if (progress < 1) {
      requestAnimationFrame(updateCount)
    }
  }

  updateCount()
}

// Format numbers with K/M suffixes
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toLocaleString()
}

// Language switching functionality
function setLanguage(lang) {
  currentLanguage = lang

  // Update language buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[onclick="setLanguage('${lang}')"]`).classList.add("active")

  // Update all translatable elements
  document.querySelectorAll("[data-en]").forEach((element) => {
    const enText = element.getAttribute("data-en")
    const huText = element.getAttribute("data-hu")

    if (lang === "hu" && huText) {
      element.textContent = huText
    } else if (lang === "en" && enText) {
      element.textContent = enText
    }
  })

  // Update stream info if live
  if (isLive && streamData) {
    const streamTitle = document.getElementById("streamTitle")
    const currentlyPlaying = translations[currentLanguage].stream.currentlyPlaying
    streamTitle.textContent = currentlyPlaying + streamData.game
  }

  // Update placeholder texts
  updatePlaceholders(lang)

  // Save language preference
  localStorage.setItem("preferredLanguage", lang)
}

function updatePlaceholders(lang) {
  const placeholders = {
    en: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      subject: "Business Inquiry",
      message: "Tell me about your project or collaboration idea...",
    },
    hu: {
      firstName: "János",
      lastName: "Kovács",
      email: "janos@example.com",
      subject: "Üzleti Megkeresés",
      message: "Mesélj a projektedről vagy együttműködési ötletedről...",
    },
  }

  const inputs = document.querySelectorAll("input[placeholder], textarea[placeholder]")
  inputs.forEach((input) => {
    const name = input.getAttribute("name")
    if (placeholders[lang][name]) {
      input.setAttribute("placeholder", placeholders[lang][name])
    }
  })
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu")
  navMenu.classList.toggle("active")
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Viewer count live updates (when streaming)
function startLiveUpdates() {
  if (!isLive) return

  setInterval(() => {
    if (isLive && streamData) {
      // Simulate small viewer count changes
      const change = Math.floor(Math.random() * 20) - 10
      const newViewers = Math.max(0, streamData.viewers + change)
      streamData.viewers = newViewers

      const viewerCount = document.getElementById("viewerCount")
      viewerCount.textContent = formatNumber(newViewers)
    }
  }, 5000) // Update every 5 seconds
}

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simple validation
  if (!data.firstName || !data.lastName || !data.email || !data.message) {
    alert(
      currentLanguage === "en" ? "Please fill in all required fields." : "Kérjük, töltse ki az összes kötelező mezőt.",
    )
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = currentLanguage === "en" ? "Sending..." : "Küldés..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert(currentLanguage === "en" ? "Message sent successfully!" : "Üzenet sikeresen elküldve!")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  const animatedElements = document.querySelectorAll(".schedule-card, .highlight-card, .setup-card, .stat-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Load saved language preference
  const savedLanguage = localStorage.getItem("preferredLanguage")
  if (savedLanguage && savedLanguage !== "en") {
    setLanguage(savedLanguage)
  }

  // Check Twitch status immediately
  checkTwitchStatus()

  // Check Twitch status every 30 seconds
  setInterval(checkTwitchStatus, 30000)

  // Start live viewer updates
  setTimeout(startLiveUpdates, 5000)

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)"
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.8)"
    }
  })
})

// Add mobile menu styles
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        flex-direction: column;
        padding: 20px;
        border-top: 1px solid rgba(147, 51, 234, 0.2);
    }
    
    .nav-menu.active .nav-link {
        padding: 12px 0;
        border-bottom: 1px solid rgba(147, 51, 234, 0.1);
    }
}
`

// Inject mobile menu styles
const styleSheet = document.createElement("style")
styleSheet.textContent = mobileMenuStyles
document.head.appendChild(styleSheet)
