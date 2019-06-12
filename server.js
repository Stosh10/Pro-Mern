const express = require('express');// This is used to include the middleware to the server

const app = express();
const bodyParser = require('body-parser');// we have added the body parser middleware to our server to intercept requests,analyze the content type and deal  with the body appropriately


app.use(express.static('static'));
app.use(bodyParser.json()); // Since we only required the JSON parser we have set it up in this line

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};
const issueFieldType = {
  id: 'required',
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'required',
  title: 'required',
};
function validateIssue(issue) {
  for (const field in issueFieldType) {
    const type = issueFieldType[type];
    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      return `${field} is required.`;
    }
  }
  if (!validIssueStatus[issue.status])
    return `${issue.status} is not a valid status`;

  return null;
}

app.post('api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.id = issue.length + 1;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';

    const err = validateIssue(newIssue)
    if (err) {
      res.status(422).json({message: `Invalid request; ${err}` });
      return;
    }
  issue.push(newIssue);
  res.json(newIssue);
})
const issues = [
  {
    id: 1, status: "Open",
    Owner: "Stosh",
    created: new Date("2019-07-20"), effort: 5, completionDate: undefined,
    title: "Error on clicking Ronaldo",
  },
  {
    id: 2, status: "Assigned", Owner: "Molly",
    created: new Date("2019-04-10"), effort: 14, completionDate: new Date("2019-07-20"),
    title: "Missing bottom border on panel",
  },
];
// Array of issues moved from app.jsx to server
app.get('/api/issues', (req, res) => { // Whatever we have in this line of code is the defined path and it iis going to be executed by the handler function that follows
  const metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues })
})
app.listen(3000, () => {
  console.log('App started listening on port 3000')
});