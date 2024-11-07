import { experiences, projects } from "./data.js";

const timeline = document.getElementById("timeline");
const template = document.getElementById("timeline-item-template");

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});

// Generate the timeline items
const generateTimeline = () => {
  experiences.forEach((exp, index) => {
    // Clone the template content
    const item = template.content.cloneNode(true);

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
    const delay = `${index * 0.3}s`; // Increment delay for each item
    const container = item.querySelector(".fade-in");
    container.style.setProperty("--delay", delay); // Set CSS variable

    // Append the populated item to the timeline
    timeline.appendChild(item);
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
window.addEventListener("scroll", fadeInOnScroll);

// Trigger initial check in case elements are already in the viewport
fadeInOnScroll();

document.querySelector("form").addEventListener("submit", function (event) {
  const confirmed = confirm("Are you sure you want to submit the form?");
  if (!confirmed) {
    event.preventDefault(); // Prevent submission if not confirmed
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
  projectCard.querySelector("img").setAttribute("alt", project.title);
  projectCard.querySelector("h3").textContent = project.title;
  projectCard.querySelector("p.text-gray-400").textContent =
    project.description;
  projectCard.querySelector(".stack-content").textContent =
    project.stack.join(", ");
  projectCard
    .querySelector(".github-link")
    .setAttribute("href", project.github);

  if (project.live) {
    const liveLink = projectCard.querySelector(".live-link");
    liveLink.setAttribute("href", project.live);
    liveLink.classList.remove("hidden");
  }
  projectsContainer.appendChild(projectCard);
});
