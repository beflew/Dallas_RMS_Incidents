;(function($) {

	inci=returncrime();
	offe=returnoffense();
	time=returntime();
	resu=returnresult();
	
	
    $.fn.ssdVerticalNavigation = function(options) {

        "use strict";

        var settings = $.extend({

            classMaster : 'master',
            classActive : 'active',
            classClickable : 'clickable'

        }, options);


        function _leftNavigationActiveMain(thisLi) {

            "use strict";

            thisLi
                .toggleClass(settings.classActive)
                .siblings()
                .removeClass(settings.classActive);

        }


        function _leftNavigationClick(thisParentUl, thisLi, event) {

            "use strict";

            if (thisParentUl.hasClass(settings.classMaster) && ! thisLi.hasClass(settings.classClickable)) {

                event.preventDefault();
                event.stopPropagation();

                _leftNavigationActiveMain(thisLi);

            }

        }


        return this.each(function() {
			

            "use strict";

            $(this)
                .addClass(settings.classMaster)
                .on('click',  'li a', function(event) {

                try {
	
                    var thisA = $(this),
                        thisLi = thisA.parent('li'),
                        thisParentUl = thisLi.parent('ul');
					
					if (thisA.attr("class")=="offense"){
						console.log(thisA.attr("class"));
						if (in_array(thisA.text(),offe)){
							thisLi.toggleClass(settings.classActive);
							offe.splice(offe.indexOf(thisA.text()),1)	
						} else {
							offe.push(thisA.text());
							thisLi.removeClass(settings.classActive);
						}
					}
					
					if (thisA.attr("class")=="offenseCrime"){
						
						if (in_array(thisA.text(),inci)){
							thisLi.toggleClass(settings.classActive);
							inci.splice(inci.indexOf(thisA.text()),1);
						} else {
							inci.push(thisA.text());
							thisLi.removeClass(settings.classActive);
						}
					}
					
					if (thisA.attr("class")=="time"){
						
						if (in_array(thisA.text(),time)){
							thisLi.toggleClass(settings.classActive);
							time.splice(time.indexOf(thisA.text()),1);
						} else {
							time.push(thisA.text());
							thisLi.removeClass(settings.classActive);
						}
					}
					
					if (thisA.attr("class")=="result"){
						
						if (in_array(thisA.text(),resu)){
							thisLi.toggleClass(settings.classActive);
							resu.splice(resu.indexOf(thisA.text()),1);
						} else {
							resu.push(thisA.text());
							thisLi.removeClass(settings.classActive);
						}
					}
					mapping(offe,inci,time,resu);
                    _leftNavigationClick(thisParentUl, thisLi, event);

                } catch (errorMessage) {

                    console.log(errorMessage);

                }

            });

        });


    }

}(jQuery));