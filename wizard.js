$(document).ready(function () {
	//Enable Tooltips
	var tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});

	$(".previous").click(function () {
		const prevTabLinkEl = $(".nav-tabs .active")
			.closest("li")
			.prev("li")
			.find("a")[0];
			const prevTab = new bootstrap.Tab(prevTabLinkEl);
			prevTab.show();
		if(prevTab._element.attributes[1].nodeValue=="#step1"){
			document.getElementById("bookingSection").classList.remove("d-none")
		}else if(prevTab._element.attributes[1].nodeValue=="#step2"){
			document.getElementById("flightInfoSection").classList.remove("d-none")
		}
	});
});