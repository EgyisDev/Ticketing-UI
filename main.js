const passengersDataInput = document.getElementById("passengersDataInput");
const passengersDataList = document.getElementById("passengersDataList");
const adultsCounterText = document.getElementById("adultsCounter");
const childsCounterText = document.getElementById("childsCounter");
const infantCounterText = document.getElementById("infantsCounter");
const fromDate = document.getElementById("fromDate");
const adultsController = document.querySelector(".adults-controller");
const childsController = document.querySelector(".childs-controller");
const infantsController = document.querySelector(".infants-controller");
const rowData = document.getElementById("rowData");
const passengersRow = document.getElementById("passengersRow");
const radioBtns = document.getElementsByName("tripeType");
let tbody = document.getElementById("tbody")
const addTableRowBtn = document.getElementById("addTableRow")
const addRowdiv = document.getElementById("addRowdiv")
const passengersDataSpan = document.getElementById("passengersDataSpan")
const reservationForm = document.getElementById("reservationForm")
const nextToPayments = document.getElementById("nextToPayments")

let tripeType = "roundTrip"

const CompanyName = document.getElementById("chooseCompany").value || null
const CustomerName = document.getElementById("chooseCustomer").value
const branch = document.getElementById("selectBranch").value
const salesPreson = document.getElementById("selectSalesPerson").value || null
const fromCountry = document.getElementById("fromCountry").value
const toCountry = document.getElementById("toCountry").value
const flightInfo = document.getElementById("flightInfo")
const multiCityData = document.getElementById("multiCityData")
let paymentTotalCost = document.getElementById("paymentTotalCost")
let paymentTotalSellingPrice = document.getElementById("paymentTotalSellingPrice")

const DetermineThevaluePaid = document.getElementById("DetermineThevaluePaid")
const printBtn = document.getElementById("print-btn")


let totalCostPrice = 0
let totalSallingPrice = 0

let passengersList = []



let adultscounter =  1;
adultsCounterText.innerHTML = adultscounter
let childscounter =  0;
childsCounterText.innerHTML = childscounter

let Infantscounter =  0;
infantCounterText.innerHTML = Infantscounter

let passengersSum =  1






if (passengersDataSpan){
    if(passengersSum > 1 ){
        passengersDataSpan.innerHTML = `${passengersSum} Passengers`
    }else{
        passengersDataSpan.innerHTML = `${passengersSum} Passenger`
    }
}




const updateCounters = (passengersSum) => {
    adultsCounterText.innerHTML = adultscounter;
    childsCounterText.innerHTML = childscounter;
    infantCounterText.innerHTML = Infantscounter;
    passengersSum > 1 ? passengersDataSpan.innerHTML = `${passengersSum} Passengers`:passengersDataSpan.innerHTML = `${passengersSum} Passenger`
    updateFlightInfo()
};


const addPassenger = (type) => {
    if (type === 'adult') adultscounter++;
    if (type === 'child') childscounter++;
    if (type === 'infant' && Infantscounter < adultscounter) Infantscounter++;
    passengersSum = Number(adultscounter) + Number(childscounter) + Number(Infantscounter)
    updateCounters(passengersSum);
};

function removePassenger(type) {
    if (type === 'adult' && adultscounter > 1 && Infantscounter == adultscounter ) removePassenger("infant");
    if (type === 'adult' && adultscounter > 1) adultscounter-- && passengersSum-- && deletePassengerBlock(type);
    if (type === 'child' && childscounter > 0) childscounter-- && passengersSum-- && deletePassengerBlock(type); 
    if (type === 'infant' && Infantscounter > 0) Infantscounter-- &&  passengersSum-- && deletePassengerBlock(type);
    updateCounters(passengersSum);
};

const toggleDateInputs = (value) => {
    if (value === "OneWay"){
        rowData.classList.add("d-none");
        addRowdiv.classList.add("d-none")
        tripeType = "OneWay"
        flatpickr(".fromDate", {minDate: "today" , dateFormat: "d-m-Y" , wrap: true})
        document.querySelector(".toDateLabel").classList.add("d-none")
        fromDate.value = ""
        fromDate.placeholder = "Select Date"
        document.querySelector('.fromDateValue').innerHTML =  ""
        document.querySelector('.toDateValue').innerHTML =  ""
        updateFlightInfo()
    } else if (value === "roundTrip") {
        rowData.classList.add("d-none");
        addRowdiv.classList.add("d-none")
        tripeType = "roundTrip"
        flatpickr(".fromDate", {mode: "range",minDate: "today" , dateFormat: "d-m-Y" , wrap: true})
        document.querySelector(".toDateLabel").classList.remove("d-none")
        fromDate.value = ""
        fromDate.placeholder = "Select Date"
        document.querySelector('.fromDateValue').innerHTML =  ""
        document.querySelector('.toDateValue').innerHTML =  ""
        updateFlightInfo()
    } else if (value === "multiCity") {
        rowData.classList.remove("d-none");
        addRowdiv.classList.remove("d-none")
        rowData.innerHTML = createRowData(1);
        fromDate.value = ""
        fromDate.placeholder = "Select Date"
        document.querySelector('.fromDateValue').innerHTML =  ""
        document.querySelector('.toDateValue').innerHTML =  ""
        tripeType = "multiCity"
        document.querySelector(".toDateLabel").classList.add("d-none")
        updateFlightInfo()
    }
};



const createRowData = (rowIndex) => `
<div class="row align-items-center mb-3 row-data gy-3" data-row-index="${rowIndex}">
    <div class="col-sm-12 col-md-6 col-lg-3">
        <select class="fromCountry form-control me-2" name="fromCountry" required>
            <option value="" disabled selected hidden>From</option>
            <option value="cairo">Cairo</option>
            <option value="Alex">Alex</option>
            <option value="Aswan">Aswan</option>
        </select>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3">
        <select class="toCountry form-control me-2" name="toCountry" required>
            <option value="" disabled selected hidden>To</option>
            <option value="cairo">Cairo</option>
            <option value="Alex">Alex</option>
            <option value="Aswan">Aswan</option>
        </select>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3 px-lg-0">
        <div class="fromDate">
            <div class="d-flex flatpickr align-items-center position-relative">
            <input class="fromDate flatpickr-input form-control" type="text" placeholder="Select Date" name="fromDate" value=""  data-input required>                                        
        
            <a class="input-button calender-btn position-absolute" title="toggle" data-toggle>
                <i class="fa-regular fa-calendar text-dark fs-5"></i>
            </a>
        
        </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-12  d-flex justify-content-sm-end align-items-center">
        <div class="removeRow d-none">
            <i onClick="deleteRow(event)" class="fa-solid fa-x p-3"></i>
        </div>
    </div>
</div>
`;


const addRow = () => {
    const rowData = document.getElementById('rowData');

    const rowCount = document.querySelectorAll('.row-data').length;

    const newRowHTML = createRowData(rowCount);

    rowData.insertAdjacentHTML('beforeend', newRowHTML);

    updateFlightInfo()
    const rows = document.querySelectorAll('.row-data');
    rows.forEach((row, index) => {
        const removeRow = row.querySelector('.removeRow');
        if (removeRow) {
            if(index > 1){
                removeRow.classList.remove("d-none");
            }else{
                removeRow.classList.add("d-none");
            }
        }
    });
};


const deleteRow = (event) => {
    if (event.target.classList.contains('fa-x')) {
        const row = event.target.closest('.row.row-data');

        if (row) {
            const rowIndex = Array.from(row.parentElement.children).indexOf(row);

            const rowDataContainer = document.getElementById('rowData');
            const remainingRows = rowDataContainer.querySelectorAll('.row.row-data').length;
            if (remainingRows > 1) {
                row.remove();
                updateFlightInfo()
                if (tripeType === "multiCity") {
                    multicityDataList.splice(rowIndex, 1);
                }

                for (let i = rowIndex; i < multicityDataList.length; i++) {
                    multicityDataList[i].rowIndex = i;
                }

                checkFirstRow();
            } else {
                console.warn("Cannot delete the last row.");
            }
        }
    }
};

function checkFirstRow(){
    const rows = document.querySelectorAll('.row-data');
    const rowCount = document.querySelectorAll('.row-data').length;
    rows.forEach((row, index) => {
        const icon = row.querySelector('.removeRow');
        if (rowCount < 0) {
            icon ? icon.classList.add("d-none") : ""
        }
    });
}

let multicityDataList = []
let tripe = {}





const updateFlightInfo = () => {
    let rowCount = document.querySelectorAll('.row-data');
    const CompanyName = document.getElementById("chooseCompany").value || null;
    const CustomerName = document.getElementById("chooseCustomer").value;
    const branch = document.getElementById("selectBranch").value;
    const salesPerson = document.getElementById("selectSalesPerson").value || null ;
    const fromCountry = document.getElementById("fromCountry").value;
    const toCountry = document.getElementById("toCountry").value;
    const fromDate = document.getElementById("fromDate").value;
    const adulti = document.querySelectorAll('#passengersRow .passengerType[type="adult"]').length;
    const childi = document.querySelectorAll('#passengersRow .passengerType[type="child"]').length;
    const infanti = document.querySelectorAll('#passengersRow .passengerType[type="infant"]').length;
    

    flightInfo.innerHTML = '';
    const dateArray = fromDate.trim().split(" ")
    const departureDate = dateArray[0]
    let returnDate = dateArray[2]
    if(returnDate == undefined){
        returnDate = null 
    }

    if (tripeType === "multiCity") {
        multicityDataList = [];
        const headerArray = []
        multiCityData.innerHTML= ""
        flightInfo.innerHTML=`<div class="row">
        ${CompanyName != null  ? 
        `<div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Company Name: </span>${CompanyName}</p>
        </div>` : ""}
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Customer Name: </span>${CustomerName}</p>
        </div>
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Branch Name: </span>${branch}</p>
        </div>
        ${salesPerson != null  ? `
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Sales Person: </span>${salesPerson}</p>
        </div>`: ""}
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Trip Type: </span>MultiCity</p>
        </div>
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            ${passengersSum > 1 ? `<p class="header-text w-auto m-0"><span class="header-text fw-bold">Passengers: </span>${passengersSum}</p>` : `<p class="header-text w-auto m-0"><span class="fw-bold">Passenger: </span>${passengersSum}</p>`}
        </div>
            </div>`
        rowCount.forEach(row =>{
            let tripe = {}
            flatpickr(".fromDate", {minDate: "today" , dateFormat: "d-m-Y" , wrap: true})
            tripe = {
                fromCountry: row.querySelector(`.fromCountry`).value,
                toCountry: row.querySelector(`.toCountry`).value,
                fromDate: row.querySelector(`.fromDate.flatpickr-input`).value,
            };
            headerArray.push(tripe)

            flightInfo.innerHTML += `
            <div class="row">
                    <div class="col">
                        <p class="w-auto m-0 header-text"><span class="fw-bold">From: </span>${tripe.fromCountry}</p>
                    </div>
                    <div class="col">
                        <p class="w-auto m-0 header-text"><span class="fw-bold">To: </span>${tripe.toCountry}</p>
                    </div>
                    <div class="col">
                        <p class="w-auto m-0 header-text"><span class="fw-bold">Departure Date: </span>${tripe.fromDate}</p>
                    </div>
            </div>
            `;


            multiCityData.innerHTML += `
                                <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">From: </span>${tripe.fromCountry}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">To: </span>${tripe.toCountry}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Departure Date: </span>${tripe.fromDate}</p>
                                    </div>
                                </div>
            `
        })


    } else {

        if(tripeType == "OneWay"){
            tripeType = "One Way"
        }else if(tripeType == "roundTrip"){
            tripeType = "Round Trip"
        }


        flightInfo.innerHTML=`<div class="row">
        ${CompanyName != null  ? `
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Company Name: </span>${CompanyName}</p>
        </div>` : ""}
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Customer Name: </span>${CustomerName}</p>
        </div>
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Branch Name: </span>${branch}</p>
        </div>
        ${salesPerson != null  ? `
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Sales Person: </span>${salesPerson}</p>
        </div>` : ""}
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">Trip Type: </span>${tripeType}</p>
        </div>
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">From: </span>${fromCountry}</p>
        </div>
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            <p class="header-text w-auto m-0"><span class="header-text fw-bold">To: </span>${toCountry}</p>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-2">
            <p class="header-text w-fit-content"><span class="header-text fw-bold">Departure Date: </span>${departureDate}</p>
        </div>
        ${tripeType === "Round Trip" ? `<div class="col-sm-12 col-md-6 col-lg-2">
            <p class="header-text w-fit-content"><span class="header-text fw-bold">Return Date: </span>${returnDate}</p>
        </div>` : ""}
        <div class="col-sm-4 col-md-3 col-lg-2 col-4">
            ${passengersSum > 1 ? `<p class="header-text w-auto m-0"><span class="header-text fw-bold">Passengers: </span>${passengersSum}</p>` : `<p class="header-text w-auto m-0"><span class="fw-bold">Passenger: </span>${passengersSum}</p>`}
        </div>
            </div>`

    }


        generatePassengerData(CompanyName, CustomerName, branch, salesPerson, fromCountry, toCountry, fromDate, passengersSum, multicityDataList , adulti , childi , infanti);
};



const generatePassengerData = (CompanyName, CustomerName, branch, salesPerson, fromCountry, toCountry, fromDate, passengersSum  , multicityDataList , adulti , childi , infanti) => {
    let cartoona = '';
    let itrationBox = "";
    let totalCostPrice = 0;
    let totalSellingPrice = 0;
    const generatedId = Math.floor(Math.random()*1000)


    if (tripeType === "multiCity") {
        for (let i = 0; i < multicityDataList.length; i++) {
            itrationBox += `
            <input type="hidden" id="fromCountry${generatedId}" value="${multicityDataList[i].fromCountry}">
            <input type="hidden" id="toCountry${generatedId}" value="${multicityDataList[i].toCountry}">
            <input type="hidden" id="fromDate${generatedId}" value="${multicityDataList[i].fromDate}">
            `;
        }
            if(adultscounter >= 0 && adultscounter > adulti){
                cartoona = `
                <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2 position-relative">
                    <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="adult">Adult${adulti + 1}</p>
                    <div class="removeBlock position-absolute w-fit-content" onclick="deleteSpacificPassengerBlock(event)">
                        <i class="fa-solid fa-x p-3"></i>
                    </div>
                    <div class="dataInputs">
                        <div class="row p-4 gy-3">
                                        <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label>  
                    <input autocomplete="off" class="p-2 form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label>
                    <select class="p-2 form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                        <option value="" disabled selected hidden>Choose Supplier</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}">

                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price">                                       
                </div>
            </div>

            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="d-flex align-items-start flex-column">
                    <label class="p-2 fw-bold" for="notes">Notes:</label>
                    <div class="notesContainer w-75">
                        <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                    </div>
                </div>
                </div>
            </div>
        
            <div class="row">
                <div class="col">
                    <div class="d-flex flex-column mt-2">
                    <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                    <div class="AttachmentsContainer w-75">
                        <input autocomplete="off" class="form-control" autocomplete="off" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                    </div>
                </div>
                <div>
            </div>
                        </div>
                    </div>
                    <div class="hidenFields">
                        <input type="hidden" id="type${generatedId}" value="adult">
                        <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                        <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                        <input type="hidden" id="branchName${generatedId}" value="${branch}">
                        <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                        <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
                        <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                        ${itrationBox}
                    </div>
                </div>
                `
                document.getElementById('adults').insertAdjacentHTML("beforeend" , cartoona);
            }
            if(childscounter > 0 && childscounter > childi){
                cartoona = `
                <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2 position-relative">
                    <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="child">Child${childi + 1}</p>
                    <div class="removeBlock position-absolute w-fit-content" onclick="deleteSpacificPassengerBlock(event)">
                        <i class="fa-solid fa-x p-3"></i>
                    </div>
                    <div class="dataInputs">
                        <div class="row p-4">
                                            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label>  
                    <input autocomplete="off" class="p-2 form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label>
                    <select class="p-2 form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                        <option value="" disabled selected hidden>Choose Supplier</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}">

                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price">                                       
                </div>
            </div>

            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="d-flex align-items-start flex-column">
                    <label class="p-2 fw-bold" for="notes">Notes:</label>
                    <div class="notesContainer w-75">
                        <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                    </div>
                </div>
                </div>
            </div>
        
            <div class="row">
                <div class="col">
                    <div class="d-flex flex-column mt-2">
                    <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                    <div class="AttachmentsContainer w-75">
                        <input autocomplete="off" class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                    </div>
                </div>
                <div>
            </div>
                        </div>
                    </div>
                    <div class="hidenFields">
                        <input type="hidden" id="type${generatedId}" value="child">
                        <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                        <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                        <input type="hidden" id="branchName${generatedId}" value="${branch}">
                        <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                        <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
                        <input type="hidden" id="fromCountry${generatedId}" value="${fromCountry}">
                        <input type="hidden" id="toCountry${generatedId}" value="${toCountry}">
                        <input type="hidden" id="fromDate${generatedId}" value="${fromDate}">
                        <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                        ${itrationBox}
                    </div>
                </div>
                `;
                document.getElementById('childs').insertAdjacentHTML("beforeend" , cartoona);
            }

            if(Infantscounter > 0 && Infantscounter > infanti){
                cartoona = `
                <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2 position-relative">
                    <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="infant">Infant${infanti + 1}</p>
                    <div class="removeBlock position-absolute w-fit-content" onclick="deleteSpacificPassengerBlock(event)">
                        <i class="fa-solid fa-x p-3"></i>
                    </div>
                    <div class="dataInputs">
                        <div class="row p-4">
                                        <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label>  
                    <input autocomplete="off" class="p-2 form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label>
                    <select class="p-2 form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                        <option value="" disabled selected hidden>Choose Supplier</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}">

                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price">                                       
                </div>
            </div>

            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number">
                </div>
            </div>

            <div class="row gy-3">
                <div class="d-flex align-items-start flex-column">
                    <label class="p-2 fw-bold" for="notes">Notes:</label>
                    <div class="notesContainer w-75">
                        <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                    </div>
                </div>
            </div>
        
            <div class="row gy-3">
                <div class="d-flex flex-column mt-2">
                    <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                    <div class="AttachmentsContainer w-75">
                        <input autocomplete="off" class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                    </div>
                </div>
            </div>
                        </div>
                    </div>
                    <div class="hidenFields">
                        <input type="hidden" id="type${generatedId}" value="infant">
                        <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                        <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                        <input type="hidden" id="branchName${generatedId}" value="${branch}">
                        <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                        <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
                        <input type="hidden" id="fromCountry${generatedId}" value="${fromCountry}">
                        <input type="hidden" id="toCountry${generatedId}" value="${toCountry}">
                        <input type="hidden" id="fromDate${generatedId}" value="${fromDate}">
                        <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                        ${itrationBox}
                    </div>
                </div>
                `;
                document.getElementById('infants').insertAdjacentHTML("beforeend" , cartoona);
            }


    } else {
        if(adultscounter >= 0 && adultscounter > adulti){
            cartoona = `
            <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2 position-relative">
                <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="adult">Adult${adulti + 1}</p>
                <div class="removeBlock position-absolute w-fit-content" onclick="deleteSpacificPassengerBlock(event)">
                    <i class="fa-solid fa-x p-3"></i>
                </div>
                <div class="dataInputs">
                    <div class="row p-4">
            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label>  
                    <input autocomplete="off" class="p-2 form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label>
                    <select class="p-2 form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                        <option value="" disabled selected hidden>Choose Supplier</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}">

                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price">                                       
                </div>
            </div>

            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="d-flex align-items-start flex-column">
                    <label class="p-2 fw-bold" for="notes">Notes:</label>
                    <div class="notesContainer w-75">
                        <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                    </div>
                </div>
                </div>
            </div>
        
            <div class="row">
                <div class="col">
                    <div class="d-flex flex-column mt-2">
                    <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                    <div class="AttachmentsContainer w-75">
                        <input autocomplete="off" class="form-control" autocomplete="off" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                    </div>
                </div>
                <div>
            </div>
                        </div>
                    </div>
                <div class="hidenFields">
                    <input type="hidden" id="type${generatedId}" value="adult">
                    <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                    <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                    <input type="hidden" id="branchName${generatedId}" value="${branch}">
                    <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                    <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
                    <input type="hidden" id="fromCountry${generatedId}" value="${fromCountry}">
                    <input type="hidden" id="toCountry${generatedId}" value="${toCountry}">
                    <input type="hidden" id="fromDate${generatedId}" value="${fromDate}">
                    <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                </div>
            </div>
            `
            document.getElementById('adults').insertAdjacentHTML("beforeend" , cartoona);
        }
        if(childscounter > 0 && childscounter > childi){
            cartoona = `
            <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2 position-relative">
                <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="child">Child${childi + 1}</p>
                <div class="removeBlock position-absolute w-fit-content" onclick="deleteSpacificPassengerBlock(event)">
                    <i class="fa-solid fa-x p-3"></i>
                </div>
                <div class="dataInputs">
                    <div class="row p-4">
                                    <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label>  
                    <input autocomplete="off" class="p-2 form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label>
                    <select class="p-2 form-control" id="chooseSupplier${generatedId}" required>
                        <option value="" disabled selected hidden>Choose Supplier</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}">

                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price">                                       
                </div>
            </div>

            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="d-flex align-items-start flex-column">
                    <label class="p-2 fw-bold" for="notes">Notes:</label>
                    <div class="notesContainer w-75">
                        <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                    </div>
                </div>
                </div>
            </div>
        
            <div class="row">
                <div class="col">
                    <div class="d-flex flex-column mt-2">
                    <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                    <div class="AttachmentsContainer w-75">
                        <input autocomplete="off" class="form-control" autocomplete="off" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                    </div>
                </div>
                <div>
            </div>
                        </div>
                    </div>
                <div class="hidenFields">
                    <input type="hidden" id="type${generatedId}" value="child">
                    <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                    <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                    <input type="hidden" id="branchName${generatedId}" value="${branch}">
                    <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                    <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
                    <input type="hidden" id="fromCountry${generatedId}" value="${fromCountry}">
                    <input type="hidden" id="toCountry${generatedId}" value="${toCountry}">
                    <input type="hidden" id="fromDate${generatedId}" value="${fromDate}">
                    <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                </div>
            </div>
            `;
            document.getElementById('childs').insertAdjacentHTML("beforeend" , cartoona);

        }


        
        if(Infantscounter > 0 && Infantscounter > infanti){
            cartoona = `
                        <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2 position-relative">
                            <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="infant">Infant${infanti + 1}</p>
                            <div class="removeBlock position-absolute w-fit-content" onclick="deleteSpacificPassengerBlock(event)">
                                <i class="fa-solid fa-x p-3"></i>
                            </div>
                            <div class="dataInputs">
                                <div class="row p-4">
                                            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label>  
                    <input autocomplete="off" class="p-2 form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label>
                    <select class="p-2 form-control" id="chooseSupplier${generatedId}" required>
                        <option value="" disabled selected hidden>Choose Supplier</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}">

                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price">                                       
                </div>
            </div>

            <div class="row gy-3">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <label class="pb-0 ps-1 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label>
                    <input autocomplete="off" class="p-2 form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="d-flex align-items-start flex-column">
                    <label class="p-2 fw-bold" for="notes">Notes:</label>
                    <div class="notesContainer w-75">
                        <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                    </div>
                </div>
                </div>
            </div>
        
            <div class="row">
                <div class="col">
                    <div class="d-flex flex-column mt-2">
                    <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                    <div class="AttachmentsContainer w-75">
                        <input autocomplete="off" class="form-control" autocomplete="off" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                    </div>
                </div>
                <div>
            </div>
                        </div>
                    </div>
                            <div class="hidenFields">
                                <input type="hidden" id="type${generatedId}" value="infant">
                                <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                                <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                                <input type="hidden" id="branchName${generatedId}" value="${branch}">
                                <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                                <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
                                <input type="hidden" id="fromCountry${generatedId}" value="${fromCountry}">
                                <input type="hidden" id="toCountry${generatedId}" value="${toCountry}">
                                <input type="hidden" id="fromDate${generatedId}" value="${fromDate}">
                                <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                            </div>
                        </div>
                        `;
                        document.getElementById('infants').insertAdjacentHTML("beforeend" , cartoona);
                    }
    }
}


    function deleteSpacificPassengerBlock(event){
        const passengersDataCard = event.target.closest('.passengersDataCard')
        const type =  passengersDataCard.querySelector('.passengersDataCard p').getAttribute("type")
        if ((type === 'adult' && adultscounter > 1)  && (Infantscounter != adultscounter)){
            if (type === 'adult' && adultscounter > 1) adultscounter-- && passengersSum-- ;
            if (type === 'child' && childscounter > 0) childscounter-- && passengersSum-- ; 
            if (type === 'infant' && Infantscounter > 0) Infantscounter-- &&  passengersSum-- ; 
            passengersDataCard.remove()
            updateCounters(passengersSum);
            reNumberingBlocks(type)
        }else if(type === 'child' || type === 'infant'){
            if (type === 'child' && childscounter > 0) childscounter-- && passengersSum-- ; 
            if (type === 'infant' && Infantscounter > 0) Infantscounter-- &&  passengersSum-- ;
            passengersDataCard.remove()
            updateCounters(passengersSum);
            reNumberingBlocks(type)
        }
    }


    function reNumberingBlocks (type){
        const adulti = document.querySelectorAll('#passengersRow .passengerType[type="adult"]').length;
        const childi = document.querySelectorAll('#passengersRow .passengerType[type="child"]').length;
        const infanti = document.querySelectorAll('#passengersRow .passengerType[type="infant"]').length;
        if(type === "adult"){
            for(let i = 0 ; i < adulti ; i++ ){
                document.querySelectorAll("#adults .passengersDataCard p")[i].innerHTML=`Adult${i+1}`
            }
        }else if(type === 'child'){
            for(let i = 0 ; i < childi ; i++ ){
                document.querySelectorAll("#childs .passengersDataCard p")[i].innerHTML=`Child${i+1}`
            }
        }else if(type === 'infant'){
            for(let i = 0 ; i < infanti ; i++ ){
                document.querySelectorAll("#infants .passengersDataCard p")[i].innerHTML=`Infant${i+1}`
            }
        }
    }


        const costPriceElements = document.querySelectorAll("input[name='costPrice']");
        const sellingPriceElements = document.querySelectorAll("input[name='sellingPrice']");
    
        costPriceElements.forEach(element => {
            const value = parseFloat(element.value);
            if (!isNaN(value)) {
                totalCostPrice += value;
            }
        });
    
        sellingPriceElements.forEach(element => {
            const value = parseFloat(element.value);
            if (!isNaN(value)) {
                totalSellingPrice += value;
            }
        })


        function deletePassengerBlock(type){
            if (type == "adult") {
                const adultsList = document.querySelector('#passengersRow #adults').children;
                adultsList[adultsList.length - 1].remove()
            }
            else if (type == "child") {
                const adultsList = document.querySelector('#passengersRow #childs').children;
                adultsList[adultsList.length - 1].remove()
            }
            else if (type == "infant") {
                const adultsList = document.querySelector('#passengersRow #infants').children;
                adultsList[adultsList.length - 1].remove()
            }
        }



const calculateTotalPrices = () => {
    let totalCostPrice = 0;
    let totalSellingPrice = 0;

    const costPriceElements = document.querySelectorAll("input[name='costPrice']");
    const sellingPriceElements = document.querySelectorAll("input[name='sellingPrice']");

    costPriceElements.forEach(element => {
        const value = parseFloat(element.value);
        if (!isNaN(value)) {
            totalCostPrice += value;
        }
    });

    sellingPriceElements.forEach(element => {
        const value = parseFloat(element.value);
        if (!isNaN(value)) {
            totalSellingPrice += value;
        }
    });

    return { totalCostPrice, totalSellingPrice };
};


document.addEventListener('DOMContentLoaded', () => {
    passengersDataInput.addEventListener('click', (event) => {
        event.stopPropagation();
        passengersDataList.classList.toggle('d-none');
    });
    
    document.addEventListener('click', (event) => {
        if (passengersDataList && !passengersDataList.contains(event.target) && !passengersDataInput?.contains(event.target)) {
            passengersDataList.classList.add('d-none');
        }
    });
    document.querySelector(".passengersDetails i").addEventListener('click', (event) => {
        event.stopPropagation();
        passengersDataList.classList.toggle('d-none');
    });
    
    document.addEventListener('click', (event) => {
        if (passengersDataList && !passengersDataList.contains(event.target) && !passengersDataInput?.contains(event.target)) {
            passengersDataList.classList.add('d-none');
        }
    });
});

adultsController.children[0].addEventListener("click",  () => addPassenger('adult'));
adultsController.children[2].addEventListener("click",  () => removePassenger('adult'));
childsController.children[0].addEventListener("click",  () => addPassenger('child'));
childsController.children[2].addEventListener("click",  () => removePassenger('child'));
infantsController.children[0].addEventListener("click", () => addPassenger('infant'));
infantsController.children[2].addEventListener("click", () => removePassenger('infant'));

radioBtns.forEach(radioBtn => radioBtn.addEventListener("change", (event) => toggleDateInputs(event.target.value)));



addTableRowBtn.addEventListener("click", function() {
    let  row = document.createElement('tr');

    const generatedId = Math.floor(Math.random()*1000)
    row.innerHTML = `
            <td>
            <select class="treasury form-control me-2" name="treasury" id="treasury${generatedId}">
                <option value="" disabled selected hidden>Select From The List</option>
                <option value="cairo">cairo</option>
                <option value="Alex">Alex</option>
                <option value="Aswan">Aswan</option>
            </select>
        </td>     
        <td><input autocomplete="off" type="number" class="amount form-control w-100" name="amount" autocomplete="off" min="0" id="amount${generatedId}"></td>
        <td><input autocomplete="off" type="text" class="note form-control w-100" name="note" autocomplete="off" id="note${generatedId}"></td>
        <td class="background-transparent">
            <div class="removeRow">
                <i class="fa-solid fa-x p-3"></i>
            </div>
        </td>
    `;


    tbody.appendChild(row);

    updateAmountValue()

    row.querySelector('.removeRow').addEventListener('click', function() {
        row.remove();
        updateAmountValue()
    });
});





function getMultiCityTrip(){
    if (tripeType === "multiCity") {
        multicityDataList = []; 
        const rowCount = document.querySelectorAll('.row-data');
        rowCount.forEach(row =>{
            let tripe = {}
            tripe = {
                fromCountry: row.querySelector(`.fromCountry`).value,
                toCountry: row.querySelector(`.toCountry`).value,
                departureDate: row.querySelector(`.fromDate.flatpickr-input`).value,
            };
            multicityDataList.push(tripe);
        })
        return multicityDataList
    }
}


let paymentScheduleList = []

function getPaymentSchedule(){
    const treasuries = document.querySelectorAll(".treasury")
    const amounts = document.querySelectorAll(".amount")
    const notes = document.querySelectorAll(".note")
    for(let i = 0 ; i < treasuries.length ; i++){
        payment = {} 
        payment.Treasury = treasuries[i].value || null
        payment.Amount = amounts[i].value || null
        payment.notes = notes[i].value || null
        if(treasuries[i].value != "" && amounts[i].value != ""){
            paymentScheduleList.push(payment)
        }
    }
    return paymentScheduleList
}



let amountSum = 0
const amountInputs = document.querySelectorAll('input[name="amount"]')

amountInputs.forEach(input =>{
    input.addEventListener("change" , function(){
        amountSum = 0
        for(let i = 0 ; i < amountInputs.length ; i++){
            amountSum += Number(amountInputs[i].value)
        }
        DetermineThevaluePaid.value = amountSum
    })
})



function updateAmountValue(){
    const amountInputs = document.querySelectorAll('input[name="amount"]')

    if(!amountInputs.length){
        DetermineThevaluePaid.value = 0
    }

    amountInputs.forEach(input =>{
        input.addEventListener("change" , function(){
            amountSum = 0
            for(let i = 0 ; i < amountInputs.length ; i++){
                amountSum += Number(amountInputs[i].value)
            }
            DetermineThevaluePaid.value = amountSum
        })
        amountSum = 0
        for(let i = 0 ; i < amountInputs.length ; i++){
            amountSum += Number(amountInputs[i].value)
        }
        DetermineThevaluePaid.value = amountSum
    })
}


    const nextToFlightInfoBtn = document.getElementById('nextToFlightInfo');
    const finishBtn = document.querySelector('.finish-btn');
    function validateBookingSection() {
        const div = document.getElementById('reservationForm');
        const selects = document.querySelectorAll('.booking-card select[required]');
        const inputs = div.querySelectorAll('input[type="date"][required] , input[type="text"][required]');
        let isValid = true;

        selects.forEach(select => {            
            if (select.value === "" || select.value == null) {
                isValid = false;
                select.classList.add('is-invalid');
            } else {
                select.classList.remove('is-invalid');
            }
        });

        inputs.forEach(input => {
            if (tripeType == "roundTrip" && (input.value == "" || input.value == null)) {
                isValid = false;
                input.classList.add('is-invalid');
            }else if((tripeType == "OneWay" || tripeType == "multiCity" ) && (input.value == "") ){
                isValid = false;
                input.classList.add('is-invalid');
            }else{
                input.classList.remove('is-invalid')
            }
        });
        const dateArray = fromDate.value.trim().split(" ")
        if(tripeType == "roundTrip" && dateArray.length == 1){
            document.querySelector('.fromDate.flatpickr-input').classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }


    function validateflightInfoSection() {
        const form = document.getElementById('flightInfoSection');
        const selects = form.querySelectorAll('select[required]');
        const inputs = form.querySelectorAll('input[type="text"] , input[type="number"] , input[type="file"]');
        let isValid = true;


        selects.forEach(select => {
            if (select.value === "" || select.value === null ) {
                isValid = false;
                select.classList.add('is-invalid');
            } else {
                select.classList.remove('is-invalid');
            }
        });

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return isValid;
    }

    function validatepaymentsSection() {
        const form = document.getElementById('paymentsSection');
        const selects = form.querySelectorAll('select');
        const amounts = form.querySelectorAll('input[name="amount"]');
        let isValid = true;
    
        const pairs = [];
    
        selects.forEach((select, index) => {
            const amount = amounts[index];
            pairs.push({ select, amount });
        });
    
        pairs.forEach(pair => {
            const { select, amount } = pair;
            
            if ((select.value === "" || select.value === null) && (amount.value.trim() !== "")) {
                isValid = false;
                select.classList.add('is-invalid');
            } else if ((amount.value.trim() === "") && (select.value !== "" && select.value !== null)) {
                isValid = false;
                amount.classList.add('is-invalid');
            } else {
                select.classList.remove('is-invalid');
                amount.classList.remove('is-invalid');
            }
        });
    
        return isValid;
    }

    fromDate.addEventListener("change", function(){
            let dateArray = fromDate.value.split(" ")
            if(dateArray[2]==undefined){
                dateArray[2] = ""
            }
            const departureDate = dateArray[0]
            document.querySelector('.fromDateValue').innerHTML = dateArray[0]
            const returnDate = dateArray[2]
            document.querySelector('.toDateValue').innerHTML = dateArray[2]
        if(fromDate.value == "" || fromDate.value == null || fromDate.value == undefined){
            fromDate.placeholder = "Select Date";
        }
    })




    nextToFlightInfoBtn.addEventListener('click', function() {
        if (validateBookingSection()) {
            updateFlightInfo()
                const nextTabLinkEl = $(".nav-tabs a[href = '#step2']")
                const nextTab = new bootstrap.Tab(nextTabLinkEl);
                nextTab.show();
                document.getElementById("bookingSection").classList.add("d-none")
        }
    });

    nextToPayments.addEventListener('click', function() {
        if (validateflightInfoSection()) {
                const nextTabLinkEl = $(".nav-tabs a[href = '#step3']")
                const nextTab = new bootstrap.Tab(nextTabLinkEl);
                nextTab.show();
                document.getElementById("flightInfoSection").classList.add("d-none")
            const { totalCostPrice, totalSellingPrice } = calculateTotalPrices();
            paymentTotalCost.value = totalCostPrice;
            paymentTotalSellingPrice.value = totalSellingPrice;
        }
    });

    finishBtn.addEventListener('click', function() {
        if (validatepaymentsSection()) {
            const fileData = getFinalData();
            const fileNumberr = fileData.FileNumber;
            const reservationNumbers = [];
            paymentScheduleList = []
            let dateArray = fromDate.value.split(" ")
            if(dateArray[2]==undefined){
                dateArray[2] = ""
            }
            const departureDate = dateArray[0]
            const returnDate = dateArray[2]

    
            if (fileData && fileData.Passengers) {
                for (let i = 0; i < passengersSum; i++) {
                    if (fileData.Passengers[i] && fileData.Passengers[i].ReservationNumber) {
                        reservationNumbers.push(fileData.Passengers[i].ReservationNumber);
                    }
                }
            }
            alert(`Your File Number is ${fileNumberr}. Your Reservation Number is: ${JSON.stringify(reservationNumbers)}`);
            updateFlightInfo()
            finish(fileData)
            console.log("FileData" , fileData );
            console.log('File Number:', fileNumberr);
            console.log('Reservation Numbers:', reservationNumbers);

            const nextTabLinkEl = $(".nav-tabs a[href = '#step4']")
            const nextTab = new bootstrap.Tab(nextTabLinkEl);
            nextTab.show();
            document.getElementById("flightInfoSection").classList.add("d-none")
        }
    });


function addPassengerToFile(){
    if(tripeType == "multiCity"){
        passengerTypes = document.querySelectorAll('.passengerType') 
        names = document.querySelectorAll('input[name="name"]')
        suppliers = document.querySelectorAll('select[name = "chooseSupplier"]')
        costPrices = document.querySelectorAll('input[name="costPrice"]')
        sellingPrices = document.querySelectorAll('input[name="sellingPrice"]')
        theGates = document.querySelectorAll('input[name="theGate"]')
        AirplaneNumbers = document.querySelectorAll('input[name="AirplaneNumber"]')
        seatNumbers = document.querySelectorAll('input[name="seatNumber"]')
        const notes = document.querySelectorAll('textarea[name="notes"]')
        passengersList = []
        let passenger = {}

        const CompanyName = document.getElementById("chooseCompany").value || null;
        const CustomerName = document.getElementById("chooseCustomer").value;
        const branch = document.getElementById("selectBranch").value ;
        const salesPerson = document.getElementById("selectSalesPerson").value || null;
        
            for(let i = 0 ; i < passengersSum ; i++){
                const generatedId = Math.floor(Math.random()*1000)
                passenger = {}
                passenger.Type = passengerTypes[i].getAttribute("type")
                passenger.TripType = tripeType
                passenger.Name = names[i].value
                passenger.ReservationNumber = generatedId
                passenger.Supplier = suppliers[i].value
                passenger.CostPrice = costPrices[i].value
                passenger.SellingPrice = sellingPrices[i].value
                passenger.TheGate = theGates[i].value
                passenger.AirplaneNumber = AirplaneNumbers[i].value
                passenger.SeatNumber = seatNumbers[i].value
                passenger.Notes = notes[i].value || null
                passenger.Attachments = []
                passenger.FileNumber = 0
                passenger.CompanyName = CompanyName 
                passenger.CustomerName = CustomerName
                passenger.Branch = branch
                passenger.SalesPerson = salesPerson
                passenger.Trip = getMultiCityTrip()
                passenger.PassengersCounter = passengersSum
                passengersList.push(passenger)
            }
    }else{
        passengerTypes = document.querySelectorAll('.passengerType') 
        names = document.querySelectorAll('input[name="name"]')
        suppliers = document.querySelectorAll('select[name = "chooseSupplier"]')
        costPrices = document.querySelectorAll('input[name="costPrice"]')
        sellingPrices = document.querySelectorAll('input[name="sellingPrice"]')
        theGates = document.querySelectorAll('input[name="theGate"]')
        AirplaneNumbers = document.querySelectorAll('input[name="AirplaneNumber"]')
        seatNumbers = document.querySelectorAll('input[name="seatNumber"]')
        const notes = document.querySelectorAll('textarea[name="notes"]')
        passengersList = []
        let passenger = {}

        const CompanyName = document.getElementById("chooseCompany").value || null;
        const CustomerName = document.getElementById("chooseCustomer").value;
        const branch = document.getElementById("selectBranch").value ;
        const salesPerson = document.getElementById("selectSalesPerson").value || null;
        const fromCountry = document.getElementById("fromCountry").value ;
        const toCountry = document.getElementById("toCountry").value ;
        const dateArray = fromDate.value.trim().split(" ")
        const departureDate = dateArray[0]        
        let returnDate = dateArray[2]
        if(returnDate == undefined){
            returnDate = null 
        }

        for(let i = 0 ; i < passengersSum ; i++){
            const generatedId = Math.floor(Math.random()*1000)
            passenger = {}
            passenger.Type = passengerTypes[i].getAttribute("type")
            passenger.TripType = tripeType
            passenger.Name = names[i].value
            passenger.ReservationNumber = generatedId
            passenger.Supplier = suppliers[i].value
            passenger.CostPrice = costPrices[i].value
            passenger.SellingPrice = sellingPrices[i].value
            passenger.TheGate = theGates[i].value
            passenger.AirplaneNumber = AirplaneNumbers[i].value
            passenger.SeatNumber = seatNumbers[i].value
            passenger.Notes = notes[i].value || null
            passenger.Attachments = []
            passenger.FileNumber = 0
            passenger.CompanyName = CompanyName 
            passenger.CustomerName = CustomerName
            passenger.BranchName = branch
            passenger.SalesPerson = salesPerson
            passenger.FromCountry = fromCountry 
            passenger.ToCountry = toCountry
            passenger.DepartureDate = departureDate
            passenger.ReturnDate = returnDate
            passenger.PassengersCounter = passengersSum
            passengersList.push(passenger)
        }
    }
    return passengersList
}



function getFinalData() {
    if(tripeType == "multiCity"){

    const CompanyName = document.getElementById("chooseCompany").value || null;
    const CustomerName = document.getElementById("chooseCustomer").value;
    const branch = document.getElementById("selectBranch").value ;
    const salesPerson = document.getElementById("selectSalesPerson").value || null;
    ;

    const PaymentSchedule = getPaymentSchedule()
    const generatedId = Math.floor(Math.random()*1000)

    passengersList = addPassengerToFile()


    let finalData = {    
    "FileNumber": generatedId,
    "CompanyName": CompanyName , 
    "CustomerName": CustomerName,
    "BranchName": branch,
    "SalesPerson": salesPerson,
    "TripType": tripeType,
    "Trip": passengersList[0].Trip,
    "PassengersCounter": passengersSum,
    "Passengers": passengersList,
    "PaymentSchedule": PaymentSchedule
    }

    for(let i = 0 ; i < passengersList.length ; i ++){
        passengersList[i].FileNumber = generatedId
    }
    
    return finalData

    }else{
        const CompanyName = document.getElementById("chooseCompany").value || null;
        const CustomerName = document.getElementById("chooseCustomer").value;
        const branch = document.getElementById("selectBranch").value ;
        const salesPerson = document.getElementById("selectSalesPerson").value || null;
        const fromCountry = document.getElementById("fromCountry").value ;
        const toCountry = document.getElementById("toCountry").value ;
        const dateArray = fromDate.value.trim().split(" ")
        const departureDate = dateArray[0]        
        let returnDate = dateArray[2]
        if(returnDate == undefined){
            returnDate = null 
        } 
        ;

        const PaymentSchedule = getPaymentSchedule()
        const generatedId = Math.floor(Math.random()*1000)
        passengersList = addPassengerToFile()




        let finalData = {    
        "FileNumber": generatedId,
        "CompanyName": CompanyName , 
        "CustomerName": CustomerName,
        "BranchName": branch,
        "SalesPerson": salesPerson,
        "TripType": tripeType,
        "FromCountry": fromCountry,
        "ToCountry": toCountry,
        "DepartureDate": departureDate,
        "ReturnDate": returnDate,
        "PassengersCounter": passengersSum,
        "Passengers": passengersList,
        "PaymentSchedule": PaymentSchedule
        }

        for(let i = 0 ; i < passengersList.length ; i ++){
            passengersList[i].FileNumber = generatedId
        }
        return finalData
    }
}

let section1Data = {};
let section2Data = {};

const updateSection1Data = () => {
    section1Data.input1 = document.getElementById('input1').value;
};

const updateSection2Data = () => {
    section2Data.input2 = document.getElementById('input2').value;
};

const saveToSessionStorage = () => {
    sessionStorage.setItem('section1Data', JSON.stringify(section1Data));
    sessionStorage.setItem('section2Data', JSON.stringify(section2Data));
};

const loadFromSessionStorage = () => {
    const savedSection1Data = JSON.parse(sessionStorage.getItem('section1Data'));
    const savedSection2Data = JSON.parse(sessionStorage.getItem('section2Data'));

    if (savedSection1Data) {
        document.getElementById('input1').value = savedSection1Data.input1;
    }

    if (savedSection2Data) {
        document.getElementById('input2').value = savedSection2Data.input2;
    }
};


function finish(finalData){
    const CompanyName = document.getElementById("chooseCompany").value || null;
    const CustomerName = document.getElementById("chooseCustomer").value;
    const branch = document.getElementById("selectBranch").value ;
    const salesPerson = document.getElementById("selectSalesPerson").value || null;
    const fromCountry = document.getElementById("fromCountry").value ;
    const toCountry = document.getElementById("toCountry").value ;
    const dateArray = fromDate.value.trim().split(" ")
    const departureDate = dateArray[0]     
    const fileData = finalData;
    const fileNumberr = fileData.FileNumber;
    const reservationNumbers = [];   
    let returnDate = dateArray[2]
    if(returnDate == undefined){
        returnDate = null 
    }
    if(tripeType == "OneWay"){
        tripeType = "One Way"
    }else if(tripeType == "roundTrip"){
        tripeType = "Round Trip"
    }else if(tripeType == "multiCity"){
        tripeType = "MultiCity"
    }

    if (fileData && fileData.Passengers) {
        for (let i = 0; i < passengersSum; i++) {
            if (fileData.Passengers[i] && fileData.Passengers[i].ReservationNumber) {
                reservationNumbers.push(fileData.Passengers[i].ReservationNumber+" ");
            }
        }
    }
    if(tripeType == "MultiCity" ){
        const data = `
                                <div class="row">
                                ${CompanyName != null  ? 
                                    `<div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Company Name: </span>${CompanyName}</p>
                                    </div>` : ""}
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Customer Name: </span>${CustomerName}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Branch Name: </span>${branch}</p>
                                    </div>
                                    ${salesPerson != null  ? `
                                        <div class="col-sm-12 col-md-6 col-lg-3">
                                            <p class="w-fit-content"><span class="fw-bold">Sales Person: </span>${salesPerson}</p>
                                        </div>`: ""}
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Trip Type: </span> ${tripeType}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Number of Passengeres: </span>${passengersSum}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">File Number: </span>${fileNumberr}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Reservation Numbers: </span>${reservationNumbers}</p>
                                    </div>
                                </div>
                                `

        document.getElementById("data-summary").insertAdjacentHTML("afterbegin" , data)
        
    } else{
        

        const data =
        `
                                        <div class="row">
                                        ${CompanyName != null  ? 
                                            `<div class="col-sm-12 col-md-6 col-lg-3">
                                                <p class="w-fit-content"><span class="fw-bold">Company Name: </span>${CompanyName}</p>
                                            </div>` : ""}
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Customer Name: </span>${CustomerName}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Branch Name: </span>${branch}</p>
                                    </div>
                                    ${salesPerson != null  ? `
                                        <div class="col-sm-12 col-md-6 col-lg-3">
                                            <p class="w-fit-content"><span class="fw-bold">Sales Person: </span>${salesPerson}</p>
                                        </div>`: ""}
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Trip Type: </span> ${tripeType}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">From: </span>${fromCountry}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">To: </span>${toCountry}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Departure Date: </span>${departureDate}</p>
                                    </div>
                                </div>
                                <div class="row">
                                            ${tripeType === "Round Trip" ? `<div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Return Date: </span>${returnDate}</p>
                                    </div>` : ""}
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">Number of Passengeres: </span>${passengersSum}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-3">
                                        <p class="w-fit-content"><span class="fw-bold">File Number: </span>${fileNumberr}</p>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-4">
                                        <p class="w-fit-content"><span class="fw-bold">Reservation Numbers: </span>${reservationNumbers}</p>
                                    </div>
                                    </div>`
        document.getElementById("data-summary").innerHTML = data
    }
}


printBtn.addEventListener("click" , function(){
    window.print()
})