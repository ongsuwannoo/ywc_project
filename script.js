var data;
const iconList = {
    "ที่จอดรถ": '<i class="fas fa-parking fa-2x"></i>',
    "สามารถนำสัตว์เลี้ยงเข้าได้": '<i class="fas fa-dog fa-2x"></i>',
    "รับจองล่วงหน้า": '<i class="fas fa-clock fa-2x"></i>'
}
$(document).ready(function () {
    axios.get('https://panjs.com/ywc18.json')
        .then(function (response) {
            // handle success
            data = response.data;
            createListCatagories(data.categories);
            createSelectProvinces(data.provinces);
            createPriceRange(data.priceRange);
            createCardProduct(data.merchants);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})

function createListCatagories(arr) {
    let categories = $("#list-categories");
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', 'categories' + i);
        input.setAttribute('value', i);
        input.setAttribute('name', 'categories');
        categories.append(input);

        let label = document.createElement('label');
        label.setAttribute('for', 'categories' + i);
        label.setAttribute('class', 'ml-1');
        label.innerText = element.name;

        categories.append(label);
        categories.append('<br>')
    }
}

function createSelectProvinces(arr) {
    let province = $("#select-provinces");
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerText = element;
        province.append(option);
    }
}

function createPriceRange(arr) {
    let province = $("#select-priceRange");
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerText = element;
        province.append(option);
    }
}

function createSubCatagories(obj) {
    let priceRanges = $("#list-priceRange").empty();

    let arr = obj['subcategories'];

    let h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title');
    h5.innerText = obj.name;
    priceRanges.append(h5);

    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', 'all_market');
    input.setAttribute('name', 'priceRange');
    priceRanges.append(input);

    let label = document.createElement('label');
    label.setAttribute('for', 'all_market');
    label.setAttribute('class', 'ml-1');
    label.innerText = "ทั้งหมด";

    priceRanges.append(label);
    priceRanges.append('<br>')

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', 'priceRange' + i);
        input.setAttribute('value', i);
        input.setAttribute('name', 'priceRange');
        priceRanges.append(input);

        let label = document.createElement('label');
        label.setAttribute('for', 'priceRange' + i);
        label.setAttribute('class', 'ml-1');
        label.innerText = element;

        priceRanges.append(label);
        priceRanges.append('<br>')
    }
}

function createCardProduct(arr) {
    let listProduct = $("#list-product").empty();
    for (let i = 0; i < arr.length; i++) {
        let card = document.createElement('div');
        card.setAttribute("class", 'card flex-row flex-wrap mb-2')

        let div_img = document.createElement('div');
        div_img.setAttribute("class", "p-1");
        let img = document.createElement('img');
        img.setAttribute("class", "cropped1");
        img.setAttribute("src", arr[i]['coverImageId'])

        div_img.append(img);

        card.append(div_img);

        let div_desc = document.createElement('div');
        div_desc.setAttribute("class", "card-block px-2 p-3");
        div_desc.setAttribute("style", "width: 60%");

        let h4 = document.createElement('h4');
        h4.setAttribute("class", "card-title");
        h4.innerText = arr[i]['shopNameTH'];
        let badge = document.createElement('span');
        if (arr[i]['isOpen'] == 'Y') {
            badge.setAttribute("class", "badge badge-success ml-3");
            badge.innerHTML = "เปิดอยู่";
        }
        else {
            badge.setAttribute("class", "badge badge-secondary ml-3");
            badge.innerHTML = "ปิดอยู่";
        }

        h4.append(badge);

        div_desc.append(h4);

        let p = document.createElement('p');
        p.setAttribute("class", "card-text");
        let subCatName = document.createElement('span');
        let priceLevel = document.createElement('span');
        let address = document.createElement('span');
        subCatName.innerHTML = arr[i]['highlightText'];

        let price = arr[i]['priceLevel'];
        priceLevel.innerHTML = " | ";
        let level;
        for (let j = 0; j < 4; j++) {
            level = document.createElement('span');
            level.innerText = "฿";
            if (j > price) {
                level.setAttribute("class", 'text-muted')
            }
            priceLevel.append(level);
        }
        address.innerHTML = " | " + arr[i]['addressDistrictName'] + ' ' + arr[i]['addressProvinceName']
        p.append(subCatName);
        p.append(priceLevel);
        p.append(address);

        div_desc.append(p);

        let hr = document.createElement('hr');
        hr.setAttribute("class", "style1");

        div_desc.append(hr);

        p = document.createElement('p');
        p.setAttribute("class", "card-text");
        p.innerHTML = arr[i]['subcategoryName'];

        div_desc.append(p);

        p = document.createElement('p');
        p.setAttribute("class", "card-text");
        p.innerHTML = '<strong>สินค้า / เมนูแนะนำ</strong> ' + arr[i]['recommendedItems'].join(', ');

        div_desc.append(p);

        let facilities = arr[i]['facilities'];
        for (let j = 0; j < facilities.length; j++) {
            const element = facilities[j];
            div_desc.innerHTML += iconList[element];
        }

        card.append(div_desc);

        listProduct.append(card);
    }
}

function changeCatagories() {
    let form = $("#form-categories")[0];
    for (let i = 0; i < form.length; i++) {
        const element = form[i];
        if (element.checked) {
            createSubCatagories(data.categories[element.value]);
        }
    }
}


