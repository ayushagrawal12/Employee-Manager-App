function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
}

// Employee Form Submission
const form = document.getElementById("employeeForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const employee = {
      name: document.getElementById("name").value,
      position: document.getElementById("position").value,
      about: document.getElementById("about").value,
      joining_date: document.getElementById("joining_date").value,
    };

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));

    window.location.href = "list.html";
  });
}

// Employee List and Search
const tableBody = document.getElementById("employeeTableBody");
const searchInput = document.getElementById("searchInput");
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let currentPage = 1;
const rowsPerPage = 5;

function displayEmployees() {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const employeesToDisplay = employees.slice(start, end);

  tableBody.innerHTML = employeesToDisplay
    .map(
      (emp, index) => `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.position}</td>
            <td>${emp.about}</td>
            <td>${emp.joining_date}</td>
            <td><button onclick="deleteEmployee(${
              start + index
            })">Delete</button></td>
        </tr>
    `
    )
    .join("");

  setupPagination();
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployees();
}

function searchEmployee() {
  const query = searchInput.value.toLowerCase();
  employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees = employees.filter((emp) => emp.name.toLowerCase().includes(query));
  currentPage = 1;
  displayEmployees();
}

function setupPagination() {
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";
    button.onclick = () => {
      currentPage = i;
      displayEmployees();
    };
    pagination.appendChild(button);
  }
}

if (tableBody) {
  displayEmployees();
}
