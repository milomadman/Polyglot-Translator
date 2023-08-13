const fromText = document.querySelector(".from-text"),
toText1 = document.querySelector(".to-text1"),
toText2 = document.querySelector(".to-text2"),
toText3 = document.querySelector(".to-text3"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        var initial_country_codes = ["en-GB","fr-FR","es-ES","it-IT"];
        let selected;
        if (country_code==initial_country_codes[id]){
            selected="selected"
        } else {
            selected="";
        }

        //let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "it-IT" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText1.value = "";
        toText2.value = "";
        toText3.value = "";
    }
});

translateBtn.addEventListener("click", () => {
    MustTranslate();
});

fromText.addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode || 0;
    if (key === 13) {
        MustTranslate();
    }
});


function MustTranslate(){
    let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo1 = selectTag[1].value;
    translateTo2 = selectTag[2].value;
    translateTo3 = selectTag[3].value;
    if(!text) return;
    toText1.setAttribute("placeholder", "Translating...");
    toText2.setAttribute("placeholder", "Translating...");
    toText3.setAttribute("placeholder", "Translating...");
    let apiUrl1 = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo1}`;
    let apiUrl2 = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo2}`;
    let apiUrl3 = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo3}`;
    fetch(apiUrl1).then(res => res.json()).then(data => {
        toText1.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText1.value = data.translation;
            }
        });
        toText1.setAttribute("placeholder", "Translation");
    });
    fetch(apiUrl2).then(res => res.json()).then(data => {
        toText2.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText1.value = data.translation;
            }
        });
        toText2.setAttribute("placeholder", "Translation");
    });
    fetch(apiUrl3).then(res => res.json()).then(data => {
        toText3.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText1.value = data.translation;
            }
        });
        toText3.setAttribute("placeholder", "Translation");
    });
};

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText1.value) return;
        if(!fromText.value || !toText2.value) return;
        if(!fromText.value || !toText3.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText1.value);
                navigator.clipboard.writeText(toText2.value);
                navigator.clipboard.writeText(toText3.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText1.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});