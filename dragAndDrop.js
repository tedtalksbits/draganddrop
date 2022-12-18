const dropTarget = document.getElementById('droptarget');
const filesOutput = document.getElementById('files');
const table = document.createElement('table');
const filesArr = [];
table.classList.add('table', 'table-striped', 'table-bordered', 'table-sm');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    dropTarget.addEventListener(eventName, preventDefaults);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach((eventName) => {
    dropTarget.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach((eventName) => {
    dropTarget.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    if (e.target.classList.contains('dropzone')) {
        e.target.classList.add('dragover');
    }
    // change ::after content of dropzone
}

function unhighlight(e) {
    if (e.target.classList.contains('dropzone')) {
        e.target.classList.remove('dragover');
    }
}

dropTarget.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    filesArr.push(...files);
    console.log(filesArr);

    // display files when dropped
    displayFileInfo();
}

function uploadFile(file) {
    console.log('uploading file', file.name);
}

function deleteFile(index) {
    filesArr.splice(index, 1);
    console.log(filesArr);
}
function displayFileInfo() {
    // clear output
    filesOutput.innerHTML = '';
    table.innerHTML = `
            <thead>
                <tr>
                    <th
                        data-sort="true"
                        data-sort-type="string"
                        data-sort-target="name"
                    >
                        File name
                    </th>
                    <th
                        data-sort="true"
                        data-sort-type="string"
                        data-sort-target="tyoe"
                    >
                        File Type
                    </th>
                    <th
                        data-sort="true"
                        data-sort-type="number"
                        data-sort-target="size"
                    >
                        File Size
                    </th>
                    <th
                        data-sort="true"
                        data-sort-type="date"
                        data-sort-target="lastModifiedDate"
                    >
                        Last Modified
                    </th>
                    <th>Action</th>
                </tr>
            </thead>

        `;
    console.log(filesArr);

    filesArr.forEach((file, index) => {
        table.innerHTML += `
                <tr id='${index}' class='${file?.isDuplicate && 'dup'}'>
                    <td data-sortid='name'>${file.name}</td>
                    <td data-sortid='type'>${file.type}</td>
                    <td data-sortid='size'>${(file.size / 1000).toFixed(
                        2
                    )}(kb)</td>
                    <td data-sortid='lastModifiedDate'>${file.lastModifiedDate.toLocaleDateString()}</td>
                    <td>
                        <span data-action="delete" data-target="${index}" class="button">❌</span>
                    </td>
                </tr>
            `;
    });

    filesOutput.appendChild(table);

    const deleteBtns = document.querySelectorAll('[data-action="delete"]');
    console.log(deleteBtns);
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.target;
            deleteFile(index);
            // rerender file info after deleting
            displayFileInfo();
        });
    });
}
