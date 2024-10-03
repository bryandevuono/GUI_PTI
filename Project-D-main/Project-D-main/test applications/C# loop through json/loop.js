const fs = require('fs');

function loopControls(controls) {
    controls.forEach(element => {
        console.log("test");
        if (element instanceof Object) {
            for (const property in element) {
                if (property === "controls") loopControls(element[property]);
                if (property === "label") console.log(element[property]);
            }
        }
    });
}

function main() {
    const jsonString = fs.readFileSync('./data.json', 'utf8');
    const jsonObject = JSON.parse(jsonString);
    for (const property in jsonObject) {
        if (property === "title") console.log(jsonObject[property]);
        if (property === "controls") loopControls(jsonObject[property]);
    }
}

main();