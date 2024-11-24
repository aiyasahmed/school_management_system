function filterAttendance(data) {
  const startDateInput = document.getElementById("start-date-attendance").value;
  const endDateInput = document.getElementById("end-date-attendance").value;

  // If both dates are empty, return the original data
  if (!startDateInput && !endDateInput) {
    return data;
  }

  //Filter attendance  according to date range
  const filteredAttendance = data.filter((row) => {
    const rowDate = row.date;
    return (
      (!startDateInput || rowDate >= startDateInput) &&
      (!endDateInput || rowDate <= endDateInput)
    );
  });

  return filteredAttendance;
}

function filterStudents(data) {
  const startDateInput = document.getElementById("start-date-students").value;
  const endDateInput = document.getElementById("end-date-students").value;

  // If both dates are empty, return the original data
  if (!startDateInput && !endDateInput) {
    return data;
  }

  //Filter student data according to dob
  const filteredStudentData = data.filter((d) => {
    const dob = d.dob;
    return (
      (!startDateInput || dob >= startDateInput) &&
      (!endDateInput || dob <= endDateInput)
    );
  });

  return filteredStudentData;
}
