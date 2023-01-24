

            // global variables
            let employees = [];
            const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
            email, location, phone, dob &noinfo &nat=US`;
            const gridContainer = document.querySelector(".grid-container");
            const overlay = document.querySelector(".overlay");
            const modalContainer = document.querySelector(".modal-content");
            const modalClose = document.querySelector(".modal-close");
            
            // fetch data from API
            fetch(urlAPI)
            .then(res => res.json())
            .then(res => res.results)
            .then(displayEmployees)
            .catch(err => console.log("There was a big problem!"));
            
            
            
            function displayEmployees(employeeData) {
                employees = employeeData;
                // store the employee HTML as we create it
                let employeeHTML = '';
                // loop through each employee and create HTML markup
                employees.forEach((employee, index) => {
                let name = employee.name;
                let email = employee.email;
                let city = employee.location.city;
                let picture = employee.picture;
                // template literals make this so much cleaner!
                employeeHTML += `
                <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                </div>
                </div>
                `
                });
                gridContainer.innerHTML = employeeHTML;
            }
            
            
            function displayModal(index) {
                // use object destructuring make our template literal cleaner
                let { name, dob, phone, email, location: { city, street, state, postcode
                }, picture } = employees[index];
                let date = new Date(dob.date);
                const monthChanged = String(date.getMonth() + 1).padStart(2, '0');
                const dayChanged = String(date.getDate()).padStart(2, '0');
                const modalHTML = `
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p class="phone">${phone}</p>
                <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p class="birthday">Birthday:


                ${monthChanged}/${dayChanged}/${date.getFullYear()}</p>
                </div>
                `;
                overlay.classList.remove("hidden");
                modalContainer.innerHTML = modalHTML;
            };
                
            
            gridContainer.addEventListener('click', e => {
                // make sure the click is not on the gridContainer itself
                if (e.target !== gridContainer) {
                // select the card element based on its proximity to actual element clicked
                const card = e.target.closest(".card");
                const index = card.getAttribute('data-index');
                displayModal(index);
                }
                });
                
                modalClose.addEventListener('click', () => {
                    overlay.classList.add("hidden");
                    });
                
             


                    
