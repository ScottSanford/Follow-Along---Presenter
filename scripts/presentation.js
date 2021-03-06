﻿/// <reference path="../Scripts/jquery-1.10.2.js" />
/// <reference path="../Scripts/jquery.signalR-2.1.1.js" />

/*!
    ASP.NET SignalR Stock Ticker Sample
*/

// Crockford's supplant method (poor man's templating)
if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

$(function () {

    var presentation = $.connection.presentation; // the generated client-side hub proxy
    $presentationArea = $('#presentationArea');

    function init() {
        return presentation.server.getCurrentSlide().done(function (presentation) {
            console.log(presentation.currentSlide);
            $presentationArea.empty();
            if (presentation.currentSlide >= 0) {
                // console.log(presentation.slides[presentation.currentSlide].url);
                $presentationArea.append("<img class='img-responsive' src='" + presentation.slides[presentation.currentSlide].url + "' width='900px' />");
            } else {
                $presentationArea.append("Waiting for organizer to start the meeting...");
            }
        });
    }

    // Add client-side hub methods that the server will call
    $.extend(presentation.client, {
        updateSlide: function (presentation) {
            var url = presentation.slides[presentation.currentSlide].url;
            $presentationArea.empty();
            $presentationArea.append("<img class='img-responsive' src='" + url + "' width='900px' />");
        },

        startMeeting: function () {
            $presentationArea.empty();
            $presentationArea.append("Welcome to the meeting!")
        },

        stopMeeting: function () {
            $presentationArea.empty();
            $presentationArea.append("This meeting has ended.")
        }
    });

    // Start the connection
    $.connection.hub.url = "https://slides.mediafly.com/signalr"
    $.connection.hub.start()
        .then(init)
        .done(function () {

            
            // Wire up the buttons
            $("#prevSlide").click(function () {
                presentation.server.prevSlide();
            });

            $("#nextSlide").click(function () {
                presentation.server.nextSlide();
            });

            $("#startMeeting").click(function () {
                presentation.server.startMeeting();
            });

            $("#stopMeeting").click(function () {
                presentation.server.stopMeeting();
            });

            $('.close-btn').click(function() {
                mflyCommands.close();
            });
        });
});