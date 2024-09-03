

window.addEventListener('load', init);

const url = 'http://localhost:3000/faveads';


function init() {
    fetch_favs();
}

async function fetch_favs() {
    const username = document.getElementById('username').textContent;
    const sessionId = document.getElementById('sessionId').textContent;

    try {
        let loginFormData = new FormData();
        loginFormData.append('username', username)
        loginFormData.append('sessionId', sessionId)
        let formStr = new URLSearchParams(loginFormData).toString()

        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')


        const response = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: formStr
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const fav = await response.json();
        const jfav = JSON.stringify(fav);
        
        Handlebars.registerHelper('first', array => {       // eleghei an o pinakas yparxei kai an exei stoixeia
                return Array.isArray(array) && array.length > 0 ? array[0] : '';
            }); 
            
        const tempID = document.getElementById('category-template').innerHTML;
        const categ_template = Handlebars.compile(tempID);

        const html = categ_template({ adv: fav });
        document.getElementById('fav_ads').innerHTML = html;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
