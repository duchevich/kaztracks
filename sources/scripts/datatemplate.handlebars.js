$(document).ready(function() {
    // Settings
        var dataTemplatePathBase = 'data'; // Path to base (root) directory of data

    // Parsing page for templates
    var dataTemplate = $('script[type="text/x-handlebars-template"]'),
		dataTemplateArr = [],
		dataTemplateArrUnique = [];
	dataTemplate.each(function() {
		var dataTemplateThis = $(this),
			dataTemplatePath = dataTemplateThis.data('path');
		dataTemplateArr.push(dataTemplatePath);
	});
	dataTemplateArr.forEach(function(unique) {
	  	if (!dataTemplateArrUnique.includes(unique)) {
	  		dataTemplateArrUnique.push(unique);
		}
	});

    // Getting data for templates
    var loSto = {};
    try {
        loSto = localStorage || {};
    } catch(ex) {}
	dataTemplateArrUnique.forEach(function(item) {
		$.getJSON(dataTemplatePathBase + '/' + item + '.json', function(data) {
            loSto.setItem(item, JSON.stringify(data));
		});
	});

    // Insert data into templates
	dataTemplate.each(function() {
		var dataTemplateThis = $(this),
			dataTemplatePath = dataTemplateThis.data('path'),
			dataTemplateName = dataTemplateThis.attr('id'),
			dataTemplateJson = $.parseJSON(loSto.getItem(dataTemplatePath)),
			dataSource = $('#' + dataTemplateName).html(),
			dataHandlebars = Handlebars.compile(dataSource),
			dataContainer = dataHandlebars(dataTemplateJson);
		$(dataTemplateThis).after(dataContainer);
	});
})