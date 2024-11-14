import { experiences, projects, education } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typing", {
    strings: ["Software Developer.", "Lifelong Learner."],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
    smartBackspace: true,
  });
});

const experienceTimeline = document.getElementById("experience-timeline");
const experienceTemplate = document.getElementById("experience-item-template");
const educationTimeline = document.getElementById("education-timeline");
const educationTemplate = document.getElementById("education-item-template");

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});

// Generate experience timeline
const generateTimeline = () => {
  experiences.forEach((exp, index) => {
    // Clone the template content
    const item = experienceTemplate.content.cloneNode(true);

    // Populate content
    item.querySelector(".job-title").textContent = exp.title;
    item.querySelector(".company").textContent = exp.company;
    item.querySelector(".date").textContent = exp.date;

    // Populate the description list
    const descriptionList = item.querySelector(".description");
    exp.description.forEach((desc) => {
      const li = document.createElement("li");
      li.textContent = desc;
      descriptionList.appendChild(li);
    });

    // Add delay for sequential animation
    const delay = `${index * 0.3}s`;
    const container = item.querySelector(".fade-in");
    container.style.setProperty("--delay", delay);
    experienceTimeline.appendChild(item);
  });
};

// Generate education timeline
const generateEduTimeline = () => {
  education.forEach((edu, index) => {
    const item = educationTemplate.content.cloneNode(true);

    item.querySelector(".edu-title").textContent = edu.title;
    item.querySelector(".institute").textContent = edu.institute;
    item.querySelector(".year").textContent = edu.year;

    // Add delay for sequential animation
    const delay = `${index * 0.3}s`;
    const container = item.querySelector(".fade-in");
    container.style.setProperty("--delay", delay);
    educationTimeline.appendChild(item);
  });
};

const fadeInOnScroll = () => {
  const elements = document.querySelectorAll(".fade-in");
  const windowHeight = window.innerHeight;

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    // Add `visible` class when the element enters the viewport
    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      el.classList.add("visible");
    } else {
      // Remove `visible` class when the element exits the viewport
      el.classList.remove("visible");
    }
  });
};

// Generate the timeline and add scroll event listener
generateTimeline();
generateEduTimeline();
window.addEventListener("scroll", fadeInOnScroll);

// Trigger initial check in case elements are already in the viewport
fadeInOnScroll();

document.querySelector("form").addEventListener("submit", function (event) {
  const confirmed = confirm("Are you sure you want to submit the form?");
  if (!confirmed) {
    event.preventDefault();
  }
});

// Get the projects container and template
const projectsContainer = document.querySelector("#projects .grid");
const projectTemplate = document.querySelector("#project-template");

// Loop through the projects and populate the template
projects.forEach((project) => {
  // Clone the template content
  const projectCard = projectTemplate.content.cloneNode(true);

  // Set the project details
  const projectImage = projectCard.querySelector("img");
  if (project.image) {
    // Set the src and alt attributes for the project image
    projectImage.setAttribute("src", project.image);
    projectImage.setAttribute("alt", project.title);
  } else {
    // Hide the image if no source is provided
    projectImage.classList.add("hidden");
  }

  projectCard.querySelector("h3").textContent = project.title;
  projectCard.querySelector("p.text-gray-400").textContent =
    project.description;
  projectCard.querySelector(".stack-content").textContent =
    project.stack.join(", ");
  const githubLink = projectCard.querySelector(".github-link");
  if (project.github) {
    githubLink.setAttribute("href", project.github);
    githubLink.classList.remove("hidden"); // Ensure it's visible
  }

  if (project.live) {
    const liveLink = projectCard.querySelector(".live-link");
    liveLink.setAttribute("href", project.live);
    liveLink.classList.remove("hidden");
  }

  // Append the project card to the grid
  projectsContainer.appendChild(projectCard);
});

const typingEffect = document.getElementById("typing");

typingEffect.addEventListener("animationend", () => {
  // Clear animation by resetting its name
  typingEffect.style.animation = "none";
  void typingEffect.offsetWidth; // Trigger reflow to restart animation
  typingEffect.style.animation =
    "typing 4s steps(40, end), blinking 1s step-end infinite";
});
