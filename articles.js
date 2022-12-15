// load articles.json file and display in console

import data from './articles.json' assert { type: 'json' };

console.log(data);

// const reader = new FileReader();
// reader.onload = function () {
//     let res = JSON.parse(reader.result);
//     console.log(res);
// };
// reader.readAsText(selectedFile);
