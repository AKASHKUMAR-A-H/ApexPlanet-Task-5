const projects = [
  {
    title: "E-commerce Shop",
    description: "A mini online shop demo with cart functionality.",
    id: "ecommerce",
    button: "Open Shop"
  },
  {
    title: "To-Do List App",
    description: "Manage your tasks with local storage support.",
    id: "todo",
    button: "Open To-Do List"
  }
];

// Store the original projects HTML for restoration
let originalProjectsHTML = null;

function renderProjects() {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = projects.map(
    p => `<div class="project-card" data-id="${p.id}">
            <h4>${p.title}</h4>
            <p>${p.description}</p>
            <button class="view-project" data-id="${p.id}">${p.button}</button>
          </div>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // Render projects
  renderProjects();

  const projectList = document.getElementById("project-list");
  // Save the original HTML only the first time
  if (originalProjectsHTML === null) {
    originalProjectsHTML = projectList.innerHTML;
  }

  // Project click handler
  projectList.addEventListener("click", function(e) {
    if (e.target.classList.contains("view-project")) {
      const id = e.target.dataset.id;
      if (id === "ecommerce") {
        showEcommerceDemo();
      } else if (id === "todo") {
        showTodoDemo();
      } else {
        alert("Demo not implemented yet!");
      }
    }
  });

  // Contact form validation
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      formMsg.textContent = "Thank you for contacting!";
      form.reset();
    });
  }
});

// E-commerce shop demo
function showEcommerceDemo() {
  const projectList = document.getElementById("project-list");
  const shopHTML = `
    <div id="shop">
      <h4>🛒 E-commerce Shop Demo</h4>
      <div id="products"></div>
      <h5>Cart</h5>
      <ul id="cart"></ul>
      <button id="closeShop" style="margin-top:1rem;">Close Shop</button>
    </div>
  `;
  projectList.innerHTML = shopHTML;

  // Products (prices in INR)
  const products = [
    { id: 1, name: "T-shirt", price: 499 },
    { id: 2, name: "Sneakers", price: 2499 },
    { id: 3, name: "Backpack", price: 1299 }
  ];
  let cart = [];

  // Render products
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = products.map(
    p => `<div class="product">
            <span>${p.name} - ₹${p.price}</span>
            <button data-id="${p.id}">Add to Cart</button>
          </div>`
  ).join("");

  // Add to cart
  productsDiv.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
      const id = Number(e.target.dataset.id);
      const product = products.find(p => p.id === id);
      cart.push(product);
      renderCart();
    }
  });

  // Render cart
  function renderCart() {
    const cartUl = document.getElementById("cart");
    if (cart.length === 0) {
      cartUl.innerHTML = "<li>Cart is empty.</li>";
      return;
    }
    cartUl.innerHTML = cart.map(
      (item, idx) => `<li>${item.name} - ₹${item.price} <button data-idx="${idx}">Remove</button></li>`
    ).join("");
  }

  // Remove from cart
  document.getElementById("cart").addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
      const idx = Number(e.target.dataset.idx);
      cart.splice(idx, 1);
      renderCart();
    }
  });

  // Close shop restores the original project cards
  document.getElementById("closeShop").onclick = () => {
    renderProjects();
  };
  renderCart();
}

// To-Do List App demo
function showTodoDemo() {
  const projectList = document.getElementById("project-list");
  const todoHTML = `
    <div id="todo-demo">
      <h4>📝 To-Do List Demo</h4>
      <form id="todoForm" autocomplete="off">
        <input id="todoInput" type="text" placeholder="Add a new task..." required style="padding:0.5rem; border-radius:6px; border:1px solid #b2dfdb; width:70%;">
        <button type="submit" style="padding:0.5rem 1rem; border-radius:6px; border:none; background:#00796b; color:#fff; margin-left:0.5rem;">Add</button>
      </form>
      <ul id="todoList" style="list-style:none; padding:0; margin-top:1rem;"></ul>
      <button id="closeTodo" style="margin-top:1rem; background:#00796b; color:#fff; border:none; border-radius:6px; padding:0.5rem 1rem;">Close To-Do</button>
    </div>
  `;
  projectList.innerHTML = todoHTML;

  let todos = [];

  function renderTodos() {
    const todoList = document.getElementById("todoList");
    if (todos.length === 0) {
      todoList.innerHTML = '<li style="color:#888;">No tasks yet.</li>';
      return;
    }
    todoList.innerHTML = todos.map((todo, idx) =>
      `<li style="background:#e0f2f1; margin-bottom:0.5rem; padding:0.5rem 0.7rem; border-radius:6px; display:flex; align-items:center; justify-content:space-between;">
        <span style="text-decoration:${todo.done ? 'line-through' : 'none'}; color:${todo.done ? '#888' : '#222'};">${todo.text}</span>
        <span>
          <button data-idx="${idx}" class="doneBtn" style="background:#ffd600; color:#222; border:none; border-radius:4px; padding:0.2rem 0.7rem; margin-right:0.5rem;">${todo.done ? 'Undo' : 'Done'}</button>
          <button data-idx="${idx}" class="removeBtn" style="background:#ff5252; color:#fff; border:none; border-radius:4px; padding:0.2rem 0.7rem;">Remove</button>
        </span>
      </li>`
    ).join('');
  }

  document.getElementById("todoForm").onsubmit = function(e) {
    e.preventDefault();
    const input = document.getElementById("todoInput");
    const value = input.value.trim();
    if (value) {
      todos.push({ text: value, done: false });
      input.value = '';
      renderTodos();
    }
  };

  document.getElementById("todoList").onclick = function(e) {
    const idx = e.target.dataset.idx;
    if (e.target.classList.contains("doneBtn")) {
      todos[idx].done = !todos[idx].done;
      renderTodos();
    } else if (e.target.classList.contains("removeBtn")) {
      todos.splice(idx, 1);
      renderTodos();
    }
  };

  document.getElementById("closeTodo").onclick = () => {
    renderProjects();
  };
  renderTodos();
}
  