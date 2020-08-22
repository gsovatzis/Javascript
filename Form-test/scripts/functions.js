function myFunction() {
    var url = new URL(window.location.href);
    var name = url.searchParams.get("name");
    var surname = url.searchParams.get("surname");
    var terms = url.searchParams.get("terms");

    console.log(name);
    console.log(surname);
    console.log(terms);
}

function demoObject() {
    var person = {
        "name": "George",
        "surname": "Sovatzis",
        "age": 39,
        "attendance_records": [
            { "date" : "2019-03-02T09:00Z", "lesson": "Javascript essentials" },
            {"date" : "2019-03-03T09:00Z", "lesson": "Javascript advanced" }
        ]
    };

    var person2 = "{\"name\":\"Maria\", \"surname\":\"Papadopoulou\",\"age\":25,\"attendance_records\":[{\"date\":\"\", \"lesson\":\"test\"}]}";

    console.log(person.name);
    console.log('String version of person: ' + JSON.stringify(person));

    console.log(person2);
    console.log(JSON.parse(person2));

    for(var ar of person.attendance_records) {
        console.log(ar.date + ' ' + ar.lesson);
    }
    
}