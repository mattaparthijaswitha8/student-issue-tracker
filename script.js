const issueForm = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");
let totalIssues = 0;
let pendingIssues = 0;
let resolvedIssues = 0;

issueForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const issueTitle = document.getElementById("issueTitle").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    totalIssues++;
pendingIssues++;

document.getElementById("totalIssues").textContent = totalIssues;
document.getElementById("pendingIssues").textContent = pendingIssues;
document.getElementById("resolvedIssues").textContent = resolvedIssues;

    issueList.innerHTML += `
        <div class="issue-card">
            <h3>${issueTitle}</h3>
            <p><strong>Student:</strong> ${studentName}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Status:</strong> Pending</p>
        </div>
    `;

    alert(
        "Issue Submitted Successfully!\n\n" +
        "Student: " + studentName + "\n" +
        "Issue: " + issueTitle + "\n" +
        "Category: " + category
    );

    issueForm.reset();
});