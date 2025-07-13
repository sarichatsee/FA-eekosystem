// DOM Elements
const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const cameraInput = document.getElementById("cameraInput");
const selectFileBtn = document.getElementById("selectFileBtn");
const takePictureBtn = document.getElementById("takePictureBtn");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const removeImageBtn = document.getElementById("removeImage");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultsSection = document.getElementById("resultsSection");
const loadingSpinner = document.getElementById("loadingSpinner");
const resultsContent = document.getElementById("resultsContent");
const resultCard = document.getElementById("resultCard");

// Chatbot Elements
const chatbotContainer = document.getElementById("chatbotContainer");
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotBody = document.getElementById("chatbotBody");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendMessageBtn = document.getElementById("sendMessage");

// Medical Chatbot Elements
const medicalChatMessages = document.getElementById("medicalChatMessages");
const medicalChatInput = document.getElementById("medicalChatInput");
const sendMedicalMessageBtn = document.getElementById("sendMedicalMessage");
const clearMedicalChatBtn = document.getElementById("clearMedicalChat");
const downloadMedicalChatBtn = document.getElementById("downloadMedicalChat");
const quickQuestionBtns = document.querySelectorAll(".quick-question-btn");
const flowiseContainer = document.getElementById("flowiseContainer");
const closeFlowiseBtn = document.getElementById("closeFlowise");

// Navigation Elements
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

// Global Variables
let currentImage = null;
let chatbotMinimized = false;

// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  initializeChatbot();
  checkMobileSupport();
});

// Event Listeners
function initializeEventListeners() {
  // File Upload Events
  selectFileBtn.addEventListener("click", () => fileInput.click());
  takePictureBtn.addEventListener("click", () => cameraInput.click());
  fileInput.addEventListener("change", handleFileSelect);
  cameraInput.addEventListener("change", handleFileSelect);
  removeImageBtn.addEventListener("click", removeImage);
  analyzeBtn.addEventListener("click", analyzeImage);

  // Drag and Drop Events
  uploadArea.addEventListener("dragover", handleDragOver);
  uploadArea.addEventListener("dragleave", handleDragLeave);
  uploadArea.addEventListener("drop", handleDrop);
  uploadArea.addEventListener("click", () => fileInput.click());

  // Chatbot Events
  chatbotToggle.addEventListener("click", toggleChatbot);
  sendMessageBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Medical Chatbot Events
  sendMedicalMessageBtn.addEventListener("click", sendMedicalMessage);
  medicalChatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMedicalMessage();
    }
  });
  clearMedicalChatBtn.addEventListener("click", clearMedicalChat);
  downloadMedicalChatBtn.addEventListener("click", downloadMedicalChat);

  // Quick Question Events
  quickQuestionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const question = this.getAttribute("data-question");
      askQuickQuestion(question);
    });
  });

  // Flowise Events
  if (closeFlowiseBtn) {
    closeFlowiseBtn.addEventListener("click", closeFlowise);
  }

  // Navigation Events
  menuToggle.addEventListener("click", toggleMobileMenu);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        nav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// Mobile Support Check
function checkMobileSupport() {
  // Check if device supports camera
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    takePictureBtn.style.display = "none";
    console.log("Camera not supported on this device");
  }
}

// File Handling Functions
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    displayImage(file);
  } else {
    showError("Please select a valid image file.");
  }
}

function handleDragOver(event) {
  event.preventDefault();
  uploadArea.classList.add("dragover");
}

function handleDragLeave(event) {
  event.preventDefault();
  uploadArea.classList.remove("dragover");
}

function handleDrop(event) {
  event.preventDefault();
  uploadArea.classList.remove("dragover");

  const files = event.dataTransfer.files;
  if (files.length > 0 && files[0].type.startsWith("image/")) {
    displayImage(files[0]);
  } else {
    showError("Please drop a valid image file.");
  }
}

function displayImage(file) {
  currentImage = file;
  const reader = new FileReader();

  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewImage.alt = `Preview of ${file.name}`;
    uploadArea.style.display = "none";
    imagePreview.style.display = "block";
  };

  reader.readAsDataURL(file);
}

function removeImage() {
  currentImage = null;
  previewImage.src = "";
  previewImage.alt = "";
  uploadArea.style.display = "block";
  imagePreview.style.display = "none";
  resultsSection.style.display = "none";
  fileInput.value = "";
  cameraInput.value = "";
}

// Image Analysis Function
async function analyzeImage() {
  if (!currentImage) {
    showError("Please select an image first.");
    return;
  }

  // Show loading state
  resultsSection.style.display = "block";
  loadingSpinner.style.display = "block";
  resultsContent.style.display = "none";

  // Scroll to results section
  resultsSection.scrollIntoView({ behavior: "smooth" });

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock analysis result (replace with actual AI API call)
    const analysisResult = await mockImageAnalysis(currentImage);

    displayResults(analysisResult);

    // Add result to chat
    addBotMessage(`I've analyzed your image. ${analysisResult.summary}`);
  } catch (error) {
    console.error("Analysis error:", error);
    showError("Failed to analyze image. Please try again.");
    resultsSection.style.display = "none";
  }
}

// Mock Image Analysis (Replace with actual AI API)
async function mockImageAnalysis(imageFile) {
  // This is a mock function. In a real implementation, you would:
  // 1. Send the image to an AI service (OpenAI Vision, Google Cloud Vision, etc.)
  // 2. Process the response
  // 3. Return structured data

  const mockResults = [
    {
      animal: "Garden Snake",
      dangerous: false,
      confidence: 85,
      summary:
        "This appears to be a harmless garden snake. These snakes are non-venomous and generally beneficial for pest control.",
      medicalAttention: false,
      advice:
        "Garden snakes are completely harmless to humans. If bitten (which is rare), simply clean the wound with soap and water.",
      emergencyLevel: "none",
    },
    {
      animal: "Black Widow Spider",
      dangerous: true,
      confidence: 92,
      summary:
        "This appears to be a Black Widow spider, which is venomous and potentially dangerous.",
      medicalAttention: true,
      advice:
        "If bitten by a Black Widow, seek immediate medical attention. Apply ice to the bite area and try to remain calm.",
      emergencyLevel: "high",
    },
    {
      animal: "Honey Bee",
      dangerous: true,
      confidence: 78,
      summary:
        "This appears to be a honey bee. While generally not aggressive, they can sting if threatened.",
      medicalAttention: false,
      advice:
        "If stung, remove the stinger by scraping (not pinching), apply ice, and monitor for allergic reactions.",
      emergencyLevel: "low",
    },
  ];

  // Randomly select a result for demonstration
  return mockResults[Math.floor(Math.random() * mockResults.length)];
}

function displayResults(result) {
  loadingSpinner.style.display = "none";
  resultsContent.style.display = "block";

  // Determine card style based on danger level
  let cardClass = "safe";
  let urgencyText = "";
  let iconClass = "fas fa-check-circle";
  let iconColor = "var(--secondary-color)";

  if (result.dangerous) {
    if (result.emergencyLevel === "high") {
      cardClass = "danger";
      urgencyText = "🚨 SEEK IMMEDIATE MEDICAL ATTENTION";
      iconClass = "fas fa-exclamation-triangle";
      iconColor = "var(--danger-color)";
    } else {
      cardClass = "warning";
      urgencyText = "⚠️ Exercise Caution";
      iconClass = "fas fa-exclamation-circle";
      iconColor = "var(--warning-color)";
    }
  } else {
    urgencyText = "✅ Generally Safe";
  }

  resultCard.className = `result-card ${cardClass}`;
  resultCard.innerHTML = `
        <div class="result-header">
            <h4><i class="${iconClass}" style="color: ${iconColor}; margin-right: 8px;"></i>${
    result.animal
  }</h4>
            <span class="confidence">Confidence: ${result.confidence}%</span>
        </div>
        <div class="urgency-banner ${cardClass}">
            <strong>${urgencyText}</strong>
        </div>
        <div class="result-content">
            <p><strong>Analysis:</strong> ${result.summary}</p>
            <p><strong>Advice:</strong> ${result.advice}</p>
            ${
              result.medicalAttention
                ? '<p class="medical-warning"><strong>⚕️ Medical Attention Required:</strong> Contact emergency services or visit the nearest hospital immediately.</p>'
                : ""
            }
        </div>
        <div class="result-actions">
            <button class="btn btn-primary" onclick="askFollowUp()">
                <i class="fas fa-comments"></i>
                Ask Follow-up Questions
            </button>
            ${
              result.medicalAttention
                ? '<button class="btn btn-danger" onclick="callEmergency()"><i class="fas fa-phone"></i>Call Emergency</button>'
                : ""
            }
        </div>
    `;
}

// Chatbot Functions
function initializeChatbot() {
  // Initial bot message is already in HTML
  chatbotContainer.classList.add("minimized");
  chatbotMinimized = true;
  updateChatbotToggleIcon();
}

function toggleChatbot() {
  chatbotMinimized = !chatbotMinimized;
  chatbotContainer.classList.toggle("minimized", chatbotMinimized);
  updateChatbotToggleIcon();

  if (!chatbotMinimized) {
    chatInput.focus();
  }
}

function updateChatbotToggleIcon() {
  const icon = chatbotToggle.querySelector("i");
  icon.className = chatbotMinimized ? "fas fa-plus" : "fas fa-minus";
  chatbotToggle.setAttribute("aria-expanded", !chatbotMinimized);
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addUserMessage(message);
  chatInput.value = "";

  // Simulate bot response
  setTimeout(() => {
    const response = generateBotResponse(message);
    addBotMessage(response);
  }, 1000);
}

function addUserMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message user-message";
  messageDiv.innerHTML = `<div class="message-content">${escapeHtml(
    message
  )}</div>`;
  chatMessages.appendChild(messageDiv);
  scrollChatToBottom();
}

function addBotMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message bot-message";
  messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
  chatMessages.appendChild(messageDiv);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mock Bot Response Generator
function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  if (message.includes("snake") || message.includes("serpent")) {
    return "Snakes can be venomous or non-venomous. Key indicators of venomous snakes include triangular heads, heat-sensing pits, and specific color patterns. If you're unsure, maintain a safe distance and upload a photo for analysis.";
  }

  if (message.includes("spider")) {
    return "Most spiders are harmless, but some like Black Widows and Brown Recluses can be dangerous. Look for distinctive markings - Black Widows have red hourglasses, Brown Recluses have violin shapes. Upload a photo for identification.";
  }

  if (
    message.includes("bee") ||
    message.includes("wasp") ||
    message.includes("sting")
  ) {
    return "Bee and wasp stings are usually not serious unless you're allergic. Remove stingers by scraping, apply ice, and watch for signs of allergic reactions like difficulty breathing or widespread swelling.";
  }

  if (message.includes("bite") || message.includes("bitten")) {
    return "If you've been bitten: 1) Stay calm, 2) Clean the wound, 3) Remove jewelry near the bite, 4) Keep the bite below heart level, 5) Seek medical attention if symptoms worsen. Upload a photo of the animal if possible.";
  }

  if (message.includes("emergency") || message.includes("help")) {
    return "For emergencies, call 911 immediately. Signs requiring emergency care: difficulty breathing, severe swelling, rapid pulse, dizziness, or severe pain. Don't wait if you're experiencing these symptoms.";
  }

  if (
    message.includes("upload") ||
    message.includes("photo") ||
    message.includes("picture")
  ) {
    return "To upload a photo, use the upload area above. You can drag and drop an image, click to select a file, or use your camera to take a picture. I'll analyze it to identify any dangerous animals.";
  }

  // Default responses
  const defaultResponses = [
    "I'm here to help you identify dangerous animals and provide safety advice. You can upload a photo for analysis or ask me specific questions about animal safety.",
    "For the most accurate identification, please upload a clear photo of the animal. I can help determine if it's venomous or poisonous and provide appropriate safety guidance.",
    "Animal safety is important! If you're ever unsure about an animal's danger level, it's best to maintain a safe distance and seek professional help.",
    "I can help identify snakes, spiders, insects, and other potentially dangerous animals. What specific animal safety question do you have?",
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Utility Functions
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showError(message) {
  // Create or update error message
  let errorDiv = document.getElementById("error-message");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = "error-message";
    errorDiv.className = "error-message";
    errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--danger-color);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            max-width: 300px;
        `;
    document.body.appendChild(errorDiv);
  }

  errorDiv.textContent = message;

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

function showSuccess(message) {
  // Similar to showError but with success styling
  let successDiv = document.getElementById("success-message");
  if (!successDiv) {
    successDiv = document.createElement("div");
    successDiv.id = "success-message";
    successDiv.className = "success-message";
    successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary-color);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            max-width: 300px;
        `;
    document.body.appendChild(successDiv);
  }

  successDiv.textContent = message;

  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv);
    }
  }, 3000);
}

// Navigation Functions
function toggleMobileMenu() {
  nav.classList.toggle("active");
  const isExpanded = nav.classList.contains("active");
  menuToggle.setAttribute("aria-expanded", isExpanded);

  // Animate hamburger menu
  const spans = menuToggle.querySelectorAll("span");
  if (isExpanded) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
}

// Result Action Functions
function askFollowUp() {
  if (chatbotMinimized) {
    toggleChatbot();
  }
  chatInput.focus();
  addBotMessage(
    "I see you'd like to ask a follow-up question about the analysis. What would you like to know more about?"
  );
}

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    handleFileSelect,
    displayImage,
    removeImage,
    generateBotResponse,
    escapeHtml,
  };
}

// Medical Chatbot Functions
function sendMedicalMessage() {
  const message = medicalChatInput.value.trim();
  if (!message) return;

  addMedicalUserMessage(message);
  medicalChatInput.value = "";

  // Auto-resize textarea
  medicalChatInput.style.height = "auto";

  // Simulate medical bot response
  setTimeout(() => {
    const response = generateMedicalBotResponse(message);
    addMedicalBotMessage(response);
  }, 1000);
}

function addMedicalUserMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message medical-user-message";
  messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user" aria-hidden="true"></i>
        </div>
        <div class="message-content">
            <div class="message-header">
                <span class="sender-name">You</span>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
            <div class="message-text">${escapeHtml(message)}</div>
        </div>
    `;
  medicalChatMessages.appendChild(messageDiv);
  scrollMedicalChatToBottom();
}

function addMedicalBotMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message medical-bot-message";
  messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-md" aria-hidden="true"></i>
        </div>
        <div class="message-content">
            <div class="message-header">
                <span class="sender-name">Medical AI Assistant</span>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
            <div class="message-text">${message}</div>
        </div>
    `;
  medicalChatMessages.appendChild(messageDiv);
  scrollMedicalChatToBottom();
}

function scrollMedicalChatToBottom() {
  medicalChatMessages.scrollTop = medicalChatMessages.scrollHeight;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function askQuickQuestion(question) {
  medicalChatInput.value = question;
  sendMedicalMessage();
}

function clearMedicalChat() {
  if (confirm("Are you sure you want to clear the medical chat history?")) {
    // Keep only the initial bot message
    const initialMessage = medicalChatMessages.querySelector(
      ".medical-bot-message"
    );
    medicalChatMessages.innerHTML = "";
    if (initialMessage) {
      medicalChatMessages.appendChild(initialMessage.cloneNode(true));
    }
    showSuccess("Medical chat history cleared");
  }
}

function downloadMedicalChat() {
  const messages = Array.from(medicalChatMessages.querySelectorAll(".message"));
  let chatContent = "Medical Chat History - Eek-o-system\n";
  chatContent += "==========================================\n\n";

  messages.forEach((message) => {
    const sender = message.querySelector(".sender-name").textContent;
    const time = message.querySelector(".message-time").textContent;
    const text = message.querySelector(".message-text").textContent;

    chatContent += `[${time}] ${sender}:\n${text}\n\n`;
  });

  chatContent += "\n==========================================\n";
  chatContent += "Disclaimer: This chat is for informational purposes only.\n";
  chatContent +=
    "Always consult with healthcare professionals for medical advice.";

  const blob = new Blob([chatContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `medical-chat-${new Date().toISOString().split("T")[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showSuccess("Chat history downloaded");
}

function generateMedicalBotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  // Emergency keywords
  if (
    message.includes("emergency") ||
    message.includes("911") ||
    message.includes("urgent")
  ) {
    return `🚨 <strong>EMERGENCY ALERT</strong><br><br>
        If this is a life-threatening emergency, please <strong>call 911 immediately</strong> or go to your nearest emergency room.<br><br>
        Signs that require immediate emergency care:
        <ul>
            <li>Difficulty breathing or shortness of breath</li>
            <li>Chest pain or pressure</li>
            <li>Severe allergic reaction (anaphylaxis)</li>
            <li>Loss of consciousness</li>
            <li>Severe bleeding that won't stop</li>
            <li>Signs of stroke (face drooping, arm weakness, speech difficulty)</li>
        </ul>
        Do not delay seeking emergency medical care.`;
  }

  // Snake bite responses
  if (message.includes("snake") && message.includes("bite")) {
    return `🐍 <strong>Snake Bite Emergency Protocol:</strong><br><br>
        <strong>IMMEDIATE ACTIONS:</strong>
        <ol>
            <li><strong>Stay calm</strong> - Don't panic, this helps slow venom spread</li>
            <li><strong>Call 911</strong> or get to an emergency room immediately</li>
            <li><strong>Remove jewelry</strong> near the bite site before swelling occurs</li>
            <li><strong>Keep the bite below heart level</strong> if possible</li>
            <li><strong>Don't move</strong> the affected limb unnecessarily</li>
        </ol>
        <br><strong>DO NOT:</strong>
        <ul>
            <li>Cut the wound or try to suck out venom</li>
            <li>Apply ice or heat</li>
            <li>Drink alcohol or caffeine</li>
            <li>Take pain medications that thin blood</li>
        </ul>
        <br><strong>⚠️ Seek immediate medical attention regardless of the snake type.</strong>`;
  }

  // Spider bite responses
  if (message.includes("spider") && message.includes("bite")) {
    return `🕷️ <strong>Spider Bite Assessment and Care:</strong><br><br>
        <strong>MOST spider bites are harmless</strong>, but watch for these <strong>dangerous signs</strong>:
        <ul>
            <li>Severe pain that worsens over time</li>
            <li>Muscle cramping or rigidity</li>
            <li>Nausea, vomiting, or sweating</li>
            <li>Difficulty breathing</li>
            <li>Skin breakdown or ulceration at bite site</li>
        </ul>
        <br><strong>IMMEDIATE CARE:</strong>
        <ol>
            <li>Clean the bite with soap and water</li>
            <li>Apply ice wrapped in cloth for 10 minutes</li>
            <li>Elevate the affected area if possible</li>
            <li>Take over-the-counter pain relief if needed</li>
        </ol>
        <br><strong>🚨 Seek emergency care if you experience severe symptoms or suspect a venomous spider bite.</strong>`;
  }

  // Allergic reaction responses
  if (
    message.includes("allergic") &&
    (message.includes("reaction") ||
      message.includes("bee") ||
      message.includes("sting"))
  ) {
    return `🐝 <strong>Allergic Reaction Management:</strong><br><br>
        <strong>MILD reactions (localized swelling, redness, itching):</strong>
        <ul>
            <li>Remove stinger by scraping (don't pinch)</li>
            <li>Apply ice for 10-15 minutes</li>
            <li>Take an antihistamine (Benadryl)</li>
            <li>Apply topical anti-itch cream</li>
        </ul>
        <br><strong>🚨 SEVERE reactions (ANAPHYLAXIS) - CALL 911 IMMEDIATELY:</strong>
        <ul>
            <li>Difficulty breathing or wheezing</li>
            <li>Swelling of face, lips, or throat</li>
            <li>Rapid pulse or dizziness</li>
            <li>Widespread hives or rash</li>
            <li>Nausea, vomiting, or diarrhea</li>
        </ul>
        <br><strong>If you have an EpiPen, use it immediately and still call 911.</strong>`;
  }

  // Wound care responses
  if (
    message.includes("wound") ||
    message.includes("clean") ||
    message.includes("care")
  ) {
    return `🩹 <strong>Proper Wound Care for Animal Bites:</strong><br><br>
        <strong>IMMEDIATE CARE:</strong>
        <ol>
            <li><strong>Control bleeding</strong> - Apply direct pressure with clean cloth</li>
            <li><strong>Clean thoroughly</strong> - Rinse with clean water for 5+ minutes</li>
            <li><strong>Apply antiseptic</strong> - Use hydrogen peroxide or alcohol</li>
            <li><strong>Cover wound</strong> - Use sterile bandage or clean cloth</li>
        </ol>
        <br><strong>SEEK MEDICAL ATTENTION IF:</strong>
        <ul>
            <li>Wound is deep or gaping</li>
            <li>You can't stop the bleeding</li>
            <li>It's been >5 years since last tetanus shot</li>
            <li>Animal was wild, stray, or acting strangely</li>
            <li>You develop signs of infection</li>
        </ul>
        <br><strong>Antibiotics may be needed for most animal bites.</strong>`;
  }

  // Infection signs
  if (message.includes("infection") || message.includes("signs")) {
    return `🦠 <strong>Signs of Infection to Watch For:</strong><br><br>
        <strong>LOCAL INFECTION SIGNS:</strong>
        <ul>
            <li>Increasing redness around the wound</li>
            <li>Warmth and swelling</li>
            <li>Pus or unusual discharge</li>
            <li>Red streaking from the wound</li>
            <li>Increased pain after initial improvement</li>
        </ul>
        <br><strong>SYSTEMIC INFECTION SIGNS (SERIOUS):</strong>
        <ul>
            <li>Fever over 101°F (38.3°C)</li>
            <li>Chills or sweating</li>
            <li>Swollen lymph nodes</li>
            <li>General feeling of illness</li>
        </ul>
        <br><strong>🚨 Seek immediate medical care if you notice any of these signs, especially fever or red streaking.</strong>`;
  }

  // Emergency room guidance
  if (
    message.includes("emergency room") ||
    message.includes("er") ||
    message.includes("hospital")
  ) {
    return `🏥 <strong>When to Go to the Emergency Room:</strong><br><br>
        <strong>GO TO ER IMMEDIATELY FOR:</strong>
        <ul>
            <li><strong>Severe allergic reactions</strong> (anaphylaxis)</li>
            <li><strong>Venomous snake bites</strong> (or unknown snake species)</li>
            <li><strong>Large or deep wounds</strong> that won't stop bleeding</li>
            <li><strong>Signs of serious infection</strong> (fever, red streaking)</li>
            <li><strong>Bites to face, hands, or genitals</strong></li>
            <li><strong>Animal rabies risk</strong> (wild animals, unknown vaccination status)</li>
        </ul>
        <br><strong>URGENT CARE MAY BE SUFFICIENT FOR:</strong>
        <ul>
            <li>Minor wounds needing cleaning/stitches</li>
            <li>Tetanus shot updates</li>
            <li>Mild infections</li>
            <li>Non-emergency animal bites</li>
        </ul>
        <br><strong>When in doubt, choose the ER - it's better to be safe.</strong>`;
  }

  // Default medical responses
  const defaultResponses = [
    `I'm here to help with medical questions about animal encounters, bites, and stings. Here are some key areas I can assist with:<br><br>
        🐍 <strong>Snake bites</strong> - Emergency protocols and first aid<br>
        🕷️ <strong>Spider bites</strong> - Identification and treatment<br>
        🐝 <strong>Insect stings</strong> - Allergic reaction management<br>
        🩹 <strong>Wound care</strong> - Proper cleaning and treatment<br>
        🚨 <strong>Emergency guidance</strong> - When to seek immediate care<br><br>
        What specific medical question can I help you with?`,

    `For the best medical guidance, please describe your specific situation. Include details like:<br><br>
        • What type of animal encounter occurred?<br>
        • When did it happen?<br>
        • What symptoms are you experiencing?<br>
        • Any known allergies or medical conditions?<br><br>
        Remember: If this is an emergency, call 911 immediately.`,

    `I can provide evidence-based medical guidance for animal-related injuries and emergencies. Please ask about specific symptoms, first aid steps, or when to seek medical care.<br><br>
        <strong>Reminder:</strong> This advice is for informational purposes only and doesn't replace professional medical evaluation.`,
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Emergency Action Functions
function callEmergency() {
  if (confirm("This will attempt to call 911. Continue?")) {
    window.location.href = "tel:911";
  }
}

function callPoisonControl() {
  if (
    confirm(
      "This will attempt to call Poison Control (1-800-222-1222). Continue?"
    )
  ) {
    window.location.href = "tel:18002221222";
  }
}

function findNearestHospital() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const url = `https://www.google.com/maps/search/emergency+room+near+me/@${lat},${lng},15z`;
        window.open(url, "_blank");
      },
      function () {
        // Fallback if geolocation fails
        window.open(
          "https://www.google.com/maps/search/emergency+room+near+me",
          "_blank"
        );
      }
    );
  } else {
    window.open(
      "https://www.google.com/maps/search/emergency+room+near+me",
      "_blank"
    );
  }
}

function startTelemedicine() {
  alert(
    "Telemedicine integration would connect to your healthcare provider's telemedicine platform. This is a demo feature."
  );
}

function closeFlowise() {
  flowiseContainer.style.display = "none";
}

// Function to integrate with Flowise (placeholder for your implementation)
function initializeFlowise() {
  // This is where you would integrate your Flowise chatbot
  // Example:
  // const flowiseScript = document.createElement('script');
  // flowiseScript.src = 'YOUR_FLOWISE_EMBED_URL';
  // document.head.appendChild(flowiseScript);

  console.log(
    "Flowise integration ready - replace this with your Flowise embed code"
  );
}
// --- Safety Tips Modal Logic ---
const viewMoreTipsBtn = document.getElementById("viewMoreTipsBtn");
const safetyTipsModal = document.getElementById("safetyTipsModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeModalFooterBtn = document.getElementById("closeModalFooterBtn");

const viewMoreButtons = document.querySelectorAll(".view-more-tips");
const modals = document.querySelectorAll(".modal");
const closeModalButtons = document.querySelectorAll(
  ".modal .close-button, .modal .close-modal-btn"
); // Combined close buttons

// Open specific modal
viewMoreButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const modalId = event.target.dataset.modalTarget;
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent scrolling background
      targetModal.focus(); // Focus the modal for accessibility
    }
  });
});

// Close modal functions
function closeSafetyTipsModal(modalElement) {
  modalElement.classList.remove("show");
  document.body.style.overflow = ""; // Restore scrolling
}

// Attach close listeners to all close buttons
closeModalButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const modalToClose = event.target.closest(".modal");
    if (modalToClose) {
      closeSafetyTipsModal(modalToClose);
    }
  });
});

// Close when clicking outside the modal content for any modal
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeSafetyTipsModal(modal);
    }
  });
});

// Close when Escape key is pressed for any open modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("show")) {
        closeSafetyTipsModal(modal);
      }
    });
  }
});
