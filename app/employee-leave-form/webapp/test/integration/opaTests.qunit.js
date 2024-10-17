sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'employeeleaveform/test/integration/FirstJourney',
		'employeeleaveform/test/integration/pages/EmployeesMain'
    ],
    function(JourneyRunner, opaJourney, EmployeesMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('employeeleaveform') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEmployeesMain: EmployeesMain
                }
            },
            opaJourney.run
        );
    }
);