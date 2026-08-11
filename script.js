const SUPABASE_URL = "https://qgqmjniksqtwmoeyxsfe.supabase.co";
const SUPABASE_KEY = "sb_publishable_QSY94q7pu8QNAm7sQRxhYA_nBvpuQjl";

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const issueForm = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");

async function displayIssues() {
    const { data: issues, error } = await db
        .from("issues")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    issueList.innerHTML = "";

    issues.forEach(function(issue) {
        issueList.innerHTML += `
            <div class="issue-card">
                <h3>${issue.issue_title}</h3>
                <p><strong>Student:</strong> ${issue.student_name}</p>
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

issueForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const issueTitle = document.getElementById("issueTitle").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const { error } = await db
        .from("issues")
        .insert([
            {
                student_name: studentName,
                issue_title: issueTitle,
                category: category,
                description: description,
                status: "Pending"
            }
        ]);

    if (error) {
        alert("Could not submit issue. Please try again.");
        console.error(error);
        return;
    }

    alert(
        "Issue Submitted Successfully!\n\n" +
        "Student: " + studentName + "\n" +
        "Issue: " + issueTitle + "\n" +
        "Category: " + category
    );

    issueForm.reset();
    displayIssues();
});

displayIssues();
