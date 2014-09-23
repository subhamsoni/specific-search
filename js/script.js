// Filter Results And Keyboard Functionality
$("#website").keyup(function(e){
	if($(this).val() == ""){
		$("#list").hide();
	}
	else{
		$("#list").show();
	}

	searchTerm = $("#website").val();
	listItem = $("#list").children(".website");
	searchSplit = searchTerm.replace(/ /g, "'):containsi('")

	$.extend($.expr[":"],{
		"containsi":function(elem, i, match, array)
			{
				return(elem.textContent || elem.innerText || "").toLowerCase()
				.indexOf((match[3] || "").toLowerCase()) >= 0;
			}
	});

	$("#list .website").not(":containsi('" + searchSplit + "')").each(function(e){
		$(this).hide();
		$(".message").show();
	});

	$("#list .website:containsi('" + searchSplit + "')").each(function(e){
		$(this).show();
		$(".message").hide();
	});

	results = $("#list .website:containsi('" + searchSplit + "')");

	if(e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 38){
		return;
	}

	index = 0;
	move();
});

$("#website").keydown(function(e){
	switch(e.keyCode){
		case 13:
			e.preventDefault();
			enter();
			break;
		case 40:
			e.preventDefault();
			down();
			break;
		case 38:
			e.preventDefault();
			up();
			break;
	}
});

function down(){
	if(index == results.length - 1){
		index = 0;
	}
	else{
		index++;
	}
	move();
};

function up(){
	if(index == 0){
		index = results.length - 1;
	}
	else{
		index--;
	}
	move();
};

function enter(){
	value = $(results[index]).text().trim();
	first = $(results[index]).data("title");
	$("#website").val(value);
	$("#list").hide();
	$("#keywords").focus();
};

function move(){
	results.removeClass('selected');
	$(results[index]).addClass('selected');
	$("#list").scrollTop((index*29));
};

// Hide List When A Website Is Selected And Set Values
$(".website").on({
	click:function(){
		first = $(this).data("title");
		website = $(this).text().trim();
		$("#website").val(website);
		$("#list").hide();
		$("#keywords").focus();
	}
});

$("#keywords").keyup(function(){
	second = $("#keywords").val();
});

// Search
$("#form").submit(function(){
	submit = first + second;
	chrome.tabs.update({url: submit});
	return false;
});