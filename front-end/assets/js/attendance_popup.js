function togglePopup() {
  const overlay = document.getElementById("popupOverlay");
  const popupContent = document.getElementById("popupContent");

  // Get the data from the existing table rows
  const rows = document.querySelectorAll("#attendance table tr");

  // Extract only the "Full Name" column data and wrap it in a table
  const fullNameData = `
      <table class="myTable">
          ${Array.from(rows)
            .slice(1) // skip the header row
            .map((row) => {
              const fullNameCell = row.cells[0]; // assuming "Full Name" is the first column
              return `<tr>
              <td>${fullNameCell.textContent}</td>
              <td><label class="switch">
                    <input type="checkbox">
                      <span class="slider round"></span>
                  </label></td>
              </tr>`; // above <td> is the toggle button
            })
            .join("")}
      </table>`;

  // Assign "Full Name" table into the popup content area
  popupContent.innerHTML = fullNameData;

  overlay.classList.toggle("show");
}
