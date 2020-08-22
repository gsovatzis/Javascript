document.getElementById("btnSubmit").addEventListener('click', submitMyForm);
document.getElementById("toggleForm").addEventListener('click', function () { $("#contact-form").slideToggle() });

$("#contact-form").validate();

// Add a custom validation rule for a field
$("#contact-form > fieldset > input:nth-child(1)").rules("add", {
    required: true,
    minlength: 10,
    messages: {
        required: "Required input",
        minlength: jQuery.validator.format("Please, at least {0} characters are necessary")
    }
});

// Enable datepicker for bDate field and format the date to DD/MM/YYYY
$("#bDate").datepicker();
$("#bDate").datepicker("option", "dateFormat", "dd/mm/yy");

// Enable manager field to be auto complete
$("#manager").autocomplete({
    //source: ["George", "Maria","Giannis"],
    //source: "https://2a5c62f2-cc81-45cf-aa5a-c891a07e7159.mock.pstmn.io/users",

    source: function( request, response ) {
        $.ajax( {
          url: "https://2a5c62f2-cc81-45cf-aa5a-c891a07e7159.mock.pstmn.io/users",
          dataType: "json",
          data: {
            term: request.term
          },
          success: function( data ) {
            var results = [];
            for(obj of data.results) {
                results.push({label: `${obj.FirstName} ${obj.LastName}`, value: obj.Username});
            }

            response( results );
          }
        } );
      },

    minLength: 2,
    select: function( event, ui ) {
      console.log( "Selected: " + JSON.stringify(ui.item));
    }
  });

function submitMyForm() {

    console.log($("#contact-form").valid());

    var formData = $("#contact-form").serialize();
    var formData2 = $("#contact-form").serializeArray();

    console.log(formData);
    console.log(formData2);
}