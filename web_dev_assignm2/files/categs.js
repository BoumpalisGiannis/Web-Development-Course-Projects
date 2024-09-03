window.addEventListener('load', init);

function init() {

    // Gia tin prwti askisi 
    ex1();
    
}

function ex1(){
    index_fetch_data();
    category_fetch_data();
    subcategory_fetch_data();
}

function index_fetch_data() {
    
    fetch("https://wiki-ads.onrender.com/categories")
        .then(response => response.json() )
        .then(index_data => {

            const additionalDataPromises = index_data.map(item => fetch(`https://wiki-ads.onrender.com/categories/${item.id}/subcategories`)
                                                                .then(res => res.json()) );
            
            Promise.all(additionalDataPromises)
                .then(additionalDataArray => {
                    // Syndiasmmos twn vasikwn dedomenwn me ta extra ddomena poy einai oi ypokatigories 
                                                                        // ... gia na dimioyrgisoyme ena shallow copy toy arxikoy antikeimenoy
                    const indexNeededData = index_data.map((item, index) => ({...item, additionalData: additionalDataArray[index]}));
                
                const src_data = document.getElementById("index-div-template").innerHTML;
                const div_template = Handlebars.compile(src_data);

                const html = div_template({category: indexNeededData})
                document.getElementById("index-list").innerHTML = html
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => {
            console.log(error)
        })

}

function category_fetch_data() {

    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get('id');

    Handlebars.registerHelper('first', array => {       // eleghei an o pinakas yparxei kai an exei stoixeia
        return Array.isArray(array) && array.length > 0 ? array[0] : '';
    });

    fetch(`https://wiki-ads.onrender.com/ads?category=${catId}`)
        .then(response => response.json())
        .then(category_data => {
            
            const tempID = document.getElementById('category-template').innerHTML;
            const categ_template = Handlebars.compile(tempID); 

            const html = categ_template({adv: category_data})
            document.getElementById('categ-list').innerHTML = html
        })
        .catch(error => {
            console.log(error)
        })

    

}

function subcategory_fetch_data() {

    Handlebars.registerHelper('splitFeatures', features => {
        return features.split(';')
    });

    Handlebars.registerHelper('hasColon', str => {
        return str.includes(':')
    })

    Handlebars.registerHelper('splitColon', str => {
        return str.split(':');
    })

    const urlParams = new URLSearchParams(window.location.search);
    const subcatId = urlParams.get('id');

    fetch(`https://wiki-ads.onrender.com/ads?subcategory=${subcatId}`)
        .then(response => response.json())
        .then(subcategory_data => {
            
            const tempID = document.getElementById('subcategory-template').innerHTML
            const categ_template = Handlebars.compile(tempID)

            const html = categ_template({adv: subcategory_data})
            document.getElementById('subcateg-list').innerHTML = html
        })
        .catch(error => {
            console.log(error)
        })

}
