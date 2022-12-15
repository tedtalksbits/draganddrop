// bring in fs
const fs = require('fs');

// build a simple CMS

// const title = document.getElementById('title');
// const content = document.getElementById('content');
// const form = document.getElementById('form');

const title = 'title';
const content = 'content';
const article = {
    title: title,
    content: content,
};
fs.appendFile('articles.json', JSON.stringify(article), function (err) {
    if (err) throw err;
    console.log('Saved!');
});

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const post = {
//         title: title.value,
//         content: content.value,
//     };
//     console.log(post);

//     // append to articlesjson file

//     fs.appendFile('articles.json', JSON.stringify(post), function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
// });
