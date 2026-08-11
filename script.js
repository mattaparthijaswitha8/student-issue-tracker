const issueForm = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");

let issues = JSON.parse(localStorage.getItem("studentIssues")) || [];

function displayIssues() {
    issueList.innerHTML = "";

    issues.forEach(function(issue) {
        issueList.innerHTML += `
            <div class="issue-card">
                <h3>${issue.title}</h3>
                <p><strong>Student:</strong> ${issue.student}</p>
                <p><strong>Category:</strong> ${issue.category}</p>
                <p><strong>Description:</strong> ${issue.description}</p>
                <p><strong>Status:</strong> ${issue.status}</p>
            </div>
        `;
    });

    document.getElementById("totalIssues").textContent = issues.length;

    document.getElementById("pendingIssues").textContent =
        issues.filter(issue => issue.status === "Pending").length;

    document.getElementById("resolvedIssues").textContent =
        issues.filter(issue => issue.status === "Resolved").length;
}

issueForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const issueTitle = document.getElementById("issueTitle").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const newIssue = {
        student: studentName,
        title: issueTitle,
        category: category,
        description: description,
        status: "Pending"
    };

    issues.push(newIssue);

    localStorage.setItem("studentIssues", JSON.stringify(issues));

    displayIssues();

    alert(
        "Issue Submitted Successfully!\n\n" +
        "Student: " + studentName + "\n" +
        "Issue: " + issueTitle + "\n" +
        "Category: " + category
    );

    issueForm.reset();
});

displayIssues();
