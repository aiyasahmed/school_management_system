class TableComponent extends HTMLElement {
  constructor() {
    super();
    this.headings = [];
    this.data =
      typeof this.getAttribute("data") === "string"
        ? JSON.parse(this.getAttribute("data"))
        : [];
    this.tableKey = this.getAttribute("key");
  }

  connectedCallback() {
    if (this.data.length > 0) {
      this.headings = Object.keys(this.data[0]);
    }
    this.render();
  }

  render() {
    this.innerHTML = `<div>
        <input id="myInput-${this.tableKey}" type="text" onkeyup="myFunction(${
      this.tableKey
    })" placeholder="Search for names.." title="Type in a name" class="myInput">
    
            <table id="myTable-${this.tableKey}" class="myTable">
                <tr class="header" style="text-transform:capitalize">
                    ${this.headings
                      .map(
                        (heading) => `<th style="width:auto;">${heading}</th>`
                      )
                      .join("")}
                </tr>
                ${this.data
                  .map(
                    (d) => `
                <tr>
                    ${this.headings
                      .map((heading) => `<td>${d[heading]}</td>`)
                      .join("")}
                </tr>`
                  )
                  .join("")}
            </table> 
        </div>`;
  }
}

customElements.define("table-component", TableComponent);
