db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insert([
    {
        status: 'Open', owner: 'Stosh',
        created: new Date('2000-07-20'), effort: 10,
        completionDate: undefined,
        title: 'I have a dream to marry Mary Molly',
    },
    {
        status: 'Assigned', owner: 'Molly',
        created: new Date('2001-04-10'), effort: 20,
        completionDate: new Date('2016-05-02'),
        title: 'If I am told to choose a partner again it would be him',
    },
]);

db.issues.createIndex({status: 1});
db.issues.createIndex({owner: 1});
db.issues.createIndex({created: 1});