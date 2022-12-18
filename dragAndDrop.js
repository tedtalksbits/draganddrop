import { supportedFilesTypes } from './constants.js';

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

    for (let i = 0; i < files.length; i++) {
        if (!supportedFilesTypes.includes(files[i].type)) {
            alert(`File type: ${files[i].type} not supported`);
            return;
        }
    }

    // check if file is support

    filesArr.push(...files);

    // display files when dropped
    hidePreview();
    displayFileInfo();
}

function uploadFile(file) {
    console.log('uploading file', file.name);
}

function deleteFile(index) {
    filesArr.splice(index, 1);
    console.log(filesArr);

    if (filesArr.length === 0) {
        document.getElementById('preview').innerHTML = '';
    }
}
function displayFileInfo() {
    console.log('in displayFileInfo');
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
                    <th>Preview</th>
                </tr>
            </thead>

        `;

    filesArr.forEach((file, index) => {
        table.innerHTML += `
                <tr id='${index}' class='${file?.isDuplicate && 'dup'}'>
                    <td data-sortid='name'>${file.name}</td>
                    <td data-sortid='type'>${file.type}</td>
                    <td data-sortid='size'>${(file.size / 1000).toFixed(
                        2
                    )}(KB)</td>
                    <td data-sortid='lastModifiedDate'>${file.lastModifiedDate.toLocaleDateString()}</td>
                    <td>
                        <span data-action="delete" data-target="${index}" class="button">❌</span>
                    </td>
                    <td>
                        <span data-action="preview" data-target="${index}" class="button">👁️</span>
                    </td>
                </tr>
            `;
    });

    filesOutput.appendChild(table);

    const deleteBtns = document.querySelectorAll('[data-action="delete"]');
    deleteBtns?.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.target;
            deleteFile(index);
            // rerender file info after deleting
            displayFileInfo();
        });
    });

    const previewBtns = document.querySelectorAll('[data-action="preview"]');
    previewBtns?.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.target;
            previewFile(filesArr[index]);
        });
    });
}

function previewFile(file) {
    console.log('in previewFile');
    let reader = new FileReader();
    document.getElementById('preview').innerHTML = '';

    // check if file is empty

    if (file.size === 0) {
        alert('File is empty');
        return;
    }

    if (file.type.includes('image')) {
        console.log(file.type);
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = document.createElement('img');
            img.classList.add('preview');
            img.src = reader.result;

            document.getElementById('preview').appendChild(img);
        };
        return;
    }

    if (file.type.includes('video')) {
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let video = document.createElement('video');
            video.classList.add('preview');
            video.src = reader.result;
            video.controls = true;

            document.getElementById('preview').appendChild(video);
        };
        return;
    }

    if (file.type.includes('audio')) {
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let audio = document.createElement('audio');
            audio.classList.add('preview');
            audio.src = reader.result;
            audio.controls = true;

            document.getElementById('preview').appendChild(audio);
        };
        return;
    }
    if (file.type.includes('pdf')) {
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let pdf = document.createElement('embed');
            pdf.classList.add('preview');
            pdf.src = reader.result;
            pdf.type = 'application/pdf';

            document.getElementById('preview').appendChild(pdf);
        };
        return;
    }
    reader.readAsText(file);
    reader.onloadend = function () {
        // display file content
        let pre = document.createElement('pre');
        pre.classList.add('preview');
        pre.innerText = reader.result;
        document.getElementById('preview').appendChild(pre);

        console.log(reader.result);
        console.log(file.type);
    };
}

function hidePreview() {
    document.getElementById('preview').innerHTML = '';
}

// onclick outide of preview, hide preview

document.addEventListener('click', (e) => {
    if (!e.target.closest('#preview')) {
        hidePreview();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        hidePreview();
    }
});

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (e) => {
    console.log('fileInput change');
    const files = e.target.files;
    console.log(files);
    filesArr.push(...files);
    hidePreview();
    displayFileInfo();
});
