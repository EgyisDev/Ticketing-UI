const passengersDataInput = document.getElementById("passengersDataInput");
const passengersDataList = document.getElementById("passengersDataList");
const adultsCounterText = document.getElementById("adultsCounter");
const childsCounterText = document.getElementById("childsCounter");
const infantCounterText = document.getElementById("infantsCounter");
const fromDate = document.getElementById("fromDate");
let toDate = document.getElementById("toDate");
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
let isPassengersUpdated = false
let firstTime = true
let paymentTotalCost = document.getElementById("paymentTotalCost")
let paymentTotalSellingPrice = document.getElementById("paymentTotalSellingPrice")

const DetermineThevaluePaid = document.getElementById("DetermineThevaluePaid")

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
    isPassengersUpdated = true
    firstTime = false
};


const addPassenger = (type) => {
    if (type === 'adult') adultscounter++;
    if (type === 'child') childscounter++;
    if (type === 'infant' && Infantscounter < adultscounter) Infantscounter++;
    passengersSum = Number(adultscounter) + Number(childscounter) + Number(Infantscounter)
    updateCounters(passengersSum);
    updateFlightInfo()
};

const removePassenger = (type) => {
    if (type === 'adult' && adultscounter > 1) adultscounter-- && passengersSum-- && deletePassengerBlock(type);
    if (type === 'child' && childscounter > 0) childscounter-- && passengersSum-- && deletePassengerBlock(type); 
    if (type === 'infant' && Infantscounter > 0) Infantscounter-- &&  passengersSum-- && deletePassengerBlock(type);
    updateCounters(passengersSum);
};

const toggleDateInputs = (value) => {
    if (value === "OneWay"){
        // toDate.classList.add("d-none");
        document.querySelector("input.toDate").setAttribute("type" , "hidden")
        document.querySelector(".toDate").classList.add("d-none")
        rowData.classList.add("d-none");
        addRowdiv.classList.add("d-none")
        tripeType = "OneWay"
        toDate.value = null
        toDate.removeAttribute("required")
        updateFlightInfo()
    } else if (value === "roundTrip") {
        // toDate.classList.remove("d-none");
        document.querySelector("input.toDate").setAttribute("type" , "date")
        document.querySelector(".toDate").classList.remove("d-none")
        rowData.classList.add("d-none");
        addRowdiv.classList.add("d-none")
        tripeType = "roundTrip"
        toDate.value = ""
        toDate.setAttribute("required" , "required")
        updateFlightInfo()
    } else if (value === "multiCity") {
        // toDate.classList.add("d-none");
        document.querySelector("input.toDate").setAttribute("type" , "hidden")
        document.querySelector(".toDate").classList.add("d-none")
        rowData.classList.remove("d-none");
        addRowdiv.classList.remove("d-none")
        rowData.innerHTML = createRowData(1);
        tripeType = "multiCity"
        toDate.value = null
        toDate.removeAttribute("required")
        updateFlightInfo()
    }
};



const createRowData = (rowIndex) => `
    <div class="d-block d-flex mb-3 row-data" data-row-index="${rowIndex}">
        <div class="col-3 me-2">
            <select class="fromCountry form-control me-2" name="fromCountry" required>
                <option value="" disabled selected hidden>From</option>
                <option value="cairo">Cairo</option>
                <option value="Alex">Alex</option>
                <option value="Aswan">Aswan</option>
            </select>
        </div>
        <div class="col-3 me-2">
            <select class="toCountry form-control me-2" name="toCountry" required>
                <option value="" disabled selected hidden>To</option>
                <option value="cairo">Cairo</option>
                <option value="Alex">Alex</option>
                <option value="Aswan">Aswan</option>
            </select>
        </div>
        <div class="dateGroup col-2 me-2">
                <input class="fromDate form-control me-2 d-block" type="date" name="fromDate" required>
        </div>
        <div class="col-3 d-flex justify-content-start align-items-center">
            <div class="removeRow d-none">
                <i onClick="deleteRow(event)" class="fa-solid fa-x p-3"></i>
            </div>
        </div>
    </div>
`;


const addRow = () => {
    // Get the container where rows will be added
    const rowData = document.getElementById('rowData');

    // Get the current row count
    const rowCount = document.querySelectorAll('.row-data').length;

    // Generate new row HTML with an updated index
    const newRowHTML = createRowData(rowCount);

    // Append the new row to the container without affecting existing rows
    rowData.insertAdjacentHTML('beforeend', newRowHTML);

    // Update flight information (if necessary)
    updateFlightInfo()
    // Reapply CSS to hide the delete icon for the first row only
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
        // Find the closest row element
        const row = event.target.closest('.d-block.d-flex.mb-3');

        if (row) {
            // Find the index of the row to be deleted
            const rowIndex = Array.from(row.parentElement.children).indexOf(row);

            // Check the number of remaining rows
            const rowDataContainer = document.getElementById('rowData');
            const remainingRows = rowDataContainer.querySelectorAll('.d-block.d-flex.mb-3').length;
            // Allow row deletion only if more than one row is present
            if (remainingRows > 1) {
                // Remove the row from the DOM
                row.remove();
                updateFlightInfo()
                // Remove the corresponding entry from multicityDataList
                if (tripeType === "multiCity") {
                    multicityDataList.splice(rowIndex, 1);
                }

                // Reorder remaining rows in multicityDataList if necessary
                for (let i = rowIndex; i < multicityDataList.length; i++) {
                    multicityDataList[i].rowIndex = i; // Optional: Update row index if needed
                }

                // Optionally, update UI or perform other actions here
                checkFirstRow(); // Call this function to update UI or state if needed
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
    const toDate = document.getElementById("toDate").value || null;
    const adulti = document.querySelectorAll('#passengersRow .passengerType[type="adult"]').length;
    const childi = document.querySelectorAll('#passengersRow .passengerType[type="child"]').length;
    const infanti = document.querySelectorAll('#passengersRow .passengerType[type="infant"]').length;
    

    // Clear the previous flight info
    flightInfo.innerHTML = '';


    if (tripeType === "multiCity") {
        multicityDataList = []; // Reset list for new trip type

        rowCount.forEach(row =>{
            const tripe = {
                fromCountry: row.querySelector(`.fromCountry`).value,
                toCountry: row.querySelector(`.toCountry`).value,
                fromDate: row.querySelector(`.fromDate`).value,
            };
            multicityDataList.push(tripe);

            flightInfo.innerHTML += `
                <p class="w-auto m-0"><span class="fw-bold">From: </span>${tripe.fromCountry}</p>
                <p class="w-auto m-0"><span class="fw-bold">To: </span>${tripe.toCountry}</p>
                <p class="w-auto m-0 position-relative"><span class="fw-bold">Date: </span>${tripe.fromDate}</p>
                // 
            `;
        })


    } else {
        flightInfo.innerHTML = `
            ${CompanyName != null  ? `<p class="w-auto m-0"><span class="fw-bold">Company Name: </span>${CompanyName}</p>` : ""}
            <p class="w-auto m-0"><span class="fw-bold">Customer Name: </span>${CustomerName}</p>
            <p class="w-auto m-0"><span class="fw-bold">Branch: </span>${branch}</p>
            ${salesPerson != null  ? `<p class="w-auto m-0"><span class="fw-bold">Sales Person: </span>${salesPerson}</p>` : ""}
            <p class="w-auto m-0"><span class="fw-bold">Trip Type: </span>${tripeType}</p>
            <p class="w-auto m-0"><span class="fw-bold">From: </span>${fromCountry}</p>
            <p class="w-auto m-0"><span class="fw-bold">To: </span>${toCountry}</p>
            ${tripeType === "roundTrip" ? `<p class="w-auto m-0"><span class="fw-bold">Dates: </span>${fromDate} - ${toDate}</p>` : `<p class="w-auto m-0"><span class="fw-bold">Date: </span>${fromDate}</p>`}
            ${passengersSum > 1 ? `<p class="w-auto m-0"><span class="fw-bold">Passengers: </span>${passengersSum}</p>` : `<p class="w-auto m-0"><span class="fw-bold">Passenger: </span>${passengersSum}</p>`}
        `;
    }

    if(isPassengersUpdated || firstTime){
        generatePassengerData(CompanyName, CustomerName, branch, salesPerson, fromCountry, toCountry, fromDate, toDate, passengersSum, multicityDataList , adulti , childi , infanti);
        isPassengersUpdated = false
        firstTime = false
    }

};



const generatePassengerData = (CompanyName, CustomerName, branch, salesPerson, fromCountry, toCountry, fromDate, toDate, passengersSum  , multicityDataList , adulti , childi , infanti) => {
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
                <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2">
                    <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="adult">Adult${adulti + 1}</p>
                    <div class="dataInputs">
                        <div class="row p-4">
                            <table>
                                <tbody>
                                    <tr> 
                                        <td><label class="pb-0 ps-3 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label></td>
                                    </tr>
                                    <tr>
                                        <td class="p-2"><input class="form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name"></td>
                                        <td class="p-2"><select class="form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                                            <option value="" disabled selected hidden>Choose Supplier</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            </select>
                                        </td>
                                        <td class="p-2"><input class="form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}"></td>
                                        <td class="p-2"><input class="form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price"></td>
                                    </tr>
                                    <tr> 
                                        <td><label class="pb-0 ps-3 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label></td>
                                    </tr>
                                    <tr>
                                        <td class="p-2"><input class="form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate"></td>
                                        <td class="p-2"><input class="form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number"></td>
                                        <td class="p-2"><input class="form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number"></td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex align-items-start flex-column p-2">
                                            <label class="p-2 fw-bold" for="notes">Notes:</label>
                                            <div class="notesContainer w-75">
                                                <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 d-flex flex-column">
                                            <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                                            <div class="AttachmentsContainer">
                                                <input class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="hidenFields">
                        <input type="hidden" id="type${generatedId}" value="adult">
                        <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                        <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                        <input type="hidden" id="branchName${generatedId}" value="${branch}">
                        <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                        <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
                        <input type="hidden" id="toDate${generatedId}" value="${toDate}">
                        <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                        ${itrationBox}
                    </div>
                </div>
                `
                document.getElementById('adults').insertAdjacentHTML("beforeend" , cartoona);
            }
            if(childscounter > 0 && childscounter > childi){
                cartoona = `
                <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2">
                    <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="child">Child${childi + 1}</p>
                    <div class="dataInputs">
                        <div class="row p-4">
                                <tbody>
                                    <tr> 
                                        <td><label class="pb-0 ps-3 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label></td>
                                    </tr>
                                    <tr>
                                        <td class="p-2"><input class="form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name"></td>
                                        <td class="p-2"><select class="form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                                            <option value="" disabled selected hidden>Choose Supplier</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            </select>
                                        </td>
                                        <td class="p-2"><input class="form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}"></td>
                                        <td class="p-2"><input class="form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price"></td>
                                    </tr>
                                    <tr> 
                                        <td><label class="pb-0 ps-3" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label></td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 fw-bold"><input class="form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate"></td>
                                        <td class="p-2 fw-bold"><input class="form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number"></td>
                                        <td class="p-2 fw-bold"><input class="form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number"></td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex align-items-start flex-column p-2">
                                                <label class="p-2 fw-bold" for="notes">Notes:</label>
                                                <div class="notesContainer w-75">
                                                    <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                                                </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 d-flex flex-column">
                                            <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                                            <div class="AttachmentsContainer">
                                                <input class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                        <input type="hidden" id="toDate${generatedId}" value="${toDate}">
                        <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                        ${itrationBox}
                    </div>
                </div>
                `;
                document.getElementById('childs').insertAdjacentHTML("beforeend" , cartoona);
            }

            if(Infantscounter > 0 && Infantscounter > infanti){
                cartoona = `
                <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2">
                    <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="infant">Infant${infanti + 1}</p>
                    <div class="dataInputs">
                        <div class="row p-4">
                            <table>
                                <tbody>
                                    <tr> 
                                        <td><label class="pb-0 ps-3 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label></td>
                                    </tr>
                                    <tr>
                                        <td class="p-2"><input class="form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name"></td>
                                        <td class="p-2"><select class="form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                                            <option value="" disabled selected hidden>Choose Supplier</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            </select>
                                        </td>
                                        <td class="p-2"><input class="form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}"></td>
                                        <td class="p-2"><input class="form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price"></td>
                                    </tr>
                                    <tr> 
                                        <td><label class="pb-0 ps-3 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label></td>
                                        <td><label class="pb-0 ps-3 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label></td>
                                    </tr>
                                    <tr>
                                        <td class="p-2"><input class="form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate"></td>
                                        <td class="p-2"><input class="form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number"></td>
                                        <td class="p-2"><input class="form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number"></td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex align-items-start flex-column p-2">
                                            <label class="p-2 fw-bold" for="notes">Notes:</label>
                                            <div class="notesContainer w-75">
                                                <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 d-flex flex-column">
                                            <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                                            <div class="AttachmentsContainer">
                                                <input class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="hidenFields">
                        <input type="hidden" id="type${generatedId}" value="infant">
                        <input type="hidden" id="CompanyName${generatedId}" value="${CompanyName}">
                        <input type="hidden" id="CustomerName${generatedId}" value="${CustomerName}">
                        <input type="hidden" id="branchName${generatedId}" value="${branch}">
                        <input type="hidden" id="salesPreson${generatedId}" value="${salesPerson}">
                        <input type="hidden" id="tripeType${generatedId}" value="${tripeType}">
 fw-bold                        <input type="hidden" id="fromCountry${generatedId}" value="${fromCountry}">
                        <input type="hidden" id="toCountry${generatedId}" value="${toCountry}">
                        <input type="hidden" id="fromDate${generatedId}" value="${fromDate}">
                        <input type="hidden" id="toDate${generatedId}" value="${toDate}">
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
            <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2">
                <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="adult">Adult${adulti + 1}</p>
                <div class="dataInputs">
                    <div class="row p-4">
                        <table>
                            <tbody>
                                <tr> 
                                    <td><label class="pb-0 ps-3 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label></td>
                                </tr>
                                <tr>
                                    <td class="p-2"><input class="form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name"></td>
                                    <td class="p-2"><select class="form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                                        <option value="" disabled selected hidden>Choose Supplier</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        </select>
                                    </td>
                                    <td class="p-2"><input class="form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}"></td>
                                    <td class="p-2"><input class="form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price"></td>
                                </tr>
                                <tr> 
                                    <td><label class="pb-0 ps-3 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label></td>
                                </tr>
                                <tr>
                                    <td class="p-2"><input class="form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate"></td>
                                    <td class="p-2"><input class="form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number"></td>
                                    <td class="p-2"><input class="form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number"></td>
                                </tr>
                                    <tr>
                                        <td class="d-flex align-items-start flex-column p-2">
                                            <label class="p-2 fw-bold" for="notes">Notes:</label>
                                            <div class="notesContainer w-75">
                                                <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 d-flex flex-column">
                                            <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                                            <div class="AttachmentsContainer">
                                                <input class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                                            </div>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
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
                    <input type="hidden" id="toDate${generatedId}" value="${toDate}">
                    <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                </div>
            </div>
            `
            document.getElementById('adults').insertAdjacentHTML("beforeend" , cartoona);
        }
        if(childscounter > 0 && childscounter > childi){
            cartoona = `
            <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2">
                <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="child">Child${childi + 1}</p>
                <div class="dataInputs">
                    <div class="row p-4">
                        <table>
                            <tbody>
                                <tr> 
                                    <td><label class="pb-0 ps-3 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label></td>
                                </tr>
                                <tr>
                                    <td class="p-2"><input class="form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name"></td>
                                    <td class="p-2"><select class="form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                                        <option value="" disabled selected hidden>Choose Supplier</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        </select>
                                    </td>
                                    <td class="p-2"><input class="form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}"></td>
                                    <td class="p-2"><input class="form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price"></td>
                                </tr>
                                <tr> 
                                    <td><label class="pb-0 ps-3 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label></td>
                                    <td><label class="pb-0 ps-3 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label></td>
                                </tr>
                                <tr>
                                    <td class="p-2"><input class="form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate"></td>
                                    <td class="p-2"><input class="form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number"></td>
                                    <td class="p-2"><input class="form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number"></td>
                                </tr>
                                    <tr>
                                        <td class="d-flex align-items-start flex-column p-2">
                                            <label class="p-2 fw-bold" for="notes">Notes:</label>
                                            <div class="notesContainer w-75">
                                                <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="p-2 d-flex flex-column">
                                            <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                                            <div class="AttachmentsContainer">
                                                <input class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                                            </div>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
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
                    <input type="hidden" id="toDate${generatedId}" value="${toDate}">
                    <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                </div>
            </div>
            `;
            document.getElementById('childs').insertAdjacentHTML("beforeend" , cartoona);

        }
        
        if(Infantscounter > 0 && Infantscounter > infanti){
            cartoona = `
                        <div class="passengersDataCard mt-3 mb-3 border rounded-3 p-2">
                            <p class="passengerType d-flex justify-content-center align-items-center fw-bold" type="infant">Infant${infanti + 1}</p>
                            <div class="dataInputs">
                                <div class="row p-4">
                                    <table>
                                        <tbody>
                                            <tr> 
                                                <td><label class="pb-0 ps-3 fw-bold" for="name">Name: <span class="text-danger fw-bolder">*</span></label></td>
                                                <td><label class="pb-0 ps-3 fw-bold" for="chooseSupplier">Choose Supplier: <span class="text-danger fw-bolder">*</span></label></td>
                                                <td><label class="pb-0 ps-3 fw-bold" for="costPrice">Cost Price: <span class="text-danger fw-bolder">*</span></label></td>
                                                <td><label class="pb-0 ps-3 fw-bold" for="sellingPrice">Selling Price: <span class="text-danger fw-bolder">*</span></label></td>
                                            </tr>
                                            <tr>
                                                <td class="p-2"><input class="form-control costPrice" type="text" id="name${generatedId}" name="name" placeholder="Name"></td>
                                                <td class="p-2"><select class="form-control" name="chooseSupplier" id="chooseSupplier${generatedId}" required>
                                                    <option value="" disabled selected hidden>Choose Supplier</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    </select>
                                                </td>
                                                <td class="p-2"><input class="form-control costPrice" type="number" min="0" name="costPrice" placeholder="Cost Price" id="costPrice${generatedId}"></td>
                                                <td class="p-2"><input class="form-control sellingPrice" type="number" min="0" name="sellingPrice" id="sellingPrice${generatedId}" placeholder="Selling Price"></td>
                                            </tr>
                                            <tr> 
                                                <td><label class="pb-0 ps-3 fw-bold" for="theGate">The Gate: <span class="text-danger fw-bolder">*</span></label></td>
                                                <td><label class="pb-0 ps-3 fw-bold" for="AirplaneNumber">Airplane Number: <span class="text-danger fw-bolder">*</span></label></td>
                                                <td><label class="pb-0 ps-3 fw-bold" for="seatNumber">Seat Number: <span class="text-danger fw-bolder">*</span></label></td>
                                            </tr>
                                            <tr>
                                                <td class="p-2"><input class="form-control" type="text" name="theGate" id="theGate${generatedId}" placeholder="The Gate"></td>
                                                <td class="p-2"><input class="form-control" type="text" name="AirplaneNumber" id="AirplaneNumber${generatedId}" placeholder="Airplane Number"></td>
                                                <td class="p-2"><input class="form-control" type="text" name="seatNumber" id="seatNumber${generatedId}" placeholder="Seat Number"></td>
                                            </tr>
                                            <tr>
                                                <td class="d-flex align-items-start flex-column p-2">
                                                    <label class="p-2 fw-bold" for="notes">Notes:</label>
                                                    <div class="notesContainer w-75">
                                                        <textarea name="notes" class="form-control" id="notes${generatedId}" placeholder="Notes"></textarea>
                                                    </div>
                                                </td>
                                            </tr>
                                        <tr>
                                            <td class="p-2 d-flex flex-column">
                                                <label class="pb-2 ps-2 fw-bold" for="attachments">Attachments: <span class="text-danger fw-bolder">*</span></label>
                                                <div class="AttachmentsContainer">
                                                    <input class="form-control" type="file" name="attachments" id="attachments${generatedId}" placeholder="Attachments">
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
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
                                <input type="hidden" id="toDate${generatedId}" value="${toDate}">
                                <input type="hidden" id="passengersCount${generatedId}" value="${passengersSum}">
                            </div>
                        </div>
                        `;
                        document.getElementById('infants').insertAdjacentHTML("beforeend" , cartoona);
                    }
    
    }

    // Append generated HTML to the container


    // Calculate the total cost and selling prices
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
};

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
    // Toggle the visibility of the dropdown list when the input is clicked
    passengersDataInput.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents click from closing the dropdown immediately
        passengersDataList.classList.toggle('d-none');
    });
    
    // Close the dropdown if clicking outside of it
    document.addEventListener('click', (event) => {
        if (passengersDataList && !passengersDataList.contains(event.target) && !passengersDataInput?.contains(event.target)) {
            passengersDataList.classList.add('d-none');
        }
    });
});

adultsController.children[0].addEventListener("click", () => addPassenger('adult'));
adultsController.children[2].addEventListener("click", () => removePassenger('adult'));
childsController.children[0].addEventListener("click", () => addPassenger('child'));
childsController.children[2].addEventListener("click", () => removePassenger('child'));
infantsController.children[0].addEventListener("click", () => addPassenger('infant'));
infantsController.children[2].addEventListener("click", () => removePassenger('infant'));

radioBtns.forEach(radioBtn => radioBtn.addEventListener("change", (event) => toggleDateInputs(event.target.value)));



addTableRowBtn.addEventListener("click", function() {
    // Create a new row element
    const row = document.createElement('tr');

    // Add the HTML content to the row
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
        <td><input type="number" class="amount form-control w-100" name="amount" min="0" id="amount${generatedId}"></td>
        <td><input type="text" class="note form-control w-100" name="note" id="note${generatedId}"></td>
        <td class="background-transparent">
            <div class="removeRow">
                <i class="fa-solid fa-x p-3"></i>
            </div>
        </td>
    `;

    // Append the new row to the table body
    tbody.appendChild(row);

    updateAmountValue()

    // Add event listener for the remove button in the newly added row
    row.querySelector('.removeRow').addEventListener('click', function() {
        row.remove();
    });
});


// const deleteRoww = (event) => {
//     if (event.target.classList.contains('fa-x')) {
//         // Find the closest row element
//         const row = event.target.closest('.d-block.d-flex.mb-3');

//         if (row) {
//             // Find the index of the row to be deleted
//             const rowIndex = Array.from(row.parentElement.children).indexOf(row);

//             // Check the number of remaining rows
//             const rowDataContainer = document.getElementById('rowData');
//             const remainingRows = rowDataContainer.querySelectorAll('.d-block.d-flex.mb-3').length;

//             // Allow row deletion only if more than one row is present
//             if (remainingRows > 1) {
//                 // Remove the row from the DOM
//                 row.remove();
//                 updateFlightInfo()
//                 // Remove the corresponding entry from multicityDataList
//                 if (tripeType === "multiCity") {
//                     multicityDataList.splice(rowIndex, 1);
//                 }

//                 // Reorder remaining rows in multicityDataList if necessary
//                 for (let i = rowIndex; i < multicityDataList.length; i++) {
//                     multicityDataList[i].rowIndex = i; // Optional: Update row index if needed
//                 }

//                 // Optionally, update UI or perform other actions here
//                 checkFirstRow(); // Call this function to update UI or state if needed
//             } else {
//                 console.warn("Cannot delete the last row.");
//             }
//         }
//     }
// };


function getMultiCityTrip(){
    if (tripeType === "multiCity") {
        multicityDataList = []; // Reset list for new trip type
        const rowCount = document.querySelectorAll('.row-data').length;
        for (let i = 0; i < rowCount; i++) {
            const tripe = {
                fromCountry: document.querySelector(`[data-row-index="${i}"] .fromCountry`).value,
                toCountry: document.querySelector(`[data-row-index="${i}"] .toCountry`).value,
                fromDate: document.querySelector(`[data-row-index="${i}"] .fromDate`).value,
            };
            multicityDataList.push(tripe);
        }
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
    amountInputs.forEach(input =>{
        input.addEventListener("change" , function(){
            amountSum = 0
            for(let i = 0 ; i < amountInputs.length ; i++){
                amountSum += Number(amountInputs[i].value)
            }
            DetermineThevaluePaid.value = amountSum
        })
    })
}

    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('hidden', i !== index);
        });
        currentSectionIndex = index;
    }

    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (currentSectionIndex > 0) {
                showSection(currentSectionIndex - 1);
                passengersList = []
            }
        });
    });

    const nextToFlightInfoBtn = document.getElementById('nextToFlightInfo');
    const finishBtn = document.querySelector('.finish-btn');
    function validateBookingSection() {
        const div = document.getElementById('reservationForm');
        const selects = document.querySelectorAll('.booking-card select[required]');
        const inputs = div.querySelectorAll('input[type="date"][required]');
        let isValid = true;

        // Check all select elements
        selects.forEach(select => {            
            if (select.value === "" || select.value == null) {
                isValid = false;
                select.classList.add('is-invalid');
            } else {
                select.classList.remove('is-invalid');
            }
        });
        // Check all input elements
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
        return isValid;
    }


    function validateflightInfoSection() {
        const form = document.getElementById('flightInfoSection');
        const selects = form.querySelectorAll('select[required]');
        const inputs = form.querySelectorAll('input[type="text"] , input[type="number"] , input[type="file"]');
        let isValid = true;


        // Check all select elements
        selects.forEach(select => {
            if (select.value === "" || select.value === null ) {
                isValid = false;
                select.classList.add('is-invalid');
            } else {
                select.classList.remove('is-invalid');
            }
        });

        // Check all input elements
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
    
        // Create an array to store the pairs of select and amount elements
        const pairs = [];
    
        // Populate pairs array
        selects.forEach((select, index) => {
            const amount = amounts[index];
            pairs.push({ select, amount });
        });
    
        // Check all pairs for validity
        pairs.forEach(pair => {
            const { select, amount } = pair;
            
            // Validate select and corresponding amount
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


    function showAlert(message) {
        alert(message); // Basic alert, you can customize this to show messages in a better way
    }

    nextToFlightInfoBtn.addEventListener('click', function() {
        // debugger
        if (validateBookingSection()) {
            updateFlightInfo()
            // document.getElementById('bookingSection').classList.add('hidden');
            // document.getElementById('flightInfoSection').classList.remove('hidden');1
            // $(".next").click(function () {
                const nextTabLinkEl = $(".nav-tabs a[href = '#step2']")
                const nextTab = new bootstrap.Tab(nextTabLinkEl);
                nextTab.show();
            // });
        }else{
            showAlert("invalid")
        }
    });

    nextToPayments.addEventListener('click', function() {
        if (validateflightInfoSection()) {
            // document.getElementById('flightInfoSection').classList.add('hidden');
            // document.getElementById('paymentsSection').classList.remove('hidden');
            // $(".next").click(function () {
                const nextTabLinkEl = $(".nav-tabs a[href = '#step3']")
                const nextTab = new bootstrap.Tab(nextTabLinkEl);
                nextTab.show();
            // });
            // showSection(2);
            const { totalCostPrice, totalSellingPrice } = calculateTotalPrices();
            paymentTotalCost.value = totalCostPrice;
            paymentTotalSellingPrice.value = totalSellingPrice;
            // getMultiCityTrip()
        }else{
            showAlert("invalid")
        }
    });

    finishBtn.addEventListener('click', function() {
        if (validatepaymentsSection()) {
            // Assuming getFinalData() is a function that returns the final data object
            const fileData = getFinalData(); // Ensure this is a function call
            const fileNumberr = fileData.FileNumber;
            const reservationNumbers = [];
            paymentScheduleList = []
    
            // Ensure fileData and its properties are correctly structured
            if (fileData && fileData.Passengers) {
                for (let i = 0; i < passengersSum; i++) {
                    if (fileData.Passengers[i] && fileData.Passengers[i].ReservationNumber) {
                        reservationNumbers.push(fileData.Passengers[i].ReservationNumber);
                    }
                }
            }
            // Use template literals for better readability in alerts
            alert(`Your File Number is ${fileNumberr}. Your Reservation Number is: ${JSON.stringify(reservationNumbers)}`);
            
            // Log the file number to the console
            console.log('File Number:', fileNumberr);
            console.log('Reservation Numbers:', reservationNumbers);
        }else{
            showAlert("invalid")
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
        let passenger = {}

        const CompanyName = document.getElementById("chooseCompany").value || null;
        const CustomerName = document.getElementById("chooseCustomer").value;
        const branch = document.getElementById("selectBranch").value ;
        const salesPerson = document.getElementById("selectSalesPerson").value || null;
        const toDate = document.getElementById("toDate").value || null

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
                passenger.ToDate = toDate
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
        let passenger = {}

        const CompanyName = document.getElementById("chooseCompany").value || null;
        const CustomerName = document.getElementById("chooseCustomer").value;
        const branch = document.getElementById("selectBranch").value ;
        const salesPerson = document.getElementById("selectSalesPerson").value || null;
        const fromCountry = document.getElementById("fromCountry").value ;
        const toCountry = document.getElementById("toCountry").value ;
        const fromDate = document.getElementById("fromDate").value ;
        const toDate = document.getElementById("toDate").value || null

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
            passenger.FromCountry = fromCountry 
            passenger.ToCountry = toCountry
            passenger.FromDate = fromDate
            passenger.ToDate = toDate
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
    const toDate = document.getElementById("toDate").value || null
    ;

    const PaymentSchedule = getPaymentSchedule()
    const generatedId = Math.floor(Math.random()*1000)

    passengersList = addPassengerToFile()


    let finalData = {    
    "FileNumber": generatedId,
    "CompanyName": CompanyName , 
    "CustomerName": CustomerName,
    "Branch": branch,
    "SalesPerson": salesPerson,
    "TripType": tripeType,
    "Trip": passengersList[0].Trip,
    "ToDate": toDate,
    "PassengersCounter": passengersSum,
    "Passengers": passengersList,
    "PaymentSchedule": PaymentSchedule
    }

    for(let i = 0 ; i < passengersList.length ; i ++){
        passengersList[i].FileNumber = generatedId
    }
    
    console.log("FileData" , finalData );
    return finalData

    }else{
        const CompanyName = document.getElementById("chooseCompany").value || null;
        const CustomerName = document.getElementById("chooseCustomer").value;
        const branch = document.getElementById("selectBranch").value ;
        const salesPerson = document.getElementById("selectSalesPerson").value || null;
        const fromCountry = document.getElementById("fromCountry").value ;
        const toCountry = document.getElementById("toCountry").value ;
        const fromDate = document.getElementById("fromDate").value ;
        const toDate = document.getElementById("toDate").value || null
        ;

        const PaymentSchedule = getPaymentSchedule()
        const generatedId = Math.floor(Math.random()*1000)
        passengersList = addPassengerToFile()




        let finalData = {    
        "FileNumber": generatedId,
        "CompanyName": CompanyName , 
        "CustomerName": CustomerName,
        "Branch": branch,
        "SalesPerson": salesPerson,
        "TripType": tripeType,
        "FromCountry": fromCountry,
        "ToCountry": toCountry,
        "FromDate": fromDate,
        "ToDate": toDate,
        "PassengersCounter": passengersSum,
        "Passengers": passengersList,
        "PaymentSchedule": PaymentSchedule
        }

        for(let i = 0 ; i < passengersList.length ; i ++){
            passengersList[i].FileNumber = generatedId
        }
        
        console.log("FileData" , finalData );
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

// Function to save data to session storage
const saveToSessionStorage = () => {
    sessionStorage.setItem('section1Data', JSON.stringify(section1Data));
    sessionStorage.setItem('section2Data', JSON.stringify(section2Data));
};

// Retrieve data from session storage
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