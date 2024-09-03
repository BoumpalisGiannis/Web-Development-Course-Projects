const loginURL = 'http://localhost:3000/login'
const favesAddURL = 'http://localhost:3000/favourites/add'

async function login() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('user-password').value;

    try {
        let loginFormData = new FormData();
        loginFormData.append('username', username)
        loginFormData.append('password', password)
        let formStr = new URLSearchParams(loginFormData).toString()

        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

        const reqOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formStr
        }

        const response = await fetch(loginURL, reqOptions)

        if (response.ok) {
            const result = await response.json();
            // Hide the form
            document.getElementById('login-form').style.display = 'none';

            // Display the sessionId
            document.getElementById('sessionIdContainer').style.display = 'block';
            document.getElementById('sessionId').textContent = result.sessionId;

            document.getElementById('gotofavbutton').style.display='block';
        } else {
            const error = await response.json()
            console.log(error.message)
        }

    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Error during login' };
    }

}

async function favourites(button) {  

    if (document.getElementById('sessionId').textContent.trim() === '') {
        alert('You have to sign in first')
    } else {
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

        let sId = document.getElementById('sessionId').textContent
        const username = document.getElementById('username').value
        
        const buttonId = button.id
        const id = buttonId.replace('fave_button', '')
        
        const title = document.getElementById('cat-title'+id).textContent
        const image = document.getElementById('cat-img'+id).getAttribute('src')
        const description = document.getElementById('cat-description'+id).textContent
        const cost = document.getElementById('p2'+id).textContent

        let faveFormData = new FormData();
        faveFormData.append('id', id)
        faveFormData.append('title', title)
        faveFormData.append('image', image)
        faveFormData.append('description', description)
        faveFormData.append('cost', cost)
        faveFormData.append('username', username)
        faveFormData.append('sessionId', sId)

        let faveFormStr = new URLSearchParams(faveFormData).toString()   

        // Send a request to the server to add the advertisement to favorites
        const response = await fetch(favesAddURL, {
            method: 'POST',
            headers: myHeaders,
            body: faveFormStr
        });

        if (response.ok) {
            const result = await response.json()
            button.innerHTML = "Added"
            button.disabled = true

            if (result.message === 'Already added this adv') {
                alert(result.message)
            }
            // You may want to update the UI to reflect the change in favorites
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    }
    
}
