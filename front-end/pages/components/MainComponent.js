class MainComponent extends HTMLElement {
  constructor() {
    super();
    this.title = this.getAttribute("title");
    this.tableKey = this.getAttribute("key");
    this.data = [];
  }

  connectedCallback() {
    if (this.title === "Students") {
      this.fetchStudentData();
    } else if (this.title === "Attendances") {
      this.fetchAttendance();
    } else {
      this.data = JSON.parse(this.getAttribute("data") || "[]");
      this.render();
    }
  }

  // Function for Fetching Attendance
  async fetchAttendance() {
    try {
      const response = await axios.get("http://localhost:3001/get-attendance");
      this.data = response.data;
      this.render();
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  }

  // Function for Fetching Student Data
  async fetchStudentData() {
    try {
      const response = await axios.get("http://localhost:3001/get-students");
      this.data = response.data;
      this.render();
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  // Rendering HTML elements according to title
  render() {
    this.innerHTML = `
      <div class="content">
        <h2>${this.title}</h2>
        ${
          this.title === "Attendances"
            ? `
        <div class="filter-container">
          <button class="btn-open-popup" onclick="togglePopup()">Record Attendance</button>
          <button id="clear-btn-attendance" class="clear-btn">Clear</button>
          <input id="start-date-attendance" type="date" class="startDate" placeholder="Start Date">
          <input id="end-date-attendance" type="date" class="endDate" placeholder="End Date">
          <button id="search-btn-attendance" class="search-btn">Search</button>
        </div>
        `
            : ""
        }
        ${
          this.title === "Students"
            ? `
        <div class="filter-container">
          <a href="student_registration_form.html"><button id="register-btn-students" class="search-btn">Register</button><a/>
          <button id="clear-btn-students" class="clear-btn">Clear</button>
          <input id="start-date-students" type="date" class="startDate" placeholder="Start Date">
          <input id="end-date-students" type="date" class="endDate" placeholder="End Date">
          <button id="search-btn-students" class="search-btn">Search</button>
        </div>
        `
            : ""
        }
        <div id="table-component-div">
          <table-component data='${JSON.stringify(this.data)}' key="${
      this.tableKey
    }"></table-component>
        </div>
      </div>
    `;

    // Set up event listeners after rendering
    if (this.title === "Attendances") {
      this.listenToEventsAttendance();
    } else if (this.title === "Students") {
      this.listenToEventsStudents();
    }
  }

  // Event listener to search attendance by date
  listenToEventsAttendance() {
    const searchBtnAttendance = document.getElementById(
      "search-btn-attendance"
    );
    const clearBtnAttendance = document.getElementById("clear-btn-attendance");

    if (searchBtnAttendance && clearBtnAttendance) {
      searchBtnAttendance.addEventListener("click", () => {
        this.data = filterAttendance(this.data);
        this.render();
      });

      clearBtnAttendance.addEventListener("click", () => {
        this.fetchAttendance();
      });
    }
  }

  // Event listener to search student data by date
  listenToEventsStudents() {
    const searchBtnStudents = document.getElementById("search-btn-students");
    const clearBtnStudents = document.getElementById("clear-btn-students");

    if (searchBtnStudents && clearBtnStudents) {
      searchBtnStudents.addEventListener("click", () => {
        this.data = filterStudents(this.data);
        this.render();
      });

      clearBtnStudents.addEventListener("click", () => {
        this.fetchStudentData();
      });
    }
  }
}

customElements.define("main-component", MainComponent);
