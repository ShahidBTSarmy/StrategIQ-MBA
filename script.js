// =========================
// GLOBAL VARIABLES
// =========================

let revenueChart = null;
let marketChart = null;
let selectedCompany = null;

const companyContainer =
document.querySelector(".company-container");

const searchInput =
document.getElementById("searchInput");

const companyName =
document.getElementById("companyName");

const companyIndustry =
document.getElementById("companyIndustry");

const companyRevenue =
document.getElementById("companyRevenue");

const companyRisk =
document.getElementById("companyRisk");

const summary =
document.getElementById("summary");

const businessModel =
document.getElementById("businessModel");

const strengths =
document.getElementById("strengths");

const weaknesses =
document.getElementById("weaknesses");

const opportunities =
document.getElementById("opportunities");

const threats =
document.getElementById("threats");

const forces =
document.getElementById("forces");

const recommendations =
document.getElementById("recommendations");

const marketingLessons =
document.getElementById("marketingLessons");

const strategyLessons =
document.getElementById("strategyLessons");

const operationsLessons =
document.getElementById("operationsLessons");

const leadershipLessons =
document.getElementById("leadershipLessons");

// =========================
// EXECUTIVE DASHBOARD
// =========================

function loadExecutiveDashboard(){

document.getElementById(
"totalCompanies"
).innerText =
companies.length;

const industries =
[
...new Set(
companies.map(
c => c.industry
)
)
];

document.getElementById(
"industriesCovered"
).innerText =
industries.length;

// Revenue Leader

const revenueLeader =
companies.reduce((a,b)=>{

const revA =
parseFloat(
a.revenue.replace(
/[^0-9.]/g,
""
)
);

const revB =
parseFloat(
b.revenue.replace(
/[^0-9.]/g,
""
)
);

return revA > revB ? a : b;

});

document.getElementById(
"highestRevenue"
).innerText =
revenueLeader.name;

// Growth Leader

const growthLeader =
companies.reduce((a,b)=>{

const growthA =
a.revenueHistory[
a.revenueHistory.length - 1
] -
a.revenueHistory[0];

const growthB =
b.revenueHistory[
b.revenueHistory.length - 1
] -
b.revenueHistory[0];

return growthA > growthB ? a : b;

});

document.getElementById(
"highestGrowth"
).innerText =
growthLeader.name;

// Average Risk

const riskCount = {

Low:0,
Medium:0,
High:0

};

companies.forEach(company=>{

if(
company.risk
.toLowerCase()
.includes("high")
){

riskCount.High++;

}
else if(
company.risk
.toLowerCase()
.includes("low")
){

riskCount.Low++;

}
else{

riskCount.Medium++;

}

});

let avgRisk = "Medium";

if(
riskCount.High >
riskCount.Medium
){

avgRisk = "High";

}

if(
riskCount.Low >
riskCount.Medium
){

avgRisk = "Low";

}

document.getElementById(
"avgRisk"
).innerText =
avgRisk;

// Market Leader

const marketLeader =
companies.reduce((a,b)=>

a.marketShare[0] >
b.marketShare[0]
? a
: b

);

document.getElementById(
"marketLeader"
).innerText =
marketLeader.name;

// Industry Intelligence

loadIndustryDashboard();

}

// =========================
// INDUSTRY DASHBOARD
// =========================

function loadIndustryDashboard(){

let totalMarketSize = 0;
let totalGrowth = 0;
let totalCompetition = 0;
let totalInnovation = 0;

companies.forEach(company=>{

if(company.industryStats){

const market =
parseFloat(
company.industryStats.marketSize
.replace(/[^0-9.]/g,"")
);

const growth =
parseFloat(
company.industryStats.growthRate
.replace(/[^0-9.]/g,"")
);

const competition =
parseFloat(
company.industryStats.competition
);

const innovation =
parseFloat(
company.industryStats.innovation
);

totalMarketSize += market;
totalGrowth += growth;
totalCompetition += competition;
totalInnovation += innovation;

}

});

const count = companies.length;

document.getElementById(
"marketSize"
).innerText =
"$" +
Math.round(totalMarketSize) +
"T";

document.getElementById(
"growthRate"
).innerText =
(
totalGrowth /
count
).toFixed(1)
+ "%";

document.getElementById(
"competitionScore"
).innerText =
(
totalCompetition /
count
).toFixed(1);

document.getElementById(
"innovationScore"
).innerText =
(
totalInnovation /
count
).toFixed(1);

}

// =========================
// COMPANY CARDS
// =========================

function loadCompanies(data){

companyContainer.innerHTML = "";

data.forEach(company=>{

companyContainer.innerHTML += `

<div
class="company-card"
onclick="displayCompany(${company.id})"
>

<img
src="${company.logo}"
alt="${company.name}"
class="company-logo"
>

<h3>
${company.name}
</h3>

<p>
${company.industry}
</p>

<p class="card-revenue">
Revenue:
${company.revenue}
</p>

<p class="card-risk">
Risk:
${company.risk}
</p>

</div>

`;

});

}
// =========================
// DISPLAY COMPANY
// =========================

function displayCompany(id){

const company =
companies.find(
c => c.id === id
);

if(!company){
return;
}

selectedCompany = company;

// =========================
// BASIC PROFILE
// =========================

companyName.innerText =
company.name;

companyIndustry.innerHTML =
`<strong>Industry:</strong> ${company.industry}`;

companyRevenue.innerHTML =
`<strong>Revenue:</strong> ${company.revenue}`;

companyRisk.innerHTML =
`<strong>Risk:</strong> ${company.risk}`;

summary.innerText =
company.summary;

businessModel.innerText =
company.businessModel;

// =========================
// SWOT
// =========================

strengths.innerHTML =
company.swot.strengths
.map(item =>
`<li>${item}</li>`
)
.join("");

weaknesses.innerHTML =
company.swot.weaknesses
.map(item =>
`<li>${item}</li>`
)
.join("");

opportunities.innerHTML =
company.swot.opportunities
.map(item =>
`<li>${item}</li>`
)
.join("");

threats.innerHTML =
company.swot.threats
.map(item =>
`<li>${item}</li>`
)
.join("");

// =========================
// PORTER'S FIVE FORCES
// =========================

forces.innerHTML = `

<div class="force-item">
Rivalry<br>
${company.forces.rivalry}/10
</div>

<div class="force-item">
Supplier Power<br>
${company.forces.supplier}/10
</div>

<div class="force-item">
Buyer Power<br>
${company.forces.buyer}/10
</div>

<div class="force-item">
Threat of Entrants<br>
${company.forces.entrants}/10
</div>

<div class="force-item">
Threat of Substitutes<br>
${company.forces.substitutes}/10
</div>

`;

// =========================
// ESG DASHBOARD
// =========================

document.getElementById(
"environmentalScore"
).innerText =
company.esg.environmental;

document.getElementById(
"socialScore"
).innerText =
company.esg.social;

document.getElementById(
"governanceScore"
).innerText =
company.esg.governance;

document.getElementById(
"riskIndicator"
).innerText =
company.risk;

// =========================
// STRATEGIC RECOMMENDATIONS
// =========================

recommendations.innerHTML =
company.recommendations
.map(item =>
`<li>${item}</li>`
)
.join("");

// =========================
// BUSINESS MODEL CANVAS
// =========================

document.getElementById(
"keyPartners"
).innerHTML =
company.businessCanvas.partners
.map(item =>
`<li>${item}</li>`
)
.join("");

document.getElementById(
"keyActivities"
).innerHTML =
company.businessCanvas.activities
.map(item =>
`<li>${item}</li>`
)
.join("");

document.getElementById(
"valueProposition"
).innerHTML =
company.businessCanvas.value
.map(item =>
`<li>${item}</li>`
)
.join("");

document.getElementById(
"customerSegments"
).innerHTML =
company.businessCanvas.customers
.map(item =>
`<li>${item}</li>`
)
.join("");

document.getElementById(
"revenueStreams"
).innerHTML =
company.businessCanvas.revenue
.map(item =>
`<li>${item}</li>`
)
.join("");

document.getElementById(
"costStructure"
).innerHTML =
company.businessCanvas.costs
.map(item =>
`<li>${item}</li>`
)
.join("");

// =========================
// MBA LESSONS
// =========================

marketingLessons.innerHTML =
company.mbaLessons.marketing
.map(item =>
`<li>${item}</li>`
)
.join("");

strategyLessons.innerHTML =
company.mbaLessons.strategy
.map(item =>
`<li>${item}</li>`
)
.join("");

operationsLessons.innerHTML =
company.mbaLessons.operations
.map(item =>
`<li>${item}</li>`
)
.join("");

leadershipLessons.innerHTML =
company.mbaLessons.leadership
.map(item =>
`<li>${item}</li>`
)
.join("");

// =========================
// UPDATE CHARTS
// =========================

updateCharts(company);

// =========================
// SCROLL TO PROFILE
// =========================

document
.querySelector(".profile")
.scrollIntoView({
behavior:"smooth"
});

}
// =========================
// CHARTS
// =========================

function updateCharts(company){

// =========================
// REVENUE CHART
// =========================

const revenueCtx =
document.getElementById(
"revenueChart"
);

if(revenueChart){
revenueChart.destroy();
}

revenueChart =
new Chart(revenueCtx,{

type:"line",

data:{

labels:[
"2020",
"2021",
"2022",
"2023",
"2024"
],

datasets:[{

label:
company.name +
" Revenue",

data:
company.revenueHistory,

fill:true,

tension:0.4

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:true
}

}

}

});

// =========================
// MARKET SHARE CHART
// =========================

const marketCtx =
document.getElementById(
"marketChart"
);

if(marketChart){
marketChart.destroy();
}

marketChart =
new Chart(marketCtx,{

type:"doughnut",

data:{

labels:[

company.name,

"Competitor 1",

"Competitor 2",

"Competitor 3",

"Others"

],

datasets:[{

data:
company.marketShare

}]

},

options:{

responsive:true

}

});

}

// =========================
// SEARCH
// =========================

searchInput
.addEventListener(
"keyup",
function(){

const value =
this.value
.toLowerCase();

const filtered =
companies.filter(company=>

company.name
.toLowerCase()
.includes(value)

);

loadCompanies(
filtered
);

}
);

// =========================
// FILTERS
// =========================

document
.querySelectorAll(
".filter-btn"
)
.forEach(button=>{

button
.addEventListener(
"click",
function(){

const filter =
this.innerText;

if(filter === "All"){

loadCompanies(
companies
);

return;

}

const filtered =
companies.filter(company=>

company.industry
.toLowerCase()
.includes(
filter
.toLowerCase()
)

);

loadCompanies(
filtered
);

});

});

// =========================
// INITIAL COMPANY
// =========================

// =========================
// COMPANY COMPARISON
// =========================

function loadComparisonDropdowns(){

const company1 =
document.getElementById(
"company1"
);

const company2 =
document.getElementById(
"company2"
);

company1.innerHTML = "";
company2.innerHTML = "";

companies.forEach(company=>{

company1.innerHTML += `

<option value="${company.id}">
${company.name}
</option>

`;

company2.innerHTML += `

<option value="${company.id}">
${company.name}
</option>

`;

});

}

document
.getElementById("compareBtn")
.addEventListener("click",()=>{

const id1 =
parseInt(
document.getElementById(
"company1"
).value
);

const id2 =
parseInt(
document.getElementById(
"company2"
).value
);

const companyA =
companies.find(
c => c.id === id1
);

const companyB =
companies.find(
c => c.id === id2
);

if(!companyA || !companyB){
return;
}

document.getElementById(
"comparisonResult"
).innerHTML =

`

<h2>
${companyA.name}
vs
${companyB.name}
</h2>

<br>

<table
style="
width:100%;
border-collapse:collapse;
text-align:center;
">

<tr
style="
background:#2563eb;
color:white;
">

<th>Metric</th>

<th>${companyA.name}</th>

<th>${companyB.name}</th>

</tr>

<tr>

<td>Revenue</td>

<td>${companyA.revenue}</td>

<td>${companyB.revenue}</td>

</tr>

<tr>

<td>Risk</td>

<td>${companyA.risk}</td>

<td>${companyB.risk}</td>

</tr>

<tr>

<td>Industry</td>

<td>${companyA.industry}</td>

<td>${companyB.industry}</td>

</tr>

<tr>

<td>Environmental</td>

<td>${companyA.esg.environmental}</td>

<td>${companyB.esg.environmental}</td>

</tr>

<tr>

<td>Social</td>

<td>${companyA.esg.social}</td>

<td>${companyB.esg.social}</td>

</tr>

<tr>

<td>Governance</td>

<td>${companyA.esg.governance}</td>

<td>${companyB.esg.governance}</td>

</tr>

</table>

`;

});

// =========================
// PDF EXPORT
// =========================

document.getElementById("downloadReport").addEventListener("click", () => {

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

if(!selectedCompany){
alert("Please select a company first.");
return;
}

let y = 20;

function addSection(title, content) {

if(y > 260){
doc.addPage();
y = 20;
}

doc.setFontSize(14);
doc.text(title, 10, y);
y += 8;

doc.setFontSize(10);

const lines = doc.splitTextToSize(content, 180);
doc.text(lines, 10, y);

y += lines.length * 5 + 8;
}

addSection("Company", selectedCompany.name);
addSection("Industry", selectedCompany.industry);
addSection("Revenue", selectedCompany.revenue);
addSection("Risk Level", selectedCompany.risk);

addSection("Executive Summary",
selectedCompany.summary);

addSection("Business Model",
selectedCompany.businessModel);

addSection("Future Outlook",
selectedCompany.futureOutlook);

addSection(
"Strengths",
selectedCompany.swot.strengths.join(", ")
);

addSection(
"Weaknesses",
selectedCompany.swot.weaknesses.join(", ")
);

addSection(
"Opportunities",
selectedCompany.swot.opportunities.join(", ")
);

addSection(
"Threats",
selectedCompany.swot.threats.join(", ")
);

addSection(
"Strategic Recommendations",
selectedCompany.recommendations.join(", ")
);

addSection(
"Risk Factors",
selectedCompany.riskFactors.join(", ")
);

addSection(
"Competitors",
selectedCompany.competitors.join(", ")
);

addSection(
"MBA Marketing Lessons",
selectedCompany.mbaLessons.marketing.join(", ")
);

addSection(
"MBA Strategy Lessons",
selectedCompany.mbaLessons.strategy.join(", ")
);

doc.save(`${selectedCompany.name}_Executive_Report.pdf`);

});


// =========================
// DARK MODE
// =========================

document
.getElementById(
"themeToggle"
)
.addEventListener(
"click",
()=>{

document.body
.classList.toggle(
"dark-mode"
);

const button =
document.getElementById(
"themeToggle"
);

if(
document.body.classList.contains(
"dark-mode"
)
){

button.innerHTML =
"☀️";

}
else{

button.innerHTML =
"🌙";

}

});

// =========================
// STARTUP INITIALIZATION
// =========================

window.addEventListener(
"DOMContentLoaded",
()=>{

loadExecutiveDashboard();

loadCompanies(
companies
);

loadComparisonDropdowns();

if(
companies &&
companies.length > 0
){

displayCompany(
companies[0].id
);

}

});