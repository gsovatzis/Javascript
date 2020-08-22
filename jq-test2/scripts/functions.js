
$(document).ready(function () {
    console.log("Document is ready...")
});

$('#btn1').click(function () {
    $("#testImg").slideToggle();
});

$('#btn2').click(testTraverse2);

$('#btn3').click(doAjaxCall);

// run the currently selected effect
function runEffect() {
    // get effect type from
    var selectedEffect = $("#effectTypes").val();

    // Most effect types need no options passed by default
    var options = {};
    // some effects have required parameters
    if (selectedEffect === "scale") {
        options = { percent: 50 };
    } else if (selectedEffect === "transfer") {
        options = { to: "#button", className: "ui-effects-transfer" };
    } else if (selectedEffect === "size") {
        options = { to: { width: 200, height: 60 } };
    }
    // } else if(selectedEffect === "explode") {
    //     options = { pieces: 100};
    // }

    // Run the effect
    $("#testImg").effect(selectedEffect, options, 1000, callback);
};

// Callback function to bring a hidden box back
function callback() {
    setTimeout(function () {
        $("#testImg").removeAttr("style").hide().fadeIn();
    }, 1000);
};

// Set effect from select menu value
$("#button").on("click", function () {
    runEffect();
    return false;
});

function testTraverse2() {
    $( "li.item-a" ).closest( "ul" ).css( "background-color", "red" );
}

function testTraversing() {
    /*
    // Selecting an element's direct parent:
 
    // returns [ div.child ]
    console.log($( "span.subchild" ).parent());
    
    // Selecting all the parents of an element that match a given selector:
    
    // returns [ div.parent ]
    console.log($( "span.subchild" ).parents( "div.parent" ));
    
    // returns [ div.child, div.parent, div.grandparent ]
    console.log($( "span.subchild" ).parents());
    
    // Selecting all the parents of an element up to, but *not including* the selector:
    
    // returns [ div.child, div.parent ]
    console.log($( "span.subchild" ).parentsUntil( "body" ));
    
    // Selecting the closest parent, note that only one parent will be selected
    // and that the initial element itself is included in the search:
    
    // returns [ div.child ]
    console.log($( "span.subchild" ).closest( "div" ));
    
    // returns [ div.child ] as the selector is also included in the search:
    console.log($( "div.child" ).closest( "div" ));
    */
    var x = $("div.parent").siblings();
    console.log(x);
}

function doAjaxCall() {
    $.ajax({
 
        // The URL for the request
        url: "https://2a5c62f2-cc81-45cf-aa5a-c891a07e7159.mock.pstmn.io/users",
     
        // The data to send (will be converted to a query string)
        data: {
            id: 123
        },
     
        // Whether this is a POST or GET request
        type: "GET",
     
        // The type of data we expect back
        dataType : "json",
    })
      // Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function( json ) {
         console.log(json);
      })
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      .fail(function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      })
      // Code to run regardless of success or failure;
      .always(function( xhr, status ) {
        console.log( "The request is complete!" );
      });
}