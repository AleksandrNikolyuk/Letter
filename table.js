let resolve = ( res ) => {return res.json();},
    // url = "./data.json";
    url = "http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2";

fetch(url)
.then(resolve)
.then(TableInit);

    function TableInit ( data ) {
        GenerateTable(data);
        // Hendlers (config);
    }

    let SortBalance = document.createElement('button');
        SortBalance.innerText = 'SortBalance';
        document.body.appendChild(SortBalance);

    let SortEmpl = document.createElement('button');
        SortEmpl.innerText = 'SortEmpl';

    function RenderTableHeader ( element ) {
        let HeaderBlock = document.createElement('tr');
            element.map( item => {
                let HeaderName = document.createElement('td');
                    HeaderName.innerHTML = "<button>"+ item +"<button>";
                    HeaderBlock.appendChild(HeaderName);
            });
        return HeaderBlock;
    }

    function SomeBalanceSort (a, b){
        let currentBalance = Number( a.balance.split(/\$/)[1] );
        let nextBalance = Number( b.balance.split(/\$/)[1] );

        return currentBalance - nextBalance;
    }

    function SortAge (a, b){
        let FirstAge = Number(a.age);
        let LastAge = Number(b.age);
    return FirstAge - LastAge;
    }

    function RenderEmployersTable (employers, data) {
        let ListData = document.getElementById('listdata');
        let Title = ['Name', 'Age', 'Emails', 'Gender', 'Phones'];
            ListData.innerHTML = '';
            ListData.appendChild( RenderTableHeader(Title) );


        let BackButton = document.createElement('button');
            BackButton.innerText = 'Back';
            BackButton.addEventListener('click', function(){
                 GenerateTable ( data );
            });
            document.body.appendChild(BackButton);

            employers.map( item => {
                let BodyBlock = document.createElement('tr');

                    // TODO: Переписать вложенную ф-ю без строковых шаблонов
                    // BodyBlock.innerHTML = `
                    //     <td>${item.name}</td>
                    //     <td>${item.age}</td>
                    //     <td>${item.emails.map( (email) => `<div>${email}</div>`)}</td>
                    //     <td>${item.gender}</td>
                    //     <td>${item.phones.map( (phone) => `<div>${phone}</div>`)}</td>
                    // `;
                let AddEmployersName = document.createElement('td');
                AddEmployersName.innerHTML += item.name;
                BodyBlock.appendChild(AddEmployersName);

                let AddEmployersAge = document.createElement('td');
                AddEmployersAge.innerHTML += item.age;

                    function SomeAgeSort (){
                        let EmplSort = employers.sort(SortAge);

                        RenderEmployersTable(EmplSort);
                    }

                SortEmpl.addEventListener('click', SomeAgeSort);
                BodyBlock.appendChild(AddEmployersAge);

                let AddEmployersEmail = document.createElement('td');
                    item.emails.map( (email) =>{
                        let AddEmail = document.createElement('div');
                            AddEmail.innerHTML += email;
                            AddEmployersEmail.appendChild(AddEmail);
                    });
                BodyBlock.appendChild(AddEmployersEmail);

                let AddEmployersGender = document.createElement('td');
                    AddEmployersGender.innerHTML += item.gender;
                    BodyBlock.appendChild(AddEmployersGender);

                let AddEmployersPhone = document.createElement('td');
                    item.phones.map( (phones) =>{
                        let AddPhone = document.createElement('div');
                            AddPhone.innerHTML += phones;
                            AddEmployersPhone.appendChild(AddPhone);
                    });
                BodyBlock.appendChild(AddEmployersPhone);


                ListData.appendChild(BodyBlock);
                document.body.appendChild(SortEmpl);
            });
    }

    function GenerateTable ( data  ) {
        let ListData = document.getElementById('listdata');
        let Title = ['Company', 'Balance', 'Registration', 'Address', 'Amount employers', 'Employers'];
            ListData.innerHTML = '';
            let BalanceButton = Title[1];
                console.log(BalanceButton);
            ListData.appendChild( RenderTableHeader(Title) );

        data.map(( item ) => {

            // console.log(item);

            let ItemRow = document.createElement('tr');
            let AddCountry = document.createElement('td');
                AddCountry.innerText = item.company;
                ItemRow.appendChild(AddCountry);

            let AddBalance = document.createElement('td');
                AddBalance.innerText = item.balance;

                function BalanceSort (){
                        let sortedArray = data.sort(SomeBalanceSort);
                        // console.log('sortedArray', sortedArray);
                            GenerateTable(sortedArray);
                }

                SortBalance.addEventListener('click', BalanceSort);
                ItemRow.appendChild(AddBalance);

            let AddDateRegistration = document.createElement('td');
                AddDateRegistration.innerText = item.registered;
                ItemRow.appendChild(AddDateRegistration);

            let AddAddress = document.createElement('td');
                AddAddress.classList.add('.Address');
                AddAddress.innerHTML = `<a href="#">Показать адресс</a>`;
            let AddressStatus = false;
                function ShowAddress(){
                        console.log( AddressStatus);
                        if(AddressStatus === false){
                            AddAddress.innerHTML = `${item.address.country},
                            state: ${item.address.state}, city: ${item.address.city}, street: ${item.address.street}, ${item.address.house}`;
                        } else {
                            AddAddress.innerHTML = `<a href="#">Показать адресс</a>`;
                        }
                        AddressStatus = !AddressStatus;
                }
                AddAddress.addEventListener('click', ShowAddress);
                ItemRow.appendChild(AddAddress);


            let AddAmountEmployers = document.createElement('td');
                AddAmountEmployers.innerText = item.employers.length;
                ItemRow.appendChild(AddAmountEmployers);

            let AddEmployers = document.createElement('td');
                AddEmployers.innerHTML = `<a href="#">Показать сотрудников</a>`;

                function ShowEmployers(event){
                    console.log(event);
                    RenderEmployersTable (item.employers, data);
                    AddAddress.removeEventListener('click', ShowAddress);
                    AddEmployers.removeEventListener('click', ShowAddress);
                }

                AddEmployers.addEventListener('click', ShowEmployers);
                ItemRow.appendChild(AddEmployers);

                ListData.appendChild(ItemRow);
        });
    }
