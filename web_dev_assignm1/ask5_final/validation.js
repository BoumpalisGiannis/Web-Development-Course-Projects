
window.onload = function(){

    /* 1os eleghos gia egkyrotita password */ 
    let confirmPasswordInput = document.getElementById("pword_id2");
    let passwordInput = document.getElementById("pword_id");

    confirmPasswordInput.addEventListener('change', function(evt){
        
        if (confirmPasswordInput.value !== passwordInput.value ){
            confirmPasswordInput.setCustomValidity('Οι κωδικοί που πληκτρολογήσατε δεν είναι ίδιοι!');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }

        if (confirmPasswordInput.value.length < 8 && confirmPasswordInput.checkValidity()) {
            confirmPasswordInput.setCustomValidity("Ο κωδικός πρέπει να περιέχει τουλάχιστον 8 ψηφια!");
        }

    })

    /* 2os eleghos gia egkyrotita kai mikos toy username */
    let username = document.getElementById("username_id");
    username.addEventListener('change', function(evt){
        
        if (username.value.length < 8 ){
            username.setCustomValidity('Το ψευδώνυμο σας πρέπει να περιέχει τουλάχιστον 8 ψηφία!')
        } else {
            username.setCustomValidity('')
        }
    })

    /* 3os eleghos gia egkyrotita ilikias */
    let dobInput = document.getElementById("dob_id");
    dobInput.addEventListener('input', function(evt){
        let enteredDate = new Date(dobInput.value);
        let birth_year = enteredDate.getFullYear();
        let currDate = new Date();
        let curr_year = currDate.getFullYear();

        console.log(birth_year);

        age = curr_year - birth_year;
        if (age < 18) {
            dobInput.setCustomValidity('Πρέπει να είστε πάνω απο 18 ετών για να εγγραφείτε στον ιστότοπό μας.');
        } else {
            dobInput.setCustomValidity('');
        }
    });

    

}
