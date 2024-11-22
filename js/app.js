function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const burgerBtn = document.getElementById("toggle-btn");

  sidebar.classList.toggle("open");
  sidebar.classList.toggle("closed");
  mainContent.classList.toggle("sidebar-open");
  burgerBtn.classList.toggle("active"); // This will toggle the background color
}

document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const homeTab = document.getElementById("homeTab");
  const profileTab = document.getElementById("profileTab");
  const settingsTab = document.getElementById("settingsTab");
  const logoutButton = document.getElementById("logout");
  const sidebarProfilePicture = document.getElementById(
    "sidebarProfilePicture"
  );

  // Helper: Load Home Content
  const loadHomeContent = () => {
    contentDiv.innerHTML = `
      <h2 class="page-title">Welcome to your Dashboard!</h2>
      <div class="calendar-container">
          <iframe 
              src="https://calendar.google.com/calendar/embed?src=en.philippine%23holiday%40group.v.calendar.google.com&ctz=Asia%2FManila" 
              style="border: 0" width="100%" height="600" frameborder="0" scrolling="no">
          </iframe>
      </div>
    `;
  };

  // Helper: Load Profile Content
  const loadProfileContent = () => {
    contentDiv.innerHTML = `
      <h2 class="page-title">Edit Profile Picture</h2>
      <div class="profile-picture-container">
          <img id="profilePicturePreview" src="${
            localStorage.getItem("profilePicture") ||
            "../image/LRM_20240517_192913-01.jpeg"
          }" 
               alt="Profile Picture Preview" class="profile-picture">
      </div>
      <div class="upload-section">
          <label for="profilePictureInput" class="upload-label">Choose a New Picture:</label>
          <input type="file" id="profilePictureInput" accept="image/*" class="upload-input">
          <button id="updateProfilePicture" class="btn">Update Picture</button>
      </div>
    `;

    const profilePictureInput = document.getElementById("profilePictureInput");
    const profilePicturePreview = document.getElementById(
      "profilePicturePreview"
    );
    const updateButton = document.getElementById("updateProfilePicture");

    profilePictureInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          profilePicturePreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    updateButton.addEventListener("click", () => {
      const file = profilePictureInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
          profilePicturePreview.src = imageData;
          localStorage.setItem("profilePicture", imageData);
          sidebarProfilePicture.src = imageData;
          alert("Profile picture updated successfully!");
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image.");
      }
    });
  };

  // Helper: Load Settings Content
  const loadSettingsContent = () => {
    contentDiv.innerHTML = `
      <h2 class="page-title">Edit Account Details</h2>
      <form id="settingsForm" class="settings-form">
          <div class="form-group">
              <label for="settingsEmail">Email</label>
              <input type="email" id="settingsEmail" value="${
                localStorage.getItem("userEmail") || ""
              }" required>
          </div>
          <div class="form-group">
              <label for="settingsPassword">Password</label>
              <input type="password" id="settingsPassword" value="" required>
          </div>
          <button type="submit" class="btn">Save Changes</button>
      </form>
    `;

    const settingsForm = document.getElementById("settingsForm");
    settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newEmail = document.getElementById("settingsEmail").value;
      const newPassword = document.getElementById("settingsPassword").value;
      if (newEmail && newPassword) {
        localStorage.setItem("userEmail", newEmail);
        alert("Account details updated successfully!");
      } else {
        alert("Please fill out all fields.");
      }
    });
  };

  // Login Form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");

      if (email === storedEmail && password === storedPassword) {
        alert("Login successful.");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "../html/dashboard.html";
      } else {
        document.getElementById("errorMessage").innerText =
          "Invalid email or password. Please try again.";
      }
    });
  }

  // Register Form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      if (email && password) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        alert("Registration successful. You can now log in.");
        window.location.href = "../index.html";
      } else {
        alert("Please fill out all fields for registration.");
      }
    });
  }

  // Logout
  logoutButton?.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully.");
    window.location.href = "../index.html";
  });

  // Navigation Handlers
  homeTab?.addEventListener("click", loadHomeContent);
  profileTab?.addEventListener("click", loadProfileContent);
  settingsTab?.addEventListener("click", loadSettingsContent);

  // Default: Load Home Content
  if (location.pathname.endsWith("../html/dashboard.html")) {
    loadHomeContent();
  }

  // Sidebar Profile Picture Initialization
  const savedProfilePicture = localStorage.getItem("profilePicture");
  if (savedProfilePicture) {
    sidebarProfilePicture.src = savedProfilePicture;
  }

  // Redirect if not logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn && location.pathname.endsWith("../html/dashboard.html")) {
    alert("Please log in first.");
    window.location.href = "../index.html";
  } else if (isLoggedIn && location.pathname.endsWith("../index.html")) {
    window.location.href = "../html/dashboard.html";
  }
});
